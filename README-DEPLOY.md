# Despliegue automático — Cygnus Next

Push a `main` → GitHub Actions compila, publica la imagen en GHCR y la despliega en el servidor.

**URL final:** http://129.158.213.189:8100

## Arquitectura del pipeline

```
push a main
  → npm ci + npm run build (typecheck)
  → docker build multi-stage (Node 22 → Nginx, puerto 80)
  → push a GHCR: ghcr.io/<org>/<repo>:sha-<commit>
  → SSH al servidor (ubuntu@129.158.213.189)
  → docker pull + docker run (restart unless-stopped, límites CPU/RAM)
  → health check HTTP 200 en / (12 intentos × 5s)
  → fallo → rollback (remueve el contenedor roto)
```

## Configuración única (una sola vez)

### 1. Secretos del repositorio (GitHub → Settings → Secrets and variables → Actions)

| Secret | Valor |
|---|---|
| `DEPLOY_HOST` | `129.158.213.189` |
| `DEPLOY_USER` | `ubuntu` |
| `DEPLOY_SSH_KEY` | Llave privada SSH (dedicada, no tu llave personal) |
| `DEPLOY_KNOWN_HOSTS` | Salida de `ssh-keyscan -H 129.158.213.189` |
| `VITE_DEEPSEEK_API_KEY` | Tu key de DeepSeek (se inyecta como build-arg) |

> La key de DeepSeek NO se copia desde `.env` del desarrollador: viaja como secret de GitHub → build-arg → bundle. Así la imagen no contiene el secret en capas.

### 2. Login GHCR en el servidor (una vez, como root)

```bash
sudo docker login ghcr.io
```

Usa un token de lectura de paquetes. Necesario porque la imagen del repo es privada.

### 3. Verificar que el contenedor actual no ocupa el puerto

```bash
sudo docker ps --format '{{.Names}} {{.Ports}}' | grep 8100
```

Si algo ocupa `8100`, cambia `SOLUTION_PORT` en `.github/workflows/ci-cd.yml`.

## Operación diaria

- **Desplegar:** `git push origin main`
- **Ver estado:** GitHub → Actions → `deploy-cygnus-next`
- **Logs del contenedor:** `sudo docker logs -f ebk-solution-cygnus-next`
- **Forzar redeploy:** pestaña Actions → workflow → *Run workflow*

## Rollback manual

```bash
sudo docker rm -f ebk-solution-cygnus-next
# El health check del pipeline ya remueve el contenedor roto automáticamente;
# para volver a un SHA anterior, haz push de ese commit o usa el run anterior.
```