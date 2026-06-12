from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "AI Agent Service"
    app_version: str = "0.1.0"
    environment: str = "development"
    database_url: str = Field(
        default="postgresql+psycopg://agent_service:agent_service@postgres:5432/agent_service"
    )
    api_key: str = Field(default="dev-local-api-key")
    log_level: str = "INFO"
    enable_docs: bool = True


@lru_cache
def get_settings() -> Settings:
    return Settings()
