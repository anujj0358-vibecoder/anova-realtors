# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.
This project is the **ANOVA Realtors** luxury real estate website.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Wouter (routing) + TanStack Query

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Project: ANOVA Realtors

Luxury real estate website with premium black/gold aesthetic.

### Artifact: sadhana-realtors (previewPath: /)

**Pages:**
- `/` — Home page: hero, Buy/Rent property toggle + cards, 35-location grid, Private Advisory (Mrs Sadhna), WhatsApp lead form
- `/properties` — Full property listings with Buy/Rent toggle, location/type/budget filters, property grid
- `/properties/:id` — Property detail page: image, specs, description, sticky advisory contact card with WhatsApp CTA
- `/admin` — Admin panel: add new listings form + view/delete existing listings (no auth required)

### Artifact: api-server (previewPath: /api)

**Endpoints:**
- `GET /api/properties` — list with optional filters: `type`, `location`, `minBudget`, `maxBudget`, `propertyType`
- `GET /api/properties/:id` — single property
- `POST /api/properties` — create property (admin)
- `PATCH /api/properties/:id` — update property (admin)
- `DELETE /api/properties/:id` — delete property (admin)

### DB Schema

`lib/db/src/schema/properties.ts` — `propertiesTable` with:
- id, title, price (display string), priceValue (numeric for filtering)
- location, type (buy/rent), propertyType
- description, imageUrl, beds, baths, area, createdAt

### Codegen Note

After updating `lib/api-spec/openapi.yaml`, run:
```
pnpm --filter @workspace/api-spec run codegen
```
The codegen script post-processes `lib/api-zod/src/index.ts` to strip phantom barrel exports that orval v8 generates in split mode.

### Contact Info
- WhatsApp: 9667451381
- Email: anovai.magency@gmail.com
