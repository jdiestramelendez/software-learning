import type { Section } from '../types'

export const thinking: Section = {
  id: 'thinking',
  title: 'How a computer thinks',
  subtitle: 'The mental model everything else is built on.',
  units: [
    {
      id: 'data-structures',
      title: 'Data structures',
      icon: '🧱',
      summary: 'Choosing the right container is the cheapest performance win there is.',
      concept: {
        headline: 'A data structure is a trade: fast at one thing, slow at another.',
        body: [
          'Every structure makes some operations cheap by making others expensive. An array is brilliant at "give me item 500" and terrible at "does this contain X?". A hash map is the reverse.',
          'Most real performance problems are not clever algorithms — they are the wrong container. Picking correctly is the difference between a loop that runs 20 times and one that runs 20 million.',
        ],
        keyPoints: [
          'Array — instant access by position, slow to search, slow to insert in the middle.',
          'Hash map — instant lookup by key, no order.',
          'Set — like a hash map with no values: membership tests, automatic de-duplication.',
          'Stack (last in, first out) and queue (first in, first out) — order is the whole point.',
        ],
        example: {
          caption: 'The same job, two containers',
          code: `// O(n) — scans the list on every check
const ids = [1, 2, 3, /* ...100k more */]
ids.includes(99999)

// O(1) — hashes the key straight to its slot
const idSet = new Set(ids)
idSet.has(99999)`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'ds-1',
          prompt: 'You need to check "have I already seen this user ID?" a million times. What do you use?',
          choices: ['An array with .includes()', 'A Set', 'A sorted array', 'A linked list'],
          answerIndex: 1,
          explanation:
            'A Set hashes the value straight to a slot, so each check costs the same no matter how many items you have stored. `.includes()` on an array walks the whole list every single time — a million checks over a million items is a trillion comparisons.',
        },
        {
          kind: 'choice',
          id: 'ds-2',
          prompt: 'Which operation is SLOW on an array?',
          choices: [
            'Reading items[500]',
            'Adding to the end',
            'Inserting at the beginning',
            'Reading the length',
          ],
          answerIndex: 2,
          explanation:
            'Inserting at the front means every other element has to shift one position to the right. Reading by index is instant because the computer can calculate exactly where that slot lives in memory.',
        },
        {
          kind: 'boolean',
          id: 'ds-3',
          prompt: 'True or false?',
          statement: 'A hash map guarantees the order of its keys matches insertion order.',
          answer: false,
          explanation:
            'In general, no — a hash map scatters keys across buckets by their hash, and order is not part of the contract. (JavaScript objects and Map happen to preserve insertion order, but relying on that in other languages will bite you.)',
        },
        {
          kind: 'choice',
          id: 'ds-4',
          prompt: 'The browser back button is a textbook use of which structure?',
          choices: ['Queue', 'Stack', 'Hash map', 'Tree'],
          answerIndex: 1,
          explanation:
            'A stack: last in, first out. The last page you visited is the first one you go back to. A queue would take you to the very first page you ever opened.',
        },
        {
          kind: 'choice',
          id: 'ds-5',
          prompt: 'Why is a linked list better than an array for frequent insertions in the middle?',
          choices: [
            'It uses less memory',
            'Inserting only rewires two pointers instead of shifting every element',
            'It can be searched faster',
            'It supports index access',
          ],
          answerIndex: 1,
          explanation:
            'Once you are holding the right node, insertion is just repointing two links. The catch: *finding* that node takes a walk from the start, so a linked list loses badly whenever you need access by position.',
        },
      
        {
          kind: 'gap',
          id: 'ds-6',
          prompt: 'Complete the line so the lookup becomes O(1).',
          code: `const ids = [1, 2, 3 /* ...100k more */]
const lookup = new ___(ids)
lookup.has(99999)`,
          choices: ['Set', 'Array', 'WeakRef', 'Object'],
          answerIndex: 0,
          explanation:
            'A Set hashes each value to a slot, so `has` costs the same at 10 items or 10 million. An Array would send you back to a linear scan.',
        },],
    },
    {
      id: 'big-o',
      title: 'Big-O & complexity',
      icon: '📈',
      summary: 'Read a loop and know what it will cost at a million rows.',
      concept: {
        headline: 'Big-O answers one question: what happens when the input gets 10× bigger?',
        body: [
          'Big-O is not about seconds. It describes the *shape* of the growth curve — how the work scales as the input grows. Constants and small details are dropped on purpose, because at scale they stop mattering.',
          'The practical value: you can look at code and predict whether it will still work at a million records, without ever running it.',
        ],
        keyPoints: [
          'O(1) constant — same cost regardless of size. Hash lookup, array index.',
          'O(log n) — halves the problem each step. Binary search, balanced tree lookup.',
          'O(n) linear — touches everything once. A single loop.',
          'O(n log n) — the best a general-purpose sort can do.',
          'O(n²) — nested loops over the same data. Fine at 100, fatal at 100,000.',
        ],
        example: {
          caption: 'At n = 1,000,000',
          code: `O(1)        1 step
O(log n)    20 steps
O(n)        1,000,000 steps
O(n log n)  20,000,000 steps
O(n²)       1,000,000,000,000 steps   <- this is the one that pages you at 3am`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'bigo-1',
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
          kind: 'choice',
          id: 'bigo-2',
          prompt: 'Two nested loops over the same array of length n cost…',
          code: `for (const a of items)
  for (const b of items)
    compare(a, b)`,
          choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
          answerIndex: 2,
          explanation:
            'The inner loop runs n times for each of the n outer iterations: n × n comparisons. At 1,000 items that is a million — at 100,000 items it is ten billion.',
        },
        {
          kind: 'boolean',
          id: 'bigo-3',
          prompt: 'True or false?',
          statement: 'An O(n²) algorithm is always slower than an O(n) one.',
          answer: false,
          explanation:
            'Only for large inputs. Big-O ignores constants, so an O(n²) algorithm with tiny overhead can beat an O(n) one with heavy setup — which is exactly why sort implementations switch to insertion sort for small arrays.',
        },
        {
          kind: 'choice',
          id: 'bigo-4',
          prompt: 'Which operation is O(log n)?',
          choices: [
            'Printing every item in a list',
            'Binary search in a sorted array',
            'Copying an array',
            'Finding the maximum of an unsorted list',
          ],
          answerIndex: 1,
          explanation:
            'Binary search throws away half the remaining data at every step. Halving a million takes about 20 steps. The other three must visit every element at least once.',
        },
        {
          kind: 'choice',
          id: 'bigo-5',
          prompt: 'What is the SPACE complexity of this function?',
          code: `function double(items) {
  const out = []
  for (const n of items) out.push(n * 2)
  return out
}`,
          choices: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
          answerIndex: 1,
          explanation:
            'It allocates a new array the same size as the input, so memory grows linearly with n. Doubling the items in place would have been O(1) extra space.',
        },
      ],
    },
    {
      id: 'algorithms',
      title: 'Algorithms',
      icon: '🔍',
      summary: 'Search, sort and recursion — the patterns behind most interview questions.',
      concept: {
        headline: 'Almost every fast algorithm works by throwing away work.',
        body: [
          'Binary search discards half the data per step. Merge sort splits the problem in two, solves each half, and merges. Both are the same idea: divide and conquer.',
          'Recursion is the code shape that expresses this. A recursive function needs exactly two things — a base case that stops it, and a step that makes the problem smaller.',
        ],
        keyPoints: [
          'Binary search needs sorted data. Without sorting, it is simply wrong.',
          'Comparison sorts cannot beat O(n log n). That is a proven floor, not a missing optimisation.',
          'Every recursion needs a base case, or you get a stack overflow.',
          'Recursion and iteration are interchangeable — recursion trades stack memory for readability.',
        ],
        example: {
          caption: 'Binary search: 1,000,000 items in ~20 steps',
          code: `function search(sorted, target) {
  let lo = 0, hi = sorted.length - 1
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (sorted[mid] === target) return mid
    if (sorted[mid] < target) lo = mid + 1
    else hi = mid - 1
  }
  return -1
}`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'algo-1',
          prompt: 'Binary search returns the wrong answer on your data. What is the most likely cause?',
          choices: [
            'The array is too large',
            'The array is not sorted',
            'The target does not exist',
            'The array contains duplicates',
          ],
          answerIndex: 1,
          explanation:
            'Binary search assumes that everything left of the midpoint is smaller and everything right is bigger. On unsorted data that assumption is false, so it confidently discards the half containing your answer.',
        },
        {
          kind: 'gap',
          id: 'algo-2',
          prompt: 'Complete the base case so this recursion terminates.',
          code: `function factorial(n) {
  if (___) return 1
  return n * factorial(n - 1)
}`,
          choices: ['n <= 1', 'n > 1', 'n === 0 || n > 100', 'false'],
          answerIndex: 0,
          explanation:
            'The recursion shrinks n by one each call, so it must stop when n reaches 1. Without that base case it would call factorial(0), factorial(-1)… until the call stack overflows.',
        },
        {
          kind: 'choice',
          id: 'algo-3',
          prompt: 'What is the best possible average complexity for a general-purpose comparison sort?',
          choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
          answerIndex: 1,
          explanation:
            'O(n log n) is a proven mathematical floor for sorting by comparison. Sorts that beat it (counting sort, radix sort) do so by not comparing at all — they exploit knowing the shape of the data.',
        },
        {
          kind: 'boolean',
          id: 'algo-4',
          prompt: 'True or false?',
          statement: 'Any recursive function can be rewritten using a loop.',
          answer: true,
          explanation:
            'Yes — you replace the implicit call stack with an explicit one. It is often uglier, but it avoids stack-overflow limits, which is why deep recursions get converted in production code.',
        },
        {
          kind: 'order',
          id: 'algo-5',
          prompt: 'Put the steps of merge sort in order.',
          items: [
            'Split the array in half',
            'Keep splitting until each piece has one element',
            'Merge pairs of pieces back together in sorted order',
            'Repeat merging until one sorted array remains',
          ],
          explanation:
            'Merge sort is divide-and-conquer: break the problem down to trivial pieces (a single element is sorted by definition), then do the real work on the way back up while merging.',
        },
      ],
    },
    {
      id: 'memory',
      title: 'Memory & references',
      icon: '🧠',
      summary: 'The source of the weirdest bugs you will ever debug.',
      concept: {
        headline: 'Some variables hold a value. Others hold an address.',
        body: [
          'Primitives — numbers, booleans, strings — are copied when you assign them. Objects and arrays are not: you copy the *reference*, and both names now point at the same thing in memory.',
          'This is why changing one variable can mysteriously change another. It is not a language quirk; it is how memory works, and every language has a version of it.',
        ],
        keyPoints: [
          'Assigning an object copies the pointer, not the contents.',
          'A shallow copy duplicates the top level only — nested objects are still shared.',
          'The stack is small and fast (local variables); the heap is large (objects) and needs cleaning up.',
          'A garbage collector frees what nothing points to any more — it cannot free what you still reference.',
        ],
        example: {
          caption: 'The classic shared-reference bug',
          code: `const a = { count: 1 }
const b = a          // copies the reference, not the object
b.count = 99
console.log(a.count) // 99 — same object

const c = { ...a }   // shallow copy: now independent
c.count = 5
console.log(a.count) // 99`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'mem-1',
          prompt: 'What does this print?',
          code: `const original = { items: [1, 2] }
const copy = { ...original }
copy.items.push(3)
console.log(original.items.length)`,
          choices: ['2', '3', '0', 'It throws an error'],
          answerIndex: 1,
          explanation:
            'The spread makes a SHALLOW copy: `copy.items` and `original.items` are still the same array. To break the link you need a deep copy — e.g. `structuredClone(original)`.',
        },
        {
          kind: 'boolean',
          id: 'mem-2',
          prompt: 'True or false?',
          statement: 'Passing an object to a function lets that function modify the caller’s object.',
          answer: true,
          explanation:
            'The function receives a copy of the *reference*, so it points at the same object. Mutating properties inside the function is visible outside — a very common source of surprise bugs.',
        },
        {
          kind: 'choice',
          id: 'mem-3',
          prompt: 'A memory leak in a garbage-collected language means…',
          choices: [
            'The garbage collector is broken',
            'Something is still holding a reference to data you no longer need',
            'You forgot to call free()',
            'The heap is too small',
          ],
          answerIndex: 1,
          explanation:
            'A GC only frees what is unreachable. A forgotten event listener, a growing cache, or a closure holding a big object all keep data alive — the collector is working exactly as designed.',
        },
        {
          kind: 'choice',
          id: 'mem-4',
          prompt: 'Why does very deep recursion cause a "stack overflow"?',
          choices: [
            'The heap runs out of space',
            'Each call adds a frame to a fixed-size call stack',
            'The garbage collector cannot keep up',
            'The CPU cache fills up',
          ],
          answerIndex: 1,
          explanation:
            'Every call pushes a frame holding its local variables and return address. The stack has a hard size limit (often a few megabytes), so a few tens of thousands of nested calls is enough to exhaust it.',
        },
        {
          kind: 'choice',
          id: 'mem-5',
          prompt: 'Which comparison is TRUE?',
          code: `const x = { id: 1 }
const y = { id: 1 }
const z = x`,
          choices: ['x === y', 'x === z', 'Both', 'Neither'],
          answerIndex: 1,
          explanation:
            '`===` on objects compares identity, not contents. `x` and `y` are two different objects that happen to look alike; `z` is the same object as `x`.',
        },
      
        {
          kind: 'gap',
          id: 'mem-6',
          prompt: 'Complete the line so the copy is fully independent of the original.',
          code: `const original = { user: { name: 'Ada' } }
const copy = ___(original)
copy.user.name = 'Grace'   // original must not change`,
          choices: ['structuredClone', '{ ...original }', 'Object.assign', 'JSON.stringify'],
          answerIndex: 0,
          explanation:
            '`structuredClone` performs a DEEP copy. Spread and Object.assign copy only the top level, so `copy.user` would still be the very same nested object.',
        },],
    },
    {
      id: 'representation',
      title: 'How data is represented',
      icon: '🔢',
      summary: 'Why 0.1 + 0.2 is not 0.3, and other things that break in production.',
      concept: {
        headline: 'Everything is bits, and bits are finite. That is where the bugs come from.',
        body: [
          'Numbers, text, dates and colours are all stored as fixed-size patterns of bits. Fixed size means limits — and limits mean overflow, rounding, and truncation.',
          'These are not obscure edge cases. Floating-point rounding has caused real financial losses, and timezone handling is one of the most reliably broken parts of any system.',
        ],
        keyPoints: [
          'Floats cannot represent 0.1 exactly, so 0.1 + 0.2 === 0.3 is false. Never store money as a float — use integer cents.',
          'Integers have a maximum. Exceeding it wraps around or loses precision.',
          'UTF-8 means one character is not one byte — emoji and accents take several.',
          'Always store timestamps in UTC. Convert to local time only for display.',
        ],
        example: {
          caption: 'The one every developer meets eventually',
          code: `0.1 + 0.2          // 0.30000000000000004
0.1 + 0.2 === 0.3  // false

// Money, done right: work in the smallest unit
const priceCents = 1999      // €19.99
const totalCents = priceCents * 3`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'rep-1',
          prompt: 'Why is `0.1 + 0.2 === 0.3` false?',
          choices: [
            'A bug in JavaScript',
            'Binary floating point cannot represent 0.1 exactly',
            'The numbers are too large',
            'Because === is too strict',
          ],
          answerIndex: 1,
          explanation:
            'In binary, 0.1 is a repeating fraction — just like 1/3 is 0.333… in decimal. It gets rounded to the nearest representable value, and the tiny errors add up. Every language using IEEE 754 floats behaves this way.',
        },
        {
          kind: 'choice',
          id: 'rep-2',
          prompt: 'How should you store a price of €19.99 in a database?',
          choices: [
            'As a float: 19.99',
            'As an integer of cents: 1999',
            'As a string: "19.99"',
            'As a double for extra precision',
          ],
          answerIndex: 1,
          explanation:
            'Integer cents (or a DECIMAL column) keeps arithmetic exact. Floats accumulate rounding errors, and after a million transactions those cents are a real, auditable discrepancy.',
        },
        {
          kind: 'boolean',
          id: 'rep-3',
          prompt: 'True or false?',
          statement: 'In UTF-8, every character takes exactly one byte.',
          answer: false,
          explanation:
            'UTF-8 is variable width: ASCII takes 1 byte, accented Latin letters 2, most CJK characters 3, and emoji 4. This is why naive byte-slicing can cut a character in half and produce garbage.',
        },
        {
          kind: 'choice',
          id: 'rep-4',
          prompt: 'What is the safest way to store a "created at" timestamp?',
          choices: [
            'Local time with no timezone',
            'UTC, converting to local time only when displaying',
            'A formatted string like "20/08/2026"',
            'Unix time in the user’s timezone',
          ],
          answerIndex: 1,
          explanation:
            'UTC has no daylight-saving jumps and no ambiguity. Store UTC, display local. Storing local time means that twice a year an hour is either duplicated or does not exist.',
        },
        {
          kind: 'choice',
          id: 'rep-5',
          prompt: 'An integer counter suddenly goes negative. What happened?',
          choices: [
            'A division bug',
            'Integer overflow — it exceeded the maximum and wrapped around',
            'The garbage collector reset it',
            'A race condition',
          ],
          answerIndex: 1,
          explanation:
            'A signed 32-bit integer maxes out at 2,147,483,647. Add one and it wraps to −2,147,483,648. This is exactly the bug that broke the "view counter" on several very large websites.',
        },
      ],
    },
  ],
}
