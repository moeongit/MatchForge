package com.matchforge.api.web.dto;

import com.matchforge.api.domain.Match;
import com.matchforge.api.domain.MatchStatus;

import java.time.Instant;

public record MatchResponse(
        Long id,
        String region,
        Long player1Id,
        Long player2Id,
        MatchStatus status,
        Long winnerPlayerId,
        Integer player1Score,
        Integer player2Score,
        Instant createdAt,
        Instant completedAt
) {
    public static MatchResponse from(Match match) {
        return new MatchResponse(
                match.getId(),
                match.getRegion(),
                match.getPlayer1().getId(),
                match.getPlayer2().getId(),
                match.getStatus(),
                match.getWinnerPlayerId(),
                match.getPlayer1Score(),
                match.getPlayer2Score(),
                match.getCreatedAt(),
                match.getCompletedAt()
        );
    }
}
