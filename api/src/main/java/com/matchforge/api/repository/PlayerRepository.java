package com.matchforge.api.repository;

import com.matchforge.api.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Long> {
}
