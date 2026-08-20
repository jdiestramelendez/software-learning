import type { Section } from '../types'

export const compute: Section = {
  id: 'aws-compute',
  title: { en: 'Compute — where code runs', es: 'Cómputo: dónde se ejecuta el código' },
  subtitle: {
    en: 'Servers, functions and containers. Knowing which to reach for.',
    es: 'Servidores, funciones y contenedores. Saber a cuál recurrir.',
  },
  units: [
    {
      id: 'ec2',
      title: { en: 'EC2', es: 'EC2' },
      icon: '🖥️',
      summary: {
        en: 'Virtual machines: the most flexible and most manual option.',
        es: 'Máquinas virtuales: la opción más flexible y más manual.',
      },
      concept: {
        headline: {
          en: 'EC2 is a rented virtual machine. Maximum control, maximum responsibility.',
          es: 'EC2 es una máquina virtual alquilada. Máximo control, máxima responsabilidad.',
        },
        body: [
          {
            en: 'You pick an instance type (CPU/memory), an AMI (the disk image it boots from), a network and a security group. From there it is a Linux box: you patch it, you monitor it, you keep it alive.',
            es: 'Eliges un tipo de instancia (CPU y memoria), una AMI (la imagen de disco desde la que arranca), una red y un grupo de seguridad. A partir de ahí es una máquina Linux: tú la parcheas, tú la monitorizas, tú la mantienes viva.',
          },
          {
            en: 'The modern way to run EC2 is never to treat instances as pets. An Auto Scaling Group launches identical instances from a template, replaces unhealthy ones automatically, and adds capacity when load rises.',
            es: 'La forma moderna de usar EC2 es no tratar nunca las instancias como mascotas. Un Auto Scaling Group lanza instancias idénticas desde una plantilla, sustituye automáticamente las que enferman y añade capacidad cuando sube la carga.',
          },
        ],
        keyPoints: [
          {
            en: 'Instance families: t (burstable, cheap), m (balanced), c (compute), r (memory), g/p (GPU).',
            es: 'Familias de instancia: t (por ráfagas, baratas), m (equilibradas), c (cómputo), r (memoria), g/p (GPU).',
          },
          {
            en: 'A security group is a stateful firewall around the instance — allow rules only.',
            es: 'Un grupo de seguridad es un firewall con estado alrededor de la instancia: solo reglas de permitir.',
          },
          {
            en: 'An AMI is the disk image. Bake your app into one, or configure at boot with user data.',
            es: 'Una AMI es la imagen de disco. Hornea tu app dentro o configúrala al arrancar con user data.',
          },
          {
            en: 'Auto Scaling Groups + a load balancer = self-healing capacity.',
            es: 'Auto Scaling Groups + un balanceador = capacidad que se cura sola.',
          },
        ],
        example: {
          caption: { en: 'Reading an instance name', es: 'Leer el nombre de una instancia' },
          code: {
            en: `m7g.xlarge
│││  └── size: xlarge = 4 vCPU, 16 GiB
││└───── g = AWS Graviton (ARM) — cheaper per unit of work
│└────── 7 = generation (newer is usually faster AND cheaper)
└─────── m = general purpose family`,
            es: `m7g.xlarge
│││  └── tamaño: xlarge = 4 vCPU, 16 GiB
││└───── g = AWS Graviton (ARM) — más barato por unidad de trabajo
│└────── 7 = generación (la nueva suele ser más rápida Y más barata)
└─────── m = familia de propósito general`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-ec2-1',
          prompt: { en: 'What is a security group?', es: '¿Qué es un grupo de seguridad?' },
          choices: [
            { en: 'A group of IAM users', es: 'Un grupo de usuarios IAM' },
            {
              en: 'A stateful virtual firewall controlling traffic to and from an instance',
              es: 'Un firewall virtual con estado que controla el tráfico hacia y desde una instancia',
            },
            { en: 'An encryption key', es: 'Una clave de cifrado' },
            { en: 'A billing category', es: 'Una categoría de facturación' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It holds ALLOW rules only, and it is stateful: if you allow an inbound request, the response is automatically permitted out. That statefulness is the key difference from a network ACL.',
            es: 'Solo contiene reglas de PERMITIR y tiene estado: si permites una petición entrante, la respuesta sale automáticamente permitida. Ese estado es la diferencia clave con una ACL de red.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-ec2-2',
          prompt: {
            en: 'What does an Auto Scaling Group give you beyond adding capacity?',
            es: '¿Qué te da un Auto Scaling Group además de añadir capacidad?',
          },
          choices: [
            { en: 'Cheaper instances', es: 'Instancias más baratas' },
            {
              en: 'It replaces unhealthy instances automatically, keeping the desired count alive',
              es: 'Sustituye automáticamente las instancias enfermas, manteniendo vivo el número deseado',
            },
            { en: 'Automatic backups', es: 'Copias de seguridad automáticas' },
            { en: 'A static IP', es: 'Una IP estática' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Self-healing is arguably the bigger win. An instance that fails its health check is terminated and replaced from the launch template without anyone being paged.',
            es: 'La autocuración es probablemente la mayor ventaja. Una instancia que falla su comprobación de salud se termina y se sustituye desde la plantilla de lanzamiento sin despertar a nadie.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-ec2-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'You should SSH into production instances to apply fixes by hand.',
            es: 'Deberías entrar por SSH a las instancias de producción para aplicar arreglos a mano.',
          },
          answer: false,
          explanation: {
            en: 'A hand-patched instance is a snowflake: its state exists nowhere in code, and the next auto-scaled instance will not have your fix. Change the image or the configuration, then roll out replacements.',
            es: 'Una instancia parcheada a mano es un copo de nieve único: su estado no existe en ningún código, y la siguiente instancia que se autoescale no tendrá tu arreglo. Cambia la imagen o la configuración y despliega sustitutas.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-ec2-4',
          prompt: {
            en: 'Your workload is fault-tolerant batch processing that can be interrupted. What cuts the cost most?',
            es: 'Tu carga es procesamiento por lotes tolerante a fallos que puede interrumpirse. ¿Qué reduce más el coste?',
          },
          choices: [
            {
              en: 'Spot Instances — spare capacity at up to ~90% off, reclaimable with 2 minutes notice',
              es: 'Instancias Spot: capacidad sobrante con hasta un 90% de descuento, recuperable con 2 minutos de aviso',
            },
            { en: 'A larger instance type', es: 'Un tipo de instancia mayor' },
            { en: 'Running in us-east-1', es: 'Ejecutar en us-east-1' },
            { en: 'Disabling monitoring', es: 'Desactivar la monitorización' },
          ],
          answerIndex: 0,
          explanation: {
            en: 'Spot sells unused capacity cheaply on the condition that AWS may take it back. Perfect for batch jobs, CI runners and rendering; unacceptable for a database or anything a user is waiting on.',
            es: 'Spot vende capacidad sin usar a bajo precio con la condición de que AWS puede reclamarla. Perfecto para trabajos por lotes, runners de CI y renderizado; inaceptable para una base de datos o para algo que un usuario esté esperando.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-ec2-5',
          prompt: { en: 'What is an AMI?', es: '¿Qué es una AMI?' },
          choices: [
            { en: 'A monitoring agent', es: 'Un agente de monitorización' },
            {
              en: 'A disk image an instance boots from, including OS and any pre-installed software',
              es: 'Una imagen de disco desde la que arranca una instancia, con el sistema operativo y el software preinstalado',
            },
            { en: 'A network interface', es: 'Una interfaz de red' },
            { en: 'An IAM policy', es: 'Una política de IAM' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Baking your app and dependencies into a custom AMI makes new instances boot ready to serve in seconds, instead of running a long configuration script every time they launch.',
            es: 'Hornear tu app y sus dependencias en una AMI propia hace que las instancias nuevas arranquen listas para servir en segundos, en vez de ejecutar un script de configuración largo cada vez que se lanzan.',
          },
        },
      ],
    },
    {
      id: 'lambda',
      title: { en: 'Lambda & serverless', es: 'Lambda y serverless' },
      icon: '⚡',
      summary: {
        en: 'Code that runs on an event and bills by the millisecond.',
        es: 'Código que se ejecuta ante un evento y factura por milisegundo.',
      },
      concept: {
        headline: {
          en: 'Lambda runs a function in response to an event. No idle cost, no servers to patch.',
          es: 'Lambda ejecuta una función en respuesta a un evento. Sin coste en reposo y sin servidores que parchear.',
        },
        body: [
          {
            en: 'You upload a function; AWS runs it when something triggers it — an HTTP call, a file landing in S3, a message on a queue, a schedule. It scales from zero to thousands of concurrent executions on its own.',
            es: 'Subes una función y AWS la ejecuta cuando algo la dispara: una llamada HTTP, un fichero que aterriza en S3, un mensaje en una cola, una programación horaria. Escala de cero a miles de ejecuciones concurrentes por su cuenta.',
          },
          {
            en: 'The trade-offs are real: a hard timeout, no persistent local state, and a COLD START — the first invocation after idleness pays extra latency while the environment initialises.',
            es: 'Los inconvenientes son reales: un timeout estricto, sin estado local persistente y un ARRANQUE EN FRÍO: la primera invocación tras un rato inactiva paga latencia extra mientras se inicializa el entorno.',
          },
        ],
        keyPoints: [
          {
            en: 'Billed per millisecond of execution × memory configured. Idle costs nothing.',
            es: 'Se factura por milisegundo de ejecución × memoria configurada. Estar inactiva no cuesta nada.',
          },
          {
            en: 'Maximum timeout is 15 minutes. Long jobs need Step Functions, ECS or Batch.',
            es: 'El timeout máximo son 15 minutos. Los trabajos largos necesitan Step Functions, ECS o Batch.',
          },
          {
            en: 'Cold starts add latency; keep packages small and avoid heavy work at module load.',
            es: 'Los arranques en frío añaden latencia: mantén los paquetes pequeños y evita trabajo pesado al cargar el módulo.',
          },
          {
            en: 'Memory and CPU are linked — raising memory speeds the function up and can lower total cost.',
            es: 'Memoria y CPU van ligadas: subir la memoria acelera la función y puede bajar el coste total.',
          },
        ],
        example: {
          caption: {
            en: 'A function, and what triggers it',
            es: 'Una función y lo que la dispara',
          },
          code: {
            en: `export const handler = async (event) => {
  const key = event.Records[0].s3.object.key
  await makeThumbnail(key)
  return { statusCode: 200 }
}

// Trigger: any object uploaded to my-bucket/uploads/
// Scale: 1 upload or 10,000 — same code, no capacity planning`,
            es: `export const handler = async (event) => {
  const key = event.Records[0].s3.object.key
  await makeThumbnail(key)
  return { statusCode: 200 }
}

// Disparador: cualquier objeto subido a my-bucket/uploads/
// Escala: 1 subida o 10.000 — el mismo código, sin planificar capacidad`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-lam-1',
          prompt: {
            en: 'What is a Lambda "cold start"?',
            es: '¿Qué es un "arranque en frío" de Lambda?',
          },
          choices: [
            { en: 'The function failing', es: 'Que la función falle' },
            {
              en: 'Extra latency while AWS initialises a new execution environment for an idle function',
              es: 'Latencia extra mientras AWS inicializa un entorno de ejecución nuevo para una función inactiva',
            },
            { en: 'The first deployment', es: 'El primer despliegue' },
            { en: 'Running out of memory', es: 'Quedarse sin memoria' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'AWS must provision a container and load your runtime and code. It hits the first request after idleness and every new concurrent execution — which is why a traffic spike produces a burst of slow responses.',
            es: 'AWS debe aprovisionar un contenedor y cargar tu runtime y tu código. Afecta a la primera petición tras la inactividad y a cada nueva ejecución concurrente: por eso un pico de tráfico produce una ráfaga de respuestas lentas.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-lam-2',
          prompt: {
            en: 'Which workload is a BAD fit for Lambda?',
            es: '¿Qué carga de trabajo encaja MAL con Lambda?',
          },
          choices: [
            { en: 'Resizing images on upload', es: 'Redimensionar imágenes al subirlas' },
            { en: 'A nightly report generator', es: 'Un generador de informes nocturno' },
            {
              en: 'A video transcode that takes 40 minutes',
              es: 'Una transcodificación de vídeo que tarda 40 minutos',
            },
            {
              en: 'An API endpoint with spiky traffic',
              es: 'Un endpoint de API con tráfico a picos',
            },
          ],
          answerIndex: 2,
          explanation: {
            en: 'Lambda hard-stops at 15 minutes. A 40-minute job belongs on ECS/Fargate, AWS Batch, or split into steps orchestrated by Step Functions.',
            es: 'Lambda corta en seco a los 15 minutos. Un trabajo de 40 minutos va en ECS/Fargate, AWS Batch, o partido en pasos orquestados con Step Functions.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-lam-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'You can rely on files written to /tmp persisting between Lambda invocations.',
            es: 'Puedes confiar en que los ficheros escritos en /tmp persistan entre invocaciones de Lambda.',
          },
          answer: false,
          explanation: {
            en: 'A warm environment MAY be reused, so /tmp sometimes survives — which is worse than never surviving, because it works in testing and fails randomly in production. Treat every invocation as stateless; use S3 or a database.',
            es: 'Un entorno caliente PUEDE reutilizarse, así que /tmp a veces sobrevive, lo cual es peor que no sobrevivir nunca: funciona en pruebas y falla aleatoriamente en producción. Trata cada invocación como sin estado; usa S3 o una base de datos.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-lam-4',
          prompt: {
            en: 'Your Lambda is slow. You raise memory from 128MB to 1024MB and it gets cheaper. Why?',
            es: 'Tu Lambda va lenta. Subes la memoria de 128MB a 1024MB y sale más barata. ¿Por qué?',
          },
          choices: [
            { en: 'Memory is free above 512MB', es: 'La memoria es gratis por encima de 512MB' },
            {
              en: 'CPU scales with memory, so it finishes several times faster — and you are billed per millisecond',
              es: 'La CPU escala con la memoria, así que termina varias veces más rápido, y se factura por milisegundo',
            },
            { en: 'AWS gives a discount', es: 'AWS aplica un descuento' },
            { en: 'It caches better', es: 'Cachea mejor' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Cost = memory × duration. Eight times the memory with ten times the speed is a net saving. Under-provisioning memory to "save money" is one of the most common Lambda mistakes.',
            es: 'Coste = memoria × duración. Ocho veces la memoria con diez veces la velocidad sale a favor. Escatimar memoria para "ahorrar" es uno de los errores más comunes con Lambda.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-lam-5',
          prompt: {
            en: 'What is the biggest operational advantage of serverless?',
            es: '¿Cuál es la mayor ventaja operativa de serverless?',
          },
          choices: [
            { en: 'It is always cheaper', es: 'Siempre es más barato' },
            {
              en: 'No servers to patch, scale or capacity-plan — and no cost when idle',
              es: 'No hay servidores que parchear, escalar ni planificar, y no cuesta nada en reposo',
            },
            { en: 'It runs faster than EC2', es: 'Va más rápido que EC2' },
            { en: 'It has no limits', es: 'No tiene límites' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'You delete an entire category of work. Note it is NOT always cheaper: at steady high throughput, a well-utilised container fleet usually beats Lambda on price. The saving is in operations, not always in the invoice.',
            es: 'Eliminas una categoría entera de trabajo. Ojo: NO siempre es más barato; con un caudal alto y estable, una flota de contenedores bien aprovechada suele ganar a Lambda en precio. El ahorro está en la operación, no siempre en la factura.',
          },
        },
        {
          kind: 'order',
          id: 'aws-lam-6',
          prompt: {
            en: 'Order what happens on a Lambda cold start.',
            es: 'Ordena lo que ocurre en un arranque en frío de Lambda.',
          },
          items: [
            {
              en: 'AWS provisions a new execution environment',
              es: 'AWS aprovisiona un entorno de ejecución nuevo',
            },
            {
              en: 'The runtime and your deployment package are loaded',
              es: 'Se cargan el runtime y tu paquete de despliegue',
            },
            {
              en: 'Module-level initialisation code runs',
              es: 'Se ejecuta el código de inicialización a nivel de módulo',
            },
            { en: 'Your handler function is invoked', es: 'Se invoca tu función handler' },
          ],
          explanation: {
            en: 'Only the last step happens on a warm invocation. That is why heavy work — SDK clients, DB pools — belongs at module level: it is paid once per environment, not once per request.',
            es: 'En una invocación caliente solo ocurre el último paso. Por eso el trabajo pesado —clientes de SDK, pools de base de datos— va a nivel de módulo: se paga una vez por entorno, no una vez por petición.',
          },
        },
      ],
    },
    {
      id: 'containers-aws',
      title: { en: 'Containers on AWS', es: 'Contenedores en AWS' },
      icon: '🐳',
      summary: {
        en: 'ECR, ECS, Fargate and EKS — and how to choose between them.',
        es: 'ECR, ECS, Fargate y EKS, y cómo elegir entre ellos.',
      },
      concept: {
        headline: {
          en: 'Fargate is "containers without servers". EKS is Kubernetes, with everything that implies.',
          es: 'Fargate es "contenedores sin servidores". EKS es Kubernetes, con todo lo que eso implica.',
        },
        body: [
          {
            en: 'ECR stores your images. ECS is the AWS-native orchestrator: simple, deeply integrated, less to learn. EKS is managed Kubernetes: portable, enormously capable, and a genuine operational commitment.',
            es: 'ECR guarda tus imágenes. ECS es el orquestador nativo de AWS: simple, muy integrado y con menos que aprender. EKS es Kubernetes gestionado: portable, enormemente capaz y un compromiso operativo de verdad.',
          },
          {
            en: 'The orthogonal choice is where they run. EC2 launch type means you manage the instances underneath. Fargate means AWS does — you just declare CPU and memory per task.',
            es: 'La decisión ortogonal es dónde se ejecutan. El tipo de lanzamiento EC2 significa que gestionas tú las instancias de debajo. Fargate significa que lo hace AWS: tú solo declaras CPU y memoria por tarea.',
          },
        ],
        keyPoints: [
          {
            en: 'ECR = image registry. ECS/EKS = orchestrator. Fargate = the serverless way to run either.',
            es: 'ECR = registro de imágenes. ECS/EKS = orquestador. Fargate = la forma serverless de ejecutar cualquiera de los dos.',
          },
          {
            en: 'ECS + Fargate is the lowest-effort production container setup on AWS.',
            es: 'ECS + Fargate es el montaje de contenedores en producción con menos esfuerzo en AWS.',
          },
          {
            en: 'Choose EKS when you need Kubernetes portability or its ecosystem — not by default.',
            es: 'Elige EKS cuando necesites la portabilidad de Kubernetes o su ecosistema, no por defecto.',
          },
          {
            en: 'A task definition is the blueprint (image, CPU, memory, env); a service keeps N copies running.',
            es: 'Una definición de tarea es el plano (imagen, CPU, memoria, entorno); un servicio mantiene N copias en ejecución.',
          },
        ],
        example: {
          caption: { en: 'The decision, compressed', es: 'La decisión, resumida' },
          code: {
            en: `Simple app, small team, want it running today   -> ECS + Fargate
Already fluent in Kubernetes, multi-cloud goal  -> EKS
Need control of the host / GPUs / cheap Spot    -> ECS or EKS on EC2
One short job per event, no container needed    -> Lambda`,
            es: `App simple, equipo pequeño, funcionando hoy      -> ECS + Fargate
Ya dominas Kubernetes, objetivo multinube        -> EKS
Necesitas controlar el host / GPU / Spot barato  -> ECS o EKS sobre EC2
Un trabajo corto por evento, sin contenedor      -> Lambda`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-ctr-1',
          prompt: {
            en: 'What does Fargate remove from your responsibility?',
            es: '¿Qué quita Fargate de tu responsabilidad?',
          },
          choices: [
            { en: 'Writing the Dockerfile', es: 'Escribir el Dockerfile' },
            {
              en: 'Provisioning, patching and scaling the EC2 instances the containers run on',
              es: 'Aprovisionar, parchear y escalar las instancias EC2 donde corren los contenedores',
            },
            { en: 'Defining CPU and memory', es: 'Definir CPU y memoria' },
            { en: 'Building the image', es: 'Construir la imagen' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'You still build and describe your container. Fargate removes the servers underneath — no capacity planning, no host patching, no cluster of instances sitting half empty.',
            es: 'Sigues construyendo y describiendo tu contenedor. Fargate quita los servidores de debajo: sin planificar capacidad, sin parchear anfitriones y sin un clúster de instancias medio vacías.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-ctr-2',
          prompt: { en: 'What is ECR?', es: '¿Qué es ECR?' },
          choices: [
            { en: 'A container orchestrator', es: 'Un orquestador de contenedores' },
            {
              en: 'A private registry for storing Docker images',
              es: 'Un registro privado para almacenar imágenes Docker',
            },
            { en: 'A load balancer', es: 'Un balanceador de carga' },
            { en: 'A CI service', es: 'Un servicio de CI' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Elastic Container Registry is the AWS equivalent of a private Docker Hub. It integrates with IAM, so a task role can pull images without any registry credentials.',
            es: 'Elastic Container Registry es el equivalente en AWS a un Docker Hub privado. Se integra con IAM, así que un rol de tarea puede descargar imágenes sin credenciales de registro.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-ctr-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'EKS is the right default for a small team deploying their first containerised app.',
            es: 'EKS es la opción correcta por defecto para un equipo pequeño que despliega su primera app en contenedores.',
          },
          answer: false,
          explanation: {
            en: 'Kubernetes brings real power and real operational weight — upgrades, networking, RBAC, add-ons. For a small team with one app, ECS + Fargate delivers the same outcome in a fraction of the time. Choose EKS when you can name why you need it.',
            es: 'Kubernetes trae potencia real y peso operativo real: actualizaciones, red, RBAC, complementos. Para un equipo pequeño con una app, ECS + Fargate consigue el mismo resultado en una fracción del tiempo. Elige EKS cuando sepas nombrar por qué lo necesitas.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-ctr-4',
          prompt: {
            en: 'In ECS, what is the difference between a task definition and a service?',
            es: 'En ECS, ¿cuál es la diferencia entre una definición de tarea y un servicio?',
          },
          choices: [
            { en: 'They are the same', es: 'Son lo mismo' },
            {
              en: 'The task definition is the blueprint; the service keeps a desired number of tasks running and replaces failures',
              es: 'La definición de tarea es el plano; el servicio mantiene el número deseado de tareas en ejecución y sustituye las que fallan',
            },
            { en: 'A service is a container image', es: 'Un servicio es una imagen de contenedor' },
            {
              en: 'Task definitions handle load balancing',
              es: 'Las definiciones de tarea gestionan el balanceo de carga',
            },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Same relationship as an image and a deployment: the definition says WHAT to run, the service guarantees HOW MANY keep running, integrates with the load balancer, and handles rolling deploys.',
            es: 'La misma relación que entre una imagen y un despliegue: la definición dice QUÉ ejecutar, el servicio garantiza CUÁNTAS siguen ejecutándose, se integra con el balanceador y gestiona los despliegues progresivos.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-ctr-5',
          prompt: {
            en: 'When is running containers on EC2 (rather than Fargate) still the better choice?',
            es: '¿Cuándo sigue siendo mejor ejecutar contenedores sobre EC2 en vez de Fargate?',
          },
          choices: [
            { en: 'Always — it is simpler', es: 'Siempre, es más simple' },
            {
              en: 'When you need GPUs, specific host tuning, or steady load cheap enough to justify managing instances',
              es: 'Cuando necesitas GPU, ajustes específicos del anfitrión o una carga estable lo bastante barata para justificar gestionar instancias',
            },
            { en: 'When the app is small', es: 'Cuando la app es pequeña' },
            { en: 'When using ECR', es: 'Cuando usas ECR' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Fargate charges a premium for removing the servers. At high, steady utilisation — or when you need host-level control Fargate does not expose — managing your own instances (especially on Spot) wins on cost.',
            es: 'Fargate cobra un extra por quitar los servidores. Con una utilización alta y estable —o cuando necesitas control a nivel de anfitrión que Fargate no expone— gestionar tus propias instancias (sobre todo en Spot) gana en coste.',
          },
        },
      ],
    },
  ],
}
