import type { Section } from '../types'

export const architecture: Section = {
  id: 'aws-architecture',
  title: { en: 'Gluing a real system together', es: 'Pegar un sistema real' },
  subtitle: {
    en: 'Events, APIs, observability, and reading an architecture diagram.',
    es: 'Eventos, APIs, observabilidad y saber leer un diagrama de arquitectura.',
  },
  units: [
    {
      id: 'messaging',
      title: { en: 'Messaging & events', es: 'Mensajería y eventos' },
      icon: '📨',
      summary: {
        en: 'SQS, SNS and EventBridge — how services talk without depending on each other.',
        es: 'SQS, SNS y EventBridge: cómo hablan los servicios sin depender unos de otros.',
      },
      concept: {
        headline: {
          en: 'A queue turns "my caller must wait and must not fail" into "I will get to it".',
          es: 'Una cola convierte "quien me llama debe esperar y no puede fallar" en "ya me ocuparé".',
        },
        body: [
          {
            en: 'SQS is a queue: one message, one consumer, processed when ready. SNS is publish/subscribe: one message fanned out to many subscribers. EventBridge is a router that filters events by content and sends them to the right targets.',
            es: 'SQS es una cola: un mensaje, un consumidor, procesado cuando toque. SNS es publicación y suscripción: un mensaje repartido a muchos suscriptores. EventBridge es un enrutador que filtra eventos por contenido y los manda a los destinos correctos.',
          },
          {
            en: 'They all buy the same thing: the producer stops caring whether the consumer is up, fast, or even deployed yet.',
            es: 'Los tres compran lo mismo: al productor deja de importarle si el consumidor está levantado, si es rápido o si siquiera está desplegado.',
          },
        ],
        keyPoints: [
          {
            en: 'SQS = queue, one consumer per message, retries built in. SNS = fan-out to many. EventBridge = rules-based routing.',
            es: 'SQS = cola, un consumidor por mensaje, con reintentos incluidos. SNS = reparto a muchos. EventBridge = enrutado por reglas.',
          },
          {
            en: 'Standard SQS is at-least-once delivery — so consumers must be idempotent.',
            es: 'SQS estándar entrega al menos una vez, así que los consumidores deben ser idempotentes.',
          },
          {
            en: 'A dead-letter queue captures messages that keep failing, so one poison message cannot block the queue forever.',
            es: 'Una cola de mensajes fallidos recoge los que fallan una y otra vez, para que un mensaje envenenado no bloquee la cola para siempre.',
          },
          {
            en: 'Queues absorb spikes: 10,000 orders in a second become a backlog, not an outage.',
            es: 'Las colas absorben picos: 10.000 pedidos en un segundo se convierten en cola pendiente, no en una caída.',
          },
        ],
        example: {
          caption: { en: 'Decoupling a checkout', es: 'Desacoplar un proceso de pago' },
          code: {
            en: `Checkout API -> SQS -> Worker (Lambda or ECS)
                       |
                       └-> DLQ after 3 failed attempts

The API responds in 50ms. The email provider being down
delays receipts — it does not block revenue.`,
            es: `API de pago -> SQS -> Worker (Lambda o ECS)
                      |
                      └-> DLQ tras 3 intentos fallidos

La API responde en 50ms. Que se caiga el proveedor de correo
retrasa los recibos, no bloquea los ingresos.`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-msg-1',
          prompt: {
            en: 'What is the difference between SQS and SNS?',
            es: '¿Cuál es la diferencia entre SQS y SNS?',
          },
          choices: [
            { en: 'None', es: 'Ninguna' },
            {
              en: 'SQS delivers a message to one consumer that pulls it; SNS pushes each message to all subscribers',
              es: 'SQS entrega un mensaje a un consumidor que lo recoge; SNS empuja cada mensaje a todos los suscriptores',
            },
            { en: 'SNS is for databases', es: 'SNS es para bases de datos' },
            { en: 'SQS cannot retry', es: 'SQS no puede reintentar' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Queue versus broadcast. Use SQS for work that one worker should do once; use SNS when several independent systems each need to know that something happened.',
            es: 'Cola frente a difusión. Usa SQS para trabajo que un worker debe hacer una vez; usa SNS cuando varios sistemas independientes necesitan enterarse de que algo ha pasado.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-msg-2',
          prompt: {
            en: 'Why must an SQS consumer be idempotent?',
            es: '¿Por qué un consumidor de SQS debe ser idempotente?',
          },
          choices: [
            { en: 'To improve performance', es: 'Para mejorar el rendimiento' },
            {
              en: 'Standard queues guarantee at-least-once delivery, so the same message can arrive twice',
              es: 'Las colas estándar garantizan entrega al menos una vez, así que el mismo mensaje puede llegar dos veces',
            },
            { en: 'To reduce cost', es: 'Para reducir costes' },
            { en: 'AWS requires it', es: 'Lo exige AWS' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'If a consumer processes a message but dies before deleting it, the message reappears. Without idempotency that means a duplicate charge or a duplicate email — the same lesson as retrying an HTTP request.',
            es: 'Si un consumidor procesa un mensaje pero muere antes de borrarlo, el mensaje reaparece. Sin idempotencia eso significa un cobro duplicado o un correo duplicado: la misma lección que al reintentar una petición HTTP.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-msg-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A dead-letter queue is where messages go when the queue is full.',
            es: 'Una cola de mensajes fallidos es a donde van los mensajes cuando la cola está llena.',
          },
          answer: false,
          explanation: {
            en: 'A DLQ collects messages that failed processing repeatedly. Without one, a single malformed message is retried forever, blocking or endlessly re-consuming — the DLQ sets it aside so the rest of the queue keeps flowing.',
            es: 'Una DLQ recoge los mensajes que fallaron al procesarse repetidamente. Sin ella, un único mensaje malformado se reintenta eternamente, bloqueando o reconsumiendo sin fin: la DLQ lo aparta para que el resto de la cola siga fluyendo.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-msg-4',
          prompt: {
            en: 'What does EventBridge add over SNS?',
            es: '¿Qué añade EventBridge frente a SNS?',
          },
          choices: [
            { en: 'Higher throughput', es: 'Mayor caudal' },
            {
              en: 'Content-based routing rules, plus events from AWS services and SaaS partners',
              es: 'Reglas de enrutado por contenido, más eventos de servicios de AWS y socios SaaS',
            },
            { en: 'Guaranteed ordering', es: 'Orden garantizado' },
            { en: 'Lower cost always', es: 'Menor coste siempre' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'You write a rule like "orders where amount > 1000 go to the fraud checker". SNS fans out to everyone and lets subscribers filter; EventBridge does the routing centrally and speaks natively to AWS service events.',
            es: 'Escribes una regla como "los pedidos de importe mayor que 1000 van al verificador de fraude". SNS reparte a todos y deja que filtren los suscriptores; EventBridge hace el enrutado de forma centralizada y habla de forma nativa con los eventos de los servicios de AWS.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-msg-5',
          prompt: {
            en: 'A flash sale sends 50,000 orders in one minute. How does a queue help?',
            es: 'Una venta flash genera 50.000 pedidos en un minuto. ¿Cómo ayuda una cola?',
          },
          choices: [
            { en: 'It rejects the extra orders', es: 'Rechaza los pedidos sobrantes' },
            {
              en: 'It absorbs the spike as a backlog while workers process at a sustainable rate',
              es: 'Absorbe el pico como cola pendiente mientras los workers procesan a un ritmo sostenible',
            },
            { en: 'It makes the database faster', es: 'Hace más rápida la base de datos' },
            { en: 'It caches responses', es: 'Cachea las respuestas' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Without a queue, that burst hits the database directly and everything falls over. With one, orders are accepted instantly and drained at whatever rate the system can sustain — slower, but nothing is lost.',
            es: 'Sin cola, esa ráfaga golpea directamente la base de datos y todo se cae. Con ella, los pedidos se aceptan al instante y se drenan al ritmo que el sistema aguante: más lento, pero no se pierde nada.',
          },
        },
        {
          kind: 'gap',
          id: 'aws-msg-6',
          prompt: {
            en: 'Complete the setting that stops one poison message blocking a queue forever.',
            es: 'Completa el ajuste que impide que un mensaje envenenado bloquee una cola para siempre.',
          },
          code: `Queue: orders
  maxReceiveCount: 3
  ___: orders-dlq`,
          choices: ['deadLetterTargetArn', 'visibilityTimeout', 'retentionPeriod', 'delaySeconds'],
          answerIndex: 0,
          explanation: {
            en: 'After three failed attempts the message is moved to the dead-letter queue instead of being retried indefinitely. You then inspect the DLQ to see what broke, while the main queue keeps flowing.',
            es: 'Tras tres intentos fallidos el mensaje se mueve a la cola de mensajes fallidos en vez de reintentarse indefinidamente. Luego inspeccionas la DLQ para ver qué se rompió, mientras la cola principal sigue fluyendo.',
          },
        },
      ],
    },
    {
      id: 'api-gateway',
      title: { en: 'API Gateway + Lambda', es: 'API Gateway + Lambda' },
      icon: '🚪',
      summary: {
        en: 'A production API with no servers to manage.',
        es: 'Una API de producción sin servidores que gestionar.',
      },
      concept: {
        headline: {
          en: 'API Gateway is the front door: routing, auth, throttling and TLS before your code runs.',
          es: 'API Gateway es la puerta de entrada: enrutado, autenticación, limitación y TLS antes de que corra tu código.',
        },
        body: [
          {
            en: 'It receives HTTP requests, validates and authorises them, and invokes a Lambda (or forwards to another backend). Everything that is not your business logic happens before your function is ever called.',
            es: 'Recibe peticiones HTTP, las valida y autoriza, e invoca una Lambda (o las reenvía a otro backend). Todo lo que no es tu lógica de negocio ocurre antes de que se llame siquiera a tu función.',
          },
          {
            en: 'The combination scales from zero to thousands of requests per second with no capacity planning — and costs nothing when nobody is using it.',
            es: 'La combinación escala de cero a miles de peticiones por segundo sin planificar capacidad, y no cuesta nada cuando nadie la usa.',
          },
        ],
        keyPoints: [
          {
            en: 'Throttling and usage plans protect your backend from abuse and runaway clients.',
            es: 'La limitación y los planes de uso protegen tu backend del abuso y de clientes descontrolados.',
          },
          {
            en: 'Authorizers (Cognito, JWT, or a Lambda) reject unauthorised calls before your code runs.',
            es: 'Los autorizadores (Cognito, JWT o una Lambda) rechazan las llamadas no autorizadas antes de que corra tu código.',
          },
          {
            en: 'HTTP APIs are cheaper and faster than REST APIs; REST APIs have more features.',
            es: 'Las HTTP API son más baratas y rápidas que las REST API; las REST API tienen más funciones.',
          },
          {
            en: 'Watch for the double cold start: gateway plus Lambda initialisation on the first call.',
            es: 'Ojo al doble arranque en frío: la inicialización del gateway más la de la Lambda en la primera llamada.',
          },
        ],
        example: {
          caption: {
            en: 'A serverless endpoint, end to end',
            es: 'Un endpoint serverless de principio a fin',
          },
          code: {
            en: `Client
  -> CloudFront (TLS, cache)
  -> API Gateway (authorizer, throttle 1000 rps)
  -> Lambda (your handler)
  -> DynamoDB

No servers. No patching. $0 when idle.`,
            es: `Cliente
  -> CloudFront (TLS, caché)
  -> API Gateway (autorizador, límite 1000 rps)
  -> Lambda (tu handler)
  -> DynamoDB

Sin servidores. Sin parches. 0 $ en reposo.`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-apigw-1',
          prompt: {
            en: 'What does an API Gateway authorizer do?',
            es: '¿Qué hace un autorizador de API Gateway?',
          },
          choices: [
            { en: 'Encrypts the response', es: 'Cifra la respuesta' },
            {
              en: 'Validates identity and rejects unauthorised requests before your Lambda is invoked',
              es: 'Valida la identidad y rechaza las peticiones no autorizadas antes de invocar tu Lambda',
            },
            { en: 'Caches responses', es: 'Cachea respuestas' },
            { en: 'Load balances between regions', es: 'Balancea la carga entre regiones' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Auth happens at the edge of your system, so unauthorised traffic never reaches — or bills — your function. It also means every endpoint gets the same auth logic instead of each one reimplementing it.',
            es: 'La autenticación ocurre en el borde de tu sistema, así que el tráfico no autorizado nunca llega a tu función ni la factura. Además hace que todos los endpoints compartan la misma lógica en vez de reimplementarla cada uno.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-apigw-2',
          prompt: {
            en: 'Why configure throttling on an API Gateway?',
            es: '¿Por qué configurar limitación en un API Gateway?',
          },
          choices: [
            { en: 'To reduce latency', es: 'Para reducir la latencia' },
            {
              en: 'To cap the request rate so a buggy client or attack cannot overwhelm the backend or the bill',
              es: 'Para limitar el ritmo de peticiones y que un cliente con bugs o un ataque no desborde el backend ni la factura',
            },
            { en: 'It is required for HTTPS', es: 'Es obligatorio para HTTPS' },
            { en: 'To enable caching', es: 'Para habilitar la caché' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Serverless scales automatically — including scaling your invoice. A client stuck in a retry loop can invoke a Lambda millions of times overnight. Throttling is as much a cost control as a stability control.',
            es: 'Serverless escala automáticamente, incluida tu factura. Un cliente atrapado en un bucle de reintentos puede invocar una Lambda millones de veces en una noche. La limitación es tanto un control de coste como de estabilidad.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-apigw-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A serverless API has no limits because it scales automatically.',
            es: 'Una API serverless no tiene límites porque escala automáticamente.',
          },
          answer: false,
          explanation: {
            en: 'There is an account-level concurrency limit, per-function limits, gateway throttles, and downstream limits — a Lambda scaling to 1,000 concurrent executions can exhaust your database connection pool instantly.',
            es: 'Hay un límite de concurrencia a nivel de cuenta, límites por función, limitaciones del gateway y límites aguas abajo: una Lambda que escale a 1.000 ejecuciones concurrentes puede agotar al instante el pool de conexiones de tu base de datos.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-apigw-4',
          prompt: {
            en: 'When would you choose an Application Load Balancer over API Gateway?',
            es: '¿Cuándo elegirías un Application Load Balancer en vez de API Gateway?',
          },
          choices: [
            { en: 'Never', es: 'Nunca' },
            {
              en: 'For containers or EC2 backends with steady high traffic — ALB is cheaper per request and adds less latency',
              es: 'Para backends en contenedores o EC2 con tráfico alto y estable: el ALB es más barato por petición y añade menos latencia',
            },
            { en: 'When you need authentication', es: 'Cuando necesitas autenticación' },
            { en: 'For static files', es: 'Para ficheros estáticos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'API Gateway bills per request and brings API features you may not need. At millions of requests against a container fleet, an ALB is substantially cheaper and simpler.',
            es: 'API Gateway factura por petición y trae funciones de API que quizá no necesites. Con millones de peticiones contra una flota de contenedores, un ALB es bastante más barato y simple.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-apigw-5',
          prompt: {
            en: 'A Lambda behind API Gateway scales to 1,000 concurrent executions and your RDS database falls over. Why?',
            es: 'Una Lambda tras API Gateway escala a 1.000 ejecuciones concurrentes y tu base de datos RDS se cae. ¿Por qué?',
          },
          choices: [
            { en: 'Lambda is too fast', es: 'Lambda es demasiado rápida' },
            {
              en: 'Each execution opens its own database connection, exhausting the connection limit',
              es: 'Cada ejecución abre su propia conexión a la base de datos, agotando el límite de conexiones',
            },
            { en: 'API Gateway caches wrongly', es: 'API Gateway cachea mal' },
            { en: 'The database region is wrong', es: 'La región de la base de datos es incorrecta' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A traditional server holds a small pool of reused connections. A thousand independent Lambdas each want their own. RDS Proxy exists precisely to pool connections in front of the database and solve this.',
            es: 'Un servidor tradicional mantiene un pool pequeño de conexiones reutilizadas. Mil Lambdas independientes quieren cada una la suya. RDS Proxy existe precisamente para agrupar conexiones delante de la base de datos y resolver esto.',
          },
        },
      ],
    },
    {
      id: 'cloudwatch',
      title: { en: 'CloudWatch & X-Ray', es: 'CloudWatch y X-Ray' },
      icon: '📈',
      summary: {
        en: 'Seeing what your system is doing, and finding where the time went.',
        es: 'Ver qué hace tu sistema y encontrar a dónde se fue el tiempo.',
      },
      concept: {
        headline: {
          en: 'If it is not in CloudWatch, it did not happen — as far as you can prove.',
          es: 'Si no está en CloudWatch, no ocurrió; al menos no puedes demostrarlo.',
        },
        body: [
          {
            en: 'CloudWatch collects logs, metrics and alarms across every AWS service. Logs Insights queries them; alarms notify or trigger auto-scaling. X-Ray traces one request across services to show where the latency actually is.',
            es: 'CloudWatch recoge logs, métricas y alarmas de todos los servicios de AWS. Logs Insights los consulta; las alarmas notifican o disparan el autoescalado. X-Ray traza una petición entre servicios para mostrar dónde está realmente la latencia.',
          },
          {
            en: 'The discipline is the same as anywhere: structured logs, alerts on user-facing symptoms, and a retention policy so you are not paying to store noise forever.',
            es: 'La disciplina es la misma que en cualquier sitio: logs estructurados, alertas sobre síntomas que nota el usuario y una política de retención para no pagar por guardar ruido eternamente.',
          },
        ],
        keyPoints: [
          {
            en: 'Log groups have no expiry by default — set retention or pay indefinitely.',
            es: 'Los grupos de logs no caducan por defecto: pon retención o paga indefinidamente.',
          },
          {
            en: 'Alarms can notify (SNS) or act (scale out, reboot, run a Lambda).',
            es: 'Las alarmas pueden notificar (SNS) o actuar (escalar, reiniciar, ejecutar una Lambda).',
          },
          {
            en: 'Logs Insights lets you query logs with a real query language, not grep.',
            es: 'Logs Insights te permite consultar los logs con un lenguaje de consulta de verdad, no con grep.',
          },
          {
            en: 'X-Ray shows the waterfall across Lambda, API Gateway and downstream calls.',
            es: 'X-Ray muestra la cascada entre Lambda, API Gateway y las llamadas aguas abajo.',
          },
        ],
        example: {
          caption: {
            en: 'Finding slow requests in Logs Insights',
            es: 'Encontrar peticiones lentas en Logs Insights',
          },
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
          prompt: {
            en: 'What is the default retention for a CloudWatch log group?',
            es: '¿Cuál es la retención por defecto de un grupo de logs de CloudWatch?',
          },
          choices: [
            { en: '7 days', es: '7 días' },
            { en: '30 days', es: '30 días' },
            {
              en: 'Never expires — you pay to store it forever until you set a policy',
              es: 'No caduca nunca: pagas por guardarlo para siempre hasta que pongas una política',
            },
            { en: '24 hours', es: '24 horas' },
          ],
          answerIndex: 2,
          explanation: {
            en: 'Logs accumulate indefinitely by default. Setting retention on every log group is one of the highest-value five-minute cost optimisations in any AWS account.',
            es: 'Los logs se acumulan indefinidamente por defecto. Poner retención en cada grupo de logs es una de las optimizaciones de coste de cinco minutos más valiosas de cualquier cuenta de AWS.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cw-2',
          prompt: {
            en: 'What does X-Ray show that CloudWatch Logs cannot?',
            es: '¿Qué muestra X-Ray que CloudWatch Logs no puede?',
          },
          choices: [
            { en: 'Error messages', es: 'Mensajes de error' },
            {
              en: 'A single request’s timeline across every service it touched, with time spent in each',
              es: 'La línea temporal de una sola petición por cada servicio que tocó, con el tiempo en cada uno',
            },
            { en: 'CPU usage', es: 'El uso de CPU' },
            { en: 'Billing data', es: 'Datos de facturación' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Logs from six services are six disconnected streams. A trace stitches them into one waterfall, so "the endpoint takes 3 seconds" becomes "2.6 of those seconds are one DynamoDB call".',
            es: 'Los logs de seis servicios son seis flujos desconectados. Una traza los cose en una sola cascada, así "el endpoint tarda 3 segundos" se convierte en "2,6 de esos segundos son una llamada a DynamoDB".',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-cw-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A CloudWatch alarm can only send a notification.',
            es: 'Una alarma de CloudWatch solo puede enviar una notificación.',
          },
          answer: false,
          explanation: {
            en: 'Alarms can trigger actions: scale an Auto Scaling Group out, stop or reboot an instance, or invoke a Lambda. That is what makes metric-driven auto-scaling work without any human involved.',
            es: 'Las alarmas pueden disparar acciones: escalar un Auto Scaling Group, parar o reiniciar una instancia o invocar una Lambda. Eso es lo que hace funcionar el autoescalado por métricas sin que intervenga nadie.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cw-4',
          prompt: {
            en: 'Which is the better CloudWatch alarm for a customer-facing API?',
            es: '¿Qué alarma de CloudWatch es mejor para una API de cara al cliente?',
          },
          choices: [
            {
              en: 'Lambda invocation count above 1000',
              es: 'Número de invocaciones de Lambda por encima de 1000',
            },
            {
              en: 'p99 latency above 2 seconds, or 5xx rate above 1%',
              es: 'Latencia p99 por encima de 2 segundos, o tasa de 5xx por encima del 1%',
            },
            { en: 'Log volume above 1GB', es: 'Volumen de logs por encima de 1GB' },
            { en: 'Memory above 50%', es: 'Memoria por encima del 50%' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Alert on what users feel. A high invocation count might be a successful marketing campaign; a rising 5xx rate is always a problem worth waking someone for.',
            es: 'Alerta sobre lo que nota el usuario. Un número alto de invocaciones puede ser una campaña de marketing exitosa; una tasa de 5xx creciente siempre es un problema por el que merece la pena despertar a alguien.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cw-5',
          prompt: {
            en: 'Why log in JSON rather than plain text on AWS?',
            es: '¿Por qué registrar en JSON en vez de texto plano en AWS?',
          },
          choices: [
            { en: 'It is smaller', es: 'Ocupa menos' },
            {
              en: 'Logs Insights can filter and aggregate on individual fields instead of matching substrings',
              es: 'Logs Insights puede filtrar y agregar por campos concretos en vez de buscar subcadenas',
            },
            { en: 'It is required by Lambda', es: 'Lo exige Lambda' },
            { en: 'It is easier to read', es: 'Es más fácil de leer' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Structured fields turn logs into a queryable dataset: filter by userId, average durationMs, group by route. Free-text logs force you into fragile substring matching that breaks whenever the message wording changes.',
            es: 'Los campos estructurados convierten los logs en un conjunto de datos consultable: filtrar por userId, promediar durationMs, agrupar por ruta. Los logs de texto libre te obligan a buscar subcadenas de forma frágil, que se rompe en cuanto cambia la redacción del mensaje.',
          },
        },
      ],
    },
    {
      id: 'well-architected',
      title: { en: 'Well-Architected', es: 'Well-Architected' },
      icon: '🏛️',
      summary: {
        en: 'The six pillars, and reading a real architecture end to end.',
        es: 'Los seis pilares y saber leer una arquitectura real de principio a fin.',
      },
      concept: {
        headline: {
          en: 'Every architecture decision is a trade between six competing pillars.',
          es: 'Cada decisión de arquitectura es un compromiso entre seis pilares que compiten.',
        },
        body: [
          {
            en: 'AWS’s Well-Architected Framework names them: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimisation, and Sustainability. Nothing maximises all six — the value is making the trade consciously.',
            es: 'El marco Well-Architected de AWS los nombra: excelencia operativa, seguridad, fiabilidad, eficiencia del rendimiento, optimización de costes y sostenibilidad. Nada maximiza los seis: el valor está en hacer el compromiso conscientemente.',
          },
          {
            en: 'A multi-region active-active deployment scores brilliantly on reliability and terribly on cost and operational complexity. That is a legitimate choice for a payments platform and a terrible one for an internal dashboard.',
            es: 'Un despliegue activo-activo multirregión puntúa brillantemente en fiabilidad y fatal en coste y complejidad operativa. Es una elección legítima para una plataforma de pagos y pésima para un panel interno.',
          },
        ],
        keyPoints: [
          {
            en: 'Reliability: design for failure. Everything fails, all the time — plan for it.',
            es: 'Fiabilidad: diseña para el fallo. Todo falla, todo el tiempo: cuenta con ello.',
          },
          {
            en: 'Security: least privilege, encryption at rest and in transit, auditability.',
            es: 'Seguridad: mínimo privilegio, cifrado en reposo y en tránsito, y capacidad de auditoría.',
          },
          {
            en: 'Cost: the cheapest architecture is usually the one you did not over-build.',
            es: 'Coste: la arquitectura más barata suele ser la que no sobredimensionaste.',
          },
          {
            en: 'Operational excellence: infrastructure as code, so environments are reproducible.',
            es: 'Excelencia operativa: infraestructura como código, para que los entornos sean reproducibles.',
          },
        ],
        example: {
          caption: {
            en: 'A production three-tier web app on AWS',
            es: 'Una app web de tres capas en producción sobre AWS',
          },
          code: {
            en: `Route 53  -> CloudFront -> ALB (public subnets, 2 AZs)
                             -> ECS Fargate (private subnets, 2 AZs)
                                  ├-> Aurora Postgres (private, Multi-AZ)
                                  ├-> ElastiCache Redis (sessions, cache)
                                  └-> SQS -> Lambda workers (email, PDFs)

Logs/metrics -> CloudWatch    Secrets -> Secrets Manager
Everything defined in Terraform or CDK.`,
            es: `Route 53  -> CloudFront -> ALB (subredes públicas, 2 zonas)
                             -> ECS Fargate (subredes privadas, 2 zonas)
                                  ├-> Aurora Postgres (privada, Multi-AZ)
                                  ├-> ElastiCache Redis (sesiones, caché)
                                  └-> SQS -> workers Lambda (correo, PDFs)

Logs y métricas -> CloudWatch   Secretos -> Secrets Manager
Todo definido en Terraform o CDK.`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-wa-1',
          prompt: {
            en: 'Which is NOT one of the Well-Architected pillars?',
            es: '¿Cuál NO es uno de los pilares de Well-Architected?',
          },
          choices: [
            { en: 'Security', es: 'Seguridad' },
            { en: 'Reliability', es: 'Fiabilidad' },
            { en: 'Popularity', es: 'Popularidad' },
            { en: 'Cost Optimisation', es: 'Optimización de costes' },
          ],
          answerIndex: 2,
          explanation: {
            en: 'The six are Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimisation and Sustainability. They are deliberately in tension — a review is about naming which ones you chose to sacrifice.',
            es: 'Los seis son excelencia operativa, seguridad, fiabilidad, eficiencia del rendimiento, optimización de costes y sostenibilidad. Están en tensión a propósito: una revisión consiste en nombrar cuáles decidiste sacrificar.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-wa-2',
          prompt: {
            en: 'Why define infrastructure as code (Terraform, CDK, CloudFormation)?',
            es: '¿Por qué definir la infraestructura como código (Terraform, CDK, CloudFormation)?',
          },
          choices: [
            {
              en: 'It is faster to click in the console',
              es: 'Es más rápido hacer clic en la consola',
            },
            {
              en: 'Environments become reproducible, reviewable and versioned — and recreatable after a disaster',
              es: 'Los entornos pasan a ser reproducibles, revisables y versionados, y se pueden recrear tras un desastre',
            },
            { en: 'AWS charges less for it', es: 'AWS cobra menos por ello' },
            { en: 'It improves latency', es: 'Mejora la latencia' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Console changes exist only in one person’s memory. IaC makes infrastructure reviewable in a pull request, identical across staging and production, and rebuildable from scratch in a new region.',
            es: 'Los cambios por consola existen solo en la memoria de una persona. La infraestructura como código la hace revisable en un pull request, idéntica entre staging y producción, y reconstruible desde cero en una región nueva.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-wa-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A multi-region active-active architecture is the right goal for most applications.',
            es: 'Una arquitectura activo-activo multirregión es el objetivo correcto para la mayoría de aplicaciones.',
          },
          answer: false,
          explanation: {
            en: 'It multiplies cost, and forces you to solve data replication and conflict resolution — genuinely hard problems. Multi-AZ within one region already survives a datacentre failure and covers the vast majority of real requirements.',
            es: 'Multiplica el coste y te obliga a resolver la replicación de datos y los conflictos, problemas genuinamente difíciles. Multi-AZ dentro de una región ya sobrevive a la caída de un centro de datos y cubre la inmensa mayoría de los requisitos reales.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-wa-4',
          prompt: {
            en: 'Where should an application’s database credentials live?',
            es: '¿Dónde deben vivir las credenciales de base de datos de una aplicación?',
          },
          choices: [
            { en: 'In the source code', es: 'En el código fuente' },
            {
              en: 'In Secrets Manager or Parameter Store, fetched at runtime via an IAM role',
              es: 'En Secrets Manager o Parameter Store, obtenidas en ejecución mediante un rol de IAM',
            },
            { en: 'In a public S3 bucket', es: 'En un bucket público de S3' },
            { en: 'In the AMI', es: 'En la AMI' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Secrets Manager supports automatic rotation and full audit logging, and access is granted through the same IAM role the compute already has. Nothing sensitive ever enters the repository or the image.',
            es: 'Secrets Manager admite rotación automática y registro completo de auditoría, y el acceso se concede mediante el mismo rol de IAM que ya tiene el cómputo. Nada sensible entra nunca en el repositorio ni en la imagen.',
          },
        },
        {
          kind: 'order',
          id: 'aws-wa-5',
          prompt: {
            en: 'A request hits the three-tier architecture. Put the hops in order.',
            es: 'Una petición llega a la arquitectura de tres capas. Ordena los saltos.',
          },
          items: [
            { en: 'Route 53 resolves the domain', es: 'Route 53 resuelve el dominio' },
            {
              en: 'CloudFront serves from cache or forwards to the origin',
              es: 'CloudFront sirve desde caché o reenvía al origen',
            },
            {
              en: 'The Application Load Balancer picks a healthy task',
              es: 'El Application Load Balancer elige una tarea sana',
            },
            {
              en: 'An ECS Fargate task runs the application code',
              es: 'Una tarea de ECS Fargate ejecuta el código de la aplicación',
            },
            { en: 'Aurora returns the data', es: 'Aurora devuelve los datos' },
          ],
          explanation: {
            en: 'Each layer has one job and can fail independently: DNS resolves, the CDN absorbs load, the load balancer routes around unhealthy tasks, the app computes, the database persists.',
            es: 'Cada capa tiene un trabajo y puede fallar de forma independiente: el DNS resuelve, el CDN absorbe carga, el balanceador esquiva las tareas enfermas, la app calcula y la base de datos persiste.',
          },
        },
      ],
    },
  ],
}
