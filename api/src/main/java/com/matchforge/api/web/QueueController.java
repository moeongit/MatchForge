package com.matchforge.api.web;

import com.matchforge.api.domain.Player;
import com.matchforge.api.service.PlayerService;
import com.matchforge.api.service.QueueService;
import com.matchforge.api.service.model.QueueEntry;
import com.matchforge.api.web.dto.JoinQueueRequest;
import com.matchforge.api.web.dto.LeaveQueueRequest;
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
public class QueueController {

    private final QueueService queueService;
    private final PlayerService playerService;

    public QueueController(QueueService queueService, PlayerService playerService) {
        this.queueService = queueService;
        this.playerService = playerService;
    }

    @PostMapping("/queue/join")
    public Map<String, Object> join(@Valid @RequestBody JoinQueueRequest request) {
        Player player = playerService.require(request.playerId());
        queueService.joinQueue(player.getId(), player.getRegion(), player.getElo());
        return Map.of(
                "status", "joined",
                "playerId", player.getId(),
                "region", player.getRegion(),
                "elo", player.getElo()
        );
    }

    @PostMapping("/queue/leave")
    public Map<String, Object> leave(@Valid @RequestBody LeaveQueueRequest request) {
        Player player = playerService.require(request.playerId());
        queueService.leaveQueue(player.getId(), player.getRegion());
        return Map.of(
                "status", "left",
                "playerId", player.getId(),
                "region", player.getRegion()
        );
    }

    @GetMapping("/queues")
    public Map<String, Long> queues() {
        return queueService.allQueues();
    }

    @GetMapping("/queues/{region}")
    public List<QueueEntry> queueByRegion(@PathVariable String region) {
        return queueService.queueByRegion(region);
    }
}
