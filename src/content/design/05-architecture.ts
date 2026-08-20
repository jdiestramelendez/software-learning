import type { Section } from '../types'

export const architecture: Section = {
  id: 'architecture',
  title: { en: 'System architecture', es: 'Arquitectura de sistemas' },
  subtitle: {
    en: 'The same principles, one zoom level out — now the boundaries are processes.',
    es: 'Los mismos principios, un nivel de zoom más lejos: ahora las fronteras son procesos.',
  },
  units: [
    {
      id: 'monolith',
      title: { en: 'Monolith & modular monolith', es: 'Monolito y monolito modular' },
      icon: '🧊',
      summary: {
        en: 'The default that most teams should start from — and often stay on.',
        es: 'El punto de partida por defecto de casi todo equipo, y donde muchos se quedan.',
      },
      concept: {
        headline: {
          en: 'A monolith is one deployable. That is a packaging choice, not a quality judgement.',
          es: 'Un monolito es un desplegable. Eso es una decisión de empaquetado, no un juicio de calidad.',
        },
        body: [
          {
            en: '"Monolith" became an insult, which is unfortunate, because one deployable means one place to debug, real transactions, in-process calls that cannot fail halfway, and a single version to reason about.',
            es: '"Monolito" se convirtió en un insulto, y es una pena, porque un desplegable significa un solo sitio donde depurar, transacciones de verdad, llamadas en proceso que no pueden fallar a medias y una única versión que razonar.',
          },
          {
            en: 'What people actually hate is the BIG BALL OF MUD: no internal boundaries, everything importing everything. A MODULAR MONOLITH keeps one deployable but enforces module boundaries in code — the benefits of both, and the option to split later along seams that already exist.',
            es: 'Lo que la gente odia en realidad es la GRAN BOLA DE BARRO: sin fronteras internas, todo importando todo. Un MONOLITO MODULAR mantiene un desplegable pero impone fronteras entre módulos en el código: lo bueno de ambos, y la opción de dividir después por costuras que ya existen.',
          },
        ],
        keyPoints: [
          {
            en: 'One deployable: one version, one log stream, real ACID transactions.',
            es: 'Un desplegable: una versión, un flujo de logs, transacciones ACID de verdad.',
          },
          {
            en: 'The enemy is missing boundaries, not single deployment.',
            es: 'El enemigo es la falta de fronteras, no el despliegue único.',
          },
          {
            en: 'Modular monolith: modules talk through published interfaces, never by reaching into each other.',
            es: 'Monolito modular: los módulos hablan por interfaces publicadas, nunca metiendo mano en el otro.',
          },
          {
            en: 'Monolith-first is a real strategy: draw the boundaries before you make them network calls.',
            es: 'Monolito primero es una estrategia real: dibuja las fronteras antes de convertirlas en llamadas de red.',
          },
        ],
        example: {
          caption: {
            en: 'Boundaries without processes',
            es: 'Fronteras sin procesos',
          },
          code: {
            en: `src/
  modules/
    billing/
      index.ts        <- the ONLY file other modules may import
      internal/       <- enforced private by lint rule or tooling
    catalogue/
      index.ts
      internal/

// A boundary you can turn into a network call later, cheaply.
// A boundary you can also delete, if it turns out you were wrong.`,
            es: `src/
  modules/
    billing/
      index.ts        <- el ÚNICO fichero que otros módulos pueden importar
      internal/       <- privado, impuesto por regla de lint o tooling
    catalogue/
      index.ts
      internal/

// Una frontera que luego puedes convertir en llamada de red, barato.
// Una frontera que también puedes borrar, si resulta que te equivocaste.`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'mon-1',
          prompt: {
            en: 'What is the real problem people mean when they complain about a monolith?',
            es: '¿Cuál es el problema real cuando alguien se queja de un monolito?',
          },
          choices: [
            { en: 'That it is deployed as one unit', es: 'Que se despliega como una unidad' },
            {
              en: 'That it has no internal boundaries, so every change can touch everything',
              es: 'Que no tiene fronteras internas, así que cualquier cambio puede tocarlo todo',
            },
            { en: 'That it is written in one language', es: 'Que está escrito en un lenguaje' },
            { en: 'That it uses one database', es: 'Que usa una base de datos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Single deployment is not the problem — plenty of large, healthy systems are one deployable. The pain comes from missing boundaries, and splitting a boundaryless system into services just distributes the mud.',
            es: 'El despliegue único no es el problema: muchos sistemas grandes y sanos son un desplegable. El dolor viene de la falta de fronteras, y dividir un sistema sin fronteras en servicios solo reparte el barro.',
          },
        },
        {
          kind: 'choice',
          id: 'mon-2',
          prompt: {
            en: 'What does a modular monolith give you that microservices do not?',
            es: '¿Qué te da un monolito modular que no dan los microservicios?',
          },
          choices: [
            { en: 'Independent deployment', es: 'Despliegue independiente' },
            {
              en: 'Real transactions across modules, in-process calls that cannot half-fail, and one version to debug',
              es: 'Transacciones reales entre módulos, llamadas en proceso que no fallan a medias y una sola versión que depurar',
            },
            { en: 'Independent scaling', es: 'Escalado independiente' },
            { en: 'Language independence', es: 'Independencia de lenguaje' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The moment a module boundary becomes a network hop you lose ACID across it and inherit partial failure. That is a real cost, and it should be paid deliberately rather than by default.',
            es: 'En cuanto una frontera de módulo se vuelve un salto de red, pierdes ACID a través de ella y heredas el fallo parcial. Es un coste real y hay que pagarlo a propósito, no por defecto.',
          },
        },
        {
          kind: 'boolean',
          id: 'mon-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A new product should start with microservices to avoid rewriting later.',
            es: 'Un producto nuevo debería empezar con microservicios para no reescribir después.',
          },
          answer: false,
          explanation: {
            en: 'At the start you do not yet know where the boundaries are, and a wrong boundary is far more expensive to move once it is a network call with its own database. Monolith-first lets you discover the seams cheaply.',
            es: 'Al principio aún no sabes dónde están las fronteras, y una frontera equivocada es muchísimo más cara de mover cuando ya es una llamada de red con su propia base de datos. Monolito primero te deja descubrir las costuras barato.',
          },
        },
        {
          kind: 'choice',
          id: 'mon-4',
          prompt: {
            en: 'How do you enforce module boundaries inside a single codebase?',
            es: '¿Cómo impones fronteras entre módulos dentro de un mismo código?',
          },
          choices: [
            { en: 'By convention and code review alone', es: 'Solo por convención y revisión de código' },
            {
              en: 'With tooling — lint rules or build config that forbid importing another module’s internals',
              es: 'Con herramientas: reglas de lint o configuración de build que prohíban importar las tripas de otro módulo',
            },
            { en: 'By using separate repositories', es: 'Usando repositorios separados' },
            { en: 'You cannot', es: 'No se puede' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A boundary nothing enforces erodes within months — someone in a hurry imports the internal file and nobody catches it. An automated rule is what makes "modular" survive contact with a deadline.',
            es: 'Una frontera que nada impone se erosiona en meses: alguien con prisa importa el fichero interno y nadie lo pilla. Una regla automática es lo que hace que "modular" sobreviva al contacto con una fecha de entrega.',
          },
        },
        {
          kind: 'choice',
          id: 'mon-5',
          prompt: {
            en: 'When does one deployable genuinely stop working?',
            es: '¿Cuándo deja de funcionar de verdad un solo desplegable?',
          },
          choices: [
            { en: 'Above 10,000 lines of code', es: 'Por encima de 10.000 líneas de código' },
            {
              en: 'When independent deployment or independent scaling becomes a real, felt constraint on the team',
              es: 'Cuando desplegar o escalar de forma independiente se convierte en una restricción real y sentida por el equipo',
            },
            { en: 'When you have more than 5 developers', es: 'Cuando hay más de 5 desarrolladores' },
            { en: 'When you move to the cloud', es: 'Cuando te mudas a la nube' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The trigger is organisational and operational, not a line count. "Team A cannot ship without waiting for team B" and "this one endpoint needs ten times the hardware" are real reasons; size on its own is not.',
            es: 'El disparador es organizativo y operativo, no un número de líneas. "El equipo A no puede entregar sin esperar al B" y "este endpoint necesita diez veces el hardware" son razones reales; el tamaño por sí solo no.',
          },
        },
        {
          kind: 'choice',
          id: 'mon-6',
          prompt: {
            en: 'What does a modular monolith make cheap that a big ball of mud does not?',
            es: '¿Qué abarata un monolito modular que no abarata una gran bola de barro?',
          },
          choices: [
            { en: 'Running tests', es: 'Ejecutar los tests' },
            {
              en: 'Extracting a service later — the seam already exists and is already respected',
              es: 'Extraer un servicio después: la costura ya existe y ya se respeta',
            },
            { en: 'Hiring', es: 'Contratar' },
            { en: 'Database migrations', es: 'Las migraciones de base de datos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'If `billing` already talks to the rest through one interface, turning that interface into HTTP is a contained job. If two hundred files reach into its internals, extraction is a rewrite.',
            es: 'Si `billing` ya habla con el resto por una interfaz, convertirla en HTTP es un trabajo acotado. Si doscientos ficheros meten mano en sus tripas, extraerlo es una reescritura.',
          },
        },
      ],
    },
    {
      id: 'layered',
      title: { en: 'Layered architecture', es: 'Arquitectura en capas' },
      icon: '🥞',
      summary: {
        en: 'The classic three tiers, and the trap hiding inside them.',
        es: 'Las tres capas clásicas y la trampa que esconden.',
      },
      concept: {
        headline: {
          en: 'Presentation, application, domain, data — each layer may only call the one below it.',
          es: 'Presentación, aplicación, dominio, datos: cada capa solo puede llamar a la de debajo.',
        },
        body: [
          {
            en: 'It is the most widely taught architecture and it works: the rule is simple, everyone knows where a file goes, and dependencies point one way.',
            es: 'Es la arquitectura más enseñada y funciona: la regla es simple, todo el mundo sabe dónde va cada fichero y las dependencias apuntan en una dirección.',
          },
          {
            en: 'The trap is that the arrows point DOWN, which puts the database at the bottom and makes the domain depend on it. Your business rules end up importing the ORM, and testing a rule means having a database. Hexagonal architecture exists to fix exactly this.',
            es: 'La trampa es que las flechas apuntan HACIA ABAJO, lo que deja la base de datos abajo y hace que el dominio dependa de ella. Tus reglas de negocio acaban importando el ORM y testear una regla exige una base de datos. La arquitectura hexagonal existe para arreglar justo esto.',
          },
        ],
        keyPoints: [
          {
            en: 'Presentation → application → domain → data. Never skip a layer, never call upwards.',
            es: 'Presentación → aplicación → dominio → datos. Nunca saltes una capa ni llames hacia arriba.',
          },
          {
            en: 'Strict layering forbids skipping; relaxed layering allows it. Decide which you are, explicitly.',
            es: 'El estricto prohíbe saltar; el relajado lo permite. Decide cuál eres, explícitamente.',
          },
          {
            en: 'The flaw: the domain ends up depending on persistence, which is backwards.',
            es: 'El defecto: el dominio acaba dependiendo de la persistencia, lo cual es al revés.',
          },
          {
            en: 'The "anaemic domain" smell: entities with only getters, and all logic in the service layer.',
            es: 'El olor a "dominio anémico": entidades con solo getters y toda la lógica en la capa de servicio.',
          },
        ],
        example: {
          caption: {
            en: 'The dependency that points the wrong way',
            es: 'La dependencia que apunta al revés',
          },
          code: {
            en: `// Layered: the domain imports the data layer
// domain/pricing.ts
import { OrderTable } from '../data/tables'   // <- the problem

// Inverted: the domain declares what it needs, data implements it
// domain/pricing.ts
interface Orders { totalFor(id: string): number }   // owned by the domain
// data/postgres-orders.ts
class PostgresOrders implements Orders {}           // depends on the domain`,
            es: `// En capas: el dominio importa la capa de datos
// domain/pricing.ts
import { OrderTable } from '../data/tables'   // <- el problema

// Invertido: el dominio declara lo que necesita, datos lo implementa
// domain/pricing.ts
interface Orders { totalFor(id: string): number }   // propiedad del dominio
// data/postgres-orders.ts
class PostgresOrders implements Orders {}           // depende del dominio`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'lay-1',
          prompt: {
            en: 'What is the core rule of a layered architecture?',
            es: '¿Cuál es la regla central de una arquitectura en capas?',
          },
          choices: [
            { en: 'Every layer may call every other', es: 'Cada capa puede llamar a cualquier otra' },
            {
              en: 'Dependencies point one way — a layer may only call the one below it',
              es: 'Las dependencias van en un sentido: una capa solo puede llamar a la de debajo',
            },
            { en: 'Layers must be separate services', es: 'Las capas deben ser servicios separados' },
            { en: 'There must be exactly three', es: 'Deben ser exactamente tres' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'One-way dependency is what makes the structure comprehensible. The moment the data layer calls back up into the domain, you have a cycle and the layering has stopped meaning anything.',
            es: 'La dependencia en un sentido es lo que hace comprensible la estructura. En cuanto la capa de datos llama hacia arriba al dominio, tienes un ciclo y las capas dejan de significar nada.',
          },
        },
        {
          kind: 'choice',
          id: 'lay-2',
          prompt: {
            en: 'What is the fundamental flaw of classic layering?',
            es: '¿Cuál es el defecto fundamental de las capas clásicas?',
          },
          choices: [
            { en: 'It is too slow', es: 'Es demasiado lento' },
            {
              en: 'The domain sits above the database and therefore depends on it — the most important code depends on the most replaceable',
              es: 'El dominio está encima de la base de datos y por tanto depende de ella: el código más importante depende del más reemplazable',
            },
            { en: 'It needs too many files', es: 'Necesita demasiados ficheros' },
            { en: 'It cannot be tested', es: 'No se puede testear' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Your pricing rules should outlive three databases. When they import the ORM, they cannot be tested, reasoned about or reused without it — which is DIP violated at architectural scale.',
            es: 'Tus reglas de precios deberían sobrevivir a tres bases de datos. Cuando importan el ORM, no se pueden testear, razonar ni reutilizar sin ella: es DIP violado a escala arquitectónica.',
          },
        },
        {
          kind: 'boolean',
          id: 'lay-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'An "anaemic domain model" — entities with only getters and setters — is a sign of healthy layering.',
            es: 'Un "modelo de dominio anémico" —entidades con solo getters y setters— es señal de capas sanas.',
          },
          answer: false,
          explanation: {
            en: 'It means the domain layer holds no domain. All behaviour drifted into services, the entities became data bags, and the rules are now spread across procedures with no obvious home.',
            es: 'Significa que la capa de dominio no contiene dominio. Todo el comportamiento se fue a los servicios, las entidades quedaron como bolsas de datos y las reglas están repartidas en procedimientos sin hogar claro.',
          },
        },
        {
          kind: 'choice',
          id: 'lay-4',
          prompt: {
            en: 'Your controller queries the database directly, skipping the domain. What have you lost?',
            es: 'Tu controlador consulta la base de datos directamente, saltándose el dominio. ¿Qué has perdido?',
          },
          choices: [
            { en: 'Nothing, it is faster', es: 'Nada, es más rápido' },
            {
              en: 'The guarantee that business rules run — that path now bypasses every check the domain enforces',
              es: 'La garantía de que las reglas de negocio se aplican: ese camino esquiva todas las comprobaciones del dominio',
            },
            { en: 'Type safety', es: 'La seguridad de tipos' },
            { en: 'The ability to cache', es: 'La posibilidad de cachear' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'One shortcut is always harmless in isolation. Twenty of them mean nobody can say what rules actually apply to an order, because the answer depends on which endpoint you came through.',
            es: 'Un atajo aislado siempre parece inofensivo. Veinte significan que nadie puede decir qué reglas se aplican de verdad a un pedido, porque la respuesta depende del endpoint por el que entraste.',
          },
        },
        {
          kind: 'order',
          id: 'lay-5',
          prompt: {
            en: 'Order the layers from the outside in.',
            es: 'Ordena las capas de fuera hacia dentro.',
          },
          items: [
            { en: 'Presentation — HTTP, CLI, UI', es: 'Presentación: HTTP, CLI, interfaz' },
            {
              en: 'Application — use cases and orchestration',
              es: 'Aplicación: casos de uso y orquestación',
            },
            { en: 'Domain — the business rules', es: 'Dominio: las reglas de negocio' },
            { en: 'Data — persistence and external systems', es: 'Datos: persistencia y sistemas externos' },
          ],
          explanation: {
            en: 'This is the classic order. Hexagonal architecture keeps the same four concerns but moves the domain to the centre, so both presentation and data end up depending on it instead.',
            es: 'Este es el orden clásico. La arquitectura hexagonal mantiene las cuatro preocupaciones pero mueve el dominio al centro, así que tanto presentación como datos acaban dependiendo de él.',
          },
        },
        {
          kind: 'choice',
          id: 'lay-6',
          prompt: {
            en: 'When is plain layered architecture a perfectly good choice?',
            es: '¿Cuándo es una elección perfectamente válida la arquitectura en capas simple?',
          },
          choices: [
            { en: 'Never, it is obsolete', es: 'Nunca, está obsoleta' },
            {
              en: 'For CRUD-heavy applications with thin business rules, where the extra indirection would not pay for itself',
              es: 'En aplicaciones muy CRUD con reglas de negocio finas, donde la indirección extra no compensaría',
            },
            { en: 'Only for microservices', es: 'Solo para microservicios' },
            { en: 'Only with a NoSQL database', es: 'Solo con base de datos NoSQL' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'If an app mostly moves rows between a form and a table, ports and adapters adds interfaces that buy nothing. Architecture should match how much real domain logic exists.',
            es: 'Si una app básicamente mueve filas entre un formulario y una tabla, puertos y adaptadores añade interfaces que no compran nada. La arquitectura debe ajustarse a cuánta lógica de dominio real existe.',
          },
        },
      ],
    },
    {
      id: 'hexagonal',
      title: {
        en: 'Hexagonal, Clean & Onion',
        es: 'Hexagonal, Clean y Onion',
      },
      icon: '⬡',
      summary: {
        en: 'DIP applied to every boundary the system has.',
        es: 'DIP aplicado a todas las fronteras del sistema.',
      },
      concept: {
        headline: {
          en: 'The domain sits in the centre and depends on nothing. Everything else points inwards.',
          es: 'El dominio está en el centro y no depende de nada. Todo lo demás apunta hacia dentro.',
        },
        body: [
          {
            en: 'A PORT is an interface the domain owns — `Orders`, `Clock`, `PaymentGateway`. An ADAPTER is an implementation living at the edge: Postgres, the system clock, Stripe. Dependencies point from the outside in, always.',
            es: 'Un PUERTO es una interfaz de la que el dominio es dueño: `Orders`, `Clock`, `PaymentGateway`. Un ADAPTADOR es una implementación que vive en el borde: Postgres, el reloj del sistema, Stripe. Las dependencias van de fuera hacia dentro, siempre.',
          },
          {
            en: 'Hexagonal, Clean and Onion are three drawings of the same idea. The payoff is concrete: the entire business can be unit-tested in memory, in milliseconds, and swapping Postgres for DynamoDB touches one folder.',
            es: 'Hexagonal, Clean y Onion son tres dibujos de la misma idea. La ganancia es concreta: todo el negocio se puede testear en memoria en milisegundos, y cambiar Postgres por DynamoDB toca una sola carpeta.',
          },
        ],
        keyPoints: [
          {
            en: 'Port = interface owned by the domain. Adapter = implementation at the edge.',
            es: 'Puerto = interfaz propiedad del dominio. Adaptador = implementación en el borde.',
          },
          {
            en: 'Driving adapters call in (HTTP, CLI). Driven adapters are called out to (database, queue).',
            es: 'Los adaptadores primarios llaman hacia dentro (HTTP, CLI). Los secundarios son llamados hacia fuera (base de datos, cola).',
          },
          {
            en: 'The test: can you run every business rule with no database, no network and no clock?',
            es: 'La prueba: ¿puedes ejecutar todas las reglas de negocio sin base de datos, sin red y sin reloj?',
          },
          {
            en: 'The cost is indirection. On a thin CRUD app it is pure ceremony.',
            es: 'El coste es la indirección. En una app CRUD fina es puro trámite.',
          },
        ],
        example: {
          caption: {
            en: 'The dependency rule, in folders',
            es: 'La regla de dependencia, en carpetas',
          },
          code: {
            en: `domain/           imports NOTHING from the layers below
  order.ts
  ports.ts        interface Orders { save(o: Order): Promise<void> }

application/      imports domain only
  place-order.ts

adapters/         imports domain — never the other way round
  http/            driving:  turns a request into a use-case call
  postgres/        driven:   implements Orders
  stripe/          driven:   implements PaymentGateway

main.ts           the composition root: builds adapters, injects them`,
            es: `domain/           no importa NADA de las capas de abajo
  order.ts
  ports.ts        interface Orders { save(o: Order): Promise<void> }

application/      importa solo dominio
  place-order.ts

adapters/         importa dominio, nunca al revés
  http/            primario:  convierte una petición en un caso de uso
  postgres/        secundario: implementa Orders
  stripe/          secundario: implementa PaymentGateway

main.ts           la raíz de composición: construye adaptadores y los inyecta`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'hex-1',
          prompt: {
            en: 'In ports and adapters, who owns the interface?',
            es: 'En puertos y adaptadores, ¿de quién es la interfaz?',
          },
          choices: [
            { en: 'The infrastructure that implements it', es: 'De la infraestructura que la implementa' },
            {
              en: 'The domain — the adapter is written to satisfy it',
              es: 'Del dominio: el adaptador se escribe para satisfacerla',
            },
            { en: 'A shared library', es: 'De una librería compartida' },
            { en: 'The framework', es: 'Del framework' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'This is the whole inversion. If the interface is defined by the persistence layer and merely consumed by the domain, the arrow still points outwards and nothing has been achieved.',
            es: 'Esta es toda la inversión. Si la interfaz la define la capa de persistencia y el dominio solo la consume, la flecha sigue apuntando hacia fuera y no se ha conseguido nada.',
          },
        },
        {
          kind: 'choice',
          id: 'hex-2',
          prompt: {
            en: 'What is the difference between a driving and a driven adapter?',
            es: '¿Cuál es la diferencia entre un adaptador primario y uno secundario?',
          },
          choices: [
            { en: 'Driving ones are faster', es: 'Los primarios son más rápidos' },
            {
              en: 'A driving adapter calls INTO the application (HTTP, CLI); a driven one is called OUT to (database, queue)',
              es: 'Un adaptador primario llama HACIA DENTRO de la aplicación (HTTP, CLI); uno secundario es llamado HACIA FUERA (base de datos, cola)',
            },
            { en: 'Driven ones are optional', es: 'Los secundarios son opcionales' },
            { en: 'There is no difference', es: 'No hay diferencia' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Direction of control, not importance. It matters because driving adapters can be swapped freely — the same use case serves HTTP, a CLI and a queue consumer with no change to the core.',
            es: 'Dirección del control, no importancia. Importa porque los primarios se pueden cambiar libremente: el mismo caso de uso sirve a HTTP, a una CLI y a un consumidor de cola sin tocar el núcleo.',
          },
        },
        {
          kind: 'boolean',
          id: 'hex-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Hexagonal architecture is the right choice for every project.',
            es: 'La arquitectura hexagonal es la elección correcta para todo proyecto.',
          },
          answer: false,
          explanation: {
            en: 'On a CRUD admin panel it adds an interface, an adapter and a mapper per table, and protects business rules that do not exist. The indirection has to be paid for by real domain complexity.',
            es: 'En un panel de administración CRUD añade una interfaz, un adaptador y un mapeador por tabla, y protege reglas de negocio que no existen. La indirección tiene que pagarla una complejidad de dominio real.',
          },
        },
        {
          kind: 'choice',
          id: 'hex-4',
          prompt: {
            en: 'What is the practical test that you have actually achieved this architecture?',
            es: '¿Cuál es la prueba práctica de que de verdad has conseguido esta arquitectura?',
          },
          choices: [
            { en: 'The folders are named correctly', es: 'Las carpetas tienen el nombre correcto' },
            {
              en: 'Every business rule can be unit-tested with no database, no network and no clock',
              es: 'Toda regla de negocio se puede testear sin base de datos, sin red y sin reloj',
            },
            { en: 'There is an interface for every class', es: 'Hay una interfaz por cada clase' },
            { en: 'The domain has no classes', es: 'El dominio no tiene clases' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Folder names are easy to fake; an import is not. If a domain test needs `docker compose up`, something in the centre is still reaching outwards.',
            es: 'Los nombres de carpeta son fáciles de fingir; un import no. Si un test de dominio necesita `docker compose up`, algo del centro sigue tirando hacia fuera.',
          },
        },
        {
          kind: 'gap',
          id: 'hex-5',
          prompt: {
            en: 'Complete the import so the dependency rule is respected.',
            es: 'Completa el import para que se respete la regla de dependencia.',
          },
          code: {
            en: `// adapters/postgres/orders.ts
import type { Orders } from '___'      // adapters may import the domain

export class PostgresOrders implements Orders {}`,
            es: `// adapters/postgres/orders.ts
import type { Orders } from '___'      // los adaptadores pueden importar el dominio

export class PostgresOrders implements Orders {}`,
          },
          choices: [
            '@/domain/ports',
            '@/adapters/postgres/types',
            'pg',
            '@/main',
          ],
          answerIndex: 0,
          explanation: {
            en: 'The adapter depends inwards on the domain’s port. The reverse import — domain reaching into `adapters/` — is the single rule this architecture exists to enforce.',
            es: 'El adaptador depende hacia dentro del puerto del dominio. El import inverso —el dominio metiéndose en `adapters/`— es la única regla que esta arquitectura existe para imponer.',
          },
        },
        {
          kind: 'order',
          id: 'hex-6',
          prompt: {
            en: 'Order a request through a hexagonal application.',
            es: 'Ordena el recorrido de una petición por una aplicación hexagonal.',
          },
          items: [
            {
              en: 'The HTTP adapter receives the request and maps it to a command',
              es: 'El adaptador HTTP recibe la petición y la convierte en un comando',
            },
            {
              en: 'The use case orchestrates the domain objects',
              es: 'El caso de uso orquesta los objetos de dominio',
            },
            {
              en: 'The domain applies the business rules',
              es: 'El dominio aplica las reglas de negocio',
            },
            {
              en: 'A driven adapter persists the result through its port',
              es: 'Un adaptador secundario persiste el resultado por su puerto',
            },
            {
              en: 'The HTTP adapter maps the result back to a response',
              es: 'El adaptador HTTP convierte el resultado en una respuesta',
            },
          ],
          explanation: {
            en: 'Notice the shape: infrastructure at both ends, domain in the middle, and the domain never learning that HTTP or Postgres exist.',
            es: 'Fíjate en la forma: infraestructura en los dos extremos, dominio en el centro, y el dominio sin enterarse jamás de que existen HTTP o Postgres.',
          },
        },
      ],
    },
    {
      id: 'microservices',
      title: { en: 'Microservices', es: 'Microservicios' },
      icon: '🧩',
      summary: {
        en: 'An organisational solution with a large technical bill.',
        es: 'Una solución organizativa con una factura técnica grande.',
      },
      concept: {
        headline: {
          en: 'Microservices buy independent deployment. Everything else they charge you for.',
          es: 'Los microservicios compran despliegue independiente. Todo lo demás te lo cobran.',
        },
        body: [
          {
            en: 'The real driver is team autonomy: twelve teams cannot ship safely through one pipeline. Splitting into independently deployable services lets each ship on its own schedule — that is the benefit, and it is a big one.',
            es: 'El motor real es la autonomía de equipos: doce equipos no pueden entregar con seguridad por un solo pipeline. Dividir en servicios desplegables por separado deja que cada uno entregue a su ritmo; ese es el beneficio, y es grande.',
          },
          {
            en: 'The bill: no cross-service transactions, network failure between every call, distributed tracing just to answer "what happened?", versioned contracts, and eventual consistency in places that used to be simple. Each is manageable; together they are a permanent tax.',
            es: 'La factura: sin transacciones entre servicios, fallo de red en cada llamada, trazado distribuido solo para responder "¿qué ha pasado?", contratos versionados y consistencia eventual en sitios que antes eran simples. Cada cosa es manejable; juntas son un impuesto permanente.',
          },
        ],
        keyPoints: [
          {
            en: 'The benefit is independent deployment and scaling — that is, team autonomy.',
            es: 'El beneficio es desplegar y escalar de forma independiente: es decir, autonomía de equipos.',
          },
          {
            en: 'Each service owns its data. A shared database means you built a distributed monolith.',
            es: 'Cada servicio es dueño de sus datos. Una base de datos compartida significa que hiciste un monolito distribuido.',
          },
          {
            en: 'ACID across services is gone. You get sagas and eventual consistency instead.',
            es: 'ACID entre servicios desaparece. A cambio tienes sagas y consistencia eventual.',
          },
          {
            en: 'Boundaries should follow business capabilities, not technical layers.',
            es: 'Las fronteras deben seguir capacidades de negocio, no capas técnicas.',
          },
        ],
        example: {
          caption: {
            en: 'The two ways to draw the boundary',
            es: 'Las dos formas de trazar la frontera',
          },
          code: {
            en: `// Wrong: technical layers. Every feature touches all three.
services: ui-service, business-logic-service, database-service

// Right: business capabilities. A feature usually lives in one.
services: ordering, billing, catalogue, shipping
          each with its OWN database, its own deploy, its own team`,
            es: `// Mal: capas técnicas. Cada funcionalidad toca las tres.
servicios: ui-service, business-logic-service, database-service

// Bien: capacidades de negocio. Una funcionalidad suele vivir en uno.
servicios: pedidos, facturación, catálogo, envíos
           cada uno con su PROPIA base de datos, su despliegue, su equipo`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'ms-1',
          prompt: {
            en: 'What is the primary benefit microservices actually deliver?',
            es: '¿Cuál es el beneficio principal que de verdad entregan los microservicios?',
          },
          choices: [
            { en: 'Better performance', es: 'Mejor rendimiento' },
            {
              en: 'Independent deployment and scaling — which is really team autonomy',
              es: 'Desplegar y escalar de forma independiente, que en realidad es autonomía de equipos',
            },
            { en: 'Less code', es: 'Menos código' },
            { en: 'Simpler debugging', es: 'Depuración más simple' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Performance usually gets worse, since in-process calls become network calls. What you gain is that team A ships on Tuesday without waiting for team B’s release train.',
            es: 'El rendimiento suele empeorar, ya que llamadas en proceso pasan a ser de red. Lo que ganas es que el equipo A entregue el martes sin esperar al tren de versiones del equipo B.',
          },
        },
        {
          kind: 'choice',
          id: 'ms-2',
          prompt: {
            en: 'Two services share one database. What have you built?',
            es: 'Dos servicios comparten una base de datos. ¿Qué has construido?',
          },
          choices: [
            { en: 'A sensible optimisation', es: 'Una optimización sensata' },
            {
              en: 'A distributed monolith — coupled at the schema, so neither can deploy or change independently',
              es: 'Un monolito distribuido: acoplados por el esquema, así que ninguno puede desplegar ni cambiar por separado',
            },
            { en: 'A modular monolith', es: 'Un monolito modular' },
            { en: 'Event-driven architecture', es: 'Arquitectura dirigida por eventos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It is the worst of both worlds: you pay the network tax and keep the coupling. A column rename now requires a coordinated deploy of two services — the exact thing you split to avoid.',
            es: 'Es lo peor de ambos mundos: pagas el impuesto de red y conservas el acoplamiento. Renombrar una columna ya exige un despliegue coordinado de dos servicios: justo lo que dividiste para evitar.',
          },
        },
        {
          kind: 'boolean',
          id: 'ms-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'You can keep ACID transactions across microservices.',
            es: 'Puedes mantener transacciones ACID entre microservicios.',
          },
          answer: false,
          explanation: {
            en: 'Not in any practical way. Distributed transactions exist but couple services back together and fail badly under partition. The real answer is a saga: local transactions plus compensating actions.',
            es: 'No de forma práctica. Las transacciones distribuidas existen pero vuelven a acoplar los servicios y fallan mal ante una partición. La respuesta real es una saga: transacciones locales más acciones de compensación.',
          },
        },
        {
          kind: 'choice',
          id: 'ms-4',
          prompt: {
            en: 'How should service boundaries be drawn?',
            es: '¿Cómo deben trazarse las fronteras entre servicios?',
          },
          choices: [
            { en: 'By technical layer — UI, logic, data', es: 'Por capa técnica: interfaz, lógica, datos' },
            {
              en: 'By business capability, so a typical change lands inside one service',
              es: 'Por capacidad de negocio, para que un cambio típico caiga dentro de un servicio',
            },
            { en: 'By programming language', es: 'Por lenguaje de programación' },
            { en: 'By team seniority', es: 'Por antigüedad del equipo' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Layer-based services mean every feature needs three coordinated deploys — all the cost, none of the autonomy. The test of a good boundary is that most changes fit inside it.',
            es: 'Los servicios por capas hacen que cada funcionalidad necesite tres despliegues coordinados: todo el coste y nada de la autonomía. La prueba de una buena frontera es que la mayoría de cambios quepan dentro.',
          },
        },
        {
          kind: 'choice',
          id: 'ms-5',
          prompt: {
            en: 'Which cost is easiest to underestimate when adopting microservices?',
            es: '¿Qué coste es más fácil de subestimar al adoptar microservicios?',
          },
          choices: [
            { en: 'Cloud bills', es: 'La factura de la nube' },
            {
              en: 'Operational: tracing, versioned contracts, local development, and debugging across services',
              es: 'El operativo: trazado, contratos versionados, desarrollo local y depurar entre servicios',
            },
            { en: 'Writing the code', es: 'Escribir el código' },
            { en: 'Choosing a language', es: 'Elegir lenguaje' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Splitting the code is the easy week. The permanent tax is everything after: running twelve services on a laptop, correlating a failure across four of them, and never breaking a contract you cannot see all consumers of.',
            es: 'Dividir el código es la semana fácil. El impuesto permanente es todo lo que viene después: levantar doce servicios en un portátil, correlacionar un fallo entre cuatro y no romper nunca un contrato cuyos consumidores no ves.',
          },
        },
        {
          kind: 'choice',
          id: 'ms-6',
          prompt: {
            en: 'What does Conway’s Law predict about your architecture?',
            es: '¿Qué predice la ley de Conway sobre tu arquitectura?',
          },
          choices: [
            { en: 'It will get slower over time', es: 'Que será más lenta con el tiempo' },
            {
              en: 'It will end up mirroring your organisation’s communication structure',
              es: 'Que acabará reflejando la estructura de comunicación de tu organización',
            },
            { en: 'It will need rewriting every 5 years', es: 'Que habrá que reescribirla cada 5 años' },
            { en: 'It will become a monolith', es: 'Que se convertirá en un monolito' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Four teams produce four components, whatever the diagram said. The practical consequence — the "inverse Conway manoeuvre" — is that if you want a certain architecture, you shape the teams to match it first.',
            es: 'Cuatro equipos producen cuatro componentes, diga lo que diga el diagrama. La consecuencia práctica —la "maniobra inversa de Conway"— es que si quieres cierta arquitectura, primero organizas los equipos para que encajen con ella.',
          },
        },
      ],
    },
    {
      id: 'service-communication',
      title: { en: 'How services talk', es: 'Cómo se comunican los servicios' },
      icon: '📞',
      summary: {
        en: 'Synchronous or asynchronous — the decision that shapes everything else.',
        es: 'Síncrono o asíncrono: la decisión que da forma a todo lo demás.',
      },
      concept: {
        headline: {
          en: 'Every synchronous call you add is another service whose downtime becomes your downtime.',
          es: 'Cada llamada síncrona que añades es otro servicio cuya caída se convierte en tu caída.',
        },
        body: [
          {
            en: 'Synchronous (HTTP, gRPC) is simple and immediate, and it chains availability: if your endpoint calls four services that are each up 99.9% of the time, your ceiling is 99.6%. Add a fifth and it drops again.',
            es: 'Lo síncrono (HTTP, gRPC) es simple e inmediato, y encadena disponibilidad: si tu endpoint llama a cuatro servicios que están al 99,9% cada uno, tu techo es 99,6%. Añade un quinto y baja otra vez.',
          },
          {
            en: 'Asynchronous (queues, events) decouples availability — the consumer can be down and the message waits — at the price of eventual consistency and much harder tracing. Neither is correct; the question is always which failure you prefer.',
            es: 'Lo asíncrono (colas, eventos) desacopla la disponibilidad —el consumidor puede estar caído y el mensaje espera— a cambio de consistencia eventual y trazado mucho más difícil. Ninguno es correcto; la pregunta siempre es qué fallo prefieres.',
          },
        ],
        keyPoints: [
          {
            en: 'Synchronous chains availability: multiply the uptimes to see your real ceiling.',
            es: 'Lo síncrono encadena disponibilidad: multiplica los uptimes para ver tu techo real.',
          },
          {
            en: 'Asynchronous survives a consumer outage but gives you eventual consistency.',
            es: 'Lo asíncrono sobrevive a la caída del consumidor pero te da consistencia eventual.',
          },
          {
            en: 'An API gateway is the single front door: auth, routing, rate limiting, TLS.',
            es: 'Un API gateway es la puerta única: autenticación, enrutado, límites de ritmo, TLS.',
          },
          {
            en: 'A service mesh moves retries, timeouts and mTLS out of your code into the platform.',
            es: 'Un service mesh saca de tu código los reintentos, timeouts y mTLS y los lleva a la plataforma.',
          },
        ],
        example: {
          caption: {
            en: 'Availability multiplies, and not in your favour',
            es: 'La disponibilidad se multiplica, y no a tu favor',
          },
          code: {
            en: `// Synchronous chain: your endpoint is only as available as the product
checkout -> inventory (99.9%) -> pricing (99.9%) -> tax (99.9%) -> fraud (99.9%)
           0.999^4 = 99.6%  ->  ~3 hours of downtime a month

// Asynchronous: fraud check can be down for an hour and nothing is lost
checkout -> (queue) -> fraud worker`,
            es: `// Cadena síncrona: tu endpoint solo está tan disponible como el producto
checkout -> inventario (99,9%) -> precios (99,9%) -> impuestos (99,9%) -> fraude (99,9%)
           0,999^4 = 99,6%  ->  ~3 horas de caída al mes

// Asíncrono: fraude puede estar caído una hora y no se pierde nada
checkout -> (cola) -> worker de fraude`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'svc-1',
          prompt: {
            en: 'Your endpoint synchronously calls four services, each 99.9% available. What is your ceiling?',
            es: 'Tu endpoint llama síncronamente a cuatro servicios, cada uno al 99,9%. ¿Cuál es tu techo?',
          },
          choices: ['99.9%', '99.6%', '99.99%', '100%'],
          answerIndex: 1,
          explanation: {
            en: '0.999⁴ ≈ 0.996 — about three hours of downtime a month that is not your fault and that you cannot fix in your own code. Every synchronous dependency you add makes it worse.',
            es: '0,999⁴ ≈ 0,996: unas tres horas de caída al mes que no son culpa tuya y que no puedes arreglar en tu código. Cada dependencia síncrona que añades lo empeora.',
          },
        },
        {
          kind: 'choice',
          id: 'svc-2',
          prompt: {
            en: 'What do you gain and lose by making a call asynchronous?',
            es: '¿Qué ganas y qué pierdes al hacer una llamada asíncrona?',
          },
          choices: [
            { en: 'Gain speed, lose nothing', es: 'Ganas velocidad y no pierdes nada' },
            {
              en: 'Gain availability and spike absorption; lose immediate consistency and easy tracing',
              es: 'Ganas disponibilidad y absorción de picos; pierdes consistencia inmediata y trazado sencillo',
            },
            { en: 'Gain consistency, lose speed', es: 'Ganas consistencia y pierdes velocidad' },
            { en: 'Nothing changes', es: 'No cambia nada' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The producer stops caring whether the consumer is up. In exchange, "is it done yet?" has no immediate answer, and following one user’s journey now means correlating across a queue.',
            es: 'Al productor deja de importarle si el consumidor está en pie. A cambio, "¿ya está hecho?" no tiene respuesta inmediata, y seguir el recorrido de un usuario pasa por correlacionar a través de una cola.',
          },
        },
        {
          kind: 'boolean',
          id: 'svc-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A service mesh removes the need to think about retries and timeouts.',
            es: 'Un service mesh elimina la necesidad de pensar en reintentos y timeouts.',
          },
          answer: false,
          explanation: {
            en: 'It moves them out of your code, which is valuable — but you still choose the policy, and a mesh retrying a non-idempotent call is exactly as dangerous as your code doing it.',
            es: 'Los saca de tu código, lo cual vale mucho, pero la política sigue eligiéndola tú, y un mesh reintentando una llamada no idempotente es exactamente igual de peligroso que si lo hace tu código.',
          },
        },
        {
          kind: 'choice',
          id: 'svc-4',
          prompt: {
            en: 'What is an API gateway for?',
            es: '¿Para qué sirve un API gateway?',
          },
          choices: [
            { en: 'Storing data', es: 'Guardar datos' },
            {
              en: 'A single front door: routing, authentication, rate limiting and TLS in one place',
              es: 'Una puerta única: enrutado, autenticación, límites de ritmo y TLS en un solo sitio',
            },
            { en: 'Running background jobs', es: 'Ejecutar trabajos en segundo plano' },
            { en: 'Replacing the load balancer', es: 'Sustituir al balanceador de carga' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Without it, every service reimplements auth and rate limiting, and they drift. It is the Facade pattern at infrastructure scale — one simple door in front of many subsystems.',
            es: 'Sin él, cada servicio reimplementa autenticación y límites, y divergen. Es el patrón Facade a escala de infraestructura: una puerta simple delante de muchos subsistemas.',
          },
        },
        {
          kind: 'choice',
          id: 'svc-5',
          prompt: {
            en: 'When is a synchronous call clearly the right choice?',
            es: '¿Cuándo es claramente correcta una llamada síncrona?',
          },
          choices: [
            { en: 'Always, it is simpler', es: 'Siempre, es más simple' },
            {
              en: 'When the caller genuinely cannot continue without the answer — an authorisation check, a price',
              es: 'Cuando quien llama de verdad no puede seguir sin la respuesta: una autorización, un precio',
            },
            { en: 'When the service is slow', es: 'Cuando el servicio es lento' },
            { en: 'Never', es: 'Nunca' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The test is whether the answer changes what happens next. Sending a receipt does not — that belongs on a queue. Deciding whether the card was accepted does.',
            es: 'La prueba es si la respuesta cambia lo que pasa a continuación. Enviar un recibo no lo cambia: eso va en una cola. Decidir si se aceptó la tarjeta sí.',
          },
        },
        {
          kind: 'choice',
          id: 'svc-6',
          prompt: {
            en: 'Service A calls B, which calls C, which calls A. What have you created?',
            es: 'El servicio A llama a B, que llama a C, que llama a A. ¿Qué has creado?',
          },
          choices: [
            { en: 'A mesh', es: 'Una malla' },
            {
              en: 'A circular dependency — a cascading failure and a deadlock waiting to happen',
              es: 'Una dependencia circular: un fallo en cascada y un interbloqueo esperando a ocurrir',
            },
            { en: 'An event-driven system', es: 'Un sistema dirigido por eventos' },
            { en: 'Nothing unusual', es: 'Nada raro' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The same cycle rule as modules, now with timeouts and thread pools attached. Under load all three exhaust their connection pools waiting for each other, and none can recover without a restart.',
            es: 'La misma regla de ciclos que entre módulos, ahora con timeouts y pools de hilos. Bajo carga los tres agotan sus pools de conexiones esperándose y ninguno se recupera sin reiniciar.',
          },
        },
      ],
    },
    {
      id: 'event-driven',
      title: { en: 'Event-driven architecture', es: 'Arquitectura dirigida por eventos' },
      icon: '⚡',
      summary: {
        en: 'Announce what happened; let anyone who cares react.',
        es: 'Anuncia lo que pasó; que reaccione quien le interese.',
      },
      concept: {
        headline: {
          en: 'An event is a fact about the past. A command is a request for the future.',
          es: 'Un evento es un hecho del pasado. Un comando es una petición sobre el futuro.',
        },
        body: [
          {
            en: '`OrderPlaced` already happened and cannot be refused. `PlaceOrder` is a request that can be rejected. That grammatical difference decides the coupling: publishers of events do not know or care who listens, while senders of commands are addressing someone specific.',
            es: '`OrderPlaced` ya ocurrió y no se puede rechazar. `PlaceOrder` es una petición que se puede rechazar. Esa diferencia gramatical decide el acoplamiento: quien publica eventos no sabe ni le importa quién escucha, mientras que quien manda comandos se dirige a alguien concreto.',
          },
          {
            en: 'It is the Observer pattern across machines, and it inherits the same trade: adding a consumer costs nothing, but no single place describes what happens when an order is placed. Event choreography is powerful and genuinely hard to debug.',
            es: 'Es el patrón Observer entre máquinas, y hereda el mismo trato: añadir un consumidor no cuesta nada, pero ningún sitio describe qué ocurre cuando se hace un pedido. La coreografía de eventos es potente y realmente difícil de depurar.',
          },
        ],
        keyPoints: [
          {
            en: 'Events are past tense and immutable: `OrderPlaced`, never `PlaceOrder`.',
            es: 'Los eventos van en pasado y son inmutables: `OrderPlaced`, nunca `PlaceOrder`.',
          },
          {
            en: 'Choreography: services react to events. Orchestration: one coordinator directs them.',
            es: 'Coreografía: los servicios reaccionan a eventos. Orquestación: un coordinador los dirige.',
          },
          {
            en: 'Consumers must be idempotent — at-least-once delivery is the norm.',
            es: 'Los consumidores deben ser idempotentes: la entrega "al menos una vez" es la norma.',
          },
          {
            en: 'Event schemas are contracts. Version them, and never remove a field in place.',
            es: 'Los esquemas de eventos son contratos. Versiónalos y nunca quites un campo sobre la marcha.',
          },
        ],
        example: {
          caption: {
            en: 'A fact, not an instruction',
            es: 'Un hecho, no una instrucción',
          },
          code: {
            en: `// Event: past tense, immutable, addressed to nobody in particular
{ type: 'OrderPlaced', orderId: 'ord_1', totalCents: 4999, at: '2026-08-20T…' }

// Command: imperative, addressed to one handler, can be rejected
{ type: 'PlaceOrder', cart: [...] }

// Choreography: billing, shipping and analytics each subscribe.
// Nobody had to change the publisher to add the fourth consumer.`,
            es: `// Evento: en pasado, inmutable, sin destinatario concreto
{ type: 'OrderPlaced', orderId: 'ord_1', totalCents: 4999, at: '2026-08-20T…' }

// Comando: imperativo, dirigido a un manejador, se puede rechazar
{ type: 'PlaceOrder', cart: [...] }

// Coreografía: facturación, envíos y analítica se suscriben cada uno.
// Nadie tuvo que tocar al emisor para añadir el cuarto consumidor.`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'eda-1',
          prompt: {
            en: 'What is the difference between an event and a command?',
            es: '¿Cuál es la diferencia entre un evento y un comando?',
          },
          choices: [
            { en: 'Events are faster', es: 'Los eventos son más rápidos' },
            {
              en: 'An event states a fact that already happened; a command requests something that may be refused',
              es: 'Un evento declara un hecho que ya ocurrió; un comando pide algo que se puede rechazar',
            },
            { en: 'Commands use queues, events do not', es: 'Los comandos usan colas y los eventos no' },
            { en: 'They are the same', es: 'Son lo mismo' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The tense carries the coupling. Naming an event `SendEmail` instead of `OrderPlaced` quietly tells the publisher what the consumer does — and you have re-coupled them without noticing.',
            es: 'El tiempo verbal lleva el acoplamiento. Llamar a un evento `SendEmail` en vez de `OrderPlaced` le dice en silencio al emisor lo que hace el consumidor, y los has vuelto a acoplar sin darte cuenta.',
          },
        },
        {
          kind: 'choice',
          id: 'eda-2',
          prompt: {
            en: 'Choreography or orchestration — what is the trade?',
            es: 'Coreografía u orquestación: ¿cuál es el trato?',
          },
          choices: [
            { en: 'Orchestration is always better', es: 'La orquestación siempre es mejor' },
            {
              en: 'Choreography couples less but no single place describes the flow; orchestration is traceable but centralises knowledge',
              es: 'La coreografía acopla menos pero ningún sitio describe el flujo; la orquestación se sigue mejor pero centraliza el conocimiento',
            },
            { en: 'Choreography is faster', es: 'La coreografía es más rápida' },
            { en: 'They are identical', es: 'Son idénticas' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'With choreography, "what happens when an order is placed?" is answered by searching six repositories. With orchestration it is one file — which is also one more thing that must be deployed to add a step.',
            es: 'Con coreografía, "¿qué pasa cuando se hace un pedido?" se responde buscando en seis repositorios. Con orquestación es un fichero, que también es una cosa más que hay que desplegar para añadir un paso.',
          },
        },
        {
          kind: 'boolean',
          id: 'eda-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'You can safely remove a field from a published event schema once you stop using it.',
            es: 'Puedes quitar sin riesgo un campo del esquema de un evento publicado en cuanto dejas de usarlo.',
          },
          answer: false,
          explanation: {
            en: 'You do not know who consumes it — that is the entire point of publishing. It is the same rule as an HTTP API: adding a field is safe, removing one is a breaking change that needs a version and a deprecation window.',
            es: 'No sabes quién lo consume: ese es todo el sentido de publicar. Es la misma regla que en una API HTTP: añadir un campo es seguro, quitarlo rompe el contrato y necesita versión y periodo de obsolescencia.',
          },
        },
        {
          kind: 'choice',
          id: 'eda-4',
          prompt: {
            en: 'Why must an event consumer be idempotent?',
            es: '¿Por qué un consumidor de eventos debe ser idempotente?',
          },
          choices: [
            { en: 'To run faster', es: 'Para ir más rápido' },
            {
              en: 'Delivery is at-least-once, so the same event will eventually be delivered twice',
              es: 'La entrega es "al menos una vez", así que el mismo evento acabará entregándose dos veces',
            },
            { en: 'To reduce cost', es: 'Para reducir costes' },
            { en: 'To support ordering', es: 'Para soportar el orden' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It is not a rare edge case — it is guaranteed to happen. A consumer that dies after acting but before acknowledging will see the event again, and without idempotency that is a duplicate refund or a second email.',
            es: 'No es un caso raro: está garantizado que ocurra. Un consumidor que muere después de actuar pero antes de confirmar volverá a ver el evento, y sin idempotencia eso es un reembolso duplicado o un segundo correo.',
          },
        },
        {
          kind: 'choice',
          id: 'eda-5',
          prompt: {
            en: 'What is the hardest part of running an event-driven system in practice?',
            es: '¿Qué es lo más difícil en la práctica de operar un sistema dirigido por eventos?',
          },
          choices: [
            { en: 'Writing the publishers', es: 'Escribir los emisores' },
            {
              en: 'Answering "why did this happen?" when the flow is spread across many independent consumers',
              es: 'Responder "¿por qué ha pasado esto?" cuando el flujo está repartido entre muchos consumidores independientes',
            },
            { en: 'Choosing a message broker', es: 'Elegir un broker de mensajes' },
            { en: 'Serialising the events', es: 'Serializar los eventos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'This is why correlation ids and distributed tracing stop being nice-to-haves. Without them, debugging means reading six services’ logs and guessing at the order.',
            es: 'Por eso los ids de correlación y el trazado distribuido dejan de ser un lujo. Sin ellos, depurar es leer los logs de seis servicios y adivinar el orden.',
          },
        },
        {
          kind: 'choice',
          id: 'eda-6',
          prompt: {
            en: 'An event is named `SendConfirmationEmail`. What is wrong?',
            es: 'Un evento se llama `SendConfirmationEmail`. ¿Qué falla?',
          },
          choices: [
            { en: 'The name is too long', es: 'El nombre es demasiado largo' },
            {
              en: 'It is a command in disguise — the publisher is now dictating what the consumer must do',
              es: 'Es un comando disfrazado: el emisor está dictando lo que debe hacer el consumidor',
            },
            { en: 'It should be lowercase', es: 'Debería ir en minúsculas' },
            { en: 'Nothing', es: 'Nada' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The decoupling is gone: checkout now knows an email exists. `OrderPlaced` lets the mail service decide whether to send anything, and lets a fifth consumer appear without checkout ever hearing about it.',
            es: 'El desacoplamiento desapareció: checkout ya sabe que existe un correo. `OrderPlaced` deja que el servicio de correo decida si envía algo, y permite que aparezca un quinto consumidor sin que checkout se entere.',
          },
        },
      ],
    },
    {
      id: 'cqrs',
      title: { en: 'CQRS & Event Sourcing', es: 'CQRS y Event Sourcing' },
      icon: '📚',
      summary: {
        en: 'Split reads from writes; store the history instead of the snapshot.',
        es: 'Separa lecturas de escrituras; guarda la historia en vez de la foto.',
      },
      concept: {
        headline: {
          en: 'CQRS splits the read model from the write model. Event sourcing stores the events, not the state.',
          es: 'CQRS separa el modelo de lectura del de escritura. El event sourcing guarda los eventos, no el estado.',
        },
        body: [
          {
            en: 'They are two independent ideas that get mentioned together. CQRS says the shape you write is not the shape you read: writes want normalised and validated, reads want denormalised and fast. Splitting them lets each be optimised and scaled separately.',
            es: 'Son dos ideas independientes que se mencionan juntas. CQRS dice que la forma en que escribes no es la forma en que lees: las escrituras quieren estar normalizadas y validadas, las lecturas denormalizadas y rápidas. Separarlas permite optimizar y escalar cada una por su lado.',
          },
          {
            en: 'Event sourcing goes further: instead of storing the current balance, store every deposit and withdrawal and derive the balance. You gain a perfect audit trail and time travel; you pay with replay complexity, schema evolution and the fact that you can never truly delete — which collides with GDPR.',
            es: 'El event sourcing va más lejos: en vez de guardar el saldo actual, guarda cada ingreso y reintegro y deriva el saldo. Ganas una auditoría perfecta y viajes en el tiempo; pagas con complejidad de reproducción, evolución de esquemas y el hecho de que nunca puedes borrar de verdad, lo que choca con el RGPD.',
          },
        ],
        keyPoints: [
          {
            en: 'CQRS: separate models for reading and writing. It does NOT require two databases.',
            es: 'CQRS: modelos separados para leer y escribir. NO exige dos bases de datos.',
          },
          {
            en: 'With separate stores, the read side is eventually consistent — the UI must handle it.',
            es: 'Con almacenes separados, el lado de lectura es eventualmente consistente y la interfaz debe asumirlo.',
          },
          {
            en: 'Event sourcing: the event log is the source of truth; state is a projection of it.',
            es: 'Event sourcing: el log de eventos es la fuente de verdad; el estado es una proyección suya.',
          },
          {
            en: 'Snapshots exist so you do not replay ten years of events to answer one question.',
            es: 'Las instantáneas existen para no reproducir diez años de eventos por una sola pregunta.',
          },
        ],
        example: {
          caption: {
            en: 'State as a fold over history',
            es: 'El estado como un pliegue sobre la historia',
          },
          code: {
            en: `// Stored: what happened. Nothing is ever overwritten.
const events = [
  { type: 'AccountOpened', at: '2026-01-01' },
  { type: 'Deposited', cents: 10_000 },
  { type: 'Withdrew', cents: 2_500 },
]

// Derived: the current state, whenever you need it
const balance = events.reduce((cents, e) =>
  e.type === 'Deposited' ? cents + e.cents :
  e.type === 'Withdrew'  ? cents - e.cents : cents, 0)   // 7500

// And "what was the balance in March?" is just a shorter fold.`,
            es: `// Guardado: lo que pasó. Nada se sobrescribe nunca.
const events = [
  { type: 'AccountOpened', at: '2026-01-01' },
  { type: 'Deposited', cents: 10_000 },
  { type: 'Withdrew', cents: 2_500 },
]

// Derivado: el estado actual, cuando lo necesites
const balance = events.reduce((cents, e) =>
  e.type === 'Deposited' ? cents + e.cents :
  e.type === 'Withdrew'  ? cents - e.cents : cents, 0)   // 7500

// Y "¿cuál era el saldo en marzo?" es solo un pliegue más corto.`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'cqrs-1',
          prompt: {
            en: 'What does CQRS actually separate?',
            es: '¿Qué separa realmente CQRS?',
          },
          choices: [
            { en: 'Frontend from backend', es: 'Frontend de backend' },
            {
              en: 'The model used for writing from the model used for reading',
              es: 'El modelo que se usa para escribir del que se usa para leer',
            },
            { en: 'Services from databases', es: 'Servicios de bases de datos' },
            { en: 'Tests from production code', es: 'Tests de código de producción' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Writes want normalised, validated, transactional. Reads want the exact denormalised shape the screen needs. Forcing one model to be both is why so many queries end up as six-table joins.',
            es: 'Las escrituras quieren estar normalizadas, validadas y ser transaccionales. Las lecturas quieren la forma denormalizada exacta que necesita la pantalla. Forzar un modelo a ser ambas cosas es por lo que tantas consultas acaban siendo joins de seis tablas.',
          },
        },
        {
          kind: 'boolean',
          id: 'cqrs-2',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'CQRS requires two separate databases.',
            es: 'CQRS exige dos bases de datos separadas.',
          },
          answer: false,
          explanation: {
            en: 'Two models in one database is CQRS, and it is where most teams should stop. Separate stores add real throughput and real eventual consistency — take that step only when the read load demands it.',
            es: 'Dos modelos en una base de datos es CQRS, y es donde la mayoría de equipos deberían quedarse. Almacenes separados añaden caudal real y consistencia eventual real: da ese paso solo cuando la carga de lectura lo exija.',
          },
        },
        {
          kind: 'choice',
          id: 'cqrs-3',
          prompt: {
            en: 'A user saves a change and immediately does not see it. Which architecture explains this?',
            es: 'Un usuario guarda un cambio y no lo ve al instante. ¿Qué arquitectura lo explica?',
          },
          choices: [
            { en: 'A caching bug', es: 'Un bug de caché' },
            {
              en: 'CQRS with separate stores — the read model has not caught up yet',
              es: 'CQRS con almacenes separados: el modelo de lectura aún no se ha puesto al día',
            },
            { en: 'A database deadlock', es: 'Un interbloqueo de base de datos' },
            { en: 'A failed transaction', es: 'Una transacción fallida' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'This is the cost, not a defect. It has to be designed for in the UI — show the user their own pending change optimistically rather than re-reading a projection that lags by 200ms.',
            es: 'Es el coste, no un defecto. Hay que diseñarlo en la interfaz: muestra al usuario su propio cambio de forma optimista en vez de releer una proyección que va 200ms por detrás.',
          },
        },
        {
          kind: 'choice',
          id: 'cqrs-4',
          prompt: {
            en: 'What is the source of truth in an event-sourced system?',
            es: '¿Cuál es la fuente de verdad en un sistema con event sourcing?',
          },
          choices: [
            { en: 'The current state table', es: 'La tabla de estado actual' },
            {
              en: 'The append-only event log — state is derived from it',
              es: 'El log de eventos, que solo crece: el estado se deriva de él',
            },
            { en: 'The cache', es: 'La caché' },
            { en: 'The API responses', es: 'Las respuestas de la API' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'That inversion is what buys you the audit trail and time travel: any past state can be rebuilt by folding the log up to a point. Snapshots are just an optimisation over that fold.',
            es: 'Esa inversión es lo que compra la auditoría y el viaje en el tiempo: cualquier estado pasado se reconstruye plegando el log hasta un punto. Las instantáneas son solo una optimización sobre ese pliegue.',
          },
        },
        {
          kind: 'choice',
          id: 'cqrs-5',
          prompt: {
            en: 'Which is a genuinely hard problem in event sourcing?',
            es: '¿Cuál es un problema realmente difícil del event sourcing?',
          },
          choices: [
            { en: 'Writing events is slow', es: 'Escribir eventos es lento' },
            {
              en: 'Deleting personal data — the log is immutable, and GDPR expects erasure',
              es: 'Borrar datos personales: el log es inmutable y el RGPD espera que se puedan borrar',
            },
            { en: 'Events cannot be indexed', es: 'Los eventos no se pueden indexar' },
            { en: 'It needs NoSQL', es: 'Necesita NoSQL' },
          ],
          answerIndex: 1,
          explanation: {
            en: '"Never delete anything" and "the user has a right to erasure" are in direct conflict. The usual answer is crypto-shredding — encrypt personal data per user and destroy the key — which is real work you must plan for.',
            es: '"No borres nunca nada" y "el usuario tiene derecho al borrado" chocan de frente. La respuesta habitual es el crypto-shredding —cifrar los datos personales por usuario y destruir la clave—, que es trabajo real que hay que planificar.',
          },
        },
        {
          kind: 'choice',
          id: 'cqrs-6',
          prompt: {
            en: 'What are snapshots for in an event-sourced system?',
            es: '¿Para qué sirven las instantáneas en un sistema con event sourcing?',
          },
          choices: [
            { en: 'Backups', es: 'Copias de seguridad' },
            {
              en: 'To avoid replaying the entire history every time you need current state',
              es: 'Para no reproducir toda la historia cada vez que necesitas el estado actual',
            },
            { en: 'To delete old events', es: 'Para borrar eventos antiguos' },
            { en: 'To compress the log', es: 'Para comprimir el log' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Folding ten years of events to show a balance is not viable. A snapshot every thousand events means you replay at most a thousand — and the log stays the source of truth underneath.',
            es: 'Plegar diez años de eventos para mostrar un saldo no es viable. Una instantánea cada mil eventos significa reproducir como mucho mil, y el log sigue siendo la fuente de verdad por debajo.',
          },
        },
      ],
    },
    {
      id: 'resilience',
      title: { en: 'Resilience patterns', es: 'Patrones de resiliencia' },
      icon: '🛟',
      summary: {
        en: 'Circuit breakers, bulkheads, retries and sagas.',
        es: 'Cortacircuitos, mamparos, reintentos y sagas.',
      },
      concept: {
        headline: {
          en: 'In a distributed system, failure is a normal operating condition — design for it, not around it.',
          es: 'En un sistema distribuido, el fallo es una condición normal de operación: diséñalo, no lo esquives.',
        },
        body: [
          {
            en: 'A CIRCUIT BREAKER stops calling a service that is clearly down, failing fast instead of piling up timeouts. A BULKHEAD limits how much of your capacity any one dependency can consume, so a slow service cannot exhaust every thread you have.',
            es: 'Un CORTACIRCUITOS deja de llamar a un servicio claramente caído y falla rápido en vez de acumular timeouts. Un MAMPARO limita cuánta de tu capacidad puede consumir una dependencia, para que un servicio lento no agote todos tus hilos.',
          },
          {
            en: 'A SAGA replaces the distributed transaction you cannot have: a sequence of local transactions, each with a compensating action that undoes it. Reserve stock, charge card, ship — and if shipping fails, refund and release.',
            es: 'Una SAGA sustituye a la transacción distribuida que no puedes tener: una secuencia de transacciones locales, cada una con una acción de compensación que la deshace. Reserva stock, cobra tarjeta, envía; y si el envío falla, reembolsa y libera.',
          },
        ],
        keyPoints: [
          {
            en: 'Circuit breaker states: closed (normal) → open (failing fast) → half-open (testing recovery).',
            es: 'Estados del cortacircuitos: cerrado (normal) → abierto (falla rápido) → semiabierto (probando recuperación).',
          },
          {
            en: 'Bulkhead: separate pools per dependency, so one slow service cannot take everything.',
            es: 'Mamparo: pools separados por dependencia, para que un servicio lento no se lo lleve todo.',
          },
          {
            en: 'Retry needs backoff, jitter, a cap, and an idempotent target. All four.',
            es: 'Un reintento necesita espera creciente, aleatoriedad, un tope y un destino idempotente. Los cuatro.',
          },
          {
            en: 'Saga: local transactions plus compensations. Compensation is business logic, not rollback.',
            es: 'Saga: transacciones locales más compensaciones. Compensar es lógica de negocio, no un rollback.',
          },
        ],
        example: {
          caption: {
            en: 'Compensation is not rollback',
            es: 'Compensar no es hacer rollback',
          },
          code: {
            en: `// Forward path                 Compensation if a later step fails
1. reserveStock(items)         -> releaseStock(reservation)
2. chargeCard(cents)           -> refundCard(paymentId)
3. createShipment(address)     -> cancelShipment(shipmentId)

// Note: a refund is a NEW business fact, not an undo.
// The customer saw the charge. Both events stay in the history.`,
            es: `// Camino normal                 Compensación si falla un paso posterior
1. reservarStock(items)        -> liberarStock(reserva)
2. cobrarTarjeta(céntimos)     -> reembolsarTarjeta(pagoId)
3. crearEnvío(dirección)       -> cancelarEnvío(envíoId)

// Ojo: un reembolso es un HECHO de negocio nuevo, no un deshacer.
// El cliente vio el cargo. Los dos eventos quedan en la historia.`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'res-1',
          prompt: {
            en: 'What does a circuit breaker do when it is "open"?',
            es: '¿Qué hace un cortacircuitos cuando está "abierto"?',
          },
          choices: [
            { en: 'Retries continuously', es: 'Reintenta continuamente' },
            {
              en: 'Fails immediately without calling the service, giving it room to recover',
              es: 'Falla de inmediato sin llamar al servicio, dándole aire para recuperarse',
            },
            { en: 'Queues the requests', es: 'Encola las peticiones' },
            { en: 'Routes to a different region', es: 'Enruta a otra región' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Failing fast protects both sides: you stop burning threads on calls that will time out, and the struggling service stops being hammered while it tries to come back.',
            es: 'Fallar rápido protege a ambos lados: dejas de quemar hilos en llamadas que van a expirar, y el servicio que sufre deja de recibir golpes mientras intenta volver.',
          },
        },
        {
          kind: 'choice',
          id: 'res-2',
          prompt: {
            en: 'What problem does a bulkhead solve?',
            es: '¿Qué problema resuelve un mamparo?',
          },
          choices: [
            { en: 'Slow databases', es: 'Bases de datos lentas' },
            {
              en: 'One slow dependency consuming every thread or connection, taking the whole service down with it',
              es: 'Que una dependencia lenta consuma todos los hilos o conexiones y se lleve por delante el servicio entero',
            },
            { en: 'Duplicate messages', es: 'Mensajes duplicados' },
            { en: 'Data loss', es: 'Pérdida de datos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Named after ship compartments: one flooded section must not sink the vessel. Capping the recommendations service at ten connections means it can be down without checkout ever noticing.',
            es: 'El nombre viene de los compartimentos de un barco: una sección inundada no debe hundir el buque. Limitar el servicio de recomendaciones a diez conexiones permite que se caiga sin que checkout se entere.',
          },
        },
        {
          kind: 'boolean',
          id: 'res-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A saga can roll back like a database transaction.',
            es: 'Una saga puede hacer rollback como una transacción de base de datos.',
          },
          answer: false,
          explanation: {
            en: 'It compensates, which is not the same. A rollback erases history; a refund is a new fact that both parties saw. Compensations are business decisions and sometimes cannot fully undo what happened.',
            es: 'Compensa, que no es lo mismo. Un rollback borra la historia; un reembolso es un hecho nuevo que ambas partes vieron. Las compensaciones son decisiones de negocio y a veces no pueden deshacer del todo lo ocurrido.',
          },
        },
        {
          kind: 'order',
          id: 'res-4',
          prompt: {
            en: 'Order the states of a circuit breaker through one failure and recovery.',
            es: 'Ordena los estados de un cortacircuitos en un fallo y su recuperación.',
          },
          items: [
            { en: 'Closed — calls pass through normally', es: 'Cerrado: las llamadas pasan con normalidad' },
            {
              en: 'The failure threshold is crossed',
              es: 'Se cruza el umbral de fallos',
            },
            { en: 'Open — calls fail immediately', es: 'Abierto: las llamadas fallan de inmediato' },
            {
              en: 'Half-open — a trial call is allowed through',
              es: 'Semiabierto: se deja pasar una llamada de prueba',
            },
            {
              en: 'Closed again once the trial succeeds',
              es: 'Cerrado otra vez si la prueba funciona',
            },
          ],
          explanation: {
            en: 'The half-open state is what makes it automatic. Without a trial call, someone has to notice and reset it by hand — and that is how a five-minute blip becomes an hour of downtime.',
            es: 'El estado semiabierto es lo que lo hace automático. Sin una llamada de prueba, alguien tiene que darse cuenta y reiniciarlo a mano, y así es como un parpadeo de cinco minutos se convierte en una hora de caída.',
          },
        },
        {
          kind: 'choice',
          id: 'res-5',
          prompt: {
            en: 'Which combination makes a retry safe?',
            es: '¿Qué combinación hace seguro un reintento?',
          },
          choices: [
            { en: 'Retry immediately, forever', es: 'Reintentar de inmediato, para siempre' },
            {
              en: 'Exponential backoff, jitter, a maximum attempt count, and an idempotent target',
              es: 'Espera exponencial, aleatoriedad, un máximo de intentos y un destino idempotente',
            },
            { en: 'A fixed one-second delay', es: 'Un retardo fijo de un segundo' },
            { en: 'Retrying only 5xx responses', es: 'Reintentar solo respuestas 5xx' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Miss any one and you have a new failure mode: no backoff is a retry storm, no jitter synchronises every client, no cap is an infinite loop, and no idempotency is a double charge.',
            es: 'Si falta una, tienes un modo de fallo nuevo: sin espera es una tormenta de reintentos, sin aleatoriedad se sincronizan todos los clientes, sin tope es un bucle infinito y sin idempotencia es un cobro doble.',
          },
        },
        {
          kind: 'choice',
          id: 'res-6',
          prompt: {
            en: 'What is "graceful degradation"?',
            es: '¿Qué es la "degradación elegante"?',
          },
          choices: [
            { en: 'Shutting down cleanly', es: 'Apagarse limpiamente' },
            {
              en: 'Serving a reduced but useful experience when a dependency is unavailable',
              es: 'Ofrecer una experiencia reducida pero útil cuando una dependencia no está disponible',
            },
            { en: 'Slowing down under load', es: 'Ir más lento bajo carga' },
            { en: 'Rolling back a deploy', es: 'Revertir un despliegue' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'If recommendations are down, show the page without them. This is the payoff of circuit breakers and bulkheads: a non-essential dependency failing becomes a smaller page rather than an error.',
            es: 'Si las recomendaciones están caídas, muestra la página sin ellas. Esta es la recompensa de los cortacircuitos y los mamparos: que falle una dependencia no esencial se convierte en una página más pequeña, no en un error.',
          },
        },
      ],
    },
    {
      id: 'choosing',
      title: { en: 'How to choose', es: 'Cómo elegir' },
      icon: '⚖️',
      summary: {
        en: 'The meta-skill: matching architecture to the problem you actually have.',
        es: 'La meta-habilidad: ajustar la arquitectura al problema que de verdad tienes.',
      },
      concept: {
        headline: {
          en: 'There is no best architecture. There is only the one whose costs you are willing to pay.',
          es: 'No hay una arquitectura mejor. Solo hay una cuyos costes estás dispuesto a pagar.',
        },
        body: [
          {
            en: 'Every choice in this section trades the same currencies: simplicity against flexibility, consistency against availability, autonomy against coordination. Seniority is mostly knowing which currency your situation is short of.',
            es: 'Toda elección de esta sección intercambia las mismas monedas: simplicidad contra flexibilidad, consistencia contra disponibilidad, autonomía contra coordinación. La veteranía consiste sobre todo en saber de qué moneda anda escasa tu situación.',
          },
          {
            en: 'Two habits do most of the work. Start simpler than you think you need, because a wrong boundary is cheap to move while it is still a function call. And write down WHY you chose — an architecture decision record turns "who decided this?" into a two-minute read a year later.',
            es: 'Dos hábitos hacen casi todo el trabajo. Empieza más simple de lo que crees necesitar, porque una frontera equivocada es barata de mover mientras sigue siendo una llamada a función. Y escribe POR QUÉ elegiste: un registro de decisión de arquitectura convierte "¿quién decidió esto?" en una lectura de dos minutos un año después.',
          },
        ],
        keyPoints: [
          {
            en: 'Match the architecture to the problem, the team size and the actual load.',
            es: 'Ajusta la arquitectura al problema, al tamaño del equipo y a la carga real.',
          },
          {
            en: 'Start simple. Adding structure later is normal; removing it rarely happens.',
            es: 'Empieza simple. Añadir estructura después es normal; quitarla casi nunca ocurre.',
          },
          {
            en: 'Write ADRs: the context, the options, the decision and the consequences.',
            es: 'Escribe ADRs: el contexto, las opciones, la decisión y las consecuencias.',
          },
          {
            en: 'Conway’s Law is not advice, it is a prediction. Shape the teams you want to see reflected.',
            es: 'La ley de Conway no es un consejo, es una predicción. Organiza los equipos que quieres ver reflejados.',
          },
        ],
        example: {
          caption: {
            en: 'An architecture decision record',
            es: 'Un registro de decisión de arquitectura',
          },
          code: {
            en: `# ADR 014: Keep billing inside the monolith

Context   Billing shares transactions with orders. Two teams, one pipeline.
Options   (a) extract a billing service  (b) modular monolith boundary
Decision  (b) — enforce a module boundary, no separate deploy yet.
Consequences
  + Keeps ACID between orders and invoices
  + The seam exists if we need to extract later
  - Billing still ships on the shared release train
Revisit   When billing needs its own deploy cadence.`,
            es: `# ADR 014: Mantener facturación dentro del monolito

Contexto   Facturación comparte transacciones con pedidos. Dos equipos, un pipeline.
Opciones   (a) extraer un servicio de facturación  (b) frontera de monolito modular
Decisión   (b): imponer una frontera de módulo, sin despliegue separado aún.
Consecuencias
  + Mantiene ACID entre pedidos y facturas
  + La costura queda hecha por si hay que extraer después
  - Facturación sigue entregando en el tren de versiones común
Revisar    Cuando facturación necesite su propia cadencia de despliegue.`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'cho-1',
          prompt: {
            en: 'What is the best default architecture for a new product with a small team?',
            es: '¿Cuál es la mejor arquitectura por defecto para un producto nuevo con equipo pequeño?',
          },
          choices: [
            { en: 'Microservices', es: 'Microservicios' },
            {
              en: 'A modular monolith — one deployable, with boundaries you can split along later',
              es: 'Un monolito modular: un desplegable, con fronteras por las que dividir después',
            },
            { en: 'Event sourcing', es: 'Event sourcing' },
            { en: 'Serverless everything', es: 'Todo serverless' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It keeps the option open in both directions. You have not paid the distributed tax, and you have not built a ball of mud — and you can move a boundary in an afternoon while it is still an import.',
            es: 'Mantiene la opción abierta en ambas direcciones. No has pagado el impuesto distribuido ni has construido una bola de barro, y puedes mover una frontera en una tarde mientras siga siendo un import.',
          },
        },
        {
          kind: 'choice',
          id: 'cho-2',
          prompt: {
            en: 'What belongs in an architecture decision record?',
            es: '¿Qué debe llevar un registro de decisión de arquitectura?',
          },
          choices: [
            { en: 'Only the final decision', es: 'Solo la decisión final' },
            {
              en: 'The context, the options considered, the decision, and the consequences you accepted',
              es: 'El contexto, las opciones consideradas, la decisión y las consecuencias que aceptaste',
            },
            { en: 'A full class diagram', es: 'Un diagrama de clases completo' },
            { en: 'The implementation plan', es: 'El plan de implementación' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The options and consequences are the valuable part. A year later the question is never "what did we choose?" — it is "did we know about X, and does the reason still hold?".',
            es: 'Las opciones y consecuencias son lo valioso. Un año después la pregunta nunca es "¿qué elegimos?", sino "¿sabíamos lo de X, y sigue siendo válida la razón?".',
          },
        },
        {
          kind: 'boolean',
          id: 'cho-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Choosing a more advanced architecture is the safer decision when you are unsure.',
            es: 'Elegir una arquitectura más avanzada es la decisión más segura cuando dudas.',
          },
          answer: false,
          explanation: {
            en: 'Complexity is easy to add and very hard to remove — nobody gets time to merge four services back into one. When you are unsure, the reversible choice is the simpler one.',
            es: 'La complejidad es fácil de añadir y muy difícil de quitar: a nadie le dan tiempo para volver a juntar cuatro servicios en uno. Cuando dudas, la opción reversible es la simple.',
          },
        },
        {
          kind: 'choice',
          id: 'cho-4',
          prompt: {
            en: 'Which signal genuinely justifies extracting a service?',
            es: '¿Qué señal justifica de verdad extraer un servicio?',
          },
          choices: [
            { en: 'The codebase feels large', es: 'El código parece grande' },
            {
              en: 'A specific part needs its own deploy cadence or an order of magnitude more hardware',
              es: 'Una parte concreta necesita su propia cadencia de despliegue o un orden de magnitud más de hardware',
            },
            { en: 'A conference talk recommended it', es: 'Lo recomendaron en una charla' },
            { en: 'The team wants to learn Kubernetes', es: 'El equipo quiere aprender Kubernetes' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Both are measurable and both are felt as pain. "It feels large" is not an argument, because a modular monolith solves that without the distributed tax.',
            es: 'Ambas son medibles y ambas se sufren. "Parece grande" no es un argumento, porque un monolito modular resuelve eso sin el impuesto distribuido.',
          },
        },
        {
          kind: 'order',
          id: 'cho-5',
          prompt: {
            en: 'Order these architectural moves from the one to try first to the last resort.',
            es: 'Ordena estos movimientos arquitectónicos del primero a probar al último recurso.',
          },
          items: [
            {
              en: 'Draw module boundaries inside the monolith',
              es: 'Traza fronteras de módulo dentro del monolito',
            },
            {
              en: 'Enforce those boundaries with tooling',
              es: 'Impón esas fronteras con herramientas',
            },
            {
              en: 'Extract the one module that genuinely needs its own deploy',
              es: 'Extrae el único módulo que de verdad necesita su propio despliegue',
            },
            {
              en: 'Split the whole system into services',
              es: 'Divide todo el sistema en servicios',
            },
          ],
          explanation: {
            en: 'Each step is more expensive and harder to reverse than the one before. Most systems should stop at step two, and many that reached step four wish they had stopped at three.',
            es: 'Cada paso es más caro y más difícil de revertir que el anterior. La mayoría de sistemas deberían parar en el dos, y muchos que llegaron al cuatro desearían haberse quedado en el tres.',
          },
        },
        {
          kind: 'choice',
          id: 'cho-6',
          prompt: {
            en: 'What is the single most useful question when comparing two architectures?',
            es: '¿Cuál es la pregunta más útil al comparar dos arquitecturas?',
          },
          choices: [
            { en: 'Which is more modern?', es: '¿Cuál es más moderna?' },
            {
              en: 'Which failure mode can we live with, and which change do we need to be cheap?',
              es: '¿Con qué modo de fallo podemos vivir, y qué cambio necesitamos que sea barato?',
            },
            { en: 'Which has better tooling?', es: '¿Cuál tiene mejores herramientas?' },
            { en: 'Which do larger companies use?', es: '¿Cuál usan las empresas grandes?' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It reframes the decision away from fashion and towards your situation. What a big company uses is an answer to their problem at their scale, which is almost never yours.',
            es: 'Reformula la decisión sacándola de la moda y llevándola a tu situación. Lo que usa una empresa grande es la respuesta a su problema a su escala, que casi nunca es la tuya.',
          },
        },
      ],
    },
  ],
}
