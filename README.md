# Documentation

Minimal Astro Starlight documentation project.

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

For reproducible installs in CI, use:

```sh
npm ci
```

The production build is emitted to `dist/` and can be served by any static web server.

## Notes

- Documentation pages live in `src/content/docs/` as Markdown or MDX.
- Local Starlight search is enabled by default for production builds.
- No OpenAPI viewer, hosted search, analytics, or AI features are configured.
