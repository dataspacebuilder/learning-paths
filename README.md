# Learn Dataspaces

Guided learning paths for understanding, operating, and building sovereign data sharing systems.

This repository contains the source for a static documentation site focused on practical dataspace onboarding. The current visible content is organized into three learning paths:

- **A Dataspace Use Case** — a story-first introduction using an offshore wind product-information sharing use case.
- **Set Up a Dataspace Platform** — guidance for deploying and operating managed, self-hosted, and hybrid dataspace platform capabilities.
- **Build a Dataspace Application** — guidance for building participant software that publishes data, consumes data, negotiates access, uses identity, and serves data through managed, standalone, or application-based data planes.

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
