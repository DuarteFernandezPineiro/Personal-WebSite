# Chat API

FastAPI service imported from the tested interactive CV project. It preserves the public `POST /api/chat` NDJSON contract while the Next.js application owns the new interface.

Run locally with `uvicorn web_chat_app:app --reload`. Configure `OPENAI_API_KEY`, the same server-only `CHAT_PROXY_SECRET` used by the Next deployment, explicit `CHAT_ALLOWED_ORIGINS`, `CHAT_ALLOWED_HOSTS` and secure cookies in production. Never commit `.env` or `.cache`.
