# Chat security boundary

This note records the controls that protect the public AI assistant and the remaining production responsibilities. It does not claim that a public endpoint can be made absolutely abuse-proof.

## Secrets and trust boundary

- `OPENAI_API_KEY` is read only by `services/chat-api/web_chat_app.py`. It is not a `NEXT_PUBLIC_*` variable, is not returned by `/api/public-config`, and is not sent to Next or the browser.
- The browser calls the same-origin Next route `/api/chat`. Next calls FastAPI using `CHAT_API_URL` and, in production, authenticates that server-to-server hop with `CHAT_PROXY_SECRET`.
- Set the same long random `CHAT_PROXY_SECRET` in Vercel and the FastAPI host. Never prefix it with `NEXT_PUBLIC_` or commit it.

## Application controls

- Request bodies are capped at 32 KiB and messages at 2,000 characters.
- Output caps are 1,200, 2,600 or 5,200 tokens by detail level; planning defaults to 2,000 tokens.
- FastAPI admits at most two generations concurrently, queues at most twenty, limits each client to twelve requests per minute and bounds tracked clients and sessions.
- `CHAT_MAX_MONTHLY_REQUESTS` is an in-process cost fuse with a secure default of 1,000 requests rather than unlimited usage.
- CORS origins, trusted hosts, secure cookies, HSTS and the private proxy credential are configurable for production.
- Provider errors and logs do not expose prompts, API keys or internal exception text to the browser.

## Production controls outside the repository

The in-process counters reset when the service restarts and are not shared by multiple replicas. Before making the site public:

1. Configure an enforced hard spend limit and alerts on the dedicated OpenAI API project.
2. Add a Vercel WAF rate-limit rule for `POST /api/chat` and enable Bot Protection in challenge mode.
3. Keep one FastAPI worker unless rate/session/budget state is moved to a shared store such as Redis.
4. Monitor Vercel Firewall traffic, FastAPI 429/403 responses and OpenAI project usage.

For a public launch with multiple FastAPI replicas, replace the in-memory minute and monthly counters with a shared atomic store. The provider hard spend limit remains the final economic boundary.
