package com.matchforge.api.repository;

import com.matchforge.api.domain.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long> {
}
