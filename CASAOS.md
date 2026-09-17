# CasaOS deployment

1. Copy `.env.example` to `.env` and replace every placeholder.
2. In Resend, verify the sending domain used by `RESEND_FROM` and create an API key.
   Add `CLARITY_PROJECT_ID`, `GA_MEASUREMENT_ID` and `META_PIXEL_ID` when those accounts are ready; blank values keep tracking disabled.
3. In CasaOS, use **App Store → Custom Install → Import Docker Compose** and paste `docker-compose.yml`, or run `docker compose up -d --build` from this directory.
4. Open port `9740` through your reverse proxy/domain and enable HTTPS. The container listens on port `3000` internally and Docker publishes it on host port `9740`. Once HTTPS is working, set `ADMIN_COOKIE_SECURE=true` and restart the app.
5. Visit `/admin` and sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

Package enquiries and editable pricing are stored in `./data/gazab-package-data.json`. The compose volume keeps this file when the container is rebuilt.

For production, use a password manager-generated admin password and a random `ADMIN_SESSION_SECRET` of at least 32 characters. Do not commit `.env`.
