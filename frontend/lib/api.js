const API_PREFIX = "/api";

async function request(path, options = {}) {
  const method = options.method || "GET";
  const response = await fetch(`${API_PREFIX}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      ...(method !== "GET" && method !== "HEAD" ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  let payload = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    const message =
      (payload && payload.message) ||
      (payload && payload.error) ||
      `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export function getPlayers() {
  return request("/players");
}

export function getHealth() {
  return request("/actuator/health");
}

export function createPlayer(input) {
  return request("/players", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function getQueues() {
  return request("/queues");
}

export function getQueueByRegion(region) {
  return request(`/queues/${encodeURIComponent(region)}`);
}

export function joinQueue(playerId) {
  return request("/queue/join", {
    method: "POST",
    body: JSON.stringify({ playerId: Number(playerId) })
  });
}

export function leaveQueue(playerId) {
  return request("/queue/leave", {
    method: "POST",
    body: JSON.stringify({ playerId: Number(playerId) })
  });
}

export function runTick() {
  return request("/matchmake/tick", { method: "POST" });
}

export function getMatch(matchId) {
  return request(`/matches/${Number(matchId)}`);
}

export function reportMatchResult(matchId, input) {
  return request(`/matches/${Number(matchId)}/result`, {
    method: "POST",
    body: JSON.stringify({
      winnerPlayerId: Number(input.winnerPlayerId),
      player1Score: Number(input.player1Score),
      player2Score: Number(input.player2Score)
    })
  });
}
