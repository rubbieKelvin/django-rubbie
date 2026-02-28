import typing as t

from django.db import models


class RegistrationConfig(t.TypedDict):
    pass


_CONFIGURED_MODELS: list[tuple[type[models.Model], RegistrationConfig | None]] = []


def register(model: type[models.Model], config: RegistrationConfig | None = None):
    _CONFIGURED_MODELS.append((model, config))
