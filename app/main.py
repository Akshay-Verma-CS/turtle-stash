from fastapi import FastAPI

from app.api.routes import health, tenants
from app.core.config import get_settings
from app.core.errors import install_exception_handlers
from app.core.logging import configure_logging, request_logging_middleware


def create_app() -> FastAPI:
    settings = get_settings()
    configure_logging(settings.log_level)

    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        docs_url="/docs" if settings.enable_docs else None,
        redoc_url="/redoc" if settings.enable_docs else None,
    )
    app.middleware("http")(request_logging_middleware)
    install_exception_handlers(app)
    app.include_router(health.router)
    app.include_router(tenants.router)
    return app


app = create_app()
