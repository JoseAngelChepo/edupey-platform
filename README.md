# EduPey Platform

Frontend Next.js de EduPey: crowdfunding educativo con donaciones (sin retorno financiero).

Contexto: [docs/edupey/PRODUCT_CONTEXT.md](docs/edupey/PRODUCT_CONTEXT.md) · Plan: [MVP](docs/edupey/MVP.md) · Setup: [SETUP](docs/edupey/SETUP.md).

API hermana: [edupey-services](https://github.com/JoseAngelChepo/edupey-services).

## Routes

| Path | Access |
|------|--------|
| `/` | Landing pública |
| `/sign-in`, `/sign-up` | Auth |
| `/campanas`, `/campanas/[id]` | Catálogo y detalle de campañas |
| `/dashboard` | Seguimiento autenticado |
| `/dashboard/template` | Shell de plantilla conservado |
| `/auth/google/callback` | OAuth callback (público) |

Prefijos `/en` y `/es` los maneja `src/proxy.ts` (`NEXT_LOCALE`).

## Quick start

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Requiere **edupey-services** en `http://localhost:3001`.

## Environment

| Variable | Default (dev) |
|----------|----------------|
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001/api/v1` |

Ver [`.env.example`](./.env.example). **Nunca** subir `.env` ni `.env.local`.

## Scripts

```bash
npm run dev          # desarrollo
npm run dev:clean    # limpia .next y arranca
npm run build        # build de producción
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run audit:security
```

## Docs

| Topic | File |
|-------|------|
| Producto EduPey | [`docs/edupey/`](./docs/edupey/) |
| Components & styling | [`docs/COMPONENTS.md`](./docs/COMPONENTS.md) |
| Landing | [`docs/LANDING.md`](./docs/LANDING.md) |
| Fonts | [`docs/FONTS.md`](./docs/FONTS.md) |

## Layout

```
src/
  app/                 # Rutas
  components/
    ui/ auth/ layout/ landing/ campaigns/
  content/landing.ts
  data/api/server/     # Cliente API + auth + campaigns
  messages/            # en / es
docs/edupey/           # Contexto de producto
```

## Security

- No hay secretos en el repo; solo placeholders en `.env.example`.
- Autorización de datos protegidos: en la API, no solo en `AuthGuard`.
