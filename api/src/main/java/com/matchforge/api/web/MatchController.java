package com.matchforge.api.web;

import com.matchforge.api.domain.Match;
import com.matchforge.api.service.MatchService;
import com.matchforge.api.service.MatchmakingService;
import com.matchforge.api.web.dto.MatchResponse;
import com.matchforge.api.web.dto.ReportResultRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping
public class MatchController {

    private final MatchmakingService matchmakingService;
    private final MatchService matchService;

    public MatchController(MatchmakingService matchmakingService, MatchService matchService) {
        this.matchmakingService = matchmakingService;
        this.matchService = matchService;
    }

    @PostMapping("/matchmake/tick")
    public Map<String, Object> tick() {
        List<Match> createdMatches = matchmakingService.runTick();
        return Map.of(
                "created", createdMatches.size(),
                "matches", createdMatches.stream().map(MatchResponse::from).toList()
        );
    }

    @GetMapping("/matches/{id}")
    public MatchResponse getById(@PathVariable Long id) {
        return MatchResponse.from(matchService.findById(id));
    }

    @PostMapping("/matches/{id}/result")
    public MatchResponse reportResult(
            @PathVariable Long id,
            @Valid @RequestBody ReportResultRequest request
    ) {
        return MatchResponse.from(
                matchService.reportResult(id, request.winnerPlayerId(), request.player1Score(), request.player2Score())
        );
    }
}
