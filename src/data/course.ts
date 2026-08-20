import type { SkillStatus } from '@/design-system'

export interface Question {
  id: string
  /** The instruction line, e.g. "Which of these is O(log n)?" */
  prompt: string
  /** Optional code sample shown in a mono block above the choices. */
  code?: string
  choices: string[]
  answerIndex: number
  /** Shown after a wrong answer. Always explain, never just say "nope". */
  explanation: string
}

export interface Unit {
  id: string
  title: string
  icon: string
  status: SkillStatus
  /** 0–1, drives the ring on the skill node. */
  progress: number
  questions: Question[]
}

export interface Course {
  title: string
  subtitle: string
  units: Unit[]
}

export const course: Course = {
  title: 'Software Foundations',
  subtitle: 'Unit 1 · Reading code like an engineer',
  units: [
    {
      id: 'big-o',
      title: 'Big-O basics',
      icon: '📈',
      status: 'active',
      progress: 0.4,
      questions: [
        {
          id: 'big-o-1',
          prompt: 'What is the time complexity of this function?',
          code: `function sum(numbers) {
  let total = 0
  for (const n of numbers) total += n
  return total
}`,
          choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          answerIndex: 2,
          explanation:
            'The loop touches every element exactly once, so the work grows in step with the input size — that is linear, O(n).',
        },
        {
          id: 'big-o-2',
          prompt: 'Which operation is O(log n) on a balanced binary search tree?',
          choices: [
            'Printing every node',
            'Looking up a single key',
            'Copying the tree',
            'Counting all leaves',
          ],
          answerIndex: 1,
          explanation:
            'A lookup discards half the remaining tree at each step, so it takes about log₂(n) comparisons. The other three must visit every node.',
        },
        {
          id: 'big-o-3',
          prompt: 'Two nested loops over the same array of length n cost…',
          code: `for (const a of items)
  for (const b of items)
    compare(a, b)`,
          choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
          answerIndex: 2,
          explanation:
            'The inner loop runs n times for each of the n outer iterations: n × n = n² comparisons.',
        },
      ],
    },
    {
      id: 'git',
      title: 'Git essentials',
      icon: '🌿',
      status: 'complete',
      progress: 1,
      questions: [
        {
          id: 'git-1',
          prompt: 'Which command stages a file without committing it?',
          choices: ['git commit', 'git add', 'git push', 'git stash'],
          answerIndex: 1,
          explanation:
            '`git add` moves changes into the staging area. `git commit` is the separate step that records them.',
        },
        {
          id: 'git-2',
          prompt: 'What does `git rebase main` do to your branch?',
          choices: [
            'Deletes commits older than main',
            'Replays your commits on top of main',
            'Merges main into your branch with a merge commit',
            'Pushes your branch to main',
          ],
          answerIndex: 1,
          explanation:
            'Rebase rewrites your commits so they start from the tip of main. It produces a linear history — and new commit hashes.',
        },
      ],
    },
    {
      id: 'http',
      title: 'HTTP & APIs',
      icon: '🌐',
      status: 'locked',
      progress: 0,
      questions: [
        {
          id: 'http-1',
          prompt: 'Which status code means "you are authenticated, but not allowed"?',
          choices: ['400', '401', '403', '404'],
          answerIndex: 2,
          explanation:
            '401 means "who are you?" — 403 means "I know who you are, and the answer is still no".',
        },
      ],
    },
    {
      id: 'testing',
      title: 'Testing',
      icon: '🧪',
      status: 'locked',
      progress: 0,
      questions: [
        {
          id: 'testing-1',
          prompt: 'What makes a test "flaky"?',
          choices: [
            'It runs slowly',
            'It passes or fails without the code changing',
            'It has no assertions',
            'It only runs in CI',
          ],
          answerIndex: 1,
          explanation:
            'A flaky test is non-deterministic — usually because of timing, shared state, or network access. It erodes trust in the whole suite.',
        },
      ],
    },
    {
      id: 'data-structures',
      title: 'Data structures',
      icon: '🧱',
      status: 'locked',
      progress: 0,
      questions: [
        {
          id: 'ds-1',
          prompt: 'You need O(1) average lookup by key. Reach for…',
          choices: ['An array', 'A linked list', 'A hash map', 'A stack'],
          answerIndex: 2,
          explanation:
            'A hash map turns the key straight into a bucket index, so lookups do not depend on how many items you have stored.',
        },
      ],
    },
  ],
}

export const learner = {
  name: 'Jose Diestra',
  streak: 7,
  gems: 480,
  hearts: 5,
  xpToday: 40,
  dailyGoal: 50,
  league: 'Emerald',
}
