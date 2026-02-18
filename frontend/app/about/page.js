export default function AboutPage() {
  return (
    <section className="grid">
      <div className="card col-8">
        <h2>About MatchForge</h2>
        <p>
          MatchForge is a region-based matchmaking platform with PostgreSQL persistence,
          Redis queueing, and an Elo-based widening matchmaking window.
        </p>
        <p className="muted">
          This frontend is designed as an operations console for player management, queue operations,
          and match result reporting.
        </p>
      </div>
      <div className="card col-4">
        <h3>Readiness Checklist</h3>
        <ul>
          <li>Containerized runtime</li>
          <li>Flyway schema management</li>
          <li>Redis atomic queue safety</li>
          <li>Frontend API proxy integration</li>
        </ul>
      </div>
      <div className="card col-12">
        <h3>Deploy Notes</h3>
        <p>
          Configure the frontend with <code>MATCHFORGE_API_BASE</code> to point to the API service URL in
          your deployment environment.
        </p>
      </div>
    </section>
  );
}
