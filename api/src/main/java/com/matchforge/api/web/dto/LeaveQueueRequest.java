package com.matchforge.api.web.dto;

import jakarta.validation.constraints.NotNull;

public record LeaveQueueRequest(
        @NotNull Long playerId
) {
}
