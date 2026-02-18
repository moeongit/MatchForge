package com.matchforge.api.service;

import com.matchforge.api.domain.Match;
import com.matchforge.api.domain.MatchStatus;
import com.matchforge.api.domain.Player;
import com.matchforge.api.repository.MatchRepository;
import com.matchforge.api.repository.PlayerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;

@Service
public class MatchService {

    private static final int K_FACTOR = 24;

    private final MatchRepository matchRepository;
    private final PlayerRepository playerRepository;

    public MatchService(MatchRepository matchRepository, PlayerRepository playerRepository) {
        this.matchRepository = matchRepository;
        this.playerRepository = playerRepository;
    }

    public Match findById(Long matchId) {
        return matchRepository.findById(matchId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Match not found"));
    }

    @Transactional
    public Match reportResult(Long matchId, Long winnerPlayerId, Integer player1Score, Integer player2Score) {
        Match match = findById(matchId);
        if (match.getStatus() == MatchStatus.COMPLETED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Match already completed");
        }
        Long p1 = match.getPlayer1().getId();
        Long p2 = match.getPlayer2().getId();
        if (!winnerPlayerId.equals(p1) && !winnerPlayerId.equals(p2)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Winner must be one of the match players");
        }

        Player player1 = match.getPlayer1();
        Player player2 = match.getPlayer2();
        updateElo(player1, player2, winnerPlayerId);

        match.setWinnerPlayerId(winnerPlayerId);
        match.setPlayer1Score(player1Score);
        match.setPlayer2Score(player2Score);
        match.setStatus(MatchStatus.COMPLETED);
        match.setCompletedAt(Instant.now());
        playerRepository.save(player1);
        playerRepository.save(player2);
        return matchRepository.save(match);
    }

    private void updateElo(Player p1, Player p2, Long winnerPlayerId) {
        double expectedP1 = expectedScore(p1.getElo(), p2.getElo());
        double expectedP2 = expectedScore(p2.getElo(), p1.getElo());
        double scoreP1 = winnerPlayerId.equals(p1.getId()) ? 1.0 : 0.0;
        double scoreP2 = winnerPlayerId.equals(p2.getId()) ? 1.0 : 0.0;

        int nextP1 = (int) Math.round(p1.getElo() + K_FACTOR * (scoreP1 - expectedP1));
        int nextP2 = (int) Math.round(p2.getElo() + K_FACTOR * (scoreP2 - expectedP2));
        p1.setElo(Math.max(100, nextP1));
        p2.setElo(Math.max(100, nextP2));
    }

    private double expectedScore(int ratingA, int ratingB) {
        return 1.0 / (1.0 + Math.pow(10, (ratingB - ratingA) / 400.0));
    }
}
