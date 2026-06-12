import os

os.environ.setdefault("API_KEY", "test-api-key")
os.environ.setdefault("DATABASE_URL", "sqlite:////tmp/turtlestash-test.db")

import pytest
from fastapi.testclient import TestClient

from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.main import app
from app.models.tenant import Tenant

Base.metadata.create_all(bind=engine)


@pytest.fixture(autouse=True)
def clean_tenants() -> None:
    db = SessionLocal()
    try:
        db.query(Tenant).delete()
        db.commit()
    finally:
        db.close()


def test_tenant_endpoints_require_api_key() -> None:
    client = TestClient(app)

    response = client.post("/tenants", json={"name": "Acme"})

    assert response.status_code == 401


def test_create_and_read_tenant() -> None:
    client = TestClient(app)

    create_response = client.post(
        "/tenants",
        json={"name": "Acme"},
        headers={"X-API-Key": "test-api-key"},
    )

    assert create_response.status_code == 201
    payload = create_response.json()
    assert payload["name"] == "Acme"
    assert payload["id"]

    read_response = client.get(
        f"/tenants/{payload['id']}",
        headers={"X-API-Key": "test-api-key"},
    )

    assert read_response.status_code == 200
    assert read_response.json()["id"] == payload["id"]


def test_duplicate_tenant_name_is_rejected() -> None:
    client = TestClient(app)
    headers = {"X-API-Key": "test-api-key"}

    first_response = client.post("/tenants", json={"name": "Acme"}, headers=headers)
    second_response = client.post("/tenants", json={"name": "Acme"}, headers=headers)

    assert first_response.status_code == 201
    assert second_response.status_code == 409
