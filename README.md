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

## Run

From repository root:

```bash
docker compose up -d
```

Then start the API:

```bash
cd api
./mvnw spring-boot:run
```

> On Windows PowerShell, use `.\mvnw.cmd spring-boot:run`.

## Curl demo (end-to-end)

Create players:

```bash
curl -X POST http://localhost:8080/players \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","region":"us-east","elo":1200}'

curl -X POST http://localhost:8080/players \
  -H "Content-Type: application/json" \
  -d '{"username":"bob","region":"us-east","elo":1230}'
```

List players:

```bash
curl http://localhost:8080/players
```

Join queue:

```bash
curl -X POST http://localhost:8080/queue/join \
  -H "Content-Type: application/json" \
  -d '{"playerId":1}'

curl -X POST http://localhost:8080/queue/join \
  -H "Content-Type: application/json" \
  -d '{"playerId":2}'
```

Inspect queues:

```bash
curl http://localhost:8080/queues
curl http://localhost:8080/queues/us-east
```

Run matchmaking tick:

```bash
curl -X POST http://localhost:8080/matchmake/tick
```

Fetch match details (replace ID if different):

```bash
curl http://localhost:8080/matches/1
```

Report result:

```bash
curl -X POST http://localhost:8080/matches/1/result \
  -H "Content-Type: application/json" \
  -d '{"winnerPlayerId":1,"player1Score":10,"player2Score":7}'
```

Leave queue (if needed):

```bash
curl -X POST http://localhost:8080/queue/leave \
  -H "Content-Type: application/json" \
  -d '{"playerId":1}'
```

## Optional frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.


