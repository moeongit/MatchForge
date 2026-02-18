package com.matchforge.api.web.dto;

import com.matchforge.api.domain.Player;

import java.time.Instant;

public record PlayerResponse(
        Long id,
        String username,
        String region,
        Integer elo,
        Instant createdAt
) {
    public static PlayerResponse from(Player player) {
        return new PlayerResponse(
                player.getId(),
                player.getUsername(),
                player.getRegion(),
                player.getElo(),
                player.getCreatedAt()
        );
    }
}
