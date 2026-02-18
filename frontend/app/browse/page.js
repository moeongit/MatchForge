"use client";

import { useEffect, useState } from "react";
import { createPlayer, getPlayers } from "../../lib/api";
import { formatDate, formatRegion } from "../../lib/format";

export default function BrowsePage() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({ username: "", region: "us-east", elo: 1200 });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadPlayers() {
    try {
      setError("");
      setLoading(true);
      const data = await getPlayers();
      setPlayers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(event) {
    event.preventDefault();
    try {
      setError("");
      setSuccess("");
      await createPlayer({
        username: form.username,
        region: form.region.trim().toLowerCase(),
        elo: Number(form.elo)
      });
      setForm({ ...form, username: "" });
      await loadPlayers();
      setSuccess("Player created.");
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadPlayers();
  }, []);

  const filteredPlayers = players.filter((player) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      String(player.id).includes(q) ||
      player.username.toLowerCase().includes(q) ||
      player.region.toLowerCase().includes(q)
    );
  });

  return (
    <section>
      <div className="grid">
        <div className="card col-5">
          <h2>Create Player</h2>
          <p className="muted">Add players to the matchmaking pool.</p>
          <form className="stack" onSubmit={handleCreate}>
            <input
              placeholder="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <input
              placeholder="region (ex: us-east)"
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
              required
            />
            <input
              placeholder="elo"
              type="number"
              value={form.elo}
              onChange={(e) => setForm({ ...form, elo: e.target.value })}
              min={100}
              max={4000}
              required
            />
            <button type="submit">Create Player</button>
          </form>
          {error ? <p className="error">{error}</p> : null}
          {success ? <p className="success">{success}</p> : null}
        </div>

        <div className="card col-7">
          <h2>Player Directory</h2>
          <div className="row">
            <input
              placeholder="Search by id, username, or region"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={loadPlayers} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
          <div className="spacer" />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Region</th>
                  <th>Elo</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlayers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="muted">
                      No players match your filter.
                    </td>
                  </tr>
                ) : (
                  filteredPlayers
                    .slice()
                    .sort((a, b) => b.elo - a.elo)
                    .map((player) => (
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
      </div>
    </section>
  );
}
