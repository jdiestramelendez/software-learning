import type { Section } from '../types'

export const creational: Section = {
  id: 'creational',
  title: { en: 'Creational patterns', es: 'Patrones creacionales' },
  subtitle: {
    en: 'Who decides which object gets built, and how it gets assembled.',
    es: 'Quién decide qué objeto se construye y cómo se ensambla.',
  },
  units: [
    {
      id: 'factory',
      title: { en: 'Factory Method & Abstract Factory', es: 'Factory Method y Abstract Factory' },
      icon: '🏭',
      summary: {
        en: 'Move the `new` out of the code that uses the object.',
        es: 'Saca el `new` del código que usa el objeto.',
      },
      concept: {
        headline: {
          en: 'A factory moves the decision of WHICH class to build away from the code that USES it.',
          es: 'Una fábrica saca la decisión de QUÉ clase construir del código que la USA.',
        },
        body: [
          {
            en: 'The moment a class calls `new StripeGateway()`, it is welded to Stripe: no test double, no second provider, no config. A factory turns that into "give me a payment gateway" and keeps the choice in one place.',
            es: 'En cuanto una clase llama a `new StripeGateway()`, queda soldada a Stripe: sin doble de test, sin segundo proveedor, sin configuración. Una fábrica lo convierte en "dame una pasarela de pago" y guarda la elección en un solo sitio.',
          },
          {
            en: 'Factory Method makes ONE product. Abstract Factory makes a FAMILY of products that must go together — a `DarkTheme` factory that returns a dark button and a dark input, so you can never mix a dark button with a light input.',
            es: 'Factory Method crea UN producto. Abstract Factory crea una FAMILIA de productos que deben ir juntos: una fábrica `TemaOscuro` que devuelve botón oscuro e input oscuro, para que nunca mezcles un botón oscuro con un input claro.',
          },
        ],
        keyPoints: [
          {
            en: 'Factory Method: one product, chosen at runtime. Abstract Factory: a whole consistent family.',
            es: 'Factory Method: un producto elegido en ejecución. Abstract Factory: una familia entera y coherente.',
          },
          {
            en: 'This is the one legitimate home for a `switch` over concrete types.',
            es: 'Este es el único hogar legítimo para un `switch` sobre tipos concretos.',
          },
          {
            en: 'A factory returns the INTERFACE, never the concrete class — otherwise it changed nothing.',
            es: 'Una fábrica devuelve la INTERFAZ, nunca la clase concreta; si no, no ha cambiado nada.',
          },
          {
            en: 'Do not wrap every constructor in a factory. Use it when the choice varies or the assembly is real work.',
            es: 'No envuelvas cada constructor en una fábrica. Úsala cuando la elección varía o el ensamblado es trabajo real.',
          },
        ],
        example: {
          caption: {
            en: 'One switch, in one known place',
            es: 'Un switch, en un solo sitio conocido',
          },
          code: {
            en: `interface PaymentGateway { charge(cents: number): Promise<void> }

// The only place in the system that knows the concrete classes
export function gatewayFor(provider: string): PaymentGateway {
  switch (provider) {
    case 'stripe': return new StripeGateway()
    case 'adyen': return new AdyenGateway()
    default: throw new Error(\`Unknown provider: \${provider}\`)
  }
}

// Everything else just asks for the interface`,
            es: `interface PaymentGateway { charge(cents: number): Promise<void> }

// El único sitio del sistema que conoce las clases concretas
export function gatewayFor(provider: string): PaymentGateway {
  switch (provider) {
    case 'stripe': return new StripeGateway()
    case 'adyen': return new AdyenGateway()
    default: throw new Error(\`Proveedor desconocido: \${provider}\`)
  }
}

// Todo lo demás solo pide la interfaz`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'fac-1',
          prompt: {
            en: 'What problem does a factory actually solve?',
            es: '¿Qué problema resuelve realmente una fábrica?',
          },
          choices: [
            { en: 'It makes object creation faster', es: 'Hace más rápida la creación de objetos' },
            {
              en: 'It removes the knowledge of concrete classes from the code that uses them',
              es: 'Quita del código que usa los objetos el conocimiento de las clases concretas',
            },
            { en: 'It reduces memory usage', es: 'Reduce el uso de memoria' },
            { en: 'It replaces the need for interfaces', es: 'Sustituye la necesidad de interfaces' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Every `new Concrete()` is a hard dependency. Concentrating them in a factory means adding a provider touches one file, and tests can hand over a stub without a container or a mocking framework.',
            es: 'Cada `new Concreta()` es una dependencia dura. Concentrarlas en una fábrica hace que añadir un proveedor toque un solo fichero, y que los tests puedan pasar un doble sin contenedor ni framework de mocks.',
          },
        },
        {
          kind: 'choice',
          id: 'fac-2',
          prompt: {
            en: 'When do you need an Abstract Factory rather than a plain Factory Method?',
            es: '¿Cuándo necesitas un Abstract Factory en vez de un Factory Method normal?',
          },
          choices: [
            { en: 'When there are more than three classes', es: 'Cuando hay más de tres clases' },
            {
              en: 'When several products must come from the same family and must not be mixed',
              es: 'Cuando varios productos deben venir de la misma familia y no pueden mezclarse',
            },
            { en: 'When the objects are expensive', es: 'Cuando los objetos son caros' },
            { en: 'When you use inheritance', es: 'Cuando usas herencia' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The value is the guarantee of consistency. If a Postgres connection, a Postgres transaction and a Postgres migrator must all match, one factory producing all three makes mixing them impossible by construction.',
            es: 'El valor es la garantía de coherencia. Si una conexión, una transacción y un migrador de Postgres deben coincidir, una fábrica que produzca los tres hace imposible mezclarlos por construcción.',
          },
        },
        {
          kind: 'boolean',
          id: 'fac-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Every constructor should be hidden behind a factory.',
            es: 'Todo constructor debería esconderse tras una fábrica.',
          },
          answer: false,
          explanation: {
            en: 'A factory that always returns the same class is pure ceremony — an extra file, an extra indirection, no decision made. Reach for one when there is a real choice or real assembly work.',
            es: 'Una fábrica que siempre devuelve la misma clase es puro trámite: un fichero más, una indirección más y ninguna decisión tomada. Úsala cuando haya una elección real o un ensamblado real.',
          },
        },
        {
          kind: 'gap',
          id: 'fac-4',
          prompt: {
            en: 'Complete the return type so the factory hides the concrete class.',
            es: 'Completa el tipo de retorno para que la fábrica esconda la clase concreta.',
          },
          code: `interface PaymentGateway { charge(cents: number): Promise<void> }

function gatewayFor(provider: string): ___ {
  return provider === 'stripe' ? new StripeGateway() : new AdyenGateway()
}`,
          choices: ['PaymentGateway', 'StripeGateway', 'StripeGateway | AdyenGateway', 'object'],
          answerIndex: 0,
          explanation: {
            en: 'Returning the union would leak both class names right back to every caller, which is what the factory was meant to prevent. The interface is the whole point.',
            es: 'Devolver la unión filtraría los dos nombres de clase de vuelta a quien llama, que es justo lo que la fábrica venía a evitar. La interfaz es todo el objetivo.',
          },
        },
        {
          kind: 'choice',
          id: 'fac-5',
          prompt: {
            en: 'Which SOLID principle does a factory most directly serve?',
            es: '¿A qué principio SOLID sirve más directamente una fábrica?',
          },
          choices: [
            { en: 'SRP', es: 'SRP' },
            { en: 'LSP', es: 'LSP' },
            {
              en: 'DIP — callers depend on the abstraction while the factory owns the detail',
              es: 'DIP: quien llama depende de la abstracción y la fábrica se queda el detalle',
            },
            { en: 'ISP', es: 'ISP' },
          ],
          answerIndex: 2,
          explanation: {
            en: 'It also serves OCP, since a new provider is a new case in one file. But the core move — pushing knowledge of concrete types to the edge so policy depends only on interfaces — is dependency inversion.',
            es: 'También sirve a OCP, ya que un proveedor nuevo es un caso más en un fichero. Pero el movimiento central —empujar el conocimiento de tipos concretos al borde para que la política dependa solo de interfaces— es inversión de dependencias.',
          },
        },
        {
          kind: 'choice',
          id: 'fac-6',
          prompt: {
            en: 'A factory returns `StripeGateway` as its declared type. What went wrong?',
            es: 'Una fábrica declara `StripeGateway` como tipo de retorno. ¿Qué ha fallado?',
          },
          choices: [
            { en: 'Nothing', es: 'Nada' },
            {
              en: 'Callers are still coupled to the concrete class, so the factory bought nothing',
              es: 'Quien llama sigue acoplado a la clase concreta, así que la fábrica no ha comprado nada',
            },
            { en: 'The return type should be void', es: 'El tipo de retorno debería ser void' },
            { en: 'It should be a class, not a function', es: 'Debería ser una clase, no una función' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'You have added a file and kept the coupling. This is the most common way a factory becomes ceremony rather than design — the test is always "could I swap the implementation without touching callers?".',
            es: 'Has añadido un fichero y conservado el acoplamiento. Es la forma más común de que una fábrica sea trámite en vez de diseño; la prueba es siempre "¿podría cambiar la implementación sin tocar a quien llama?".',
          },
        },
      ],
    },
    {
      id: 'builder',
      title: { en: 'Builder', es: 'Builder' },
      icon: '🧱',
      summary: {
        en: 'For objects with many optional parts and invalid combinations.',
        es: 'Para objetos con muchas partes opcionales y combinaciones inválidas.',
      },
      concept: {
        headline: {
          en: 'A builder replaces a constructor with eight arguments you cannot read.',
          es: 'Un builder sustituye a un constructor con ocho argumentos que no se pueden leer.',
        },
        body: [
          {
            en: '`new Report(true, false, null, 30, true, "csv")` tells the reader nothing. A builder names each step at the call site, makes optional parts genuinely optional, and can refuse to build an invalid combination.',
            es: '`new Report(true, false, null, 30, true, "csv")` no le dice nada a quien lee. Un builder nombra cada paso en la llamada, hace opcionales las partes opcionales de verdad y puede negarse a construir una combinación inválida.',
          },
          {
            en: 'The other half of the pattern is validation at `build()`. The object never exists in a half-configured state — either you get a valid one or you get an error, which is what makes the rest of the code able to trust it.',
            es: 'La otra mitad del patrón es la validación en `build()`. El objeto nunca existe a medio configurar: o recibes uno válido o recibes un error, y eso es lo que permite que el resto del código confíe en él.',
          },
        ],
        keyPoints: [
          {
            en: 'Use it when a constructor has many optional parameters — the "telescoping constructor" smell.',
            es: 'Úsalo cuando un constructor tiene muchos parámetros opcionales: el olor a "constructor telescópico".',
          },
          {
            en: 'Each step returns `this`, so the calls chain and read like a sentence.',
            es: 'Cada paso devuelve `this`, así las llamadas encadenan y se leen como una frase.',
          },
          {
            en: '`build()` is where you validate — an invalid combination must never become an object.',
            es: '`build()` es donde validas: una combinación inválida no debe llegar a ser un objeto.',
          },
          {
            en: 'In TypeScript an options object often does the same job with far less code. Reach for a builder when there is real validation or ordering.',
            es: 'En TypeScript un objeto de opciones suele hacer lo mismo con mucho menos código. Usa un builder cuando haya validación u orden reales.',
          },
        ],
        example: {
          caption: {
            en: 'Readable at the call site, valid by construction',
            es: 'Legible al llamarlo, válido por construcción',
          },
          code: {
            en: `// Unreadable, and easy to get the booleans the wrong way round
new Report(true, false, null, 30, true, 'csv')

// Named steps, validated once, at the end
const report = new ReportBuilder()
  .forLastDays(30)
  .includeCharts()
  .asCsv()
  .build()   // throws if charts + csv is not a legal combination`,
            es: `// Ilegible, y es fácil poner los booleanos al revés
new Report(true, false, null, 30, true, 'csv')

// Pasos con nombre, validados una vez, al final
const report = new ReportBuilder()
  .forLastDays(30)
  .includeCharts()
  .asCsv()
  .build()   // lanza error si gráficos + csv no es una combinación legal`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'bld-1',
          prompt: {
            en: 'What is the "telescoping constructor" problem a builder solves?',
            es: '¿Qué problema del "constructor telescópico" resuelve un builder?',
          },
          choices: [
            { en: 'Constructors that are too slow', es: 'Constructores demasiado lentos' },
            {
              en: 'A growing pile of overloads and unreadable positional arguments for optional parts',
              es: 'Una pila creciente de sobrecargas y argumentos posicionales ilegibles para partes opcionales',
            },
            { en: 'Constructors that throw', es: 'Constructores que lanzan errores' },
            { en: 'Circular dependencies', es: 'Dependencias circulares' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'With six optional parameters you end up with a stack of overloads and call sites full of `null, null, true`. Nobody can tell what the third boolean means without opening the definition.',
            es: 'Con seis parámetros opcionales acabas con una pila de sobrecargas y llamadas llenas de `null, null, true`. Nadie sabe qué significa el tercer booleano sin abrir la definición.',
          },
        },
        {
          kind: 'choice',
          id: 'bld-2',
          prompt: {
            en: 'Where should a builder validate the combination it was given?',
            es: '¿Dónde debe validar un builder la combinación recibida?',
          },
          choices: [
            { en: 'In each setter as it is called', es: 'En cada setter según se llama' },
            {
              en: 'In `build()`, where the full configuration is finally known',
              es: 'En `build()`, donde por fin se conoce la configuración completa',
            },
            { en: 'In the constructor', es: 'En el constructor' },
            { en: 'It should not validate', es: 'No debería validar' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Rules like "charts are not allowed in CSV export" involve two settings, so they cannot be checked until both are present. Validating early would reject a caller who was about to set the other one.',
            es: 'Reglas como "los gráficos no valen en exportación CSV" implican dos ajustes, así que no se pueden comprobar hasta tener ambos. Validar antes rechazaría a quien iba a fijar el otro justo después.',
          },
        },
        {
          kind: 'boolean',
          id: 'bld-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'In TypeScript, an options object is often a better choice than a full builder.',
            es: 'En TypeScript, un objeto de opciones suele ser mejor opción que un builder completo.',
          },
          answer: true,
          explanation: {
            en: '`createReport({ days: 30, charts: true })` is already named, already optional-friendly, and the compiler checks it. Reach for the full builder when steps must happen in order, or when validation is genuinely cross-field.',
            es: '`createReport({ days: 30, charts: true })` ya viene con nombres, ya admite opcionales y el compilador lo comprueba. Usa el builder completo cuando los pasos deban ir en orden o la validación cruce varios campos.',
          },
        },
        {
          kind: 'gap',
          id: 'bld-4',
          prompt: {
            en: 'Complete the return type so the builder steps can chain.',
            es: 'Completa el tipo de retorno para que los pasos del builder encadenen.',
          },
          code: `class ReportBuilder {
  forLastDays(n: number): ___ {
    this.days = n
    return this
  }
}`,
          choices: ['this', 'void', 'Report', 'number'],
          answerIndex: 0,
          explanation: {
            en: 'Returning `this` — rather than `ReportBuilder` — keeps the chain working in subclasses too, because the type narrows to whatever the actual builder is.',
            es: 'Devolver `this` en vez de `ReportBuilder` mantiene la cadena funcionando también en subclases, porque el tipo se ajusta al builder real.',
          },
        },
        {
          kind: 'choice',
          id: 'bld-5',
          prompt: {
            en: 'Which is a genuinely good reason to prefer a builder here?',
            es: '¿Cuál es una razón realmente buena para preferir un builder aquí?',
          },
          choices: [
            { en: 'It looks more professional', es: 'Parece más profesional' },
            {
              en: 'Steps must happen in a required order, and the type can enforce it',
              es: 'Los pasos deben ir en un orden obligatorio y el tipo puede imponerlo',
            },
            { en: 'It uses less memory', es: 'Usa menos memoria' },
            { en: 'It avoids interfaces', es: 'Evita las interfaces' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A query builder where `where()` is only legal after `from()` can encode that in the return types, so an illegal order does not compile. An options object cannot express ordering at all.',
            es: 'Un constructor de consultas donde `where()` solo es legal tras `from()` puede codificarlo en los tipos de retorno, así un orden ilegal no compila. Un objeto de opciones no puede expresar orden.',
          },
        },
        {
          kind: 'choice',
          id: 'bld-6',
          prompt: {
            en: 'What is the risk of a builder whose `build()` does not validate?',
            es: '¿Cuál es el riesgo de un builder cuyo `build()` no valida?',
          },
          choices: [
            { en: 'Slower construction', es: 'Construcción más lenta' },
            {
              en: 'Half-configured objects escape into the system and fail far from where they were built',
              es: 'Objetos a medio configurar se escapan al sistema y fallan lejos de donde se construyeron',
            },
            { en: 'The chain stops working', es: 'La cadena deja de funcionar' },
            { en: 'Nothing at all', es: 'Ninguno' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Without that check you have swapped one unreadable constructor for a nicer way to build broken objects. The point is that anything that leaves `build()` can be trusted by everything downstream.',
            es: 'Sin esa comprobación has cambiado un constructor ilegible por una forma más bonita de construir objetos rotos. La gracia es que todo lo que salga de `build()` sea de fiar aguas abajo.',
          },
        },
      ],
    },
    {
      id: 'singleton',
      title: { en: 'Singleton', es: 'Singleton' },
      icon: '☝️',
      summary: {
        en: 'The most famous pattern, and the one most often a mistake.',
        es: 'El patrón más famoso y el que más veces es un error.',
      },
      concept: {
        headline: {
          en: 'Singleton is global mutable state wearing a design-pattern badge.',
          es: 'El Singleton es estado global mutable con una chapa de patrón de diseño.',
        },
        body: [
          {
            en: 'It guarantees one instance and gives global access to it. The first half is occasionally useful. The second half is what causes the damage: any code anywhere can reach it, so dependencies stop appearing in signatures and nobody can see what a class actually needs.',
            es: 'Garantiza una única instancia y da acceso global a ella. La primera mitad a veces sirve. La segunda es la que hace daño: cualquier código puede alcanzarlo, así que las dependencias dejan de aparecer en las firmas y nadie ve qué necesita de verdad una clase.',
          },
          {
            en: 'In tests it is worse: state leaks between test cases, order starts to matter, and you cannot substitute it. Almost every real use of Singleton is better served by creating one instance at startup and passing it in.',
            es: 'En los tests es peor: el estado se filtra entre casos, el orden empieza a importar y no puedes sustituirlo. Casi todo uso real de Singleton se resuelve mejor creando una instancia al arrancar y pasándola.',
          },
        ],
        keyPoints: [
          {
            en: 'It hides dependencies: `Config.get()` inside a method appears in no signature.',
            es: 'Esconde dependencias: un `Config.get()` dentro de un método no aparece en ninguna firma.',
          },
          {
            en: 'It breaks test isolation — state survives between test cases.',
            es: 'Rompe el aislamiento de los tests: el estado sobrevive entre casos.',
          },
          {
            en: 'It is usually not even thread-safe without extra care.',
            es: 'Normalmente ni siquiera es seguro entre hilos sin cuidado extra.',
          },
          {
            en: 'The alternative that keeps the good half: create one instance in the composition root and inject it.',
            es: 'La alternativa que conserva la mitad buena: crea una instancia en la raíz de composición e inyéctala.',
          },
        ],
        example: {
          caption: {
            en: 'One instance, without the global door',
            es: 'Una instancia, sin la puerta global',
          },
          code: {
            en: `// Singleton: the dependency is invisible and untestable
class Config {
  static instance = new Config()
  static get(key: string) { return Config.instance.values[key] }
}
class Pricing { rate() { return Config.get('vat') } }  // hidden dependency

// One instance, created once, handed over explicitly
const config = loadConfig()               // composition root
new Pricing(config)                       // dependency is visible and swappable`,
            es: `// Singleton: la dependencia es invisible y no testeable
class Config {
  static instance = new Config()
  static get(key: string) { return Config.instance.values[key] }
}
class Pricing { rate() { return Config.get('vat') } }  // dependencia oculta

// Una instancia, creada una vez, entregada explícitamente
const config = loadConfig()               // raíz de composición
new Pricing(config)                       // dependencia visible e intercambiable`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'sng-1',
          prompt: {
            en: 'What is the real damage done by a Singleton?',
            es: '¿Cuál es el daño real que hace un Singleton?',
          },
          choices: [
            { en: 'It uses too much memory', es: 'Usa demasiada memoria' },
            {
              en: 'Global access hides dependencies, so a class’s real needs never appear in its signature',
              es: 'El acceso global esconde dependencias, así que las necesidades reales de una clase nunca salen en su firma',
            },
            { en: 'It is slow to construct', es: 'Es lento de construir' },
            { en: 'It cannot be garbage collected', es: 'No lo puede recoger el recolector de basura' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The single-instance guarantee is rarely the problem. Global reachability is: you read a constructor, think you understand the class, and only discover the database dependency buried three methods down.',
            es: 'La garantía de instancia única rara vez es el problema. La alcanzabilidad global sí: lees un constructor, crees entender la clase y descubres la dependencia de base de datos enterrada tres métodos más abajo.',
          },
        },
        {
          kind: 'boolean',
          id: 'sng-2',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Singletons make unit tests harder to keep isolated.',
            es: 'Los singletons dificultan mantener aislados los tests unitarios.',
          },
          answer: true,
          explanation: {
            en: 'The instance outlives each test case, so state set in one leaks into the next, tests start passing only in a certain order, and you get failures that vanish when you run the file alone.',
            es: 'La instancia sobrevive a cada caso, así que el estado de uno se filtra al siguiente, los tests empiezan a pasar solo en cierto orden y aparecen fallos que desaparecen al ejecutar el fichero solo.',
          },
        },
        {
          kind: 'choice',
          id: 'sng-3',
          prompt: {
            en: 'You genuinely need exactly one connection pool. What is the better approach?',
            es: 'Necesitas de verdad un solo pool de conexiones. ¿Cuál es el mejor enfoque?',
          },
          choices: [
            { en: 'A Singleton with a static getInstance()', es: 'Un Singleton con un getInstance() estático' },
            {
              en: 'Create it once in the composition root and inject it wherever it is needed',
              es: 'Crearlo una vez en la raíz de composición e inyectarlo donde haga falta',
            },
            { en: 'A global variable', es: 'Una variable global' },
            { en: 'A new pool per request', es: 'Un pool nuevo por petición' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'You keep the single instance and lose the global door. Every consumer declares the dependency, tests can pass a fake pool, and integration tests can run two isolated pools side by side.',
            es: 'Conservas la instancia única y pierdes la puerta global. Cada consumidor declara la dependencia, los tests pueden pasar un pool falso y los de integración pueden correr dos pools aislados a la vez.',
          },
        },
        {
          kind: 'choice',
          id: 'sng-4',
          prompt: {
            en: 'Which use of a module-level constant is genuinely fine?',
            es: '¿Qué uso de una constante de módulo está realmente bien?',
          },
          choices: [
            {
              en: 'An immutable value with no I/O, like a lookup table of country codes',
              es: 'Un valor inmutable sin E/S, como una tabla de códigos de país',
            },
            { en: 'A mutable request-scoped cache', es: 'Una caché mutable por petición' },
            { en: 'The current logged-in user', es: 'El usuario autenticado actual' },
            { en: 'A database connection', es: 'Una conexión a base de datos' },
          ],
          answerIndex: 0,
          explanation: {
            en: 'The danger is global MUTABLE state. A frozen lookup table cannot leak between tests and cannot surprise anyone, so it needs no injection ceremony at all.',
            es: 'El peligro es el estado global MUTABLE. Una tabla inmutable no puede filtrarse entre tests ni sorprender a nadie, así que no necesita ninguna ceremonia de inyección.',
          },
        },
        {
          kind: 'choice',
          id: 'sng-5',
          prompt: {
            en: 'What is a "composition root"?',
            es: '¿Qué es una "raíz de composición"?',
          },
          choices: [
            { en: 'The base class of a hierarchy', es: 'La clase base de una jerarquía' },
            {
              en: 'The single startup place where concrete objects are built and wired together',
              es: 'El único sitio de arranque donde se construyen y conectan los objetos concretos',
            },
            { en: 'The root of the file tree', es: 'La raíz del árbol de ficheros' },
            { en: 'The main database table', es: 'La tabla principal de la base de datos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It is the one place allowed to know concrete classes — `main`, or your DI container configuration. Everything below it receives what it needs, which is how the rest of the codebase stays free of `new` and of globals.',
            es: 'Es el único sitio con permiso para conocer clases concretas: el `main` o la configuración de tu contenedor. Todo lo de debajo recibe lo que necesita, y así el resto del código se libra de `new` y de globales.',
          },
        },
        {
          kind: 'choice',
          id: 'sng-6',
          prompt: {
            en: 'Why is a Singleton often not thread-safe by default?',
            es: '¿Por qué un Singleton no suele ser seguro entre hilos por defecto?',
          },
          choices: [
            { en: 'Static fields cannot be locked', es: 'Los campos estáticos no se pueden bloquear' },
            {
              en: 'Two threads can both see it as uninitialised and both construct it',
              es: 'Dos hilos pueden verlo sin inicializar a la vez y construirlo ambos',
            },
            { en: 'It always runs on the main thread', es: 'Siempre corre en el hilo principal' },
            { en: 'Garbage collection interferes', es: 'Interfiere la recolección de basura' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Lazy initialisation is a read-modify-write, and it is a race like any other — the same lesson as the stock counter in Foundations. It is also why the "double-checked locking" fix is famously easy to get wrong.',
            es: 'La inicialización perezosa es un leer-modificar-escribir, y es una carrera como cualquier otra: la misma lección que el contador de stock de Foundations. Por eso el arreglo de "double-checked locking" es famoso por lo fácil que es equivocarse.',
          },
        },
      ],
    },
    {
      id: 'prototype',
      title: { en: 'Prototype & object pool', es: 'Prototype y object pool' },
      icon: '🧬',
      summary: {
        en: 'Copying an existing object instead of building a new one.',
        es: 'Copiar un objeto existente en vez de construir uno nuevo.',
      },
      concept: {
        headline: {
          en: 'When construction is expensive, clone what you already have — carefully.',
          es: 'Cuando construir es caro, clona lo que ya tienes, con cuidado.',
        },
        body: [
          {
            en: 'Prototype builds new objects by copying a configured example. It is the right tool when setup is expensive or when the configuration was decided at runtime and you want more of the same — a document template, a pre-tuned game entity, a parsed schema.',
            es: 'Prototype construye objetos nuevos copiando un ejemplar configurado. Es la herramienta correcta cuando la preparación es cara o cuando la configuración se decidió en ejecución y quieres más de lo mismo: una plantilla de documento, una entidad de juego ya ajustada, un esquema ya analizado.',
          },
          {
            en: 'Its entire danger is shallow copying — exactly the bug from the Memory unit. A clone that shares a nested array with its original is not an independent object, and the two will corrupt each other in ways that take days to find.',
            es: 'Todo su peligro es la copia superficial: exactamente el bug de la unidad de memoria. Un clon que comparte un array anidado con su original no es un objeto independiente, y los dos se corromperán mutuamente de formas que cuestan días encontrar.',
          },
        ],
        keyPoints: [
          {
            en: 'Prototype = "give me another one like this", when construction is costly.',
            es: 'Prototype = "dame otro como este", cuando construir sale caro.',
          },
          {
            en: 'Shallow vs deep copy is the whole risk. Nested objects must be cloned too.',
            es: 'Copia superficial frente a profunda es todo el riesgo. Los objetos anidados también hay que clonarlos.',
          },
          {
            en: 'Object pool reuses expensive instances instead of copying them — connections, threads, buffers.',
            es: 'El object pool reutiliza instancias caras en vez de copiarlas: conexiones, hilos, búferes.',
          },
          {
            en: 'A pooled object MUST be reset on return, or the next borrower inherits the last one’s state.',
            es: 'Un objeto del pool DEBE reiniciarse al devolverlo, o el siguiente hereda el estado del anterior.',
          },
        ],
        example: {
          caption: {
            en: 'The clone that was not really a clone',
            es: 'El clon que no era realmente un clon',
          },
          code: {
            en: `const template = { title: 'Invoice', lines: [] as Line[] }

const shallow = { ...template }     // lines is the SAME array
shallow.lines.push(line)            // template.lines changed too

const deep = structuredClone(template)  // genuinely independent`,
            es: `const template = { title: 'Factura', lines: [] as Line[] }

const shallow = { ...template }     // lines es el MISMO array
shallow.lines.push(line)            // template.lines también cambió

const deep = structuredClone(template)  // de verdad independiente`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'pro-1',
          prompt: {
            en: 'What is the classic bug when implementing Prototype?',
            es: '¿Cuál es el bug clásico al implementar Prototype?',
          },
          choices: [
            { en: 'Clones are too slow', es: 'Los clones son demasiado lentos' },
            {
              en: 'A shallow copy leaves the clone sharing nested objects with the original',
              es: 'Una copia superficial deja al clon compartiendo objetos anidados con el original',
            },
            { en: 'The clone loses its type', es: 'El clon pierde su tipo' },
            { en: 'Clones cannot be serialised', es: 'Los clones no se pueden serializar' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It is the same trap as the spread operator in the Memory unit, now with a pattern name. The two objects look independent and silently corrupt each other through the shared nested reference.',
            es: 'Es la misma trampa que el spread en la unidad de memoria, ahora con nombre de patrón. Los dos objetos parecen independientes y se corrompen en silencio a través de la referencia anidada compartida.',
          },
        },
        {
          kind: 'choice',
          id: 'pro-2',
          prompt: {
            en: 'What must always happen when an object returns to a pool?',
            es: '¿Qué debe ocurrir siempre cuando un objeto vuelve al pool?',
          },
          choices: [
            { en: 'It should be destroyed', es: 'Debe destruirse' },
            {
              en: 'Its state must be reset, or the next borrower inherits the previous one’s data',
              es: 'Su estado debe reiniciarse, o el siguiente que lo tome hereda los datos del anterior',
            },
            { en: 'It should be serialised to disk', es: 'Debe serializarse a disco' },
            { en: 'Nothing', es: 'Nada' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A pooled database connection still inside a transaction, or a buffer still holding the last user’s bytes, is a data-leak bug of the worst kind — it shows up as one customer seeing another customer’s data.',
            es: 'Una conexión del pool aún dentro de una transacción, o un búfer que aún guarda los bytes del usuario anterior, es una fuga de datos de la peor clase: se manifiesta como un cliente viendo los datos de otro.',
          },
        },
        {
          kind: 'boolean',
          id: 'pro-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Object pooling is a good default optimisation for ordinary objects.',
            es: 'Reutilizar objetos en un pool es una buena optimización por defecto para objetos normales.',
          },
          answer: false,
          explanation: {
            en: 'Modern allocators and garbage collectors are extremely good at short-lived objects — pooling them usually makes things slower AND adds reset bugs. Pool things that are genuinely scarce: connections, threads, large buffers.',
            es: 'Los asignadores y recolectores modernos son buenísimos con objetos de vida corta: agruparlos suele ser más lento Y añade bugs de reinicio. Agrupa lo que es realmente escaso: conexiones, hilos, búferes grandes.',
          },
        },
        {
          kind: 'gap',
          id: 'pro-4',
          prompt: {
            en: 'Complete the clone so the copy is genuinely independent.',
            es: 'Completa el clon para que la copia sea de verdad independiente.',
          },
          code: `const template = { title: 'Invoice', lines: [] as Line[] }
const copy = ___(template)
copy.lines.push(line)   // template.lines must stay empty`,
          choices: ['structuredClone', '{ ...template }', 'Object.assign({}, template)', 'template'],
          answerIndex: 0,
          explanation: {
            en: 'Only a deep clone breaks the link to the nested array. The two spread-style options copy the reference, so both objects end up pointing at the same `lines`.',
            es: 'Solo un clon profundo rompe el vínculo con el array anidado. Las dos opciones tipo spread copian la referencia, así que ambos objetos acaban apuntando al mismo `lines`.',
          },
        },
        {
          kind: 'choice',
          id: 'pro-5',
          prompt: {
            en: 'When is Prototype a better fit than a Factory?',
            es: '¿Cuándo encaja mejor Prototype que una fábrica?',
          },
          choices: [
            { en: 'When there are many subclasses', es: 'Cuando hay muchas subclases' },
            {
              en: 'When the configuration you want was decided at runtime and you need more objects just like it',
              es: 'Cuando la configuración que quieres se decidió en ejecución y necesitas más objetos iguales',
            },
            { en: 'When objects are immutable', es: 'Cuando los objetos son inmutables' },
            { en: 'When you need thread safety', es: 'Cuando necesitas seguridad entre hilos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A factory encodes the recipe up front. A prototype captures a result — useful when a user has configured a template through the UI and you now want fifty copies of exactly that.',
            es: 'Una fábrica codifica la receta de antemano. Un prototipo captura un resultado, útil cuando alguien ha configurado una plantilla desde la interfaz y ahora quieres cincuenta copias exactas de eso.',
          },
        },
        {
          kind: 'choice',
          id: 'pro-6',
          prompt: {
            en: 'A pool hands out connections but never limits how many exist. What breaks?',
            es: 'Un pool reparte conexiones pero nunca limita cuántas existen. ¿Qué se rompe?',
          },
          choices: [
            { en: 'Nothing, more is better', es: 'Nada, cuantas más mejor' },
            {
              en: 'It stops being a pool — the resource it was meant to cap gets exhausted anyway',
              es: 'Deja de ser un pool: el recurso que debía limitar se agota igualmente',
            },
            { en: 'The connections leak memory', es: 'Las conexiones tienen fugas de memoria' },
            { en: 'Threads deadlock', es: 'Los hilos se interbloquean' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The cap IS the pattern. This is exactly the Lambda-plus-RDS failure from the AWS track: a thousand concurrent callers each opening their own connection until the database refuses them all.',
            es: 'El límite ES el patrón. Es exactamente el fallo de Lambda con RDS de la ruta de AWS: mil llamadas concurrentes abriendo cada una su conexión hasta que la base de datos las rechaza todas.',
          },
        },
      ],
    },
  ],
}
