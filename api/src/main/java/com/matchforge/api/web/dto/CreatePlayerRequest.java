package com.matchforge.api.web.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CreatePlayerRequest(
        @NotBlank String username,
        @NotBlank String region,
        @Min(100) @Max(4000) Integer elo
) {
}
