# Learn Dataspaces

Guided learning paths for understanding, integrating, and building sovereign data sharing systems.

This repository contains the source for a static documentation site focused on practical dataspace onboarding. The current content is organized into four paths:

- **A Dataspace Use Case** — a story-first introduction using an offshore wind product-information sharing use case.
- **Integrate a Participant** — guidance for publishing data, consuming data, using management APIs, identity, and data planes.
- **Set Up a Dataspace Platform** — guidance for managed dataspace services, provisioning, identity, and customer handoff.
- **Build a Dataspace Offering** — guidance on what Eclipse components provide and what a provider builds or operates.

## Content

Documentation source files live in `src/content/docs/` as Markdown or MDX.

## Requirements

- Node.js 24.11.0
- npm 11.6.1

The Node.js version is recorded in `.tool-versions`; the npm version is recorded in `package.json`.

## Commands

```sh
npm install
npm run dev
npm run build
npm run preview
```

For reproducible installs in CI:

```sh
npm ci
```

The production build is emitted to `dist/` and can be served by any static web server.
