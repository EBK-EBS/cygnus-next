# Cygnus Next frontend

This repository is the active Cygnus Next React frontend. Work on the existing
application and preserve its router, layout, navigation tree, authentication,
and API client conventions.

## Checks

- Install: `npm ci`
- Validate: `npm run build`

The deployment branch is `master`. Ethos BK/OpenCode works on this checkout,
commits and pushes the requested changes, and the Ethos server performs the
deployment after verifying the remote commit. Do not deploy over SSH, modify
Nginx, or add GitHub Actions deployment logic here. Do not put API keys or
server credentials in source, Vite build output, or committed configuration.

The backend is a separate sibling repository. Use `VITE_CYGNUS_API_URL` for
the API base URL and keep it configurable by the server-side image build.
