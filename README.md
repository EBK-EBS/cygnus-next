# Cygnus Next

## Desarrollo local

Transversales se ejecuta en `http://localhost:8081` y Cygnus Next en
`http://localhost:5174`, evitando el puerto utilizado por Civil Alpha.

```powershell
# Terminal 1 — Transversales (Java 21)
cd C:\Users\User.admin\Documents\EBS\Transversales
mvn spring-boot:run

# Terminal 2 — Cygnus Next
cd 'C:\Users\User.admin\Documents\EBS\Cygnus Next\interfaz'
npm run dev
```

Abre `http://localhost:5174/` y usa estas credenciales de prueba:

```text
usuario: cygnus.test
contraseña: CygnusNext123!
```

El tenant `cygnus-next` se envía internamente y no se muestra en pantalla.

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
