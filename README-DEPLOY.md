# Despliegue automático — Cygnus Next

Push a `master` → GitHub Actions compila, publica la imagen en GHCR y la despliega en el servidor.

**URL final:** http://cygnus-next.129-158-213-189.nip.io/

## Arquitectura del pipeline

```
push a master
  → npm ci + npm run build (typecheck)
  → docker build multi-stage (Node 22 → Nginx, puerto 80)
  → push a GHCR: ghcr.io/<org>/<repo>:sha-<commit>
  → SSH al servidor (ubuntu@129.158.213.189)
  → Nginx publica el hostname y proxifica al puerto local 8100
  → docker pull + docker run en 127.0.0.1:8100 (restart unless-stopped, límites CPU/RAM)
  → health check local + rollback dentro del servidor
  → health check público HTTP 200 a través de Nginx (12 intentos × 5s)
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

### 3. El puerto de Docker no se expone a Internet

El workflow enlaza `8100` únicamente a `127.0.0.1`, por lo que no es necesario abrir
ese puerto en Oracle Cloud ni en el firewall. Nginx atiende el hostname público por
el puerto 80 y reenvía internamente a la solución. Si otro contenedor ocupa `8100`,
el despliegue lo indicará y se debe cambiar `SOLUTION_PORT` junto con el proxy.

## Operación diaria

- **Desplegar:** `git push origin master`
- **Ver estado:** GitHub → Actions → `deploy-cygnus-next`
- **Logs del contenedor:** `sudo docker logs -f ebk-solution-cygnus-next`
- **Forzar redeploy:** pestaña Actions → workflow → *Run workflow*

## Diagnóstico y rollback

```bash
sudo docker logs --tail 120 ebk-solution-cygnus-next
# Si falla el health check local, el workflow restaura automáticamente la
# imagen anterior. Un fallo únicamente en Nginx queda visible para diagnóstico.
```
