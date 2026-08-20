import type { Section } from '../types'

export const systems: Section = {
  id: 'systems',
  title: 'The web and its systems',
  subtitle: 'What actually happens between a click and a response.',
  units: [
    {
      id: 'http',
      title: 'HTTP & the web',
      icon: '🌐',
      summary: 'The protocol every web app speaks, and the codes it answers with.',
      concept: {
        headline: 'HTTP is a stateless request/response conversation.',
        body: [
          'Every request stands alone: the server remembers nothing between them. That is why cookies and tokens exist — they carry identity that the protocol itself does not keep.',
          'A request is a method, a path, headers and an optional body. A response is a status code, headers and a body. Everything on the web is built on that.',
        ],
        keyPoints: [
          '2xx worked · 3xx go elsewhere · 4xx you made a mistake · 5xx the server made a mistake.',
          'GET reads and must be safe. POST creates. PUT replaces. PATCH updates part. DELETE removes.',
          '401 means "who are you?" · 403 means "I know who you are, and no".',
          'CORS is enforced by the BROWSER, not the server — it protects users from other sites using their cookies.',
        ],
        example: {
          caption: 'A request and its response',
          code: `GET /api/lessons/42 HTTP/1.1
Host: bitwise.app
Authorization: Bearer eyJhbGc...

HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=60

{"id": 42, "title": "Big-O basics"}`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'http-1',
          prompt: 'Which status code means "you are authenticated, but not allowed"?',
          choices: ['400', '401', '403', '404'],
          answerIndex: 2,
          explanation:
            '401 Unauthorized actually means unauthenticated — "I do not know who you are". 403 Forbidden means "I do know, and you still cannot do this". Logging in again fixes a 401, never a 403.',
        },
        {
          kind: 'choice',
          id: 'http-2',
          prompt: 'Why should a GET request never change data?',
          choices: [
            'It is slower',
            'Browsers, proxies and crawlers freely repeat and prefetch GETs',
            'GET has no body',
            'It is a lint rule',
          ],
          answerIndex: 1,
          explanation:
            'Anything can replay a GET — a prefetcher, a cache, a crawler, the back button. Sites that used `GET /delete?id=5` have had their entire database wiped by a well-behaved search engine crawler.',
        },
        {
          kind: 'boolean',
          id: 'http-3',
          prompt: 'True or false?',
          statement: 'A CORS error means the server blocked your request.',
          answer: false,
          explanation:
            'The server usually received and answered the request perfectly. The BROWSER then refused to hand the response to your JavaScript because the required headers were missing. CORS protects users, not servers — and cannot be fixed from the frontend.',
        },
        {
          kind: 'choice',
          id: 'http-4',
          prompt: 'What does "HTTP is stateless" mean?',
          choices: [
            'It cannot send data',
            'The server keeps no memory of previous requests from the same client',
            'It has no headers',
            'It only works with static files',
          ],
          answerIndex: 1,
          explanation:
            'Each request must carry everything needed to serve it. That is why your session cookie or bearer token rides along on every single call — and why servers can be scaled horizontally so easily.',
        },
        {
          kind: 'order',
          id: 'http-5',
          prompt: 'Put the steps in order for what happens when you type a URL and press Enter.',
          items: [
            'DNS resolves the domain to an IP address',
            'A TCP connection is opened to that IP',
            'TLS negotiates the encrypted channel for HTTPS',
            'The HTTP request is sent',
            'The browser renders the response and requests linked assets',
          ],
          explanation:
            'Every step is a potential failure point and a potential latency win — which is why DNS caching, connection reuse and TLS session resumption all exist.',
        },
      ],
    },
    {
      id: 'api-design',
      title: 'API design',
      icon: '🔌',
      summary: 'Designing an interface other people can use without asking you.',
      concept: {
        headline: 'An API is a contract. Breaking it breaks other people’s software.',
        body: [
          'REST models your system as resources with predictable URLs and standard verbs. The value is not purity — it is that a developer can guess the next endpoint correctly.',
          'The hardest part is not the first version. It is changing it later without breaking every client that already depends on it.',
        ],
        keyPoints: [
          'Nouns in URLs, verbs as HTTP methods: `POST /orders`, not `/createOrder`.',
          'Idempotent means calling twice has the same effect as once. Critical for retries.',
          'Never return an unbounded list. Paginate from day one.',
          'Adding a field is safe. Removing or renaming one is a breaking change — version it.',
        ],
        example: {
          caption: 'Resource-shaped endpoints',
          code: `GET    /orders?limit=20&cursor=abc   list, paginated
POST   /orders                       create
GET    /orders/42                    read one
PATCH  /orders/42                    partial update
DELETE /orders/42                    remove`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'api-1',
          prompt: 'Which endpoint follows REST conventions best?',
          choices: [
            'POST /createNewUser',
            'GET /users/delete/42',
            'POST /users',
            'POST /api/doUserStuff',
          ],
          answerIndex: 2,
          explanation:
            'The resource is the noun (`/users`) and the action is the HTTP method. Once a developer knows that, they can guess `GET /users/42` without reading a line of documentation.',
        },
        {
          kind: 'choice',
          id: 'api-2',
          prompt: 'Why does idempotency matter for a payment endpoint?',
          choices: [
            'It makes it faster',
            'A network timeout may cause a retry — without it, the customer is charged twice',
            'It reduces payload size',
            'It is required by REST',
          ],
          answerIndex: 1,
          explanation:
            'The client cannot tell "request lost" from "response lost", so it retries. An idempotency key lets the server recognise the repeat and return the original result instead of charging again.',
        },
        {
          kind: 'boolean',
          id: 'api-3',
          prompt: 'True or false?',
          statement: 'Adding a new optional field to an API response is a breaking change.',
          answer: false,
          explanation:
            'Well-behaved clients ignore fields they do not know. Removing a field, renaming one, or changing its type IS breaking — those need a new version or a deprecation window.',
        },
        {
          kind: 'choice',
          id: 'api-4',
          prompt: 'What problem does GraphQL solve that REST struggles with?',
          choices: [
            'It is always faster',
            'Clients fetch exactly the fields they need in one round trip, avoiding over- and under-fetching',
            'It removes the need for a database',
            'It has better security',
          ],
          answerIndex: 1,
          explanation:
            'A mobile screen needing 3 fields from 4 resources makes 4 REST calls and downloads far more than it uses. GraphQL trades that for one query — at the cost of harder caching and more server complexity.',
        },
        {
          kind: 'choice',
          id: 'api-5',
          prompt: 'Why is offset pagination (`?page=50`) problematic on large, changing datasets?',
          choices: [
            'It is not valid HTTP',
            'The database still scans all skipped rows, and inserts shift items between pages',
            'It cannot be cached',
            'It only works with SQL',
          ],
          answerIndex: 1,
          explanation:
            '`OFFSET 100000` makes the database walk 100,000 rows to discard them. Worse, a new row inserted at the top shifts everything, so the user sees an item twice or misses one. Cursor pagination avoids both.',
        },
      ],
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: '🗄️',
      summary: 'Where your data lives, and why the query is slow.',
      concept: {
        headline: 'An index is a shortcut, not more memory.',
        body: [
          'Without an index, finding a row means reading every row — a full table scan. An index is a sorted structure that turns that scan into a handful of steps, the same way a book index beats reading every page.',
          'Indexes are not free: they take space and slow down writes, because every insert must update them too. Index what you filter and join on, not everything.',
        ],
        keyPoints: [
          'SQL: structured, relational, strong consistency, flexible queries. NoSQL: flexible shape, scales horizontally, query patterns fixed up front.',
          'Index the columns in your WHERE, JOIN and ORDER BY clauses.',
          'The N+1 problem: one query for a list, then one more per item. It is the most common ORM performance bug.',
          'Use EXPLAIN to see what the database actually does before optimising.',
        ],
        example: {
          caption: 'The N+1 query problem',
          code: `// 1 + N queries — 101 round trips for 100 orders
const orders = await db.orders.findAll()
for (const o of orders) o.user = await db.users.find(o.userId)

// 2 queries, regardless of size
const orders = await db.orders.findAll({ include: 'user' })`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'db-1',
          prompt: 'A `WHERE email = ?` query on a 2M-row table takes 4 seconds. What is most likely missing?',
          choices: ['More RAM', 'An index on email', 'A faster CPU', 'Table normalization'],
          answerIndex: 1,
          explanation:
            'Without an index the database performs a full table scan — 2 million row reads. An index turns it into a tree lookup: roughly 21 steps instead of 2,000,000.',
        },
        {
          kind: 'choice',
          id: 'db-2',
          prompt: 'Why not add an index to every column?',
          choices: [
            'Databases limit you to 5',
            'Every index consumes storage and slows down every insert, update and delete',
            'Indexes break joins',
            'It makes SELECT slower',
          ],
          answerIndex: 1,
          explanation:
            'Each write must update every index on the table. On a write-heavy table, over-indexing can cost more than the reads it saves — indexes are a trade, not free speed.',
        },
        {
          kind: 'choice',
          id: 'db-3',
          prompt: 'Your page makes 101 database queries to show 100 orders with their users. What is this called?',
          choices: ['A deadlock', 'The N+1 query problem', 'A full table scan', 'A cache miss'],
          answerIndex: 1,
          explanation:
            'One query for the list plus one per row. It looks fine with 10 test records and collapses at 10,000. The fix is a join or an eager-loading option — one query for the list, one for all related rows.',
        },
        {
          kind: 'boolean',
          id: 'db-4',
          prompt: 'True or false?',
          statement: 'NoSQL databases are always faster than SQL databases.',
          answer: false,
          explanation:
            'They are faster for the access patterns they were designed around, and can be dramatically worse for others — an unplanned query on DynamoDB may mean scanning the whole table. "NoSQL is fast" really means "NoSQL makes you decide your queries up front".',
        },
        {
          kind: 'choice',
          id: 'db-5',
          prompt: 'What does `EXPLAIN` in front of a query tell you?',
          choices: [
            'How long the query took',
            'The execution plan — whether it uses an index or scans the table',
            'The SQL syntax errors',
            'Which user ran it',
          ],
          answerIndex: 1,
          explanation:
            'It shows the plan the optimiser chose: index scan or sequential scan, join order, estimated rows. It is how you tell whether the index you added is actually being used — often it is not.',
        },
      
        {
          kind: 'gap',
          id: 'db-6',
          prompt: 'Complete the statement that fixes a slow `WHERE email = ?` lookup.',
          code: `___ idx_users_email ON users (email);`,
          choices: ['CREATE INDEX', 'ALTER TABLE', 'CREATE VIEW', 'ANALYZE TABLE'],
          answerIndex: 0,
          explanation:
            'The index gives the planner a sorted structure to search instead of reading all rows. Confirm it is actually used afterwards with EXPLAIN — adding an index does not guarantee the optimiser picks it.',
        },],
    },
    {
      id: 'transactions',
      title: 'Transactions & consistency',
      icon: '🔐',
      summary: 'Keeping data correct when many things happen at once.',
      concept: {
        headline: 'A transaction turns several operations into one all-or-nothing step.',
        body: [
          'Transferring money is two operations: debit one account, credit another. If the system dies between them, money vanishes. A transaction guarantees that either both happen or neither does.',
          'The classic properties are ACID: Atomicity, Consistency, Isolation, Durability. Isolation is the subtle one — it decides what concurrent transactions can see of each other.',
        ],
        keyPoints: [
          'Atomic: all or nothing. Durable: once committed, it survives a crash.',
          'A race condition is two operations interleaving in an order you did not anticipate.',
          'Read-modify-write is unsafe under concurrency. Use an atomic update or a version check.',
          'Optimistic locking: assume no conflict, check a version on write. Pessimistic: lock the row up front.',
        ],
        example: {
          caption: 'A race condition, and the fix',
          code: `// Unsafe: two requests can both read 10 and both write 9
const stock = await db.read(id)
await db.write(id, stock - 1)

// Safe: the database does the arithmetic atomically
await db.query(
  'UPDATE items SET stock = stock - 1 WHERE id = ? AND stock > 0'
)`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'tx-1',
          prompt: 'What does the "A" in ACID guarantee?',
          choices: [
            'The data is available',
            'All operations in the transaction succeed, or none of them do',
            'Access is controlled',
            'Queries are asynchronous',
          ],
          answerIndex: 1,
          explanation:
            'Atomicity. A transfer that debits one account and dies before crediting the other is rolled back entirely — you never end up with money that has left one place without arriving at the other.',
        },
        {
          kind: 'choice',
          id: 'tx-2',
          prompt: 'Two users buy the last item at the same instant and both succeed. What happened?',
          choices: [
            'A deadlock',
            'A race condition — both read the stock before either wrote',
            'A cache miss',
            'An index was missing',
          ],
          answerIndex: 1,
          explanation:
            'Classic read-modify-write. Both read stock = 1, both decide it is available, both write 0. The fix is to make the check and the decrement a single atomic operation in the database.',
        },
        {
          kind: 'boolean',
          id: 'tx-3',
          prompt: 'True or false?',
          statement: 'Wrapping code in a transaction automatically prevents all race conditions.',
          answer: false,
          explanation:
            'It depends entirely on the isolation level. At READ COMMITTED — the default in most databases — two transactions can still read the same value and overwrite each other. You need SERIALIZABLE, explicit locking, or an atomic statement.',
        },
        {
          kind: 'choice',
          id: 'tx-4',
          prompt: 'What is optimistic locking?',
          choices: [
            'Locking the row before reading it',
            'Assuming no conflict, then verifying a version number when writing',
            'Never locking anything',
            'Locking the whole table',
          ],
          answerIndex: 1,
          explanation:
            'You read version 7, and your update says "set this WHERE version = 7". If someone else got there first the update matches zero rows and you retry. Great when conflicts are rare — no lock is held while the user thinks.',
        },
        {
          kind: 'choice',
          id: 'tx-5',
          prompt: 'What is a deadlock?',
          choices: [
            'A crashed database',
            'Two transactions each holding a lock the other needs, so neither can proceed',
            'A very slow query',
            'A full disk',
          ],
          answerIndex: 1,
          explanation:
            'A holds row 1 and wants row 2; B holds row 2 and wants row 1. Databases detect this and kill one transaction. The usual fix is making all code acquire locks in the same order.',
        },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      icon: '🛡️',
      summary: 'The handful of mistakes behind most real breaches.',
      concept: {
        headline: 'Never trust input. Never build queries or HTML by gluing strings together.',
        body: [
          'Injection attacks all share one shape: data supplied by a user gets treated as code. SQL injection, XSS, command injection — same bug, different interpreter.',
          'The defence is always the same idea: keep data as data. Parameterised queries for SQL, escaping or a framework for HTML, argument arrays for shell commands.',
        ],
        keyPoints: [
          'Parameterised queries stop SQL injection. String concatenation causes it.',
          'Hash passwords with bcrypt/argon2 — slow and salted by design. Never MD5, SHA-1 or plain SHA-256.',
          'A JWT is signed, not encrypted. Anyone can read its contents.',
          'Secrets belong in a secret manager or environment variables — never in the repository.',
        ],
        example: {
          caption: 'The difference between a bug and a breach',
          code: `// Injection: input becomes part of the query
db.query("SELECT * FROM users WHERE email = '" + email + "'")
// email = "' OR '1'='1"  ->  returns every user

// Safe: the driver sends the value separately, never as code
db.query('SELECT * FROM users WHERE email = ?', [email])`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'sec-1',
          prompt: 'What is the correct defence against SQL injection?',
          choices: [
            'Escaping quotes manually',
            'Parameterised (prepared) queries',
            'A web application firewall',
            'Hiding error messages',
          ],
          answerIndex: 1,
          explanation:
            'Parameterised queries send the SQL and the values over separate channels, so user input is never parsed as SQL. Manual escaping fails on encodings and edge cases you did not think of — this is a solved problem, use the solution.',
        },
        {
          kind: 'choice',
          id: 'sec-2',
          prompt: 'Which algorithm is appropriate for storing passwords?',
          choices: ['MD5', 'SHA-256', 'bcrypt or argon2', 'Base64'],
          answerIndex: 2,
          explanation:
            'Password hashes must be SLOW and salted. SHA-256 is built for speed — a GPU tries billions per second. bcrypt and argon2 are deliberately expensive, turning a full crack from hours into centuries. (Base64 is not even encryption; it is encoding.)',
        },
        {
          kind: 'boolean',
          id: 'sec-3',
          prompt: 'True or false?',
          statement: 'You can safely store sensitive data inside a JWT because it is encrypted.',
          answer: false,
          explanation:
            'A standard JWT is SIGNED, not encrypted. The payload is base64 — anyone holding the token can decode and read it in a browser console. The signature only proves it has not been tampered with.',
        },
        {
          kind: 'choice',
          id: 'sec-4',
          prompt: 'What is XSS (cross-site scripting)?',
          choices: [
            'Stealing cookies over HTTP',
            'Injecting JavaScript into a page that other users then run',
            'Guessing passwords',
            'Overloading a server',
          ],
          answerIndex: 1,
          explanation:
            'An attacker gets their script stored or reflected into your page. It then runs with your users’ session, so it can read their data or act as them. Escaping output — which modern frameworks do by default — is the defence.',
        },
        {
          kind: 'choice',
          id: 'sec-5',
          prompt: 'What is the "principle of least privilege"?',
          choices: [
            'Give every service admin access for simplicity',
            'Grant only the minimum permissions needed to do the job',
            'Use one shared account',
            'Restrict access to senior engineers',
          ],
          answerIndex: 1,
          explanation:
            'It bounds the blast radius. A compromised service that can only read one bucket is an incident; the same service with admin rights is a company-wide breach.',
        },
      
        {
          kind: 'gap',
          id: 'sec-6',
          prompt: 'Complete the query so user input can never be executed as SQL.',
          code: `db.query('SELECT * FROM users WHERE email = ___', [email])`,
          choices: ['?', '\' + email + \'', '${email}', '%s'],
          answerIndex: 0,
          explanation:
            'The placeholder tells the driver to send the value on a separate channel from the SQL text. String interpolation — the other three — is exactly how injection happens.',
        },],
    },
    {
      id: 'concurrency',
      title: 'Concurrency & async',
      icon: '⚡',
      summary: 'Doing several things at once without corrupting everything.',
      concept: {
        headline: 'Concurrency is dealing with many things at once. Parallelism is doing them at once.',
        body: [
          'A single-threaded event loop (JavaScript, Node) is concurrent but not parallel: while one task waits on the network, another runs. Nothing truly happens simultaneously.',
          'That single thread is a feature — no shared-memory data races. But it also means one heavy synchronous computation blocks everything, including the UI.',
        ],
        keyPoints: [
          'I/O-bound work (network, disk) benefits from async. CPU-bound work needs threads or workers.',
          'await does not block the thread — it yields, letting other work run.',
          'Promise.all runs things concurrently; awaiting in a loop runs them one at a time.',
          'Shared mutable state plus concurrency equals race conditions, in every language.',
        ],
        example: {
          caption: 'Sequential vs concurrent — same code, 5× the time',
          code: `// 5 requests × 200ms = 1000ms
for (const id of ids) results.push(await fetchUser(id))

// all 5 in flight at once = ~200ms
const results = await Promise.all(ids.map(fetchUser))`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'conc-1',
          prompt: 'Why is this slow, and how would you fix it?',
          code: `const users = []
for (const id of ids) {
  users.push(await fetchUser(id))
}`,
          choices: [
            'It is fine',
            'Each await waits for the previous request — use Promise.all to run them concurrently',
            'It needs a worker thread',
            'The array should be preallocated',
          ],
          answerIndex: 1,
          explanation:
            'await inside a loop serialises the requests: 100 users at 200ms each is 20 seconds. `Promise.all` fires them together and takes as long as the slowest one.',
        },
        {
          kind: 'boolean',
          id: 'conc-2',
          prompt: 'True or false?',
          statement: 'Adding async/await to a CPU-heavy function makes it stop blocking the event loop.',
          answer: false,
          explanation:
            'async only helps with WAITING. A loop crunching a million items still occupies the single thread for its whole duration — the UI freezes regardless. CPU-bound work needs a worker thread or a different process.',
        },
        {
          kind: 'choice',
          id: 'conc-3',
          prompt: 'What is the difference between concurrency and parallelism?',
          choices: [
            'They are the same',
            'Concurrency is managing several tasks in overlapping time; parallelism is executing them simultaneously on multiple cores',
            'Concurrency needs multiple machines',
            'Parallelism only applies to databases',
          ],
          answerIndex: 1,
          explanation:
            'One barista interleaving five orders is concurrent. Five baristas working at once is parallel. A single-core machine can be concurrent but never parallel.',
        },
        {
          kind: 'choice',
          id: 'conc-4',
          prompt: 'Why is `Promise.allSettled` sometimes better than `Promise.all`?',
          choices: [
            'It is faster',
            'It waits for every promise and reports each outcome, instead of rejecting on the first failure',
            'It runs them sequentially',
            'It retries failures',
          ],
          answerIndex: 1,
          explanation:
            '`Promise.all` rejects as soon as one fails, and you lose the results that succeeded. When you want to send 100 emails and know exactly which 3 failed, `allSettled` is the right tool.',
        },
        {
          kind: 'choice',
          id: 'conc-5',
          prompt: 'What makes shared mutable state dangerous under concurrency?',
          choices: [
            'It uses more memory',
            'Two tasks can interleave mid-update and leave the data in an impossible state',
            'It cannot be logged',
            'It prevents garbage collection',
          ],
          answerIndex: 1,
          explanation:
            'An update that looks like one line is several machine steps. Interleave two of them and you get a value neither task intended — the reason locks, atomics and immutable data structures all exist.',
        },
      
        {
          kind: 'gap',
          id: 'conc-6',
          prompt: 'Complete the line so all requests run concurrently.',
          code: `const users = await ___(ids.map(fetchUser))`,
          choices: ['Promise.all', 'Promise.race', 'Array.from', 'await'],
          answerIndex: 0,
          explanation:
            '`Promise.all` starts every request immediately and waits for all of them, so total time is the slowest one. `Promise.race` would resolve as soon as the first finished, discarding the rest.',
        },],
    },
    {
      id: 'networking',
      title: 'Networking',
      icon: '📡',
      summary: 'DNS, TCP, TLS and the latency numbers worth memorising.',
      concept: {
        headline: 'The network is slow, unreliable, and lying to you about both.',
        body: [
          'Every remote call can be slow, fail, or — worst of all — succeed without you hearing about it. Distributed systems are largely the discipline of handling that third case.',
          'Knowing rough latency numbers changes design decisions: a memory read is nanoseconds, a datacentre round trip is under a millisecond, a cross-continent round trip is over 100ms. No amount of code makes light faster.',
        ],
        keyPoints: [
          'DNS turns a name into an IP. TCP guarantees ordered delivery; UDP does not but is faster.',
          'TLS encrypts the channel and proves the server is who it claims to be.',
          'A load balancer spreads traffic and removes unhealthy instances.',
          'Always set timeouts and retries with backoff. A request with no timeout can hang forever.',
        ],
        example: {
          caption: 'Latency numbers every developer should know',
          code: `Memory read              ~100 ns
SSD random read          ~150 µs      (1,500× slower)
Same-datacentre round trip ~0.5 ms
Madrid -> Virginia round trip ~90 ms  (900,000× a memory read)`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'net-1',
          prompt: 'What does DNS do?',
          choices: [
            'Encrypts traffic',
            'Translates a domain name into an IP address',
            'Balances load between servers',
            'Caches web pages',
          ],
          answerIndex: 1,
          explanation:
            'It is the phone book of the internet. It is also why a DNS change can take time to reach everyone — resolvers cache the answer for the record’s TTL.',
        },
        {
          kind: 'choice',
          id: 'net-2',
          prompt: 'When is UDP a better choice than TCP?',
          choices: [
            'Transferring a file',
            'Live video or gaming, where a late packet is worse than a lost one',
            'Loading a web page',
            'Sending email',
          ],
          answerIndex: 1,
          explanation:
            'TCP retransmits lost packets and delivers in order, which adds delay. In a live call, a frame that arrives 300ms late is useless — better to drop it and keep going. That is exactly UDP’s trade.',
        },
        {
          kind: 'boolean',
          id: 'net-3',
          prompt: 'True or false?',
          statement: 'If a request times out, you know the server did not process it.',
          answer: false,
          explanation:
            'This is the most important lesson in distributed systems. A timeout tells you that you got no ANSWER — the server may have completed the work perfectly and lost the response. That is precisely why retries need idempotency.',
        },
        {
          kind: 'choice',
          id: 'net-4',
          prompt: 'Why retry with exponential backoff instead of retrying immediately?',
          choices: [
            'It is easier to code',
            'Immediate retries from many clients pile more load on an already struggling service',
            'It uses less bandwidth',
            'It guarantees success',
          ],
          answerIndex: 1,
          explanation:
            'A struggling service gets hammered by thousands of instant retries and never recovers — a retry storm. Backoff (plus jitter, so clients do not synchronise) gives it room to breathe.',
        },
        {
          kind: 'choice',
          id: 'net-5',
          prompt: 'What does a load balancer do beyond distributing traffic?',
          choices: [
            'Compresses responses',
            'Health-checks instances and stops routing to unhealthy ones',
            'Stores sessions',
            'Encrypts the database',
          ],
          answerIndex: 1,
          explanation:
            'Health checking is arguably its more valuable job: an instance that starts failing is pulled out of rotation automatically, so users never reach it. That is what makes rolling deploys invisible.',
        },
      ],
    },
    {
      id: 'caching',
      title: 'Caching',
      icon: '🚀',
      summary: 'The biggest speed win available, and one of the two hard problems.',
      concept: {
        headline: 'Caching is trading freshness for speed. Decide consciously how stale is acceptable.',
        body: [
          'A cache stores the result of expensive work so the next request skips it. The gain is enormous; the cost is that you now have two copies of the truth, and they can disagree.',
          'Almost every caching bug is an invalidation bug: the data changed, the cache did not, and someone sees yesterday’s price.',
        ],
        keyPoints: [
          'Layers: browser → CDN → application cache (Redis) → database cache. Each one closer to the user is faster.',
          'A TTL is the simplest invalidation strategy: accept staleness for N seconds.',
          'Cache-aside: check cache, on a miss read the source and populate.',
          'A cache stampede is many requests all missing at once and hammering the source.',
        ],
        example: {
          caption: 'Cache-aside, the most common pattern',
          code: `async function getUser(id) {
  const hit = await cache.get(\`user:\${id}\`)
  if (hit) return hit

  const user = await db.users.find(id)
  await cache.set(\`user:\${id}\`, user, { ttl: 60 })
  return user
}`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'cache-1',
          prompt: 'A user updates their profile but keeps seeing the old name. What is the bug?',
          choices: [
            'The database write failed',
            'The cache was not invalidated after the write',
            'The index is missing',
            'A race condition in the browser',
          ],
          answerIndex: 1,
          explanation:
            'The write succeeded; the cache still holds the previous value and keeps serving it until the TTL expires. Any write path must either delete or update the cached entry.',
        },
        {
          kind: 'choice',
          id: 'cache-2',
          prompt: 'Why is `index.html` usually cached with `max-age=0` while `/assets/app-a3f9.js` is cached for a year?',
          choices: [
            'HTML is smaller',
            'The asset filename contains a content hash, so a new build produces a new URL',
            'JavaScript cannot be revalidated',
            'Browsers ignore HTML caching',
          ],
          answerIndex: 1,
          explanation:
            'The hashed filename makes the URL immutable — that exact content never changes, so it can be cached forever. index.html must stay fresh because it is what points at the new hashed filenames.',
        },
        {
          kind: 'boolean',
          id: 'cache-3',
          prompt: 'True or false?',
          statement: 'Adding a cache is a safe optimisation with no downsides.',
          answer: false,
          explanation:
            'You have added a second source of truth, a new failure mode (stale data), extra infrastructure, and a debugging problem where "works for me" depends on who has a warm cache. Worth it often — free, never.',
        },
        {
          kind: 'choice',
          id: 'cache-4',
          prompt: 'What is a cache stampede?',
          choices: [
            'The cache runs out of memory',
            'A popular entry expires and thousands of requests hit the database simultaneously',
            'Two caches disagree',
            'The CDN goes offline',
          ],
          answerIndex: 1,
          explanation:
            'Everything was served from cache, then it expires and all that traffic lands on the source at once — often taking it down. Mitigations include staggered TTLs and letting only one request rebuild the entry.',
        },
        {
          kind: 'choice',
          id: 'cache-5',
          prompt: 'Which data is the WORST candidate for a long cache TTL?',
          choices: [
            'A product image',
            'A country list',
            'A user’s current account balance',
            'A CSS file with a hashed name',
          ],
          answerIndex: 2,
          explanation:
            'Showing a stale balance is actively harmful — the user makes decisions on it. Rule of thumb: the cost of being wrong sets the TTL, not how often the data changes.',
        },
      
        {
          kind: 'order',
          id: 'cache-6',
          prompt: 'Put the cache-aside read pattern in order.',
          items: [
            'Look for the key in the cache',
            'On a miss, read from the database',
            'Write the value into the cache with a TTL',
            'Return the value to the caller',
          ],
          explanation:
            'Cache-aside keeps the cache out of the write path: it only ever fills on a miss. The TTL is your explicit decision about how stale is acceptable.',
        },],
    },
  ],
}
