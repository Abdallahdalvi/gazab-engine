# CasaOS deployment

1. Copy `.env.example` to `.env` and replace every placeholder.
2. In Resend, verify the sending domain used by `RESEND_FROM` and create an API key.
   Add `CLARITY_PROJECT_ID`, `GA_MEASUREMENT_ID` and `META_PIXEL_ID` when those accounts are ready; blank values keep tracking disabled.
3. In CasaOS, use **App Store → Custom Install → Import Docker Compose** and paste `docker-compose.yml`, or run `docker compose pull && docker compose up -d` from this directory.
4. Open port `9740` through your reverse proxy/domain and enable HTTPS. The container listens on port `3000` internally and Docker publishes it on host port `9740`. Once HTTPS is working, set `ADMIN_COOKIE_SECURE=true` and restart the app.
5. Visit `/admin` and sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## Automatic updates with Watchtower

Every push to `main` builds and publishes a multi-architecture image to `ghcr.io/abdallahdalvi/gazab-engine:latest`. The compose service includes the Watchtower enable label, so a Watchtower instance configured with `--label-enable` can pull the new image and restart the app automatically.

The GitHub Container Registry package must be public for anonymous pulls. If it is private, log in on the CasaOS server with a GitHub personal access token that has `read:packages`; Watchtower uses the same Docker credentials.

After switching an existing source-built installation to the registry image, run this once:

```sh
git pull --ff-only origin main
docker compose pull
docker compose up -d --remove-orphans
```

Package enquiries and editable pricing are stored in `./data/gazab-package-data.json`. The compose volume keeps this file when the container is rebuilt.

For production, use a password manager-generated admin password and a random `ADMIN_SESSION_SECRET` of at least 32 characters. Do not commit `.env`.
