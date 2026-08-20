import type { Section } from '../types'

export const data: Section = {
  id: 'aws-data',
  title: 'Storage, data and networking',
  subtitle: 'Where the bytes live and how packets reach them.',
  units: [
    {
      id: 's3',
      title: 'S3',
      icon: '🪣',
      summary: 'Infinite object storage — and the most famous misconfiguration in tech.',
      concept: {
        headline: 'S3 stores objects, not files. There are no real folders — only key prefixes.',
        body: [
          'You put an object under a key like `uploads/2026/photo.jpg` in a bucket. The slashes are part of the key; the "folder" structure is a convenience the console draws for you.',
          'S3 is durable to eleven nines, scales without configuration, and is cheap. It is also where a decade of data breaches came from — buckets accidentally opened to the public internet.',
        ],
        keyPoints: [
          'Storage classes trade retrieval speed for price: Standard → Infrequent Access → Glacier.',
          'A presigned URL grants temporary access to one object without making the bucket public.',
          'Versioning protects against overwrite and deletion. Lifecycle rules move or expire old objects automatically.',
          'S3 can host a static website — but put CloudFront in front of it for HTTPS, caching and cheaper egress.',
        ],
        example: {
          caption: 'Letting a browser upload without exposing the bucket',
          code: `// Backend signs a short-lived URL
const url = await getSignedUrl(s3, new PutObjectCommand({
  Bucket: 'uploads', Key: \`user/\${id}/avatar.jpg\`,
}), { expiresIn: 300 })

// The browser PUTs straight to S3 — bytes never touch your server`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-s3-1',
          prompt: 'How do you let a user download one private file without making the bucket public?',
          choices: [
            'Set the bucket ACL to public-read',
            'Generate a presigned URL that expires',
            'Email them the AWS credentials',
            'Copy the file to a public bucket',
          ],
          answerIndex: 1,
          explanation:
            'A presigned URL carries a time-limited signature for that one object. It is the standard pattern for both downloads and direct browser uploads — no public access, no credentials on the client.',
        },
        {
          kind: 'choice',
          id: 'aws-s3-2',
          prompt: 'Your app stores logs in S3 that are rarely read after 30 days. What cuts the cost?',
          choices: [
            'Delete the bucket',
            'A lifecycle rule transitioning objects to Infrequent Access, then Glacier',
            'Enable versioning',
            'Move to a cheaper region',
          ],
          answerIndex: 1,
          explanation:
            'Lifecycle rules move data down the storage tiers automatically by age. Glacier is roughly a tenth of the Standard price — the trade is retrieval time, measured in minutes to hours.',
        },
        {
          kind: 'boolean',
          id: 'aws-s3-3',
          prompt: 'True or false?',
          statement: 'S3 has real folders, so moving a folder is a fast metadata operation.',
          answer: false,
          explanation:
            'Keys are flat strings; the folder tree is a UI illusion. "Renaming a folder" means copying every object to a new key and deleting the originals — an O(n) operation that surprises people with millions of objects.',
        },
        {
          kind: 'choice',
          id: 'aws-s3-4',
          prompt: 'Why put CloudFront in front of an S3 static site rather than serving S3 directly?',
          choices: [
            'S3 cannot serve HTML',
            'CloudFront adds HTTPS with a custom domain, edge caching, and cheaper egress',
            'It is required by AWS',
            'S3 has a request limit of 100/second',
          ],
          answerIndex: 1,
          explanation:
            'S3 website hosting cannot serve HTTPS on your own domain, has no edge cache, and bills full egress on every request. CloudFront fixes all three — it is the default for any real static site.',
        },
        {
          kind: 'choice',
          id: 'aws-s3-5',
          prompt: 'What does S3 Versioning protect you from?',
          choices: [
            'A region outage',
            'Accidental overwrite or deletion — the previous version is retained and restorable',
            'Ransomware in all cases',
            'High costs',
          ],
          answerIndex: 1,
          explanation:
            'A delete becomes a marker rather than destruction, and overwrites keep the prior object. Note the cost side: you now pay for every version, so pair it with a lifecycle rule that expires old ones.',
        },
      
        {
          kind: 'order',
          id: 'aws-s3-6',
          prompt: 'Order a secure direct-to-S3 browser upload.',
          items: [
            'The browser asks your backend for permission to upload',
            'The backend checks auth and generates a short-lived presigned URL',
            'The browser PUTs the file straight to S3 using that URL',
            'S3 emits an event that triggers post-processing',
          ],
          explanation:
            'The file bytes never pass through your server — it only issues permission. That removes bandwidth, memory and timeout limits from the upload path entirely.',
        },],
    },
    {
      id: 'aws-databases',
      title: 'Databases on AWS',
      icon: '🗃️',
      summary: 'RDS, Aurora, DynamoDB, ElastiCache — picking the right one.',
      concept: {
        headline: 'Managed means AWS handles backups, patching and failover. It does not handle your schema.',
        body: [
          'RDS runs standard engines (Postgres, MySQL) with the operations taken care of. Aurora is AWS’s own rewrite of those engines with faster replication and storage that grows automatically.',
          'DynamoDB is a different animal: a NoSQL key-value store with single-digit millisecond reads at any scale — provided you design your access patterns first. That constraint is the whole trade.',
        ],
        keyPoints: [
          'RDS/Aurora: relational, joins, transactions, SQL you already know.',
          'DynamoDB: massive scale, predictable latency, but queries must be designed up front.',
          'ElastiCache (Redis): in-memory cache and session store, sub-millisecond.',
          'Multi-AZ gives you automatic failover. Read replicas give you read capacity. They are different features.',
        ],
        example: {
          caption: 'Choosing, in one breath',
          code: `Relational data, joins, reporting        -> RDS / Aurora Postgres
Huge scale, simple key lookups          -> DynamoDB
Sessions, cache, leaderboards           -> ElastiCache (Redis)
Analytics over billions of rows         -> Redshift / Athena`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-db-1',
          prompt: 'What is the difference between Multi-AZ and a read replica in RDS?',
          choices: [
            'They are the same',
            'Multi-AZ is a standby for automatic failover; a read replica serves read traffic',
            'Multi-AZ is cheaper',
            'Read replicas provide backups',
          ],
          answerIndex: 1,
          explanation:
            'The Multi-AZ standby takes no traffic — it exists purely so failover is automatic. A read replica does take traffic but is not a failover target by default. Availability and scale are separate problems with separate features.',
        },
        {
          kind: 'choice',
          id: 'aws-db-2',
          prompt: 'When is DynamoDB a poor choice?',
          choices: [
            'Very high traffic',
            'When you need ad-hoc queries and joins across entities',
            'Key-value lookups',
            'Serverless applications',
          ],
          answerIndex: 1,
          explanation:
            'DynamoDB is designed around access patterns you define in advance. A query nobody planned for means a full table scan — slow and expensive. If the business will ask unpredictable questions of the data, use SQL.',
        },
        {
          kind: 'boolean',
          id: 'aws-db-3',
          prompt: 'True or false?',
          statement: 'A managed database service means you no longer need to think about backups.',
          answer: false,
          explanation:
            'AWS takes the snapshots; you still choose the retention period, verify that restores actually work, and protect against the failure mode automated backups do not cover — someone dropping a table and nobody noticing for a week.',
        },
        {
          kind: 'choice',
          id: 'aws-db-4',
          prompt: 'What does Aurora improve over standard RDS?',
          choices: [
            'It supports more SQL syntax',
            'Storage grows automatically and replicates across AZs, with much faster replica lag and failover',
            'It is always cheaper',
            'It requires no schema',
          ],
          answerIndex: 1,
          explanation:
            'Aurora separates compute from a distributed storage layer spread across three AZs. Replicas share that storage, so lag drops to milliseconds and failover is far quicker. It usually costs more per hour than plain RDS.',
        },
        {
          kind: 'choice',
          id: 'aws-db-5',
          prompt: 'Where should an application store user sessions on AWS?',
          choices: [
            'In each server’s local memory',
            'In ElastiCache (Redis) or a signed token, so any instance can serve any request',
            'In S3',
            'In a local file on the instance',
          ],
          answerIndex: 1,
          explanation:
            'Local memory breaks the moment you run more than one instance — the load balancer sends the user to a server that has never seen them. Shared session state is what makes horizontal scaling possible.',
        },
      ],
    },
    {
      id: 'vpc',
      title: 'VPC & networking',
      icon: '🕸️',
      summary: 'Your private network: subnets, security groups and the NAT gateway bill.',
      concept: {
        headline: 'A public subnet has a route to an internet gateway. A private one does not. That is the entire distinction.',
        body: [
          'A VPC is your isolated network inside AWS. You divide it into subnets across AZs. What makes a subnet "public" is nothing more than a route table entry pointing at an Internet Gateway.',
          'The standard design: load balancers in public subnets, application servers and databases in private ones. Private resources reach the internet outbound through a NAT Gateway — which cannot be used to reach them inbound.',
        ],
        keyPoints: [
          'Security group = stateful firewall on a resource, allow-only. NACL = stateless firewall on a subnet, allow and deny.',
          'A NAT Gateway lets private subnets make outbound calls. It bills per hour AND per GB.',
          'Databases belong in private subnets, reachable only from your app’s security group.',
          'A security group can reference another security group as its source — better than hardcoding IP ranges.',
        ],
        example: {
          caption: 'The standard three-tier layout',
          code: `Public subnet   (AZ-a, AZ-b)   Load balancer, NAT Gateway
Private subnet  (AZ-a, AZ-b)   App servers / containers
Private subnet  (AZ-a, AZ-b)   RDS — inbound 5432 only from the app's SG`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-vpc-1',
          prompt: 'What actually makes a subnet "public"?',
          choices: [
            'A setting called isPublic',
            'A route table entry sending 0.0.0.0/0 to an Internet Gateway',
            'Being in us-east-1',
            'Having no security group',
          ],
          answerIndex: 1,
          explanation:
            'That route is the whole difference. Subnets are identical otherwise — which is why an accidental route can quietly expose resources you believed were private.',
        },
        {
          kind: 'choice',
          id: 'aws-vpc-2',
          prompt: 'What is the difference between a security group and a network ACL?',
          choices: [
            'None',
            'A security group is stateful and attaches to resources; a NACL is stateless and applies to a whole subnet',
            'NACLs are for databases only',
            'Security groups can deny traffic',
          ],
          answerIndex: 1,
          explanation:
            'Stateful means an allowed inbound request gets its response out automatically. A NACL evaluates each direction separately, so you must allow the return traffic explicitly — the classic reason a NACL change breaks everything.',
        },
        {
          kind: 'boolean',
          id: 'aws-vpc-3',
          prompt: 'True or false?',
          statement: 'A NAT Gateway lets the internet reach your private instances.',
          answer: false,
          explanation:
            'Exactly backwards. NAT allows private resources to make OUTBOUND connections (package updates, third-party APIs) while remaining unreachable from outside. Inbound access comes from a load balancer in a public subnet.',
        },
        {
          kind: 'choice',
          id: 'aws-vpc-4',
          prompt: 'What is the best source rule for the database’s security group?',
          choices: [
            '0.0.0.0/0 on port 5432',
            'The application tier’s security group on port 5432',
            'The office IP range on all ports',
            'No inbound rules at all',
          ],
          answerIndex: 1,
          explanation:
            'Referencing the app’s security group means "whatever instances are currently running the app may connect" — no IP list to maintain as instances scale in and out, and no accidental exposure.',
        },
        {
          kind: 'choice',
          id: 'aws-vpc-5',
          prompt: 'Your bill shows a large NAT Gateway charge. What is a common fix?',
          choices: [
            'Delete the VPC',
            'Add VPC endpoints so traffic to S3 and DynamoDB bypasses the NAT',
            'Use a bigger instance',
            'Disable the load balancer',
          ],
          answerIndex: 1,
          explanation:
            'Every gigabyte a private instance pulls from S3 through a NAT Gateway is billed twice — once for NAT processing, once as transfer. A gateway VPC endpoint routes that traffic privately, and it is free.',
        },
      
        {
          kind: 'gap',
          id: 'aws-vpc-6',
          prompt: 'Complete the database security group rule.',
          code: `Type: PostgreSQL   Port: 5432
Source: ___`,
          choices: ['sg-app-tier (the application security group)', '0.0.0.0/0', 'The VPC CIDR', 'Any IPv4'],
          answerIndex: 0,
          explanation:
            'Referencing the app tier’s security group means access follows the instances automatically as they scale in and out — no IP list to maintain and nothing exposed to the wider network.',
        },],
    },
    {
      id: 'cloudfront',
      title: 'CloudFront & the edge',
      icon: '🌍',
      summary: 'Serving content from close to the user.',
      concept: {
        headline: 'A CDN moves your content nearer the user. Physics does the rest.',
        body: [
          'CloudFront caches responses at hundreds of edge locations worldwide. A user in Madrid gets a file from Madrid rather than Virginia — a 90ms round trip becomes single digits.',
          'It is also where you terminate TLS, attach a custom domain, block bad traffic with WAF, and cut egress costs, since CloudFront egress is cheaper than S3 or EC2 egress.',
        ],
        keyPoints: [
          'An ORIGIN is where CloudFront fetches from — S3, a load balancer, or any HTTP server.',
          'Cache behaviours let different paths have different rules: cache /assets/* forever, never cache /api/*.',
          'Invalidation clears cached objects. Better: use content-hashed filenames so URLs never need invalidating.',
          'Free managed TLS certificates come from ACM — but for CloudFront they must be issued in us-east-1.',
        ],
        example: {
          caption: 'Exactly how this app would be served',
          code: `Browser -> CloudFront edge -> S3 bucket (dist/)

/assets/index-a3f9.js   cache 1 year   (hashed name = immutable)
/index.html             cache 0        (must always be fresh)
/*                      -> /index.html (SPA routing fallback)`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-cf-1',
          prompt: 'What is the primary benefit of a CDN?',
          choices: [
            'It compresses your database',
            'Content is served from an edge location near the user, cutting latency',
            'It replaces your backend',
            'It encrypts data at rest',
          ],
          answerIndex: 1,
          explanation:
            'Distance is latency, and no code makes light faster. Serving from a nearby edge is often the single biggest perceived-performance win available to a global app.',
        },
        {
          kind: 'choice',
          id: 'aws-cf-2',
          prompt: 'Why is a content hash in the filename better than invalidating the CDN cache?',
          choices: [
            'Invalidations are slow and cost money; a new hash is simply a new URL that was never cached',
            'Hashes are shorter',
            'Invalidation does not work',
            'Browsers ignore invalidations',
          ],
          answerIndex: 0,
          explanation:
            'Change the content and the filename changes, so the request is for a URL the cache has never seen — instantly correct everywhere. Invalidation is a slower, chargeable workaround for when you cannot hash.',
        },
        {
          kind: 'boolean',
          id: 'aws-cf-3',
          prompt: 'True or false?',
          statement: 'CloudFront can only serve static files from S3.',
          answer: false,
          explanation:
            'Any HTTP origin works — an Application Load Balancer, API Gateway, even a server outside AWS. Many setups route /api/* to a dynamic origin uncached and /* to S3 cached, all under one domain.',
        },
        {
          kind: 'choice',
          id: 'aws-cf-4',
          prompt: 'Where must an ACM certificate be issued to be used with CloudFront?',
          choices: ['The same region as the origin', 'us-east-1', 'Any region', 'eu-west-1'],
          answerIndex: 1,
          explanation:
            'CloudFront is a global service whose control plane lives in us-east-1, so its certificates must be there. Requesting one in your local region and finding it unselectable is a rite of passage.',
        },
        {
          kind: 'choice',
          id: 'aws-cf-5',
          prompt: 'Beyond latency, what does putting CloudFront in front of your origin protect against?',
          choices: [
            'SQL injection',
            'Traffic spikes and DDoS — the edge absorbs load your origin never sees',
            'Data loss',
            'Expired certificates',
          ],
          answerIndex: 1,
          explanation:
            'Cached responses are served at the edge, so a viral moment or a flood never reaches your servers. AWS Shield Standard is included, and WAF can be attached for filtering malicious requests.',
        },
      ],
    },
  ],
}
