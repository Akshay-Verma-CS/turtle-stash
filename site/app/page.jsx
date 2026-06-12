import ArchitectureScene from "../components/ArchitectureScene";

const capabilities = [
  "Persistent agent memory",
  "Less repeated context",
  "Evidence-grounded answers",
  "Smarter model routing",
  "Safer database access",
  "Lower token spend"
];

const architecture = [
  ["Shared Memory", "Agents store durable project decisions, user preferences, tool results, summaries, and verified facts once, then retrieve them whenever needed."],
  ["Retrieval Layer", "Hybrid search finds only the most relevant memory chunks, so agents stop dragging huge repeated prompts into every run."],
  ["Agent Orchestrator", "Each run can retrieve memory, choose a model, call approved tools, write useful new context, and return an evidence-backed answer."],
  ["Model Router", "Simple jobs go to cheaper models, while coding, planning, debugging, and architecture tasks can use stronger models when needed."],
  ["Tool Registry", "Database queries and external actions pass through typed permissions, timeouts, result limits, redaction, and audit logs."],
  ["Database Connectors", "Agents can answer from approved PostgreSQL, MySQL, and MongoDB data without getting unrestricted write access."],
  ["Provider Adapters", "Teams can use Claude, OpenAI-compatible, Codex-compatible, and future providers without rewriting agent logic."]
];

const roadmap = [
  ["Shared memory spaces", "Project, user, tenant, document, and private agent memory with access controls and retention policies."],
  ["Hybrid retrieval", "Local embeddings plus keyword search, reranking, deduplication, and token-budgeted evidence packs."],
  ["Cost-aware routing", "Choose cheaper models for routine work and stronger models only when the task requires deeper reasoning."],
  ["Safe database tools", "Read-only query execution, schema discovery, result limits, and blocked destructive operations."],
  ["Grounded agent runs", "Answers cite memory, database rows, tool results, or documents instead of relying on unsupported guesses."],
  ["Verification loop", "Important answers are checked for unsupported claims before they reach the user."]
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
          <p className="eyebrow">Shared Memory For AI Agents</p>
          <h1>Turtle Stash</h1>
          <p className="hero-copy">
            A memory and routing layer where AI agents keep durable context, reuse knowledge across runs,
            choose the right model, and answer from evidence instead of starting from zero every time.
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
          <h2>Today’s AI agents are powerful, but they forget too much.</h2>
        </div>
        <div className="text-grid">
          <p>
            Most agents work by stuffing the current chat, a few files, and tool outputs into a model context window.
            When the run ends, useful knowledge is scattered in logs or lost. The next agent repeats discovery,
            burns tokens, and may reach a different conclusion.
          </p>
          <p>
            Turtle Stash turns memory into shared infrastructure. Agents can store what matters, retrieve only the
            relevant pieces, cite the evidence, and pass context safely between research, coding, support, analytics,
            and automation workflows.
          </p>
        </div>
      </section>

      <section className="section architecture" id="architecture">
        <div className="section-heading">
          <p className="eyebrow">High-Level Architecture</p>
          <h2>One memory layer, many specialized agents.</h2>
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
          <h2>Run the first building block locally.</h2>
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
              This repository starts with the secure service base. The final product grows from here into shared
              memory spaces, retrieval APIs, provider routing, database tools, and grounded agent runs.
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
          <h2>What Turtle Stash can unlock.</h2>
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
          <h2>Help build the memory layer agents are missing.</h2>
        </div>
        <div className="contribute-grid">
          <article>
            <h3>Good first areas</h3>
            <ul>
              <li>Design memory-space APIs for projects, users, documents, and agents.</li>
              <li>Prototype hybrid search with local embeddings and keyword retrieval.</li>
              <li>Add model routing policies that estimate cost, latency, and reasoning need.</li>
              <li>Build safe read-only database connector validators.</li>
              <li>Document real agent workflows that improve with shared memory.</li>
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
