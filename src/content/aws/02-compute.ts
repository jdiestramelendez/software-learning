import type { Section } from '../types'

export const compute: Section = {
  id: 'aws-compute',
  title: 'Compute — where code runs',
  subtitle: 'Servers, functions and containers. Knowing which to reach for.',
  units: [
    {
      id: 'ec2',
      title: 'EC2',
      icon: '🖥️',
      summary: 'Virtual machines: the most flexible and most manual option.',
      concept: {
        headline: 'EC2 is a rented virtual machine. Maximum control, maximum responsibility.',
        body: [
          'You pick an instance type (CPU/memory), an AMI (the disk image it boots from), a network and a security group. From there it is a Linux box: you patch it, you monitor it, you keep it alive.',
          'The modern way to run EC2 is never to treat instances as pets. An Auto Scaling Group launches identical instances from a template, replaces unhealthy ones automatically, and adds capacity when load rises.',
        ],
        keyPoints: [
          'Instance families: t (burstable, cheap), m (balanced), c (compute), r (memory), g/p (GPU).',
          'A security group is a stateful firewall around the instance — allow rules only.',
          'An AMI is the disk image. Bake your app into one, or configure at boot with user data.',
          'Auto Scaling Groups + a load balancer = self-healing capacity.',
        ],
        example: {
          caption: 'Reading an instance name',
          code: `m7g.xlarge
│││  └── size: xlarge = 4 vCPU, 16 GiB
││└───── g = AWS Graviton (ARM) — cheaper per unit of work
│└────── 7 = generation (newer is usually faster AND cheaper)
└─────── m = general purpose family`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-ec2-1',
          prompt: 'What is a security group?',
          choices: [
            'A group of IAM users',
            'A stateful virtual firewall controlling traffic to and from an instance',
            'An encryption key',
            'A billing category',
          ],
          answerIndex: 1,
          explanation:
            'It holds ALLOW rules only, and it is stateful: if you allow an inbound request, the response is automatically permitted out. That statefulness is the key difference from a network ACL.',
        },
        {
          kind: 'choice',
          id: 'aws-ec2-2',
          prompt: 'What does an Auto Scaling Group give you beyond adding capacity?',
          choices: [
            'Cheaper instances',
            'It replaces unhealthy instances automatically, keeping the desired count alive',
            'Automatic backups',
            'A static IP',
          ],
          answerIndex: 1,
          explanation:
            'Self-healing is arguably the bigger win. An instance that fails its health check is terminated and replaced from the launch template without anyone being paged.',
        },
        {
          kind: 'boolean',
          id: 'aws-ec2-3',
          prompt: 'True or false?',
          statement: 'You should SSH into production instances to apply fixes by hand.',
          answer: false,
          explanation:
            'A hand-patched instance is a snowflake: its state exists nowhere in code, and the next auto-scaled instance will not have your fix. Change the image or the configuration, then roll out replacements.',
        },
        {
          kind: 'choice',
          id: 'aws-ec2-4',
          prompt: 'Your workload is fault-tolerant batch processing that can be interrupted. What cuts the cost most?',
          choices: [
            'Spot Instances — spare capacity at up to ~90% off, reclaimable with 2 minutes notice',
            'A larger instance type',
            'Running in us-east-1',
            'Disabling monitoring',
          ],
          answerIndex: 0,
          explanation:
            'Spot sells unused capacity cheaply on the condition that AWS may take it back. Perfect for batch jobs, CI runners and rendering; unacceptable for a database or anything a user is waiting on.',
        },
        {
          kind: 'choice',
          id: 'aws-ec2-5',
          prompt: 'What is an AMI?',
          choices: [
            'A monitoring agent',
            'A disk image an instance boots from, including OS and any pre-installed software',
            'A network interface',
            'An IAM policy',
          ],
          answerIndex: 1,
          explanation:
            'Baking your app and dependencies into a custom AMI makes new instances boot ready to serve in seconds, instead of running a long configuration script every time they launch.',
        },
      ],
    },
    {
      id: 'lambda',
      title: 'Lambda & serverless',
      icon: '⚡',
      summary: 'Code that runs on an event and bills by the millisecond.',
      concept: {
        headline: 'Lambda runs a function in response to an event. No idle cost, no servers to patch.',
        body: [
          'You upload a function; AWS runs it when something triggers it — an HTTP call, a file landing in S3, a message on a queue, a schedule. It scales from zero to thousands of concurrent executions on its own.',
          'The trade-offs are real: a hard timeout, no persistent local state, and a COLD START — the first invocation after idleness pays extra latency while the environment initialises.',
        ],
        keyPoints: [
          'Billed per millisecond of execution × memory configured. Idle costs nothing.',
          'Maximum timeout is 15 minutes. Long jobs need Step Functions, ECS or Batch.',
          'Cold starts add latency; keep packages small and avoid heavy work at module load.',
          'Memory and CPU are linked — raising memory speeds the function up and can lower total cost.',
        ],
        example: {
          caption: 'A function, and what triggers it',
          code: `export const handler = async (event) => {
  const key = event.Records[0].s3.object.key
  await makeThumbnail(key)
  return { statusCode: 200 }
}

// Trigger: any object uploaded to my-bucket/uploads/
// Scale: 1 upload or 10,000 — same code, no capacity planning`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-lam-1',
          prompt: 'What is a Lambda "cold start"?',
          choices: [
            'The function failing',
            'Extra latency while AWS initialises a new execution environment for an idle function',
            'The first deployment',
            'Running out of memory',
          ],
          answerIndex: 1,
          explanation:
            'AWS must provision a container and load your runtime and code. It hits the first request after idleness and every new concurrent execution — which is why a traffic spike produces a burst of slow responses.',
        },
        {
          kind: 'choice',
          id: 'aws-lam-2',
          prompt: 'Which workload is a BAD fit for Lambda?',
          choices: [
            'Resizing images on upload',
            'A nightly report generator',
            'A video transcode that takes 40 minutes',
            'An API endpoint with spiky traffic',
          ],
          answerIndex: 2,
          explanation:
            'Lambda hard-stops at 15 minutes. A 40-minute job belongs on ECS/Fargate, AWS Batch, or split into steps orchestrated by Step Functions.',
        },
        {
          kind: 'boolean',
          id: 'aws-lam-3',
          prompt: 'True or false?',
          statement: 'You can rely on files written to /tmp persisting between Lambda invocations.',
          answer: false,
          explanation:
            'A warm environment MAY be reused, so /tmp sometimes survives — which is worse than never surviving, because it works in testing and fails randomly in production. Treat every invocation as stateless; use S3 or a database.',
        },
        {
          kind: 'choice',
          id: 'aws-lam-4',
          prompt: 'Your Lambda is slow. You raise memory from 128MB to 1024MB and it gets cheaper. Why?',
          choices: [
            'Memory is free above 512MB',
            'CPU scales with memory, so it finishes several times faster — and you are billed per millisecond',
            'AWS gives a discount',
            'It caches better',
          ],
          answerIndex: 1,
          explanation:
            'Cost = memory × duration. Eight times the memory with ten times the speed is a net saving. Under-provisioning memory to "save money" is one of the most common Lambda mistakes.',
        },
        {
          kind: 'choice',
          id: 'aws-lam-5',
          prompt: 'What is the biggest operational advantage of serverless?',
          choices: [
            'It is always cheaper',
            'No servers to patch, scale or capacity-plan — and no cost when idle',
            'It runs faster than EC2',
            'It has no limits',
          ],
          answerIndex: 1,
          explanation:
            'You delete an entire category of work. Note it is NOT always cheaper: at steady high throughput, a well-utilised container fleet usually beats Lambda on price. The saving is in operations, not always in the invoice.',
        },
      
        {
          kind: 'order',
          id: 'aws-lam-6',
          prompt: 'Order what happens on a Lambda cold start.',
          items: [
            'AWS provisions a new execution environment',
            'The runtime and your deployment package are loaded',
            'Module-level initialisation code runs',
            'Your handler function is invoked',
          ],
          explanation:
            'Only the last step happens on a warm invocation. That is why heavy work — SDK clients, DB pools — belongs at module level: it is paid once per environment, not once per request.',
        },],
    },
    {
      id: 'containers-aws',
      title: 'Containers on AWS',
      icon: '🐳',
      summary: 'ECR, ECS, Fargate and EKS — and how to choose between them.',
      concept: {
        headline: 'Fargate is "containers without servers". EKS is Kubernetes, with everything that implies.',
        body: [
          'ECR stores your images. ECS is the AWS-native orchestrator: simple, deeply integrated, less to learn. EKS is managed Kubernetes: portable, enormously capable, and a genuine operational commitment.',
          'The orthogonal choice is where they run. EC2 launch type means you manage the instances underneath. Fargate means AWS does — you just declare CPU and memory per task.',
        ],
        keyPoints: [
          'ECR = image registry. ECS/EKS = orchestrator. Fargate = the serverless way to run either.',
          'ECS + Fargate is the lowest-effort production container setup on AWS.',
          'Choose EKS when you need Kubernetes portability or its ecosystem — not by default.',
          'A task definition is the blueprint (image, CPU, memory, env); a service keeps N copies running.',
        ],
        example: {
          caption: 'The decision, compressed',
          code: `Simple app, small team, want it running today   -> ECS + Fargate
Already fluent in Kubernetes, multi-cloud goal  -> EKS
Need control of the host / GPUs / cheap Spot    -> ECS or EKS on EC2
One short job per event, no container needed    -> Lambda`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-ctr-1',
          prompt: 'What does Fargate remove from your responsibility?',
          choices: [
            'Writing the Dockerfile',
            'Provisioning, patching and scaling the EC2 instances the containers run on',
            'Defining CPU and memory',
            'Building the image',
          ],
          answerIndex: 1,
          explanation:
            'You still build and describe your container. Fargate removes the servers underneath — no capacity planning, no host patching, no cluster of instances sitting half empty.',
        },
        {
          kind: 'choice',
          id: 'aws-ctr-2',
          prompt: 'What is ECR?',
          choices: [
            'A container orchestrator',
            'A private registry for storing Docker images',
            'A load balancer',
            'A CI service',
          ],
          answerIndex: 1,
          explanation:
            'Elastic Container Registry is the AWS equivalent of a private Docker Hub. It integrates with IAM, so a task role can pull images without any registry credentials.',
        },
        {
          kind: 'boolean',
          id: 'aws-ctr-3',
          prompt: 'True or false?',
          statement: 'EKS is the right default for a small team deploying their first containerised app.',
          answer: false,
          explanation:
            'Kubernetes brings real power and real operational weight — upgrades, networking, RBAC, add-ons. For a small team with one app, ECS + Fargate delivers the same outcome in a fraction of the time. Choose EKS when you can name why you need it.',
        },
        {
          kind: 'choice',
          id: 'aws-ctr-4',
          prompt: 'In ECS, what is the difference between a task definition and a service?',
          choices: [
            'They are the same',
            'The task definition is the blueprint; the service keeps a desired number of tasks running and replaces failures',
            'A service is a container image',
            'Task definitions handle load balancing',
          ],
          answerIndex: 1,
          explanation:
            'Same relationship as an image and a deployment: the definition says WHAT to run, the service guarantees HOW MANY keep running, integrates with the load balancer, and handles rolling deploys.',
        },
        {
          kind: 'choice',
          id: 'aws-ctr-5',
          prompt: 'When is running containers on EC2 (rather than Fargate) still the better choice?',
          choices: [
            'Always — it is simpler',
            'When you need GPUs, specific host tuning, or steady load cheap enough to justify managing instances',
            'When the app is small',
            'When using ECR',
          ],
          answerIndex: 1,
          explanation:
            'Fargate charges a premium for removing the servers. At high, steady utilisation — or when you need host-level control Fargate does not expose — managing your own instances (especially on Spot) wins on cost.',
        },
      ],
    },
  ],
}
