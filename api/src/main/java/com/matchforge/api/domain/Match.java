package com.matchforge.api.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "matches")
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String region;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player1_id", nullable = false)
    private Player player1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player2_id", nullable = false)
    private Player player2;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MatchStatus status;

    @Column(name = "winner_player_id")
    private Long winnerPlayerId;

    @Column(name = "player1_score")
    private Integer player1Score;

    @Column(name = "player2_score")
    private Integer player2Score;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "completed_at")
    private Instant completedAt;

    @PrePersist
    void onCreate() {
        createdAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public Player getPlayer1() {
        return player1;
    }

    public void setPlayer1(Player player1) {
        this.player1 = player1;
    }

    public Player getPlayer2() {
        return player2;
    }

    public void setPlayer2(Player player2) {
        this.player2 = player2;
    }

    public MatchStatus getStatus() {
        return status;
    }

    public void setStatus(MatchStatus status) {
        this.status = status;
    }

    public Long getWinnerPlayerId() {
        return winnerPlayerId;
    }

    public void setWinnerPlayerId(Long winnerPlayerId) {
        this.winnerPlayerId = winnerPlayerId;
    }

    public Integer getPlayer1Score() {
        return player1Score;
    }

    public void setPlayer1Score(Integer player1Score) {
        this.player1Score = player1Score;
    }

    public Integer getPlayer2Score() {
        return player2Score;
    }

    public void setPlayer2Score(Integer player2Score) {
        this.player2Score = player2Score;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Instant completedAt) {
        this.completedAt = completedAt;
    }
}
