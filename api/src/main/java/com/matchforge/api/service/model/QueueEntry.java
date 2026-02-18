package com.matchforge.api.service.model;

public record QueueEntry(
        Long playerId,
        Integer elo,
        Long joinedAtEpochSeconds
) {
}
