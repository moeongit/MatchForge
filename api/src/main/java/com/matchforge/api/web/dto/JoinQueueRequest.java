package com.matchforge.api.web.dto;

import jakarta.validation.constraints.NotNull;

public record JoinQueueRequest(
        @NotNull Long playerId
) {
}
