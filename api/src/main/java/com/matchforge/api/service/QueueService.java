package com.matchforge.api.service;

import com.matchforge.api.service.model.QueueEntry;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class QueueService {

    private static final long PLAYER_LOCK_TTL_SECONDS = 15L;
    private static final String REGIONS_KEY = "mm:regions";

    private final StringRedisTemplate redisTemplate;
    private final DefaultRedisScript<Long> acquirePairLocksScript;
    private final DefaultRedisScript<Long> dequeuePairScript;

    public QueueService(
            StringRedisTemplate redisTemplate,
            DefaultRedisScript<Long> acquirePairLocksScript,
            DefaultRedisScript<Long> dequeuePairScript
    ) {
        this.redisTemplate = redisTemplate;
        this.acquirePairLocksScript = acquirePairLocksScript;
        this.dequeuePairScript = dequeuePairScript;
    }

    public void joinQueue(Long playerId, String region, int elo) {
        String queueKey = queueKey(region);
        redisTemplate.opsForZSet().add(queueKey, playerId.toString(), elo);
        redisTemplate.opsForValue().set(joinedAtKey(playerId), String.valueOf(Instant.now().getEpochSecond()));
        redisTemplate.opsForSet().add(REGIONS_KEY, region);
    }

    public void leaveQueue(Long playerId, String region) {
        redisTemplate.opsForZSet().remove(queueKey(region), playerId.toString());
        redisTemplate.delete(joinedAtKey(playerId));
        if (regionQueueSize(region) == 0L) {
            redisTemplate.opsForSet().remove(REGIONS_KEY, region);
        }
    }

    public Map<String, Long> allQueues() {
        Set<String> regions = redisTemplate.opsForSet().members(REGIONS_KEY);
        if (regions == null || regions.isEmpty()) {
            return Map.of();
        }
        return regions.stream()
                .sorted()
                .collect(Collectors.toMap(
                        region -> region,
                        this::regionQueueSize
                ));
    }

    public List<QueueEntry> queueByRegion(String region) {
        Set<ZSetOperations.TypedTuple<String>> entries = redisTemplate.opsForZSet()
                .rangeWithScores(queueKey(region), 0, -1);
        if (entries == null || entries.isEmpty()) {
            return List.of();
        }
        List<QueueEntry> queueEntries = new ArrayList<>();
        for (ZSetOperations.TypedTuple<String> tuple : entries) {
            if (tuple.getValue() == null || tuple.getScore() == null) {
                continue;
            }
            long playerId = Long.parseLong(tuple.getValue());
            long joinedAt = readJoinedAt(playerId);
            queueEntries.add(new QueueEntry(playerId, tuple.getScore().intValue(), joinedAt));
        }
        queueEntries.sort(Comparator.comparingInt(QueueEntry::elo));
        return queueEntries;
    }

    public Set<String> queuedRegions() {
        Set<String> regions = redisTemplate.opsForSet().members(REGIONS_KEY);
        return regions == null ? Set.of() : regions;
    }

    public List<Long> candidateIdsByElo(String region, int minElo, int maxElo, int limit) {
        Set<String> ids = redisTemplate.opsForZSet().rangeByScore(
                queueKey(region),
                minElo,
                maxElo,
                0,
                limit
        );
        if (ids == null || ids.isEmpty()) {
            return List.of();
        }
        return ids.stream().map(Long::parseLong).toList();
    }

    public boolean acquirePairLocks(Long p1, Long p2) {
        Long result = redisTemplate.execute(
                acquirePairLocksScript,
                List.of(lockKey(p1), lockKey(p2)),
                "locked",
                String.valueOf(PLAYER_LOCK_TTL_SECONDS)
        );
        return Long.valueOf(1L).equals(result);
    }

    public boolean dequeuePairIfPresent(String region, Long p1, Long p2) {
        Long result = redisTemplate.execute(
                dequeuePairScript,
                List.of(queueKey(region), joinedAtKey(p1), joinedAtKey(p2)),
                p1.toString(),
                p2.toString()
        );
        return Long.valueOf(1L).equals(result);
    }

    public void releasePairLocks(Long p1, Long p2) {
        redisTemplate.delete(List.of(lockKey(p1), lockKey(p2)));
    }

    public long secondsInQueue(Long playerId, long nowEpochSeconds) {
        long joinedAt = readJoinedAt(playerId);
        return Math.max(0L, nowEpochSeconds - joinedAt);
    }

    private long readJoinedAt(Long playerId) {
        String joinedAt = redisTemplate.opsForValue().get(joinedAtKey(playerId));
        if (joinedAt == null) {
            return Instant.now().getEpochSecond();
        }
        try {
            return Long.parseLong(joinedAt);
        } catch (NumberFormatException ex) {
            return Instant.now().getEpochSecond();
        }
    }

    private long regionQueueSize(String region) {
        Long size = redisTemplate.opsForZSet().size(queueKey(region));
        return size == null ? 0L : size;
    }

    private String queueKey(String region) {
        return "mm:queue:" + region.toLowerCase();
    }

    private String joinedAtKey(Long playerId) {
        return "mm:joined:" + playerId;
    }

    private String lockKey(Long playerId) {
        return "mm:lock:player:" + playerId;
    }
}
