"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getMatch,
  getPlayers,
  getQueueByRegion,
  getQueues,
  joinQueue,
  leaveQueue,
  reportMatchResult,
  runTick
} from "../../lib/api";
import { formatDate, formatRegion } from "../../lib/format";

export default function QueuePage() {
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState("");
  const [region, setRegion] = useState("us-east");
  const [queues, setQueues] = useState({});
  const [regionQueue, setRegionQueue] = useState([]);
  const [matchId, setMatchId] = useState("1");
  const [match, setMatch] = useState(null);
  const [result, setResult] = useState({ winnerPlayerId: "", player1Score: "", player2Score: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function safe(action) {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      await action();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function refreshOverview() {
    const [playersData, queueData] = await Promise.all([getPlayers(), getQueues()]);
    setPlayers(playersData || []);
    setQueues(queueData || {});
  }

  useEffect(() => {
    safe(refreshOverview);
  }, []);

  const selectedPlayer = useMemo(
    () => players.find((player) => String(player.id) === String(playerId)),
    [players, playerId]
  );

  const queueRows = Object.entries(queues).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <section>
      <div className="grid">
        <div className="card col-12">
          <h2>Queue and Match Operations</h2>
          <p className="muted">
            Operate queue workflows, run matchmaking, and record final match results.
          </p>
          {error ? <p className="error">{error}</p> : null}
          {success ? <p className="success">{success}</p> : null}
        </div>

        <div className="card col-6">
          <h3>Queue Controls</h3>
          <div className="stack">
            <select value={playerId} onChange={(e) => setPlayerId(e.target.value)}>
              <option value="">Select player</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.id} - {player.username} ({formatRegion(player.region)}, {player.elo})
                </option>
              ))}
            </select>
            <input value={region} onChange={(e) => setRegion(e.target.value.toLowerCase())} />
            <div className="actions">
              <button
                disabled={!playerId || loading}
                onClick={() =>
                  safe(async () => {
                    await joinQueue(playerId);
                    await refreshOverview();
                    setSuccess(`Player ${playerId} joined queue.`);
                  })
                }
              >
                Join Queue
              </button>
              <button
                disabled={!playerId || loading}
                onClick={() =>
                  safe(async () => {
                    await leaveQueue(playerId);
                    await refreshOverview();
                    setSuccess(`Player ${playerId} left queue.`);
                  })
                }
              >
                Leave Queue
              </button>
              <button onClick={() => safe(refreshOverview)} disabled={loading}>
                Refresh Queues
              </button>
              <button
                onClick={() =>
                  safe(async () => {
                    const payload = await runTick();
                    await refreshOverview();
                    setSuccess(`Tick completed. Created ${payload.created} match(es).`);
                  })
                }
                disabled={loading}
              >
                Matchmake Tick
              </button>
            </div>
            <p className="muted">
              Selected player region: {selectedPlayer ? formatRegion(selectedPlayer.region) : "-"}
            </p>
          </div>
        </div>

        <div className="card col-6">
          <h3>Region Queue Details</h3>
          <div className="actions">
            <input value={region} onChange={(e) => setRegion(e.target.value.toLowerCase())} />
            <button
              onClick={() =>
                safe(async () => {
                  const payload = await getQueueByRegion(region);
                  setRegionQueue(payload || []);
                })
              }
            >
              Load Region Queue
            </button>
          </div>
          <div className="spacer" />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Queued</th>
                </tr>
              </thead>
              <tbody>
                {queueRows.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="muted">
                      No active regions.
                    </td>
                  </tr>
                ) : (
                  queueRows.map(([name, size]) => (
                    <tr key={name}>
                      <td>{formatRegion(name)}</td>
                      <td>{size}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="spacer" />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Player ID</th>
                  <th>Elo</th>
                  <th>Joined At</th>
                </tr>
              </thead>
              <tbody>
                {regionQueue.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="muted">
                      No players in selected region queue.
                    </td>
                  </tr>
                ) : (
                  regionQueue.map((entry) => (
                    <tr key={`${entry.playerId}-${entry.joinedAtEpochSeconds}`}>
                      <td>{entry.playerId}</td>
                      <td>{entry.elo}</td>
                      <td>{formatDate(entry.joinedAtEpochSeconds * 1000)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card col-12">
          <h3>Match Result Reporting</h3>
          <div className="grid">
            <div className="col-4">
              <div className="stack">
                <input
                  placeholder="match id"
                  type="number"
                  value={matchId}
                  onChange={(e) => setMatchId(e.target.value)}
                />
                <button onClick={() => safe(async () => setMatch(await getMatch(matchId)))}>
                  Load Match
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="stack">
                <input
                  placeholder="winner player id"
                  type="number"
                  value={result.winnerPlayerId}
                  onChange={(e) => setResult({ ...result, winnerPlayerId: e.target.value })}
                />
                <input
                  placeholder="player1 score"
                  type="number"
                  value={result.player1Score}
                  onChange={(e) => setResult({ ...result, player1Score: e.target.value })}
                />
                <input
                  placeholder="player2 score"
                  type="number"
                  value={result.player2Score}
                  onChange={(e) => setResult({ ...result, player2Score: e.target.value })}
                />
                <button
                  onClick={() =>
                    safe(async () => {
                      await reportMatchResult(matchId, result);
                      setMatch(await getMatch(matchId));
                      setSuccess(`Reported result for match ${matchId}.`);
                    })
                  }
                >
                  Submit Result
                </button>
              </div>
            </div>
            <div className="col-4">
              <div className="card card-compact">
                <h4>Current Match</h4>
                {match ? (
                  <div className="stack">
                    <p>
                      Status:{" "}
                      <span className={`badge ${String(match.status).toLowerCase()}`}>
                        {match.status}
                      </span>
                    </p>
                    <p>
                      Players: {match.player1Id} vs {match.player2Id}
                    </p>
                    <p>Winner: {match.winnerPlayerId ?? "-"}</p>
                    <p>Created: {formatDate(match.createdAt)}</p>
                  </div>
                ) : (
                  <p className="muted">Load a match to inspect or submit results.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
