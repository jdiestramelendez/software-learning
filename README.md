# Bitwise

A React app for learning software engineering in bite-sized lessons — built on a
hand-rolled, Duolingo-flavoured design system.

**Two tracks · 39 units · 212 questions · English and Spanish.** Every unit opens
with a teaching card, then asks four kinds of question, and explains every wrong
answer — in both languages.

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Vite dev server with fast refresh     |
| `npm run build`   | Typecheck, then production bundle     |
| `npm run preview` | Serve the production bundle           |
| `npm test`        | Vitest (run once)                     |
| `npm run test:watch` | Vitest in watch mode               |
| `npm run lint`    | oxlint                                |
| `npm run typecheck` | `tsc -b`                            |

## Stack

- **React 19** + **TypeScript** (strict), bundled by **Vite**
- **Tailwind CSS v4** — CSS-first config, no `tailwind.config.js`
- **React Router 7** for routing
- **CVA** + **tailwind-merge** for typed component variants
- **Vitest** + **Testing Library** for tests
- `@/` is an alias for `src/`

## The design system

> Duolingo's own system ("Feathers") is internal and not published as a package,
> so this is a from-scratch implementation of the same design language. That is
> the point: you can read every line of it.

Everything lives in `src/design-system/`:

```
design-system/
  tokens.css              every colour, radius, shadow and easing curve
  lib/cn.ts               class merging (later utilities win)
  components/             the component library
  index.ts                the public surface — always import from here
```

```tsx
import { Button, Card, ProgressBar } from '@/design-system'
```

Visit **`/design-system`** in the running app for the living style guide — if a
component is not on that page, it does not exist.

### The five rules

1. **Tokens, never hex.** Components read `bg-feather-green`, not `#58cc02`. New
   colour? Add it to `tokens.css` first. Tailwind v4 turns every `@theme` entry
   into a utility automatically.
2. **Colours are named after animals.** `eel`, `wolf`, `hare`, `swan`, `polar`
   for neutrals; `feather-green`, `macaw`, `cardinal`, `bee`, `fox`, `beetle`
   for meaning. It is much easier to argue about "eel vs wolf" than about two
   greys.
3. **Everything presses.** Interactive surfaces carry a hard `0 4px 0` shadow
   with no blur — an extruded plastic face — and translate down 3px on
   `:active`. That behaviour lives in one place, the `.ds-press` class in
   `index.css`.
4. **Bold, rounded, roomy.** Body weight is 700 and nothing is sharper than 8px.
   Buttons are uppercase with wide tracking (`text-eyebrow`).
5. **Colour is never the only signal.** A selected choice changes its border,
   its background, *and* its `aria-pressed`. Icon-only buttons take a required
   `label`.

### Components

| Component        | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| `Button`         | 6 variants × 3 sizes; the press is the whole personality   |
| `IconButton`     | Square icon target; requires an accessible `label`         |
| `Card`           | Default container — 2px swan border, hard bottom edge      |
| `ProgressBar`    | Lesson / goal progress, with the rounded-tube highlight    |
| `Badge`          | Small status pill in six tones                             |
| `ChoiceCard`     | Selectable answer: `idle` / `selected` / `correct` / `wrong` |
| `FeedbackFooter` | The green/red sheet that explains a wrong answer           |
| `SkillNode`      | A path bubble with an SVG progress ring                    |
| `StatPill`       | The streak / gems / hearts counters                        |
| `Avatar`         | Initials with a deterministic colour per name              |

Variants are typed. `<Button variant="banana" />` is a compile error.

## The content

All course material lives in `src/content/`, typed end to end:

```
Track  ->  Section  ->  Unit  ->  Concept card + Questions
```

| Track | Sections | Units | Questions |
| --- | --- | --- | --- |
| **Software Foundations** — from reading code to running it in production | 5 | 25 | 137 |
| **AWS & the Cloud** — how the cloud actually works | 4 | 14 | 75 |

**Software Foundations**: how a computer thinks (data structures, Big-O,
algorithms, memory, data representation) · code that survives other humans
(naming, abstraction, errors, testing, debugging) · working on a team (git,
code review, CI/CD) · the web and its systems (HTTP, API design, databases,
transactions, security, concurrency, networking, caching) · running it in
production (Linux, containers, observability, system design).

**AWS**: cloud fundamentals (regions and AZs, IAM, the cost model) · compute
(EC2, Lambda, containers) · storage, data and networking (S3, databases, VPC,
CloudFront) · gluing a system together (messaging, API Gateway, CloudWatch,
Well-Architected).

### Four question types

| Kind | What it asks |
| --- | --- |
| `choice` | Pick one of several options |
| `boolean` | Judge a claim — good for myth-busting |
| `gap` | Fill the `___` in a code sample; the blank fills in place |
| `order` | Put steps in sequence, by tapping rather than dragging |

Adding content means adding a typed object — no component changes. The compiler
catches most mistakes, and `content.test.ts` catches the rest: duplicate ids, an
`answerIndex` past the end of its `choices`, a gap question with no gap, an
explanation too short to teach anything.

