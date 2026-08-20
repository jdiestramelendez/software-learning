import type { Section } from '../types'

export const structural: Section = {
  id: 'structural',
  title: { en: 'Structural patterns', es: 'Patrones estructurales' },
  subtitle: {
    en: 'How objects are wired together, and who is allowed to see whom.',
    es: 'Cómo se conectan los objetos y quién puede ver a quién.',
  },
  units: [
    {
      id: 'adapter',
      title: { en: 'Adapter', es: 'Adapter' },
      icon: '🔌',
      summary: {
        en: 'Make someone else’s interface fit the one your code wants.',
        es: 'Haz que la interfaz de otro encaje con la que tu código quiere.',
      },
      concept: {
        headline: {
          en: 'An adapter is the layer that stops a third party’s vocabulary leaking into your domain.',
          es: 'Un adaptador es la capa que impide que el vocabulario de un tercero se filtre en tu dominio.',
        },
        body: [
          {
            en: 'Your domain wants `charge(cents)`. Stripe offers `paymentIntents.create({ amount, currency })`. An adapter implements your interface and translates — so the SDK’s shape, its error types and its field names stop at that one class.',
            es: 'Tu dominio quiere `charge(cents)`. Stripe ofrece `paymentIntents.create({ amount, currency })`. Un adaptador implementa TU interfaz y traduce, así la forma del SDK, sus tipos de error y sus nombres de campo se detienen en esa clase.',
          },
          {
            en: 'This is the pattern that makes replacing a vendor a bounded job. Without it, "we are moving off Stripe" means touching two hundred files; with it, it means writing one new adapter.',
            es: 'Es el patrón que convierte cambiar de proveedor en un trabajo acotado. Sin él, "nos vamos de Stripe" significa tocar doscientos ficheros; con él, escribir un adaptador nuevo.',
          },
        ],
        keyPoints: [
          {
            en: 'The interface belongs to YOU. The adapter bends the third party to it, never the reverse.',
            es: 'La interfaz es TUYA. El adaptador dobla al tercero hacia ella, nunca al revés.',
          },
          {
            en: 'Translate their errors into yours too — a leaked `StripeError` is a leaked dependency.',
            es: 'Traduce también sus errores a los tuyos: un `StripeError` filtrado es una dependencia filtrada.',
          },
          {
            en: 'This is the "adapter" in ports and adapters — the same idea at system scale.',
            es: 'Este es el "adaptador" de puertos y adaptadores: la misma idea a escala de sistema.',
          },
          {
            en: 'Adapter changes an interface. Decorator keeps the interface and adds behaviour.',
            es: 'Adapter cambia una interfaz. Decorator conserva la interfaz y añade comportamiento.',
          },
        ],
        example: {
          caption: {
            en: 'The vendor stops at the boundary',
            es: 'El proveedor se detiene en la frontera',
          },
          code: {
            en: `// Your domain's language, owned by you
interface PaymentGateway { charge(cents: number): Promise<Receipt> }

class StripeAdapter implements PaymentGateway {
  async charge(cents: number): Promise<Receipt> {
    try {
      const intent = await stripe.paymentIntents.create({
        amount: cents, currency: 'eur',
      })
      return { id: intent.id, paidCents: intent.amount }
    } catch (e) {
      throw new PaymentDeclined('Card declined', { cause: e })  // their error, translated
    }
  }
}`,
            es: `// El idioma de tu dominio, del que eres dueño
interface PaymentGateway { charge(cents: number): Promise<Receipt> }

class StripeAdapter implements PaymentGateway {
  async charge(cents: number): Promise<Receipt> {
    try {
      const intent = await stripe.paymentIntents.create({
        amount: cents, currency: 'eur',
      })
      return { id: intent.id, paidCents: intent.amount }
    } catch (e) {
      throw new PaymentDeclined('Tarjeta rechazada', { cause: e })  // su error, traducido
    }
  }
}`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'ada-1',
          prompt: {
            en: 'Who should own the interface that an adapter implements?',
            es: '¿De quién debe ser la interfaz que implementa un adaptador?',
          },
          choices: [
            { en: 'The third-party library', es: 'De la librería de terceros' },
            {
              en: 'Your domain — the adapter bends the vendor to your vocabulary',
              es: 'De tu dominio: el adaptador dobla al proveedor hacia tu vocabulario',
            },
            { en: 'A shared package', es: 'De un paquete compartido' },
            { en: 'Nobody, it should be `any`', es: 'De nadie, debería ser `any`' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'If the interface mirrors the vendor’s API, you have renamed the coupling rather than removed it. The interface should describe what your domain needs, in words your domain already uses.',
            es: 'Si la interfaz refleja la API del proveedor, has renombrado el acoplamiento en vez de quitarlo. La interfaz debe describir lo que necesita tu dominio, en palabras que tu dominio ya usa.',
          },
        },
        {
          kind: 'choice',
          id: 'ada-2',
          prompt: {
            en: 'Your adapter lets a `StripeError` propagate to the domain. Why is that a problem?',
            es: 'Tu adaptador deja que un `StripeError` llegue al dominio. ¿Por qué es un problema?',
          },
          choices: [
            { en: 'It is slower', es: 'Es más lento' },
            {
              en: 'The domain now depends on Stripe’s types, so the isolation the adapter promised is gone',
              es: 'El dominio ya depende de los tipos de Stripe, así que el aislamiento que prometía el adaptador desapareció',
            },
            { en: 'Errors cannot cross layers', es: 'Los errores no pueden cruzar capas' },
            { en: 'It breaks the stack trace', es: 'Rompe la traza de pila' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Leaked error types are the most commonly missed half of this pattern. A `catch (e: StripeError)` somewhere in your business logic means swapping vendors breaks that code too.',
            es: 'Los tipos de error filtrados son la mitad del patrón que más se olvida. Un `catch (e: StripeError)` en tu lógica de negocio significa que cambiar de proveedor también rompe ese código.',
          },
        },
        {
          kind: 'boolean',
          id: 'ada-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Adapter and Decorator do the same thing.',
            es: 'Adapter y Decorator hacen lo mismo.',
          },
          answer: false,
          explanation: {
            en: 'Both wrap an object, and that is where the similarity ends. Adapter CHANGES the interface so two incompatible sides can talk; Decorator KEEPS the interface and adds behaviour behind it.',
            es: 'Los dos envuelven un objeto, y ahí acaba el parecido. Adapter CAMBIA la interfaz para que dos lados incompatibles puedan hablar; Decorator CONSERVA la interfaz y añade comportamiento detrás.',
          },
        },
        {
          kind: 'choice',
          id: 'ada-4',
          prompt: {
            en: 'What does an adapter buy you at test time?',
            es: '¿Qué te da un adaptador a la hora de testear?',
          },
          choices: [
            { en: 'Faster tests only', es: 'Solo tests más rápidos' },
            {
              en: 'The domain can be tested against a two-line fake instead of the vendor SDK',
              es: 'El dominio se puede testear contra un doble de dos líneas en vez del SDK del proveedor',
            },
            { en: 'It generates test data', es: 'Genera datos de prueba' },
            { en: 'Nothing, tests are unaffected', es: 'Nada, los tests no cambian' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Without it, testing your pricing rule means mocking Stripe’s entire object graph or hitting the network. With it, `{ charge: async () => receipt }` is the whole test double.',
            es: 'Sin él, testear tu regla de precios implica simular todo el grafo de objetos de Stripe o salir a la red. Con él, `{ charge: async () => receipt }` es todo el doble de prueba.',
          },
        },
        {
          kind: 'gap',
          id: 'ada-5',
          prompt: {
            en: 'Complete the class declaration so the adapter satisfies your domain.',
            es: 'Completa la declaración para que el adaptador cumpla con tu dominio.',
          },
          code: `interface PaymentGateway { charge(cents: number): Promise<Receipt> }

class StripeAdapter ___ {
  async charge(cents: number) { /* translate to the Stripe SDK */ }
}`,
          choices: [
            'implements PaymentGateway',
            'extends StripeClient',
            'implements StripeClient',
            'extends PaymentGateway',
          ],
          answerIndex: 0,
          explanation: {
            en: 'The adapter implements YOUR interface and holds the vendor client as a collaborator. Extending the vendor class would inherit its whole surface — and hand it straight back to your callers.',
            es: 'El adaptador implementa TU interfaz y guarda el cliente del proveedor como colaborador. Extender la clase del proveedor heredaría toda su superficie y se la devolvería directamente a quien llama.',
          },
        },
        {
          kind: 'choice',
          id: 'ada-6',
          prompt: {
            en: 'Where does the Adapter pattern reappear at architecture scale?',
            es: '¿Dónde reaparece el patrón Adapter a escala de arquitectura?',
          },
          choices: [
            { en: 'In microservices', es: 'En los microservicios' },
            {
              en: 'In ports and adapters — the port is your interface, the adapter is the infrastructure',
              es: 'En puertos y adaptadores: el puerto es tu interfaz y el adaptador es la infraestructura',
            },
            { en: 'In event sourcing', es: 'En el event sourcing' },
            { en: 'It does not', es: 'No reaparece' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Hexagonal architecture is this pattern applied to every boundary a system has — database, HTTP, queue, third-party API. Same principle, one zoom level out.',
            es: 'La arquitectura hexagonal es este patrón aplicado a cada frontera del sistema: base de datos, HTTP, cola, API de terceros. El mismo principio, un nivel de zoom más lejos.',
          },
        },
      ],
    },
    {
      id: 'decorator',
      title: { en: 'Decorator', es: 'Decorator' },
      icon: '🎁',
      summary: {
        en: 'Add behaviour by wrapping, without touching the original class.',
        es: 'Añade comportamiento envolviendo, sin tocar la clase original.',
      },
      concept: {
        headline: {
          en: 'Same interface in, same interface out — with something extra in between.',
          es: 'La misma interfaz entra, la misma sale, con algo extra en medio.',
        },
        body: [
          {
            en: 'You need caching, retries, logging and metrics on a repository. Putting all four inside the repository violates SRP four times over. A decorator implements the same interface, holds the real object, and adds exactly one concern.',
            es: 'Necesitas caché, reintentos, logs y métricas en un repositorio. Meter las cuatro cosas dentro viola SRP cuatro veces. Un decorador implementa la misma interfaz, guarda el objeto real y añade exactamente una preocupación.',
          },
          {
            en: 'Because the interface is preserved, decorators stack — and the caller never knows. `new Cached(new Retrying(new Logged(repo)))` is a repository as far as anything downstream is concerned.',
            es: 'Como la interfaz se conserva, los decoradores se apilan y quien llama no se entera. `new Cached(new Retrying(new Logged(repo)))` es un repositorio para todo lo que venga después.',
          },
        ],
        keyPoints: [
          {
            en: 'Implements the SAME interface it wraps — that is what makes it invisible and stackable.',
            es: 'Implementa la MISMA interfaz que envuelve: eso es lo que lo hace invisible y apilable.',
          },
          {
            en: 'One concern per decorator: caching, retry, logging, authorisation, rate limiting.',
            es: 'Una preocupación por decorador: caché, reintentos, logs, autorización, límite de ritmo.',
          },
          {
            en: 'Order matters. Cache-then-retry and retry-then-cache behave differently.',
            es: 'El orden importa. Cachear-y-luego-reintentar no se comporta igual que reintentar-y-luego-cachear.',
          },
          {
            en: 'This is composition doing what inheritance cannot: pick any subset, in any order, at runtime.',
            es: 'Esto es la composición haciendo lo que la herencia no puede: elegir cualquier subconjunto, en cualquier orden, en ejecución.',
          },
        ],
        example: {
          caption: {
            en: 'Four concerns, four small classes',
            es: 'Cuatro preocupaciones, cuatro clases pequeñas',
          },
          code: {
            en: `class CachingUsers implements UserRepository {
  constructor(private inner: UserRepository, private cache: Cache) {}

  async findById(id: string) {
    const hit = await this.cache.get(id)
    if (hit) return hit
    const user = await this.inner.findById(id)   // same interface, delegated
    await this.cache.set(id, user)
    return user
  }
}

// Assembled at the composition root, invisible to every caller
const users = new CachingUsers(new RetryingUsers(new PostgresUsers(db)), cache)`,
            es: `class CachingUsers implements UserRepository {
  constructor(private inner: UserRepository, private cache: Cache) {}

  async findById(id: string) {
    const hit = await this.cache.get(id)
    if (hit) return hit
    const user = await this.inner.findById(id)   // misma interfaz, delegada
    await this.cache.set(id, user)
    return user
  }
}

// Ensamblado en la raíz de composición, invisible para quien llama
const users = new CachingUsers(new RetryingUsers(new PostgresUsers(db)), cache)`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'dec-1',
          prompt: {
            en: 'What makes a decorator stackable?',
            es: '¿Qué hace apilable a un decorador?',
          },
          choices: [
            { en: 'It extends the class it wraps', es: 'Extiende la clase que envuelve' },
            {
              en: 'It implements the same interface it wraps, so it can be wrapped in turn',
              es: 'Implementa la misma interfaz que envuelve, así puede ser envuelto a su vez',
            },
            { en: 'It uses generics', es: 'Usa genéricos' },
            { en: 'It is a singleton', es: 'Es un singleton' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Preserving the interface is the whole mechanism. A decorator that returns a different type stops the chain dead and forces every caller to know the chain exists.',
            es: 'Conservar la interfaz es todo el mecanismo. Un decorador que devuelve otro tipo corta la cadena en seco y obliga a quien llama a saber que la cadena existe.',
          },
        },
        {
          kind: 'choice',
          id: 'dec-2',
          prompt: {
            en: 'Why does the order of decorators matter?',
            es: '¿Por qué importa el orden de los decoradores?',
          },
          code: `new Cached(new Retrying(repo))
new Retrying(new Cached(repo))`,
          choices: [
            { en: 'It does not', es: 'No importa' },
            {
              en: 'The first caches before retrying, so a cache hit never retries; the second retries the cache lookup itself',
              es: 'El primero cachea antes de reintentar, así un acierto de caché nunca reintenta; el segundo reintenta la propia consulta a caché',
            },
            { en: 'Only the outermost one runs', es: 'Solo se ejecuta el más externo' },
            { en: 'The compiler picks the order', es: 'El compilador elige el orden' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Decorators are function composition with objects, and composition is not commutative. This is the subtle bug in the pattern: both versions compile, both look reasonable, and they behave differently under failure.',
            es: 'Los decoradores son composición de funciones con objetos, y la composición no es conmutativa. Ese es el bug sutil del patrón: las dos versiones compilan, las dos parecen razonables y se comportan distinto ante fallos.',
          },
        },
        {
          kind: 'boolean',
          id: 'dec-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A decorator should change the return type to signal it added behaviour.',
            es: 'Un decorador debería cambiar el tipo de retorno para indicar que añadió comportamiento.',
          },
          answer: false,
          explanation: {
            en: 'That would defeat the point. The value of the pattern is that callers cannot tell whether they hold the real object or a wrapped one, which is what lets you add and remove concerns without touching them.',
            es: 'Eso arruinaría la idea. El valor del patrón es que quien llama no puede saber si tiene el objeto real o uno envuelto, y eso es lo que permite añadir y quitar preocupaciones sin tocarlo.',
          },
        },
        {
          kind: 'choice',
          id: 'dec-4',
          prompt: {
            en: 'Which SOLID principle does Decorator most directly deliver?',
            es: '¿Qué principio SOLID entrega más directamente Decorator?',
          },
          choices: [
            {
              en: 'OCP — new behaviour arrives as a new class, with the original untouched',
              es: 'OCP: el comportamiento nuevo llega como clase nueva, sin tocar la original',
            },
            { en: 'ISP', es: 'ISP' },
            { en: 'LSP', es: 'LSP' },
            { en: 'None', es: 'Ninguno' },
          ],
          answerIndex: 0,
          explanation: {
            en: 'Adding retries means writing `RetryingUsers` — `PostgresUsers` is never reopened, never re-tested, never risked. It also honours SRP, since each concern lives alone.',
            es: 'Añadir reintentos significa escribir `RetryingUsers`: `PostgresUsers` no se reabre, no se vuelve a probar y no se pone en riesgo. También cumple SRP, ya que cada preocupación vive sola.',
          },
        },
        {
          kind: 'gap',
          id: 'dec-5',
          prompt: {
            en: 'Complete the field type so the decorator can wrap any implementation, including another decorator.',
            es: 'Completa el tipo del campo para que el decorador envuelva cualquier implementación, incluido otro decorador.',
          },
          code: `class LoggingUsers implements UserRepository {
  constructor(private inner: ___) {}
  findById(id: string) { return this.inner.findById(id) }
}`,
          choices: ['UserRepository', 'PostgresUsers', 'LoggingUsers', 'any'],
          answerIndex: 0,
          explanation: {
            en: 'Typing the field as the concrete `PostgresUsers` would let it wrap exactly one thing and nothing else — no stacking, no test double, no in-memory implementation.',
            es: 'Tipar el campo como `PostgresUsers` concreto le dejaría envolver exactamente una cosa y nada más: sin apilar, sin doble de test, sin implementación en memoria.',
          },
        },
        {
          kind: 'choice',
          id: 'dec-6',
          prompt: {
            en: 'What is the practical downside of a deep decorator chain?',
            es: '¿Cuál es la pega práctica de una cadena profunda de decoradores?',
          },
          choices: [
            { en: 'It cannot be typed', es: 'No se puede tipar' },
            {
              en: 'Stack traces and debugging get harder — the real work is several hops away',
              es: 'Las trazas de pila y la depuración se complican: el trabajo real queda a varios saltos',
            },
            { en: 'It leaks memory', es: 'Tiene fugas de memoria' },
            { en: 'Decorators cannot be tested', es: 'Los decoradores no se pueden testear' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Every layer is honest and small, but a failure five wrappers deep produces a trace full of `inner.findById`. Keep chains shallow and name the classes for what they add.',
            es: 'Cada capa es honesta y pequeña, pero un fallo cinco envoltorios adentro produce una traza llena de `inner.findById`. Mantén las cadenas cortas y nombra las clases por lo que añaden.',
          },
        },
      ],
    },
    {
      id: 'facade',
      title: { en: 'Facade', es: 'Facade' },
      icon: '🚪',
      summary: {
        en: 'One simple door in front of a complicated subsystem.',
        es: 'Una puerta simple delante de un subsistema complicado.',
      },
      concept: {
        headline: {
          en: 'A facade gives the 90% use case one method, without taking the other 10% away.',
          es: 'Una fachada le da al caso del 90% un solo método, sin quitarte el 10% restante.',
        },
        body: [
          {
            en: 'Placing an order means reserving stock, charging a card, writing a record and queueing an email — four subsystems, in a specific order, with specific compensation if step three fails. A facade wraps that into `placeOrder()`.',
            es: 'Hacer un pedido implica reservar stock, cobrar la tarjeta, escribir un registro y encolar un correo: cuatro subsistemas, en un orden concreto, con compensación concreta si falla el paso tres. Una fachada lo envuelve en `placeOrder()`.',
          },
          {
            en: 'The crucial part is that a facade does not forbid the subsystems. Advanced callers can still use them directly. A facade that hides everything and grows a parameter for every option has become the complexity it was hiding.',
            es: 'Lo crucial es que una fachada no prohíbe los subsistemas. Quien lo necesite puede usarlos directamente. Una fachada que lo esconde todo y engorda con un parámetro por cada opción se ha convertido en la complejidad que ocultaba.',
          },
        ],
        keyPoints: [
          {
            en: 'Simplifies a common path; it does not remove access to the parts.',
            es: 'Simplifica el camino común; no elimina el acceso a las piezas.',
          },
          {
            en: 'Adapter changes an interface you do not control. Facade simplifies one you do.',
            es: 'Adapter cambia una interfaz que no controlas. Facade simplifica una que sí.',
          },
          {
            en: 'A facade with fifteen parameters has failed — that is the subsystem again, with an extra file.',
            es: 'Una fachada con quince parámetros ha fracasado: es el subsistema otra vez, con un fichero de más.',
          },
          {
            en: 'It is a natural home for the orchestration order and the compensation logic.',
            es: 'Es el hogar natural del orden de orquestación y de la lógica de compensación.',
          },
        ],
        example: {
          caption: {
            en: 'Four subsystems, one door',
            es: 'Cuatro subsistemas, una puerta',
          },
          code: {
            en: `class Checkout {
  constructor(
    private stock: StockService,
    private payments: PaymentGateway,
    private orders: OrderRepository,
    private mail: MailQueue,
  ) {}

  // The 90% case. The services stay public for the other 10%.
  async placeOrder(cart: Cart): Promise<Order> {
    const reservation = await this.stock.reserve(cart)
    try {
      const receipt = await this.payments.charge(cart.totalCents)
      const order = await this.orders.save({ cart, receipt })
      await this.mail.enqueue('order-confirmed', order.id)
      return order
    } catch (e) {
      await this.stock.release(reservation)   // compensation lives here
      throw e
    }
  }
}`,
            es: `class Checkout {
  constructor(
    private stock: StockService,
    private payments: PaymentGateway,
    private orders: OrderRepository,
    private mail: MailQueue,
  ) {}

  // El caso del 90%. Los servicios siguen públicos para el otro 10%.
  async placeOrder(cart: Cart): Promise<Order> {
    const reservation = await this.stock.reserve(cart)
    try {
      const receipt = await this.payments.charge(cart.totalCents)
      const order = await this.orders.save({ cart, receipt })
      await this.mail.enqueue('order-confirmed', order.id)
      return order
    } catch (e) {
      await this.stock.release(reservation)   // la compensación vive aquí
      throw e
    }
  }
}`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'fcd-1',
          prompt: {
            en: 'What distinguishes a Facade from an Adapter?',
            es: '¿Qué distingue una fachada de un adaptador?',
          },
          choices: [
            { en: 'Nothing', es: 'Nada' },
            {
              en: 'Adapter makes an incompatible interface fit; Facade simplifies a complicated one you already own',
              es: 'Adapter hace encajar una interfaz incompatible; Facade simplifica una complicada que ya es tuya',
            },
            { en: 'Facade uses inheritance', es: 'Facade usa herencia' },
            { en: 'Adapter is only for databases', es: 'Adapter es solo para bases de datos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Adapter exists because two sides cannot talk. Facade exists because one side is exhausting to talk to. Different problem, similar shape.',
            es: 'Adapter existe porque dos lados no pueden hablarse. Facade existe porque hablar con un lado agota. Problema distinto, forma parecida.',
          },
        },
        {
          kind: 'boolean',
          id: 'fcd-2',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A facade should make the underlying subsystems inaccessible.',
            es: 'Una fachada debería hacer inaccesibles los subsistemas de debajo.',
          },
          answer: false,
          explanation: {
            en: 'Sealing them off means every unusual requirement becomes a new parameter on the facade, and it grows into the thing it replaced. Simplify the common path; leave the door open for the rare one.',
            es: 'Sellarlos hace que cada requisito inusual se convierta en un parámetro nuevo de la fachada, y crece hasta ser lo que sustituía. Simplifica el camino común y deja la puerta abierta para el raro.',
          },
        },
        {
          kind: 'choice',
          id: 'fcd-3',
          prompt: {
            en: 'Your facade method now takes 12 parameters and 5 booleans. What happened?',
            es: 'Tu método de fachada ya tiene 12 parámetros y 5 booleanos. ¿Qué ha pasado?',
          },
          choices: [
            { en: 'It is working as intended', es: 'Funciona como debe' },
            {
              en: 'It absorbed every special case instead of leaving them to direct subsystem use',
              es: 'Ha absorbido todos los casos especiales en vez de dejarlos al uso directo del subsistema',
            },
            { en: 'It needs to be a class', es: 'Necesita ser una clase' },
            { en: 'The subsystems are too small', es: 'Los subsistemas son demasiado pequeños' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A facade is defined by what it leaves out. Once it can express everything the subsystem can, it has no simplifying power left — and every caller pays for options they do not use.',
            es: 'Una fachada se define por lo que deja fuera. En cuanto puede expresar todo lo que el subsistema, ya no simplifica nada, y quien llama paga por opciones que no usa.',
          },
        },
        {
          kind: 'choice',
          id: 'fcd-4',
          prompt: {
            en: 'What belongs naturally inside a facade?',
            es: '¿Qué encaja de forma natural dentro de una fachada?',
          },
          choices: [
            { en: 'The business rules themselves', es: 'Las propias reglas de negocio' },
            {
              en: 'The order of the calls and what to undo when a middle step fails',
              es: 'El orden de las llamadas y qué deshacer cuando falla un paso intermedio',
            },
            { en: 'Database queries', es: 'Consultas a base de datos' },
            { en: 'HTML rendering', es: 'Renderizado de HTML' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Orchestration is exactly what the facade is for: sequence and compensation. The rules themselves stay in the domain, or the facade quietly becomes a god object.',
            es: 'La orquestación es justo para lo que sirve la fachada: secuencia y compensación. Las reglas se quedan en el dominio, o la fachada se convierte en silencio en un objeto dios.',
          },
        },
        {
          kind: 'order',
          id: 'fcd-5',
          prompt: {
            en: 'Order the checkout facade so a failed payment cannot strand reserved stock.',
            es: 'Ordena la fachada de compra para que un pago fallido no deje stock reservado colgado.',
          },
          items: [
            { en: 'Reserve the stock', es: 'Reserva el stock' },
            { en: 'Charge the card', es: 'Cobra la tarjeta' },
            { en: 'Save the order', es: 'Guarda el pedido' },
            { en: 'Queue the confirmation email', es: 'Encola el correo de confirmación' },
            {
              en: 'On any failure, release the reservation',
              es: 'Ante cualquier fallo, libera la reserva',
            },
          ],
          explanation: {
            en: 'Reserving first is what stops two customers buying the last unit. The release step is the compensation — and it is why this facade is also the natural place for a saga later on.',
            es: 'Reservar primero es lo que impide que dos clientes compren la última unidad. La liberación es la compensación, y por eso esta fachada es también el sitio natural para una saga más adelante.',
          },
        },
        {
          kind: 'choice',
          id: 'fcd-6',
          prompt: {
            en: 'Which is a good sign that a facade is earning its keep?',
            es: '¿Qué señal indica que una fachada se está ganando su sitio?',
          },
          choices: [
            { en: 'It has many methods', es: 'Tiene muchos métodos' },
            {
              en: 'Callers went from knowing four services to knowing one, and none of them lost a capability',
              es: 'Quien llama pasó de conocer cuatro servicios a conocer uno, y nadie perdió capacidades',
            },
            { en: 'It replaced all the services', es: 'Ha sustituido todos los servicios' },
            { en: 'It is a singleton', es: 'Es un singleton' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'That is the measurable win: fewer things to learn for the common case, and no new ceiling on the uncommon one.',
            es: 'Esa es la ganancia medible: menos cosas que aprender para el caso común y ningún techo nuevo para el poco común.',
          },
        },
      ],
    },
    {
      id: 'proxy',
      title: { en: 'Proxy', es: 'Proxy' },
      icon: '🛡️',
      summary: {
        en: 'A stand-in that controls access to the real object.',
        es: 'Un suplente que controla el acceso al objeto real.',
      },
      concept: {
        headline: {
          en: 'Same interface as the real thing, but it decides whether, when and how you reach it.',
          es: 'La misma interfaz que el objeto real, pero decide si llegas a él, cuándo y cómo.',
        },
        body: [
          {
            en: 'A proxy looks identical to the object it fronts. The difference is intent: it exists to CONTROL access — checking permissions, delaying expensive construction, or standing in for something on another machine.',
            es: 'Un proxy es idéntico al objeto que representa. La diferencia es la intención: existe para CONTROLAR el acceso, comprobando permisos, retrasando una construcción cara o representando algo que está en otra máquina.',
          },
          {
            en: 'The four classic kinds: virtual (build it lazily), protection (check you are allowed), remote (it is on another machine), and smart reference (count, log or lock around access).',
            es: 'Los cuatro tipos clásicos: virtual (construir con pereza), de protección (comprobar si tienes permiso), remoto (está en otra máquina) e inteligente (contar, registrar o bloquear alrededor del acceso).',
          },
        ],
        keyPoints: [
          {
            en: 'Proxy CONTROLS access. Decorator ADDS behaviour. Same shape, different intent.',
            es: 'Proxy CONTROLA el acceso. Decorator AÑADE comportamiento. La misma forma, distinta intención.',
          },
          {
            en: 'Virtual proxy = lazy loading. The heavy object is built on first real use.',
            es: 'Proxy virtual = carga perezosa. El objeto pesado se construye en el primer uso real.',
          },
          {
            en: 'Remote proxy makes a network call look local — and that illusion is dangerous.',
            es: 'El proxy remoto hace que una llamada de red parezca local, y esa ilusión es peligrosa.',
          },
          {
            en: 'An ORM lazy-loaded relation is a virtual proxy, and it is where N+1 queries come from.',
            es: 'Una relación con carga perezosa en un ORM es un proxy virtual, y de ahí salen las consultas N+1.',
          },
        ],
        example: {
          caption: {
            en: 'Protection proxy: the check lives outside the domain object',
            es: 'Proxy de protección: la comprobación vive fuera del objeto de dominio',
          },
          code: {
            en: `class AuthorisedDocuments implements DocumentStore {
  constructor(private inner: DocumentStore, private user: User) {}

  read(id: string) {
    if (!this.user.canRead(id)) throw new Forbidden()
    return this.inner.read(id)
  }
}

// The real store never learns about permissions at all`,
            es: `class AuthorisedDocuments implements DocumentStore {
  constructor(private inner: DocumentStore, private user: User) {}

  read(id: string) {
    if (!this.user.canRead(id)) throw new Forbidden()
    return this.inner.read(id)
  }
}

// El almacén real nunca llega a saber nada de permisos`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'prx-1',
          prompt: {
            en: 'Proxy and Decorator have the same structure. What separates them?',
            es: 'Proxy y Decorator tienen la misma estructura. ¿Qué los separa?',
          },
          choices: [
            { en: 'Proxy is faster', es: 'Proxy es más rápido' },
            {
              en: 'Intent: a proxy controls whether and when you reach the object; a decorator adds behaviour to it',
              es: 'La intención: un proxy controla si llegas al objeto y cuándo; un decorador le añade comportamiento',
            },
            { en: 'Proxy cannot be stacked', es: 'Proxy no se puede apilar' },
            { en: 'Decorator requires inheritance', es: 'Decorator requiere herencia' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Structurally you often cannot tell them apart in code, which is fine — patterns are a vocabulary for intent. Calling it a proxy tells the next reader "access control lives here".',
            es: 'Estructuralmente muchas veces no se distinguen en el código, y está bien: los patrones son un vocabulario de intención. Llamarlo proxy le dice al siguiente lector "aquí vive el control de acceso".',
          },
        },
        {
          kind: 'choice',
          id: 'prx-2',
          prompt: {
            en: 'What is a virtual proxy for?',
            es: '¿Para qué sirve un proxy virtual?',
          },
          choices: [
            { en: 'Encrypting the object', es: 'Cifrar el objeto' },
            {
              en: 'Delaying expensive construction until the object is actually used',
              es: 'Retrasar una construcción cara hasta que el objeto se use de verdad',
            },
            { en: 'Copying the object', es: 'Copiar el objeto' },
            { en: 'Running it on another thread', es: 'Ejecutarlo en otro hilo' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Loading a 200MB document just to display its filename is waste. The proxy holds the id, looks identical, and fetches only when someone asks for content.',
            es: 'Cargar un documento de 200MB solo para mostrar su nombre es un desperdicio. El proxy guarda el id, parece idéntico y solo va a buscar cuando alguien pide el contenido.',
          },
        },
        {
          kind: 'boolean',
          id: 'prx-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A remote proxy makes distributed calls safe by making them look local.',
            es: 'Un proxy remoto hace seguras las llamadas distribuidas al hacerlas parecer locales.',
          },
          answer: false,
          explanation: {
            en: 'It makes them look local, which is precisely the danger. The call can still be slow, fail, or succeed without you hearing — the lesson from the Networking unit. Hiding that behind a method call invites code that never handles it.',
            es: 'Las hace parecer locales, que es justo el peligro. La llamada sigue pudiendo ser lenta, fallar o tener éxito sin que te enteres, la lección de la unidad de redes. Esconder eso tras una llamada a método invita a código que nunca lo maneja.',
          },
        },
        {
          kind: 'choice',
          id: 'prx-4',
          prompt: {
            en: 'Which familiar performance bug is caused by virtual proxies?',
            es: '¿Qué bug de rendimiento conocido provocan los proxies virtuales?',
          },
          choices: [
            { en: 'Memory leaks', es: 'Fugas de memoria' },
            {
              en: 'The N+1 query problem — each lazy relation fires its own query inside a loop',
              es: 'El problema de consultas N+1: cada relación perezosa lanza su consulta dentro del bucle',
            },
            { en: 'Deadlocks', es: 'Interbloqueos' },
            { en: 'Stack overflow', es: 'Desbordamiento de pila' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'ORM lazy loading is this pattern, and it is why `order.user.name` inside a loop quietly becomes 101 queries. The proxy is doing exactly what it promised — just once per iteration.',
            es: 'La carga perezosa de los ORM es este patrón, y por eso `order.user.name` dentro de un bucle se convierte en silencio en 101 consultas. El proxy hace justo lo que prometió, solo que una vez por iteración.',
          },
        },
        {
          kind: 'gap',
          id: 'prx-5',
          prompt: {
            en: 'Complete the guard so the protection proxy refuses before delegating.',
            es: 'Completa la guarda para que el proxy de protección rechace antes de delegar.',
          },
          code: `class AuthorisedDocuments implements DocumentStore {
  read(id: string) {
    ___
    return this.inner.read(id)
  }
}`,
          choices: [
            'if (!this.user.canRead(id)) throw new Forbidden()',
            'this.inner.read(id)',
            'console.log(id)',
            '// no check needed',
          ],
          answerIndex: 0,
          explanation: {
            en: 'The check must happen before delegation, and the real store stays free of authorisation code entirely — which is what lets the same store be used by an admin tool with different rules.',
            es: 'La comprobación debe ir antes de delegar, y el almacén real se queda totalmente libre de código de autorización, lo que permite usar el mismo almacén desde una herramienta de administración con otras reglas.',
          },
        },
        {
          kind: 'choice',
          id: 'prx-6',
          prompt: {
            en: 'Why put authorisation in a proxy rather than inside the real object?',
            es: '¿Por qué poner la autorización en un proxy y no dentro del objeto real?',
          },
          choices: [
            { en: 'It is faster', es: 'Es más rápido' },
            {
              en: 'The domain object stays free of security concerns, and the same object serves contexts with different rules',
              es: 'El objeto de dominio se queda sin preocupaciones de seguridad, y el mismo objeto sirve a contextos con reglas distintas',
            },
            { en: 'Proxies cannot be bypassed', es: 'Los proxies no se pueden esquivar' },
            { en: 'It reduces memory', es: 'Reduce la memoria' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A background job, an admin console and a public API need three different policies over the same store. Baking one of them into the store means the other two need workarounds.',
            es: 'Un proceso en segundo plano, una consola de administración y una API pública necesitan tres políticas distintas sobre el mismo almacén. Meter una dentro obliga a las otras dos a buscarse la vida.',
          },
        },
      ],
    },
    {
      id: 'composite-bridge',
      title: { en: 'Composite, Bridge & Flyweight', es: 'Composite, Bridge y Flyweight' },
      icon: '🌳',
      summary: {
        en: 'Trees, two axes of variation, and sharing what repeats.',
        es: 'Árboles, dos ejes de variación y compartir lo que se repite.',
      },
      concept: {
        headline: {
          en: 'Three narrower tools: uniform trees, independent axes, and shared state.',
          es: 'Tres herramientas más específicas: árboles uniformes, ejes independientes y estado compartido.',
        },
        body: [
          {
            en: 'COMPOSITE lets a group and a single item share one interface, so callers stop caring which they hold. A folder and a file both answer `size()`; a discount and a bundle of discounts both answer `apply()`.',
            es: 'COMPOSITE hace que un grupo y un elemento suelto compartan una interfaz, así quien llama deja de preguntarse cuál tiene. Una carpeta y un fichero responden `size()`; un descuento y un paquete de descuentos responden `apply()`.',
          },
          {
            en: 'BRIDGE separates two things that vary independently, so you get M + N classes instead of M × N. FLYWEIGHT shares the parts of an object that repeat across thousands of instances — the classic memory optimisation.',
            es: 'BRIDGE separa dos cosas que varían de forma independiente, así tienes M + N clases en vez de M × N. FLYWEIGHT comparte las partes que se repiten en miles de instancias: la optimización de memoria clásica.',
          },
        ],
        keyPoints: [
          {
            en: 'Composite: leaf and container implement the same interface, so recursion becomes trivial.',
            es: 'Composite: hoja y contenedor implementan la misma interfaz, así la recursión se vuelve trivial.',
          },
          {
            en: 'Bridge: the sign is a class-name explosion like `PdfDarkReport`, `HtmlLightReport`.',
            es: 'Bridge: la señal es una explosión de nombres como `InformePdfOscuro`, `InformeHtmlClaro`.',
          },
          {
            en: 'Flyweight splits intrinsic (shared) from extrinsic (per-instance) state.',
            es: 'Flyweight separa el estado intrínseco (compartido) del extrínseco (por instancia).',
          },
          {
            en: 'Flyweight is a memory optimisation. Do not reach for it before you have measured.',
            es: 'Flyweight es una optimización de memoria. No recurras a él antes de haber medido.',
          },
        ],
        example: {
          caption: {
            en: 'Composite: the caller never asks "is this one or many?"',
            es: 'Composite: quien llama nunca pregunta "¿es uno o son varios?"',
          },
          code: {
            en: `interface Discount { apply(cents: number): number }

class Percentage implements Discount {
  constructor(private pct: number) {}
  apply(cents: number) { return cents * (1 - this.pct) }
}

class Combined implements Discount {          // a group IS a discount
  constructor(private parts: Discount[]) {}
  apply(cents: number) {
    return this.parts.reduce((total, d) => d.apply(total), cents)
  }
}

// checkout takes a Discount and never knows how deep it goes`,
            es: `interface Discount { apply(cents: number): number }

class Percentage implements Discount {
  constructor(private pct: number) {}
  apply(cents: number) { return cents * (1 - this.pct) }
}

class Combined implements Discount {          // un grupo ES un descuento
  constructor(private parts: Discount[]) {}
  apply(cents: number) {
    return this.parts.reduce((total, d) => d.apply(total), cents)
  }
}

// checkout recibe un Discount y nunca sabe cuánto se anida`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'cbf-1',
          prompt: {
            en: 'What does Composite let a caller stop doing?',
            es: '¿Qué deja de tener que hacer quien llama gracias a Composite?',
          },
          choices: [
            { en: 'Handling errors', es: 'Manejar errores' },
            {
              en: 'Branching on whether it holds a single item or a group of them',
              es: 'Ramificar según si tiene un elemento suelto o un grupo',
            },
            { en: 'Using loops', es: 'Usar bucles' },
            { en: 'Declaring types', es: 'Declarar tipos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Without it you get `if (Array.isArray(x))` at every level, and arbitrary nesting becomes very hard. With it, recursion falls out for free because a group satisfies the same contract as a leaf.',
            es: 'Sin él aparece `if (Array.isArray(x))` en cada nivel y anidar libremente se hace muy difícil. Con él, la recursión sale gratis porque un grupo cumple el mismo contrato que una hoja.',
          },
        },
        {
          kind: 'choice',
          id: 'cbf-2',
          prompt: {
            en: 'You have PdfDark, PdfLight, HtmlDark, HtmlLight, CsvDark, CsvLight. What is the fix?',
            es: 'Tienes PdfOscuro, PdfClaro, HtmlOscuro, HtmlClaro, CsvOscuro, CsvClaro. ¿Cuál es el arreglo?',
          },
          choices: [
            { en: 'More inheritance', es: 'Más herencia' },
            {
              en: 'Bridge — separate format from theme so you write 3 + 2 classes instead of 3 × 2',
              es: 'Bridge: separa formato de tema para escribir 3 + 2 clases en vez de 3 × 2',
            },
            { en: 'A factory', es: 'Una fábrica' },
            { en: 'A singleton', es: 'Un singleton' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The multiplication is the smell. Adding a fourth format to the combined design means one new class per theme — two today, more as themes grow; with a bridge it is always one, and adding a theme costs one too.',
            es: 'La multiplicación es el olor. Añadir un cuarto formato al diseño combinado cuesta una clase nueva por tema (dos hoy, más según crezcan los temas); con un bridge siempre es una, y añadir un tema también cuesta una.',
          },
        },
        {
          kind: 'boolean',
          id: 'cbf-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Flyweight is a good pattern to apply early, as a matter of good practice.',
            es: 'Flyweight es un buen patrón para aplicar pronto, por buena práctica.',
          },
          answer: false,
          explanation: {
            en: 'It is a memory optimisation with a real cost: shared state must be immutable, and object identity stops meaning what you expect. Apply it after profiling shows the duplication actually matters.',
            es: 'Es una optimización de memoria con coste real: el estado compartido debe ser inmutable y la identidad de los objetos deja de significar lo que esperas. Aplícalo cuando el perfilado demuestre que la duplicación importa.',
          },
        },
        {
          kind: 'choice',
          id: 'cbf-4',
          prompt: {
            en: 'In Flyweight, what is "intrinsic" state?',
            es: 'En Flyweight, ¿qué es el estado "intrínseco"?',
          },
          choices: [
            {
              en: 'The part that repeats across instances and can be shared — a glyph’s shape, a tile’s texture',
              es: 'La parte que se repite entre instancias y se puede compartir: la forma de un glifo, la textura de una baldosa',
            },
            { en: 'The part unique to each instance', es: 'La parte única de cada instancia' },
            { en: 'The object’s id', es: 'El id del objeto' },
            { en: 'Its private fields', es: 'Sus campos privados' },
          ],
          answerIndex: 0,
          explanation: {
            en: 'Ten thousand trees in a game share one mesh and one texture (intrinsic) and each keeps only its position and scale (extrinsic). That split is the entire pattern.',
            es: 'Diez mil árboles de un videojuego comparten una malla y una textura (intrínseco) y cada uno guarda solo su posición y escala (extrínseco). Esa separación es todo el patrón.',
          },
        },
        {
          kind: 'gap',
          id: 'cbf-5',
          prompt: {
            en: 'Complete the class so a group of discounts can be used wherever one is expected.',
            es: 'Completa la clase para que un grupo de descuentos sirva donde se espera uno solo.',
          },
          code: `interface Discount { apply(cents: number): number }

class Combined ___ {
  constructor(private parts: Discount[]) {}
  apply(cents: number) {
    return this.parts.reduce((total, d) => d.apply(total), cents)
  }
}`,
          choices: [
            'implements Discount',
            'extends Discount[]',
            'implements Discount[]',
            'extends Array<Discount>',
          ],
          answerIndex: 0,
          explanation: {
            en: 'The group must BE a Discount, not hold a list of them in public. That is what lets a `Combined` contain another `Combined` and lets checkout stay ignorant of the whole tree.',
            es: 'El grupo debe SER un Discount, no exponer una lista de ellos. Eso es lo que permite que un `Combined` contenga otro `Combined` y que checkout ignore el árbol entero.',
          },
        },
        {
          kind: 'choice',
          id: 'cbf-6',
          prompt: {
            en: 'What must be true of the shared state in a Flyweight?',
            es: '¿Qué debe cumplir el estado compartido en un Flyweight?',
          },
          choices: [
            { en: 'It must be small', es: 'Debe ser pequeño' },
            {
              en: 'It must be immutable — one mutation would change every object sharing it',
              es: 'Debe ser inmutable: una mutación cambiaría todos los objetos que lo comparten',
            },
            { en: 'It must be private', es: 'Debe ser privado' },
            { en: 'It must be serialisable', es: 'Debe ser serializable' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'This is the shared-reference bug from the Memory unit, deliberately embraced. Sharing is only safe while nothing can write — the moment one instance mutates the shared part, ten thousand others change with it.',
            es: 'Es el bug de referencia compartida de la unidad de memoria, aceptado a propósito. Compartir solo es seguro mientras nada pueda escribir: en cuanto una instancia muta la parte compartida, otras diez mil cambian con ella.',
          },
        },
      ],
    },
  ],
}
