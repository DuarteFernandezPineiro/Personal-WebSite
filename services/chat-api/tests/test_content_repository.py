import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from content_repository import ContentRepository


class ContentRepositoryTests(unittest.TestCase):
    def test_uses_published_sanity_content_and_writes_last_known_good(self):
        payload = {"result": [{"_id": "source-1", "title": "Perfil", "content": {"es": "Dato verificado"}, "source": "CV"}]}
        with tempfile.TemporaryDirectory() as directory, patch.dict("os.environ", {"SANITY_PROJECT_ID": "abc123", "SANITY_DATASET": "production"}):
            root = Path(directory)
            repository = ContentRepository(root / "local", root / "cache.json", fetcher=lambda _url: json.dumps(payload).encode())
            documents = repository.load()
            self.assertEqual(documents[0].identifier, "source-1")
            self.assertTrue((root / "cache.json").is_file())

    def test_falls_back_to_local_markdown_when_remote_is_unavailable(self):
        with tempfile.TemporaryDirectory() as directory, patch.dict("os.environ", {"SANITY_PROJECT_ID": "abc123"}):
            root = Path(directory)
            local = root / "local"
            local.mkdir()
            (local / "Sobre_mi.md").write_text("Contenido seguro", encoding="utf-8")
            repository = ContentRepository(local, root / "cache.json", fetcher=lambda _url: (_ for _ in ()).throw(OSError("offline")))
            documents = repository.load()
            self.assertEqual(documents[0].source, "local-fallback")
            self.assertEqual(documents[0].content, "Contenido seguro")


if __name__ == "__main__":
    unittest.main()
