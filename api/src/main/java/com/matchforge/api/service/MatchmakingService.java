package com.matchforge.api.service;

import com.matchforge.api.domain.Match;
import com.matchforge.api.domain.MatchStatus;
import com.matchforge.api.domain.Player;
import com.matchforge.api.repository.MatchRepository;
import com.matchforge.api.repository.PlayerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class MatchmakingService {

    private static final int BASE_ELO_WINDOW = 50;
    private static final int ELO_WINDOW_GROWTH_PER_10S = 20;
    private static final int MAX_CANDIDATES = 25;

    private final QueueService queueService;
    private final PlayerRepository playerRepository;
    private final MatchRepository matchRepository;

    public MatchmakingService(
            QueueService queueService,
            PlayerRepository playerRepository,
            MatchRepository matchRepository
    ) {
        this.queueService = queueService;
        this.playerRepository = playerRepository;
        this.matchRepository = matchRepository;
    }

    @Transactional
    public List<Match> runTick() {
        List<Match> created = new ArrayList<>();
        for (String region : queueService.queuedRegions()) {
            created.addAll(processRegion(region));
        }
        return created;
    }

    private List<Match> processRegion(String region) {
        List<Long> queuedIds = queueService.queueByRegion(region).stream()
                .map(entry -> entry.playerId())
                .toList();
        if (queuedIds.size() < 2) {
            return List.of();
        }

        Map<Long, Player> playersById = playerRepository.findAllById(queuedIds).stream()
                .collect(Collectors.toMap(Player::getId, Function.identity()));

        List<Match> created = new ArrayList<>();
        Set<Long> locallyMatched = new HashSet<>();
        long now = Instant.now().getEpochSecond();

        for (Long playerId : queuedIds) {
            if (locallyMatched.contains(playerId)) {
                continue;
            }
            Player seeker = playersById.get(playerId);
            if (seeker == null) {
                continue;
            }

            int seekerWindow = eloWindowForWait(queueService.secondsInQueue(playerId, now));
            int min = seeker.getElo() - seekerWindow;
            int max = seeker.getElo() + seekerWindow;
            List<Long> candidateIds = queueService.candidateIdsByElo(region, min, max, MAX_CANDIDATES);

            Optional<Long> candidate = candidateIds.stream()
                    .filter(id -> !id.equals(playerId))
                    .filter(id -> !locallyMatched.contains(id))
                    .filter(id -> isMutuallyCompatible(seeker, playersById.get(id), now))
                    .findFirst();

            if (candidate.isEmpty()) {
                continue;
            }

            Long opponentId = candidate.get();
            if (!queueService.acquirePairLocks(playerId, opponentId)) {
                continue;
            }

            try {
                if (!queueService.dequeuePairIfPresent(region, playerId, opponentId)) {
                    continue;
                }
                Player opponent = playersById.get(opponentId);
                if (opponent == null) {
                    continue;
                }
                Match match = new Match();
                match.setRegion(region);
                match.setPlayer1(seeker);
                match.setPlayer2(opponent);
                match.setStatus(MatchStatus.PENDING);
                created.add(matchRepository.save(match));
                locallyMatched.add(playerId);
                locallyMatched.add(opponentId);
            } finally {
                queueService.releasePairLocks(playerId, opponentId);
            }
        }

        return created;
    }

    private boolean isMutuallyCompatible(Player seeker, Player candidate, long now) {
        if (candidate == null) {
            return false;
        }
        int seekerWindow = eloWindowForWait(queueService.secondsInQueue(seeker.getId(), now));
        int candidateWindow = eloWindowForWait(queueService.secondsInQueue(candidate.getId(), now));
        int diff = Math.abs(seeker.getElo() - candidate.getElo());
        return diff <= seekerWindow && diff <= candidateWindow;
    }

    private int eloWindowForWait(long waitSeconds) {
        long increments = waitSeconds / 10L;
        return BASE_ELO_WINDOW + (int) increments * ELO_WINDOW_GROWTH_PER_10S;
    }
}
