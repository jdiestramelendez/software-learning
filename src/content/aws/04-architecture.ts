import type { Section } from '../types'

export const architecture: Section = {
  id: 'aws-architecture',
  title: 'Gluing a real system together',
  subtitle: 'Events, APIs, observability, and reading an architecture diagram.',
  units: [
    {
      id: 'messaging',
      title: 'Messaging & events',
      icon: '📨',
      summary: 'SQS, SNS and EventBridge — how services talk without depending on each other.',
      concept: {
        headline: 'A queue turns "my caller must wait and must not fail" into "I will get to it".',
        body: [
          'SQS is a queue: one message, one consumer, processed when ready. SNS is publish/subscribe: one message fanned out to many subscribers. EventBridge is a router that filters events by content and sends them to the right targets.',
          'They all buy the same thing: the producer stops caring whether the consumer is up, fast, or even deployed yet.',
        ],
        keyPoints: [
          'SQS = queue, one consumer per message, retries built in. SNS = fan-out to many. EventBridge = rules-based routing.',
          'Standard SQS is at-least-once delivery — so consumers must be idempotent.',
          'A dead-letter queue captures messages that keep failing, so one poison message cannot block the queue forever.',
          'Queues absorb spikes: 10,000 orders in a second become a backlog, not an outage.',
        ],
        example: {
          caption: 'Decoupling a checkout',
          code: `Checkout API -> SQS -> Worker (Lambda or ECS)
                       |
                       └-> DLQ after 3 failed attempts

The API responds in 50ms. The email provider being down
delays receipts — it does not block revenue.`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-msg-1',
          prompt: 'What is the difference between SQS and SNS?',
          choices: [
            'None',
            'SQS delivers a message to one consumer that pulls it; SNS pushes each message to all subscribers',
            'SNS is for databases',
            'SQS cannot retry',
          ],
          answerIndex: 1,
          explanation:
            'Queue versus broadcast. Use SQS for work that one worker should do once; use SNS when several independent systems each need to know that something happened.',
        },
        {
          kind: 'choice',
          id: 'aws-msg-2',
          prompt: 'Why must an SQS consumer be idempotent?',
          choices: [
            'To improve performance',
            'Standard queues guarantee at-least-once delivery, so the same message can arrive twice',
            'To reduce cost',
            'AWS requires it',
          ],
          answerIndex: 1,
          explanation:
            'If a consumer processes a message but dies before deleting it, the message reappears. Without idempotency that means a duplicate charge or a duplicate email — the same lesson as retrying an HTTP request.',
        },
        {
          kind: 'boolean',
          id: 'aws-msg-3',
          prompt: 'True or false?',
          statement: 'A dead-letter queue is where messages go when the queue is full.',
          answer: false,
          explanation:
            'A DLQ collects messages that failed processing repeatedly. Without one, a single malformed message is retried forever, blocking or endlessly re-consuming — the DLQ sets it aside so the rest of the queue keeps flowing.',
        },
        {
          kind: 'choice',
          id: 'aws-msg-4',
          prompt: 'What does EventBridge add over SNS?',
          choices: [
            'Higher throughput',
            'Content-based routing rules, plus events from AWS services and SaaS partners',
            'Guaranteed ordering',
            'Lower cost always',
          ],
          answerIndex: 1,
          explanation:
            'You write a rule like "orders where amount > 1000 go to the fraud checker". SNS fans out to everyone and lets subscribers filter; EventBridge does the routing centrally and speaks natively to AWS service events.',
        },
        {
          kind: 'choice',
          id: 'aws-msg-5',
          prompt: 'A flash sale sends 50,000 orders in one minute. How does a queue help?',
          choices: [
            'It rejects the extra orders',
            'It absorbs the spike as a backlog while workers process at a sustainable rate',
            'It makes the database faster',
            'It caches responses',
          ],
          answerIndex: 1,
          explanation:
            'Without a queue, that burst hits the database directly and everything falls over. With one, orders are accepted instantly and drained at whatever rate the system can sustain — slower, but nothing is lost.',
        },
      
        {
          kind: 'gap',
          id: 'aws-msg-6',
          prompt: 'Complete the setting that stops one poison message blocking a queue forever.',
          code: `Queue: orders
  maxReceiveCount: 3
  ___: orders-dlq`,
          choices: ['deadLetterTargetArn', 'visibilityTimeout', 'retentionPeriod', 'delaySeconds'],
          answerIndex: 0,
          explanation:
            'After three failed attempts the message is moved to the dead-letter queue instead of being retried indefinitely. You then inspect the DLQ to see what broke, while the main queue keeps flowing.',
        },],
    },
    {
      id: 'api-gateway',
      title: 'API Gateway + Lambda',
      icon: '🚪',
      summary: 'A production API with no servers to manage.',
      concept: {
        headline: 'API Gateway is the front door: routing, auth, throttling and TLS before your code runs.',
        body: [
          'It receives HTTP requests, validates and authorises them, and invokes a Lambda (or forwards to another backend). Everything that is not your business logic happens before your function is ever called.',
          'The combination scales from zero to thousands of requests per second with no capacity planning — and costs nothing when nobody is using it.',
        ],
        keyPoints: [
          'Throttling and usage plans protect your backend from abuse and runaway clients.',
          'Authorizers (Cognito, JWT, or a Lambda) reject unauthorised calls before your code runs.',
          'HTTP APIs are cheaper and faster than REST APIs; REST APIs have more features.',
          'Watch for the double cold start: gateway plus Lambda initialisation on the first call.',
        ],
        example: {
          caption: 'A serverless endpoint, end to end',
          code: `Client
  -> CloudFront (TLS, cache)
  -> API Gateway (authorizer, throttle 1000 rps)
  -> Lambda (your handler)
  -> DynamoDB

No servers. No patching. $0 when idle.`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-apigw-1',
          prompt: 'What does an API Gateway authorizer do?',
          choices: [
            'Encrypts the response',
            'Validates identity and rejects unauthorised requests before your Lambda is invoked',
            'Caches responses',
            'Load balances between regions',
          ],
          answerIndex: 1,
          explanation:
            'Auth happens at the edge of your system, so unauthorised traffic never reaches — or bills — your function. It also means every endpoint gets the same auth logic instead of each one reimplementing it.',
        },
        {
          kind: 'choice',
          id: 'aws-apigw-2',
          prompt: 'Why configure throttling on an API Gateway?',
          choices: [
            'To reduce latency',
            'To cap the request rate so a buggy client or attack cannot overwhelm the backend or the bill',
            'It is required for HTTPS',
            'To enable caching',
          ],
          answerIndex: 1,
          explanation:
            'Serverless scales automatically — including scaling your invoice. A client stuck in a retry loop can invoke a Lambda millions of times overnight. Throttling is as much a cost control as a stability control.',
        },
        {
          kind: 'boolean',
          id: 'aws-apigw-3',
          prompt: 'True or false?',
          statement: 'A serverless API has no limits because it scales automatically.',
          answer: false,
          explanation:
            'There is an account-level concurrency limit, per-function limits, gateway throttles, and downstream limits — a Lambda scaling to 1,000 concurrent executions can exhaust your database connection pool instantly.',
        },
        {
          kind: 'choice',
          id: 'aws-apigw-4',
          prompt: 'When would you choose an Application Load Balancer over API Gateway?',
          choices: [
            'Never',
            'For containers or EC2 backends with steady high traffic — ALB is cheaper per request and adds less latency',
            'When you need authentication',
            'For static files',
          ],
          answerIndex: 1,
          explanation:
            'API Gateway bills per request and brings API features you may not need. At millions of requests against a container fleet, an ALB is substantially cheaper and simpler.',
        },
        {
          kind: 'choice',
          id: 'aws-apigw-5',
          prompt: 'A Lambda behind API Gateway scales to 1,000 concurrent executions and your RDS database falls over. Why?',
          choices: [
            'Lambda is too fast',
            'Each execution opens its own database connection, exhausting the connection limit',
            'API Gateway caches wrongly',
            'The database region is wrong',
          ],
          answerIndex: 1,
          explanation:
            'A traditional server holds a small pool of reused connections. A thousand independent Lambdas each want their own. RDS Proxy exists precisely to pool connections in front of the database and solve this.',
        },
      ],
    },
    {
      id: 'cloudwatch',
      title: 'CloudWatch & X-Ray',
      icon: '📈',
      summary: 'Seeing what your system is doing, and finding where the time went.',
      concept: {
        headline: 'If it is not in CloudWatch, it did not happen — as far as you can prove.',
        body: [
          'CloudWatch collects logs, metrics and alarms across every AWS service. Logs Insights queries them; alarms notify or trigger auto-scaling. X-Ray traces one request across services to show where the latency actually is.',
          'The discipline is the same as anywhere: structured logs, alerts on user-facing symptoms, and a retention policy so you are not paying to store noise forever.',
        ],
        keyPoints: [
          'Log groups have no expiry by default — set retention or pay indefinitely.',
          'Alarms can notify (SNS) or act (scale out, reboot, run a Lambda).',
          'Logs Insights lets you query logs with a real query language, not grep.',
          'X-Ray shows the waterfall across Lambda, API Gateway and downstream calls.',
        ],
        example: {
          caption: 'Finding slow requests in Logs Insights',
          code: `fields @timestamp, requestId, durationMs, route
| filter durationMs > 1000
| sort durationMs desc
| limit 20`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-cw-1',
          prompt: 'What is the default retention for a CloudWatch log group?',
          choices: [
            '7 days',
            '30 days',
            'Never expires — you pay to store it forever until you set a policy',
            '24 hours',
          ],
          answerIndex: 2,
          explanation:
            'Logs accumulate indefinitely by default. Setting retention on every log group is one of the highest-value five-minute cost optimisations in any AWS account.',
        },
        {
          kind: 'choice',
          id: 'aws-cw-2',
          prompt: 'What does X-Ray show that CloudWatch Logs cannot?',
          choices: [
            'Error messages',
            'A single request’s timeline across every service it touched, with time spent in each',
            'CPU usage',
            'Billing data',
          ],
          answerIndex: 1,
          explanation:
            'Logs from six services are six disconnected streams. A trace stitches them into one waterfall, so "the endpoint takes 3 seconds" becomes "2.6 of those seconds are one DynamoDB call".',
        },
        {
          kind: 'boolean',
          id: 'aws-cw-3',
          prompt: 'True or false?',
          statement: 'A CloudWatch alarm can only send a notification.',
          answer: false,
          explanation:
            'Alarms can trigger actions: scale an Auto Scaling Group out, stop or reboot an instance, or invoke a Lambda. That is what makes metric-driven auto-scaling work without any human involved.',
        },
        {
          kind: 'choice',
          id: 'aws-cw-4',
          prompt: 'Which is the better CloudWatch alarm for a customer-facing API?',
          choices: [
            'Lambda invocation count above 1000',
            'p99 latency above 2 seconds, or 5xx rate above 1%',
            'Log volume above 1GB',
            'Memory above 50%',
          ],
          answerIndex: 1,
          explanation:
            'Alert on what users feel. A high invocation count might be a successful marketing campaign; a rising 5xx rate is always a problem worth waking someone for.',
        },
        {
          kind: 'choice',
          id: 'aws-cw-5',
          prompt: 'Why log in JSON rather than plain text on AWS?',
          choices: [
            'It is smaller',
            'Logs Insights can filter and aggregate on individual fields instead of matching substrings',
            'It is required by Lambda',
            'It is easier to read',
          ],
          answerIndex: 1,
          explanation:
            'Structured fields turn logs into a queryable dataset: filter by userId, average durationMs, group by route. Free-text logs force you into fragile substring matching that breaks whenever the message wording changes.',
        },
      ],
    },
    {
      id: 'well-architected',
      title: 'Well-Architected',
      icon: '🏛️',
      summary: 'The six pillars, and reading a real architecture end to end.',
      concept: {
        headline: 'Every architecture decision is a trade between six competing pillars.',
        body: [
          'AWS’s Well-Architected Framework names them: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimisation, and Sustainability. Nothing maximises all six — the value is making the trade consciously.',
          'A multi-region active-active deployment scores brilliantly on reliability and terribly on cost and operational complexity. That is a legitimate choice for a payments platform and a terrible one for an internal dashboard.',
        ],
        keyPoints: [
          'Reliability: design for failure. Everything fails, all the time — plan for it.',
          'Security: least privilege, encryption at rest and in transit, auditability.',
          'Cost: the cheapest architecture is usually the one you did not over-build.',
          'Operational excellence: infrastructure as code, so environments are reproducible.',
        ],
        example: {
          caption: 'A production three-tier web app on AWS',
          code: `Route 53  -> CloudFront -> ALB (public subnets, 2 AZs)
                             -> ECS Fargate (private subnets, 2 AZs)
                                  ├-> Aurora Postgres (private, Multi-AZ)
                                  ├-> ElastiCache Redis (sessions, cache)
                                  └-> SQS -> Lambda workers (email, PDFs)

Logs/metrics -> CloudWatch    Secrets -> Secrets Manager
Everything defined in Terraform or CDK.`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-wa-1',
          prompt: 'Which is NOT one of the Well-Architected pillars?',
          choices: [
            'Security',
            'Reliability',
            'Popularity',
            'Cost Optimisation',
          ],
          answerIndex: 2,
          explanation:
            'The six are Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimisation and Sustainability. They are deliberately in tension — a review is about naming which ones you chose to sacrifice.',
        },
        {
          kind: 'choice',
          id: 'aws-wa-2',
          prompt: 'Why define infrastructure as code (Terraform, CDK, CloudFormation)?',
          choices: [
            'It is faster to click in the console',
            'Environments become reproducible, reviewable and versioned — and recreatable after a disaster',
            'AWS charges less for it',
            'It improves latency',
          ],
          answerIndex: 1,
          explanation:
            'Console changes exist only in one person’s memory. IaC makes infrastructure reviewable in a pull request, identical across staging and production, and rebuildable from scratch in a new region.',
        },
        {
          kind: 'boolean',
          id: 'aws-wa-3',
          prompt: 'True or false?',
          statement: 'A multi-region active-active architecture is the right goal for most applications.',
          answer: false,
          explanation:
            'It multiplies cost, and forces you to solve data replication and conflict resolution — genuinely hard problems. Multi-AZ within one region already survives a datacentre failure and covers the vast majority of real requirements.',
        },
        {
          kind: 'choice',
          id: 'aws-wa-4',
          prompt: 'Where should an application’s database credentials live?',
          choices: [
            'In the source code',
            'In Secrets Manager or Parameter Store, fetched at runtime via an IAM role',
            'In a public S3 bucket',
            'In the AMI',
          ],
          answerIndex: 1,
          explanation:
            'Secrets Manager supports automatic rotation and full audit logging, and access is granted through the same IAM role the compute already has. Nothing sensitive ever enters the repository or the image.',
        },
        {
          kind: 'order',
          id: 'aws-wa-5',
          prompt: 'A request hits the three-tier architecture. Put the hops in order.',
          items: [
            'Route 53 resolves the domain',
            'CloudFront serves from cache or forwards to the origin',
            'The Application Load Balancer picks a healthy task',
            'An ECS Fargate task runs the application code',
            'Aurora returns the data',
          ],
          explanation:
            'Each layer has one job and can fail independently: DNS resolves, the CDN absorbs load, the load balancer routes around unhealthy tasks, the app computes, the database persists.',
        },
      ],
    },
  ],
}
