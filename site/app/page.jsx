import ArchitectureScene from "../components/ArchitectureScene";

const capabilities = [
  "Multi-provider model routing",
  "Shared external memory",
  "Grounded answers with evidence",
  "Read-only database tools",
  "Tenant isolation and audit logs",
  "Local embeddings and hybrid retrieval"
];

const architecture = [
  ["API Layer", "Authenticates requests, resolves tenants, validates payloads, and exposes agent, memory, provider, and connector APIs."],
  ["Agent Orchestrator", "Coordinates each run: retrieve context, route model, execute allowed tools, checkpoint progress, and verify output."],
  ["Model Router", "Chooses a model using complexity, cost, latency, capabilities, context size, provider health, and fallback rules."],
  ["Tool Registry", "Makes every external action typed, permission-checked, timed, limited, and audited before execution."],
  ["Memory Service", "Stores versioned memory chunks, creates embeddings, runs keyword/vector search, deduplicates, and packs evidence."],
  ["Database Connectors", "Provide safe read-only access to PostgreSQL, MySQL, and MongoDB with timeouts and result limits."],
  ["Provider Adapters", "Keep Claude, OpenAI-compatible, Codex-compatible, and future provider details behind common interfaces."]
];

const roadmap = [
  ["Provider management", "Encrypted token storage, rotation, health checks, and adapter placeholders."],
  ["Model catalog and routing", "Model metadata, task complexity scoring, cost estimation, and fallback chains."],
  ["Agent runtime", "Agent configs, run states, checkpoints, model calls, and execution limits."],
  ["Database connectors", "PostgreSQL, MySQL, and MongoDB read-only tools with schema discovery and query safety."],
  ["Shared memory", "Memory spaces, chunks, local embeddings, pgvector, full-text search, reranking, and retention."],
  ["Grounded execution", "Evidence-first answers, citations, insufficient-evidence responses, and claim verification."]
];

const steps = [
  "git clone git@github.com:Akshay-Verma-CS/turtle-stash.git",
  "cd turtle-stash",
  "docker compose up --build",
  "curl http://localhost:8000/health"
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top">Turtle Stash</a>
          <div>
            <a href="#architecture">Architecture</a>
            <a href="#docs">Docs</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#contribute">Contribute</a>
          </div>
        </nav>

        <ArchitectureScene />

        <div className="hero-content">
          <p className="eyebrow">AI Agent Service Foundation</p>
          <h1>Turtle Stash</h1>
          <p className="hero-copy">
            A secure backend layer for AI agents that need model routing, shared memory, safe database access,
            evidence-grounded answers, and auditability.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#docs">Start building</a>
            <a className="button secondary" href="https://github.com/Akshay-Verma-CS/turtle-stash">View repo</a>
          </div>
        </div>

        <div className="capability-strip" aria-label="Core possibilities">
          {capabilities.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section intro">
        <div className="section-heading">
          <p className="eyebrow">Why It Exists</p>
          <h2>Production AI agents need more than a prompt and a model key.</h2>
        </div>
        <div className="text-grid">
          <p>
            Turtle Stash is built for teams that want agents to remember project context, query trusted data,
            choose the right model for the task, and explain what evidence shaped an answer.
          </p>
          <p>
            The current repo is the backend foundation: FastAPI, PostgreSQL, migrations, tenant APIs, API-key
            authentication, structured logs, Docker Compose, and tests. The architecture is intentionally modular
            so provider adapters, memory retrieval, database tools, and agent runtimes can land cleanly.
          </p>
        </div>
      </section>

      <section className="section architecture" id="architecture">
        <div className="section-heading">
          <p className="eyebrow">High-Level Architecture</p>
          <h2>A modular backend for routing, tools, memory, and evidence.</h2>
        </div>
        <div className="architecture-grid">
          {architecture.map(([title, body]) => (
            <article className="feature-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section docs" id="docs">
        <div className="section-heading">
          <p className="eyebrow">Use The App</p>
          <h2>Run the backend locally in minutes.</h2>
        </div>
        <div className="docs-layout">
          <div className="terminal" aria-label="Quickstart commands">
            {steps.map((step, index) => (
              <p key={step}><span>{index + 1}</span>{step}</p>
            ))}
          </div>
          <div className="docs-copy">
            <h3>Current API surface</h3>
            <p>
              Phase one exposes a health check and tenant management endpoints. Use `X-API-Key` for protected
              routes and configure the key with the `API_KEY` environment variable.
            </p>
            <pre>{`GET  /health
POST /tenants
GET  /tenants/{tenant_id}`}</pre>
            <a className="button primary" href="https://github.com/Akshay-Verma-CS/turtle-stash#api-examples">
              Read API examples
            </a>
          </div>
        </div>
      </section>

      <section className="section roadmap" id="roadmap">
        <div className="section-heading">
          <p className="eyebrow">Upcoming Features</p>
          <h2>The path from backend foundation to agent infrastructure.</h2>
        </div>
        <div className="timeline">
          {roadmap.map(([title, body], index) => (
            <article className="timeline-item" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section contribute" id="contribute">
        <div className="section-heading">
          <p className="eyebrow">Contribute</p>
          <h2>Help shape a safer open agent backend.</h2>
        </div>
        <div className="contribute-grid">
          <article>
            <h3>Good first areas</h3>
            <ul>
              <li>Improve FastAPI route coverage and integration tests.</li>
              <li>Add provider adapter interfaces and mocks.</li>
              <li>Prototype model routing metadata and scoring.</li>
              <li>Design read-only connector validators for SQL and MongoDB.</li>
              <li>Document safe deployment patterns.</li>
            </ul>
          </article>
          <article>
            <h3>Contact</h3>
            <p>
              Maintainer: Akshay Verma. The best way to reach out is through GitHub issues or pull requests in
              the Turtle Stash repository.
            </p>
            <a className="button secondary" href="https://github.com/Akshay-Verma-CS">GitHub profile</a>
            <a className="button primary" href="https://github.com/Akshay-Verma-CS/turtle-stash/issues">
              Open an issue
            </a>
          </article>
        </div>
      </section>
    </main>
  );
}
