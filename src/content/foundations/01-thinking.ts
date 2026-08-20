import type { Section } from '../types'

export const thinking: Section = {
  id: 'thinking',
  title: { en: 'How a computer thinks', es: 'Cómo piensa una computadora' },
  subtitle: {
    en: 'The mental model everything else is built on.',
    es: 'El modelo mental sobre el que se apoya todo lo demás.',
  },
  units: [
    {
      id: 'data-structures',
      title: { en: 'Data structures', es: 'Estructuras de datos' },
      icon: '🧱',
      summary: {
        en: 'Choosing the right container is the cheapest performance win there is.',
        es: 'Elegir el contenedor correcto es la mejora de rendimiento más barata que existe.',
      },
      concept: {
        headline: {
          en: 'A data structure is a trade: fast at one thing, slow at another.',
          es: 'Una estructura de datos es un trato: rápida en una cosa, lenta en otra.',
        },
        body: [
          {
            en: 'Every structure makes some operations cheap by making others expensive. An array is brilliant at "give me item 500" and terrible at "does this contain X?". A hash map is the reverse.',
            es: 'Cada estructura abarata unas operaciones encareciendo otras. Un array es buenísimo para "dame el elemento 500" y pésimo para "¿esto contiene X?". Un hash map es justo al revés.',
          },
          {
            en: 'Most real performance problems are not clever algorithms — they are the wrong container. Picking correctly is the difference between a loop that runs 20 times and one that runs 20 million.',
            es: 'La mayoría de los problemas reales de rendimiento no se resuelven con algoritmos ingeniosos: son el contenedor equivocado. Elegir bien es la diferencia entre un bucle que da 20 vueltas y uno que da 20 millones.',
          },
        ],
        keyPoints: [
          {
            en: 'Array — instant access by position, slow to search, slow to insert in the middle.',
            es: 'Array — acceso instantáneo por posición, lento para buscar, lento para insertar en medio.',
          },
          {
            en: 'Hash map — instant lookup by key, no order.',
            es: 'Hash map — búsqueda instantánea por clave, sin orden.',
          },
          {
            en: 'Set — like a hash map with no values: membership tests, automatic de-duplication.',
            es: 'Set — como un hash map sin valores: comprobar pertenencia y eliminar duplicados solo.',
          },
          {
            en: 'Stack (last in, first out) and queue (first in, first out) — order is the whole point.',
            es: 'Pila (último en entrar, primero en salir) y cola (primero en entrar, primero en salir) — el orden lo es todo.',
          },
        ],
        example: {
          caption: {
            en: 'The same job, two containers',
            es: 'El mismo trabajo, dos contenedores',
          },
          code: {
            en: `// O(n) — scans the list on every check
const ids = [1, 2, 3, /* ...100k more */]
ids.includes(99999)

// O(1) — hashes the key straight to its slot
const idSet = new Set(ids)
idSet.has(99999)`,
            es: `// O(n) — recorre la lista en cada comprobación
const ids = [1, 2, 3, /* ...100k más */]
ids.includes(99999)

// O(1) — la clave va directa a su posición
const idSet = new Set(ids)
idSet.has(99999)`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'ds-1',
          prompt: {
            en: 'You need to check "have I already seen this user ID?" a million times. What do you use?',
            es: 'Necesitas comprobar "¿ya vi este ID de usuario?" un millón de veces. ¿Qué usas?',
          },
          choices: [
            { en: 'An array with .includes()', es: 'Un array con .includes()' },
            { en: 'A Set', es: 'Un Set' },
            { en: 'A sorted array', es: 'Un array ordenado' },
            { en: 'A linked list', es: 'Una lista enlazada' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A Set hashes the value straight to a slot, so each check costs the same no matter how many items you have stored. `.includes()` on an array walks the whole list every single time — a million checks over a million items is a trillion comparisons.',
            es: 'Un Set lleva el valor directo a su posición, así que cada comprobación cuesta lo mismo sin importar cuántos elementos guardes. `.includes()` sobre un array recorre la lista entera cada vez: un millón de comprobaciones sobre un millón de elementos son un billón de comparaciones.',
          },
        },
        {
          kind: 'choice',
          id: 'ds-2',
          prompt: {
            en: 'Which operation is SLOW on an array?',
            es: '¿Qué operación es LENTA en un array?',
          },
          choices: [
            { en: 'Reading items[500]', es: 'Leer items[500]' },
            { en: 'Adding to the end', es: 'Añadir al final' },
            { en: 'Inserting at the beginning', es: 'Insertar al principio' },
            { en: 'Reading the length', es: 'Leer la longitud' },
          ],
          answerIndex: 2,
          explanation: {
            en: 'Inserting at the front means every other element has to shift one position to the right. Reading by index is instant because the computer can calculate exactly where that slot lives in memory.',
            es: 'Insertar al principio obliga a desplazar todos los demás elementos una posición a la derecha. Leer por índice es instantáneo porque la computadora calcula exactamente dónde vive esa posición en memoria.',
          },
        },
        {
          kind: 'boolean',
          id: 'ds-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A hash map guarantees the order of its keys matches insertion order.',
            es: 'Un hash map garantiza que el orden de sus claves coincide con el orden de inserción.',
          },
          answer: false,
          explanation: {
            en: 'In general, no — a hash map scatters keys across buckets by their hash, and order is not part of the contract. (JavaScript objects and Map happen to preserve insertion order, but relying on that in other languages will bite you.)',
            es: 'En general no: un hash map reparte las claves entre cubetas según su hash, y el orden no forma parte del contrato. (Los objetos y Map de JavaScript sí conservan el orden de inserción, pero confiar en eso en otros lenguajes te va a costar caro.)',
          },
        },
        {
          kind: 'choice',
          id: 'ds-4',
          prompt: {
            en: 'The browser back button is a textbook use of which structure?',
            es: 'El botón "atrás" del navegador es el ejemplo de libro de qué estructura?',
          },
          choices: [
            { en: 'Queue', es: 'Cola' },
            { en: 'Stack', es: 'Pila' },
            { en: 'Hash map', es: 'Hash map' },
            { en: 'Tree', es: 'Árbol' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A stack: last in, first out. The last page you visited is the first one you go back to. A queue would take you to the very first page you ever opened.',
            es: 'Una pila: el último en entrar es el primero en salir. La última página que visitaste es la primera a la que vuelves. Una cola te llevaría a la primerísima página que abriste.',
          },
        },
        {
          kind: 'choice',
          id: 'ds-5',
          prompt: {
            en: 'Why is a linked list better than an array for frequent insertions in the middle?',
            es: '¿Por qué una lista enlazada es mejor que un array para insertar a menudo en medio?',
          },
          choices: [
            { en: 'It uses less memory', es: 'Usa menos memoria' },
            {
              en: 'Inserting only rewires two pointers instead of shifting every element',
              es: 'Insertar solo recoloca dos punteros en lugar de desplazar todos los elementos',
            },
            { en: 'It can be searched faster', es: 'Se puede buscar más rápido' },
            { en: 'It supports index access', es: 'Permite acceso por índice' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Once you are holding the right node, insertion is just repointing two links. The catch: *finding* that node takes a walk from the start, so a linked list loses badly whenever you need access by position.',
            es: 'Una vez tienes el nodo correcto, insertar es solo reapuntar dos enlaces. El truco está en que *encontrar* ese nodo obliga a recorrer desde el principio, así que la lista enlazada pierde por goleada cuando necesitas acceso por posición.',
          },
        },
        {
          kind: 'gap',
          id: 'ds-6',
          prompt: {
            en: 'Complete the line so the lookup becomes O(1).',
            es: 'Completa la línea para que la búsqueda sea O(1).',
          },
          code: {
            en: `const ids = [1, 2, 3 /* ...100k more */]
const lookup = new ___(ids)
lookup.has(99999)`,
            es: `const ids = [1, 2, 3 /* ...100k más */]
const lookup = new ___(ids)
lookup.has(99999)`,
          },
          choices: ['Set', 'Array', 'WeakRef', 'Object'],
          answerIndex: 0,
          explanation: {
            en: 'A Set hashes each value to a slot, so `has` costs the same at 10 items or 10 million. An Array would send you back to a linear scan.',
            es: 'Un Set lleva cada valor a una posición por hash, así que `has` cuesta lo mismo con 10 elementos que con 10 millones. Un Array te devolvería al recorrido lineal.',
          },
        },
      ],
    },
    {
      id: 'big-o',
      title: { en: 'Big-O & complexity', es: 'Big-O y complejidad' },
      icon: '📈',
      summary: {
        en: 'Read a loop and know what it will cost at a million rows.',
        es: 'Lee un bucle y sabe lo que costará con un millón de filas.',
      },
      concept: {
        headline: {
          en: 'Big-O answers one question: what happens when the input gets 10× bigger?',
          es: 'Big-O responde a una sola pregunta: ¿qué pasa cuando la entrada crece 10 veces?',
        },
        body: [
          {
            en: 'Big-O is not about seconds. It describes the *shape* of the growth curve — how the work scales as the input grows. Constants and small details are dropped on purpose, because at scale they stop mattering.',
            es: 'Big-O no habla de segundos. Describe la *forma* de la curva de crecimiento: cómo escala el trabajo cuando crece la entrada. Las constantes y los detalles pequeños se descartan a propósito, porque a gran escala dejan de importar.',
          },
          {
            en: 'The practical value: you can look at code and predict whether it will still work at a million records, without ever running it.',
            es: 'El valor práctico: puedes mirar el código y predecir si seguirá funcionando con un millón de registros, sin llegar a ejecutarlo.',
          },
        ],
        keyPoints: [
          {
            en: 'O(1) constant — same cost regardless of size. Hash lookup, array index.',
            es: 'O(1) constante — el mismo coste sin importar el tamaño. Búsqueda por hash, índice de array.',
          },
          {
            en: 'O(log n) — halves the problem each step. Binary search, balanced tree lookup.',
            es: 'O(log n) — parte el problema por la mitad en cada paso. Búsqueda binaria, árbol balanceado.',
          },
          {
            en: 'O(n) linear — touches everything once. A single loop.',
            es: 'O(n) lineal — toca todo una vez. Un solo bucle.',
          },
          {
            en: 'O(n log n) — the best a general-purpose sort can do.',
            es: 'O(n log n) — lo mejor que puede hacer una ordenación de propósito general.',
          },
          {
            en: 'O(n²) — nested loops over the same data. Fine at 100, fatal at 100,000.',
            es: 'O(n²) — bucles anidados sobre los mismos datos. Aceptable con 100, mortal con 100.000.',
          },
        ],
        example: {
          caption: { en: 'At n = 1,000,000', es: 'Con n = 1.000.000' },
          code: {
            en: `O(1)        1 step
O(log n)    20 steps
O(n)        1,000,000 steps
O(n log n)  20,000,000 steps
O(n²)       1,000,000,000,000 steps   <- this is the one that pages you at 3am`,
            es: `O(1)        1 paso
O(log n)    20 pasos
O(n)        1.000.000 pasos
O(n log n)  20.000.000 pasos
O(n²)       1.000.000.000.000 pasos   <- esta es la que te despierta a las 3am`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'bigo-1',
          prompt: {
            en: 'What is the time complexity of this function?',
            es: '¿Cuál es la complejidad temporal de esta función?',
          },
          code: `function sum(numbers) {
  let total = 0
  for (const n of numbers) total += n
  return total
}`,
          choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
          answerIndex: 2,
          explanation: {
            en: 'The loop touches every element exactly once, so the work grows in step with the input size — that is linear, O(n).',
            es: 'El bucle toca cada elemento exactamente una vez, así que el trabajo crece al mismo ritmo que la entrada: eso es lineal, O(n).',
          },
        },
        {
          kind: 'choice',
          id: 'bigo-2',
          prompt: {
            en: 'Two nested loops over the same array of length n cost…',
            es: 'Dos bucles anidados sobre el mismo array de longitud n cuestan…',
          },
          code: `for (const a of items)
  for (const b of items)
    compare(a, b)`,
          choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
          answerIndex: 2,
          explanation: {
            en: 'The inner loop runs n times for each of the n outer iterations: n × n comparisons. At 1,000 items that is a million — at 100,000 items it is ten billion.',
            es: 'El bucle interno se ejecuta n veces por cada una de las n iteraciones externas: n × n comparaciones. Con 1.000 elementos son un millón; con 100.000, diez mil millones.',
          },
        },
        {
          kind: 'boolean',
          id: 'bigo-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'An O(n²) algorithm is always slower than an O(n) one.',
            es: 'Un algoritmo O(n²) siempre es más lento que uno O(n).',
          },
          answer: false,
          explanation: {
            en: 'Only for large inputs. Big-O ignores constants, so an O(n²) algorithm with tiny overhead can beat an O(n) one with heavy setup — which is exactly why sort implementations switch to insertion sort for small arrays.',
            es: 'Solo con entradas grandes. Big-O ignora las constantes, así que un algoritmo O(n²) con poca sobrecarga puede ganar a uno O(n) con mucha preparación: por eso las implementaciones de ordenación cambian a insertion sort con arrays pequeños.',
          },
        },
        {
          kind: 'choice',
          id: 'bigo-4',
          prompt: { en: 'Which operation is O(log n)?', es: '¿Qué operación es O(log n)?' },
          choices: [
            { en: 'Printing every item in a list', es: 'Imprimir todos los elementos de una lista' },
            { en: 'Binary search in a sorted array', es: 'Búsqueda binaria en un array ordenado' },
            { en: 'Copying an array', es: 'Copiar un array' },
            {
              en: 'Finding the maximum of an unsorted list',
              es: 'Encontrar el máximo de una lista sin ordenar',
            },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Binary search throws away half the remaining data at every step. Halving a million takes about 20 steps. The other three must visit every element at least once.',
            es: 'La búsqueda binaria descarta la mitad de los datos restantes en cada paso. Partir un millón por la mitad lleva unos 20 pasos. Las otras tres tienen que visitar cada elemento al menos una vez.',
          },
        },
        {
          kind: 'choice',
          id: 'bigo-5',
          prompt: {
            en: 'What is the SPACE complexity of this function?',
            es: '¿Cuál es la complejidad ESPACIAL de esta función?',
          },
          code: `function double(items) {
  const out = []
  for (const n of items) out.push(n * 2)
  return out
}`,
          choices: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
          answerIndex: 1,
          explanation: {
            en: 'It allocates a new array the same size as the input, so memory grows linearly with n. Doubling the items in place would have been O(1) extra space.',
            es: 'Reserva un array nuevo del mismo tamaño que la entrada, así que la memoria crece linealmente con n. Duplicar los elementos in situ habría sido O(1) de espacio extra.',
          },
        },
      ],
    },
    {
      id: 'algorithms',
      title: { en: 'Algorithms', es: 'Algoritmos' },
      icon: '🔍',
      summary: {
        en: 'Search, sort and recursion — the patterns behind most interview questions.',
        es: 'Búsqueda, ordenación y recursión: los patrones detrás de casi toda entrevista técnica.',
      },
      concept: {
        headline: {
          en: 'Almost every fast algorithm works by throwing away work.',
          es: 'Casi todo algoritmo rápido funciona descartando trabajo.',
        },
        body: [
          {
            en: 'Binary search discards half the data per step. Merge sort splits the problem in two, solves each half, and merges. Both are the same idea: divide and conquer.',
            es: 'La búsqueda binaria descarta la mitad de los datos en cada paso. Merge sort parte el problema en dos, resuelve cada mitad y las combina. Ambos son la misma idea: divide y vencerás.',
          },
          {
            en: 'Recursion is the code shape that expresses this. A recursive function needs exactly two things — a base case that stops it, and a step that makes the problem smaller.',
            es: 'La recursión es la forma de código que lo expresa. Una función recursiva necesita exactamente dos cosas: un caso base que la detenga y un paso que haga el problema más pequeño.',
          },
        ],
        keyPoints: [
          {
            en: 'Binary search needs sorted data. Without sorting, it is simply wrong.',
            es: 'La búsqueda binaria necesita datos ordenados. Sin ordenar, es sencillamente incorrecta.',
          },
          {
            en: 'Comparison sorts cannot beat O(n log n). That is a proven floor, not a missing optimisation.',
            es: 'Las ordenaciones por comparación no pueden bajar de O(n log n). Es un límite demostrado, no una optimización pendiente.',
          },
          {
            en: 'Every recursion needs a base case, or you get a stack overflow.',
            es: 'Toda recursión necesita un caso base, o tendrás un desbordamiento de pila.',
          },
          {
            en: 'Recursion and iteration are interchangeable — recursion trades stack memory for readability.',
            es: 'Recursión e iteración son intercambiables: la recursión cambia memoria de pila por legibilidad.',
          },
        ],
        example: {
          caption: {
            en: 'Binary search: 1,000,000 items in ~20 steps',
            es: 'Búsqueda binaria: 1.000.000 de elementos en ~20 pasos',
          },
          code: `function search(sorted, target) {
  let lo = 0, hi = sorted.length - 1
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (sorted[mid] === target) return mid
    if (sorted[mid] < target) lo = mid + 1
    else hi = mid - 1
  }
  return -1
}`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'algo-1',
          prompt: {
            en: 'Binary search returns the wrong answer on your data. What is the most likely cause?',
            es: 'La búsqueda binaria devuelve un resultado incorrecto sobre tus datos. ¿Cuál es la causa más probable?',
          },
          choices: [
            { en: 'The array is too large', es: 'El array es demasiado grande' },
            { en: 'The array is not sorted', es: 'El array no está ordenado' },
            { en: 'The target does not exist', es: 'El valor buscado no existe' },
            { en: 'The array contains duplicates', es: 'El array contiene duplicados' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Binary search assumes that everything left of the midpoint is smaller and everything right is bigger. On unsorted data that assumption is false, so it confidently discards the half containing your answer.',
            es: 'La búsqueda binaria asume que todo lo que está a la izquierda del punto medio es menor y todo lo de la derecha, mayor. Con datos sin ordenar esa suposición es falsa, así que descarta con total seguridad la mitad que contenía tu respuesta.',
          },
        },
        {
          kind: 'gap',
          id: 'algo-2',
          prompt: {
            en: 'Complete the base case so this recursion terminates.',
            es: 'Completa el caso base para que esta recursión termine.',
          },
          code: `function factorial(n) {
  if (___) return 1
  return n * factorial(n - 1)
}`,
          choices: ['n <= 1', 'n > 1', 'n === 0 || n > 100', 'false'],
          answerIndex: 0,
          explanation: {
            en: 'The recursion shrinks n by one each call, so it must stop when n reaches 1. Without that base case it would call factorial(0), factorial(-1)… until the call stack overflows.',
            es: 'La recursión reduce n en uno con cada llamada, así que debe parar cuando n llega a 1. Sin ese caso base llamaría a factorial(0), factorial(-1)… hasta desbordar la pila de llamadas.',
          },
        },
        {
          kind: 'choice',
          id: 'algo-3',
          prompt: {
            en: 'What is the best possible average complexity for a general-purpose comparison sort?',
            es: '¿Cuál es la mejor complejidad media posible para una ordenación por comparación de propósito general?',
          },
          choices: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
          answerIndex: 1,
          explanation: {
            en: 'O(n log n) is a proven mathematical floor for sorting by comparison. Sorts that beat it (counting sort, radix sort) do so by not comparing at all — they exploit knowing the shape of the data.',
            es: 'O(n log n) es un límite matemático demostrado para ordenar por comparación. Las ordenaciones que lo superan (counting sort, radix sort) lo hacen sin comparar: aprovechan conocer la forma de los datos.',
          },
        },
        {
          kind: 'boolean',
          id: 'algo-4',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Any recursive function can be rewritten using a loop.',
            es: 'Cualquier función recursiva se puede reescribir con un bucle.',
          },
          answer: true,
          explanation: {
            en: 'Yes — you replace the implicit call stack with an explicit one. It is often uglier, but it avoids stack-overflow limits, which is why deep recursions get converted in production code.',
            es: 'Sí: sustituyes la pila de llamadas implícita por una explícita. Suele quedar más feo, pero evita el límite de desbordamiento de pila, y por eso las recursiones profundas se convierten en código de producción.',
          },
        },
        {
          kind: 'order',
          id: 'algo-5',
          prompt: {
            en: 'Put the steps of merge sort in order.',
            es: 'Ordena los pasos de merge sort.',
          },
          items: [
            { en: 'Split the array in half', es: 'Parte el array por la mitad' },
            {
              en: 'Keep splitting until each piece has one element',
              es: 'Sigue partiendo hasta que cada trozo tenga un elemento',
            },
            {
              en: 'Merge pairs of pieces back together in sorted order',
              es: 'Combina los trozos por parejas en orden',
            },
            {
              en: 'Repeat merging until one sorted array remains',
              es: 'Repite la combinación hasta que quede un único array ordenado',
            },
          ],
          explanation: {
            en: 'Merge sort is divide-and-conquer: break the problem down to trivial pieces (a single element is sorted by definition), then do the real work on the way back up while merging.',
            es: 'Merge sort es divide y vencerás: descompón el problema hasta trozos triviales (un solo elemento ya está ordenado por definición) y haz el trabajo de verdad en la subida, al combinar.',
          },
        },
      ],
    },
    {
      id: 'memory',
      title: { en: 'Memory & references', es: 'Memoria y referencias' },
      icon: '🧠',
      summary: {
        en: 'The source of the weirdest bugs you will ever debug.',
        es: 'El origen de los bugs más raros que vas a depurar.',
      },
      concept: {
        headline: {
          en: 'Some variables hold a value. Others hold an address.',
          es: 'Unas variables guardan un valor. Otras guardan una dirección.',
        },
        body: [
          {
            en: 'Primitives — numbers, booleans, strings — are copied when you assign them. Objects and arrays are not: you copy the *reference*, and both names now point at the same thing in memory.',
            es: 'Los primitivos —números, booleanos, cadenas— se copian al asignarlos. Los objetos y arrays no: copias la *referencia*, y ahora los dos nombres apuntan a lo mismo en memoria.',
          },
          {
            en: 'This is why changing one variable can mysteriously change another. It is not a language quirk; it is how memory works, and every language has a version of it.',
            es: 'Por eso cambiar una variable puede cambiar otra misteriosamente. No es una rareza del lenguaje: así funciona la memoria, y todos los lenguajes tienen su versión de esto.',
          },
        ],
        keyPoints: [
          {
            en: 'Assigning an object copies the pointer, not the contents.',
            es: 'Asignar un objeto copia el puntero, no el contenido.',
          },
          {
            en: 'A shallow copy duplicates the top level only — nested objects are still shared.',
            es: 'Una copia superficial duplica solo el primer nivel: los objetos anidados se siguen compartiendo.',
          },
          {
            en: 'The stack is small and fast (local variables); the heap is large (objects) and needs cleaning up.',
            es: 'La pila es pequeña y rápida (variables locales); el heap es grande (objetos) y hay que limpiarlo.',
          },
          {
            en: 'A garbage collector frees what nothing points to any more — it cannot free what you still reference.',
            es: 'El recolector de basura libera lo que ya nadie apunta: no puede liberar lo que sigues referenciando.',
          },
        ],
        example: {
          caption: {
            en: 'The classic shared-reference bug',
            es: 'El bug clásico de referencia compartida',
          },
          code: {
            en: `const a = { count: 1 }
const b = a          // copies the reference, not the object
b.count = 99
console.log(a.count) // 99 — same object

const c = { ...a }   // shallow copy: now independent
c.count = 5
console.log(a.count) // 99`,
            es: `const a = { count: 1 }
const b = a          // copia la referencia, no el objeto
b.count = 99
console.log(a.count) // 99 — el mismo objeto

const c = { ...a }   // copia superficial: ya es independiente
c.count = 5
console.log(a.count) // 99`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'mem-1',
          prompt: { en: 'What does this print?', es: '¿Qué imprime esto?' },
          code: `const original = { items: [1, 2] }
const copy = { ...original }
copy.items.push(3)
console.log(original.items.length)`,
          choices: ['2', '3', '0', { en: 'It throws an error', es: 'Lanza un error' }],
          answerIndex: 1,
          explanation: {
            en: 'The spread makes a SHALLOW copy: `copy.items` and `original.items` are still the same array. To break the link you need a deep copy — e.g. `structuredClone(original)`.',
            es: 'El spread hace una copia SUPERFICIAL: `copy.items` y `original.items` siguen siendo el mismo array. Para romper el vínculo necesitas una copia profunda, por ejemplo `structuredClone(original)`.',
          },
        },
        {
          kind: 'boolean',
          id: 'mem-2',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Passing an object to a function lets that function modify the caller’s object.',
            es: 'Pasar un objeto a una función permite que esa función modifique el objeto de quien la llamó.',
          },
          answer: true,
          explanation: {
            en: 'The function receives a copy of the *reference*, so it points at the same object. Mutating properties inside the function is visible outside — a very common source of surprise bugs.',
            es: 'La función recibe una copia de la *referencia*, así que apunta al mismo objeto. Mutar propiedades dentro de la función se ve desde fuera: una fuente muy común de bugs inesperados.',
          },
        },
        {
          kind: 'choice',
          id: 'mem-3',
          prompt: {
            en: 'A memory leak in a garbage-collected language means…',
            es: 'Una fuga de memoria en un lenguaje con recolector de basura significa…',
          },
          choices: [
            { en: 'The garbage collector is broken', es: 'El recolector de basura está roto' },
            {
              en: 'Something is still holding a reference to data you no longer need',
              es: 'Algo sigue guardando una referencia a datos que ya no necesitas',
            },
            { en: 'You forgot to call free()', es: 'Olvidaste llamar a free()' },
            { en: 'The heap is too small', es: 'El heap es demasiado pequeño' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A GC only frees what is unreachable. A forgotten event listener, a growing cache, or a closure holding a big object all keep data alive — the collector is working exactly as designed.',
            es: 'El recolector solo libera lo inalcanzable. Un listener olvidado, una caché que crece o un closure que retiene un objeto grande mantienen los datos vivos: el recolector está haciendo exactamente lo que debe.',
          },
        },
        {
          kind: 'choice',
          id: 'mem-4',
          prompt: {
            en: 'Why does very deep recursion cause a "stack overflow"?',
            es: '¿Por qué una recursión muy profunda provoca un "stack overflow"?',
          },
          choices: [
            { en: 'The heap runs out of space', es: 'El heap se queda sin espacio' },
            {
              en: 'Each call adds a frame to a fixed-size call stack',
              es: 'Cada llamada añade un marco a una pila de llamadas de tamaño fijo',
            },
            {
              en: 'The garbage collector cannot keep up',
              es: 'El recolector de basura no da abasto',
            },
            { en: 'The CPU cache fills up', es: 'La caché de la CPU se llena' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Every call pushes a frame holding its local variables and return address. The stack has a hard size limit (often a few megabytes), so a few tens of thousands of nested calls is enough to exhaust it.',
            es: 'Cada llamada apila un marco con sus variables locales y la dirección de retorno. La pila tiene un límite estricto (a menudo unos pocos megabytes), así que unas decenas de miles de llamadas anidadas bastan para agotarla.',
          },
        },
        {
          kind: 'choice',
          id: 'mem-5',
          prompt: { en: 'Which comparison is TRUE?', es: '¿Qué comparación es VERDADERA?' },
          code: `const x = { id: 1 }
const y = { id: 1 }
const z = x`,
          choices: ['x === y', 'x === z', { en: 'Both', es: 'Ambas' }, { en: 'Neither', es: 'Ninguna' }],
          answerIndex: 1,
          explanation: {
            en: '`===` on objects compares identity, not contents. `x` and `y` are two different objects that happen to look alike; `z` is the same object as `x`.',
            es: '`===` sobre objetos compara identidad, no contenido. `x` e `y` son dos objetos distintos que casualmente se parecen; `z` es el mismo objeto que `x`.',
          },
        },
        {
          kind: 'gap',
          id: 'mem-6',
          prompt: {
            en: 'Complete the line so the copy is fully independent of the original.',
            es: 'Completa la línea para que la copia sea totalmente independiente del original.',
          },
          code: {
            en: `const original = { user: { name: 'Ada' } }
const copy = ___(original)
copy.user.name = 'Grace'   // original must not change`,
            es: `const original = { user: { name: 'Ada' } }
const copy = ___(original)
copy.user.name = 'Grace'   // original no debe cambiar`,
          },
          choices: ['structuredClone', '{ ...original }', 'Object.assign', 'JSON.stringify'],
          answerIndex: 0,
          explanation: {
            en: '`structuredClone` performs a DEEP copy. Spread and Object.assign copy only the top level, so `copy.user` would still be the very same nested object.',
            es: '`structuredClone` hace una copia PROFUNDA. El spread y Object.assign copian solo el primer nivel, así que `copy.user` seguiría siendo exactamente el mismo objeto anidado.',
          },
        },
      ],
    },
    {
      id: 'representation',
      title: { en: 'How data is represented', es: 'Cómo se representan los datos' },
      icon: '🔢',
      summary: {
        en: 'Why 0.1 + 0.2 is not 0.3, and other things that break in production.',
        es: 'Por qué 0.1 + 0.2 no es 0.3, y otras cosas que se rompen en producción.',
      },
      concept: {
        headline: {
          en: 'Everything is bits, and bits are finite. That is where the bugs come from.',
          es: 'Todo son bits, y los bits son finitos. De ahí salen los bugs.',
        },
        body: [
          {
            en: 'Numbers, text, dates and colours are all stored as fixed-size patterns of bits. Fixed size means limits — and limits mean overflow, rounding, and truncation.',
            es: 'Números, texto, fechas y colores se guardan como patrones de bits de tamaño fijo. Tamaño fijo significa límites, y los límites significan desbordamiento, redondeo y truncamiento.',
          },
          {
            en: 'These are not obscure edge cases. Floating-point rounding has caused real financial losses, and timezone handling is one of the most reliably broken parts of any system.',
            es: 'No son casos raros de laboratorio. El redondeo en coma flotante ha causado pérdidas económicas reales, y el manejo de zonas horarias es una de las partes que más fiablemente se rompe en cualquier sistema.',
          },
        ],
        keyPoints: [
          {
            en: 'Floats cannot represent 0.1 exactly, so 0.1 + 0.2 === 0.3 is false. Never store money as a float — use integer cents.',
            es: 'Los floats no representan 0.1 exactamente, así que 0.1 + 0.2 === 0.3 es falso. Nunca guardes dinero como float: usa céntimos enteros.',
          },
          {
            en: 'Integers have a maximum. Exceeding it wraps around or loses precision.',
            es: 'Los enteros tienen un máximo. Superarlo da la vuelta al contador o pierde precisión.',
          },
          {
            en: 'UTF-8 means one character is not one byte — emoji and accents take several.',
            es: 'En UTF-8 un carácter no es un byte: los emoji y los acentos ocupan varios.',
          },
          {
            en: 'Always store timestamps in UTC. Convert to local time only for display.',
            es: 'Guarda siempre las marcas de tiempo en UTC. Convierte a hora local solo para mostrarlas.',
          },
        ],
        example: {
          caption: {
            en: 'The one every developer meets eventually',
            es: 'El que todo desarrollador acaba encontrando',
          },
          code: {
            en: `0.1 + 0.2          // 0.30000000000000004
0.1 + 0.2 === 0.3  // false

// Money, done right: work in the smallest unit
const priceCents = 1999      // €19.99
const totalCents = priceCents * 3`,
            es: `0.1 + 0.2          // 0.30000000000000004
0.1 + 0.2 === 0.3  // false

// Dinero, bien hecho: trabaja en la unidad más pequeña
const priceCents = 1999      // 19,99 €
const totalCents = priceCents * 3`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'rep-1',
          prompt: {
            en: 'Why is `0.1 + 0.2 === 0.3` false?',
            es: '¿Por qué `0.1 + 0.2 === 0.3` es falso?',
          },
          choices: [
            { en: 'A bug in JavaScript', es: 'Un bug de JavaScript' },
            {
              en: 'Binary floating point cannot represent 0.1 exactly',
              es: 'La coma flotante binaria no puede representar 0.1 exactamente',
            },
            { en: 'The numbers are too large', es: 'Los números son demasiado grandes' },
            { en: 'Because === is too strict', es: 'Porque === es demasiado estricto' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'In binary, 0.1 is a repeating fraction — just like 1/3 is 0.333… in decimal. It gets rounded to the nearest representable value, and the tiny errors add up. Every language using IEEE 754 floats behaves this way.',
            es: 'En binario, 0.1 es una fracción periódica, igual que 1/3 es 0,333… en decimal. Se redondea al valor representable más cercano y los errores diminutos se acumulan. Todos los lenguajes que usan floats IEEE 754 se comportan así.',
          },
        },
        {
          kind: 'choice',
          id: 'rep-2',
          prompt: {
            en: 'How should you store a price of €19.99 in a database?',
            es: '¿Cómo deberías guardar un precio de 19,99 € en una base de datos?',
          },
          choices: [
            { en: 'As a float: 19.99', es: 'Como float: 19.99' },
            { en: 'As an integer of cents: 1999', es: 'Como entero de céntimos: 1999' },
            { en: 'As a string: "19.99"', es: 'Como cadena: "19.99"' },
            { en: 'As a double for extra precision', es: 'Como double para más precisión' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Integer cents (or a DECIMAL column) keeps arithmetic exact. Floats accumulate rounding errors, and after a million transactions those cents are a real, auditable discrepancy.',
            es: 'Los céntimos enteros (o una columna DECIMAL) mantienen la aritmética exacta. Los floats acumulan errores de redondeo, y tras un millón de transacciones esos céntimos son un descuadre real y auditable.',
          },
        },
        {
          kind: 'boolean',
          id: 'rep-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'In UTF-8, every character takes exactly one byte.',
            es: 'En UTF-8, cada carácter ocupa exactamente un byte.',
          },
          answer: false,
          explanation: {
            en: 'UTF-8 is variable width: ASCII takes 1 byte, accented Latin letters 2, most CJK characters 3, and emoji 4. This is why naive byte-slicing can cut a character in half and produce garbage.',
            es: 'UTF-8 es de ancho variable: ASCII ocupa 1 byte, las letras latinas con acento 2, la mayoría de caracteres CJK 3 y los emoji 4. Por eso cortar por bytes a lo bruto puede partir un carácter por la mitad y producir basura.',
          },
        },
        {
          kind: 'choice',
          id: 'rep-4',
          prompt: {
            en: 'What is the safest way to store a "created at" timestamp?',
            es: '¿Cuál es la forma más segura de guardar una marca de tiempo "creado el"?',
          },
          choices: [
            { en: 'Local time with no timezone', es: 'Hora local sin zona horaria' },
            {
              en: 'UTC, converting to local time only when displaying',
              es: 'UTC, convirtiendo a hora local solo al mostrarla',
            },
            {
              en: 'A formatted string like "20/08/2026"',
              es: 'Una cadena con formato tipo "20/08/2026"',
            },
            { en: 'Unix time in the user’s timezone', es: 'Tiempo Unix en la zona del usuario' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'UTC has no daylight-saving jumps and no ambiguity. Store UTC, display local. Storing local time means that twice a year an hour is either duplicated or does not exist.',
            es: 'UTC no tiene saltos de horario de verano ni ambigüedad. Guarda en UTC y muestra en local. Guardar hora local implica que dos veces al año una hora se duplica o directamente no existe.',
          },
        },
        {
          kind: 'choice',
          id: 'rep-5',
          prompt: {
            en: 'An integer counter suddenly goes negative. What happened?',
            es: 'Un contador entero se vuelve negativo de repente. ¿Qué ha pasado?',
          },
          choices: [
            { en: 'A division bug', es: 'Un bug de división' },
            {
              en: 'Integer overflow — it exceeded the maximum and wrapped around',
              es: 'Desbordamiento de entero: superó el máximo y dio la vuelta',
            },
            { en: 'The garbage collector reset it', es: 'El recolector de basura lo reinició' },
            { en: 'A race condition', es: 'Una condición de carrera' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A signed 32-bit integer maxes out at 2,147,483,647. Add one and it wraps to −2,147,483,648. This is exactly the bug that broke the "view counter" on several very large websites.',
            es: 'Un entero con signo de 32 bits llega como máximo a 2.147.483.647. Suma uno y da la vuelta a −2.147.483.648. Es exactamente el bug que rompió el contador de visitas de varias webs enormes.',
          },
        },
      ],
    },
  ],
}
