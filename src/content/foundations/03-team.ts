import type { Section } from '../types'

export const team: Section = {
  id: 'team',
  title: 'Working on a team',
  subtitle: 'Software is a team sport. These are the rules of play.',
  units: [
    {
      id: 'git',
      title: 'Git',
      icon: '🌿',
      summary: 'Version control, and how to undo absolutely anything.',
      concept: {
        headline: 'Git is a graph of snapshots. A branch is just a label pointing at one.',
        body: [
          'Every commit is a full snapshot of your project plus a pointer to its parent. Branches are cheap because they are nothing more than a movable label — creating one copies nothing.',
          'Work moves through three places: your working directory, the staging area (what will go into the next commit), and the repository (committed history).',
        ],
        keyPoints: [
          '`add` stages, `commit` records, `push` publishes. Three separate steps on purpose.',
          'Merge preserves history and adds a merge commit. Rebase rewrites your commits onto a new base — linear, but new hashes.',
          'Never rebase or force-push a branch other people have pulled.',
          'Almost nothing is truly lost: `git reflog` remembers where HEAD has been.',
        ],
        example: {
          caption: 'Undoing things, in increasing severity',
          code: `git restore file.ts            # discard uncommitted changes to a file
git reset --soft HEAD~1        # undo last commit, keep the changes staged
git revert <sha>               # new commit that undoes an old one (safe on shared branches)
git reflog                     # find a commit you thought you destroyed`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'git-1',
          prompt: 'Which command stages a file without committing it?',
          choices: ['git commit', 'git add', 'git push', 'git stash'],
          answerIndex: 1,
          explanation:
            '`git add` moves changes into the staging area. Keeping staging separate from committing is what lets you commit only part of your work — one logical change per commit.',
        },
        {
          kind: 'choice',
          id: 'git-2',
          prompt: 'What does `git rebase main` do to your branch?',
          choices: [
            'Deletes commits older than main',
            'Replays your commits on top of main, giving them new hashes',
            'Merges main into your branch with a merge commit',
            'Pushes your branch to main',
          ],
          answerIndex: 1,
          explanation:
            'Rebase rewrites your commits so they start from the tip of main. The history is linear and clean — but the hashes change, which is why it is dangerous on a branch someone else has already pulled.',
        },
        {
          kind: 'boolean',
          id: 'git-3',
          prompt: 'True or false?',
          statement: 'Force-pushing a shared branch is fine as long as you tell the team afterwards.',
          answer: false,
          explanation:
            'Force-pushing rewrites history that others have already based work on. Their next pull conflicts with itself, and recovering means manual surgery on every checkout. Use `git revert` on shared branches — it undoes changes by adding a commit rather than rewriting.',
        },
        {
          kind: 'choice',
          id: 'git-4',
          prompt: 'You committed a secret API key and pushed. What is the correct response?',
          choices: [
            'Delete the line and commit again',
            'Rotate the key immediately — it is in the history and must be treated as compromised',
            'Force-push over it and move on',
            'Make the repo private',
          ],
          answerIndex: 1,
          explanation:
            'The key exists in history, in every clone, and in any bot that scrapes public pushes — often within seconds. Purging history is secondary; revoking and reissuing the credential is the only thing that actually protects you.',
        },
        {
          kind: 'choice',
          id: 'git-5',
          prompt: 'What is a merge conflict?',
          choices: [
            'Two branches with the same name',
            'Two branches changed the same lines and git cannot pick a winner',
            'A corrupted repository',
            'A push rejected by the server',
          ],
          answerIndex: 1,
          explanation:
            'Git merges automatically when changes touch different regions. When both sides edited the same lines, it has no way to know which is right, so it hands you both versions and asks you to decide.',
        },
      
        {
          kind: 'gap',
          id: 'git-6',
          prompt: 'Complete the command that undoes a commit on a SHARED branch safely.',
          code: `# main is public; other people have already pulled it
git ___ a1b2c3d`,
          choices: ['revert', 'reset --hard', 'rebase -i', 'commit --amend'],
          answerIndex: 0,
          explanation:
            '`revert` creates a NEW commit that undoes the old one, so history everyone else holds stays valid. The other three rewrite history and break every other checkout.',
        },],
    },
    {
      id: 'code-review',
      title: 'Code review',
      icon: '👀',
      summary: 'How to give feedback that helps, and receive it without flinching.',
      concept: {
        headline: 'Review is about sharing knowledge, not catching people out.',
        body: [
          'Bugs found in review are a bonus. The real value is spreading context: now two people understand that code, and the reviewer learns the part of the system they had not touched.',
          'The single biggest factor in review quality is size. Under 200 lines gets careful attention; a 2,000-line PR gets "LGTM" and a rubber stamp.',
        ],
        keyPoints: [
          'Small PRs get real reviews. Split large work into reviewable steps.',
          'Comment on the code, not the person: "this could null here", not "you forgot".',
          'Separate blocking issues from preferences — label nitpicks as nitpicks.',
          'If you cannot explain WHY, it is a preference, not a standard. Automate real standards with a linter.',
        ],
        example: {
          caption: 'The same feedback, twice',
          code: `❌ "This is wrong, you clearly did not test it."

✅ "If \`items\` is empty this divides by zero — line 42.
    Worth an early return? (blocking)"

✅ "nit: I'd name this \`activeUsers\`, but happy either way."`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'cr-1',
          prompt: 'What most improves the quality of a code review?',
          choices: [
            'More reviewers',
            'A smaller pull request',
            'A longer description',
            'Reviewing at the end of the sprint',
          ],
          answerIndex: 1,
          explanation:
            'Attention per line collapses as size grows. Studies and experience agree: beyond a few hundred lines, defect detection drops sharply because reviewers start skimming.',
        },
        {
          kind: 'boolean',
          id: 'cr-2',
          prompt: 'True or false?',
          statement: 'Formatting and style debates are a good use of code review time.',
          answer: false,
          explanation:
            'Those should be settled once by a formatter and a linter running in CI. Human review time is expensive — spend it on logic, edge cases, naming, and design, which no tool can check.',
        },
        {
          kind: 'choice',
          id: 'cr-3',
          prompt: 'A reviewer suggests a large refactor on your PR. What is usually the best response?',
          choices: [
            'Do it immediately in this PR',
            'Ignore it',
            'Agree on the direction and do it in a follow-up PR',
            'Close the PR',
          ],
          answerIndex: 2,
          explanation:
            'Growing a PR to satisfy a refactor makes it harder to review and delays shipping. Capture the idea, agree it matters, and keep the current change focused — as long as the follow-up genuinely happens.',
        },
        {
          kind: 'choice',
          id: 'cr-4',
          prompt: 'What should a reviewer prioritise ABOVE everything else?',
          choices: [
            'Variable naming',
            'Correctness and edge cases',
            'Line length',
            'Commit message style',
          ],
          answerIndex: 1,
          explanation:
            'Does it work, and does it fail safely when the input is empty, null, huge, or hostile? Naming matters, but a beautifully named function that corrupts data on an empty list is still a broken function.',
        },
        {
          kind: 'choice',
          id: 'cr-5',
          prompt: 'Why is it useful to label a comment as "nit"?',
          choices: [
            'It is required by GitHub',
            'It tells the author which comments block merging and which are optional',
            'It makes the review shorter',
            'It hides the comment from others',
          ],
          answerIndex: 1,
          explanation:
            'Without that signal, authors treat every comment as mandatory and reviews grind on. Explicitly marking preferences as optional keeps things moving and keeps trust intact.',
        },
      ],
    },
    {
      id: 'ci-cd',
      title: 'CI/CD',
      icon: '🔄',
      summary: 'Automating the path from your laptop to production.',
      concept: {
        headline: 'CI protects the main branch. CD gets changes to users.',
        body: [
          'Continuous Integration runs your checks — build, lint, tests — on every change, so main stays releasable. Continuous Delivery/Deployment takes what passed and ships it.',
          'The economics are simple: the cost of fixing a bug rises steeply the later it is found. A pipeline pushes discovery as early as possible, ideally before a human ever reviews it.',
        ],
        keyPoints: [
          'CI must be fast. A 40-minute pipeline stops being a feedback loop and becomes a queue.',
          'Red main is an emergency — everyone is blocked until it is green.',
          'Build once, deploy the same artifact to every environment. Rebuilding per environment means you never tested what you shipped.',
          'Deploy strategies: blue-green (two environments, flip traffic), canary (a small % first), rolling (replace instances gradually).',
        ],
        example: {
          caption: 'The minimum viable pipeline',
          code: `on: [pull_request]
jobs:
  verify:
    steps:
      - checkout
      - install dependencies
      - typecheck
      - lint
      - test
      - build          # the same command production uses`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'ci-1',
          prompt: 'What is the main purpose of Continuous Integration?',
          choices: [
            'Deploying to production automatically',
            'Catching broken changes early, keeping the main branch always releasable',
            'Managing servers',
            'Writing tests for you',
          ],
          answerIndex: 1,
          explanation:
            'CI is the gate. Every change gets built and tested before it lands, so main never drifts into a broken state that someone discovers days later on release day.',
        },
        {
          kind: 'choice',
          id: 'ci-2',
          prompt: 'In a canary deployment, what happens?',
          choices: [
            'The whole fleet is replaced at once',
            'The new version goes to a small percentage of traffic first',
            'Two identical environments swap',
            'The database migrates first',
          ],
          answerIndex: 1,
          explanation:
            'A small slice of real users exercises the new version. If error rates rise you roll back having affected 1% instead of 100% — and you get real production signal that staging can never give you.',
        },
        {
          kind: 'boolean',
          id: 'ci-3',
          prompt: 'True or false?',
          statement: 'It is fine to disable a failing test to unblock a release.',
          answer: false,
          explanation:
            'A disabled test is a hole in your safety net that nobody remembers to fill. Either the test found a real bug (fix the bug) or the test is wrong (fix the test). Skipping it postpones the problem to the worst possible moment.',
        },
        {
          kind: 'choice',
          id: 'ci-4',
          prompt: 'Why build the artifact ONCE and promote it through environments?',
          choices: [
            'It saves disk space',
            'Rebuilding per environment means production runs something you never tested',
            'It is faster to type',
            'Docker requires it',
          ],
          answerIndex: 1,
          explanation:
            'Rebuild and you may pick up a different dependency version, a different base image, a different compiler. The binary that passed staging must be the exact binary that reaches production.',
        },
        {
          kind: 'choice',
          id: 'ci-5',
          prompt: 'Your CI pipeline takes 45 minutes. What is the real cost?',
          choices: [
            'Higher compute bills only',
            'Developers context-switch, batch changes into bigger PRs, and start ignoring results',
            'Nothing, it runs in the background',
            'Tests become less reliable',
          ],
          answerIndex: 1,
          explanation:
            'Slow feedback changes behaviour: people stop pushing small commits, PRs grow, and a red result arrives long after they moved on. Pipeline speed is a developer-productivity feature, not an infrastructure detail.',
        },
      
        {
          kind: 'order',
          id: 'ci-6',
          prompt: 'Order a CI pipeline from fastest-failing to slowest.',
          items: [
            'Lint and format check',
            'Typecheck',
            'Unit tests',
            'Production build',
            'End-to-end tests',
          ],
          explanation:
            'Put the cheapest checks first so a missing semicolon fails in 10 seconds instead of after a 12-minute browser suite. Fast feedback is the whole point.',
        },],
    },
  ],
}
