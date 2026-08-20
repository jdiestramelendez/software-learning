import type { Section } from '../types'

export const behavioural: Section = {
  id: 'behavioural',
  title: { en: 'Behavioural patterns', es: 'Patrones de comportamiento' },
  subtitle: {
    en: 'How responsibility moves between objects at runtime.',
    es: 'Cómo se mueve la responsabilidad entre objetos en ejecución.',
  },
  units: [
    {
      id: 'strategy',
      title: { en: 'Strategy', es: 'Strategy' },
      icon: '🧠',
      summary: {
        en: 'Swap an algorithm at runtime — the cure for the growing switch.',
        es: 'Cambia un algoritmo en ejecución: la cura del switch que crece.',
      },
      concept: {
        headline: {
          en: 'Strategy turns "which algorithm?" from a branch into an argument.',
          es: 'Strategy convierte "¿qué algoritmo?" de una rama en un argumento.',
        },
        body: [
          {
            en: 'Every family of interchangeable behaviours — shipping calculators, sort orders, pricing rules, retry policies — can either live in one function full of branches, or in one small class each behind a shared interface.',
            es: 'Toda familia de comportamientos intercambiables —cálculos de envío, criterios de orden, reglas de precio, políticas de reintento— puede vivir en una función llena de ramas o en una clase pequeña cada uno tras una interfaz común.',
          },
          {
            en: 'It is the most useful behavioural pattern precisely because it is the direct implementation of OCP: the fourth strategy is a new file, and the code that uses strategies never changes.',
            es: 'Es el patrón de comportamiento más útil justo porque es la implementación directa de OCP: la cuarta estrategia es un fichero nuevo y el código que usa estrategias no cambia nunca.',
          },
        ],
        keyPoints: [
          {
            en: 'One interface, many small implementations, chosen by the caller or by config.',
            es: 'Una interfaz, muchas implementaciones pequeñas, elegidas por quien llama o por configuración.',
          },
          {
            en: 'In a language with first-class functions, a strategy is often just a function.',
            es: 'En un lenguaje con funciones de primera clase, una estrategia suele ser solo una función.',
          },
          {
            en: 'Strategy chooses HOW something is done. State changes WHAT the object does next.',
            es: 'Strategy elige CÓMO se hace algo. State cambia QUÉ hace el objeto a continuación.',
          },
          {
            en: 'Pair it with a factory: the factory maps config to a strategy, the domain just uses it.',
            es: 'Combínalo con una fábrica: la fábrica mapea configuración a estrategia y el dominio solo la usa.',
          },
        ],
        example: {
          caption: {
            en: 'The switch becomes an argument',
            es: 'El switch se convierte en un argumento',
          },
          code: {
            en: `// A strategy can be an interface...
interface ShippingRule { costCents(kg: number): number }

class Standard implements ShippingRule { costCents(kg: number) { return 500 + kg * 80 } }
class Express implements ShippingRule { costCents(kg: number) { return 1200 + kg * 150 } }

// ...or, in TypeScript, simply a function
type ShippingRuleFn = (kg: number) => number
const standard: ShippingRuleFn = (kg) => 500 + kg * 80

function checkout(kg: number, rule: ShippingRuleFn) { return rule(kg) }`,
            es: `// Una estrategia puede ser una interfaz...
interface ShippingRule { costCents(kg: number): number }

class Standard implements ShippingRule { costCents(kg: number) { return 500 + kg * 80 } }
class Express implements ShippingRule { costCents(kg: number) { return 1200 + kg * 150 } }

// ...o, en TypeScript, sencillamente una función
type ShippingRuleFn = (kg: number) => number
const standard: ShippingRuleFn = (kg) => 500 + kg * 80

function checkout(kg: number, rule: ShippingRuleFn) { return rule(kg) }`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'str-1',
          prompt: {
            en: 'Which smell most directly calls for Strategy?',
            es: '¿Qué olor pide más directamente un Strategy?',
          },
          choices: [
            { en: 'A class with many fields', es: 'Una clase con muchos campos' },
            {
              en: 'A switch over an algorithm choice that grows with every new business case',
              es: 'Un switch sobre la elección de algoritmo que crece con cada caso de negocio',
            },
            { en: 'Deep inheritance', es: 'Herencia profunda' },
            { en: 'Long parameter lists', es: 'Listas largas de parámetros' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'That switch is OCP’s canonical violation, and Strategy is its canonical fix. Each branch becomes a class or function that can be tested and swapped on its own.',
            es: 'Ese switch es la violación canónica de OCP, y Strategy es su arreglo canónico. Cada rama se convierte en una clase o función que se puede testear y cambiar por separado.',
          },
        },
        {
          kind: 'choice',
          id: 'str-2',
          prompt: {
            en: 'What separates Strategy from State?',
            es: '¿Qué separa Strategy de State?',
          },
          choices: [
            { en: 'Nothing', es: 'Nada' },
            {
              en: 'A strategy is chosen from outside and does not change itself; a state transitions the object to the next state',
              es: 'La estrategia se elige desde fuera y no se cambia sola; un estado hace que el objeto pase al siguiente estado',
            },
            { en: 'Strategy uses inheritance', es: 'Strategy usa herencia' },
            { en: 'State is faster', es: 'State es más rápido' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Identical structure, opposite direction of control. With Strategy the caller decides; with State the current state decides what comes next, and the object rewires itself.',
            es: 'Estructura idéntica, dirección de control opuesta. Con Strategy decide quien llama; con State decide el estado actual qué viene después, y el objeto se reconecta solo.',
          },
        },
        {
          kind: 'boolean',
          id: 'str-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'In TypeScript, a strategy must be a class implementing an interface.',
            es: 'En TypeScript, una estrategia tiene que ser una clase que implementa una interfaz.',
          },
          answer: false,
          explanation: {
            en: 'A function type is a perfectly good strategy and usually clearer. Reach for a class when the strategy needs its own dependencies or several related methods.',
            es: 'Un tipo función es una estrategia perfectamente válida y normalmente más clara. Usa una clase cuando la estrategia necesite sus propias dependencias o varios métodos relacionados.',
          },
        },
        {
          kind: 'gap',
          id: 'str-4',
          prompt: {
            en: 'Complete the parameter so checkout accepts any shipping rule.',
            es: 'Completa el parámetro para que checkout acepte cualquier regla de envío.',
          },
          code: `interface ShippingRule { costCents(kg: number): number }

function checkout(kg: number, rule: ___): number {
  return rule.costCents(kg)
}`,
          choices: ['ShippingRule', 'Standard', "'standard' | 'express'", 'string'],
          answerIndex: 0,
          explanation: {
            en: 'A union of names would need editing for every new rule — the switch, moved into the type system. Depending on the interface keeps this function permanently closed to modification.',
            es: 'Una unión de nombres habría que editarla con cada regla nueva: el switch, mudado al sistema de tipos. Depender de la interfaz mantiene esta función cerrada a modificación para siempre.',
          },
        },
        {
          kind: 'choice',
          id: 'str-5',
          prompt: {
            en: 'How do Strategy and Factory usually work together?',
            es: '¿Cómo suelen trabajar juntos Strategy y Factory?',
          },
          choices: [
            { en: 'They cannot be combined', es: 'No se pueden combinar' },
            {
              en: 'The factory maps config to a concrete strategy; the domain only ever sees the interface',
              es: 'La fábrica mapea configuración a una estrategia concreta; el dominio solo ve la interfaz',
            },
            { en: 'The strategy creates the factory', es: 'La estrategia crea la fábrica' },
            { en: 'They are the same pattern', es: 'Son el mismo patrón' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Something must turn the string `"express"` into an object. Keeping that in one factory is what lets every other file stay free of concrete strategy names.',
            es: 'Algo tiene que convertir la cadena `"express"` en un objeto. Tener eso en una fábrica es lo que permite que el resto de ficheros se libren de los nombres concretos de estrategia.',
          },
        },
        {
          kind: 'choice',
          id: 'str-6',
          prompt: {
            en: 'What does Strategy do for testability?',
            es: '¿Qué hace Strategy por la testeabilidad?',
          },
          choices: [
            { en: 'Nothing', es: 'Nada' },
            {
              en: 'Each algorithm can be tested alone, and the code that uses one can be tested with a trivial fake',
              es: 'Cada algoritmo se testea por separado, y el código que usa uno se testea con un doble trivial',
            },
            { en: 'It removes the need for tests', es: 'Elimina la necesidad de tests' },
            { en: 'It makes tests run in parallel', es: 'Hace que los tests corran en paralelo' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A switch forces you to reach every branch through the whole calling function. Separate strategies mean small, direct tests — plus you can pass `() => 0` to test the caller’s logic in isolation.',
            es: 'Un switch te obliga a alcanzar cada rama a través de toda la función que llama. Las estrategias separadas dan tests pequeños y directos, y además puedes pasar `() => 0` para probar la lógica de quien llama de forma aislada.',
          },
        },
      ],
    },
    {
      id: 'observer',
      title: { en: 'Observer', es: 'Observer' },
      icon: '📡',
      summary: {
        en: 'Tell interested parties something happened, without knowing who they are.',
        es: 'Avisa a los interesados de que algo pasó, sin saber quiénes son.',
      },
      concept: {
        headline: {
          en: 'The subject announces; it never learns who is listening.',
          es: 'El sujeto anuncia; nunca llega a saber quién escucha.',
        },
        body: [
          {
            en: 'When an order is placed, five things should happen: email, analytics, inventory, loyalty points, fraud check. Calling all five from checkout couples it to all five. Publishing "order placed" couples it to none.',
            es: 'Cuando se hace un pedido, deben pasar cinco cosas: correo, analítica, inventario, puntos de fidelidad, comprobación de fraude. Llamar a las cinco desde checkout lo acopla a las cinco. Publicar "pedido realizado" no lo acopla a ninguna.',
          },
          {
            en: 'You buy decoupling and pay in traceability. Following the flow now means searching for subscribers, and a listener that throws can take down the publisher unless you decide otherwise. Both are solvable — but only if you know they exist.',
            es: 'Compras desacoplamiento y pagas en trazabilidad. Seguir el flujo pasa a ser buscar suscriptores, y un oyente que lanza un error puede tumbar al emisor si no decides lo contrario. Ambas cosas se resuelven, pero solo si sabes que existen.',
          },
        ],
        keyPoints: [
          {
            en: 'The subject holds a list of listeners and knows nothing about what they do.',
            es: 'El sujeto guarda una lista de oyentes y no sabe nada de lo que hacen.',
          },
          {
            en: 'Forgetting to unsubscribe is the classic memory leak — the subject holds the listener alive.',
            es: 'Olvidar darse de baja es la fuga de memoria clásica: el sujeto mantiene vivo al oyente.',
          },
          {
            en: 'Decide explicitly whether one failing listener stops the others.',
            es: 'Decide explícitamente si un oyente que falla detiene a los demás.',
          },
          {
            en: 'This is pub/sub, SNS and DOM events — the same pattern at three scales.',
            es: 'Esto es pub/sub, SNS y los eventos del DOM: el mismo patrón a tres escalas.',
          },
        ],
        example: {
          caption: {
            en: 'Checkout stops knowing what happens next',
            es: 'Checkout deja de saber qué pasa después',
          },
          code: {
            en: `type Listener = (order: Order) => void

class OrderPublisher {
  private listeners: Listener[] = []

  subscribe(fn: Listener): () => void {
    this.listeners.push(fn)
    return () => {                              // always return the unsubscribe
      this.listeners = this.listeners.filter((l) => l !== fn)
    }
  }

  publish(order: Order) {
    for (const l of this.listeners) {
      try { l(order) } catch (e) { logger.error('listener failed', e) }
    }                                           // one failure must not stop the rest
  }
}`,
            es: `type Listener = (order: Order) => void

class OrderPublisher {
  private listeners: Listener[] = []

  subscribe(fn: Listener): () => void {
    this.listeners.push(fn)
    return () => {                              // devuelve siempre la baja
      this.listeners = this.listeners.filter((l) => l !== fn)
    }
  }

  publish(order: Order) {
    for (const l of this.listeners) {
      try { l(order) } catch (e) { logger.error('listener failed', e) }
    }                                           // un fallo no debe parar al resto
  }
}`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'obs-p1',
          prompt: {
            en: 'What does the subject gain by publishing instead of calling directly?',
            es: '¿Qué gana el sujeto publicando en vez de llamar directamente?',
          },
          choices: [
            { en: 'Speed', es: 'Velocidad' },
            {
              en: 'It stops depending on the listeners, so a sixth one can be added without touching it',
              es: 'Deja de depender de los oyentes, así se puede añadir un sexto sin tocarlo',
            },
            { en: 'Guaranteed delivery', es: 'Entrega garantizada' },
            { en: 'Type safety', es: 'Seguridad de tipos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Checkout goes from importing five services to importing none. That is OCP again: the new listener is new code, and the publisher is closed to modification.',
            es: 'Checkout pasa de importar cinco servicios a no importar ninguno. Es OCP otra vez: el oyente nuevo es código nuevo y el emisor queda cerrado a modificación.',
          },
        },
        {
          kind: 'choice',
          id: 'obs-p2',
          prompt: {
            en: 'What is the classic memory leak in Observer?',
            es: '¿Cuál es la fuga de memoria clásica de Observer?',
          },
          choices: [
            { en: 'Publishing too often', es: 'Publicar demasiado a menudo' },
            {
              en: 'A listener that never unsubscribes — the subject keeps it, and everything it captured, alive',
              es: 'Un oyente que nunca se da de baja: el sujeto lo mantiene vivo, y con él todo lo que capturó',
            },
            { en: 'Too many events', es: 'Demasiados eventos' },
            { en: 'Circular references between listeners', es: 'Referencias circulares entre oyentes' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Exactly the leak from the Memory unit: the GC cannot free what is still referenced. A component that subscribes on mount and never unsubscribes leaks its whole closure on every remount.',
            es: 'Exactamente la fuga de la unidad de memoria: el recolector no puede liberar lo que sigue referenciado. Un componente que se suscribe al montarse y nunca se da de baja filtra todo su closure en cada remontaje.',
          },
        },
        {
          kind: 'boolean',
          id: 'obs-p3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Observer makes a system easier to trace and debug.',
            es: 'Observer hace un sistema más fácil de seguir y depurar.',
          },
          answer: false,
          explanation: {
            en: 'This is the honest trade. You gain decoupling and lose the call stack: "why did this email go out?" turns into a search for subscribers. Worth it often — free, never.',
            es: 'Este es el trato honesto. Ganas desacoplamiento y pierdes la pila de llamadas: "¿por qué salió este correo?" se convierte en buscar suscriptores. Muchas veces compensa; gratis, nunca.',
          },
        },
        {
          kind: 'gap',
          id: 'obs-p4',
          prompt: {
            en: 'Complete the return type so callers can always unsubscribe.',
            es: 'Completa el tipo de retorno para que siempre se pueda dar de baja.',
          },
          code: `subscribe(fn: Listener): ___ {
  this.listeners.push(fn)
  return () => { this.listeners = this.listeners.filter((l) => l !== fn) }
}`,
          choices: ['() => void', 'void', 'Listener', 'boolean'],
          answerIndex: 0,
          explanation: {
            en: 'Handing back an unsubscribe function is what makes cleanup possible without the caller keeping a reference to the exact same function object — which is where "unsubscribe did nothing" bugs come from.',
            es: 'Devolver una función de baja es lo que permite limpiar sin que quien llama guarde la referencia exacta a la misma función, que es de donde salen los bugs de "la baja no hizo nada".',
          },
        },
        {
          kind: 'choice',
          id: 'obs-p5',
          prompt: {
            en: 'One listener throws. What should the publisher do by default?',
            es: 'Un oyente lanza un error. ¿Qué debería hacer el emisor por defecto?',
          },
          choices: [
            { en: 'Stop and rethrow immediately', es: 'Parar y relanzar de inmediato' },
            {
              en: 'Catch it, log it, and continue — one broken listener must not silently cancel the others',
              es: 'Capturarlo, registrarlo y continuar: un oyente roto no debe cancelar en silencio a los demás',
            },
            { en: 'Retry that listener forever', es: 'Reintentar ese oyente eternamente' },
            { en: 'Unsubscribe it', es: 'Darlo de baja' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Otherwise a failing analytics listener stops the confirmation email — and which one breaks depends on subscription order, which nobody controls. Make the choice explicitly rather than inheriting it from a loop.',
            es: 'Si no, un oyente de analítica roto impide el correo de confirmación, y cuál se rompe depende del orden de suscripción, que nadie controla. Toma la decisión explícitamente en vez de heredarla de un bucle.',
          },
        },
        {
          kind: 'choice',
          id: 'obs-p6',
          prompt: {
            en: 'Which AWS service is Observer at infrastructure scale?',
            es: '¿Qué servicio de AWS es Observer a escala de infraestructura?',
          },
          choices: [
            { en: 'SQS', es: 'SQS' },
            { en: 'SNS — one message fanned out to every subscriber', es: 'SNS: un mensaje repartido a todos los suscriptores' },
            { en: 'RDS', es: 'RDS' },
            { en: 'S3', es: 'S3' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'SNS is publish/subscribe across machines: the publisher does not know its subscribers, and adding one changes nothing upstream. SQS is a queue — one consumer per message, a different pattern.',
            es: 'SNS es publicación y suscripción entre máquinas: el emisor no conoce a sus suscriptores y añadir uno no cambia nada aguas arriba. SQS es una cola —un consumidor por mensaje—, otro patrón.',
          },
        },
      ],
    },
    {
      id: 'command',
      title: { en: 'Command', es: 'Command' },
      icon: '📮',
      summary: {
        en: 'Turn a request into an object you can queue, log, retry and undo.',
        es: 'Convierte una petición en un objeto que puedes encolar, registrar, reintentar y deshacer.',
      },
      concept: {
        headline: {
          en: 'Once an action is an object, it gains superpowers a method call never had.',
          es: 'En cuanto una acción es un objeto, gana superpoderes que una llamada a método nunca tuvo.',
        },
        body: [
          {
            en: 'A method call happens and is gone. A command object can be put in a queue, written to a log, sent over a network, retried after a crash, scheduled for later, or reversed.',
            es: 'Una llamada a método ocurre y desaparece. Un objeto comando se puede meter en una cola, escribir en un log, mandar por la red, reintentar tras una caída, programar para después o revertir.',
          },
          {
            en: 'Undo is the famous use: give each command an `undo()` and a stack gives you unlimited undo for free. But the everyday use is asynchronous work — every job queue in existence is this pattern.',
            es: 'Deshacer es el uso famoso: dale a cada comando un `undo()` y una pila te da deshacer ilimitado gratis. Pero el uso cotidiano es el trabajo asíncrono: toda cola de trabajos que existe es este patrón.',
          },
        ],
        keyPoints: [
          {
            en: 'A command bundles everything needed to run later: the action AND its arguments.',
            es: 'Un comando agrupa todo lo necesario para ejecutarse después: la acción Y sus argumentos.',
          },
          {
            en: 'Add `undo()` and a stack, and you have undo/redo.',
            es: 'Añade `undo()` y una pila, y tienes deshacer y rehacer.',
          },
          {
            en: 'Because it can be retried, a command should be idempotent — same lesson as SQS.',
            es: 'Como se puede reintentar, un comando debería ser idempotente: la misma lección que SQS.',
          },
          {
            en: 'A command must serialise if it crosses a process boundary. Do not put live objects in it.',
            es: 'Un comando debe poder serializarse si cruza un proceso. No metas objetos vivos dentro.',
          },
        ],
        example: {
          caption: {
            en: 'The same object queued, retried and undone',
            es: 'El mismo objeto encolado, reintentado y deshecho',
          },
          code: {
            en: `interface Command {
  execute(): Promise<void>
  undo(): Promise<void>
}

class RefundOrder implements Command {
  constructor(private orderId: string, private cents: number) {}
  async execute() { await payments.refund(this.orderId, this.cents) }
  async undo() { await payments.charge(this.orderId, this.cents) }
}

// Queue it, persist it, replay it after a crash — it is just data plus behaviour
await queue.push(new RefundOrder('ord_123', 4999))`,
            es: `interface Command {
  execute(): Promise<void>
  undo(): Promise<void>
}

class RefundOrder implements Command {
  constructor(private orderId: string, private cents: number) {}
  async execute() { await payments.refund(this.orderId, this.cents) }
  async undo() { await payments.charge(this.orderId, this.cents) }
}

// Encólalo, persístelo, repítelo tras una caída: son datos más comportamiento
await queue.push(new RefundOrder('ord_123', 4999))`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'cmd-1',
          prompt: {
            en: 'What does turning a request into an object make possible?',
            es: '¿Qué hace posible convertir una petición en un objeto?',
          },
          choices: [
            { en: 'Faster execution', es: 'Ejecución más rápida' },
            {
              en: 'Queueing, logging, scheduling, retrying and undoing it — because it now outlives the call',
              es: 'Encolarla, registrarla, programarla, reintentarla y deshacerla, porque ahora sobrevive a la llamada',
            },
            { en: 'Type safety', es: 'Seguridad de tipos' },
            { en: 'Less memory', es: 'Menos memoria' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The value is in the lifetime. A method call exists only on the stack; a command is data you can store, ship and replay long after the original request ended.',
            es: 'El valor está en la duración. Una llamada a método existe solo en la pila; un comando son datos que puedes guardar, enviar y repetir mucho después de que acabara la petición original.',
          },
        },
        {
          kind: 'choice',
          id: 'cmd-2',
          prompt: {
            en: 'What do you need on each command to get unlimited undo?',
            es: '¿Qué necesitas en cada comando para tener deshacer ilimitado?',
          },
          choices: [
            { en: 'A timestamp', es: 'Una marca de tiempo' },
            {
              en: 'An `undo()` that reverses it, plus a stack of executed commands',
              es: 'Un `undo()` que lo revierta, más una pila de comandos ejecutados',
            },
            { en: 'A database transaction', es: 'Una transacción de base de datos' },
            { en: 'A unique id', es: 'Un id único' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Pop the stack, call `undo()`, push it onto a redo stack. Every text editor you have used works exactly like this — which is why the pattern is worth recognising on sight.',
            es: 'Sacas de la pila, llamas a `undo()` y lo empujas a una pila de rehacer. Todos los editores de texto que has usado funcionan así, y por eso conviene reconocer el patrón a simple vista.',
          },
        },
        {
          kind: 'boolean',
          id: 'cmd-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A command that will be queued should hold a reference to a live database connection.',
            es: 'Un comando que se va a encolar debería guardar una referencia a una conexión viva de base de datos.',
          },
          answer: false,
          explanation: {
            en: 'A queued command may run in a different process, minutes later, after a restart. It must contain plain serialisable data and look its dependencies up at execution time.',
            es: 'Un comando encolado puede ejecutarse en otro proceso, minutos después, tras un reinicio. Debe contener datos serializables y buscar sus dependencias en el momento de ejecutarse.',
          },
        },
        {
          kind: 'choice',
          id: 'cmd-4',
          prompt: {
            en: 'Why must a queued command be idempotent?',
            es: '¿Por qué un comando encolado debe ser idempotente?',
          },
          choices: [
            { en: 'To run faster', es: 'Para ir más rápido' },
            {
              en: 'At-least-once delivery means it can be executed twice — the same lesson as SQS',
              es: 'La entrega "al menos una vez" implica que puede ejecutarse dos veces: la misma lección que SQS',
            },
            { en: 'To be serialisable', es: 'Para ser serializable' },
            { en: 'To support undo', es: 'Para soportar deshacer' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A worker that completes the refund and dies before acknowledging it will see the command again. Without idempotency that is a double refund — real money, from a design detail.',
            es: 'Un worker que completa el reembolso y muere antes de confirmarlo volverá a ver el comando. Sin idempotencia eso es un doble reembolso: dinero real, por un detalle de diseño.',
          },
        },
        {
          kind: 'gap',
          id: 'cmd-5',
          prompt: {
            en: 'Complete the field so this command survives being serialised into a queue.',
            es: 'Completa el campo para que este comando sobreviva a serializarse en una cola.',
          },
          code: `class RefundOrder implements Command {
  constructor(private orderId: ___, private cents: number) {}
  async execute() { await payments.refund(this.orderId, this.cents) }
}`,
          choices: ['string', 'Order', 'DatabaseConnection', 'Promise<Order>'],
          answerIndex: 0,
          explanation: {
            en: 'An id survives JSON; a live `Order` object with methods and a connection does not. Store identifiers, resolve them when the command actually runs.',
            es: 'Un id sobrevive a JSON; un objeto `Order` vivo con métodos y una conexión no. Guarda identificadores y resuélvelos cuando el comando se ejecute de verdad.',
          },
        },
        {
          kind: 'choice',
          id: 'cmd-6',
          prompt: {
            en: 'Which everyday piece of infrastructure is the Command pattern?',
            es: '¿Qué pieza cotidiana de infraestructura es el patrón Command?',
          },
          choices: [
            { en: 'A load balancer', es: 'Un balanceador de carga' },
            { en: 'A background job queue', es: 'Una cola de trabajos en segundo plano' },
            { en: 'A CDN', es: 'Un CDN' },
            { en: 'A connection pool', es: 'Un pool de conexiones' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Every job queue serialises "do this later, with these arguments" and hands it to a worker. Recognising it as Command is what tells you it needs idempotency, a retry limit and a dead-letter queue.',
            es: 'Toda cola de trabajos serializa "haz esto luego, con estos argumentos" y se lo pasa a un worker. Reconocerlo como Command es lo que te dice que necesita idempotencia, límite de reintentos y cola de fallidos.',
          },
        },
      ],
    },
    {
      id: 'state',
      title: { en: 'State', es: 'State' },
      icon: '🚦',
      summary: {
        en: 'Replace a tangle of boolean flags with explicit states.',
        es: 'Sustituye una maraña de flags booleanos por estados explícitos.',
      },
      concept: {
        headline: {
          en: 'Four booleans give you sixteen combinations, and only five of them are legal.',
          es: 'Cuatro booleanos dan dieciséis combinaciones, y solo cinco son legales.',
        },
        body: [
          {
            en: '`isPaid`, `isShipped`, `isCancelled`, `isRefunded` look reasonable until you notice that shipped-and-cancelled is representable. Every method then has to defend against combinations that should not exist.',
            es: '`isPaid`, `isShipped`, `isCancelled`, `isRefunded` parecen razonables hasta que ves que "enviado y cancelado" se puede representar. Luego cada método tiene que defenderse de combinaciones que no deberían existir.',
          },
          {
            en: 'The State pattern replaces the flags with one object per state. Each knows what it can do and which state comes next, so illegal combinations become unrepresentable rather than merely forbidden.',
            es: 'El patrón State sustituye los flags por un objeto por estado. Cada uno sabe qué puede hacer y cuál viene después, así las combinaciones ilegales pasan de estar prohibidas a ser irrepresentables.',
          },
        ],
        keyPoints: [
          {
            en: 'N booleans = 2^N representable combinations. Most are invalid.',
            es: 'N booleanos = 2^N combinaciones representables. La mayoría son inválidas.',
          },
          {
            en: 'One object per state; each decides what is allowed and what comes next.',
            es: 'Un objeto por estado; cada uno decide qué se permite y qué viene después.',
          },
          {
            en: 'In TypeScript a discriminated union is often the lighter, better version.',
            es: 'En TypeScript, una unión discriminada suele ser la versión más ligera y mejor.',
          },
          {
            en: 'Same structure as Strategy — but here the object changes its own state.',
            es: 'La misma estructura que Strategy, pero aquí el objeto cambia su propio estado.',
          },
        ],
        example: {
          caption: {
            en: 'Illegal states become unrepresentable',
            es: 'Los estados ilegales se vuelven irrepresentables',
          },
          code: {
            en: `// 16 combinations, 5 legal — every method must defend itself
interface Order { isPaid: boolean; isShipped: boolean; isCancelled: boolean; isRefunded: boolean }

// One shape per state; the compiler rejects the rest
type Order =
  | { status: 'pending' }
  | { status: 'paid'; receiptId: string }
  | { status: 'shipped'; receiptId: string; trackingId: string }
  | { status: 'cancelled'; reason: string }

// A shipped order HAS a tracking id. A cancelled one has no receipt to read.`,
            es: `// 16 combinaciones, 5 legales: cada método debe defenderse
interface Order { isPaid: boolean; isShipped: boolean; isCancelled: boolean; isRefunded: boolean }

// Una forma por estado; el compilador rechaza el resto
type Order =
  | { status: 'pending' }
  | { status: 'paid'; receiptId: string }
  | { status: 'shipped'; receiptId: string; trackingId: string }
  | { status: 'cancelled'; reason: string }

// Un pedido enviado TIENE seguimiento. Uno cancelado no tiene recibo que leer.`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'sta-1',
          prompt: {
            en: 'What is wrong with modelling an order using four boolean flags?',
            es: '¿Qué falla al modelar un pedido con cuatro flags booleanos?',
          },
          choices: [
            { en: 'Booleans use too much memory', es: 'Los booleanos gastan mucha memoria' },
            {
              en: 'They allow 16 combinations when only a handful are legal, so every method must defend itself',
              es: 'Permiten 16 combinaciones cuando solo un puñado son legales, así cada método debe defenderse',
            },
            { en: 'Booleans cannot be serialised', es: 'Los booleanos no se pueden serializar' },
            { en: 'They are slower than enums', es: 'Son más lentos que los enums' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Nothing stops `isShipped && isCancelled` from being true. The bug is not that someone sets it deliberately — it is that a partial failure somewhere leaves it that way and nothing notices.',
            es: 'Nada impide que `isShipped && isCancelled` sea cierto a la vez. El bug no es que alguien lo ponga a propósito: es que un fallo parcial en algún sitio lo deja así y nadie se entera.',
          },
        },
        {
          kind: 'choice',
          id: 'sta-2',
          prompt: {
            en: 'What does a discriminated union give you that flags do not?',
            es: '¿Qué te da una unión discriminada que no dan los flags?',
          },
          choices: [
            { en: 'Faster comparisons', es: 'Comparaciones más rápidas' },
            {
              en: 'Each state carries exactly the data it needs, and the compiler rejects impossible combinations',
              es: 'Cada estado lleva exactamente los datos que necesita y el compilador rechaza combinaciones imposibles',
            },
            { en: 'Automatic persistence', es: 'Persistencia automática' },
            { en: 'Less code', es: 'Menos código' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A `pending` order has no receipt id, so reading one becomes a compile error rather than an `undefined` at runtime. The type does the defending that every method used to do by hand.',
            es: 'Un pedido `pending` no tiene id de recibo, así que leerlo pasa a ser error de compilación en vez de un `undefined` en ejecución. El tipo hace la defensa que antes hacía a mano cada método.',
          },
        },
        {
          kind: 'boolean',
          id: 'sta-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'State and Strategy have the same structure but different control flow.',
            es: 'State y Strategy tienen la misma estructura pero distinto flujo de control.',
          },
          answer: true,
          explanation: {
            en: 'Both delegate to an interchangeable object. With Strategy the caller picks and it stays picked; with State the current state decides the transition, so the object rewires itself as it runs.',
            es: 'Los dos delegan en un objeto intercambiable. Con Strategy elige quien llama y se queda así; con State decide la transición el estado actual, así que el objeto se reconecta solo mientras corre.',
          },
        },
        {
          kind: 'gap',
          id: 'sta-4',
          prompt: {
            en: 'Complete the state so a shipped order must carry its tracking id.',
            es: 'Completa el estado para que un pedido enviado deba llevar su id de seguimiento.',
          },
          code: `type Order =
  | { status: 'pending' }
  | { status: 'paid'; receiptId: string }
  | { status: 'shipped'; receiptId: string; ___ }`,
          choices: [
            'trackingId: string',
            'trackingId?: string',
            'isShipped: boolean',
            'tracking: unknown',
          ],
          answerIndex: 0,
          explanation: {
            en: 'Making it optional puts you straight back where you started: a shipped order that might have no tracking, and a null check at every use. Required is the entire point of the state.',
            es: 'Hacerlo opcional te devuelve al punto de partida: un pedido enviado que quizá no tiene seguimiento y una comprobación de nulo en cada uso. Que sea obligatorio es todo el sentido del estado.',
          },
        },
        {
          kind: 'choice',
          id: 'sta-5',
          prompt: {
            en: 'Where should the rule "a cancelled order cannot ship" live?',
            es: '¿Dónde debe vivir la regla "un pedido cancelado no se puede enviar"?',
          },
          choices: [
            { en: 'In the UI', es: 'En la interfaz' },
            {
              en: 'In the state itself — `cancelled` simply does not offer a ship transition',
              es: 'En el propio estado: `cancelled` sencillamente no ofrece la transición de envío',
            },
            { en: 'In a validation service', es: 'En un servicio de validación' },
            { en: 'In the database', es: 'En la base de datos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A rule checked in one place can be forgotten in the next. A transition that does not exist cannot be forgotten — the state machine enforces it everywhere, including in code written next year.',
            es: 'Una regla comprobada en un sitio se puede olvidar en el siguiente. Una transición que no existe no se puede olvidar: la máquina de estados la impone en todas partes, incluido el código del año que viene.',
          },
        },
        {
          kind: 'order',
          id: 'sta-6',
          prompt: {
            en: 'Order the states of a normal order lifecycle.',
            es: 'Ordena los estados del ciclo de vida normal de un pedido.',
          },
          items: [
            { en: 'Pending — created, not yet paid', es: 'Pendiente: creado, aún sin pagar' },
            { en: 'Paid — a receipt now exists', es: 'Pagado: ya existe un recibo' },
            { en: 'Shipped — a tracking id now exists', es: 'Enviado: ya existe un id de seguimiento' },
            { en: 'Delivered — terminal, nothing follows', es: 'Entregado: terminal, no sigue nada' },
          ],
          explanation: {
            en: 'Each step ADDS data that the next state can rely on. That is why modelling states as separate shapes works: the type grows along with what is actually known.',
            es: 'Cada paso AÑADE datos en los que el siguiente estado puede confiar. Por eso funciona modelar los estados como formas distintas: el tipo crece a la vez que lo que se sabe de verdad.',
          },
        },
      ],
    },
    {
      id: 'template-chain',
      title: {
        en: 'Template Method & Chain of Responsibility',
        es: 'Template Method y Chain of Responsibility',
      },
      icon: '⛓️',
      summary: {
        en: 'A fixed skeleton with variable steps, and a pipeline of handlers.',
        es: 'Un esqueleto fijo con pasos variables, y una tubería de manejadores.',
      },
      concept: {
        headline: {
          en: 'One fixes the order and varies the steps; the other passes a request along until someone handles it.',
          es: 'Uno fija el orden y varía los pasos; el otro pasa la petición hasta que alguien la atiende.',
        },
        body: [
          {
            en: 'TEMPLATE METHOD puts the sequence in a base class and leaves holes for subclasses: every importer validates, parses, transforms and saves in that order, but each parses differently. The risk is the usual one with inheritance — the base class owns you.',
            es: 'TEMPLATE METHOD pone la secuencia en una clase base y deja huecos para las subclases: todo importador valida, analiza, transforma y guarda en ese orden, pero cada uno analiza distinto. El riesgo es el habitual de la herencia: la clase base manda sobre ti.',
          },
          {
            en: 'CHAIN OF RESPONSIBILITY lines up handlers and passes the request along until one deals with it. Every HTTP middleware stack you have used is this: authenticate, rate-limit, log, route — each free to pass or to stop.',
            es: 'CHAIN OF RESPONSIBILITY pone manejadores en fila y pasa la petición hasta que uno la atiende. Toda pila de middleware HTTP que has usado es esto: autenticar, limitar ritmo, registrar, enrutar; cada uno libre de pasar o detener.',
          },
        ],
        keyPoints: [
          {
            en: 'Template Method fixes the ORDER and varies the STEPS.',
            es: 'Template Method fija el ORDEN y varía los PASOS.',
          },
          {
            en: 'It uses inheritance, so prefer Strategy composition when you can.',
            es: 'Usa herencia, así que prefiere la composición de Strategy cuando puedas.',
          },
          {
            en: 'Chain of Responsibility: each handler either deals with the request or passes it on.',
            es: 'Chain of Responsibility: cada manejador atiende la petición o la pasa.',
          },
          {
            en: 'A chain where nobody handles the request must fail loudly, not silently.',
            es: 'Una cadena donde nadie atiende la petición debe fallar ruidosamente, no en silencio.',
          },
        ],
        example: {
          caption: {
            en: 'Middleware is a chain of responsibility',
            es: 'El middleware es una cadena de responsabilidad',
          },
          code: {
            en: `type Handler = (req: Request, next: () => Response) => Response

const authenticate: Handler = (req, next) =>
  req.token ? next() : new Response('unauthorised', { status: 401 })  // stops here

const log: Handler = (req, next) => {
  logger.info(req.url)
  return next()                                    // passes it along
}

// Order is the design: authenticate before you log the user id`,
            es: `type Handler = (req: Request, next: () => Response) => Response

const authenticate: Handler = (req, next) =>
  req.token ? next() : new Response('no autorizado', { status: 401 })  // aquí para

const log: Handler = (req, next) => {
  logger.info(req.url)
  return next()                                    // la pasa adelante
}

// El orden es el diseño: autentica antes de registrar el id de usuario`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'tcr-1',
          prompt: {
            en: 'What does Template Method fix, and what does it let vary?',
            es: '¿Qué fija Template Method y qué deja variar?',
          },
          choices: [
            { en: 'It fixes the steps and varies the order', es: 'Fija los pasos y varía el orden' },
            {
              en: 'It fixes the order of the steps and lets each step vary',
              es: 'Fija el orden de los pasos y deja variar cada paso',
            },
            { en: 'It varies both', es: 'Varía ambos' },
            { en: 'It fixes both', es: 'Fija ambos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The sequence is the invariant worth protecting — validate before you save, always. What differs between importers is how each step is done, not when.',
            es: 'La secuencia es el invariante que merece protegerse: validar antes de guardar, siempre. Lo que cambia entre importadores es cómo se hace cada paso, no cuándo.',
          },
        },
        {
          kind: 'choice',
          id: 'tcr-2',
          prompt: {
            en: 'Why is Strategy often preferred over Template Method?',
            es: '¿Por qué se suele preferir Strategy a Template Method?',
          },
          choices: [
            { en: 'It is faster', es: 'Es más rápido' },
            {
              en: 'Template Method needs inheritance, which couples subclasses to the base class permanently',
              es: 'Template Method necesita herencia, que acopla las subclases a la base para siempre',
            },
            { en: 'Strategy needs less code', es: 'Strategy necesita menos código' },
            { en: 'Template Method cannot be tested', es: 'Template Method no se puede testear' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It is composition over inheritance again. A change to the base class ripples into every subclass, and a subclass can only ever have one parent — so it cannot mix and match steps.',
            es: 'Es composición sobre herencia otra vez. Un cambio en la clase base se propaga a todas las subclases, y una subclase solo puede tener un padre, así que no puede combinar pasos a voluntad.',
          },
        },
        {
          kind: 'boolean',
          id: 'tcr-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'HTTP middleware is an implementation of Chain of Responsibility.',
            es: 'El middleware HTTP es una implementación de Chain of Responsibility.',
          },
          answer: true,
          explanation: {
            en: 'Each middleware gets the request and decides: handle it and stop, or call `next()`. Recognising the pattern is what tells you order matters and that a request falling off the end needs handling.',
            es: 'Cada middleware recibe la petición y decide: atenderla y parar, o llamar a `next()`. Reconocer el patrón es lo que te dice que el orden importa y que una petición que se cae del final necesita tratamiento.',
          },
        },
        {
          kind: 'choice',
          id: 'tcr-4',
          prompt: {
            en: 'What must a chain do when no handler deals with the request?',
            es: '¿Qué debe hacer una cadena cuando ningún manejador atiende la petición?',
          },
          choices: [
            { en: 'Return null silently', es: 'Devolver null en silencio' },
            {
              en: 'Fail loudly — a silent fall-through is a bug that hides until production',
              es: 'Fallar ruidosamente: caerse en silencio es un bug que se esconde hasta producción',
            },
            { en: 'Restart the chain', es: 'Reiniciar la cadena' },
            { en: 'Call the first handler again', es: 'Volver a llamar al primero' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A request that reaches the end unhandled means your routing is wrong. Returning null turns a configuration mistake into a mysterious null dereference three layers away.',
            es: 'Una petición que llega al final sin atender significa que tu enrutado está mal. Devolver null convierte un error de configuración en un misterioso null tres capas más allá.',
          },
        },
        {
          kind: 'order',
          id: 'tcr-5',
          prompt: {
            en: 'Order a request middleware chain so each step can rely on the previous one.',
            es: 'Ordena una cadena de middleware para que cada paso pueda confiar en el anterior.',
          },
          items: [
            { en: 'Rate limit by IP — before any real work', es: 'Limita por IP: antes de cualquier trabajo real' },
            { en: 'Authenticate the token', es: 'Autentica el token' },
            { en: 'Authorise the now-known user', es: 'Autoriza al usuario ya conocido' },
            { en: 'Log the request with its user id', es: 'Registra la petición con su id de usuario' },
            { en: 'Route to the handler', es: 'Enruta al manejador' },
          ],
          explanation: {
            en: 'Rate limiting first protects everything behind it from a flood. Authorisation cannot run before authentication, and the log can only include the user id after both.',
            es: 'Limitar primero protege de una avalancha a todo lo que viene detrás. La autorización no puede ir antes de la autenticación, y el log solo puede incluir el id de usuario después de ambas.',
          },
        },
        {
          kind: 'choice',
          id: 'tcr-6',
          prompt: {
            en: 'A subclass overrides a template step and skips calling the parent’s setup. What broke?',
            es: 'Una subclase sobrescribe un paso de la plantilla y se salta la preparación del padre. ¿Qué se rompió?',
          },
          choices: [
            { en: 'Nothing', es: 'Nada' },
            {
              en: 'The invariant the template existed to protect — this is the fragility of inheritance',
              es: 'El invariante que la plantilla existía para proteger: esta es la fragilidad de la herencia',
            },
            { en: 'The interface', es: 'La interfaz' },
            { en: 'Type checking', es: 'La comprobación de tipos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The base class cannot force a subclass to cooperate, which is why "remember to call super" appears in so many comments. Composition has no such hole: you either pass the step in or you do not.',
            es: 'La clase base no puede obligar a cooperar a la subclase, y por eso aparece tanto el comentario "acuérdate de llamar a super". La composición no tiene ese agujero: o pasas el paso o no.',
          },
        },
      ],
    },
    {
      id: 'iterator-mediator',
      title: {
        en: 'Iterator, Mediator, Visitor & Memento',
        es: 'Iterator, Mediator, Visitor y Memento',
      },
      icon: '🧰',
      summary: {
        en: 'Four you should recognise, even if you write them rarely.',
        es: 'Cuatro que conviene reconocer, aunque los escribas poco.',
      },
      concept: {
        headline: {
          en: 'You use all four constantly — usually without writing a line of them yourself.',
          es: 'Usas los cuatro constantemente, normalmente sin escribir una línea de ellos.',
        },
        body: [
          {
            en: 'ITERATOR walks a collection without exposing how it is stored — every `for…of` is one. MEDIATOR gives a group of objects a hub to talk through, so N components need N connections instead of N². Redux and every event bus are mediators.',
            es: 'ITERATOR recorre una colección sin exponer cómo se guarda: cada `for…of` es uno. MEDIATOR da a un grupo de objetos un centro por el que hablar, así N componentes necesitan N conexiones en vez de N². Redux y todo bus de eventos son mediadores.',
          },
          {
            en: 'VISITOR adds a new operation to a stable object structure without editing those classes — the tool of compilers and linters. MEMENTO captures an object’s state so it can be restored later, without exposing its internals.',
            es: 'VISITOR añade una operación nueva a una estructura de objetos estable sin editar esas clases: la herramienta de compiladores y linters. MEMENTO captura el estado de un objeto para restaurarlo después, sin exponer sus tripas.',
          },
        ],
        keyPoints: [
          {
            en: 'Iterator: traverse without knowing whether it is an array, a tree or a paged API.',
            es: 'Iterator: recorre sin saber si es un array, un árbol o una API paginada.',
          },
          {
            en: 'Mediator: turns N² direct connections into N connections through a hub.',
            es: 'Mediator: convierte N² conexiones directas en N conexiones a través de un centro.',
          },
          {
            en: 'Visitor: easy to add OPERATIONS, painful to add TYPES. Use it on stable structures only.',
            es: 'Visitor: fácil añadir OPERACIONES, doloroso añadir TIPOS. Úsalo solo en estructuras estables.',
          },
          {
            en: 'Memento: a snapshot the object can restore, with its internals staying private.',
            es: 'Memento: una instantánea que el objeto puede restaurar, manteniendo sus tripas privadas.',
          },
        ],
        example: {
          caption: {
            en: 'An iterator hides paging from the caller',
            es: 'Un iterador esconde la paginación a quien llama',
          },
          code: {
            en: `async function* allUsers(api: Api) {
  let cursor: string | undefined
  do {
    const page = await api.users({ cursor })   // paging lives here
    yield* page.items
    cursor = page.next
  } while (cursor)
}

// The caller never learns there were pages at all
for await (const user of allUsers(api)) send(user)`,
            es: `async function* allUsers(api: Api) {
  let cursor: string | undefined
  do {
    const page = await api.users({ cursor })   // la paginación vive aquí
    yield* page.items
    cursor = page.next
  } while (cursor)
}

// Quien llama nunca se entera de que había páginas
for await (const user of allUsers(api)) send(user)`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'imv-1',
          prompt: {
            en: 'What does the Iterator pattern hide from the caller?',
            es: '¿Qué esconde el patrón Iterator a quien llama?',
          },
          choices: [
            { en: 'The number of items', es: 'El número de elementos' },
            {
              en: 'How the collection is stored and traversed — array, tree or paged API all look the same',
              es: 'Cómo se guarda y recorre la colección: array, árbol o API paginada se ven igual',
            },
            { en: 'The item types', es: 'Los tipos de los elementos' },
            { en: 'Errors', es: 'Los errores' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The async generator above is the strongest example: the caller writes an ordinary loop while pagination, cursors and network calls happen invisibly behind it.',
            es: 'El generador asíncrono de arriba es el ejemplo más fuerte: quien llama escribe un bucle normal mientras la paginación, los cursores y las llamadas de red ocurren invisibles detrás.',
          },
        },
        {
          kind: 'choice',
          id: 'imv-2',
          prompt: {
            en: 'What problem does a Mediator solve?',
            es: '¿Qué problema resuelve un Mediator?',
          },
          choices: [
            { en: 'Slow rendering', es: 'Renderizado lento' },
            {
              en: 'Every component talking to every other — N² connections becoming N through a hub',
              es: 'Que cada componente hable con todos: N² conexiones que pasan a ser N a través de un centro',
            },
            { en: 'Memory leaks', es: 'Fugas de memoria' },
            { en: 'Type errors', es: 'Errores de tipos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Ten components wired directly is up to forty-five connections, and every new one makes it worse. Routing through a hub means each component knows one thing — which is exactly why state containers took over.',
            es: 'Diez componentes conectados directamente son hasta cuarenta y cinco conexiones, y cada uno nuevo lo empeora. Pasar por un centro hace que cada componente conozca una sola cosa: por eso se impusieron los contenedores de estado.',
          },
        },
        {
          kind: 'boolean',
          id: 'imv-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Visitor makes it easy to add new types to a structure.',
            es: 'Visitor facilita añadir tipos nuevos a una estructura.',
          },
          answer: false,
          explanation: {
            en: 'Exactly backwards, and it is the trade that decides whether to use it. Adding an OPERATION is one new visitor; adding a TYPE means editing every visitor that exists. Use it only where the type set is stable.',
            es: 'Justo al revés, y es el trato que decide si usarlo. Añadir una OPERACIÓN es un visitante nuevo; añadir un TIPO obliga a editar todos los visitantes existentes. Úsalo solo donde el conjunto de tipos sea estable.',
          },
        },
        {
          kind: 'choice',
          id: 'imv-4',
          prompt: {
            en: 'Where does Visitor genuinely shine?',
            es: '¿Dónde brilla de verdad Visitor?',
          },
          choices: [
            { en: 'In web controllers', es: 'En los controladores web' },
            {
              en: 'Over an abstract syntax tree — the node types rarely change, but the operations keep multiplying',
              es: 'Sobre un árbol de sintaxis abstracta: los tipos de nodo casi no cambian, pero las operaciones se multiplican',
            },
            { en: 'In database access', es: 'En el acceso a base de datos' },
            { en: 'In UI components', es: 'En componentes de interfaz' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A language grammar is stable for years while linters, formatters, type checkers and minifiers keep being added. That is the exact shape Visitor is optimised for.',
            es: 'La gramática de un lenguaje es estable durante años mientras se añaden linters, formateadores, verificadores de tipos y minificadores. Esa es exactamente la forma para la que Visitor está optimizado.',
          },
        },
        {
          kind: 'choice',
          id: 'imv-5',
          prompt: {
            en: 'What does Memento preserve that a plain public snapshot would not?',
            es: '¿Qué conserva Memento que una instantánea pública no?',
          },
          choices: [
            { en: 'Performance', es: 'El rendimiento' },
            {
              en: 'Encapsulation — the state can be restored without its internals becoming public API',
              es: 'La encapsulación: el estado se puede restaurar sin que sus tripas se vuelvan API pública',
            },
            { en: 'Type safety', es: 'La seguridad de tipos' },
            { en: 'Thread safety', es: 'La seguridad entre hilos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Exposing every field so undo can restore them means every field is now part of your public contract, forever. A memento is an opaque token only the originating object knows how to read.',
            es: 'Exponer cada campo para que deshacer pueda restaurarlos convierte cada campo en parte de tu contrato público, para siempre. Un memento es un testigo opaco que solo el objeto de origen sabe leer.',
          },
        },
        {
          kind: 'choice',
          id: 'imv-6',
          prompt: {
            en: 'Which two patterns naturally combine to build undo/redo?',
            es: '¿Qué dos patrones se combinan de forma natural para hacer deshacer y rehacer?',
          },
          choices: [
            { en: 'Visitor and Iterator', es: 'Visitor e Iterator' },
            {
              en: 'Command and Memento — the command knows the action, the memento restores the state',
              es: 'Command y Memento: el comando conoce la acción y el memento restaura el estado',
            },
            { en: 'Mediator and Proxy', es: 'Mediator y Proxy' },
            { en: 'Facade and Bridge', es: 'Facade y Bridge' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Commands give you the stack and the reversal; mementos handle the cases where an action is easier to snapshot than to invert. Patterns are rarely used alone — recognising the combination is the real skill.',
            es: 'Los comandos dan la pila y la reversión; los mementos cubren los casos donde es más fácil fotografiar una acción que invertirla. Los patrones rara vez van solos: reconocer la combinación es la habilidad real.',
          },
        },
      ],
    },
  ],
}
