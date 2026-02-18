package com.matchforge.api.service;

import com.matchforge.api.domain.Player;
import com.matchforge.api.repository.PlayerRepository;
import com.matchforge.api.web.dto.CreatePlayerRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public Player create(CreatePlayerRequest request) {
        Player player = new Player();
        player.setUsername(request.username().trim());
        player.setRegion(request.region().trim().toLowerCase());
        player.setElo(request.elo());
        return playerRepository.save(player);
    }

    public List<Player> all() {
        return playerRepository.findAll();
    }

    public Player require(Long playerId) {
        return playerRepository.findById(playerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Player not found"));
    }
}
