import type { Section } from '../types'

export const fundamentals: Section = {
  id: 'aws-fundamentals',
  title: { en: 'Cloud fundamentals', es: 'Fundamentos de la nube' },
  subtitle: {
    en: 'What you are actually renting, and who is responsible when it breaks.',
    es: 'Qué estás alquilando en realidad y quién responde cuando se rompe.',
  },
  units: [
    {
      id: 'cloud-basics',
      title: { en: 'What the cloud is', es: 'Qué es la nube' },
      icon: '☁️',
      summary: {
        en: 'Regions, Availability Zones, and why "the cloud" is just very organised buildings.',
        es: 'Regiones, zonas de disponibilidad y por qué "la nube" son solo edificios muy bien organizados.',
      },
      concept: {
        headline: {
          en: 'The cloud is someone else’s computer — arranged so that losing one does not matter.',
          es: 'La nube es la computadora de otro, organizada para que perder una no importe.',
        },
        body: [
          {
            en: 'AWS operates REGIONS around the world (eu-west-1 Ireland, us-east-1 Virginia). Each region contains several AVAILABILITY ZONES: physically separate datacentres, close enough for fast networking, far enough that one flood does not take out the others.',
            es: 'AWS opera REGIONES por todo el mundo (eu-west-1 Irlanda, us-east-1 Virginia). Cada región contiene varias ZONAS DE DISPONIBILIDAD: centros de datos físicamente separados, lo bastante cerca para tener red rápida y lo bastante lejos para que una inundación no se lleve las demás.',
          },
          {
            en: 'This geography is the whole product. Deploying across two AZs means a datacentre can burn down and your app stays up. Deploying to one AZ means you have rented a single point of failure.',
            es: 'Esa geografía es todo el producto. Desplegar en dos zonas significa que un centro de datos puede arder y tu app sigue en pie. Desplegar en una sola significa que has alquilado un punto único de fallo.',
          },
        ],
        keyPoints: [
          {
            en: 'Region = geographic area. AZ = an isolated datacentre inside it. Always use at least two AZs.',
            es: 'Región = área geográfica. Zona = un centro de datos aislado dentro de ella. Usa siempre al menos dos zonas.',
          },
          {
            en: 'Choose a region for latency to users, data-residency law (GDPR), price, and service availability.',
            es: 'Elige región por latencia a los usuarios, legislación de residencia de datos (RGPD), precio y disponibilidad de servicios.',
          },
          {
            en: 'Shared responsibility: AWS secures the cloud (hardware, hypervisor). YOU secure what is in it (data, access, patches, config).',
            es: 'Responsabilidad compartida: AWS protege la nube (hardware, hipervisor). TÚ proteges lo que hay dentro (datos, accesos, parches, configuración).',
          },
          {
            en: 'Almost every large public breach on AWS is the customer’s side of that line — usually a misconfigured bucket or an over-permissive role.',
            es: 'Casi todas las grandes brechas públicas en AWS caen del lado del cliente: normalmente un bucket mal configurado o un rol con demasiados permisos.',
          },
        ],
        example: {
          caption: {
            en: 'What the names actually mean',
            es: 'Qué significan de verdad los nombres',
          },
          code: {
            en: `eu-west-1        Region  — Ireland
eu-west-1a       AZ      — one datacentre cluster in Ireland
eu-west-1b       AZ      — another, kilometres away

Multi-AZ  = survives a datacentre failure   (do this)
Multi-Region = survives a whole region failure (expensive, rarely needed)`,
            es: `eu-west-1        Región — Irlanda
eu-west-1a       Zona   — un grupo de centros de datos en Irlanda
eu-west-1b       Zona   — otro, a kilómetros de distancia

Multi-AZ     = sobrevive a la caída de un centro de datos (haz esto)
Multi-Región = sobrevive a la caída de una región entera (caro, raramente necesario)`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-cb-1',
          prompt: {
            en: 'What is an Availability Zone?',
            es: '¿Qué es una zona de disponibilidad?',
          },
          choices: [
            { en: 'A geographic region like Europe', es: 'Una región geográfica como Europa' },
            {
              en: 'One or more physically separate datacentres inside a region',
              es: 'Uno o más centros de datos físicamente separados dentro de una región',
            },
            { en: 'A type of EC2 instance', es: 'Un tipo de instancia EC2' },
            { en: 'A network security rule', es: 'Una regla de seguridad de red' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'AZs are isolated for power, cooling and networking, but connected by low-latency links. Running in two AZs is the cheapest meaningful availability upgrade you can buy.',
            es: 'Las zonas están aisladas en energía, refrigeración y red, pero conectadas por enlaces de baja latencia. Ejecutar en dos zonas es la mejora de disponibilidad significativa más barata que puedes comprar.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cb-2',
          prompt: {
            en: 'Under the shared responsibility model, who is responsible for patching the OS on your EC2 instance?',
            es: 'En el modelo de responsabilidad compartida, ¿quién es responsable de parchear el sistema operativo de tu instancia EC2?',
          },
          choices: [
            { en: 'AWS', es: 'AWS' },
            { en: 'You', es: 'Tú' },
            { en: 'Nobody', es: 'Nadie' },
            { en: 'It depends on the region', es: 'Depende de la región' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'AWS secures the physical hardware and the hypervisor. Everything from the guest operating system upwards is yours — including patches, firewall rules and your application. On Lambda, AWS takes more of that; on EC2, very little.',
            es: 'AWS protege el hardware físico y el hipervisor. Del sistema operativo invitado hacia arriba es todo tuyo: parches, reglas de firewall y tu aplicación. En Lambda AWS asume más de eso; en EC2, muy poco.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-cb-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Deploying to a single Availability Zone is fine because AWS never has outages.',
            es: 'Desplegar en una sola zona de disponibilidad está bien porque AWS nunca tiene caídas.',
          },
          answer: false,
          explanation: {
            en: 'Individual AZs do fail — power events and network partitions are documented and public. AWS designs so that AZs fail independently; taking advantage of that is your job, not theirs.',
            es: 'Las zonas individuales sí fallan: los incidentes de energía y las particiones de red están documentados y son públicos. AWS diseña para que las zonas fallen de forma independiente; aprovecharlo es tu trabajo, no el suyo.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cb-4',
          prompt: {
            en: 'Your users are all in Spain. Which region is usually the right default?',
            es: 'Todos tus usuarios están en España. ¿Qué región suele ser la opción correcta por defecto?',
          },
          choices: [
            {
              en: 'us-east-1 (Virginia) — it is the cheapest',
              es: 'us-east-1 (Virginia), que es la más barata',
            },
            {
              en: 'eu-west-1 (Ireland) or eu-south-2 (Spain) — lowest latency and EU data residency',
              es: 'eu-west-1 (Irlanda) o eu-south-2 (España): menor latencia y residencia de datos en la UE',
            },
            { en: 'ap-southeast-1 (Singapore)', es: 'ap-southeast-1 (Singapur)' },
            { en: 'It makes no difference', es: 'Da igual' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A round trip to Virginia is roughly 90ms; to Ireland it is around 30ms. On top of latency, GDPR often makes keeping personal data inside the EU a legal requirement, not a preference.',
            es: 'Un ida y vuelta a Virginia son unos 90ms; a Irlanda, unos 30ms. Además de la latencia, el RGPD convierte a menudo el mantener los datos personales dentro de la UE en un requisito legal, no en una preferencia.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cb-5',
          prompt: {
            en: 'Why is us-east-1 special?',
            es: '¿Por qué us-east-1 es especial?',
          },
          choices: [
            { en: 'It is the fastest region', es: 'Es la región más rápida' },
            {
              en: 'It is the oldest and largest — some global services are anchored there, so its outages have unusually wide impact',
              es: 'Es la más antigua y grande: algunos servicios globales están anclados ahí, así que sus caídas tienen un impacto inusualmente amplio',
            },
            { en: 'It is the only region with S3', es: 'Es la única región con S3' },
            { en: 'It is free', es: 'Es gratis' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Several global control planes (parts of IAM, CloudFront config, Route 53) live there. It is also where new services launch first. The practical consequence: a us-east-1 incident can affect people who never deployed anything there.',
            es: 'Varios planos de control globales (partes de IAM, la configuración de CloudFront, Route 53) viven ahí. Además es donde se lanzan primero los servicios nuevos. La consecuencia práctica: un incidente en us-east-1 puede afectar a gente que nunca desplegó nada allí.',
          },
        },
      ],
    },
    {
      id: 'iam',
      title: { en: 'IAM', es: 'IAM' },
      icon: '🔑',
      summary: {
        en: 'Who can do what. The single most important service to get right.',
        es: 'Quién puede hacer qué. El servicio más importante que hay que acertar.',
      },
      concept: {
        headline: {
          en: 'Use roles, not keys. A role hands out temporary credentials that rotate themselves.',
          es: 'Usa roles, no claves. Un rol entrega credenciales temporales que se rotan solas.',
        },
        body: [
          {
            en: 'IAM controls every action in your account. A POLICY is a JSON document listing allowed or denied actions on resources. A USER is a human identity; a ROLE is an identity that services (or people) temporarily assume.',
            es: 'IAM controla cada acción de tu cuenta. Una POLÍTICA es un documento JSON que lista acciones permitidas o denegadas sobre recursos. Un USUARIO es una identidad humana; un ROL es una identidad que los servicios (o las personas) asumen temporalmente.',
          },
          {
            en: 'The rule that prevents most incidents: applications running on AWS should get permissions through a role attached to the compute, never through an access key pasted into code or config.',
            es: 'La regla que evita la mayoría de incidentes: las aplicaciones que corren en AWS deben obtener permisos mediante un rol asociado al cómputo, nunca mediante una clave de acceso pegada en el código o la configuración.',
          },
        ],
        keyPoints: [
          {
            en: 'Role = temporary, auto-rotating credentials. Access key = permanent, leakable, forever.',
            es: 'Rol = credenciales temporales que se rotan solas. Clave de acceso = permanente, filtrable y para siempre.',
          },
          {
            en: 'Least privilege: grant the specific actions on the specific resources, not `"Action": "*"`.',
            es: 'Mínimo privilegio: concede las acciones concretas sobre los recursos concretos, no `"Action": "*"`.',
          },
          {
            en: 'An explicit Deny always beats an Allow.',
            es: 'Un Deny explícito siempre gana a un Allow.',
          },
          {
            en: 'Enable MFA on the root account, then lock it away and never use it for daily work.',
            es: 'Activa MFA en la cuenta root, guárdala bajo llave y no la uses nunca para el trabajo diario.',
          },
        ],
        example: {
          caption: { en: 'A least-privilege policy', es: 'Una política de mínimo privilegio' },
          code: {
            en: `{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "arn:aws:s3:::my-app-uploads/*"
}

// Not this:
{ "Effect": "Allow", "Action": "*", "Resource": "*" }`,
            es: `{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "arn:aws:s3:::my-app-uploads/*"
}

// Esto no:
{ "Effect": "Allow", "Action": "*", "Resource": "*" }`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-iam-1',
          prompt: {
            en: 'Your Lambda needs to read from an S3 bucket. What is the correct way to grant access?',
            es: 'Tu Lambda necesita leer de un bucket de S3. ¿Cuál es la forma correcta de darle acceso?',
          },
          choices: [
            {
              en: 'Hardcode access keys in the code',
              es: 'Poner las claves de acceso a fuego en el código',
            },
            {
              en: 'Store access keys in an environment variable',
              es: 'Guardar las claves en una variable de entorno',
            },
            {
              en: 'Attach an execution role to the Lambda',
              es: 'Asociar un rol de ejecución a la Lambda',
            },
            { en: 'Make the bucket public', es: 'Hacer público el bucket' },
          ],
          answerIndex: 2,
          explanation: {
            en: 'Roles hand out temporary credentials that AWS rotates automatically. A hardcoded key lives forever, ends up in git, and gets scraped from public repositories within minutes of being pushed.',
            es: 'Los roles entregan credenciales temporales que AWS rota automáticamente. Una clave escrita a fuego vive para siempre, acaba en git y la rastrean de repositorios públicos a los pocos minutos de subirla.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-iam-2',
          prompt: {
            en: 'A policy has an Allow for `s3:*` and a Deny for `s3:DeleteObject`. What can the user do?',
            es: 'Una política tiene un Allow para `s3:*` y un Deny para `s3:DeleteObject`. ¿Qué puede hacer el usuario?',
          },
          choices: [
            { en: 'Everything including delete', es: 'Todo, incluido borrar' },
            { en: 'Everything in S3 except delete', es: 'Todo en S3 excepto borrar' },
            { en: 'Nothing', es: 'Nada' },
            { en: 'It is an invalid policy', es: 'Es una política inválida' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'An explicit Deny always wins, regardless of order or how many Allows exist. This is what makes organisation-wide guardrails ("nobody may disable CloudTrail") actually enforceable.',
            es: 'Un Deny explícito siempre gana, sin importar el orden ni cuántos Allow haya. Eso es lo que hace realmente exigibles las barreras de toda la organización ("nadie puede desactivar CloudTrail").',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-iam-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'You should use the root account for day-to-day administration.',
            es: 'Deberías usar la cuenta root para la administración del día a día.',
          },
          answer: false,
          explanation: {
            en: 'Root can do absolutely anything, including closing the account, and its permissions cannot be restricted. Enable MFA, create an admin IAM user or SSO identity for real work, and touch root only for the handful of tasks that require it.',
            es: 'Root puede hacer absolutamente cualquier cosa, incluido cerrar la cuenta, y sus permisos no se pueden restringir. Activa MFA, crea un usuario IAM administrador o una identidad SSO para el trabajo real y toca root solo para el puñado de tareas que lo exigen.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-iam-4',
          prompt: {
            en: 'What is the difference between an IAM user and an IAM role?',
            es: '¿Cuál es la diferencia entre un usuario IAM y un rol IAM?',
          },
          choices: [
            { en: 'Nothing', es: 'Ninguna' },
            {
              en: 'A user is a permanent identity with long-lived credentials; a role is assumed temporarily and issues short-lived credentials',
              es: 'Un usuario es una identidad permanente con credenciales de larga vida; un rol se asume temporalmente y emite credenciales de corta vida',
            },
            { en: 'Roles are only for humans', es: 'Los roles son solo para personas' },
            { en: 'Users cannot have policies', es: 'Los usuarios no pueden tener políticas' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Roles are the modern default for both services and people (via SSO). Because credentials expire in hours, a leaked one is a limited window rather than a permanent backdoor.',
            es: 'Los roles son la opción moderna por defecto tanto para servicios como para personas (vía SSO). Como las credenciales caducan en horas, una filtrada es una ventana limitada y no una puerta trasera permanente.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-iam-5',
          prompt: {
            en: 'What does "least privilege" mean in practice when you are unsure what a service needs?',
            es: '¿Qué significa "mínimo privilegio" en la práctica cuando no sabes qué necesita un servicio?',
          },
          choices: [
            { en: 'Grant `*` and narrow it later', es: 'Conceder `*` y acotarlo después' },
            {
              en: 'Start with nothing, run it, and add the specific actions the errors ask for',
              es: 'Empezar sin nada, ejecutarlo y añadir las acciones concretas que pidan los errores',
            },
            { en: 'Copy a policy from a blog post', es: 'Copiar una política de un blog' },
            { en: 'Use the root account', es: 'Usar la cuenta root' },
          ],
          answerIndex: 1,
          explanation: {
            en: '"Grant broad and tighten later" never gets tightened — it becomes production. Starting closed and opening precisely what fails takes an extra hour, and is the difference between a contained incident and a full account compromise.',
            es: '"Concede amplio y acota luego" nunca se acota: se convierte en producción. Empezar cerrado y abrir exactamente lo que falla cuesta una hora más, y es la diferencia entre un incidente contenido y el compromiso de toda la cuenta.',
          },
        },
        {
          kind: 'gap',
          id: 'aws-iam-6',
          prompt: {
            en: 'Complete the policy so it grants the minimum needed to read one bucket.',
            es: 'Completa la política para que conceda lo mínimo necesario para leer un bucket.',
          },
          code: `{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "___"
}`,
          choices: ['arn:aws:s3:::my-app-uploads/*', '*', 'arn:aws:s3:::*', 's3:*'],
          answerIndex: 0,
          explanation: {
            en: 'Scope the resource to the specific bucket and key prefix. `*` grants access to every bucket in the account — the difference between a contained incident and a full data breach.',
            es: 'Acota el recurso al bucket y prefijo concretos. `*` da acceso a todos los buckets de la cuenta: la diferencia entre un incidente contenido y una brecha de datos completa.',
          },
        },
      ],
    },
    {
      id: 'cost',
      title: { en: 'The cost model', es: 'El modelo de costes' },
      icon: '💰',
      summary: {
        en: 'Pay per use — and the four bills that surprise everyone.',
        es: 'Pago por uso, y las cuatro facturas que sorprenden a todo el mundo.',
      },
      concept: {
        headline: {
          en: 'You pay for what you allocate, not for what you use.',
          es: 'Pagas por lo que reservas, no por lo que usas.',
        },
        body: [
          {
            en: 'This is the mental shift. A stopped EC2 instance still bills for its disk. An unattached Elastic IP bills for existing. An idle RDS instance bills 24/7 whether or not a single query runs.',
            es: 'Este es el cambio mental. Una instancia EC2 parada sigue facturando su disco. Una IP elástica sin asociar factura por existir. Una instancia RDS ociosa factura 24/7 se ejecute o no una sola consulta.',
          },
          {
            en: 'The other trap is data transfer. Traffic INTO AWS is generally free; traffic OUT to the internet is charged per gigabyte, and it is where surprise five-figure bills come from.',
            es: 'La otra trampa es la transferencia de datos. El tráfico HACIA AWS suele ser gratis; el tráfico HACIA FUERA, a internet, se cobra por gigabyte, y de ahí salen las facturas sorpresa de cinco cifras.',
          },
        ],
        keyPoints: [
          {
            en: 'Ingress (data in) is usually free. Egress (data out to the internet) is not.',
            es: 'La entrada de datos suele ser gratis. La salida a internet no.',
          },
          {
            en: 'Stopped EC2 = no compute charge, but the EBS volume still bills.',
            es: 'EC2 parada = sin cargo de cómputo, pero el volumen EBS sigue facturando.',
          },
          {
            en: 'NAT Gateways charge per hour AND per gigabyte processed — a classic silent cost.',
            es: 'Los NAT Gateway cobran por hora Y por gigabyte procesado: un coste silencioso clásico.',
          },
          {
            en: 'Set a billing alarm on day one. Every single time.',
            es: 'Pon una alarma de facturación el primer día. Siempre, sin excepción.',
          },
        ],
        example: {
          caption: {
            en: 'Where the surprise bills come from',
            es: 'De dónde salen las facturas sorpresa',
          },
          code: {
            en: `EC2 stopped, 100GB EBS volume    ~$8/month  for a machine you are not using
Elastic IP, unattached           ~$4/month  for an address doing nothing
NAT Gateway                      ~$35/month + $0.045 per GB processed
Egress to internet               ~$0.09 per GB — 10TB = ~$900`,
            es: `EC2 parada, volumen EBS de 100GB  ~8 $/mes  por una máquina que no usas
IP elástica sin asociar           ~4 $/mes  por una dirección que no hace nada
NAT Gateway                       ~35 $/mes + 0,045 $ por GB procesado
Salida a internet                 ~0,09 $ por GB — 10TB = ~900 $`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-cost-1',
          prompt: {
            en: 'Your EC2 instance is stopped. What are you still paying for?',
            es: 'Tu instancia EC2 está parada. ¿Qué sigues pagando?',
          },
          choices: [
            { en: 'Nothing', es: 'Nada' },
            { en: 'The attached EBS volume', es: 'El volumen EBS asociado' },
            { en: 'CPU hours', es: 'Horas de CPU' },
            { en: 'Only the Elastic IP', es: 'Solo la IP elástica' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Stopping frees the compute, but the disk keeps existing — and keeps billing. It is the number one surprise on a first AWS invoice, especially with forgotten volumes from deleted experiments.',
            es: 'Parar libera el cómputo, pero el disco sigue existiendo y sigue facturando. Es la sorpresa número uno de la primera factura de AWS, sobre todo con volúmenes olvidados de experimentos borrados.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cost-2',
          prompt: {
            en: 'Which direction of data transfer is typically charged?',
            es: '¿Qué dirección de la transferencia de datos se suele cobrar?',
          },
          choices: [
            { en: 'Into AWS from the internet', es: 'Hacia AWS desde internet' },
            { en: 'Out of AWS to the internet', es: 'Desde AWS hacia internet' },
            { en: 'Both equally', es: 'Ambas por igual' },
            { en: 'Neither', es: 'Ninguna' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Ingress is free — AWS wants your data in. Egress is billed per GB, which is why a viral video served straight from S3 without CloudFront can produce an eye-watering invoice.',
            es: 'La entrada es gratis: AWS quiere tus datos dentro. La salida se factura por GB, y por eso un vídeo viral servido directamente desde S3 sin CloudFront puede producir una factura escalofriante.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-cost-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'The AWS free tier means you cannot be charged during your first year.',
            es: 'La capa gratuita de AWS significa que no te pueden cobrar durante el primer año.',
          },
          answer: false,
          explanation: {
            en: 'The free tier covers specific services up to specific limits. Exceed 750 hours, launch a larger instance type, or use a service outside the tier and you are billed normally. A billing alarm is not optional.',
            es: 'La capa gratuita cubre servicios concretos hasta límites concretos. Supera las 750 horas, lanza un tipo de instancia mayor o usa un servicio fuera de la capa y te facturan con normalidad. Una alarma de facturación no es opcional.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cost-4',
          prompt: {
            en: 'For a workload running 24/7 for the next year, what usually cuts the bill most?',
            es: 'Para una carga que corre 24/7 durante el próximo año, ¿qué suele reducir más la factura?',
          },
          choices: [
            {
              en: 'Savings Plans or Reserved Instances — committing to usage for a 1-3 year discount',
              es: 'Savings Plans o instancias reservadas: comprometer uso a cambio de un descuento de 1 a 3 años',
            },
            { en: 'A bigger instance', es: 'Una instancia más grande' },
            { en: 'Running in us-east-1', es: 'Ejecutar en us-east-1' },
            { en: 'Turning off logging', es: 'Desactivar los logs' },
          ],
          answerIndex: 0,
          explanation: {
            en: 'Committing to a level of spend for one or three years typically saves 30-70% versus on-demand. It is the single biggest lever for steady workloads — and it is purely a billing change, no architecture work.',
            es: 'Comprometer un nivel de gasto durante uno o tres años suele ahorrar entre un 30% y un 70% frente al pago por demanda. Es la mayor palanca para cargas estables, y es puramente un cambio de facturación, sin trabajo de arquitectura.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cost-5',
          prompt: {
            en: 'What is the FIRST thing to set up in a brand new AWS account?',
            es: '¿Qué es lo PRIMERO que hay que configurar en una cuenta de AWS recién creada?',
          },
          choices: [
            { en: 'A VPC', es: 'Una VPC' },
            { en: 'MFA on root and a billing alarm', es: 'MFA en root y una alarma de facturación' },
            { en: 'An EC2 instance', es: 'Una instancia EC2' },
            { en: 'A domain name', es: 'Un nombre de dominio' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Those two cover the two ways a new account goes badly wrong: someone else getting in, and a runaway resource nobody noticed. Both take five minutes and cost nothing.',
            es: 'Esas dos cosas cubren las dos formas en que una cuenta nueva se tuerce: que entre otra persona y que un recurso descontrolado pase desapercibido. Ambas llevan cinco minutos y no cuestan nada.',
          },
        },
      ],
    },
  ],
}
