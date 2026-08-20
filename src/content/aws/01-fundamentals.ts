import type { Section } from '../types'

export const fundamentals: Section = {
  id: 'aws-fundamentals',
  title: 'Cloud fundamentals',
  subtitle: 'What you are actually renting, and who is responsible when it breaks.',
  units: [
    {
      id: 'cloud-basics',
      title: 'What the cloud is',
      icon: '☁️',
      summary: 'Regions, Availability Zones, and why "the cloud" is just very organised buildings.',
      concept: {
        headline: 'The cloud is someone else’s computer — arranged so that losing one does not matter.',
        body: [
          'AWS operates REGIONS around the world (eu-west-1 Ireland, us-east-1 Virginia). Each region contains several AVAILABILITY ZONES: physically separate datacentres, close enough for fast networking, far enough that one flood does not take out the others.',
          'This geography is the whole product. Deploying across two AZs means a datacentre can burn down and your app stays up. Deploying to one AZ means you have rented a single point of failure.',
        ],
        keyPoints: [
          'Region = geographic area. AZ = an isolated datacentre inside it. Always use at least two AZs.',
          'Choose a region for latency to users, data-residency law (GDPR), price, and service availability.',
          'Shared responsibility: AWS secures the cloud (hardware, hypervisor). YOU secure what is in it (data, access, patches, config).',
          'Almost every large public breach on AWS is the customer’s side of that line — usually a misconfigured bucket or an over-permissive role.',
        ],
        example: {
          caption: 'What the names actually mean',
          code: `eu-west-1        Region  — Ireland
eu-west-1a       AZ      — one datacentre cluster in Ireland
eu-west-1b       AZ      — another, kilometres away

Multi-AZ  = survives a datacentre failure   (do this)
Multi-Region = survives a whole region failure (expensive, rarely needed)`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-cb-1',
          prompt: 'What is an Availability Zone?',
          choices: [
            'A geographic region like Europe',
            'One or more physically separate datacentres inside a region',
            'A type of EC2 instance',
            'A network security rule',
          ],
          answerIndex: 1,
          explanation:
            'AZs are isolated for power, cooling and networking, but connected by low-latency links. Running in two AZs is the cheapest meaningful availability upgrade you can buy.',
        },
        {
          kind: 'choice',
          id: 'aws-cb-2',
          prompt: 'Under the shared responsibility model, who is responsible for patching the OS on your EC2 instance?',
          choices: ['AWS', 'You', 'Nobody', 'It depends on the region'],
          answerIndex: 1,
          explanation:
            'AWS secures the physical hardware and the hypervisor. Everything from the guest operating system upwards is yours — including patches, firewall rules and your application. On Lambda, AWS takes more of that; on EC2, very little.',
        },
        {
          kind: 'boolean',
          id: 'aws-cb-3',
          prompt: 'True or false?',
          statement: 'Deploying to a single Availability Zone is fine because AWS never has outages.',
          answer: false,
          explanation:
            'Individual AZs do fail — power events and network partitions are documented and public. AWS designs so that AZs fail independently; taking advantage of that is your job, not theirs.',
        },
        {
          kind: 'choice',
          id: 'aws-cb-4',
          prompt: 'Your users are all in Spain. Which region is usually the right default?',
          choices: [
            'us-east-1 (Virginia) — it is the cheapest',
            'eu-west-1 (Ireland) or eu-south-2 (Spain) — lowest latency and EU data residency',
            'ap-southeast-1 (Singapore)',
            'It makes no difference',
          ],
          answerIndex: 1,
          explanation:
            'A round trip to Virginia is roughly 90ms; to Ireland it is around 30ms. On top of latency, GDPR often makes keeping personal data inside the EU a legal requirement, not a preference.',
        },
        {
          kind: 'choice',
          id: 'aws-cb-5',
          prompt: 'Why is us-east-1 special?',
          choices: [
            'It is the fastest region',
            'It is the oldest and largest — some global services are anchored there, so its outages have unusually wide impact',
            'It is the only region with S3',
            'It is free',
          ],
          answerIndex: 1,
          explanation:
            'Several global control planes (parts of IAM, CloudFront config, Route 53) live there. It is also where new services launch first. The practical consequence: a us-east-1 incident can affect people who never deployed anything there.',
        },
      ],
    },
    {
      id: 'iam',
      title: 'IAM',
      icon: '🔑',
      summary: 'Who can do what. The single most important service to get right.',
      concept: {
        headline: 'Use roles, not keys. A role hands out temporary credentials that rotate themselves.',
        body: [
          'IAM controls every action in your account. A POLICY is a JSON document listing allowed or denied actions on resources. A USER is a human identity; a ROLE is an identity that services (or people) temporarily assume.',
          'The rule that prevents most incidents: applications running on AWS should get permissions through a role attached to the compute, never through an access key pasted into code or config.',
        ],
        keyPoints: [
          'Role = temporary, auto-rotating credentials. Access key = permanent, leakable, forever.',
          'Least privilege: grant the specific actions on the specific resources, not `"Action": "*"`.',
          'An explicit Deny always beats an Allow.',
          'Enable MFA on the root account, then lock it away and never use it for daily work.',
        ],
        example: {
          caption: 'A least-privilege policy',
          code: `{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "arn:aws:s3:::my-app-uploads/*"
}

// Not this:
{ "Effect": "Allow", "Action": "*", "Resource": "*" }`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-iam-1',
          prompt: 'Your Lambda needs to read from an S3 bucket. What is the correct way to grant access?',
          choices: [
            'Hardcode access keys in the code',
            'Store access keys in an environment variable',
            'Attach an execution role to the Lambda',
            'Make the bucket public',
          ],
          answerIndex: 2,
          explanation:
            'Roles hand out temporary credentials that AWS rotates automatically. A hardcoded key lives forever, ends up in git, and gets scraped from public repositories within minutes of being pushed.',
        },
        {
          kind: 'choice',
          id: 'aws-iam-2',
          prompt: 'A policy has an Allow for `s3:*` and a Deny for `s3:DeleteObject`. What can the user do?',
          choices: [
            'Everything including delete',
            'Everything in S3 except delete',
            'Nothing',
            'It is an invalid policy',
          ],
          answerIndex: 1,
          explanation:
            'An explicit Deny always wins, regardless of order or how many Allows exist. This is what makes organisation-wide guardrails ("nobody may disable CloudTrail") actually enforceable.',
        },
        {
          kind: 'boolean',
          id: 'aws-iam-3',
          prompt: 'True or false?',
          statement: 'You should use the root account for day-to-day administration.',
          answer: false,
          explanation:
            'Root can do absolutely anything, including closing the account, and its permissions cannot be restricted. Enable MFA, create an admin IAM user or SSO identity for real work, and touch root only for the handful of tasks that require it.',
        },
        {
          kind: 'choice',
          id: 'aws-iam-4',
          prompt: 'What is the difference between an IAM user and an IAM role?',
          choices: [
            'Nothing',
            'A user is a permanent identity with long-lived credentials; a role is assumed temporarily and issues short-lived credentials',
            'Roles are only for humans',
            'Users cannot have policies',
          ],
          answerIndex: 1,
          explanation:
            'Roles are the modern default for both services and people (via SSO). Because credentials expire in hours, a leaked one is a limited window rather than a permanent backdoor.',
        },
        {
          kind: 'choice',
          id: 'aws-iam-5',
          prompt: 'What does "least privilege" mean in practice when you are unsure what a service needs?',
          choices: [
            'Grant `*` and narrow it later',
            'Start with nothing, run it, and add the specific actions the errors ask for',
            'Copy a policy from a blog post',
            'Use the root account',
          ],
          answerIndex: 1,
          explanation:
            '"Grant broad and tighten later" never gets tightened — it becomes production. Starting closed and opening precisely what fails takes an extra hour, and is the difference between a contained incident and a full account compromise.',
        },
      
        {
          kind: 'gap',
          id: 'aws-iam-6',
          prompt: 'Complete the policy so it grants the minimum needed to read one bucket.',
          code: `{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "___"
}`,
          choices: ['arn:aws:s3:::my-app-uploads/*', '*', 'arn:aws:s3:::*', 's3:*'],
          answerIndex: 0,
          explanation:
            'Scope the resource to the specific bucket and key prefix. `*` grants access to every bucket in the account — the difference between a contained incident and a full data breach.',
        },],
    },
    {
      id: 'cost',
      title: 'The cost model',
      icon: '💰',
      summary: 'Pay per use — and the four bills that surprise everyone.',
      concept: {
        headline: 'You pay for what you allocate, not for what you use.',
        body: [
          'This is the mental shift. A stopped EC2 instance still bills for its disk. An unattached Elastic IP bills for existing. An idle RDS instance bills 24/7 whether or not a single query runs.',
          'The other trap is data transfer. Traffic INTO AWS is generally free; traffic OUT to the internet is charged per gigabyte, and it is where surprise five-figure bills come from.',
        ],
        keyPoints: [
          'Ingress (data in) is usually free. Egress (data out to the internet) is not.',
          'Stopped EC2 = no compute charge, but the EBS volume still bills.',
          'NAT Gateways charge per hour AND per gigabyte processed — a classic silent cost.',
          'Set a billing alarm on day one. Every single time.',
        ],
        example: {
          caption: 'Where the surprise bills come from',
          code: `EC2 stopped, 100GB EBS volume    ~$8/month  for a machine you are not using
Elastic IP, unattached           ~$4/month  for an address doing nothing
NAT Gateway                      ~$35/month + $0.045 per GB processed
Egress to internet               ~$0.09 per GB — 10TB = ~$900`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-cost-1',
          prompt: 'Your EC2 instance is stopped. What are you still paying for?',
          choices: [
            'Nothing',
            'The attached EBS volume',
            'CPU hours',
            'Only the Elastic IP',
          ],
          answerIndex: 1,
          explanation:
            'Stopping frees the compute, but the disk keeps existing — and keeps billing. It is the number one surprise on a first AWS invoice, especially with forgotten volumes from deleted experiments.',
        },
        {
          kind: 'choice',
          id: 'aws-cost-2',
          prompt: 'Which direction of data transfer is typically charged?',
          choices: [
            'Into AWS from the internet',
            'Out of AWS to the internet',
            'Both equally',
            'Neither',
          ],
          answerIndex: 1,
          explanation:
            'Ingress is free — AWS wants your data in. Egress is billed per GB, which is why a viral video served straight from S3 without CloudFront can produce an eye-watering invoice.',
        },
        {
          kind: 'boolean',
          id: 'aws-cost-3',
          prompt: 'True or false?',
          statement: 'The AWS free tier means you cannot be charged during your first year.',
          answer: false,
          explanation:
            'The free tier covers specific services up to specific limits. Exceed 750 hours, launch a larger instance type, or use a service outside the tier and you are billed normally. A billing alarm is not optional.',
        },
        {
          kind: 'choice',
          id: 'aws-cost-4',
          prompt: 'For a workload running 24/7 for the next year, what usually cuts the bill most?',
          choices: [
            'A bigger instance',
            'Savings Plans or Reserved Instances — committing to usage for a 1-3 year discount',
            'Turning off logging',
            'Changing region every month',
          ],
          answerIndex: 1,
          explanation:
            'Committing to a level of spend for one or three years typically saves 30-70% versus on-demand. It is the single biggest lever for steady workloads — and it is purely a billing change, no architecture work.',
        },
        {
          kind: 'choice',
          id: 'aws-cost-5',
          prompt: 'What is the FIRST thing to set up in a brand new AWS account?',
          choices: [
            'A VPC',
            'MFA on root and a billing alarm',
            'An EC2 instance',
            'A domain name',
          ],
          answerIndex: 1,
          explanation:
            'Those two cover the two ways a new account goes badly wrong: someone else getting in, and a runaway resource nobody noticed. Both take five minutes and cost nothing.',
        },
      ],
    },
  ],
}
