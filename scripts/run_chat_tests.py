"""Run the chat service test suite from the monorepo root."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SERVICE = ROOT / "services" / "chat-api"

sys.path.insert(0, str(SERVICE))

suite = unittest.defaultTestLoader.discover(str(SERVICE / "tests"))
result = unittest.TextTestRunner(verbosity=2).run(suite)
raise SystemExit(0 if result.wasSuccessful() else 1)
