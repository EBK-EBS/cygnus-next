# Operación de Cygnus Next

Este repositorio conserva el frontend React y la rama `master`. GitHub
Actions ejecuta CI (`npm ci` y `npm run build`) y conserva el historial de
commits; no publica contenedores ni abre una conexión SSH al servidor.

## Flujo vigente

1. OpenCode trabaja sobre el checkout del servidor, ejecuta validaciones y
   publica el commit en `master`.
2. Ethos BK verifica que el checkout coincida con `origin/master`.
3. El entrypoint controlado de Ethos construye esta imagen con
   `VITE_CYGNUS_API_URL`, la ejecuta en `127.0.0.1:8100` y comprueba la URL
   pública `https://cygnus-next.129-158-213-189.nip.io/`.
4. Si el frontend no responde, se restaura la imagen anterior. El backend se
   empaqueta y reinicia por separado desde su repositorio hermano.

La configuración de rutas, Docker, Nginx, Oracle y credenciales pertenece al
servidor o a Ethos BK, no a este workflow.

## Variables

El servidor debe proporcionar `VITE_CYGNUS_API_URL` durante el build. No lo
fijes en el código ni lo guardes como un secreto de GitHub Actions.

La aplicación todavía contiene un cliente directo de DeepSeek basado en
`VITE_DEEPSEEK_API_KEY`. Esa clave queda expuesta en el bundle del navegador;
es una deuda de seguridad separada que debe resolverse con un proxy backend
antes de considerar el producto listo para producción. El nuevo despliegue no
inyecta esa clave automáticamente.

## Desarrollo local

```powershell
npm ci
npm run build
```

Para la ejecución local, configura `VITE_CYGNUS_API_URL` en el entorno o usa
el valor por defecto del cliente.
