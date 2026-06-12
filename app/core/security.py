SECRET_FIELD_NAMES = {
    "api_key",
    "authorization",
    "connection_string",
    "credentials",
    "database_url",
    "password",
    "secret",
    "token",
}


def redact_secrets(value: object) -> object:
    if isinstance(value, dict):
        return {
            key: "[redacted]" if key.lower() in SECRET_FIELD_NAMES else redact_secrets(item)
            for key, item in value.items()
        }

    if isinstance(value, list):
        return [redact_secrets(item) for item in value]

    return value
