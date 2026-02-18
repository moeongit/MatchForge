"use client";

import { useEffect, useState } from "react";
import { getHealth, getPlayers, getQueues, runTick } from "../lib/api";
import { formatDate, formatRegion } from "../lib/format";

export default function HomePage() {
  const [players, setPlayers] = useState([]);
  const [queues, setQueues] = useState({});
  const [tickResult, setTickResult] = useState(null);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function refresh() {
    try {
      setError("");
      setLoading(true);
      const [playersData, queuesData, healthData] = await Promise.all([
        getPlayers(),
        getQueues(),
        getHealth()
      ]);
      setPlayers(playersData || []);
      setQueues(queuesData || {});
      setHealth(healthData || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleTick() {
    try {
      setError("");
      setSuccess("");
      const result = await runTick();
      setTickResult(result);
      await refresh();
      setSuccess(`Tick completed. Created ${result?.created ?? 0} match(es).`);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const queueRows = Object.entries(queues).sort((a, b) => a[0].localeCompare(b[0]));
  const topPlayers = [...players].sort((a, b) => b.elo - a.elo).slice(0, 10);

  return (
    <section>
      <div className="grid">
        <div className="card col-8">
          <h2 className="section-title">Operations Dashboard</h2>
          <p className="muted">Live overview of queues, players, and matchmaking activity.</p>
          <div className="actions">
            <button onClick={refresh} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh Data"}
            </button>
            <button onClick={handleTick}>Run Matchmake Tick</button>
          </div>
          {error ? <p className="error">{error}</p> : null}
          {success ? <p className="success">{success}</p> : null}
        </div>

        <div className="card col-4">
          <h3 className="section-title">Backend Status</h3>
          <p>
            <span className={`badge ${health?.status === "UP" ? "completed" : "pending"}`}>
              {health?.status || "UNKNOWN"}
            </span>
          </p>
          <p className="muted">Source: `/actuator/health` via frontend proxy.</p>
        </div>

        <div className="card col-4">
          <p className="muted">Registered Players</p>
          <p className="stat">{players.length}</p>
        </div>
        <div className="card col-4">
          <p className="muted">Active Regions</p>
          <p className="stat">{queueRows.length}</p>
        </div>
        <div className="card col-4">
          <p className="muted">Last Tick Matches</p>
          <p className="stat">{tickResult?.created ?? 0}</p>
        </div>

        <div className="card col-6">
          <h3>Queue Summary</h3>
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
                      No queued regions yet.
                    </td>
                  </tr>
                ) : (
                  queueRows.map(([region, size]) => (
                    <tr key={region}>
                      <td>{formatRegion(region)}</td>
                      <td>{size}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card col-6">
          <h3>Top Players</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Player</th>
                  <th>Region</th>
                  <th>Elo</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {topPlayers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="muted">
                      No players found.
                    </td>
                  </tr>
                ) : (
                  topPlayers.map((player) => (
                    <tr key={player.id}>
                      <td>{player.id}</td>
                      <td>{player.username}</td>
                      <td>{formatRegion(player.region)}</td>
                      <td>{player.elo}</td>
                      <td>{formatDate(player.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card col-12">
          <h3>Last Tick Payload</h3>
          <pre>{JSON.stringify(tickResult, null, 2)}</pre>
        </div>
      </div>
    </section>
  );
}
