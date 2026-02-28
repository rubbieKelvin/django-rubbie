#!/usr/bin/env sh
# Run the test_project Django server from repo root.
# Ensures PYTHONPATH includes the repo so the local rubbie app is used.
cd "$(dirname "$0")/.." && PYTHONPATH=. uv run python test_project/manage.py runserver "$@"
