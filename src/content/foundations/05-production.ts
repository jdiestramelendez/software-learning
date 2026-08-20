import type { Section } from '../types'

export const production: Section = {
  id: 'production',
  title: 'Running it in production',
  subtitle: 'Shipping is the start of the job, not the end.',
  units: [
    {
      id: 'linux',
      title: 'Linux & the CLI',
      icon: '🐧',
      summary: 'The twenty commands that cover ninety percent of the work.',
      concept: {
        headline: 'Small tools, joined by pipes, beat one big tool.',
        body: [
          'The Unix philosophy: each program does one thing and reads/writes plain text. A pipe (`|`) feeds one program’s output into the next, which lets you build a one-off tool in seconds.',
          'Almost every server you deploy to runs Linux. Being fluent here is the difference between debugging a production box and filing a ticket for someone else to do it.',
        ],
        keyPoints: [
          'Navigate and inspect: `ls`, `cd`, `cat`, `less`, `tail -f`, `find`.',
          'Filter and transform: `grep`, `sort`, `uniq`, `wc`, `awk`, `sed`.',
          'Processes: `ps`, `top`, `kill`. Disk and network: `df`, `du`, `curl`.',
          'Permissions are read/write/execute for owner, group, others — `chmod 644` is rw-r--r--.',
        ],
        example: {
          caption: 'Top 5 IPs hitting your error endpoint',
          code: `grep ' 500 ' access.log \\
  | awk '{print $1}' \\
  | sort \\
  | uniq -c \\
  | sort -rn \\
  | head -5`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'lin-1',
          prompt: 'What does the `|` (pipe) operator do?',
          choices: [
            'Runs two commands in parallel',
            'Sends the output of one command as the input of the next',
            'Redirects output to a file',
            'Comments out the rest of the line',
          ],
          answerIndex: 1,
          explanation:
            'It chains small tools into a bespoke one. Writing output to a file is `>` — the pipe keeps everything in memory and streaming, so it works on files too big to fit on disk twice.',
        },
        {
          kind: 'choice',
          id: 'lin-2',
          prompt: 'How do you watch a log file as new lines are written?',
          choices: ['cat app.log', 'tail -f app.log', 'less app.log', 'grep app.log'],
          answerIndex: 1,
          explanation:
            '`tail -f` prints the end of the file and then follows it live. `cat` dumps everything once and exits — useless for a log that is still being written.',
        },
        {
          kind: 'boolean',
          id: 'lin-3',
          prompt: 'True or false?',
          statement: '`chmod 777` is a reasonable fix for a permissions problem.',
          answer: false,
          explanation:
            '777 grants read, write and execute to everyone on the system, including any compromised process. It "works" because it removes all protection. Grant the specific permission the specific user needs instead.',
        },
        {
          kind: 'choice',
          id: 'lin-4',
          prompt: 'A server reports "No space left on device" but `df` shows plenty free. What else could be exhausted?',
          choices: [
            'RAM',
            'Inodes — the file table is full even though the bytes are not',
            'CPU',
            'Network sockets',
          ],
          answerIndex: 1,
          explanation:
            'A filesystem has a fixed number of inodes, one per file. Millions of tiny session or cache files exhaust them while leaving gigabytes free. `df -i` shows it.',
        },
        {
          kind: 'choice',
          id: 'lin-5',
          prompt: 'What is the difference between `kill` and `kill -9`?',
          choices: [
            'Nothing',
            '`kill` asks the process to shut down cleanly; `-9` forces the kernel to terminate it immediately',
            '`-9` is slower',
            '`kill` only works on your own processes',
          ],
          answerIndex: 1,
          explanation:
            'Plain `kill` sends SIGTERM, which a well-written process catches to finish requests and flush data. `-9` sends SIGKILL, which cannot be caught — instant death, with whatever corruption that implies. Try SIGTERM first.',
        },
      
        {
          kind: 'gap',
          id: 'lin-6',
          prompt: 'Complete the pipeline that counts the most frequent IPs in a log.',
          code: `awk '{print $1}' access.log | sort | ___ -c | sort -rn | head -5`,
          choices: ['uniq', 'grep', 'wc', 'cut'],
          answerIndex: 0,
          explanation:
            '`uniq -c` collapses adjacent duplicate lines and prefixes each with a count — which is why the `sort` before it is mandatory: uniq only sees neighbours.',
        },],
    },
    {
      id: 'containers',
      title: 'Containers',
      icon: '📦',
      summary: 'What Docker actually solves, and what it does not.',
      concept: {
        headline: 'A container packages your app WITH its environment, so "works on my machine" becomes irrelevant.',
        body: [
          'A container bundles your code, its runtime, its libraries and its OS-level dependencies into one image. That image runs identically on your laptop, in CI, and in production.',
          'Unlike a virtual machine, containers share the host kernel. That makes them start in milliseconds instead of minutes, and small enough to run dozens per machine.',
        ],
        keyPoints: [
          'An IMAGE is the blueprint. A CONTAINER is a running instance of it.',
          'Images are layered and cached — order your Dockerfile so dependencies install before you copy source code.',
          'Containers are ephemeral. Anything written inside is lost on restart unless it is on a volume.',
          'A container is not a security boundary as strong as a VM: it shares the host kernel.',
        ],
        example: {
          caption: 'Layer order is the whole performance story',
          code: `FROM node:22-alpine
WORKDIR /app

COPY package*.json ./     # changes rarely
RUN npm ci                # cached until deps change

COPY . .                  # changes every commit
RUN npm run build`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'ctr-1',
          prompt: 'What is the difference between an image and a container?',
          choices: [
            'Nothing, they are synonyms',
            'An image is the immutable blueprint; a container is a running instance of it',
            'An image runs, a container stores',
            'Images are for production only',
          ],
          answerIndex: 1,
          explanation:
            'Same relationship as a class and an object, or an ISO file and a booted machine. One image can back a hundred identical containers.',
        },
        {
          kind: 'choice',
          id: 'ctr-2',
          prompt: 'Why copy `package.json` and install dependencies BEFORE copying the rest of the source?',
          choices: [
            'It is required syntax',
            'Docker caches layers — dependencies are only reinstalled when package.json changes',
            'It makes the image smaller',
            'npm requires it',
          ],
          answerIndex: 1,
          explanation:
            'Each instruction is a cached layer, invalidated by any change above it. Copy everything first and every one-character code change reinstalls all dependencies — turning a 5-second build into 3 minutes.',
        },
        {
          kind: 'boolean',
          id: 'ctr-3',
          prompt: 'True or false?',
          statement: 'Data written inside a running container persists after it is removed.',
          answer: false,
          explanation:
            'The writable layer dies with the container. Anything that must survive — a database, uploads — belongs on a mounted volume or an external service. This surprises people exactly once, usually in production.',
        },
        {
          kind: 'choice',
          id: 'ctr-4',
          prompt: 'How do containers differ from virtual machines?',
          choices: [
            'Containers are slower',
            'Containers share the host kernel instead of booting their own OS',
            'VMs cannot run Linux',
            'Containers need more memory',
          ],
          answerIndex: 1,
          explanation:
            'A VM virtualises hardware and boots a full guest OS — heavy, slow, strongly isolated. A container is just isolated processes on the host kernel: milliseconds to start, megabytes in size, weaker isolation.',
        },
        {
          kind: 'choice',
          id: 'ctr-5',
          prompt: 'Why avoid running a container as root?',
          choices: [
            'It is slower',
            'A container escape or a compromised process would then have root on the host',
            'Docker forbids it',
            'It breaks networking',
          ],
          answerIndex: 1,
          explanation:
            'Container isolation is good, not perfect. Running as an unprivileged user means a kernel-level escape lands an attacker as a nobody rather than as root — a cheap, large reduction in blast radius.',
        },
      
        {
          kind: 'gap',
          id: 'ctr-6',
          prompt: 'Complete the Dockerfile so dependency installs stay cached.',
          code: `FROM node:22-alpine
WORKDIR /app
___
RUN npm ci
COPY . .`,
          choices: ['COPY package*.json ./', 'COPY . .', 'RUN npm install', 'ADD src/ ./'],
          answerIndex: 0,
          explanation:
            'Copying only the manifest first means the `npm ci` layer is reused until dependencies actually change. `COPY . .` here would invalidate the cache on every source edit.',
        },],
    },
    {
      id: 'observability',
      title: 'Observability',
      icon: '📊',
      summary: 'Understanding a system you cannot attach a debugger to.',
      concept: {
        headline: 'You cannot debug production. You can only ask it questions.',
        body: [
          'Monitoring tells you THAT something is wrong. Observability is being able to work out WHY, for a failure you never anticipated, without shipping new code.',
          'Three signals do the work: logs (discrete events), metrics (numbers over time), traces (one request’s path across services).',
        ],
        keyPoints: [
          'Structured logs (JSON with fields) are searchable. Free-text logs are not.',
          'Metrics are cheap and aggregate well; logs are detailed and expensive at volume.',
          'Always log a correlation/request ID so one user’s journey can be reconstructed.',
          'Alert on symptoms users feel (error rate, latency), not on causes (CPU at 80%).',
        ],
        example: {
          caption: 'A log line you can actually query',
          code: `// Unsearchable
console.log('User checkout failed for ' + id)

// Queryable: "all failed checkouts over 2s for this user"
logger.error('checkout_failed', {
  userId: id, orderId, durationMs: 2310, reason: 'card_declined',
  requestId: ctx.requestId,
})`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'obs-1',
          prompt: 'What does a distributed trace show that logs alone cannot?',
          choices: [
            'The error message',
            'One request’s full path across services, with the time spent in each',
            'The server’s CPU usage',
            'The database schema',
          ],
          answerIndex: 1,
          explanation:
            'When a request touches six services, logs give you six disconnected islands. A trace stitches them into one timeline, so "where did those 3 seconds go?" has an answer.',
        },
        {
          kind: 'choice',
          id: 'obs-2',
          prompt: 'Which is the better thing to alert on?',
          choices: [
            'CPU above 80%',
            'Checkout error rate above 1%',
            'Disk usage above 50%',
            'Number of running containers',
          ],
          answerIndex: 1,
          explanation:
            'High CPU may be perfectly healthy; low CPU may accompany a total outage. Alert on what users experience — errors and latency — and use resource metrics to diagnose once you know something is wrong.',
        },
        {
          kind: 'boolean',
          id: 'obs-3',
          prompt: 'True or false?',
          statement: 'Logging everything at maximum detail is the safest strategy in production.',
          answer: false,
          explanation:
            'Log volume costs real money, slows the app, and buries the signal you need. Worse, verbose logs frequently leak passwords, tokens and personal data into a system with far weaker access controls than your database.',
        },
        {
          kind: 'choice',
          id: 'obs-4',
          prompt: 'Why attach a request ID to every log line?',
          choices: [
            'To sort logs alphabetically',
            'To reconstruct a single request’s journey across services and log lines',
            'To compress logs',
            'It is required by JSON',
          ],
          answerIndex: 1,
          explanation:
            'Under concurrent load, log lines from thousands of requests interleave. A correlation ID lets you filter to exactly one user’s failing request out of millions of lines.',
        },
        {
          kind: 'choice',
          id: 'obs-5',
          prompt: 'What is an SLO?',
          choices: [
            'A type of database index',
            'A target for reliability, e.g. "99.9% of requests succeed under 300ms"',
            'A security policy',
            'A logging format',
          ],
          answerIndex: 1,
          explanation:
            'A Service Level Objective turns "the site should be fast" into a measurable target. It also defines an error budget: at 99.9%, you have ~43 minutes of failure per month to spend on risk.',
        },
      ],
    },
    {
      id: 'system-design',
      title: 'System design',
      icon: '🏗️',
      summary: 'Putting it together: how systems grow from one server to many.',
      concept: {
        headline: 'Scaling is mostly about removing state from the things you want to duplicate.',
        body: [
          'You cannot run ten copies of a server that keeps sessions in local memory — users would randomly lose their login. Make the server stateless, push state to a shared store, and you can run a thousand copies.',
          'Beyond that, the moves are familiar: cache the expensive reads, queue the slow writes, replicate the database for reads, and shard it when one machine is not enough.',
        ],
        keyPoints: [
          'Vertical scaling = a bigger machine (simple, has a ceiling). Horizontal = more machines (harder, no ceiling).',
          'Stateless services scale horizontally. Sessions belong in Redis or a token, not in process memory.',
          'A queue absorbs spikes and decouples producer from consumer — at the cost of eventual consistency.',
          'CAP: during a network partition you choose consistency OR availability. You do not get both.',
        ],
        example: {
          caption: 'Designing a URL shortener, in five decisions',
          code: `1. Write path   POST /shorten -> generate key -> store {key, url}
2. Read path    GET /:key -> lookup -> 301 redirect
3. Read:write is ~1000:1  -> cache aggressively, replicate reads
4. Key = base62 of a counter or hash. 7 chars = 3.5 trillion URLs
5. Bottleneck is the lookup -> Redis in front of the database`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'sd-1',
          prompt: 'Why must a service be stateless to scale horizontally?',
          choices: [
            'Stateless services use less CPU',
            'Any instance must be able to serve any request — local state means the wrong instance has the wrong data',
            'Load balancers cannot route stateful traffic',
            'It is a Docker requirement',
          ],
          answerIndex: 1,
          explanation:
            'With sessions in local memory, a user is logged in on instance A and logged out on instance B. Push that state to Redis or a signed token and every instance becomes interchangeable.',
        },
        {
          kind: 'choice',
          id: 'sd-2',
          prompt: 'What does the CAP theorem force you to choose during a network partition?',
          choices: [
            'Speed or cost',
            'Consistency or availability',
            'SQL or NoSQL',
            'Reads or writes',
          ],
          answerIndex: 1,
          explanation:
            'When nodes cannot talk, you either refuse requests to avoid serving stale data (consistency) or answer with possibly-stale data (availability). A bank picks the first; a social feed picks the second.',
        },
        {
          kind: 'choice',
          id: 'sd-3',
          prompt: 'A checkout must send an email, update analytics and generate a PDF. Why move those to a queue?',
          choices: [
            'To save money',
            'The user gets a fast response, and a failing email service no longer breaks checkout',
            'Queues are more secure',
            'To avoid using a database',
          ],
          answerIndex: 1,
          explanation:
            'The purchase is the only thing that must happen synchronously. Queueing the rest cuts response time and decouples failure: the email provider going down delays receipts instead of blocking revenue.',
        },
        {
          kind: 'boolean',
          id: 'sd-4',
          prompt: 'True or false?',
          statement: 'You should design for millions of users from the very first version.',
          answer: false,
          explanation:
            'Almost every product dies from lack of users, not lack of scale. Premature distributed architecture costs speed, money and debuggability now, to solve a problem you may never have. Design so you CAN scale; do not build it yet.',
        },
        {
          kind: 'order',
          id: 'sd-5',
          prompt: 'Order these scaling steps from the one you should reach for first to the last resort.',
          items: [
            'Add an index and fix the slow queries',
            'Add a cache in front of the database',
            'Add read replicas',
            'Shard the database across machines',
          ],
          explanation:
            'Each step adds real operational complexity, so exhaust the cheap ones first. Sharding is genuinely hard — cross-shard joins and rebalancing — and most systems never need it.',
        },
      ],
    },
  ],
}
