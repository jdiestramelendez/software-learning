# Bitwise

A React app for learning software engineering in bite-sized lessons — built on a
hand-rolled, Duolingo-flavoured design system.

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

## App structure

```
src/
  components/AppLayout.tsx    left rail on desktop, tab bar on mobile
  data/course.ts              the course content (typed, static for now)
  design-system/              see above
  features/lesson/useLesson.ts  the quiz state machine (+ its tests)
  pages/
    LearnPage.tsx             the winding path of skill bubbles
    LessonPage.tsx            full-screen quiz — keys 1–9 pick, Enter checks
    ProfilePage.tsx           stats and achievements
    DesignSystemPage.tsx      the living style guide
```

`useLesson` is deliberately free of routing and data fetching, so the quiz rules
are unit-testable on their own — see `useLesson.test.ts`.

## Where to take it next

- Persist progress (localStorage, then a real API) instead of resetting on reload
- Replace the emoji icons with a real icon set
- Add lesson types beyond multiple choice: fill-in-the-blank, ordering, matching
- A dark theme — redefine the neutrals inside `@theme` and the rest follows
