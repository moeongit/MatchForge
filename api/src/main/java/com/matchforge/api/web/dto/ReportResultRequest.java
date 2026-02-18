package com.matchforge.api.web.dto;

import jakarta.validation.constraints.NotNull;

public record ReportResultRequest(
        @NotNull Long winnerPlayerId,
        @NotNull Integer player1Score,
        @NotNull Integer player2Score
) {
}
