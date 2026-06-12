# Turtle Stash

Turtle Stash is a backend foundation for building safer, more useful AI agents.

Most AI apps start as a prompt wrapped around one model. That works for demos, but production agents need more: they need to choose the right model for each task, remember useful context across sessions, connect to trusted data sources, respect permissions, and explain where their answers came from.

Turtle Stash is designed to become that layer.

It gives developers a production-minded starting point for an AI Agent Service that can eventually:

- Route simple tasks to cheaper models and complex tasks to stronger reasoning models.
- Connect to multiple AI providers instead of being locked into one vendor.
- Store shared external memory that agents can search and reuse safely.
- Ground answers in retrieved memory, uploaded documents, database rows, and tool results.
- Connect to databases through read-only, permission-checked tools.
- Keep tenants, agents, credentials, memory spaces, and audit logs separated.
- Reduce hallucination by requiring evidence before factual answers.
- Reduce cost by using local embeddings, retrieval, and model routing instead of sending everything to the biggest model.
- Support future agent workflows such as coding agents, research agents, database copilots, support bots, analytics assistants, and internal automation agents.

## Why This Matters

AI agents become much more valuable when they can use context beyond the current chat. A coding agent should remember project decisions. A data assistant should query approved databases without dangerous write access. A support agent should answer from verified product docs, not guesses. A business workflow agent should leave an audit trail of what it read, what tool it called, and why it selected a model.

Turtle Stash is built around those ideas:

- **Trust:** answers should be backed by evidence where possible.
- **Control:** credentials, tools, and memory access should be permissioned.
- **Cost awareness:** not every task needs the most expensive model.
- **Extensibility:** providers, databases, memory stores, and agent runtimes should be replaceable.
- **Security by default:** sensitive actions should fail closed when permissions are unclear.

## Current Status

This first version focuses on the production backend base:

- FastAPI service
- PostgreSQL-backed tenant storage
- Alembic migrations
- API key authentication
- Structured JSON request logs
- Safe error handling
- Docker Compose development setup
- pytest test suite

It does not yet implement model routing, provider adapters, database connectors, or shared memory retrieval. The current release is the foundation those systems will build on.

## Roadmap Possibilities

Turtle Stash can grow in phases:

1. **Provider management:** securely store and rotate Claude, OpenAI-compatible, Codex-compatible, or other provider tokens.
2. **Model catalog and routing:** register model capabilities, score task complexity, estimate cost, and choose fallback models.
3. **Agent runtime:** create agents with allowed tools, memory spaces, budgets, and execution limits.
4. **Database connectors:** safely connect PostgreSQL, MySQL, and MongoDB with read-only defaults, timeouts, row limits, and audit logs.
5. **Tool registry:** expose every external action through typed, permission-checked, audited tools.
6. **Shared memory:** store versioned memory chunks with local embeddings, keyword search, hybrid retrieval, deduplication, and retention policies.
7. **Grounded execution:** retrieve evidence before answering, cite sources, and say when there is not enough information.
8. **Verification:** detect unsupported claims before returning important answers.

The long-term goal is an agent backend where multiple specialized agents can safely share memory, use approved tools, and choose the right model for the job.

## Run With Docker Compose

```sh
docker compose up --build
```

The API listens on [http://localhost:8000](http://localhost:8000).

Docker Compose starts PostgreSQL, runs migrations, and serves the API.

## Run Locally

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Start PostgreSQL separately or update `DATABASE_URL` in `.env`, then run:

```sh
alembic upgrade head
uvicorn app.main:app --reload
```

## API Examples

Health check:

```sh
curl http://localhost:8000/health
```

Create tenant:

```sh
curl -X POST http://localhost:8000/tenants \
  -H "X-API-Key: dev-local-api-key" \
  -H "Content-Type: application/json" \
  -d '{"name":"Acme"}'
```

Replace `dev-local-api-key` with the `API_KEY` value from your environment.

Get tenant:

```sh
curl http://localhost:8000/tenants/{tenant_id} \
  -H "X-API-Key: dev-local-api-key"
```

## Tests

```sh
.venv/bin/pytest
```

## Project Layout

- `app/api` contains FastAPI routes and dependencies.
- `app/core` contains configuration, logging, error handling, and security helpers.
- `app/db` contains SQLAlchemy session setup.
- `app/models` contains database models.
- `app/schemas` contains request and response schemas.
- `migrations` contains Alembic database migrations.
- `tests` contains the pytest suite.

## Who This Is For

Turtle Stash is for developers building AI systems that need to move beyond single-prompt prototypes:

- SaaS teams adding AI assistants to products.
- Internal platform teams building agent infrastructure.
- Developers experimenting with multi-provider AI routing.
- Teams that need database-aware agents with strict safety boundaries.
- Builders who want memory, retrieval, tools, and auditability as first-class backend concepts.
