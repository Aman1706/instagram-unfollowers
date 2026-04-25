# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Instagram Unfollowers — a Next.js app where users upload their Instagram data export (JSON files) and see who doesn't follow them back.

No Instagram API or OAuth involved. All processing is client-side from the exported JSON files Instagram provides via **Settings → Your activity → Download your information**.

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

Always use `npm` (not yarn or pnpm).

## Code conventions

- **Arrow functions** everywhere — no `function` declarations. Use `const Foo = () => {}` and `export default Foo`.
- **Types** live in `types/` — import from `@/types/instagram`.
- **Pure functions** (data transformation, no React) live in `utils/`.
- **Custom hooks** live in `hooks/` — all `useState` declarations and the functions that update them belong in a hook, not directly in components.
- **Components** live in `components/`.
- **Custom styles** that can't be expressed in Tailwind live in `styles/` — imported in `app/layout.tsx` since global CSS can only be imported in Server Components.

## Stack

- **Next.js 16** (App Router) — TypeScript, no `src/` dir, `@/*` maps to root
- **Tailwind CSS v4** — design tokens defined in `app/globals.css` via `@theme`; custom utilities (`.animate-rise`) via `@layer utilities`; custom CSS only for pseudo-elements and complex selectors (`styles/page.css`)
- **React 19**

## Tailwind design tokens (`app/globals.css`)

| Token | Value | Usage |
|---|---|---|
| `canvas` | `#080808` | page background |
| `surface` / `surface-up` | `#111` / `#181818` | cards, hover |
| `edge` | `#222` | borders, dividers |
| `ink` | `#ede8e3` | primary text |
| `dim` | `#555` | muted text, labels |
| `rose` | `#d98fa0` | accent / CTAs |
| `jade` | `#6dcfa3` | success states |
| `ember` | `#e07a7a` | error states |

Fonts: `font-serif` → Playfair Display, `font-mono` → DM Mono (also the body default).

## Architecture

The app is entirely client-side. Flow:

1. User uploads two JSON files: `followers_1.json` and `following.json`
2. `utils/instagram.ts` parses them (`parseFile`) and diffs them (`computeUnfollowers`)
3. `hooks/useInstagramAnalysis.ts` owns all state and handlers
4. Results render as a numbered list with profile links

### Instagram JSON shape

Both files share the same structure:

```json
[
  {
    "string_list_data": [
      { "href": "https://www.instagram.com/username", "value": "username", "timestamp": 1234567890 }
    ]
  }
]
```

Extract usernames from `item.string_list_data[0].value`.
