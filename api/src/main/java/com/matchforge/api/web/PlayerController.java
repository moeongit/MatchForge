package com.matchforge.api.web;

import com.matchforge.api.service.PlayerService;
import com.matchforge.api.web.dto.CreatePlayerRequest;
import com.matchforge.api.web.dto.PlayerResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @PostMapping
    public PlayerResponse create(@Valid @RequestBody CreatePlayerRequest request) {
        return PlayerResponse.from(playerService.create(request));
    }

    @GetMapping
    public List<PlayerResponse> all() {
        return playerService.all().stream().map(PlayerResponse::from).toList();
    }
}
