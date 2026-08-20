import type { Section } from '../types'

export const principles: Section = {
  id: 'principles',
  title: { en: 'Design principles', es: 'Principios de diseño' },
  subtitle: {
    en: 'Five letters that decide whether tomorrow’s change is easy or awful.',
    es: 'Cinco letras que deciden si el cambio de mañana es fácil o horrible.',
  },
  units: [
    {
      id: 'srp',
      title: { en: 'S · Single responsibility', es: 'S · Responsabilidad única' },
      icon: '🎯',
      summary: {
        en: 'One reason to change — not "it does one thing".',
        es: 'Una razón para cambiar, no "hace una sola cosa".',
      },
      concept: {
        headline: {
          en: 'A class should have one reason to change — meaning one audience that can demand it change.',
          es: 'Una clase debe tener una sola razón para cambiar: un solo interlocutor que pueda pedir que cambie.',
        },
        body: [
          {
            en: 'The usual summary — "a class should do one thing" — is unhelpful, because "one thing" can mean anything you want. Robert Martin’s actual wording is about people: a module should be answerable to ONE stakeholder.',
            es: 'El resumen habitual —"una clase debe hacer una sola cosa"— no ayuda, porque "una cosa" significa lo que tú quieras. La formulación real de Robert Martin habla de personas: un módulo debe rendir cuentas a UN solo interlocutor.',
          },
          {
            en: 'That reframing makes it testable. If finance can force a change to this file, and so can the design team, and so can the DBA, it has three responsibilities — no matter how tidy it looks.',
            es: 'Ese cambio de enfoque lo hace comprobable. Si finanzas puede obligar a tocar este fichero, y diseño también, y el DBA también, tiene tres responsabilidades por muy ordenado que parezca.',
          },
        ],
        keyPoints: [
          {
            en: 'One reason to change = one stakeholder who can demand it.',
            es: 'Una razón para cambiar = un interlocutor que puede exigirlo.',
          },
          {
            en: 'The classic smell: a class that calculates, formats AND saves.',
            es: 'El olor clásico: una clase que calcula, formatea Y guarda.',
          },
          {
            en: 'SRP is why "God objects" hurt — everyone edits them, so everyone conflicts.',
            es: 'Por esto duelen los "objetos dios": todo el mundo los edita, así que todo el mundo choca.',
          },
          {
            en: 'Splitting has a cost too. Ten one-method classes can be as unreadable as one giant one.',
            es: 'Dividir también cuesta. Diez clases de un método pueden ser tan ilegibles como una gigante.',
          },
        ],
        example: {
          caption: {
            en: 'Three stakeholders in one class',
            es: 'Tres interlocutores en una misma clase',
          },
          code: {
            en: `// Finance owns the rules, design owns the format, ops owns the storage
class Payslip {
  calculatePay() {}   // changes when finance changes policy
  renderHtml() {}     // changes when design changes the template
  save() {}           // changes when the database schema changes
}

// Each now answers to exactly one of them
class PayCalculator {}
class PayslipRenderer {}
class PayslipRepository {}`,
            es: `// Finanzas manda en las reglas, diseño en el formato, ops en el guardado
class Payslip {
  calculatePay() {}   // cambia cuando finanzas cambia la política
  renderHtml() {}     // cambia cuando diseño cambia la plantilla
  save() {}           // cambia cuando cambia el esquema de la base de datos
}

// Ahora cada una responde ante uno solo
class PayCalculator {}
class PayslipRenderer {}
class PayslipRepository {}`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'srp-1',
          prompt: {
            en: 'What does "one reason to change" actually mean?',
            es: '¿Qué significa realmente "una sola razón para cambiar"?',
          },
          choices: [
            { en: 'The class has only one method', es: 'La clase tiene un solo método' },
            {
              en: 'Only one stakeholder or force can demand that this module change',
              es: 'Solo un interlocutor o una fuerza puede exigir que ese módulo cambie',
            },
            { en: 'The class is under 100 lines', es: 'La clase tiene menos de 100 líneas' },
            { en: 'The class has no dependencies', es: 'La clase no tiene dependencias' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The principle is about people, not line count. When finance, design and ops can all force edits to the same file, you get merge conflicts, accidental breakage and a class nobody dares touch — regardless of how short it is.',
            es: 'El principio va de personas, no de líneas. Cuando finanzas, diseño y ops pueden forzar cambios en el mismo fichero, aparecen conflictos, roturas accidentales y una clase que nadie se atreve a tocar, por corta que sea.',
          },
        },
        {
          kind: 'choice',
          id: 'srp-2',
          prompt: {
            en: 'Which of these most likely violates SRP?',
            es: '¿Cuál de estas viola SRP con más probabilidad?',
          },
          code: `class OrderService {
  validate() {}
  applyDiscounts() {}
  chargeCard() {}
  renderInvoicePdf() {}
  sendConfirmationEmail() {}
}`,
          choices: [
            { en: 'Nothing, they are all about orders', es: 'Nada, todas van sobre pedidos' },
            {
              en: 'PDF rendering and email delivery answer to different owners than the pricing rules',
              es: 'Generar el PDF y enviar el correo responden ante dueños distintos que las reglas de precio',
            },
            { en: 'It has too many methods', es: 'Tiene demasiados métodos' },
            { en: 'The methods should be static', es: 'Los métodos deberían ser estáticos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Method count is a symptom, not the rule. The real problem is that a change to the invoice template and a change to the discount policy come from different people and now touch the same file.',
            es: 'El número de métodos es un síntoma, no la regla. El problema real es que un cambio en la plantilla de factura y uno en la política de descuentos vienen de personas distintas y ahora tocan el mismo fichero.',
          },
        },
        {
          kind: 'boolean',
          id: 'srp-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'The more classes you split a module into, the better it follows SRP.',
            es: 'Cuantas más clases saques de un módulo, mejor cumple SRP.',
          },
          answer: false,
          explanation: {
            en: 'Over-splitting produces "shotgun surgery": one small feature now needs edits in eight files, and reading the flow means jumping between all of them. SRP asks you to separate reasons to change, not to maximise the class count.',
            es: 'Dividir de más produce "cirugía con escopeta": una funcionalidad pequeña obliga a tocar ocho ficheros y leer el flujo exige saltar entre todos. SRP pide separar razones para cambiar, no maximizar el número de clases.',
          },
        },
        {
          kind: 'choice',
          id: 'srp-4',
          prompt: {
            en: 'Two classes always change together, in the same commit, every time. What does that suggest?',
            es: 'Dos clases cambian siempre juntas, en el mismo commit, cada vez. ¿Qué sugiere eso?',
          },
          choices: [
            { en: 'They follow SRP perfectly', es: 'Cumplen SRP a la perfección' },
            {
              en: 'They probably share one reason to change and were split for the wrong reason',
              es: 'Probablemente comparten una razón para cambiar y se separaron por el motivo equivocado',
            },
            { en: 'One of them should be deleted', es: 'Habría que borrar una de ellas' },
            { en: 'They need an interface between them', es: 'Necesitan una interfaz entre ellas' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'SRP has a mirror image — the Common Closure Principle: things that change together belong together. Perpetual co-change is evidence you cut along the wrong seam.',
            es: 'SRP tiene su imagen especular, el principio de cierre común: lo que cambia junto debe vivir junto. Que cambien siempre a la vez es prueba de que cortaste por la costura equivocada.',
          },
        },
        {
          kind: 'gap',
          id: 'srp-5',
          prompt: {
            en: 'Complete the split so the calculator holds only the pricing rule.',
            es: 'Completa la separación para que la calculadora tenga solo la regla de precio.',
          },
          code: {
            en: `class PriceCalculator {
  total(order: Order): number { /* the finance rule, and nothing else */ }
  ___
}`,
            es: `class PriceCalculator {
  total(order: Order): number { /* la regla de finanzas, y nada más */ }
  ___
}`,
          },
          choices: [
            { en: '// nothing — saving and formatting live elsewhere', es: '// nada: guardar y formatear viven en otro sitio' },
            'saveToDatabase(order: Order) {}',
            'renderPdf(order: Order) {}',
            'sendEmail(order: Order) {}',
          ],
          answerIndex: 0,
          explanation: {
            en: 'Anything else on this class hands a second stakeholder the power to force it to change. Keeping the rule pure also makes it testable with no database and no template engine.',
            es: 'Cualquier otra cosa en esta clase le da a un segundo interlocutor el poder de obligarla a cambiar. Además, mantener la regla pura la hace testeable sin base de datos ni motor de plantillas.',
          },
        },
        {
          kind: 'choice',
          id: 'srp-6',
          prompt: {
            en: 'What is the practical payoff of following SRP?',
            es: '¿Cuál es el beneficio práctico de cumplir SRP?',
          },
          choices: [
            { en: 'The program runs faster', es: 'El programa va más rápido' },
            {
              en: 'A change stays contained — you can edit one rule without risking unrelated behaviour',
              es: 'El cambio queda contenido: puedes tocar una regla sin arriesgar comportamientos ajenos',
            },
            { en: 'Fewer files in the repository', es: 'Menos ficheros en el repositorio' },
            { en: 'You need fewer tests', es: 'Necesitas menos tests' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Every principle in SOLID is about the cost of change, never about runtime speed. The win is that "adjust the VAT rate" cannot accidentally break the PDF export.',
            es: 'Todos los principios de SOLID van del coste del cambio, nunca de la velocidad de ejecución. La ganancia es que "ajustar el IVA" no pueda romper por accidente la exportación a PDF.',
          },
        },
      ],
    },
    {
      id: 'ocp',
      title: { en: 'O · Open/closed', es: 'O · Abierto/cerrado' },
      icon: '🔌',
      summary: {
        en: 'Add behaviour without editing what already works.',
        es: 'Añadir comportamiento sin tocar lo que ya funciona.',
      },
      concept: {
        headline: {
          en: 'Open for extension, closed for modification: new cases arrive as new code, not as edits.',
          es: 'Abierto a la extensión, cerrado a la modificación: los casos nuevos llegan como código nuevo, no como ediciones.',
        },
        body: [
          {
            en: 'The tell is a `switch` that grows every time the business adds an option. Each new payment method, each new export format, each new country means reopening a file that already worked — and every reopening is a chance to break it.',
            es: 'La señal es un `switch` que crece cada vez que el negocio añade una opción. Cada método de pago nuevo, cada formato de exportación, cada país significa reabrir un fichero que ya funcionaba, y cada reapertura es una oportunidad de romperlo.',
          },
          {
            en: 'The fix is to depend on an abstraction and let new cases plug in. The caller stops knowing which implementations exist, so adding the fourth one does not touch the first three.',
            es: 'La solución es depender de una abstracción y dejar que los casos nuevos se enchufen. Quien llama deja de saber qué implementaciones existen, así que añadir la cuarta no toca las tres primeras.',
          },
        ],
        keyPoints: [
          {
            en: 'The smell: a `switch` or `if/else` chain that grows with every new business case.',
            es: 'El olor: un `switch` o cadena de `if/else` que crece con cada caso de negocio nuevo.',
          },
          {
            en: 'Extension points are abstractions: an interface, a strategy, a plugin registry.',
            es: 'Los puntos de extensión son abstracciones: una interfaz, una estrategia, un registro de plugins.',
          },
          {
            en: 'Do not pre-build extension points for cases nobody has asked for. That is speculation, and it costs.',
            es: 'No construyas puntos de extensión para casos que nadie ha pedido. Eso es especular, y se paga.',
          },
          {
            en: 'A `switch` used once, in one place, to pick an implementation is fine — that is the factory.',
            es: 'Un `switch` usado una vez, en un sitio, para elegir implementación está bien: eso es la fábrica.',
          },
        ],
        example: {
          caption: {
            en: 'The switch that keeps being reopened',
            es: 'El switch que se reabre una y otra vez',
          },
          code: {
            en: `// Closed to extension: every new method edits this file
function fee(method: string, amount: number) {
  switch (method) {
    case 'card': return amount * 0.029
    case 'paypal': return amount * 0.034
    // ...and here comes the fifth one
  }
}

// Open: a new method is a new file, and nothing above changes
interface PaymentMethod { fee(amount: number): number }
const charge = (m: PaymentMethod, amount: number) => m.fee(amount)`,
            es: `// Cerrado a la extensión: cada método nuevo edita este fichero
function fee(method: string, amount: number) {
  switch (method) {
    case 'card': return amount * 0.029
    case 'paypal': return amount * 0.034
    // ...y aquí llega el quinto
  }
}

// Abierto: un método nuevo es un fichero nuevo, y nada de arriba cambia
interface PaymentMethod { fee(amount: number): number }
const charge = (m: PaymentMethod, amount: number) => m.fee(amount)`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'ocp-1',
          prompt: {
            en: 'Which is the clearest sign that a module violates OCP?',
            es: '¿Cuál es la señal más clara de que un módulo viola OCP?',
          },
          choices: [
            { en: 'It has many methods', es: 'Tiene muchos métodos' },
            {
              en: 'Every new business case means editing the same switch statement',
              es: 'Cada caso de negocio nuevo obliga a editar el mismo switch',
            },
            { en: 'It uses inheritance', es: 'Usa herencia' },
            { en: 'It has no interface', es: 'No tiene interfaz' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'That switch is the modification you are supposed to be closed to. Every reopening risks the cases that already worked and forces a full regression of all of them.',
            es: 'Ese switch es justo la modificación a la que deberías estar cerrado. Cada reapertura pone en riesgo los casos que ya funcionaban y obliga a re-probarlos todos.',
          },
        },
        {
          kind: 'boolean',
          id: 'ocp-2',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'OCP means you should never edit existing code.',
            es: 'OCP significa que nunca deberías editar código existente.',
          },
          answer: false,
          explanation: {
            en: 'You edit code constantly — to fix bugs and to refactor. OCP is about ONE axis: the direction the requirements are known to grow. Being closed to every possible change means building extension points for futures that never arrive.',
            es: 'Editas código constantemente, para arreglar bugs y refactorizar. OCP va de UN eje: la dirección en la que se sabe que crecen los requisitos. Cerrarse a todo cambio posible significa construir puntos de extensión para futuros que nunca llegan.',
          },
        },
        {
          kind: 'choice',
          id: 'ocp-3',
          prompt: {
            en: 'You have exactly one export format and no plans for another. What should you do?',
            es: 'Tienes exactamente un formato de exportación y sin planes de otro. ¿Qué haces?',
          },
          choices: [
            {
              en: 'Build the interface and plugin registry now, just in case',
              es: 'Construir ya la interfaz y el registro de plugins, por si acaso',
            },
            {
              en: 'Write it directly, and extract the abstraction when the second format actually arrives',
              es: 'Escribirlo directo y extraer la abstracción cuando llegue de verdad el segundo formato',
            },
            { en: 'Use inheritance instead', es: 'Usar herencia en su lugar' },
            { en: 'Make everything static', es: 'Hacerlo todo estático' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'An extension point built on speculation is usually the wrong shape, because you designed it without knowing what the second case looks like. Wait for real evidence, then extract — the refactor is cheap once you can see both cases.',
            es: 'Un punto de extensión construido sobre especulación suele tener la forma equivocada, porque lo diseñaste sin saber cómo es el segundo caso. Espera evidencia real y extrae entonces: el refactor es barato cuando ya ves los dos casos.',
          },
        },
        {
          kind: 'gap',
          id: 'ocp-4',
          prompt: {
            en: 'Complete the signature so a new shipper needs no edit here.',
            es: 'Completa la firma para que un transportista nuevo no obligue a tocar aquí.',
          },
          code: `interface Shipper { quote(kg: number): number }

function cheapest(shippers: ___): number {
  return Math.min(...shippers.map((s) => s.quote(10)))
}`,
          choices: ['Shipper[]', "('dhl' | 'ups')[]", 'string[]', 'unknown[]'],
          answerIndex: 0,
          explanation: {
            en: 'Depending on the interface means the function never learns the list of concrete shippers. A union of names would have to be edited for every new carrier — the exact modification OCP is trying to avoid.',
            es: 'Depender de la interfaz hace que la función nunca conozca la lista de transportistas concretos. Una unión de nombres habría que editarla con cada transportista nuevo: exactamente la modificación que OCP intenta evitar.',
          },
        },
        {
          kind: 'choice',
          id: 'ocp-5',
          prompt: {
            en: 'Where is a `switch` over concrete types still perfectly acceptable?',
            es: '¿Dónde sigue siendo perfectamente aceptable un `switch` sobre tipos concretos?',
          },
          choices: [
            { en: 'Nowhere, ever', es: 'En ningún sitio, jamás' },
            {
              en: 'In one factory that turns config into an implementation — the rest of the system stays unaware',
              es: 'En una única fábrica que convierte configuración en implementación; el resto del sistema no se entera',
            },
            { en: 'In every service that needs the type', es: 'En cada servicio que necesite el tipo' },
            { en: 'Only inside tests', es: 'Solo dentro de los tests' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Something has to map "paypal" to a PayPal object. Concentrating that in one factory means adding a case in a single known place, instead of hunting for switches scattered across the codebase.',
            es: 'Algo tiene que convertir "paypal" en un objeto PayPal. Concentrarlo en una fábrica significa añadir un caso en un único sitio conocido, en vez de perseguir switches repartidos por todo el código.',
          },
        },
        {
          kind: 'choice',
          id: 'ocp-6',
          prompt: {
            en: 'Which SOLID principle does OCP depend on most to work?',
            es: '¿De qué principio SOLID depende más OCP para funcionar?',
          },
          choices: [
            { en: 'SRP', es: 'SRP' },
            {
              en: 'LSP — extensions must be usable through the abstraction without special cases',
              es: 'LSP: las extensiones deben poder usarse a través de la abstracción sin casos especiales',
            },
            { en: 'ISP', es: 'ISP' },
            { en: 'None, it stands alone', es: 'De ninguno, va por libre' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'If one implementation misbehaves through the interface, callers start adding `if (x instanceof Weird)` — and you are back to a growing switch. OCP is only as strong as the substitutability of what plugs into it.',
            es: 'Si una implementación se comporta mal a través de la interfaz, quien llama empieza a añadir `if (x instanceof Rara)` y vuelves al switch que crece. OCP es tan fuerte como la sustituibilidad de lo que se enchufa en él.',
          },
        },
      ],
    },
    {
      id: 'lsp',
      title: { en: 'L · Liskov substitution', es: 'L · Sustitución de Liskov' },
      icon: '🔄',
      summary: {
        en: 'A subtype must be usable anywhere its parent is, with no surprises.',
        es: 'Un subtipo debe poder usarse donde su padre, sin sorpresas.',
      },
      concept: {
        headline: {
          en: 'If you have to check which subclass you got, substitution is already broken.',
          es: 'Si tienes que comprobar qué subclase te ha llegado, la sustitución ya está rota.',
        },
        body: [
          {
            en: 'The famous example: a Square "is a" Rectangle in geometry, but not in code. Setting width on a Rectangle leaves height alone; on a Square it cannot. Any caller written against Rectangle now breaks when handed a Square.',
            es: 'El ejemplo famoso: un cuadrado "es un" rectángulo en geometría, pero no en código. Poner el ancho en un rectángulo deja la altura igual; en un cuadrado no puede. Cualquier código escrito contra Rectángulo se rompe al recibir un Cuadrado.',
          },
          {
            en: 'The rule in practice: a subtype may accept MORE inputs and promise MORE about its output, never less. Throwing "not supported" from an inherited method is the loudest violation there is.',
            es: 'La regla en la práctica: un subtipo puede aceptar MÁS entradas y prometer MÁS sobre su salida, nunca menos. Lanzar "no soportado" desde un método heredado es la violación más ruidosa que existe.',
          },
        ],
        keyPoints: [
          {
            en: 'Preconditions may be weakened, postconditions strengthened. Never the reverse.',
            es: 'Las precondiciones se pueden debilitar y las postcondiciones reforzar. Nunca al revés.',
          },
          {
            en: 'A subclass that throws `NotSupported` for an inherited method is not a subtype.',
            es: 'Una subclase que lanza `NoSoportado` en un método heredado no es un subtipo.',
          },
          {
            en: '`instanceof` checks scattered through calling code are the symptom.',
            es: 'Los `instanceof` repartidos por el código que llama son el síntoma.',
          },
          {
            en: '"Is a" in English is not "is a" in code. Model behaviour, not vocabulary.',
            es: '"Es un" en castellano no es "es un" en código. Modela comportamiento, no vocabulario.',
          },
        ],
        example: {
          caption: {
            en: 'The subtype that breaks its parent’s promise',
            es: 'El subtipo que rompe la promesa de su padre',
          },
          code: {
            en: `class Rectangle {
  setWidth(w: number) { this.w = w }   // promise: height is untouched
  setHeight(h: number) { this.h = h }
}

class Square extends Rectangle {
  setWidth(w: number) { this.w = w; this.h = w }  // breaks the promise
}

// Written against Rectangle, now silently wrong for Square
function grow(r: Rectangle) {
  r.setWidth(10); r.setHeight(4)
  return r.area()   // expects 40, gets 16
}`,
            es: `class Rectangle {
  setWidth(w: number) { this.w = w }   // promesa: la altura no se toca
  setHeight(h: number) { this.h = h }
}

class Square extends Rectangle {
  setWidth(w: number) { this.w = w; this.h = w }  // rompe la promesa
}

// Escrito contra Rectangle, ahora es incorrecto en silencio con Square
function grow(r: Rectangle) {
  r.setWidth(10); r.setHeight(4)
  return r.area()   // espera 40, obtiene 16
}`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'lsp-1',
          prompt: {
            en: 'Why is Square a bad subclass of Rectangle in code?',
            es: '¿Por qué Cuadrado es mala subclase de Rectángulo en código?',
          },
          choices: [
            { en: 'It has fewer fields', es: 'Tiene menos campos' },
            {
              en: 'It breaks a promise the parent made: setting width leaves height alone',
              es: 'Rompe una promesa del padre: fijar el ancho deja la altura intacta',
            },
            { en: 'Squares are not rectangles', es: 'Los cuadrados no son rectángulos' },
            { en: 'It needs more memory', es: 'Necesita más memoria' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Geometrically a square IS a rectangle. Behaviourally it is not, because it cannot honour independent width and height. Inheritance models behaviour, not dictionary definitions.',
            es: 'Geométricamente un cuadrado SÍ es un rectángulo. En comportamiento no, porque no puede cumplir con ancho y alto independientes. La herencia modela comportamiento, no definiciones de diccionario.',
          },
        },
        {
          kind: 'choice',
          id: 'lsp-2',
          prompt: {
            en: 'A subclass throws `NotSupportedError` from an inherited method. What does that tell you?',
            es: 'Una subclase lanza `NotSupportedError` en un método heredado. ¿Qué te dice eso?',
          },
          choices: [
            { en: 'Good defensive programming', es: 'Buena programación defensiva' },
            {
              en: 'It is not a true subtype — the abstraction is wrong, or it should be split',
              es: 'No es un subtipo de verdad: la abstracción está mal o hay que dividirla',
            },
            { en: 'The method should be private', es: 'El método debería ser privado' },
            { en: 'Nothing, it is normal', es: 'Nada, es normal' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Callers written against the parent now crash on a valid call. Usually the parent is promising too much — the classic fix is to split the interface, which is exactly what ISP asks for.',
            es: 'Quien llama escribiendo contra el padre ahora revienta en una llamada válida. Normalmente el padre promete de más, y el arreglo clásico es dividir la interfaz: justo lo que pide ISP.',
          },
        },
        {
          kind: 'boolean',
          id: 'lsp-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A subtype may require stricter inputs than its parent accepts.',
            es: 'Un subtipo puede exigir entradas más estrictas que las que acepta su padre.',
          },
          answer: false,
          explanation: {
            en: 'Backwards. Preconditions may only be WEAKENED — a subtype must accept everything the parent accepted, and may accept more. Tightening them means valid calls to the parent start failing.',
            es: 'Al revés. Las precondiciones solo se pueden DEBILITAR: un subtipo debe aceptar todo lo que aceptaba el padre, y puede aceptar más. Endurecerlas hace que llamadas válidas al padre empiecen a fallar.',
          },
        },
        {
          kind: 'choice',
          id: 'lsp-4',
          prompt: {
            en: 'Your code is full of `if (bird instanceof Penguin) …`. What is the underlying problem?',
            es: 'Tu código está lleno de `if (ave instanceof Pingüino) …`. ¿Cuál es el problema de fondo?',
          },
          choices: [
            { en: 'instanceof is slow', es: '`instanceof` es lento' },
            {
              en: 'Penguin is not substitutable for Bird, so callers have to special-case it',
              es: 'Pingüino no es sustituible por Ave, así que quien llama tiene que tratarlo aparte',
            },
            { en: 'You need more inheritance', es: 'Necesitas más herencia' },
            { en: 'Penguins should be an enum', es: 'Los pingüinos deberían ser un enum' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A `Bird` that promises `fly()` cannot include penguins. The fix is to model the real capability — `FlyingBird` and `SwimmingBird` — so no caller ever needs to ask what it received.',
            es: 'Un `Ave` que promete `volar()` no puede incluir pingüinos. El arreglo es modelar la capacidad real —`AveVoladora` y `AveNadadora`— para que nadie tenga que preguntar qué ha recibido.',
          },
        },
        {
          kind: 'choice',
          id: 'lsp-5',
          prompt: {
            en: 'Which change to a subtype is always safe under LSP?',
            es: '¿Qué cambio en un subtipo es siempre seguro bajo LSP?',
          },
          choices: [
            {
              en: 'Returning a narrower, more specific type than the parent declared',
              es: 'Devolver un tipo más concreto que el declarado por el padre',
            },
            { en: 'Throwing a new exception type', es: 'Lanzar un nuevo tipo de excepción' },
            { en: 'Requiring an extra argument', es: 'Exigir un argumento extra' },
            { en: 'Returning null where the parent never did', es: 'Devolver null donde el padre nunca lo hacía' },
          ],
          answerIndex: 0,
          explanation: {
            en: 'Strengthening the postcondition is safe: callers expecting the wider type still get something valid. The other three all break code that was written against the parent.',
            es: 'Reforzar la postcondición es seguro: quien espera el tipo más amplio sigue recibiendo algo válido. Las otras tres rompen código escrito contra el padre.',
          },
        },
        {
          kind: 'order',
          id: 'lsp-6',
          prompt: {
            en: 'Order the steps for fixing a Liskov violation you just found.',
            es: 'Ordena los pasos para arreglar una violación de Liskov que acabas de encontrar.',
          },
          items: [
            {
              en: 'Write down the promise the parent actually makes',
              es: 'Escribe la promesa que el padre hace de verdad',
            },
            {
              en: 'Find which subtype cannot honour it',
              es: 'Encuentra qué subtipo no puede cumplirla',
            },
            {
              en: 'Split the abstraction along the real capability',
              es: 'Divide la abstracción según la capacidad real',
            },
            {
              en: 'Delete the instanceof checks the violation forced on callers',
              es: 'Borra los instanceof que la violación obligó a poner a quien llama',
            },
          ],
          explanation: {
            en: 'Naming the promise first is what makes the rest obvious. The disappearing `instanceof` checks are how you know the fix actually landed.',
            es: 'Nombrar primero la promesa es lo que hace obvio el resto. Que desaparezcan los `instanceof` es la señal de que el arreglo funcionó.',
          },
        },
      ],
    },
    {
      id: 'isp',
      title: { en: 'I · Interface segregation', es: 'I · Segregación de interfaces' },
      icon: '✂️',
      summary: {
        en: 'No client should be forced to depend on methods it never calls.',
        es: 'Nadie debería depender de métodos que nunca llama.',
      },
      concept: {
        headline: {
          en: 'Many small interfaces beat one big one — because a fat interface couples you to changes you do not care about.',
          es: 'Muchas interfaces pequeñas ganan a una grande: una interfaz gorda te acopla a cambios que no te importan.',
        },
        body: [
          {
            en: 'If your class implements `Repository` and only needs `findById`, you still get dragged into every change to `bulkImport` and `rebuildIndex`. You recompile, you re-test, you re-review — for methods you never call.',
            es: 'Si tu clase implementa `Repository` y solo necesita `findById`, igualmente te arrastran todos los cambios de `bulkImport` y `rebuildIndex`. Recompilas, re-testeas y re-revisas por métodos que nunca llamas.',
          },
          {
            en: 'The clean version is to define the interface from the CONSUMER’s side: ask what this caller actually needs, name that, and let implementations satisfy several small contracts.',
            es: 'La versión limpia es definir la interfaz desde el lado de QUIEN CONSUME: pregunta qué necesita realmente ese cliente, nómbralo, y deja que las implementaciones cumplan varios contratos pequeños.',
          },
        ],
        keyPoints: [
          {
            en: 'Empty or throwing implementations are the loudest symptom of a fat interface.',
            es: 'Las implementaciones vacías o que lanzan errores son el síntoma más ruidoso de una interfaz gorda.',
          },
          {
            en: 'Define interfaces by what the caller needs, not by what the implementation happens to offer.',
            es: 'Define las interfaces por lo que necesita quien llama, no por lo que la implementación ofrece.',
          },
          {
            en: 'A one-method interface is not too small — `Comparable` and `Runnable` are exactly that.',
            es: 'Una interfaz de un método no es demasiado pequeña: `Comparable` y `Runnable` son justo eso.',
          },
          {
            en: 'ISP and LSP are relatives: fat interfaces are what force subtypes to fake methods.',
            es: 'ISP y LSP son parientes: las interfaces gordas son lo que obliga a los subtipos a fingir métodos.',
          },
        ],
        example: {
          caption: {
            en: 'Asking for exactly what you use',
            es: 'Pedir exactamente lo que usas',
          },
          code: {
            en: `// Fat: every consumer depends on all seven methods
interface UserRepository {
  findById(id: string): User
  save(u: User): void
  bulkImport(rows: Row[]): void
  rebuildSearchIndex(): void
}

// Segregated: the greeter needs one method, so it asks for one
interface FindsUsers { findById(id: string): User }
function greet(users: FindsUsers, id: string) {
  return \`Hi \${users.findById(id).name}\`
}`,
            es: `// Gorda: cada consumidor depende de los siete métodos
interface UserRepository {
  findById(id: string): User
  save(u: User): void
  bulkImport(rows: Row[]): void
  rebuildSearchIndex(): void
}

// Segregada: el saludador necesita un método, así que pide uno
interface FindsUsers { findById(id: string): User }
function greet(users: FindsUsers, id: string) {
  return \`Hola \${users.findById(id).name}\`
}`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'isp-1',
          prompt: {
            en: 'What is the cost of depending on a fat interface you barely use?',
            es: '¿Cuál es el coste de depender de una interfaz gorda que apenas usas?',
          },
          choices: [
            { en: 'More memory at runtime', es: 'Más memoria en ejecución' },
            {
              en: 'You are coupled to changes in methods you never call',
              es: 'Quedas acoplado a cambios en métodos que nunca llamas',
            },
            { en: 'Slower method dispatch', es: 'Llamadas a métodos más lentas' },
            { en: 'Nothing, unused methods are free', es: 'Ninguno, los métodos sin usar son gratis' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Coupling is about who can force you to change. A signature change to `bulkImport` breaks your build even though your code has never once called it — and in tests you now have to stub it too.',
            es: 'El acoplamiento va de quién puede obligarte a cambiar. Un cambio de firma en `bulkImport` te rompe la compilación aunque tu código nunca lo haya llamado, y en los tests además tienes que simularlo.',
          },
        },
        {
          kind: 'choice',
          id: 'isp-2',
          prompt: {
            en: 'You keep writing empty method bodies to satisfy an interface. What does that mean?',
            es: 'Escribes métodos vacíos una y otra vez para cumplir una interfaz. ¿Qué significa?',
          },
          choices: [
            { en: 'The implementation is incomplete', es: 'La implementación está incompleta' },
            {
              en: 'The interface is too fat and should be split along real capabilities',
              es: 'La interfaz es demasiado gorda y hay que dividirla por capacidades reales',
            },
            { en: 'You need an abstract class', es: 'Necesitas una clase abstracta' },
            { en: 'The methods should be optional', es: 'Los métodos deberían ser opcionales' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'An empty body is a lie told to the compiler: the type says the capability exists and the runtime says otherwise. Splitting the interface makes the type system tell the truth again.',
            es: 'Un cuerpo vacío es una mentira al compilador: el tipo dice que la capacidad existe y la ejecución dice lo contrario. Dividir la interfaz hace que el sistema de tipos vuelva a decir la verdad.',
          },
        },
        {
          kind: 'boolean',
          id: 'isp-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'An interface with a single method is a design smell — it is too small.',
            es: 'Una interfaz con un solo método es un mal olor de diseño: es demasiado pequeña.',
          },
          answer: false,
          explanation: {
            en: 'Single-method interfaces are often the best ones. `Comparable`, `Runnable`, a `Logger` with one `log` — they compose freely and are trivial to fake in a test. Size is not the measure; cohesion is.',
            es: 'Las interfaces de un solo método suelen ser las mejores. `Comparable`, `Runnable`, un `Logger` con un `log`: se combinan libremente y son triviales de simular en un test. La medida no es el tamaño, es la cohesión.',
          },
        },
        {
          kind: 'gap',
          id: 'isp-4',
          prompt: {
            en: 'Complete the parameter type so the function asks for the minimum it needs.',
            es: 'Completa el tipo del parámetro para que la función pida el mínimo que necesita.',
          },
          code: `interface FindsUsers { findById(id: string): User }
interface SavesUsers { save(user: User): void }

// This function only ever reads.
function greet(users: ___, id: string) {
  return users.findById(id).name
}`,
          choices: ['FindsUsers', 'FindsUsers & SavesUsers', 'UserRepository', 'any'],
          answerIndex: 0,
          explanation: {
            en: 'Asking only for `FindsUsers` documents the function’s real power — it cannot write, and the type proves it. It also means a test can pass a two-line object instead of a full repository.',
            es: 'Pedir solo `FindsUsers` documenta el poder real de la función: no puede escribir, y el tipo lo demuestra. Además permite que un test le pase un objeto de dos líneas en vez de un repositorio entero.',
          },
        },
        {
          kind: 'choice',
          id: 'isp-5',
          prompt: {
            en: 'Where should an interface ideally be defined?',
            es: '¿Dónde debería definirse idealmente una interfaz?',
          },
          choices: [
            { en: 'Next to the implementation that provides it', es: 'Junto a la implementación que la provee' },
            {
              en: 'Next to the consumer that needs it, named after what the consumer wants',
              es: 'Junto al consumidor que la necesita, con el nombre de lo que ese consumidor quiere',
            },
            { en: 'In a shared `interfaces` folder', es: 'En una carpeta común de `interfaces`' },
            { en: 'It does not matter', es: 'Da igual' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Consumer-defined interfaces stay small and honest, because they are shaped by an actual need. Provider-defined ones drift towards exposing everything the implementation happens to do.',
            es: 'Las interfaces definidas por el consumidor se mantienen pequeñas y honestas, porque las moldea una necesidad real. Las definidas por el proveedor tienden a exponer todo lo que la implementación hace.',
          },
        },
        {
          kind: 'choice',
          id: 'isp-6',
          prompt: {
            en: 'How does ISP make testing easier?',
            es: '¿Cómo facilita ISP los tests?',
          },
          choices: [
            { en: 'It removes the need for tests', es: 'Elimina la necesidad de tests' },
            {
              en: 'A narrow interface means a fake with one method instead of stubbing a dozen',
              es: 'Una interfaz estrecha permite un doble con un método en vez de simular una docena',
            },
            { en: 'It makes tests run in parallel', es: 'Hace que los tests corran en paralelo' },
            { en: 'It generates test data', es: 'Genera datos de prueba' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The size of your test doubles is a direct readout of how fat your interfaces are. When a unit test needs a 40-line mock, the interface — not the test — is the problem.',
            es: 'El tamaño de tus dobles de prueba es una lectura directa de lo gordas que son tus interfaces. Cuando un test unitario necesita un mock de 40 líneas, el problema es la interfaz, no el test.',
          },
        },
      ],
    },
    {
      id: 'dip',
      title: { en: 'D · Dependency inversion', es: 'D · Inversión de dependencias' },
      icon: '🔀',
      summary: {
        en: 'The most valuable letter — and the one that leads straight to architecture.',
        es: 'La letra más valiosa, y la que lleva directo a la arquitectura.',
      },
      concept: {
        headline: {
          en: 'High-level policy should not depend on low-level detail. Both should depend on an abstraction.',
          es: 'La política de alto nivel no debe depender del detalle de bajo nivel. Ambos deben depender de una abstracción.',
        },
        body: [
          {
            en: 'Normally your business rule imports Postgres, and the arrow points from important code to a replaceable detail. Inversion flips it: the rule declares the interface it needs, and the database implements it.',
            es: 'Normalmente tu regla de negocio importa Postgres, y la flecha va del código importante a un detalle reemplazable. La inversión le da la vuelta: la regla declara la interfaz que necesita y la base de datos la implementa.',
          },
          {
            en: 'That single move is what makes the core testable without infrastructure, and it is the whole idea behind hexagonal and clean architecture — which is why DIP is worth more than the other four combined.',
            es: 'Ese único movimiento es lo que hace el núcleo testeable sin infraestructura, y es la idea entera detrás de la arquitectura hexagonal y la clean architecture. Por eso DIP vale más que las otras cuatro juntas.',
          },
        ],
        keyPoints: [
          {
            en: 'Dependency INVERSION is the principle; dependency INJECTION is one way to achieve it.',
            es: 'La INVERSIÓN de dependencias es el principio; la INYECCIÓN es una forma de conseguirla.',
          },
          {
            en: 'The interface belongs to the caller, not to the implementation.',
            es: 'La interfaz pertenece a quien llama, no a la implementación.',
          },
          {
            en: 'Test for it: can you unit-test the rule with no database, no clock and no network?',
            es: 'La prueba: ¿puedes testear la regla sin base de datos, sin reloj y sin red?',
          },
          {
            en: 'Time and randomness are dependencies too. `Date.now()` inside a rule is a hidden one.',
            es: 'El tiempo y el azar también son dependencias. Un `Date.now()` dentro de una regla es una oculta.',
          },
        ],
        example: {
          caption: {
            en: 'Flipping the arrow',
            es: 'Darle la vuelta a la flecha',
          },
          code: {
            en: `// Before: the rule knows about Postgres, so it cannot run without one
import { PostgresClient } from './postgres'
class PricingRule { constructor(private db = new PostgresClient()) {} }

// After: the rule owns the interface, Postgres bends to it
interface RateSource { rateFor(country: string): number }
class PricingRule { constructor(private rates: RateSource) {} }

// Production passes Postgres. A test passes { rateFor: () => 0.21 }.`,
            es: `// Antes: la regla conoce Postgres, así que no corre sin una
import { PostgresClient } from './postgres'
class PricingRule { constructor(private db = new PostgresClient()) {} }

// Después: la regla es dueña de la interfaz y Postgres se adapta
interface RateSource { rateFor(country: string): number }
class PricingRule { constructor(private rates: RateSource) {} }

// Producción pasa Postgres. Un test pasa { rateFor: () => 0.21 }.`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'dip-1',
          prompt: {
            en: 'What exactly gets "inverted" in dependency inversion?',
            es: '¿Qué se "invierte" exactamente en la inversión de dependencias?',
          },
          choices: [
            { en: 'The order the methods run in', es: 'El orden en que se ejecutan los métodos' },
            {
              en: 'The direction of the source-code dependency: the detail now points at the policy',
              es: 'La dirección de la dependencia en el código: ahora el detalle apunta a la política',
            },
            { en: 'The inheritance hierarchy', es: 'La jerarquía de herencia' },
            { en: 'The call stack', es: 'La pila de llamadas' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'At runtime the rule still calls the database. What flips is which file imports which — and that is what decides whether you can compile, test and reason about the rule on its own.',
            es: 'En ejecución la regla sigue llamando a la base de datos. Lo que se invierte es qué fichero importa a cuál, y eso es lo que decide si puedes compilar, testear y razonar la regla por separado.',
          },
        },
        {
          kind: 'choice',
          id: 'dip-2',
          prompt: {
            en: 'Which is the difference between dependency inversion and dependency injection?',
            es: '¿Cuál es la diferencia entre inversión e inyección de dependencias?',
          },
          choices: [
            { en: 'They are the same thing', es: 'Son lo mismo' },
            {
              en: 'Inversion is the design goal; injection is a technique for handing over the dependency',
              es: 'La inversión es el objetivo de diseño; la inyección es una técnica para entregar la dependencia',
            },
            { en: 'Injection only works with frameworks', es: 'La inyección solo funciona con frameworks' },
            { en: 'Inversion is about runtime, injection about compile time', es: 'La inversión va de ejecución y la inyección de compilación' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'You can inject a concrete Postgres client through a constructor and still have zero inversion — the rule still depends on the detail. Inversion is achieved by who owns the interface, not by how the object arrives.',
            es: 'Puedes inyectar un cliente Postgres concreto por el constructor y no tener ninguna inversión: la regla sigue dependiendo del detalle. La inversión la consigue quién es dueño de la interfaz, no cómo llega el objeto.',
          },
        },
        {
          kind: 'boolean',
          id: 'dip-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Using a DI framework means your code follows dependency inversion.',
            es: 'Usar un framework de inyección significa que tu código cumple la inversión de dependencias.',
          },
          answer: false,
          explanation: {
            en: 'A container that wires concrete classes to concrete classes has automated the construction and inverted nothing. The question is always the same: does the important code import the detail, or the other way round?',
            es: 'Un contenedor que conecta clases concretas con clases concretas ha automatizado la construcción y no ha invertido nada. La pregunta es siempre la misma: ¿el código importante importa el detalle, o al revés?',
          },
        },
        {
          kind: 'choice',
          id: 'dip-4',
          prompt: {
            en: 'A pricing rule calls `Date.now()` directly. Why is that a DIP problem?',
            es: 'Una regla de precios llama a `Date.now()` directamente. ¿Por qué es un problema de DIP?',
          },
          choices: [
            { en: 'It is slow', es: 'Es lento' },
            {
              en: 'The clock is an undeclared dependency, so the rule cannot be tested at a chosen moment in time',
              es: 'El reloj es una dependencia no declarada, así que la regla no se puede testear en un momento elegido',
            },
            { en: 'It returns the wrong timezone', es: 'Devuelve la zona horaria equivocada' },
            { en: 'It should be `new Date()`', es: 'Debería ser `new Date()`' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Testing "the discount expires at midnight" means waiting for midnight. Take a `now: () => Date` and the test passes any instant it likes — and the rule stops being able to lie about what it depends on.',
            es: 'Probar "el descuento caduca a medianoche" implica esperar a medianoche. Recibe un `now: () => Date` y el test pasa el instante que quiera; además la regla deja de poder mentir sobre lo que depende.',
          },
        },
        {
          kind: 'gap',
          id: 'dip-5',
          prompt: {
            en: 'Complete the constructor so the rule depends on an abstraction.',
            es: 'Completa el constructor para que la regla dependa de una abstracción.',
          },
          code: `interface RateSource { rateFor(country: string): number }

class PricingRule {
  constructor(private rates: ___) {}
}`,
          choices: ['RateSource', 'PostgresClient', 'new PostgresClient()', 'any'],
          answerIndex: 0,
          explanation: {
            en: 'The rule states the shape it needs and nothing more. Postgres, an in-memory map and a test stub all satisfy it, and the rule never learns which one it got.',
            es: 'La regla declara la forma que necesita y nada más. Postgres, un mapa en memoria y un doble de test la cumplen igual, y la regla nunca sabe cuál le tocó.',
          },
        },
        {
          kind: 'choice',
          id: 'dip-6',
          prompt: {
            en: 'Which architecture is essentially DIP applied at system scale?',
            es: '¿Qué arquitectura es básicamente DIP aplicado a escala de sistema?',
          },
          choices: [
            { en: 'Layered architecture', es: 'Arquitectura en capas' },
            {
              en: 'Hexagonal / ports and adapters',
              es: 'Hexagonal / puertos y adaptadores',
            },
            { en: 'Client-server', es: 'Cliente-servidor' },
            { en: 'Peer-to-peer', es: 'Entre pares' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A "port" is the interface the domain owns; an "adapter" is the detail that implements it. Hexagonal architecture is DIP with a diagram — which is exactly where this track goes next.',
            es: 'Un "puerto" es la interfaz de la que el dominio es dueño; un "adaptador" es el detalle que la implementa. La arquitectura hexagonal es DIP con un diagrama, y es justo a donde va esta ruta después.',
          },
        },
      ],
    },
    {
      id: 'beyond-solid',
      title: { en: 'Beyond SOLID', es: 'Más allá de SOLID' },
      icon: '🧭',
      summary: {
        en: 'DRY, KISS, YAGNI, composition, coupling and cohesion.',
        es: 'DRY, KISS, YAGNI, composición, acoplamiento y cohesión.',
      },
      concept: {
        headline: {
          en: 'Coupling and cohesion are the two words underneath every principle on this list.',
          es: 'Acoplamiento y cohesión son las dos palabras que hay debajo de cada principio de esta lista.',
        },
        body: [
          {
            en: 'Cohesion is how much the things inside a module belong together. Coupling is how much one module can force another to change. Good design maximises the first and minimises the second — SOLID is five specific ways of doing that.',
            es: 'La cohesión es cuánto encaja entre sí lo que hay dentro de un módulo. El acoplamiento es cuánto puede un módulo obligar a otro a cambiar. Un buen diseño maximiza lo primero y minimiza lo segundo; SOLID son cinco formas concretas de conseguirlo.',
          },
          {
            en: 'The shorter acronyms are guardrails against over-engineering: DRY (do not duplicate KNOWLEDGE), KISS (prefer the boring solution), YAGNI (build it when you need it). All three are most useful when you are tempted to be clever.',
            es: 'Los acrónimos cortos son barreras contra la sobreingeniería: DRY (no dupliques CONOCIMIENTO), KISS (prefiere la solución aburrida), YAGNI (constrúyelo cuando lo necesites). Los tres sirven sobre todo cuando te tienta ser listo.',
          },
        ],
        keyPoints: [
          {
            en: 'DRY is about duplicated KNOWLEDGE, not duplicated characters. Two identical lines for different reasons are fine.',
            es: 'DRY va de CONOCIMIENTO duplicado, no de caracteres duplicados. Dos líneas iguales por motivos distintos están bien.',
          },
          {
            en: 'YAGNI: the feature you build "for later" is usually the wrong shape when later arrives.',
            es: 'YAGNI: lo que construyes "para más adelante" suele tener la forma equivocada cuando llega ese momento.',
          },
          {
            en: 'Prefer composition over inheritance — inheritance couples you to a parent forever.',
            es: 'Prefiere composición a herencia: la herencia te acopla a un padre para siempre.',
          },
          {
            en: 'Law of Demeter: talk to your friends, not to your friends’ friends. `a.b().c().d()` is a warning.',
            es: 'Ley de Demeter: habla con tus amigos, no con los amigos de tus amigos. `a.b().c().d()` es un aviso.',
          },
        ],
        example: {
          caption: {
            en: 'The wrong DRY',
            es: 'El DRY equivocado',
          },
          code: {
            en: `// These look identical — but they are two different rules that
// happen to agree today. Merging them couples finance to shipping.
const taxRate = 0.21
const surcharge = 0.21

// Real DRY: one piece of KNOWLEDGE, in one place
const VAT_RATE = 0.21`,
            es: `// Parecen idénticas, pero son dos reglas distintas que hoy
// coinciden. Unirlas acopla finanzas con envíos.
const taxRate = 0.21
const surcharge = 0.21

// DRY de verdad: un CONOCIMIENTO, en un solo sitio
const VAT_RATE = 0.21`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'bs-1',
          prompt: {
            en: 'Two functions have identical bodies but exist for unrelated reasons. Should you merge them?',
            es: 'Dos funciones tienen cuerpos idénticos pero existen por motivos sin relación. ¿Las unificas?',
          },
          choices: [
            { en: 'Yes, always — that is DRY', es: 'Sí, siempre: eso es DRY' },
            {
              en: 'No — DRY is about duplicated knowledge, and merging would couple two rules that must be free to diverge',
              es: 'No: DRY va de conocimiento duplicado, y unirlas acoplaría dos reglas que deben poder divergir',
            },
            { en: 'Only if they are over 10 lines', es: 'Solo si tienen más de 10 líneas' },
            { en: 'Only in the same file', es: 'Solo si están en el mismo fichero' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'This is the most misapplied principle in software. When the two rules later diverge, the merged function grows a boolean flag, then another — and you end up with something far worse than the duplication.',
            es: 'Es el principio peor aplicado del software. Cuando las dos reglas luego divergen, la función unificada gana un flag booleano, luego otro, y acabas con algo mucho peor que la duplicación.',
          },
        },
        {
          kind: 'choice',
          id: 'bs-2',
          prompt: {
            en: 'Why is composition usually preferred over inheritance?',
            es: '¿Por qué se suele preferir la composición a la herencia?',
          },
          choices: [
            { en: 'It runs faster', es: 'Se ejecuta más rápido' },
            {
              en: 'Inheritance is a permanent, compile-time coupling to a parent’s internals; composition can be changed and combined',
              es: 'La herencia es un acoplamiento permanente y en compilación a las tripas del padre; la composición se puede cambiar y combinar',
            },
            { en: 'Inheritance is deprecated', es: 'La herencia está obsoleta' },
            { en: 'Composition needs less code', es: 'La composición necesita menos código' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A subclass depends on how its parent is built, not just on what it promises — so a harmless-looking parent change breaks children. Composition swaps that for an interface you control, and lets an object combine several behaviours instead of exactly one lineage.',
            es: 'Una subclase depende de cómo está hecho el padre, no solo de lo que promete, así que un cambio inocente en el padre rompe a los hijos. La composición lo cambia por una interfaz que tú controlas y permite combinar varios comportamientos en vez de un único linaje.',
          },
        },
        {
          kind: 'boolean',
          id: 'bs-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Building extra flexibility now saves time later.',
            es: 'Construir flexibilidad de más ahora ahorra tiempo después.',
          },
          answer: false,
          explanation: {
            en: 'That is exactly what YAGNI warns about. Flexibility built on a guess is usually the wrong shape, and meanwhile everyone pays for the extra indirection every time they read the code. Build it when the second real case shows up.',
            es: 'Es justo de lo que avisa YAGNI. La flexibilidad construida sobre una suposición suele tener la forma equivocada, y mientras tanto todo el mundo paga la indirección extra cada vez que lee el código. Constrúyela cuando aparezca el segundo caso real.',
          },
        },
        {
          kind: 'choice',
          id: 'bs-4',
          prompt: {
            en: 'What does `order.customer().address().country().code()` violate?',
            es: '¿Qué viola `pedido.cliente().direccion().pais().codigo()`?',
          },
          choices: [
            { en: 'SRP', es: 'SRP' },
            {
              en: 'The Law of Demeter — it couples you to four classes you never asked for',
              es: 'La ley de Demeter: te acopla a cuatro clases que nunca pediste',
            },
            { en: 'OCP', es: 'OCP' },
            { en: 'Nothing', es: 'Nada' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Any change in that chain breaks your code, and every null along it is your problem. `order.countryCode()` asks the object you actually know for the answer you actually want.',
            es: 'Cualquier cambio en esa cadena rompe tu código, y cada nulo del camino es problema tuyo. `pedido.codigoPais()` le pide al objeto que sí conoces la respuesta que de verdad quieres.',
          },
        },
        {
          kind: 'choice',
          id: 'bs-5',
          prompt: {
            en: 'High cohesion and low coupling. What do they actually buy you?',
            es: 'Alta cohesión y bajo acoplamiento. ¿Qué te dan en realidad?',
          },
          choices: [
            { en: 'Faster execution', es: 'Ejecución más rápida' },
            {
              en: 'A change stays local: you can understand and modify one module without loading the rest in your head',
              es: 'El cambio se queda local: entiendes y modificas un módulo sin cargar el resto en la cabeza',
            },
            { en: 'Smaller binaries', es: 'Binarios más pequeños' },
            { en: 'Fewer dependencies to install', es: 'Menos dependencias que instalar' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Everything in this section is about the same currency: how much of the system you must hold in your head to make one safe change. That is the real limit on how large a codebase can get.',
            es: 'Todo en esta sección va de la misma moneda: cuánto sistema tienes que sostener en la cabeza para hacer un cambio seguro. Ese es el límite real de cuánto puede crecer un código.',
          },
        },
        {
          kind: 'order',
          id: 'bs-6',
          prompt: {
            en: 'Order these from the cheapest reaction to duplication to the most expensive.',
            es: 'Ordena estas reacciones a la duplicación de la más barata a la más cara.',
          },
          items: [
            {
              en: 'Leave it — you have seen the pattern twice and cannot see its shape yet',
              es: 'Déjalo: has visto el patrón dos veces y aún no ves su forma',
            },
            {
              en: 'Extract a well-named function once the third case confirms the shape',
              es: 'Extrae una función bien nombrada cuando el tercer caso confirme la forma',
            },
            {
              en: 'Introduce an abstraction with an interface behind it',
              es: 'Introduce una abstracción con una interfaz detrás',
            },
            {
              en: 'Build a configurable framework for cases nobody has requested',
              es: 'Construye un framework configurable para casos que nadie ha pedido',
            },
          ],
          explanation: {
            en: 'Each step buys reuse and charges indirection. The last one is where teams lose months — a framework built on speculation that then has to be worked around rather than used.',
            es: 'Cada paso compra reutilización y cobra indirección. En el último es donde los equipos pierden meses: un framework hecho sobre suposiciones que luego se esquiva en vez de usarse.',
          },
        },
      ],
    },
  ],
}
