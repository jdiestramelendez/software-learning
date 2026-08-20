import type { Section } from '../types'

export const craft: Section = {
  id: 'craft',
  title: { en: 'Code that survives other humans', es: 'Código que sobrevive a otras personas' },
  subtitle: {
    en: 'You write code once and read it a hundred times. Optimise for the reading.',
    es: 'El código se escribe una vez y se lee cien. Optimiza para la lectura.',
  },
  units: [
    {
      id: 'naming',
      title: { en: 'Naming & clean code', es: 'Nombres y código limpio' },
      icon: '✍️',
      summary: {
        en: 'The cheapest documentation you will ever write.',
        es: 'La documentación más barata que vas a escribir.',
      },
      concept: {
        headline: {
          en: 'Good names remove the need for comments.',
          es: 'Un buen nombre elimina la necesidad del comentario.',
        },
        body: [
          {
            en: 'A name is a promise about what something does. When the name is accurate, a reader can skip the implementation entirely — and that is what makes a large codebase navigable.',
            es: 'Un nombre es una promesa sobre lo que algo hace. Cuando el nombre es preciso, quien lee puede saltarse la implementación entera, y eso es lo que hace navegable un código grande.',
          },
          {
            en: 'The best test: could a new teammate guess what this does from the name alone? If they need to read the body to find out, the name is doing no work.',
            es: 'La mejor prueba: ¿alguien recién llegado adivinaría qué hace esto solo por el nombre? Si tiene que leer el cuerpo para averiguarlo, el nombre no está trabajando.',
          },
        ],
        keyPoints: [
          {
            en: 'Say what it IS, not what type it is: `userEmail`, not `strUser`.',
            es: 'Di lo que ES, no de qué tipo es: `userEmail`, no `strUser`.',
          },
          {
            en: 'Booleans read as questions: `isActive`, `hasPermission`, `canEdit`.',
            es: 'Los booleanos se leen como preguntas: `isActive`, `hasPermission`, `canEdit`.',
          },
          {
            en: 'Length should match scope — `i` in a three-line loop is fine; a module-level `d` is not.',
            es: 'La longitud debe ir con el alcance: `i` en un bucle de tres líneas está bien; una `d` a nivel de módulo, no.',
          },
          {
            en: 'A comment explaining WHAT the code does is usually a naming failure. Comments should explain WHY.',
            es: 'Un comentario que explica QUÉ hace el código suele ser un fallo de nombres. Los comentarios deben explicar POR QUÉ.',
          },
        ],
        example: {
          caption: { en: 'Same logic, one is readable', es: 'La misma lógica, una se lee' },
          code: {
            en: `// Before
if (u.st === 2 && u.p > 0) { proc(u) }

// After
if (user.isActive && user.hasCredit) {
  chargeSubscription(user)
}`,
            es: `// Antes
if (u.st === 2 && u.p > 0) { proc(u) }

// Después
if (user.isActive && user.hasCredit) {
  chargeSubscription(user)
}`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'name-1',
          prompt: {
            en: 'Which is the best name for a function that returns whether an order can be refunded?',
            es: '¿Cuál es el mejor nombre para una función que devuelve si un pedido se puede reembolsar?',
          },
          choices: ['checkOrder()', 'isRefundable()', 'orderRefundBoolean()', 'doRefundCheck()'],
          answerIndex: 1,
          explanation: {
            en: '`isRefundable()` reads as a question with a yes/no answer, which is exactly what it returns. `checkOrder()` tells you nothing about what is being checked or what comes back.',
            es: '`isRefundable()` se lee como una pregunta de sí o no, que es exactamente lo que devuelve. `checkOrder()` no dice nada sobre qué se comprueba ni qué se obtiene.',
          },
        },
        {
          kind: 'boolean',
          id: 'name-2',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A comment that explains what a confusing line does is better than renaming things.',
            es: 'Un comentario que explica qué hace una línea confusa es mejor que renombrar las cosas.',
          },
          answer: false,
          explanation: {
            en: 'Comments drift out of date silently — code does not. If a line needs a comment to explain WHAT it does, extract it into a well-named function instead. Save comments for WHY: the business rule, the workaround, the link to the incident.',
            es: 'Los comentarios se quedan obsoletos en silencio; el código no. Si una línea necesita un comentario para explicar QUÉ hace, extráela a una función bien nombrada. Reserva los comentarios para el POR QUÉ: la regla de negocio, el apaño, el enlace al incidente.',
          },
        },
        {
          kind: 'choice',
          id: 'name-3',
          prompt: {
            en: 'What is the main problem with this function?',
            es: '¿Cuál es el problema principal de esta función?',
          },
          code: `function handleUser(user) {
  validateEmail(user)
  saveToDatabase(user)
  sendWelcomeEmail(user)
  updateAnalytics(user)
  chargeCard(user)
}`,
          choices: [
            { en: 'It is too short', es: 'Es demasiado corta' },
            {
              en: 'The name promises one thing but it does five unrelated things',
              es: 'El nombre promete una cosa pero hace cinco cosas sin relación',
            },
            { en: 'It should be async', es: 'Debería ser async' },
            { en: 'It has too few parameters', es: 'Tiene muy pocos parámetros' },
          ],
          answerIndex: 1,
          explanation: {
            en: '"handle" is a name that means nothing, and it hides five separate responsibilities. When the payment fails, has the welcome email already gone out? The name gives you no way to reason about it.',
            es: '"handle" es un nombre que no significa nada, y esconde cinco responsabilidades distintas. Cuando falle el cobro, ¿ya se envió el correo de bienvenida? El nombre no te da forma de razonarlo.',
          },
        },
        {
          kind: 'choice',
          id: 'name-4',
          prompt: {
            en: 'When is a very short variable name like `i` acceptable?',
            es: '¿Cuándo es aceptable un nombre de variable muy corto como `i`?',
          },
          choices: [
            { en: 'Never', es: 'Nunca' },
            {
              en: 'When its scope is a few lines and the meaning is conventional',
              es: 'Cuando su alcance son unas pocas líneas y el significado es convencional',
            },
            { en: 'Whenever you are in a hurry', es: 'Siempre que tengas prisa' },
            { en: 'Only in tests', es: 'Solo en los tests' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Name length should scale with scope. `i` inside a three-line loop is universally understood. The same name as a module-level variable, used 200 lines later, is unreadable.',
            es: 'La longitud del nombre debe escalar con el alcance. `i` dentro de un bucle de tres líneas lo entiende todo el mundo. Ese mismo nombre como variable de módulo, usada 200 líneas después, es ilegible.',
          },
        },
        {
          kind: 'choice',
          id: 'name-5',
          prompt: {
            en: 'What makes "magic numbers" like `if (status === 3)` a problem?',
            es: '¿Por qué son un problema los "números mágicos" como `if (status === 3)`?',
          },
          choices: [
            { en: 'They are slower', es: 'Son más lentos' },
            {
              en: 'The reader has no way to know what 3 means, and it is repeated everywhere',
              es: 'Quien lee no tiene forma de saber qué significa 3, y se repite por todas partes',
            },
            { en: 'They use more memory', es: 'Usan más memoria' },
            { en: 'Linters cannot parse them', es: 'Los linters no pueden analizarlos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A named constant — `if (status === Status.Cancelled)` — turns a lookup into a read. It also means changing the value happens in one place instead of grep-and-pray.',
            es: 'Una constante con nombre —`if (status === Status.Cancelled)`— convierte una consulta en una lectura. Además, cambiar el valor pasa a hacerse en un solo sitio en vez de a base de grep y rezar.',
          },
        },
      ],
    },
    {
      id: 'functions',
      title: { en: 'Functions & abstraction', es: 'Funciones y abstracción' },
      icon: '🧩',
      summary: {
        en: 'When an abstraction earns its keep — and when it just hides things.',
        es: 'Cuándo una abstracción se gana su sitio y cuándo solo esconde cosas.',
      },
      concept: {
        headline: {
          en: 'A pure function is one you can reason about without reading anything else.',
          es: 'Una función pura es la que puedes razonar sin leer nada más.',
        },
        body: [
          {
            en: 'A pure function always returns the same output for the same input, and changes nothing outside itself. That makes it trivially testable and impossible to break from a distance.',
            es: 'Una función pura siempre devuelve la misma salida para la misma entrada y no cambia nada fuera de sí misma. Eso la hace trivial de testear e imposible de romper a distancia.',
          },
          {
            en: 'Side effects — writing to a database, mutating a global, printing — are necessary; a program with no side effects does nothing. The skill is pushing them to the edges and keeping the core logic pure.',
            es: 'Los efectos secundarios —escribir en una base de datos, mutar una global, imprimir— son necesarios: un programa sin efectos no hace nada. La habilidad está en empujarlos a los bordes y mantener pura la lógica central.',
          },
        ],
        keyPoints: [
          {
            en: 'Same input, same output, no side effects = pure. Test it with zero setup.',
            es: 'Misma entrada, misma salida, sin efectos secundarios = pura. Se testea sin preparar nada.',
          },
          {
            en: 'Push I/O to the edges; keep decision-making in pure functions in the middle.',
            es: 'Empuja la E/S a los bordes y deja las decisiones en funciones puras en el centro.',
          },
          {
            en: 'A function should do one thing at one level of abstraction.',
            es: 'Una función debe hacer una cosa a un solo nivel de abstracción.',
          },
          {
            en: 'Do not abstract on the second occurrence. Wait until you have seen the pattern three times and know its real shape.',
            es: 'No abstraigas a la segunda repetición. Espera a ver el patrón tres veces y conocer su forma real.',
          },
        ],
        example: {
          caption: {
            en: 'Separating the decision from the effect',
            es: 'Separar la decisión del efecto',
          },
          code: {
            en: `// Hard to test: decision and side effect are welded together
function applyDiscount(user) {
  if (user.orders > 10) db.save({ ...user, discount: 0.1 })
}

// Easy to test: the rule is pure, the caller does the writing
function discountFor(user) {
  return user.orders > 10 ? 0.1 : 0
}`,
            es: `// Difícil de testear: decisión y efecto están soldados
function applyDiscount(user) {
  if (user.orders > 10) db.save({ ...user, discount: 0.1 })
}

// Fácil de testear: la regla es pura, quien llama escribe
function discountFor(user) {
  return user.orders > 10 ? 0.1 : 0
}`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'fn-1',
          prompt: {
            en: 'Which of these functions is pure?',
            es: '¿Cuál de estas funciones es pura?',
          },
          choices: [
            'function now() { return Date.now() }',
            'function add(a, b) { return a + b }',
            'function save(u) { db.write(u) }',
            'function log(m) { console.log(m) }',
          ],
          answerIndex: 1,
          explanation: {
            en: '`add` depends only on its arguments and changes nothing. `now()` returns something different every call; the other two reach outside the function to do their work.',
            es: '`add` depende solo de sus argumentos y no cambia nada. `now()` devuelve algo distinto en cada llamada; las otras dos salen fuera de la función para hacer su trabajo.',
          },
        },
        {
          kind: 'boolean',
          id: 'fn-2',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'You should extract a shared function the moment you see the same code twice.',
            es: 'Deberías extraer una función compartida en cuanto veas el mismo código dos veces.',
          },
          answer: false,
          explanation: {
            en: 'Two similar snippets are often a coincidence, not a pattern. Extracting too early couples code that then has to diverge, and you end up with a function full of boolean flags. Wait for the third occurrence — by then you can see the real shape.',
            es: 'Dos fragmentos parecidos suelen ser una coincidencia, no un patrón. Extraer demasiado pronto acopla código que luego tiene que divergir, y acabas con una función llena de flags booleanos. Espera a la tercera vez: para entonces ya ves la forma real.',
          },
        },
        {
          kind: 'choice',
          id: 'fn-3',
          prompt: { en: 'What is the smell in this signature?', es: '¿Qué huele mal en esta firma?' },
          code: `function createUser(name, email, isAdmin, sendEmail, skipValidation, isTrial) {`,
          choices: [
            {
              en: 'Too many boolean flag parameters',
              es: 'Demasiados parámetros booleanos de tipo flag',
            },
            { en: 'The name is wrong', es: 'El nombre está mal' },
            { en: 'It should return a Promise', es: 'Debería devolver una Promise' },
            { en: 'Nothing, it is fine', es: 'Nada, está bien' },
          ],
          answerIndex: 0,
          explanation: {
            en: 'Every boolean flag means the function has (at least) two behaviours bolted together — six flags is 64 possible paths. At the call site, `createUser(a, b, true, false, true, false)` is unreadable. Pass an options object, or split the function.',
            es: 'Cada flag booleano significa que la función tiene (al menos) dos comportamientos pegados: seis flags son 64 caminos posibles. En la llamada, `createUser(a, b, true, false, true, false)` es ilegible. Pasa un objeto de opciones o divide la función.',
          },
        },
        {
          kind: 'choice',
          id: 'fn-4',
          prompt: {
            en: 'Why are functions with side effects harder to test?',
            es: '¿Por qué son más difíciles de testear las funciones con efectos secundarios?',
          },
          choices: [
            { en: 'They run slower', es: 'Se ejecutan más despacio' },
            {
              en: 'You must set up and inspect the outside world, not just check a return value',
              es: 'Hay que preparar e inspeccionar el mundo exterior, no solo comprobar un valor devuelto',
            },
            { en: 'They cannot be called twice', es: 'No se pueden llamar dos veces' },
            { en: 'Test runners do not support them', es: 'Los runners de tests no las soportan' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A pure function needs one line: call it, assert the result. A function that writes to a database needs a database, cleanup between tests, and assertions against external state — plus it can fail for reasons unrelated to your logic.',
            es: 'Una función pura necesita una línea: la llamas y compruebas el resultado. Una que escribe en una base de datos necesita esa base de datos, limpieza entre tests y comprobaciones contra estado externo; además puede fallar por motivos ajenos a tu lógica.',
          },
        },
        {
          kind: 'choice',
          id: 'fn-5',
          prompt: {
            en: 'What does "one level of abstraction" mean for a function?',
            es: '¿Qué significa "un solo nivel de abstracción" en una función?',
          },
          choices: [
            { en: 'It should have only one return statement', es: 'Debe tener un único return' },
            {
              en: 'It should not mix high-level steps with low-level details',
              es: 'No debe mezclar pasos de alto nivel con detalles de bajo nivel',
            },
            { en: 'It should be under 10 lines', es: 'Debe tener menos de 10 líneas' },
            { en: 'It should take one parameter', es: 'Debe recibir un solo parámetro' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Do not put `calculateTotal()` next to raw byte manipulation in the same body. Mixing levels forces the reader to constantly zoom in and out — each function should read as a coherent story at one altitude.',
            es: 'No pongas `calculateTotal()` junto a manipulación de bytes en el mismo cuerpo. Mezclar niveles obliga a quien lee a hacer zoom constantemente: cada función debería leerse como una historia coherente a una sola altura.',
          },
        },
      ],
    },
    {
      id: 'errors',
      title: { en: 'Error handling', es: 'Manejo de errores' },
      icon: '💥',
      summary: {
        en: 'The empty catch block is the most expensive line of code in software.',
        es: 'El catch vacío es la línea de código más cara del software.',
      },
      concept: {
        headline: {
          en: 'An error you swallow becomes a bug you cannot find.',
          es: 'Un error que te tragas se convierte en un bug que no encuentras.',
        },
        body: [
          {
            en: 'Errors are information. Catching one and doing nothing throws that information away and lets the program continue in a state you did not design for — which surfaces later, somewhere else, as nonsense.',
            es: 'Los errores son información. Capturar uno y no hacer nada tira esa información a la basura y deja que el programa siga en un estado que no diseñaste, que aparece más tarde, en otro sitio, sin sentido alguno.',
          },
          {
            en: 'The rule of thumb: only catch an error if you can actually do something about it. Otherwise let it travel up to someone who can — or to your logs.',
            es: 'La regla práctica: captura un error solo si puedes hacer algo con él. Si no, déjalo subir hasta quien pueda, o hasta tus logs.',
          },
        ],
        keyPoints: [
          {
            en: 'Never write an empty catch. Log it, handle it, or let it propagate.',
            es: 'Nunca escribas un catch vacío. Regístralo, manéjalo o déjalo propagar.',
          },
          {
            en: 'Fail fast: validate at the boundary, so bad data never reaches your core logic.',
            es: 'Falla rápido: valida en la frontera para que los datos malos nunca lleguen a tu lógica central.',
          },
          {
            en: 'Distinguish expected failures (invalid input, 404) from bugs (null dereference). Handle the first, fix the second.',
            es: 'Distingue fallos esperados (entrada inválida, 404) de bugs (desreferenciar null). Maneja los primeros, arregla los segundos.',
          },
          {
            en: 'An error message should say what failed, with what input, and what to do next.',
            es: 'Un mensaje de error debe decir qué falló, con qué entrada y qué hacer a continuación.',
          },
        ],
        example: {
          caption: {
            en: 'Three ways to handle the same failure',
            es: 'Tres formas de manejar el mismo fallo',
          },
          code: {
            en: `try { await save(user) }
catch (e) { }                     // never — the failure vanishes

catch (e) { console.log(e) }      // barely better — it continues broken

catch (e) {
  logger.error('Failed to save user', { userId: user.id, error: e })
  throw new SaveError('Could not save user', { cause: e })
}`,
            es: `try { await save(user) }
catch (e) { }                     // nunca — el fallo desaparece

catch (e) { console.log(e) }      // apenas mejor — sigue roto

catch (e) {
  logger.error('Failed to save user', { userId: user.id, error: e })
  throw new SaveError('Could not save user', { cause: e })
}`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'err-1',
          prompt: {
            en: 'Why is an empty `catch {}` so dangerous?',
            es: '¿Por qué es tan peligroso un `catch {}` vacío?',
          },
          choices: [
            { en: 'It slows the program down', es: 'Ralentiza el programa' },
            {
              en: 'The program continues in an unexpected state and the failure surfaces far away',
              es: 'El programa sigue en un estado inesperado y el fallo aparece muy lejos',
            },
            { en: 'It uses more memory', es: 'Usa más memoria' },
            { en: 'It prevents the function returning', es: 'Impide que la función retorne' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The code after the try block runs as if everything succeeded. You get a null three functions later, or a silently missing record, and nothing points back to the real cause. Debugging this can take days.',
            es: 'El código posterior al try se ejecuta como si todo hubiera ido bien. Te encuentras un null tres funciones después, o un registro que falta sin más, y nada apunta a la causa real. Depurar esto puede llevar días.',
          },
        },
        {
          kind: 'boolean',
          id: 'err-2',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A user submitting an invalid email address should be logged as an application error.',
            es: 'Que un usuario envíe un email inválido debería registrarse como error de la aplicación.',
          },
          answer: false,
          explanation: {
            en: 'That is expected input, not a bug — handle it with a validation message. If you log it as an error, your alerts fill with noise and you stop reading them, which is how real errors get missed.',
            es: 'Eso es una entrada esperada, no un bug: manéjalo con un mensaje de validación. Si lo registras como error, tus alertas se llenan de ruido y dejas de leerlas, que es justo como se escapan los errores de verdad.',
          },
        },
        {
          kind: 'choice',
          id: 'err-3',
          prompt: {
            en: 'Which error message is most useful at 3am?',
            es: '¿Qué mensaje de error es más útil a las 3 de la mañana?',
          },
          choices: [
            { en: '"Something went wrong"', es: '"Algo ha salido mal"' },
            { en: '"Error: undefined"', es: '"Error: undefined"' },
            {
              en: '"Failed to charge order 8123: card declined (insufficient_funds)"',
              es: '"Fallo al cobrar el pedido 8123: tarjeta rechazada (insufficient_funds)"',
            },
            { en: '"ERR_500"', es: '"ERR_500"' },
          ],
          answerIndex: 2,
          explanation: {
            en: 'It names the operation, the specific record, and the reason. You can search for the order, reproduce the case, and decide what to do — all without opening a debugger.',
            es: 'Nombra la operación, el registro concreto y el motivo. Puedes buscar el pedido, reproducir el caso y decidir qué hacer, todo sin abrir un depurador.',
          },
        },
        {
          kind: 'choice',
          id: 'err-4',
          prompt: { en: 'What does "fail fast" mean?', es: '¿Qué significa "fallar rápido"?' },
          choices: [
            { en: 'Crash the app on any error', es: 'Tirar la app ante cualquier error' },
            {
              en: 'Validate inputs at the boundary so bad data never spreads into the system',
              es: 'Validar las entradas en la frontera para que los datos malos no se extiendan por el sistema',
            },
            { en: 'Use short timeouts', es: 'Usar timeouts cortos' },
            {
              en: 'Skip error handling to keep code simple',
              es: 'Saltarse el manejo de errores para simplificar el código',
            },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Catching a bad value where it enters means the error message points at the real cause. Letting it flow inward means you find it later, corrupted, in a place with no context about where it came from.',
            es: 'Capturar un valor malo donde entra hace que el mensaje de error apunte a la causa real. Dejarlo fluir hacia dentro significa encontrarlo más tarde, corrompido, en un sitio sin contexto sobre de dónde venía.',
          },
        },
        {
          kind: 'choice',
          id: 'err-5',
          prompt: {
            en: 'When re-throwing an error, why attach the original as `cause`?',
            es: 'Al relanzar un error, ¿por qué adjuntar el original como `cause`?',
          },
          choices: [
            { en: 'It is required by the language', es: 'Lo exige el lenguaje' },
            {
              en: 'It preserves the original stack trace and root cause',
              es: 'Conserva la traza de pila original y la causa raíz',
            },
            { en: 'It makes the error smaller', es: 'Hace el error más pequeño' },
            {
              en: 'It prevents the error propagating further',
              es: 'Impide que el error siga propagándose',
            },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Without the cause you get your own message and lose the line that actually failed. `new Error("msg", { cause: e })` keeps the whole chain, so the log shows both what you were doing and what broke.',
            es: 'Sin la causa te queda tu propio mensaje y pierdes la línea que falló de verdad. `new Error("msg", { cause: e })` conserva toda la cadena, así el log muestra a la vez qué estabas haciendo y qué se rompió.',
          },
        },
        {
          kind: 'gap',
          id: 'err-6',
          prompt: {
            en: 'Complete the re-throw so the original failure is not lost.',
            es: 'Completa el relanzamiento para no perder el fallo original.',
          },
          code: `try {
  await chargeCard(order)
} catch (e) {
  throw new PaymentError('Could not charge order', { ___: e })
}`,
          choices: ['cause', 'parent', 'inner', 'previous'],
          answerIndex: 0,
          explanation: {
            en: '`cause` is the standard option for chaining errors. Without it you keep your own message and throw away the stack trace of the line that actually broke.',
            es: '`cause` es la opción estándar para encadenar errores. Sin ella te quedas con tu mensaje y tiras la traza de pila de la línea que se rompió de verdad.',
          },
        },
      ],
    },
    {
      id: 'testing',
      title: { en: 'Testing', es: 'Testing' },
      icon: '🧪',
      summary: {
        en: 'The safety net that lets you change code without fear.',
        es: 'La red de seguridad que te deja cambiar código sin miedo.',
      },
      concept: {
        headline: {
          en: 'Tests are not about proving correctness. They are about changing code safely.',
          es: 'Los tests no van de demostrar que algo es correcto, sino de poder cambiar código con seguridad.',
        },
        body: [
          {
            en: 'A test suite is what lets you refactor aggressively, upgrade a dependency, or hand the codebase to someone new. Without it, every change is a gamble and the codebase slowly freezes.',
            es: 'Una suite de tests es lo que te permite refactorizar sin miedo, actualizar una dependencia o entregar el código a alguien nuevo. Sin ella, cada cambio es una apuesta y el código se va congelando.',
          },
          {
            en: 'The pyramid: many fast unit tests at the base, fewer integration tests in the middle, a handful of end-to-end tests at the top. Inverting it gives you a slow, flaky suite nobody trusts.',
            es: 'La pirámide: muchos tests unitarios rápidos en la base, menos de integración en medio y un puñado de end-to-end arriba. Invertirla da una suite lenta e inestable en la que nadie confía.',
          },
        ],
        keyPoints: [
          {
            en: 'Unit — one function, no I/O, milliseconds. Integration — several pieces together. E2E — the real app through a browser.',
            es: 'Unitario — una función, sin E/S, milisegundos. Integración — varias piezas juntas. E2E — la app real desde un navegador.',
          },
          {
            en: 'Test behaviour, not implementation. A test that breaks on every refactor is testing the wrong thing.',
            es: 'Testea el comportamiento, no la implementación. Un test que se rompe con cada refactor está testeando lo que no debe.',
          },
          {
            en: 'A flaky test is worse than no test: it trains the team to ignore red.',
            es: 'Un test inestable es peor que ningún test: enseña al equipo a ignorar el rojo.',
          },
          {
            en: 'TDD: write the failing test first, so you know it can actually fail.',
            es: 'TDD: escribe primero el test que falla, para saber que de verdad puede fallar.',
          },
        ],
        example: {
          caption: { en: 'Arrange, act, assert', es: 'Preparar, actuar, comprobar' },
          code: {
            en: `it('spends a heart on a wrong answer', () => {
  const lesson = startLesson(questions)   // arrange
  answer(lesson, WRONG)                   // act
  expect(lesson.hearts).toBe(4)           // assert
})`,
            es: `it('gasta una vida con una respuesta incorrecta', () => {
  const lesson = startLesson(questions)   // preparar
  answer(lesson, WRONG)                   // actuar
  expect(lesson.hearts).toBe(4)           // comprobar
})`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'test-1',
          prompt: {
            en: 'What makes a test "flaky"?',
            es: '¿Qué hace que un test sea "inestable" (flaky)?',
          },
          choices: [
            { en: 'It runs slowly', es: 'Se ejecuta despacio' },
            {
              en: 'It passes or fails without the code changing',
              es: 'Pasa o falla sin que el código cambie',
            },
            { en: 'It has no assertions', es: 'No tiene comprobaciones' },
            { en: 'It only runs in CI', es: 'Solo se ejecuta en CI' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Flakiness is non-determinism — usually timing, shared state between tests, or a real network call. It is corrosive: once people learn to re-run a red build, they also ignore the genuine failures.',
            es: 'La inestabilidad es indeterminismo: normalmente tiempos, estado compartido entre tests o una llamada de red real. Es corrosiva: en cuanto la gente aprende a relanzar un build rojo, también ignora los fallos de verdad.',
          },
        },
        {
          kind: 'choice',
          id: 'test-2',
          prompt: {
            en: 'You should have MOST of which kind of test?',
            es: '¿De qué tipo de test deberías tener MÁS cantidad?',
          },
          choices: [
            { en: 'End-to-end', es: 'End-to-end' },
            { en: 'Integration', es: 'De integración' },
            { en: 'Unit', es: 'Unitarios' },
            { en: 'Manual', es: 'Manuales' },
          ],
          answerIndex: 2,
          explanation: {
            en: 'Unit tests are fast, isolated, and point straight at the broken function. E2E tests catch things nothing else can, but they are slow and fragile — a handful covering critical journeys is the right dose.',
            es: 'Los tests unitarios son rápidos, aislados y apuntan directamente a la función rota. Los E2E cazan cosas que nada más caza, pero son lentos y frágiles: un puñado que cubra los recorridos críticos es la dosis correcta.',
          },
        },
        {
          kind: 'boolean',
          id: 'test-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: '100% code coverage means the code has no bugs.',
            es: 'Un 100% de cobertura significa que el código no tiene bugs.',
          },
          answer: false,
          explanation: {
            en: 'Coverage only proves each line RAN during the suite — not that anything meaningful was asserted about it, and not that you thought of the failing input. It is a useful signal for finding untested areas, and a terrible target in itself.',
            es: 'La cobertura solo demuestra que cada línea SE EJECUTÓ durante la suite, no que se comprobara algo con sentido sobre ella ni que pensaras en la entrada que falla. Es una señal útil para encontrar zonas sin testear y un objetivo pésimo en sí misma.',
          },
        },
        {
          kind: 'choice',
          id: 'test-4',
          prompt: {
            en: 'Why write the failing test BEFORE the implementation?',
            es: '¿Por qué escribir el test que falla ANTES de la implementación?',
          },
          choices: [
            { en: 'It is faster', es: 'Es más rápido' },
            {
              en: 'It proves the test can actually fail — a test that never fails protects nothing',
              es: 'Demuestra que el test puede fallar de verdad: un test que nunca falla no protege nada',
            },
            { en: 'Linters require it', es: 'Lo exigen los linters' },
            { en: 'It produces shorter code', es: 'Produce código más corto' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A test written after the fact and passing immediately might be asserting nothing at all. Watching it go red first is the only proof that it is wired to the behaviour you care about.',
            es: 'Un test escrito después y que pasa a la primera puede no estar comprobando absolutamente nada. Verlo ponerse en rojo primero es la única prueba de que está conectado al comportamiento que te importa.',
          },
        },
        {
          kind: 'choice',
          id: 'test-5',
          prompt: {
            en: 'Your test breaks every time you rename a private method, though behaviour is unchanged. What is wrong?',
            es: 'Tu test se rompe cada vez que renombras un método privado, aunque el comportamiento no cambie. ¿Qué falla?',
          },
          choices: [
            { en: 'The test is too slow', es: 'El test es demasiado lento' },
            {
              en: 'It tests implementation details instead of observable behaviour',
              es: 'Testea detalles de implementación en vez de comportamiento observable',
            },
            { en: 'It needs more mocks', es: 'Necesita más mocks' },
            { en: 'It should be an E2E test', es: 'Debería ser un test E2E' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Tests coupled to internals punish refactoring, which is exactly the activity they should protect. Assert on what the unit returns or does from the outside — the internals should be free to change.',
            es: 'Los tests acoplados a las tripas castigan el refactor, que es justo la actividad que deberían proteger. Comprueba lo que la unidad devuelve o hace desde fuera: las tripas deben poder cambiar libremente.',
          },
        },
        {
          kind: 'order',
          id: 'test-6',
          prompt: {
            en: 'Put a test-driven development cycle in order.',
            es: 'Ordena un ciclo de desarrollo guiado por tests.',
          },
          items: [
            {
              en: 'Write a test for behaviour that does not exist yet',
              es: 'Escribe un test para un comportamiento que aún no existe',
            },
            {
              en: 'Run it and watch it fail for the right reason',
              es: 'Ejecútalo y comprueba que falla por el motivo correcto',
            },
            {
              en: 'Write the simplest code that makes it pass',
              es: 'Escribe el código más simple que lo haga pasar',
            },
            {
              en: 'Refactor now that the test protects you',
              es: 'Refactoriza ahora que el test te protege',
            },
          ],
          explanation: {
            en: 'Red, green, refactor. Watching it fail first is the step people skip — and it is the only proof the test is actually wired to the behaviour.',
            es: 'Rojo, verde, refactor. Verlo fallar primero es el paso que la gente se salta, y es la única prueba de que el test está realmente conectado al comportamiento.',
          },
        },
      ],
    },
    {
      id: 'debugging',
      title: { en: 'Debugging', es: 'Depuración' },
      icon: '🐛',
      summary: {
        en: 'A systematic search, not a guessing game.',
        es: 'Una búsqueda sistemática, no un juego de adivinanzas.',
      },
      concept: {
        headline: {
          en: 'Debugging is binary search over your assumptions.',
          es: 'Depurar es hacer búsqueda binaria sobre tus suposiciones.',
        },
        body: [
          {
            en: 'The instinct is to guess and change things. The method is to reproduce reliably, then halve the search space repeatedly until the bug has nowhere to hide.',
            es: 'El instinto es adivinar y cambiar cosas. El método es reproducir de forma fiable y luego partir el espacio de búsqueda por la mitad una y otra vez hasta que el bug no tenga dónde esconderse.',
          },
          {
            en: 'Most of the time the bug is not where you think it is — it is in an assumption you never questioned. The discipline is checking the boring things first.',
            es: 'La mayoría de las veces el bug no está donde crees: está en una suposición que nunca cuestionaste. La disciplina consiste en comprobar primero lo aburrido.',
          },
        ],
        keyPoints: [
          {
            en: 'Reproduce it first. A bug you cannot trigger on demand cannot be verified as fixed.',
            es: 'Reprodúcelo primero. Un bug que no puedes provocar a voluntad no se puede verificar como arreglado.',
          },
          {
            en: 'Read the stack trace properly — usually the top frame in YOUR code is the place to look.',
            es: 'Lee bien la traza de pila: normalmente el marco más alto de TU código es donde hay que mirar.',
          },
          {
            en: 'Bisect: comment out half, or use `git bisect` to find the commit that introduced it.',
            es: 'Bisecta: comenta la mitad, o usa `git bisect` para encontrar el commit que lo introdujo.',
          },
          {
            en: 'Change one thing at a time. Two simultaneous changes make the result meaningless.',
            es: 'Cambia una cosa cada vez. Dos cambios simultáneos hacen que el resultado no signifique nada.',
          },
        ],
        example: {
          caption: {
            en: 'Finding the commit that broke it, automatically',
            es: 'Encontrar el commit que lo rompió, automáticamente',
          },
          code: {
            en: `git bisect start
git bisect bad                 # today is broken
git bisect good v1.4.0         # this release was fine
# git checks out the midpoint; you test and mark good/bad
# ~10 steps to find the culprit among 1000 commits`,
            es: `git bisect start
git bisect bad                 # hoy está roto
git bisect good v1.4.0         # esta versión iba bien
# git salta al punto medio; tú pruebas y marcas good/bad
# ~10 pasos para hallar al culpable entre 1000 commits`,
          },
        },
      },
      questions: [
        {
          kind: 'order',
          id: 'dbg-1',
          prompt: {
            en: 'Put a systematic debugging session in order.',
            es: 'Ordena una sesión de depuración sistemática.',
          },
          items: [
            { en: 'Reproduce the bug reliably', es: 'Reproduce el bug de forma fiable' },
            { en: 'Read the error and stack trace', es: 'Lee el error y la traza de pila' },
            {
              en: 'Form one hypothesis about the cause',
              es: 'Formula una hipótesis sobre la causa',
            },
            {
              en: 'Test the hypothesis by changing one thing',
              es: 'Pon a prueba la hipótesis cambiando una sola cosa',
            },
            {
              en: 'Verify the fix against the original reproduction',
              es: 'Verifica el arreglo contra la reproducción original',
            },
          ],
          explanation: {
            en: 'Reproduction comes first: without it you cannot tell a fix from a coincidence. And it comes last too — re-running the original case is the only proof the bug is actually gone.',
            es: 'La reproducción va primero: sin ella no distingues un arreglo de una casualidad. Y va también al final: repetir el caso original es la única prueba de que el bug se ha ido de verdad.',
          },
        },
        {
          kind: 'choice',
          id: 'dbg-2',
          prompt: { en: 'What does `git bisect` do?', es: '¿Qué hace `git bisect`?' },
          choices: [
            { en: 'Splits a commit into two', es: 'Divide un commit en dos' },
            {
              en: 'Binary-searches commit history to find the one that introduced a bug',
              es: 'Hace búsqueda binaria en el historial para hallar el commit que introdujo un bug',
            },
            { en: 'Reverts the last commit', es: 'Revierte el último commit' },
            { en: 'Compares two branches', es: 'Compara dos ramas' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'You mark a known-good and known-bad commit; git checks out the midpoint and repeats. It finds the culprit among 1,000 commits in about 10 steps instead of 1,000.',
            es: 'Marcas un commit bueno conocido y uno malo conocido; git salta al punto medio y repite. Encuentra al culpable entre 1.000 commits en unos 10 pasos en vez de 1.000.',
          },
        },
        {
          kind: 'boolean',
          id: 'dbg-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'When stuck, changing several things at once helps you find the bug faster.',
            es: 'Cuando te atascas, cambiar varias cosas a la vez te ayuda a encontrar el bug más rápido.',
          },
          answer: false,
          explanation: {
            en: 'If it starts working you have no idea which change did it — and you may have introduced a second bug that cancels the first. One variable at a time is slower per step and far faster overall.',
            es: 'Si empieza a funcionar no tienes ni idea de qué cambio lo consiguió, y puede que hayas metido un segundo bug que cancela al primero. Una variable cada vez es más lento por paso y muchísimo más rápido en total.',
          },
        },
        {
          kind: 'choice',
          id: 'dbg-4',
          prompt: {
            en: 'A bug appears only in production, never locally. What should you suspect FIRST?',
            es: 'Un bug solo aparece en producción, nunca en local. ¿De qué deberías sospechar PRIMERO?',
          },
          choices: [
            { en: 'A compiler bug', es: 'Un bug del compilador' },
            {
              en: 'Differences in data, config, environment variables or scale',
              es: 'Diferencias de datos, configuración, variables de entorno o escala',
            },
            { en: 'A hardware fault', es: 'Un fallo de hardware' },
            { en: 'The framework version', es: 'La versión del framework' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Production has real data with real edge cases, different config, and concurrency your laptop never sees. Nine times in ten it is one of those — not the code itself behaving differently.',
            es: 'Producción tiene datos reales con casos límite reales, otra configuración y una concurrencia que tu portátil nunca ve. Nueve de cada diez veces es una de esas cosas, no que el código se comporte distinto.',
          },
        },
        {
          kind: 'choice',
          id: 'dbg-5',
          prompt: {
            en: 'In a long stack trace, which frame is usually most useful?',
            es: 'En una traza de pila larga, ¿qué marco suele ser el más útil?',
          },
          choices: [
            { en: 'The very first line', es: 'La primerísima línea' },
            {
              en: 'The topmost frame that is in your own code',
              es: 'El marco más alto que pertenece a tu propio código',
            },
            { en: 'The last line', es: 'La última línea' },
            { en: 'Any framework frame', es: 'Cualquier marco del framework' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The top frames are often deep inside library code that is working correctly with bad input. The highest frame you actually wrote is where the wrong value was passed in — that is your starting point.',
            es: 'Los marcos de arriba suelen estar dentro de código de librería que funciona bien con una entrada mala. El marco más alto que escribiste tú es donde se pasó el valor incorrecto: ese es tu punto de partida.',
          },
        },
      ],
    },
  ],
}
