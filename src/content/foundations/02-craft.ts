import type { Section } from '../types'

export const craft: Section = {
  id: 'craft',
  title: 'Code that survives other humans',
  subtitle: 'You write code once and read it a hundred times. Optimise for the reading.',
  units: [
    {
      id: 'naming',
      title: 'Naming & clean code',
      icon: '✍️',
      summary: 'The cheapest documentation you will ever write.',
      concept: {
        headline: 'Good names remove the need for comments.',
        body: [
          'A name is a promise about what something does. When the name is accurate, a reader can skip the implementation entirely — and that is what makes a large codebase navigable.',
          'The best test: could a new teammate guess what this does from the name alone? If they need to read the body to find out, the name is doing no work.',
        ],
        keyPoints: [
          'Say what it IS, not what type it is: `userEmail`, not `strUser`.',
          'Booleans read as questions: `isActive`, `hasPermission`, `canEdit`.',
          'Length should match scope — `i` in a three-line loop is fine; a module-level `d` is not.',
          'A comment explaining WHAT the code does is usually a naming failure. Comments should explain WHY.',
        ],
        example: {
          caption: 'Same logic, one is readable',
          code: `// Before
if (u.st === 2 && u.p > 0) { proc(u) }

// After
if (user.isActive && user.hasCredit) {
  chargeSubscription(user)
}`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'name-1',
          prompt: 'Which is the best name for a function that returns whether an order can be refunded?',
          choices: ['checkOrder()', 'isRefundable()', 'orderRefundBoolean()', 'doRefundCheck()'],
          answerIndex: 1,
          explanation:
            '`isRefundable()` reads as a question with a yes/no answer, which is exactly what it returns. `checkOrder()` tells you nothing about what is being checked or what comes back.',
        },
        {
          kind: 'boolean',
          id: 'name-2',
          prompt: 'True or false?',
          statement: 'A comment that explains what a confusing line does is better than renaming things.',
          answer: false,
          explanation:
            'Comments drift out of date silently — code does not. If a line needs a comment to explain WHAT it does, extract it into a well-named function instead. Save comments for WHY: the business rule, the workaround, the link to the incident.',
        },
        {
          kind: 'choice',
          id: 'name-3',
          prompt: 'What is the main problem with this function?',
          code: `function handleUser(user) {
  validateEmail(user)
  saveToDatabase(user)
  sendWelcomeEmail(user)
  updateAnalytics(user)
  chargeCard(user)
}`,
          choices: [
            'It is too short',
            'The name promises one thing but it does five unrelated things',
            'It should be async',
            'It has too few parameters',
          ],
          answerIndex: 1,
          explanation:
            '"handle" is a name that means nothing, and it hides five separate responsibilities. When the payment fails, has the welcome email already gone out? The name gives you no way to reason about it.',
        },
        {
          kind: 'choice',
          id: 'name-4',
          prompt: 'When is a very short variable name like `i` acceptable?',
          choices: [
            'Never',
            'When its scope is a few lines and the meaning is conventional',
            'Whenever you are in a hurry',
            'Only in tests',
          ],
          answerIndex: 1,
          explanation:
            'Name length should scale with scope. `i` inside a three-line loop is universally understood. The same name as a module-level variable, used 200 lines later, is unreadable.',
        },
        {
          kind: 'choice',
          id: 'name-5',
          prompt: 'What makes "magic numbers" like `if (status === 3)` a problem?',
          choices: [
            'They are slower',
            'The reader has no way to know what 3 means, and it is repeated everywhere',
            'They use more memory',
            'Linters cannot parse them',
          ],
          answerIndex: 1,
          explanation:
            'A named constant — `if (status === Status.Cancelled)` — turns a lookup into a read. It also means changing the value happens in one place instead of grep-and-pray.',
        },
      ],
    },
    {
      id: 'functions',
      title: 'Functions & abstraction',
      icon: '🧩',
      summary: 'When an abstraction earns its keep — and when it just hides things.',
      concept: {
        headline: 'A pure function is one you can reason about without reading anything else.',
        body: [
          'A pure function always returns the same output for the same input, and changes nothing outside itself. That makes it trivially testable and impossible to break from a distance.',
          'Side effects — writing to a database, mutating a global, printing — are necessary; a program with no side effects does nothing. The skill is pushing them to the edges and keeping the core logic pure.',
        ],
        keyPoints: [
          'Same input, same output, no side effects = pure. Test it with zero setup.',
          'Push I/O to the edges; keep decision-making in pure functions in the middle.',
          'A function should do one thing at one level of abstraction.',
          'Do not abstract on the second occurrence. Wait until you have seen the pattern three times and know its real shape.',
        ],
        example: {
          caption: 'Separating the decision from the effect',
          code: `// Hard to test: decision and side effect are welded together
function applyDiscount(user) {
  if (user.orders > 10) db.save({ ...user, discount: 0.1 })
}

// Easy to test: the rule is pure, the caller does the writing
function discountFor(user) {
  return user.orders > 10 ? 0.1 : 0
}`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'fn-1',
          prompt: 'Which of these functions is pure?',
          choices: [
            'function now() { return Date.now() }',
            'function add(a, b) { return a + b }',
            'function save(u) { db.write(u) }',
            'function log(m) { console.log(m) }',
          ],
          answerIndex: 1,
          explanation:
            '`add` depends only on its arguments and changes nothing. `now()` returns something different every call; the other two reach outside the function to do their work.',
        },
        {
          kind: 'boolean',
          id: 'fn-2',
          prompt: 'True or false?',
          statement: 'You should extract a shared function the moment you see the same code twice.',
          answer: false,
          explanation:
            'Two similar snippets are often a coincidence, not a pattern. Extracting too early couples code that then has to diverge, and you end up with a function full of boolean flags. Wait for the third occurrence — by then you can see the real shape.',
        },
        {
          kind: 'choice',
          id: 'fn-3',
          prompt: 'What is the smell in this signature?',
          code: `function createUser(name, email, isAdmin, sendEmail, skipValidation, isTrial) {`,
          choices: [
            'Too many boolean flag parameters',
            'The name is wrong',
            'It should return a Promise',
            'Nothing, it is fine',
          ],
          answerIndex: 0,
          explanation:
            'Every boolean flag means the function has (at least) two behaviours bolted together — six flags is 64 possible paths. At the call site, `createUser(a, b, true, false, true, false)` is unreadable. Pass an options object, or split the function.',
        },
        {
          kind: 'choice',
          id: 'fn-4',
          prompt: 'Why are functions with side effects harder to test?',
          choices: [
            'They run slower',
            'You must set up and inspect the outside world, not just check a return value',
            'They cannot be called twice',
            'Test runners do not support them',
          ],
          answerIndex: 1,
          explanation:
            'A pure function needs one line: call it, assert the result. A function that writes to a database needs a database, cleanup between tests, and assertions against external state — plus it can fail for reasons unrelated to your logic.',
        },
        {
          kind: 'choice',
          id: 'fn-5',
          prompt: 'What does "one level of abstraction" mean for a function?',
          choices: [
            'It should have only one return statement',
            'It should not mix high-level steps with low-level details',
            'It should be under 10 lines',
            'It should take one parameter',
          ],
          answerIndex: 1,
          explanation:
            'Do not put `calculateTotal()` next to raw byte manipulation in the same body. Mixing levels forces the reader to constantly zoom in and out — each function should read as a coherent story at one altitude.',
        },
      ],
    },
    {
      id: 'errors',
      title: 'Error handling',
      icon: '💥',
      summary: 'The empty catch block is the most expensive line of code in software.',
      concept: {
        headline: 'An error you swallow becomes a bug you cannot find.',
        body: [
          'Errors are information. Catching one and doing nothing throws that information away and lets the program continue in a state you did not design for — which surfaces later, somewhere else, as nonsense.',
          'The rule of thumb: only catch an error if you can actually do something about it. Otherwise let it travel up to someone who can — or to your logs.',
        ],
        keyPoints: [
          'Never write an empty catch. Log it, handle it, or let it propagate.',
          'Fail fast: validate at the boundary, so bad data never reaches your core logic.',
          'Distinguish expected failures (invalid input, 404) from bugs (null dereference). Handle the first, fix the second.',
          'An error message should say what failed, with what input, and what to do next.',
        ],
        example: {
          caption: 'Three ways to handle the same failure',
          code: `try { await save(user) }
catch (e) { }                     // never — the failure vanishes

catch (e) { console.log(e) }      // barely better — it continues broken

catch (e) {
  logger.error('Failed to save user', { userId: user.id, error: e })
  throw new SaveError('Could not save user', { cause: e })
}`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'err-1',
          prompt: 'Why is an empty `catch {}` so dangerous?',
          choices: [
            'It slows the program down',
            'The program continues in an unexpected state and the failure surfaces far away',
            'It uses more memory',
            'It prevents the function returning',
          ],
          answerIndex: 1,
          explanation:
            'The code after the try block runs as if everything succeeded. You get a null three functions later, or a silently missing record, and nothing points back to the real cause. Debugging this can take days.',
        },
        {
          kind: 'boolean',
          id: 'err-2',
          prompt: 'True or false?',
          statement: 'A user submitting an invalid email address should be logged as an application error.',
          answer: false,
          explanation:
            'That is expected input, not a bug — handle it with a validation message. If you log it as an error, your alerts fill with noise and you stop reading them, which is how real errors get missed.',
        },
        {
          kind: 'choice',
          id: 'err-3',
          prompt: 'Which error message is most useful at 3am?',
          choices: [
            '"Something went wrong"',
            '"Error: undefined"',
            '"Failed to charge order 8123: card declined (insufficient_funds)"',
            '"ERR_500"',
          ],
          answerIndex: 2,
          explanation:
            'It names the operation, the specific record, and the reason. You can search for the order, reproduce the case, and decide what to do — all without opening a debugger.',
        },
        {
          kind: 'choice',
          id: 'err-4',
          prompt: 'What does "fail fast" mean?',
          choices: [
            'Crash the app on any error',
            'Validate inputs at the boundary so bad data never spreads into the system',
            'Use short timeouts',
            'Skip error handling to keep code simple',
          ],
          answerIndex: 1,
          explanation:
            'Catching a bad value where it enters means the error message points at the real cause. Letting it flow inward means you find it later, corrupted, in a place with no context about where it came from.',
        },
        {
          kind: 'choice',
          id: 'err-5',
          prompt: 'When re-throwing an error, why attach the original as `cause`?',
          choices: [
            'It is required by the language',
            'It preserves the original stack trace and root cause',
            'It makes the error smaller',
            'It prevents the error propagating further',
          ],
          answerIndex: 1,
          explanation:
            'Without the cause you get your own message and lose the line that actually failed. `new Error("msg", { cause: e })` keeps the whole chain, so the log shows both what you were doing and what broke.',
        },
      
        {
          kind: 'gap',
          id: 'err-6',
          prompt: 'Complete the re-throw so the original failure is not lost.',
          code: `try {
  await chargeCard(order)
} catch (e) {
  throw new PaymentError('Could not charge order', { ___: e })
}`,
          choices: ['cause', 'parent', 'inner', 'previous'],
          answerIndex: 0,
          explanation:
            '`cause` is the standard option for chaining errors. Without it you keep your own message and throw away the stack trace of the line that actually broke.',
        },],
    },
    {
      id: 'testing',
      title: 'Testing',
      icon: '🧪',
      summary: 'The safety net that lets you change code without fear.',
      concept: {
        headline: 'Tests are not about proving correctness. They are about changing code safely.',
        body: [
          'A test suite is what lets you refactor aggressively, upgrade a dependency, or hand the codebase to someone new. Without it, every change is a gamble and the codebase slowly freezes.',
          'The pyramid: many fast unit tests at the base, fewer integration tests in the middle, a handful of end-to-end tests at the top. Inverting it gives you a slow, flaky suite nobody trusts.',
        ],
        keyPoints: [
          'Unit — one function, no I/O, milliseconds. Integration — several pieces together. E2E — the real app through a browser.',
          'Test behaviour, not implementation. A test that breaks on every refactor is testing the wrong thing.',
          'A flaky test is worse than no test: it trains the team to ignore red.',
          'TDD: write the failing test first, so you know it can actually fail.',
        ],
        example: {
          caption: 'Arrange, act, assert',
          code: `it('spends a heart on a wrong answer', () => {
  const lesson = startLesson(questions)   // arrange
  answer(lesson, WRONG)                   // act
  expect(lesson.hearts).toBe(4)           // assert
})`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'test-1',
          prompt: 'What makes a test "flaky"?',
          choices: [
            'It runs slowly',
            'It passes or fails without the code changing',
            'It has no assertions',
            'It only runs in CI',
          ],
          answerIndex: 1,
          explanation:
            'Flakiness is non-determinism — usually timing, shared state between tests, or a real network call. It is corrosive: once people learn to re-run a red build, they also ignore the genuine failures.',
        },
        {
          kind: 'choice',
          id: 'test-2',
          prompt: 'You should have MOST of which kind of test?',
          choices: ['End-to-end', 'Integration', 'Unit', 'Manual'],
          answerIndex: 2,
          explanation:
            'Unit tests are fast, isolated, and point straight at the broken function. E2E tests catch things nothing else can, but they are slow and fragile — a handful covering critical journeys is the right dose.',
        },
        {
          kind: 'boolean',
          id: 'test-3',
          prompt: 'True or false?',
          statement: '100% code coverage means the code has no bugs.',
          answer: false,
          explanation:
            'Coverage only proves each line RAN during the suite — not that anything meaningful was asserted about it, and not that you thought of the failing input. It is a useful signal for finding untested areas, and a terrible target in itself.',
        },
        {
          kind: 'choice',
          id: 'test-4',
          prompt: 'Why write the failing test BEFORE the implementation?',
          choices: [
            'It is faster',
            'It proves the test can actually fail — a test that never fails protects nothing',
            'Linters require it',
            'It produces shorter code',
          ],
          answerIndex: 1,
          explanation:
            'A test written after the fact and passing immediately might be asserting nothing at all. Watching it go red first is the only proof that it is wired to the behaviour you care about.',
        },
        {
          kind: 'choice',
          id: 'test-5',
          prompt: 'Your test breaks every time you rename a private method, though behaviour is unchanged. What is wrong?',
          choices: [
            'The test is too slow',
            'It tests implementation details instead of observable behaviour',
            'It needs more mocks',
            'It should be an E2E test',
          ],
          answerIndex: 1,
          explanation:
            'Tests coupled to internals punish refactoring, which is exactly the activity they should protect. Assert on what the unit returns or does from the outside — the internals should be free to change.',
        },
      
        {
          kind: 'order',
          id: 'test-6',
          prompt: 'Put a test-driven development cycle in order.',
          items: [
            'Write a test for behaviour that does not exist yet',
            'Run it and watch it fail for the right reason',
            'Write the simplest code that makes it pass',
            'Refactor now that the test protects you',
          ],
          explanation:
            'Red, green, refactor. Watching it fail first is the step people skip — and it is the only proof the test is actually wired to the behaviour.',
        },],
    },
    {
      id: 'debugging',
      title: 'Debugging',
      icon: '🐛',
      summary: 'A systematic search, not a guessing game.',
      concept: {
        headline: 'Debugging is binary search over your assumptions.',
        body: [
          'The instinct is to guess and change things. The method is to reproduce reliably, then halve the search space repeatedly until the bug has nowhere to hide.',
          'Most of the time the bug is not where you think it is — it is in an assumption you never questioned. The discipline is checking the boring things first.',
        ],
        keyPoints: [
          'Reproduce it first. A bug you cannot trigger on demand cannot be verified as fixed.',
          'Read the stack trace properly — usually the top frame in YOUR code is the place to look.',
          'Bisect: comment out half, or use `git bisect` to find the commit that introduced it.',
          'Change one thing at a time. Two simultaneous changes make the result meaningless.',
        ],
        example: {
          caption: 'Finding the commit that broke it, automatically',
          code: `git bisect start
git bisect bad                 # today is broken
git bisect good v1.4.0         # this release was fine
# git checks out the midpoint; you test and mark good/bad
# ~10 steps to find the culprit among 1000 commits`,
        },
      },
      questions: [
        {
          kind: 'order',
          id: 'dbg-1',
          prompt: 'Put a systematic debugging session in order.',
          items: [
            'Reproduce the bug reliably',
            'Read the error and stack trace',
            'Form one hypothesis about the cause',
            'Test the hypothesis by changing one thing',
            'Verify the fix against the original reproduction',
          ],
          explanation:
            'Reproduction comes first: without it you cannot tell a fix from a coincidence. And it comes last too — re-running the original case is the only proof the bug is actually gone.',
        },
        {
          kind: 'choice',
          id: 'dbg-2',
          prompt: 'What does `git bisect` do?',
          choices: [
            'Splits a commit into two',
            'Binary-searches commit history to find the one that introduced a bug',
            'Reverts the last commit',
            'Compares two branches',
          ],
          answerIndex: 1,
          explanation:
            'You mark a known-good and known-bad commit; git checks out the midpoint and repeats. It finds the culprit among 1,000 commits in about 10 steps instead of 1,000.',
        },
        {
          kind: 'boolean',
          id: 'dbg-3',
          prompt: 'True or false?',
          statement: 'When stuck, changing several things at once helps you find the bug faster.',
          answer: false,
          explanation:
            'If it starts working you have no idea which change did it — and you may have introduced a second bug that cancels the first. One variable at a time is slower per step and far faster overall.',
        },
        {
          kind: 'choice',
          id: 'dbg-4',
          prompt: 'A bug appears only in production, never locally. What should you suspect FIRST?',
          choices: [
            'A compiler bug',
            'Differences in data, config, environment variables or scale',
            'A hardware fault',
            'The framework version',
          ],
          answerIndex: 1,
          explanation:
            'Production has real data with real edge cases, different config, and concurrency your laptop never sees. Nine times in ten it is one of those — not the code itself behaving differently.',
        },
        {
          kind: 'choice',
          id: 'dbg-5',
          prompt: 'In a long stack trace, which frame is usually most useful?',
          choices: [
            'The very first line',
            'The topmost frame that is in your own code',
            'The last line',
            'Any framework frame',
          ],
          answerIndex: 1,
          explanation:
            'The top frames are often deep inside library code that is working correctly with bad input. The highest frame you actually wrote is where the wrong value was passed in — that is your starting point.',
        },
      ],
    },
  ],
}
