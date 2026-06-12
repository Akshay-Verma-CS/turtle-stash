# Turtle Stash

Turtle Stash is the backend foundation for a secure AI Agent Service. It is designed to grow into a system that can route agent tasks across multiple AI providers, connect safely to databases, and use shared external memory to ground answers in trusted evidence.

This first version focuses on the production backend base:

- FastAPI service
- PostgreSQL-backed tenant storage
- Alembic migrations
- API key authentication
- Structured JSON request logs
- Safe error handling
- Docker Compose development setup
- pytest test suite

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
