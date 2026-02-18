CREATE TABLE players (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    region VARCHAR(32) NOT NULL,
    elo INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE matches (
    id BIGSERIAL PRIMARY KEY,
    region VARCHAR(32) NOT NULL,
    player1_id BIGINT NOT NULL REFERENCES players(id),
    player2_id BIGINT NOT NULL REFERENCES players(id),
    status VARCHAR(20) NOT NULL,
    winner_player_id BIGINT,
    player1_score INTEGER,
    player2_score INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE INDEX idx_players_region ON players(region);
CREATE INDEX idx_players_elo ON players(elo);
CREATE INDEX idx_matches_status ON matches(status);
