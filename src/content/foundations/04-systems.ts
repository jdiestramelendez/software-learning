import type { Section } from '../types'

export const systems: Section = {
  id: 'systems',
  title: { en: 'The web and its systems', es: 'La web y sus sistemas' },
  subtitle: {
    en: 'What actually happens between a click and a response.',
    es: 'Lo que pasa de verdad entre un clic y una respuesta.',
  },
  units: [
    {
      id: 'http',
      title: { en: 'HTTP & the web', es: 'HTTP y la web' },
      icon: '🌐',
      summary: {
        en: 'The protocol every web app speaks, and the codes it answers with.',
        es: 'El protocolo que habla toda app web y los códigos con los que responde.',
      },
      concept: {
        headline: {
          en: 'HTTP is a stateless request/response conversation.',
          es: 'HTTP es una conversación de petición y respuesta sin estado.',
        },
        body: [
          {
            en: 'Every request stands alone: the server remembers nothing between them. That is why cookies and tokens exist — they carry identity that the protocol itself does not keep.',
            es: 'Cada petición va por su cuenta: el servidor no recuerda nada entre una y otra. Por eso existen las cookies y los tokens: llevan la identidad que el protocolo no guarda.',
          },
          {
            en: 'A request is a method, a path, headers and an optional body. A response is a status code, headers and a body. Everything on the web is built on that.',
            es: 'Una petición es un método, una ruta, cabeceras y un cuerpo opcional. Una respuesta es un código de estado, cabeceras y un cuerpo. Toda la web se construye sobre eso.',
          },
        ],
        keyPoints: [
          {
            en: '2xx worked · 3xx go elsewhere · 4xx you made a mistake · 5xx the server made a mistake.',
            es: '2xx funcionó · 3xx ve a otro sitio · 4xx te equivocaste tú · 5xx se equivocó el servidor.',
          },
          {
            en: 'GET reads and must be safe. POST creates. PUT replaces. PATCH updates part. DELETE removes.',
            es: 'GET lee y debe ser seguro. POST crea. PUT reemplaza. PATCH actualiza una parte. DELETE elimina.',
          },
          {
            en: '401 means "who are you?" · 403 means "I know who you are, and no".',
            es: '401 significa "¿quién eres?" · 403 significa "sé quién eres, y no".',
          },
          {
            en: 'CORS is enforced by the BROWSER, not the server — it protects users from other sites using their cookies.',
            es: 'CORS lo aplica el NAVEGADOR, no el servidor: protege a los usuarios de que otros sitios usen sus cookies.',
          },
        ],
        example: {
          caption: { en: 'A request and its response', es: 'Una petición y su respuesta' },
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
          prompt: {
            en: 'Which status code means "you are authenticated, but not allowed"?',
            es: '¿Qué código de estado significa "estás autenticado, pero no tienes permiso"?',
          },
          choices: ['400', '401', '403', '404'],
          answerIndex: 2,
          explanation: {
            en: '401 Unauthorized actually means unauthenticated — "I do not know who you are". 403 Forbidden means "I do know, and you still cannot do this". Logging in again fixes a 401, never a 403.',
            es: '401 Unauthorized en realidad significa no autenticado: "no sé quién eres". 403 Forbidden significa "sí lo sé, y aun así no puedes hacer esto". Volver a iniciar sesión arregla un 401, nunca un 403.',
          },
        },
        {
          kind: 'choice',
          id: 'http-2',
          prompt: {
            en: 'Why should a GET request never change data?',
            es: '¿Por qué una petición GET nunca debe cambiar datos?',
          },
          choices: [
            { en: 'It is slower', es: 'Es más lenta' },
            {
              en: 'Browsers, proxies and crawlers freely repeat and prefetch GETs',
              es: 'Navegadores, proxies y rastreadores repiten y precargan los GET libremente',
            },
            { en: 'GET has no body', es: 'GET no tiene cuerpo' },
            { en: 'It is a lint rule', es: 'Es una regla del linter' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Anything can replay a GET — a prefetcher, a cache, a crawler, the back button. Sites that used `GET /delete?id=5` have had their entire database wiped by a well-behaved search engine crawler.',
            es: 'Cualquier cosa puede repetir un GET: un precargador, una caché, un rastreador, el botón atrás. Sitios que usaban `GET /delete?id=5` han visto su base de datos entera borrada por el rastreador educadísimo de un buscador.',
          },
        },
        {
          kind: 'boolean',
          id: 'http-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A CORS error means the server blocked your request.',
            es: 'Un error de CORS significa que el servidor bloqueó tu petición.',
          },
          answer: false,
          explanation: {
            en: 'The server usually received and answered the request perfectly. The BROWSER then refused to hand the response to your JavaScript because the required headers were missing. CORS protects users, not servers — and cannot be fixed from the frontend.',
            es: 'El servidor normalmente recibió y respondió la petición perfectamente. Es el NAVEGADOR el que luego se niega a entregar la respuesta a tu JavaScript porque faltaban las cabeceras necesarias. CORS protege a los usuarios, no a los servidores, y no se arregla desde el frontend.',
          },
        },
        {
          kind: 'choice',
          id: 'http-4',
          prompt: {
            en: 'What does "HTTP is stateless" mean?',
            es: '¿Qué significa que "HTTP no tiene estado"?',
          },
          choices: [
            { en: 'It cannot send data', es: 'No puede enviar datos' },
            {
              en: 'The server keeps no memory of previous requests from the same client',
              es: 'El servidor no guarda memoria de peticiones anteriores del mismo cliente',
            },
            { en: 'It has no headers', es: 'No tiene cabeceras' },
            { en: 'It only works with static files', es: 'Solo funciona con ficheros estáticos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Each request must carry everything needed to serve it. That is why your session cookie or bearer token rides along on every single call — and why servers can be scaled horizontally so easily.',
            es: 'Cada petición debe llevar todo lo necesario para atenderla. Por eso tu cookie de sesión o tu token viaja en cada llamada, y por eso los servidores escalan horizontalmente con tanta facilidad.',
          },
        },
        {
          kind: 'order',
          id: 'http-5',
          prompt: {
            en: 'Put the steps in order for what happens when you type a URL and press Enter.',
            es: 'Ordena lo que pasa cuando escribes una URL y pulsas Enter.',
          },
          items: [
            {
              en: 'DNS resolves the domain to an IP address',
              es: 'DNS resuelve el dominio a una dirección IP',
            },
            { en: 'A TCP connection is opened to that IP', es: 'Se abre una conexión TCP a esa IP' },
            {
              en: 'TLS negotiates the encrypted channel for HTTPS',
              es: 'TLS negocia el canal cifrado para HTTPS',
            },
            { en: 'The HTTP request is sent', es: 'Se envía la petición HTTP' },
            {
              en: 'The browser renders the response and requests linked assets',
              es: 'El navegador renderiza la respuesta y pide los recursos enlazados',
            },
          ],
          explanation: {
            en: 'Every step is a potential failure point and a potential latency win — which is why DNS caching, connection reuse and TLS session resumption all exist.',
            es: 'Cada paso es un punto de fallo potencial y una posible mejora de latencia: por eso existen la caché de DNS, la reutilización de conexiones y la reanudación de sesión TLS.',
          },
        },
      ],
    },
    {
      id: 'api-design',
      title: { en: 'API design', es: 'Diseño de APIs' },
      icon: '🔌',
      summary: {
        en: 'Designing an interface other people can use without asking you.',
        es: 'Diseñar una interfaz que otros puedan usar sin preguntarte.',
      },
      concept: {
        headline: {
          en: 'An API is a contract. Breaking it breaks other people’s software.',
          es: 'Una API es un contrato. Romperlo rompe el software de otras personas.',
        },
        body: [
          {
            en: 'REST models your system as resources with predictable URLs and standard verbs. The value is not purity — it is that a developer can guess the next endpoint correctly.',
            es: 'REST modela tu sistema como recursos con URLs predecibles y verbos estándar. El valor no es la pureza: es que alguien pueda adivinar correctamente el siguiente endpoint.',
          },
          {
            en: 'The hardest part is not the first version. It is changing it later without breaking every client that already depends on it.',
            es: 'Lo difícil no es la primera versión. Es cambiarla más tarde sin romper a todos los clientes que ya dependen de ella.',
          },
        ],
        keyPoints: [
          {
            en: 'Nouns in URLs, verbs as HTTP methods: `POST /orders`, not `/createOrder`.',
            es: 'Sustantivos en las URLs, verbos como métodos HTTP: `POST /orders`, no `/createOrder`.',
          },
          {
            en: 'Idempotent means calling twice has the same effect as once. Critical for retries.',
            es: 'Idempotente significa que llamar dos veces tiene el mismo efecto que una. Crítico para los reintentos.',
          },
          {
            en: 'Never return an unbounded list. Paginate from day one.',
            es: 'Nunca devuelvas una lista sin límite. Pagina desde el primer día.',
          },
          {
            en: 'Adding a field is safe. Removing or renaming one is a breaking change — version it.',
            es: 'Añadir un campo es seguro. Quitarlo o renombrarlo rompe el contrato: versiónalo.',
          },
        ],
        example: {
          caption: { en: 'Resource-shaped endpoints', es: 'Endpoints con forma de recurso' },
          code: {
            en: `GET    /orders?limit=20&cursor=abc   list, paginated
POST   /orders                       create
GET    /orders/42                    read one
PATCH  /orders/42                    partial update
DELETE /orders/42                    remove`,
            es: `GET    /orders?limit=20&cursor=abc   listar, paginado
POST   /orders                       crear
GET    /orders/42                    leer uno
PATCH  /orders/42                    actualización parcial
DELETE /orders/42                    eliminar`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'api-1',
          prompt: {
            en: 'Which endpoint follows REST conventions best?',
            es: '¿Qué endpoint sigue mejor las convenciones REST?',
          },
          choices: ['POST /createNewUser', 'GET /users/delete/42', 'POST /users', 'POST /api/doUserStuff'],
          answerIndex: 2,
          explanation: {
            en: 'The resource is the noun (`/users`) and the action is the HTTP method. Once a developer knows that, they can guess `GET /users/42` without reading a line of documentation.',
            es: 'El recurso es el sustantivo (`/users`) y la acción es el método HTTP. En cuanto alguien lo sabe, puede adivinar `GET /users/42` sin leer una línea de documentación.',
          },
        },
        {
          kind: 'choice',
          id: 'api-2',
          prompt: {
            en: 'Why does idempotency matter for a payment endpoint?',
            es: '¿Por qué importa la idempotencia en un endpoint de pago?',
          },
          choices: [
            { en: 'It makes it faster', es: 'Lo hace más rápido' },
            {
              en: 'A network timeout may cause a retry — without it, the customer is charged twice',
              es: 'Un timeout de red puede provocar un reintento: sin ella, se cobra dos veces al cliente',
            },
            { en: 'It reduces payload size', es: 'Reduce el tamaño de la respuesta' },
            { en: 'It is required by REST', es: 'Lo exige REST' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The client cannot tell "request lost" from "response lost", so it retries. An idempotency key lets the server recognise the repeat and return the original result instead of charging again.',
            es: 'El cliente no distingue "se perdió la petición" de "se perdió la respuesta", así que reintenta. Una clave de idempotencia permite al servidor reconocer la repetición y devolver el resultado original en vez de volver a cobrar.',
          },
        },
        {
          kind: 'boolean',
          id: 'api-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Adding a new optional field to an API response is a breaking change.',
            es: 'Añadir un campo opcional nuevo a la respuesta de una API rompe el contrato.',
          },
          answer: false,
          explanation: {
            en: 'Well-behaved clients ignore fields they do not know. Removing a field, renaming one, or changing its type IS breaking — those need a new version or a deprecation window.',
            es: 'Los clientes bien hechos ignoran los campos que no conocen. Quitar un campo, renombrarlo o cambiar su tipo SÍ rompe: eso necesita una versión nueva o un periodo de obsolescencia.',
          },
        },
        {
          kind: 'choice',
          id: 'api-4',
          prompt: {
            en: 'What problem does GraphQL solve that REST struggles with?',
            es: '¿Qué problema resuelve GraphQL que a REST le cuesta?',
          },
          choices: [
            { en: 'It is always faster', es: 'Siempre es más rápido' },
            {
              en: 'Clients fetch exactly the fields they need in one round trip, avoiding over- and under-fetching',
              es: 'El cliente pide exactamente los campos que necesita en un solo viaje, evitando pedir de más o de menos',
            },
            { en: 'It removes the need for a database', es: 'Elimina la necesidad de base de datos' },
            { en: 'It has better security', es: 'Tiene mejor seguridad' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A mobile screen needing 3 fields from 4 resources makes 4 REST calls and downloads far more than it uses. GraphQL trades that for one query — at the cost of harder caching and more server complexity.',
            es: 'Una pantalla móvil que necesita 3 campos de 4 recursos hace 4 llamadas REST y descarga mucho más de lo que usa. GraphQL lo cambia por una sola consulta, a costa de una caché más difícil y más complejidad en el servidor.',
          },
        },
        {
          kind: 'choice',
          id: 'api-5',
          prompt: {
            en: 'Why is offset pagination (`?page=50`) problematic on large, changing datasets?',
            es: '¿Por qué la paginación por offset (`?page=50`) es problemática en conjuntos grandes que cambian?',
          },
          choices: [
            { en: 'It is not valid HTTP', es: 'No es HTTP válido' },
            {
              en: 'The database still scans all skipped rows, and inserts shift items between pages',
              es: 'La base de datos recorre igualmente las filas saltadas, y las inserciones desplazan elementos entre páginas',
            },
            { en: 'It cannot be cached', es: 'No se puede cachear' },
            { en: 'It only works with SQL', es: 'Solo funciona con SQL' },
          ],
          answerIndex: 1,
          explanation: {
            en: '`OFFSET 100000` makes the database walk 100,000 rows to discard them. Worse, a new row inserted at the top shifts everything, so the user sees an item twice or misses one. Cursor pagination avoids both.',
            es: '`OFFSET 100000` obliga a la base de datos a recorrer 100.000 filas para descartarlas. Peor aún: una fila nueva insertada arriba desplaza todo, así que el usuario ve un elemento dos veces o se salta otro. La paginación por cursor evita ambas cosas.',
          },
        },
      ],
    },
    {
      id: 'databases',
      title: { en: 'Databases', es: 'Bases de datos' },
      icon: '🗄️',
      summary: {
        en: 'Where your data lives, and why the query is slow.',
        es: 'Dónde viven tus datos y por qué la consulta va lenta.',
      },
      concept: {
        headline: {
          en: 'An index is a shortcut, not more memory.',
          es: 'Un índice es un atajo, no más memoria.',
        },
        body: [
          {
            en: 'Without an index, finding a row means reading every row — a full table scan. An index is a sorted structure that turns that scan into a handful of steps, the same way a book index beats reading every page.',
            es: 'Sin índice, encontrar una fila significa leer todas las filas: un recorrido completo de la tabla. Un índice es una estructura ordenada que convierte ese recorrido en un puñado de pasos, igual que el índice de un libro gana a leer todas las páginas.',
          },
          {
            en: 'Indexes are not free: they take space and slow down writes, because every insert must update them too. Index what you filter and join on, not everything.',
            es: 'Los índices no son gratis: ocupan espacio y ralentizan las escrituras, porque cada inserción también debe actualizarlos. Indexa aquello por lo que filtras y unes, no todo.',
          },
        ],
        keyPoints: [
          {
            en: 'SQL: structured, relational, strong consistency, flexible queries. NoSQL: flexible shape, scales horizontally, query patterns fixed up front.',
            es: 'SQL: estructurado, relacional, consistencia fuerte, consultas flexibles. NoSQL: forma flexible, escala horizontalmente, patrones de consulta fijados de antemano.',
          },
          {
            en: 'Index the columns in your WHERE, JOIN and ORDER BY clauses.',
            es: 'Indexa las columnas de tus cláusulas WHERE, JOIN y ORDER BY.',
          },
          {
            en: 'The N+1 problem: one query for a list, then one more per item. It is the most common ORM performance bug.',
            es: 'El problema N+1: una consulta para la lista y una más por cada elemento. Es el bug de rendimiento más común de los ORM.',
          },
          {
            en: 'Use EXPLAIN to see what the database actually does before optimising.',
            es: 'Usa EXPLAIN para ver qué hace realmente la base de datos antes de optimizar.',
          },
        ],
        example: {
          caption: { en: 'The N+1 query problem', es: 'El problema de consultas N+1' },
          code: {
            en: `// 1 + N queries — 101 round trips for 100 orders
const orders = await db.orders.findAll()
for (const o of orders) o.user = await db.users.find(o.userId)

// 2 queries, regardless of size
const orders = await db.orders.findAll({ include: 'user' })`,
            es: `// 1 + N consultas — 101 viajes para 100 pedidos
const orders = await db.orders.findAll()
for (const o of orders) o.user = await db.users.find(o.userId)

// 2 consultas, sin importar el tamaño
const orders = await db.orders.findAll({ include: 'user' })`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'db-1',
          prompt: {
            en: 'A `WHERE email = ?` query on a 2M-row table takes 4 seconds. What is most likely missing?',
            es: 'Una consulta `WHERE email = ?` sobre una tabla de 2M de filas tarda 4 segundos. ¿Qué falta probablemente?',
          },
          choices: [
            { en: 'More RAM', es: 'Más RAM' },
            { en: 'An index on email', es: 'Un índice en email' },
            { en: 'A faster CPU', es: 'Una CPU más rápida' },
            { en: 'Table normalization', es: 'Normalizar la tabla' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Without an index the database performs a full table scan — 2 million row reads. An index turns it into a tree lookup: roughly 21 steps instead of 2,000,000.',
            es: 'Sin índice la base de datos hace un recorrido completo: 2 millones de lecturas de fila. Un índice lo convierte en una búsqueda en árbol: unos 21 pasos en vez de 2.000.000.',
          },
        },
        {
          kind: 'choice',
          id: 'db-2',
          prompt: {
            en: 'Why not add an index to every column?',
            es: '¿Por qué no poner un índice en cada columna?',
          },
          choices: [
            { en: 'Databases limit you to 5', es: 'Las bases de datos te limitan a 5' },
            {
              en: 'Every index consumes storage and slows down every insert, update and delete',
              es: 'Cada índice consume espacio y ralentiza cada inserción, actualización y borrado',
            },
            { en: 'Indexes break joins', es: 'Los índices rompen los joins' },
            { en: 'It makes SELECT slower', es: 'Hace más lento el SELECT' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Each write must update every index on the table. On a write-heavy table, over-indexing can cost more than the reads it saves — indexes are a trade, not free speed.',
            es: 'Cada escritura debe actualizar todos los índices de la tabla. En una tabla con muchas escrituras, sobreindexar puede costar más de lo que ahorra en lecturas: los índices son un trato, no velocidad gratis.',
          },
        },
        {
          kind: 'choice',
          id: 'db-3',
          prompt: {
            en: 'Your page makes 101 database queries to show 100 orders with their users. What is this called?',
            es: 'Tu página hace 101 consultas para mostrar 100 pedidos con sus usuarios. ¿Cómo se llama esto?',
          },
          choices: [
            { en: 'A deadlock', es: 'Un interbloqueo' },
            { en: 'The N+1 query problem', es: 'El problema de consultas N+1' },
            { en: 'A full table scan', es: 'Un recorrido completo de tabla' },
            { en: 'A cache miss', es: 'Un fallo de caché' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'One query for the list plus one per row. It looks fine with 10 test records and collapses at 10,000. The fix is a join or an eager-loading option — one query for the list, one for all related rows.',
            es: 'Una consulta para la lista más una por fila. Parece correcto con 10 registros de prueba y se derrumba con 10.000. La solución es un join o una opción de carga anticipada: una consulta para la lista y otra para todas las filas relacionadas.',
          },
        },
        {
          kind: 'boolean',
          id: 'db-4',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'NoSQL databases are always faster than SQL databases.',
            es: 'Las bases de datos NoSQL siempre son más rápidas que las SQL.',
          },
          answer: false,
          explanation: {
            en: 'They are faster for the access patterns they were designed around, and can be dramatically worse for others — an unplanned query on DynamoDB may mean scanning the whole table. "NoSQL is fast" really means "NoSQL makes you decide your queries up front".',
            es: 'Son más rápidas para los patrones de acceso para los que se diseñaron y pueden ser muchísimo peores para otros: una consulta no prevista en DynamoDB puede significar recorrer la tabla entera. "NoSQL es rápido" en realidad significa "NoSQL te obliga a decidir tus consultas por adelantado".',
          },
        },
        {
          kind: 'choice',
          id: 'db-5',
          prompt: {
            en: 'What does `EXPLAIN` in front of a query tell you?',
            es: '¿Qué te dice `EXPLAIN` delante de una consulta?',
          },
          choices: [
            { en: 'How long the query took', es: 'Cuánto tardó la consulta' },
            {
              en: 'The execution plan — whether it uses an index or scans the table',
              es: 'El plan de ejecución: si usa un índice o recorre la tabla',
            },
            { en: 'The SQL syntax errors', es: 'Los errores de sintaxis SQL' },
            { en: 'Which user ran it', es: 'Qué usuario la ejecutó' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It shows the plan the optimiser chose: index scan or sequential scan, join order, estimated rows. It is how you tell whether the index you added is actually being used — often it is not.',
            es: 'Muestra el plan que eligió el optimizador: recorrido por índice o secuencial, orden de los joins, filas estimadas. Es como compruebas si el índice que añadiste se está usando de verdad; a menudo no lo está.',
          },
        },
        {
          kind: 'gap',
          id: 'db-6',
          prompt: {
            en: 'Complete the statement that fixes a slow `WHERE email = ?` lookup.',
            es: 'Completa la sentencia que arregla una búsqueda lenta `WHERE email = ?`.',
          },
          code: `___ idx_users_email ON users (email);`,
          choices: ['CREATE INDEX', 'ALTER TABLE', 'CREATE VIEW', 'ANALYZE TABLE'],
          answerIndex: 0,
          explanation: {
            en: 'The index gives the planner a sorted structure to search instead of reading all rows. Confirm it is actually used afterwards with EXPLAIN — adding an index does not guarantee the optimiser picks it.',
            es: 'El índice da al planificador una estructura ordenada donde buscar en vez de leer todas las filas. Confirma después con EXPLAIN que se usa de verdad: añadir un índice no garantiza que el optimizador lo elija.',
          },
        },
      ],
    },
    {
      id: 'transactions',
      title: { en: 'Transactions & consistency', es: 'Transacciones y consistencia' },
      icon: '🔐',
      summary: {
        en: 'Keeping data correct when many things happen at once.',
        es: 'Mantener los datos correctos cuando pasan muchas cosas a la vez.',
      },
      concept: {
        headline: {
          en: 'A transaction turns several operations into one all-or-nothing step.',
          es: 'Una transacción convierte varias operaciones en un único paso de todo o nada.',
        },
        body: [
          {
            en: 'Transferring money is two operations: debit one account, credit another. If the system dies between them, money vanishes. A transaction guarantees that either both happen or neither does.',
            es: 'Transferir dinero son dos operaciones: cargar en una cuenta y abonar en otra. Si el sistema muere entre ambas, el dinero desaparece. Una transacción garantiza que o pasan las dos o no pasa ninguna.',
          },
          {
            en: 'The classic properties are ACID: Atomicity, Consistency, Isolation, Durability. Isolation is the subtle one — it decides what concurrent transactions can see of each other.',
            es: 'Las propiedades clásicas son ACID: atomicidad, consistencia, aislamiento y durabilidad. El aislamiento es el sutil: decide qué pueden ver unas transacciones concurrentes de las otras.',
          },
        ],
        keyPoints: [
          {
            en: 'Atomic: all or nothing. Durable: once committed, it survives a crash.',
            es: 'Atómica: todo o nada. Duradera: una vez confirmada, sobrevive a una caída.',
          },
          {
            en: 'A race condition is two operations interleaving in an order you did not anticipate.',
            es: 'Una condición de carrera es que dos operaciones se entrelacen en un orden que no previste.',
          },
          {
            en: 'Read-modify-write is unsafe under concurrency. Use an atomic update or a version check.',
            es: 'Leer-modificar-escribir no es seguro con concurrencia. Usa una actualización atómica o una comprobación de versión.',
          },
          {
            en: 'Optimistic locking: assume no conflict, check a version on write. Pessimistic: lock the row up front.',
            es: 'Bloqueo optimista: asume que no habrá conflicto y comprueba una versión al escribir. Pesimista: bloquea la fila desde el principio.',
          },
        ],
        example: {
          caption: { en: 'A race condition, and the fix', es: 'Una condición de carrera y su solución' },
          code: {
            en: `// Unsafe: two requests can both read 10 and both write 9
const stock = await db.read(id)
await db.write(id, stock - 1)

// Safe: the database does the arithmetic atomically
await db.query(
  'UPDATE items SET stock = stock - 1 WHERE id = ? AND stock > 0'
)`,
            es: `// Inseguro: dos peticiones pueden leer 10 y escribir 9 las dos
const stock = await db.read(id)
await db.write(id, stock - 1)

// Seguro: la base de datos hace la aritmética de forma atómica
await db.query(
  'UPDATE items SET stock = stock - 1 WHERE id = ? AND stock > 0'
)`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'tx-1',
          prompt: {
            en: 'What does the "A" in ACID guarantee?',
            es: '¿Qué garantiza la "A" de ACID?',
          },
          choices: [
            { en: 'The data is available', es: 'Que los datos están disponibles' },
            {
              en: 'All operations in the transaction succeed, or none of them do',
              es: 'Que todas las operaciones de la transacción tienen éxito, o ninguna',
            },
            { en: 'Access is controlled', es: 'Que el acceso está controlado' },
            { en: 'Queries are asynchronous', es: 'Que las consultas son asíncronas' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Atomicity. A transfer that debits one account and dies before crediting the other is rolled back entirely — you never end up with money that has left one place without arriving at the other.',
            es: 'Atomicidad. Una transferencia que carga en una cuenta y muere antes de abonar en la otra se deshace por completo: nunca acabas con dinero que salió de un sitio sin llegar al otro.',
          },
        },
        {
          kind: 'choice',
          id: 'tx-2',
          prompt: {
            en: 'Two users buy the last item at the same instant and both succeed. What happened?',
            es: 'Dos usuarios compran la última unidad en el mismo instante y a los dos les funciona. ¿Qué ha pasado?',
          },
          choices: [
            { en: 'A deadlock', es: 'Un interbloqueo' },
            {
              en: 'A race condition — both read the stock before either wrote',
              es: 'Una condición de carrera: los dos leyeron el stock antes de que ninguno escribiera',
            },
            { en: 'A cache miss', es: 'Un fallo de caché' },
            { en: 'An index was missing', es: 'Faltaba un índice' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Classic read-modify-write. Both read stock = 1, both decide it is available, both write 0. The fix is to make the check and the decrement a single atomic operation in the database.',
            es: 'El clásico leer-modificar-escribir. Ambos leen stock = 1, ambos deciden que hay disponibilidad y ambos escriben 0. La solución es que la comprobación y el decremento sean una única operación atómica en la base de datos.',
          },
        },
        {
          kind: 'boolean',
          id: 'tx-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Wrapping code in a transaction automatically prevents all race conditions.',
            es: 'Envolver el código en una transacción evita automáticamente todas las condiciones de carrera.',
          },
          answer: false,
          explanation: {
            en: 'It depends entirely on the isolation level. At READ COMMITTED — the default in most databases — two transactions can still read the same value and overwrite each other. You need SERIALIZABLE, explicit locking, or an atomic statement.',
            es: 'Depende por completo del nivel de aislamiento. Con READ COMMITTED —el valor por defecto en la mayoría de bases de datos— dos transacciones aún pueden leer el mismo valor y pisarse. Necesitas SERIALIZABLE, bloqueo explícito o una sentencia atómica.',
          },
        },
        {
          kind: 'choice',
          id: 'tx-4',
          prompt: { en: 'What is optimistic locking?', es: '¿Qué es el bloqueo optimista?' },
          choices: [
            {
              en: 'Locking the row before reading it',
              es: 'Bloquear la fila antes de leerla',
            },
            {
              en: 'Assuming no conflict, then verifying a version number when writing',
              es: 'Asumir que no habrá conflicto y verificar un número de versión al escribir',
            },
            { en: 'Never locking anything', es: 'No bloquear nunca nada' },
            { en: 'Locking the whole table', es: 'Bloquear la tabla entera' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'You read version 7, and your update says "set this WHERE version = 7". If someone else got there first the update matches zero rows and you retry. Great when conflicts are rare — no lock is held while the user thinks.',
            es: 'Lees la versión 7 y tu actualización dice "escribe esto WHERE version = 7". Si alguien llegó antes, la actualización afecta a cero filas y reintentas. Ideal cuando los conflictos son raros: no se retiene ningún bloqueo mientras el usuario piensa.',
          },
        },
        {
          kind: 'choice',
          id: 'tx-5',
          prompt: { en: 'What is a deadlock?', es: '¿Qué es un interbloqueo (deadlock)?' },
          choices: [
            { en: 'A crashed database', es: 'Una base de datos caída' },
            {
              en: 'Two transactions each holding a lock the other needs, so neither can proceed',
              es: 'Dos transacciones que retienen cada una el bloqueo que necesita la otra, así que ninguna avanza',
            },
            { en: 'A very slow query', es: 'Una consulta muy lenta' },
            { en: 'A full disk', es: 'Un disco lleno' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A holds row 1 and wants row 2; B holds row 2 and wants row 1. Databases detect this and kill one transaction. The usual fix is making all code acquire locks in the same order.',
            es: 'A retiene la fila 1 y quiere la 2; B retiene la fila 2 y quiere la 1. Las bases de datos lo detectan y matan una de las transacciones. La solución habitual es que todo el código adquiera los bloqueos en el mismo orden.',
          },
        },
      ],
    },
    {
      id: 'security',
      title: { en: 'Security', es: 'Seguridad' },
      icon: '🛡️',
      summary: {
        en: 'The handful of mistakes behind most real breaches.',
        es: 'El puñado de errores detrás de la mayoría de brechas reales.',
      },
      concept: {
        headline: {
          en: 'Never trust input. Never build queries or HTML by gluing strings together.',
          es: 'Nunca confíes en la entrada. Nunca construyas consultas ni HTML pegando cadenas.',
        },
        body: [
          {
            en: 'Injection attacks all share one shape: data supplied by a user gets treated as code. SQL injection, XSS, command injection — same bug, different interpreter.',
            es: 'Todos los ataques de inyección comparten la misma forma: datos aportados por un usuario acaban tratados como código. Inyección SQL, XSS, inyección de comandos: el mismo bug con distinto intérprete.',
          },
          {
            en: 'The defence is always the same idea: keep data as data. Parameterised queries for SQL, escaping or a framework for HTML, argument arrays for shell commands.',
            es: 'La defensa es siempre la misma idea: que los datos sigan siendo datos. Consultas parametrizadas para SQL, escapado o un framework para HTML, arrays de argumentos para comandos de shell.',
          },
        ],
        keyPoints: [
          {
            en: 'Parameterised queries stop SQL injection. String concatenation causes it.',
            es: 'Las consultas parametrizadas detienen la inyección SQL. La concatenación de cadenas la provoca.',
          },
          {
            en: 'Hash passwords with bcrypt/argon2 — slow and salted by design. Never MD5, SHA-1 or plain SHA-256.',
            es: 'Hashea contraseñas con bcrypt o argon2: lentos y con sal por diseño. Nunca MD5, SHA-1 ni SHA-256 a secas.',
          },
          {
            en: 'A JWT is signed, not encrypted. Anyone can read its contents.',
            es: 'Un JWT va firmado, no cifrado. Cualquiera puede leer su contenido.',
          },
          {
            en: 'Secrets belong in a secret manager or environment variables — never in the repository.',
            es: 'Los secretos van en un gestor de secretos o en variables de entorno, nunca en el repositorio.',
          },
        ],
        example: {
          caption: {
            en: 'The difference between a bug and a breach',
            es: 'La diferencia entre un bug y una brecha',
          },
          code: {
            en: `// Injection: input becomes part of the query
db.query("SELECT * FROM users WHERE email = '" + email + "'")
// email = "' OR '1'='1"  ->  returns every user

// Safe: the driver sends the value separately, never as code
db.query('SELECT * FROM users WHERE email = ?', [email])`,
            es: `// Inyección: la entrada pasa a formar parte de la consulta
db.query("SELECT * FROM users WHERE email = '" + email + "'")
// email = "' OR '1'='1"  ->  devuelve todos los usuarios

// Seguro: el driver envía el valor aparte, nunca como código
db.query('SELECT * FROM users WHERE email = ?', [email])`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'sec-1',
          prompt: {
            en: 'What is the correct defence against SQL injection?',
            es: '¿Cuál es la defensa correcta contra la inyección SQL?',
          },
          choices: [
            { en: 'Escaping quotes manually', es: 'Escapar las comillas a mano' },
            {
              en: 'Parameterised (prepared) queries',
              es: 'Consultas parametrizadas (preparadas)',
            },
            { en: 'A web application firewall', es: 'Un firewall de aplicaciones web' },
            { en: 'Hiding error messages', es: 'Ocultar los mensajes de error' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Parameterised queries send the SQL and the values over separate channels, so user input is never parsed as SQL. Manual escaping fails on encodings and edge cases you did not think of — this is a solved problem, use the solution.',
            es: 'Las consultas parametrizadas envían el SQL y los valores por canales separados, así la entrada del usuario nunca se interpreta como SQL. El escapado manual falla con codificaciones y casos límite que no previste: esto es un problema resuelto, usa la solución.',
          },
        },
        {
          kind: 'choice',
          id: 'sec-2',
          prompt: {
            en: 'Which algorithm is appropriate for storing passwords?',
            es: '¿Qué algoritmo es adecuado para almacenar contraseñas?',
          },
          choices: ['MD5', 'SHA-256', 'bcrypt / argon2', 'Base64'],
          answerIndex: 2,
          explanation: {
            en: 'Password hashes must be SLOW and salted. SHA-256 is built for speed — a GPU tries billions per second. bcrypt and argon2 are deliberately expensive, turning a full crack from hours into centuries. (Base64 is not even encryption; it is encoding.)',
            es: 'Los hashes de contraseña deben ser LENTOS y con sal. SHA-256 está hecho para la velocidad: una GPU prueba miles de millones por segundo. bcrypt y argon2 son caros a propósito, y convierten un descifrado completo de horas en siglos. (Base64 ni siquiera es cifrado: es codificación.)',
          },
        },
        {
          kind: 'boolean',
          id: 'sec-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'You can safely store sensitive data inside a JWT because it is encrypted.',
            es: 'Puedes guardar datos sensibles dentro de un JWT con seguridad porque va cifrado.',
          },
          answer: false,
          explanation: {
            en: 'A standard JWT is SIGNED, not encrypted. The payload is base64 — anyone holding the token can decode and read it in a browser console. The signature only proves it has not been tampered with.',
            es: 'Un JWT estándar va FIRMADO, no cifrado. El contenido es base64: cualquiera que tenga el token puede decodificarlo y leerlo en la consola del navegador. La firma solo demuestra que no ha sido manipulado.',
          },
        },
        {
          kind: 'choice',
          id: 'sec-4',
          prompt: {
            en: 'What is XSS (cross-site scripting)?',
            es: '¿Qué es XSS (cross-site scripting)?',
          },
          choices: [
            { en: 'Stealing cookies over HTTP', es: 'Robar cookies por HTTP' },
            {
              en: 'Injecting JavaScript into a page that other users then run',
              es: 'Inyectar JavaScript en una página que luego ejecutan otros usuarios',
            },
            { en: 'Guessing passwords', es: 'Adivinar contraseñas' },
            { en: 'Overloading a server', es: 'Saturar un servidor' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'An attacker gets their script stored or reflected into your page. It then runs with your users’ session, so it can read their data or act as them. Escaping output — which modern frameworks do by default — is the defence.',
            es: 'Un atacante consigue que su script quede almacenado o reflejado en tu página. Luego se ejecuta con la sesión de tus usuarios, así que puede leer sus datos o actuar en su nombre. La defensa es escapar la salida, algo que los frameworks modernos hacen por defecto.',
          },
        },
        {
          kind: 'choice',
          id: 'sec-5',
          prompt: {
            en: 'What is the "principle of least privilege"?',
            es: '¿Qué es el "principio de mínimo privilegio"?',
          },
          choices: [
            {
              en: 'Give every service admin access for simplicity',
              es: 'Dar acceso de administrador a todo servicio por simplicidad',
            },
            {
              en: 'Grant only the minimum permissions needed to do the job',
              es: 'Conceder solo los permisos mínimos necesarios para hacer el trabajo',
            },
            { en: 'Use one shared account', es: 'Usar una única cuenta compartida' },
            {
              en: 'Restrict access to senior engineers',
              es: 'Restringir el acceso a los ingenieros senior',
            },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It bounds the blast radius. A compromised service that can only read one bucket is an incident; the same service with admin rights is a company-wide breach.',
            es: 'Acota el radio del daño. Un servicio comprometido que solo puede leer un bucket es un incidente; ese mismo servicio con permisos de administrador es una brecha en toda la empresa.',
          },
        },
        {
          kind: 'gap',
          id: 'sec-6',
          prompt: {
            en: 'Complete the query so user input can never be executed as SQL.',
            es: 'Completa la consulta para que la entrada del usuario nunca se ejecute como SQL.',
          },
          code: `db.query('SELECT * FROM users WHERE email = ___', [email])`,
          choices: ['?', "' + email + '", '${email}', '%s'],
          answerIndex: 0,
          explanation: {
            en: 'The placeholder tells the driver to send the value on a separate channel from the SQL text. String interpolation — the other three — is exactly how injection happens.',
            es: 'El marcador le dice al driver que envíe el valor por un canal distinto al del texto SQL. La interpolación de cadenas —las otras tres— es exactamente como ocurre la inyección.',
          },
        },
      ],
    },
    {
      id: 'concurrency',
      title: { en: 'Concurrency & async', es: 'Concurrencia y asincronía' },
      icon: '⚡',
      summary: {
        en: 'Doing several things at once without corrupting everything.',
        es: 'Hacer varias cosas a la vez sin corromperlo todo.',
      },
      concept: {
        headline: {
          en: 'Concurrency is dealing with many things at once. Parallelism is doing them at once.',
          es: 'Concurrencia es gestionar muchas cosas a la vez. Paralelismo es hacerlas a la vez.',
        },
        body: [
          {
            en: 'A single-threaded event loop (JavaScript, Node) is concurrent but not parallel: while one task waits on the network, another runs. Nothing truly happens simultaneously.',
            es: 'Un bucle de eventos de un solo hilo (JavaScript, Node) es concurrente pero no paralelo: mientras una tarea espera a la red, otra se ejecuta. Nada ocurre realmente al mismo tiempo.',
          },
          {
            en: 'That single thread is a feature — no shared-memory data races. But it also means one heavy synchronous computation blocks everything, including the UI.',
            es: 'Ese hilo único es una ventaja: no hay carreras de datos en memoria compartida. Pero también significa que un cálculo síncrono pesado lo bloquea todo, incluida la interfaz.',
          },
        ],
        keyPoints: [
          {
            en: 'I/O-bound work (network, disk) benefits from async. CPU-bound work needs threads or workers.',
            es: 'El trabajo limitado por E/S (red, disco) se beneficia de async. El limitado por CPU necesita hilos o workers.',
          },
          {
            en: 'await does not block the thread — it yields, letting other work run.',
            es: 'await no bloquea el hilo: cede el turno para que se ejecute otro trabajo.',
          },
          {
            en: 'Promise.all runs things concurrently; awaiting in a loop runs them one at a time.',
            es: 'Promise.all ejecuta las cosas concurrentemente; hacer await dentro de un bucle las ejecuta de una en una.',
          },
          {
            en: 'Shared mutable state plus concurrency equals race conditions, in every language.',
            es: 'Estado mutable compartido más concurrencia es igual a condiciones de carrera, en todos los lenguajes.',
          },
        ],
        example: {
          caption: {
            en: 'Sequential vs concurrent — same code, 5× the time',
            es: 'Secuencial frente a concurrente: el mismo código, 5 veces el tiempo',
          },
          code: {
            en: `// 5 requests × 200ms = 1000ms
for (const id of ids) results.push(await fetchUser(id))

// all 5 in flight at once = ~200ms
const results = await Promise.all(ids.map(fetchUser))`,
            es: `// 5 peticiones × 200ms = 1000ms
for (const id of ids) results.push(await fetchUser(id))

// las 5 en vuelo a la vez = ~200ms
const results = await Promise.all(ids.map(fetchUser))`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'conc-1',
          prompt: {
            en: 'Why is this slow, and how would you fix it?',
            es: '¿Por qué esto es lento y cómo lo arreglarías?',
          },
          code: `const users = []
for (const id of ids) {
  users.push(await fetchUser(id))
}`,
          choices: [
            { en: 'It is fine', es: 'Está bien así' },
            {
              en: 'Each await waits for the previous request — use Promise.all to run them concurrently',
              es: 'Cada await espera a la petición anterior: usa Promise.all para lanzarlas concurrentemente',
            },
            { en: 'It needs a worker thread', es: 'Necesita un hilo worker' },
            { en: 'The array should be preallocated', es: 'Habría que reservar el array antes' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'await inside a loop serialises the requests: 100 users at 200ms each is 20 seconds. `Promise.all` fires them together and takes as long as the slowest one.',
            es: 'await dentro de un bucle serializa las peticiones: 100 usuarios a 200ms cada uno son 20 segundos. `Promise.all` las lanza juntas y tarda lo que la más lenta.',
          },
        },
        {
          kind: 'boolean',
          id: 'conc-2',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Adding async/await to a CPU-heavy function makes it stop blocking the event loop.',
            es: 'Añadir async/await a una función que consume mucha CPU hace que deje de bloquear el bucle de eventos.',
          },
          answer: false,
          explanation: {
            en: 'async only helps with WAITING. A loop crunching a million items still occupies the single thread for its whole duration — the UI freezes regardless. CPU-bound work needs a worker thread or a different process.',
            es: 'async solo ayuda cuando hay que ESPERAR. Un bucle que procesa un millón de elementos sigue ocupando el único hilo todo ese tiempo: la interfaz se congela igual. El trabajo limitado por CPU necesita un hilo worker u otro proceso.',
          },
        },
        {
          kind: 'choice',
          id: 'conc-3',
          prompt: {
            en: 'What is the difference between concurrency and parallelism?',
            es: '¿Cuál es la diferencia entre concurrencia y paralelismo?',
          },
          choices: [
            { en: 'They are the same', es: 'Son lo mismo' },
            {
              en: 'Concurrency is managing several tasks in overlapping time; parallelism is executing them simultaneously on multiple cores',
              es: 'La concurrencia gestiona varias tareas en tiempos solapados; el paralelismo las ejecuta a la vez en varios núcleos',
            },
            { en: 'Concurrency needs multiple machines', es: 'La concurrencia necesita varias máquinas' },
            {
              en: 'Parallelism only applies to databases',
              es: 'El paralelismo solo se aplica a bases de datos',
            },
          ],
          answerIndex: 1,
          explanation: {
            en: 'One barista interleaving five orders is concurrent. Five baristas working at once is parallel. A single-core machine can be concurrent but never parallel.',
            es: 'Un camarero alternando entre cinco pedidos es concurrencia. Cinco camareros trabajando a la vez es paralelismo. Una máquina de un solo núcleo puede ser concurrente pero nunca paralela.',
          },
        },
        {
          kind: 'choice',
          id: 'conc-4',
          prompt: {
            en: 'Why is `Promise.allSettled` sometimes better than `Promise.all`?',
            es: '¿Por qué a veces `Promise.allSettled` es mejor que `Promise.all`?',
          },
          choices: [
            { en: 'It is faster', es: 'Es más rápido' },
            {
              en: 'It waits for every promise and reports each outcome, instead of rejecting on the first failure',
              es: 'Espera a todas las promesas e informa de cada resultado, en vez de rechazar al primer fallo',
            },
            { en: 'It runs them sequentially', es: 'Las ejecuta secuencialmente' },
            { en: 'It retries failures', es: 'Reintenta los fallos' },
          ],
          answerIndex: 1,
          explanation: {
            en: '`Promise.all` rejects as soon as one fails, and you lose the results that succeeded. When you want to send 100 emails and know exactly which 3 failed, `allSettled` is the right tool.',
            es: '`Promise.all` rechaza en cuanto una falla y pierdes los resultados que sí funcionaron. Cuando quieres enviar 100 correos y saber exactamente cuáles 3 fallaron, `allSettled` es la herramienta correcta.',
          },
        },
        {
          kind: 'choice',
          id: 'conc-5',
          prompt: {
            en: 'What makes shared mutable state dangerous under concurrency?',
            es: '¿Qué hace peligroso el estado mutable compartido con concurrencia?',
          },
          choices: [
            { en: 'It uses more memory', es: 'Usa más memoria' },
            {
              en: 'Two tasks can interleave mid-update and leave the data in an impossible state',
              es: 'Dos tareas pueden entrelazarse a mitad de una actualización y dejar los datos en un estado imposible',
            },
            { en: 'It cannot be logged', es: 'No se puede registrar en logs' },
            { en: 'It prevents garbage collection', es: 'Impide la recolección de basura' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'An update that looks like one line is several machine steps. Interleave two of them and you get a value neither task intended — the reason locks, atomics and immutable data structures all exist.',
            es: 'Una actualización que parece una línea son varios pasos de máquina. Entrelaza dos y obtienes un valor que ninguna de las dos tareas pretendía: la razón por la que existen los bloqueos, las operaciones atómicas y las estructuras inmutables.',
          },
        },
        {
          kind: 'gap',
          id: 'conc-6',
          prompt: {
            en: 'Complete the line so all requests run concurrently.',
            es: 'Completa la línea para que todas las peticiones se lancen concurrentemente.',
          },
          code: `const users = await ___(ids.map(fetchUser))`,
          choices: ['Promise.all', 'Promise.race', 'Array.from', 'await'],
          answerIndex: 0,
          explanation: {
            en: '`Promise.all` starts every request immediately and waits for all of them, so total time is the slowest one. `Promise.race` would resolve as soon as the first finished, discarding the rest.',
            es: '`Promise.all` inicia todas las peticiones de inmediato y espera a todas, así el tiempo total es el de la más lenta. `Promise.race` resolvería en cuanto terminara la primera, descartando el resto.',
          },
        },
      ],
    },
    {
      id: 'networking',
      title: { en: 'Networking', es: 'Redes' },
      icon: '📡',
      summary: {
        en: 'DNS, TCP, TLS and the latency numbers worth memorising.',
        es: 'DNS, TCP, TLS y los números de latencia que vale la pena memorizar.',
      },
      concept: {
        headline: {
          en: 'The network is slow, unreliable, and lying to you about both.',
          es: 'La red es lenta, poco fiable, y te miente sobre ambas cosas.',
        },
        body: [
          {
            en: 'Every remote call can be slow, fail, or — worst of all — succeed without you hearing about it. Distributed systems are largely the discipline of handling that third case.',
            es: 'Toda llamada remota puede ser lenta, fallar o —lo peor de todo— tener éxito sin que tú te enteres. Los sistemas distribuidos son en gran medida la disciplina de manejar ese tercer caso.',
          },
          {
            en: 'Knowing rough latency numbers changes design decisions: a memory read is nanoseconds, a datacentre round trip is under a millisecond, a cross-continent round trip is over 100ms. No amount of code makes light faster.',
            es: 'Conocer los órdenes de magnitud de la latencia cambia las decisiones de diseño: una lectura de memoria son nanosegundos, un ida y vuelta dentro del centro de datos menos de un milisegundo, y uno intercontinental más de 100ms. Ninguna cantidad de código hace más rápida la luz.',
          },
        ],
        keyPoints: [
          {
            en: 'DNS turns a name into an IP. TCP guarantees ordered delivery; UDP does not but is faster.',
            es: 'DNS convierte un nombre en una IP. TCP garantiza entrega ordenada; UDP no, pero es más rápido.',
          },
          {
            en: 'TLS encrypts the channel and proves the server is who it claims to be.',
            es: 'TLS cifra el canal y demuestra que el servidor es quien dice ser.',
          },
          {
            en: 'A load balancer spreads traffic and removes unhealthy instances.',
            es: 'Un balanceador reparte el tráfico y saca de rotación las instancias enfermas.',
          },
          {
            en: 'Always set timeouts and retries with backoff. A request with no timeout can hang forever.',
            es: 'Pon siempre timeouts y reintentos con espera creciente. Una petición sin timeout puede colgarse para siempre.',
          },
        ],
        example: {
          caption: {
            en: 'Latency numbers every developer should know',
            es: 'Números de latencia que todo desarrollador debería conocer',
          },
          code: {
            en: `Memory read              ~100 ns
SSD random read          ~150 µs      (1,500× slower)
Same-datacentre round trip ~0.5 ms
Madrid -> Virginia round trip ~90 ms  (900,000× a memory read)`,
            es: `Lectura de memoria           ~100 ns
Lectura aleatoria en SSD     ~150 µs      (1.500× más lenta)
Ida y vuelta en el mismo CPD ~0,5 ms
Ida y vuelta Madrid -> Virginia ~90 ms  (900.000× una lectura de memoria)`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'net-1',
          prompt: { en: 'What does DNS do?', es: '¿Qué hace el DNS?' },
          choices: [
            { en: 'Encrypts traffic', es: 'Cifra el tráfico' },
            {
              en: 'Translates a domain name into an IP address',
              es: 'Traduce un nombre de dominio a una dirección IP',
            },
            {
              en: 'Balances load between servers',
              es: 'Reparte la carga entre servidores',
            },
            { en: 'Caches web pages', es: 'Cachea páginas web' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It is the phone book of the internet. It is also why a DNS change can take time to reach everyone — resolvers cache the answer for the record’s TTL.',
            es: 'Es la guía telefónica de internet. También es la razón de que un cambio de DNS tarde en llegar a todo el mundo: los resolutores cachean la respuesta durante el TTL del registro.',
          },
        },
        {
          kind: 'choice',
          id: 'net-2',
          prompt: {
            en: 'When is UDP a better choice than TCP?',
            es: '¿Cuándo es UDP mejor opción que TCP?',
          },
          choices: [
            { en: 'Transferring a file', es: 'Transferir un fichero' },
            {
              en: 'Live video or gaming, where a late packet is worse than a lost one',
              es: 'Vídeo en directo o videojuegos, donde un paquete que llega tarde es peor que uno perdido',
            },
            { en: 'Loading a web page', es: 'Cargar una página web' },
            { en: 'Sending email', es: 'Enviar correo' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'TCP retransmits lost packets and delivers in order, which adds delay. In a live call, a frame that arrives 300ms late is useless — better to drop it and keep going. That is exactly UDP’s trade.',
            es: 'TCP retransmite los paquetes perdidos y entrega en orden, lo que añade retardo. En una llamada en directo, un fotograma que llega 300ms tarde es inútil: mejor descartarlo y seguir. Ese es exactamente el trato de UDP.',
          },
        },
        {
          kind: 'boolean',
          id: 'net-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'If a request times out, you know the server did not process it.',
            es: 'Si una petición da timeout, sabes que el servidor no la procesó.',
          },
          answer: false,
          explanation: {
            en: 'This is the most important lesson in distributed systems. A timeout tells you that you got no ANSWER — the server may have completed the work perfectly and lost the response. That is precisely why retries need idempotency.',
            es: 'Esta es la lección más importante de los sistemas distribuidos. Un timeout te dice que no obtuviste RESPUESTA: el servidor puede haber completado el trabajo perfectamente y haber perdido la respuesta. Por eso justamente los reintentos necesitan idempotencia.',
          },
        },
        {
          kind: 'choice',
          id: 'net-4',
          prompt: {
            en: 'Why retry with exponential backoff instead of retrying immediately?',
            es: '¿Por qué reintentar con espera exponencial en vez de reintentar de inmediato?',
          },
          choices: [
            { en: 'It is easier to code', es: 'Es más fácil de programar' },
            {
              en: 'Immediate retries from many clients pile more load on an already struggling service',
              es: 'Los reintentos inmediatos de muchos clientes amontonan más carga sobre un servicio que ya sufre',
            },
            { en: 'It uses less bandwidth', es: 'Usa menos ancho de banda' },
            { en: 'It guarantees success', es: 'Garantiza el éxito' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A struggling service gets hammered by thousands of instant retries and never recovers — a retry storm. Backoff (plus jitter, so clients do not synchronise) gives it room to breathe.',
            es: 'Un servicio que sufre recibe una paliza de miles de reintentos instantáneos y nunca se recupera: una tormenta de reintentos. La espera creciente (más un poco de aleatoriedad, para que los clientes no se sincronicen) le da aire.',
          },
        },
        {
          kind: 'choice',
          id: 'net-5',
          prompt: {
            en: 'What does a load balancer do beyond distributing traffic?',
            es: '¿Qué hace un balanceador de carga además de repartir el tráfico?',
          },
          choices: [
            { en: 'Compresses responses', es: 'Comprime las respuestas' },
            {
              en: 'Health-checks instances and stops routing to unhealthy ones',
              es: 'Comprueba la salud de las instancias y deja de enviar tráfico a las enfermas',
            },
            { en: 'Stores sessions', es: 'Guarda las sesiones' },
            { en: 'Encrypts the database', es: 'Cifra la base de datos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Health checking is arguably its more valuable job: an instance that starts failing is pulled out of rotation automatically, so users never reach it. That is what makes rolling deploys invisible.',
            es: 'La comprobación de salud es probablemente su trabajo más valioso: una instancia que empieza a fallar sale de rotación automáticamente, así que los usuarios nunca llegan a ella. Eso es lo que hace invisibles los despliegues progresivos.',
          },
        },
      ],
    },
    {
      id: 'caching',
      title: { en: 'Caching', es: 'Caché' },
      icon: '🚀',
      summary: {
        en: 'The biggest speed win available, and one of the two hard problems.',
        es: 'La mayor mejora de velocidad disponible, y uno de los dos problemas difíciles.',
      },
      concept: {
        headline: {
          en: 'Caching is trading freshness for speed. Decide consciously how stale is acceptable.',
          es: 'Cachear es cambiar frescura por velocidad. Decide conscientemente cuánta desactualización aceptas.',
        },
        body: [
          {
            en: 'A cache stores the result of expensive work so the next request skips it. The gain is enormous; the cost is that you now have two copies of the truth, and they can disagree.',
            es: 'Una caché guarda el resultado de un trabajo caro para que la siguiente petición se lo salte. La ganancia es enorme; el coste es que ahora tienes dos copias de la verdad y pueden no coincidir.',
          },
          {
            en: 'Almost every caching bug is an invalidation bug: the data changed, the cache did not, and someone sees yesterday’s price.',
            es: 'Casi todo bug de caché es un bug de invalidación: los datos cambiaron, la caché no, y alguien ve el precio de ayer.',
          },
        ],
        keyPoints: [
          {
            en: 'Layers: browser → CDN → application cache (Redis) → database cache. Each one closer to the user is faster.',
            es: 'Capas: navegador → CDN → caché de aplicación (Redis) → caché de la base de datos. Cuanto más cerca del usuario, más rápida.',
          },
          {
            en: 'A TTL is the simplest invalidation strategy: accept staleness for N seconds.',
            es: 'Un TTL es la estrategia de invalidación más simple: aceptar datos viejos durante N segundos.',
          },
          {
            en: 'Cache-aside: check cache, on a miss read the source and populate.',
            es: 'Cache-aside: mira la caché y, si falla, lee del origen y rellénala.',
          },
          {
            en: 'A cache stampede is many requests all missing at once and hammering the source.',
            es: 'Una estampida de caché es que muchas peticiones fallen a la vez y machaquen el origen.',
          },
        ],
        example: {
          caption: {
            en: 'Cache-aside, the most common pattern',
            es: 'Cache-aside, el patrón más común',
          },
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
          prompt: {
            en: 'A user updates their profile but keeps seeing the old name. What is the bug?',
            es: 'Un usuario actualiza su perfil pero sigue viendo el nombre antiguo. ¿Cuál es el bug?',
          },
          choices: [
            { en: 'The database write failed', es: 'Falló la escritura en la base de datos' },
            {
              en: 'The cache was not invalidated after the write',
              es: 'La caché no se invalidó tras la escritura',
            },
            { en: 'The index is missing', es: 'Falta el índice' },
            {
              en: 'A race condition in the browser',
              es: 'Una condición de carrera en el navegador',
            },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The write succeeded; the cache still holds the previous value and keeps serving it until the TTL expires. Any write path must either delete or update the cached entry.',
            es: 'La escritura funcionó; la caché sigue guardando el valor anterior y lo sirve hasta que expire el TTL. Todo camino de escritura debe borrar o actualizar la entrada cacheada.',
          },
        },
        {
          kind: 'choice',
          id: 'cache-2',
          prompt: {
            en: 'Why is `index.html` usually cached with `max-age=0` while `/assets/app-a3f9.js` is cached for a year?',
            es: '¿Por qué `index.html` suele cachearse con `max-age=0` mientras `/assets/app-a3f9.js` se cachea un año?',
          },
          choices: [
            { en: 'HTML is smaller', es: 'El HTML es más pequeño' },
            {
              en: 'The asset filename contains a content hash, so a new build produces a new URL',
              es: 'El nombre del recurso contiene un hash del contenido, así que un build nuevo produce una URL nueva',
            },
            {
              en: 'JavaScript cannot be revalidated',
              es: 'El JavaScript no se puede revalidar',
            },
            { en: 'Browsers ignore HTML caching', es: 'Los navegadores ignoran la caché de HTML' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The hashed filename makes the URL immutable — that exact content never changes, so it can be cached forever. index.html must stay fresh because it is what points at the new hashed filenames.',
            es: 'El nombre con hash hace la URL inmutable: ese contenido exacto nunca cambia, así que puede cachearse para siempre. index.html debe estar fresco porque es lo que apunta a los nuevos nombres con hash.',
          },
        },
        {
          kind: 'boolean',
          id: 'cache-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Adding a cache is a safe optimisation with no downsides.',
            es: 'Añadir una caché es una optimización segura y sin inconvenientes.',
          },
          answer: false,
          explanation: {
            en: 'You have added a second source of truth, a new failure mode (stale data), extra infrastructure, and a debugging problem where "works for me" depends on who has a warm cache. Worth it often — free, never.',
            es: 'Has añadido una segunda fuente de verdad, un nuevo modo de fallo (datos viejos), infraestructura extra y un problema de depuración donde "a mí me funciona" depende de quién tenga la caché caliente. Suele merecer la pena; gratis, nunca.',
          },
        },
        {
          kind: 'choice',
          id: 'cache-4',
          prompt: { en: 'What is a cache stampede?', es: '¿Qué es una estampida de caché?' },
          choices: [
            { en: 'The cache runs out of memory', es: 'La caché se queda sin memoria' },
            {
              en: 'A popular entry expires and thousands of requests hit the database simultaneously',
              es: 'Una entrada popular expira y miles de peticiones golpean la base de datos a la vez',
            },
            { en: 'Two caches disagree', es: 'Dos cachés no coinciden' },
            { en: 'The CDN goes offline', es: 'El CDN se cae' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Everything was served from cache, then it expires and all that traffic lands on the source at once — often taking it down. Mitigations include staggered TTLs and letting only one request rebuild the entry.',
            es: 'Todo se servía desde caché, luego expira y todo ese tráfico cae sobre el origen de golpe, a menudo tumbándolo. Las mitigaciones incluyen TTL escalonados y dejar que solo una petición reconstruya la entrada.',
          },
        },
        {
          kind: 'choice',
          id: 'cache-5',
          prompt: {
            en: 'Which data is the WORST candidate for a long cache TTL?',
            es: '¿Qué dato es el PEOR candidato para un TTL de caché largo?',
          },
          choices: [
            { en: 'A product image', es: 'La imagen de un producto' },
            { en: 'A country list', es: 'Una lista de países' },
            {
              en: 'A user’s current account balance',
              es: 'El saldo actual de la cuenta de un usuario',
            },
            { en: 'A CSS file with a hashed name', es: 'Un fichero CSS con nombre con hash' },
          ],
          answerIndex: 2,
          explanation: {
            en: 'Showing a stale balance is actively harmful — the user makes decisions on it. Rule of thumb: the cost of being wrong sets the TTL, not how often the data changes.',
            es: 'Mostrar un saldo desactualizado es activamente dañino: el usuario toma decisiones con él. Regla práctica: el TTL lo marca el coste de equivocarse, no la frecuencia con que cambian los datos.',
          },
        },
        {
          kind: 'order',
          id: 'cache-6',
          prompt: {
            en: 'Put the cache-aside read pattern in order.',
            es: 'Ordena el patrón de lectura cache-aside.',
          },
          items: [
            { en: 'Look for the key in the cache', es: 'Busca la clave en la caché' },
            { en: 'On a miss, read from the database', es: 'Si falla, lee de la base de datos' },
            {
              en: 'Write the value into the cache with a TTL',
              es: 'Escribe el valor en la caché con un TTL',
            },
            { en: 'Return the value to the caller', es: 'Devuelve el valor a quien llamó' },
          ],
          explanation: {
            en: 'Cache-aside keeps the cache out of the write path: it only ever fills on a miss. The TTL is your explicit decision about how stale is acceptable.',
            es: 'Cache-aside mantiene la caché fuera del camino de escritura: solo se rellena cuando falla. El TTL es tu decisión explícita sobre cuánta desactualización aceptas.',
          },
        },
      ],
    },
  ],
}