### Progress

Progress lives in `localStorage` under `bitwise.progress.v1` — no account, no
server. Units unlock in order: the first incomplete unit is active, everything
after it is locked. XP and the streak count once per unit, so practising again
is free. Every storage access degrades gracefully if `localStorage` throws
(Safari private mode, full quota).

Locked units are unreachable from the path, but a direct URL still opens one —
deliberate, so you can jump straight to a topic you care about.

## Two languages

The whole app — UI *and* all 212 questions — is available in English and
Spanish, switchable from the top bar. The choice is stored under
`bitwise.lang.v1`; with nothing stored, the browser's own preference decides.

### One type does the work

```ts
type LocalizedText = string | { en: string; es: string }
```

A plain string is language-neutral and shown as-is — code samples, `O(n²)`,
`git add`, `403`, `bcrypt`. An object carries one value per language. Only
actual prose is doubled, which keeps the content files readable.

Crucially, **the structure is stored once**: ids, `answerIndex`, question kinds
and how many choices exist are shared by both languages. A translation
physically cannot drift out of sync with the original — you cannot end up with
four options in English and three in Spanish, or a different correct answer.

Two consequences worth knowing:

- **Ordering answers are indices, not text** (`{ kind: 'order', value: [0, 2, 1] }`).
  Grading and the shuffle both work on positions, so switching language
  mid-question keeps your answer intact and the pool in the same order.
- **UI strings are typed against English.** `es` is `Record<StringKey, string>`,
  so a forgotten translation is a compile error rather than a blank label. A
  test also checks that `{placeholders}` survive translation.

### Adding a language

1. Add the code to `LANGUAGES` in `src/content/types.ts`.
2. Add the dictionary in `src/features/i18n/strings.ts` — the compiler will list
   every string you still owe.
3. Fill in the new key on each `LocalizedText` object; `content.test.ts` fails
   with the exact path of anything missing.
4. Add a flag and short code to `LanguageSwitch`.

## App structure
## App structure

```
src/
  components/AppLayout.tsx      left rail on desktop, tab bar on mobile
  content/                      the entire curriculum, typed and bilingual
    types.ts                    Track / Section / Unit / Concept / Question
                                + LocalizedText and the language list
    foundations/  aws/          one file per section
    index.ts                    track registry + lookup helpers
  design-system/                see above
  features/
    i18n/                       language context, UI dictionary
    lesson/                     answer grading + the lesson state machine
    progress/                   localStorage, unlocking, streaks
  pages/
    TracksPage.tsx              choose a track
    LearnPage.tsx               the path, grouped into sections
    LessonPage.tsx              full-screen unit: concept, then questions
    ProfilePage.tsx             stats, achievements, reset
    DesignSystemPage.tsx        the living style guide (English only — it is
                                developer documentation, not course content)
```

`useLesson` holds the quiz rules with no routing or storage attached, so they
are unit-testable on their own. Keyboard: `1`-`9` pick an option, `Enter`
checks and advances.

## Deploying

The app is a **static SPA** — `npm run build` emits `dist/` and that is the whole
artifact. No server, no database, no environment variables. Any static host will
serve it.

### Vercel

`vercel.json` already holds everything Vercel needs. The two parts that matter:

- **`rewrites`** — the app uses `BrowserRouter`, so `/profile` and
  `/lesson/big-o` exist only in the browser. Without a catch-all rewrite to
  `index.html`, reloading one of those URLs returns a 404. Static files still
  win: rewrites only apply when nothing matches on disk.
- **`headers`** — Vite fingerprints every asset filename, so `/assets/*` is
  cached forever while `index.html` is never cached. Without that split, users
  keep loading stale asset URLs after a deploy.

To deploy: import the repo at [vercel.com/new](https://vercel.com/new). Vercel
detects Vite, reads `vercel.json`, and builds. Every push to `main` ships to
production; every pull request gets its own preview URL.

**You do not need a GitHub Actions workflow to deploy.** Vercel's Git
integration does that natively — `.github/workflows/ci.yml` is a *quality gate*
(typecheck, lint, test, build), not a deploy pipeline. A deploy workflow would
only duplicate work Vercel already does.

### Other hosts

| Host | What it needs |
| --- | --- |
| Cloudflare Pages / Netlify | Build `npm run build`, output `dist`, plus the same SPA fallback |
| GitHub Pages | `base` in `vite.config.ts`, `basename` on `BrowserRouter`, and a `404.html` copy of `index.html` |
| nginx / Docker | `try_files $uri $uri/ /index.html;` |

## Where to take it next

- Sync progress to a real backend so it follows you across devices
- Spaced repetition: resurface the questions you got wrong
- Replace the emoji icons with a real icon set
- More question types: matching pairs, free-text code entry
- More languages — the model already supports it, see above
- A dark theme — redefine the neutrals inside `@theme` and the rest follows
