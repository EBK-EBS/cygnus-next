# ============================================================
# Cygnus Next — imagen de producción (React SPA sobre Nginx)
# Multi-stage: build con Node → runtime con Nginx (puerto 80)
# ============================================================

# --- Stage 1: build ---
FROM node:22-alpine AS build

WORKDIR /app

# La key de DeepSeek se inyecta en BUILD TIME desde un secret de GitHub
# (nunca se versiona ni se copia desde .env del desarrollador)
ARG VITE_DEEPSEEK_API_KEY
ENV VITE_DEEPSEEK_API_KEY=$VITE_DEEPSEEK_API_KEY

# Instalar dependencias primero (aprovecha cache de capas)
COPY package.json package-lock.json ./
RUN npm ci

# Copiar fuente y compilar
COPY . .
RUN npm run build

# --- Stage 2: runtime ---
FROM nginx:1.27-alpine

# Configuración SPA (fallback a index.html + gzip + cache de assets)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Artefacto compilado
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Health check para el pipeline (curl está disponible en nginx:alpine)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

# Nginx como proceso principal (no root)
STOPSIGNAL SIGQUIT
CMD ["nginx", "-g", "daemon off;"]