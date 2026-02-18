# MatchForge
<img width="1179" height="753" alt="image" src="https://github.com/user-attachments/assets/dd374c33-c521-470b-9208-0f69928e1178" />


Monorepo containing:
- `api`: Spring Boot 3 (Java 21) REST API
- `frontend`: optional minimal Next.js UI (`Home`, `Browse`, `Queue Details`, `About`)
- `docker-compose.yml`: PostgreSQL + Redis

## API features

- Flyway migrations for PostgreSQL schema
- JPA entities: `Player`, `Match`
- Redis per-region matchmaking queues using sorted sets (`ZSET`)
- Widening Elo window over time in queue
- Concurrency safety against double-matching using Redis atomic scripts:
  - pair lock acquisition
  - conditional pair dequeue

## Endpoints

- `POST /players`
- `GET /players`
- `POST /queue/join`
- `POST /queue/leave`
- `GET /queues`
- `GET /queues/{region}`
- `POST /matchmake/tick`
- `GET /matches/{id}`
- `POST /matches/{id}/result`

