"""Repositorio editorial con Sanity, caché local y última copia válida.

El contenido recuperado se devuelve como datos sin interpretar. Las instrucciones
del sistema del asistente siguen siendo la única autoridad ejecutable.
"""

from __future__ import annotations

import json
import os
import time
import urllib.parse
import urllib.request
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Callable


@dataclass(frozen=True)
class ContentDocument:
    identifier: str
    title: str
    content: str
    source: str


class ContentRepository:
    def __init__(
        self,
        local_root: Path,
        cache_path: Path,
        *,
        ttl_seconds: int = 300,
        fetcher: Callable[[str], bytes] | None = None,
    ) -> None:
        self.local_root = local_root
        self.cache_path = cache_path
        self.ttl_seconds = ttl_seconds
        self.fetcher = fetcher or self._fetch
        self._memory: tuple[float, list[ContentDocument]] | None = None

    def load(self) -> list[ContentDocument]:
        now = time.time()
        if self._memory and now - self._memory[0] < self.ttl_seconds:
            return self._memory[1]
        try:
            documents = self._load_sanity()
            if documents:
                self._write_cache(documents)
                self._memory = (now, documents)
                return documents
        except (OSError, ValueError, json.JSONDecodeError):
            pass
        documents = self._read_cache() or self._load_local()
        self._memory = (now, documents)
        return documents

    def _load_sanity(self) -> list[ContentDocument]:
        project_id = os.getenv("SANITY_PROJECT_ID", "").strip()
        dataset = os.getenv("SANITY_DATASET", "production").strip()
        if not project_id:
            return []
        query = '*[_type == "chatSource" && status == "published" && visible == true && confidential != true]{_id,title,content,source}'
        url = f"https://{project_id}.api.sanity.io/v2025-02-19/data/query/{dataset}?query={urllib.parse.quote(query)}"
        payload = json.loads(self.fetcher(url).decode("utf-8"))
        result = payload.get("result")
        if not isinstance(result, list):
            raise ValueError("Invalid Sanity response")
        return [
            ContentDocument(
                identifier=str(item.get("_id", "")),
                title=str(item.get("title", "")),
                content=json.dumps(item.get("content", {}), ensure_ascii=False),
                source=str(item.get("source", "sanity")),
            )
            for item in result
            if item.get("_id") and item.get("content")
        ]

    def _load_local(self) -> list[ContentDocument]:
        return [
            ContentDocument(path.stem, path.stem.replace("_", " "), path.read_text(encoding="utf-8"), "local-fallback")
            for path in sorted(self.local_root.glob("*.md"))
        ]

    def _write_cache(self, documents: list[ContentDocument]) -> None:
        self.cache_path.parent.mkdir(parents=True, exist_ok=True)
        temp_path = self.cache_path.with_suffix(".tmp")
        temp_path.write_text(json.dumps([asdict(item) for item in documents], ensure_ascii=False), encoding="utf-8")
        temp_path.replace(self.cache_path)

    def _read_cache(self) -> list[ContentDocument]:
        if not self.cache_path.is_file():
            return []
        raw = json.loads(self.cache_path.read_text(encoding="utf-8"))
        return [ContentDocument(**item) for item in raw if isinstance(item, dict)]

    @staticmethod
    def _fetch(url: str) -> bytes:
        request = urllib.request.Request(url, headers={"User-Agent": "duarte-portfolio-chat/1.0"})
        with urllib.request.urlopen(request, timeout=5) as response:
            return response.read()
