# Clover Legends Wiki

An independent, fan-made wiki and guide hub for the Roblox game Clover Legends. It covers active codes, all 12 grimoires, community tier lists, and beginner, awakening and leveling guides.

## Local development

```bash
npm ci
npm run dev
```

## Build

The site is a statically exported Next.js app deployed to GitHub Pages:

```bash
npm run build:site
```

The build writes the static output to `out/`, including `.nojekyll` for GitHub Pages.

## Package source

To share the source as a ZIP (excludes dependencies, build output and private environment files):

```bash
npm run package
```

## Content

Game content lives in `content/data/` (`site.json`, `home.json`, `pages.json`). Update page copy there and run `npm run typecheck && npm run lint && npm run build:site` before publishing.

## Disclaimer

This is an independent, fan-made resource. It is not affiliated with or endorsed by Flecks Labs: Legends or Roblox Corporation. Clover Legends and related names are property of their respective owners.
