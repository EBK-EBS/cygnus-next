# Cygnus Next

## Desarrollo local

El backend de Cygnus Next se ejecuta en `http://localhost:8080` y la interfaz
en `http://localhost:5174`. La autenticación y los usuarios se consultan en la
base de datos configurada por el backend; no se necesita levantar otro servicio
para iniciar sesión.

```powershell
# Terminal 1 — Backend Cygnus Next (Java 17+)
cd 'C:\Users\User.admin\Documents\EBS\Cygnus Next\cygnus-next-backend'
$env:SPRING_PROFILES_ACTIVE="demo"
$env:CYGNUS_AUTH_JWT_SECRET_BASE64="MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI="
.\mvnw.cmd spring-boot:run

# Terminal 2 — Cygnus Next
cd 'C:\Users\User.admin\Documents\EBS\Cygnus Next\interfaz'
npm run dev
```

Abre `http://localhost:5174/` y usa estas credenciales de prueba:

```text
usuario: sysadm
contraseña: CygnusNext123!
```

El login usa `USUARIOS.C_LOGIN` y valida `USUARIOS.C_CLAVE` mediante el formato
configurado en el backend.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
