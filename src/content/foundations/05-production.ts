import type { Section } from '../types'

export const production: Section = {
  id: 'production',
  title: { en: 'Running it in production', es: 'Ponerlo en producción' },
  subtitle: {
    en: 'Shipping is the start of the job, not the end.',
    es: 'Publicar es el principio del trabajo, no el final.',
  },
  units: [
    {
      id: 'linux',
      title: { en: 'Linux & the CLI', es: 'Linux y la terminal' },
      icon: '🐧',
      summary: {
        en: 'The twenty commands that cover ninety percent of the work.',
        es: 'Los veinte comandos que cubren el noventa por ciento del trabajo.',
      },
      concept: {
        headline: {
          en: 'Small tools, joined by pipes, beat one big tool.',
          es: 'Herramientas pequeñas unidas por tuberías ganan a una herramienta enorme.',
        },
        body: [
          {
            en: 'The Unix philosophy: each program does one thing and reads/writes plain text. A pipe (`|`) feeds one program’s output into the next, which lets you build a one-off tool in seconds.',
            es: 'La filosofía Unix: cada programa hace una cosa y lee y escribe texto plano. Una tubería (`|`) mete la salida de un programa en el siguiente, lo que te permite construir una herramienta a medida en segundos.',
          },
          {
            en: 'Almost every server you deploy to runs Linux. Being fluent here is the difference between debugging a production box and filing a ticket for someone else to do it.',
            es: 'Casi todos los servidores donde despliegas corren Linux. Manejarte aquí es la diferencia entre depurar una máquina de producción y abrir un ticket para que lo haga otra persona.',
          },
        ],
        keyPoints: [
          {
            en: 'Navigate and inspect: `ls`, `cd`, `cat`, `less`, `tail -f`, `find`.',
            es: 'Navegar e inspeccionar: `ls`, `cd`, `cat`, `less`, `tail -f`, `find`.',
          },
          {
            en: 'Filter and transform: `grep`, `sort`, `uniq`, `wc`, `awk`, `sed`.',
            es: 'Filtrar y transformar: `grep`, `sort`, `uniq`, `wc`, `awk`, `sed`.',
          },
          {
            en: 'Processes: `ps`, `top`, `kill`. Disk and network: `df`, `du`, `curl`.',
            es: 'Procesos: `ps`, `top`, `kill`. Disco y red: `df`, `du`, `curl`.',
          },
          {
            en: 'Permissions are read/write/execute for owner, group, others — `chmod 644` is rw-r--r--.',
            es: 'Los permisos son lectura/escritura/ejecución para propietario, grupo y otros: `chmod 644` es rw-r--r--.',
          },
        ],
        example: {
          caption: {
            en: 'Top 5 IPs hitting your error endpoint',
            es: 'Las 5 IPs que más provocan errores',
          },
          code: `grep ' 500 ' access.log \\
  | awk '{print $1}' \\
  | sort \\
  | uniq -c \\
  | sort -rn \\
  | head -5`,
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'lin-1',
          prompt: {
            en: 'What does the `|` (pipe) operator do?',
            es: '¿Qué hace el operador `|` (tubería)?',
          },
          choices: [
            { en: 'Runs two commands in parallel', es: 'Ejecuta dos comandos en paralelo' },
            {
              en: 'Sends the output of one command as the input of the next',
              es: 'Envía la salida de un comando como entrada del siguiente',
            },
            { en: 'Redirects output to a file', es: 'Redirige la salida a un fichero' },
            {
              en: 'Comments out the rest of the line',
              es: 'Comenta el resto de la línea',
            },
          ],
          answerIndex: 1,
          explanation: {
            en: 'It chains small tools into a bespoke one. Writing output to a file is `>` — the pipe keeps everything in memory and streaming, so it works on files too big to fit on disk twice.',
            es: 'Encadena herramientas pequeñas en una hecha a medida. Escribir la salida a un fichero es `>`; la tubería mantiene todo en memoria y en flujo, así que funciona con ficheros demasiado grandes para caber dos veces en disco.',
          },
        },
        {
          kind: 'choice',
          id: 'lin-2',
          prompt: {
            en: 'How do you watch a log file as new lines are written?',
            es: '¿Cómo ves un fichero de log según se van escribiendo líneas nuevas?',
          },
          choices: ['cat app.log', 'tail -f app.log', 'less app.log', 'grep app.log'],
          answerIndex: 1,
          explanation: {
            en: '`tail -f` prints the end of the file and then follows it live. `cat` dumps everything once and exits — useless for a log that is still being written.',
            es: '`tail -f` imprime el final del fichero y luego lo sigue en vivo. `cat` vuelca todo una vez y termina: inútil para un log que se sigue escribiendo.',
          },
        },
        {
          kind: 'boolean',
          id: 'lin-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: '`chmod 777` is a reasonable fix for a permissions problem.',
            es: '`chmod 777` es una solución razonable para un problema de permisos.',
          },
          answer: false,
          explanation: {
            en: '777 grants read, write and execute to everyone on the system, including any compromised process. It "works" because it removes all protection. Grant the specific permission the specific user needs instead.',
            es: '777 concede lectura, escritura y ejecución a todo el sistema, incluido cualquier proceso comprometido. "Funciona" porque elimina toda protección. Concede el permiso concreto que necesita el usuario concreto.',
          },
        },
        {
          kind: 'choice',
          id: 'lin-4',
          prompt: {
            en: 'A server reports "No space left on device" but `df` shows plenty free. What else could be exhausted?',
            es: 'Un servidor dice "No space left on device" pero `df` muestra espacio de sobra. ¿Qué más puede estar agotado?',
          },
          choices: [
            { en: 'RAM', es: 'La RAM' },
            {
              en: 'Inodes — the file table is full even though the bytes are not',
              es: 'Los inodos: la tabla de ficheros está llena aunque los bytes no lo estén',
            },
            { en: 'CPU', es: 'La CPU' },
            { en: 'Network sockets', es: 'Los sockets de red' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A filesystem has a fixed number of inodes, one per file. Millions of tiny session or cache files exhaust them while leaving gigabytes free. `df -i` shows it.',
            es: 'Un sistema de ficheros tiene un número fijo de inodos, uno por fichero. Millones de ficheros minúsculos de sesión o caché los agotan dejando gigabytes libres. `df -i` lo muestra.',
          },
        },
        {
          kind: 'choice',
          id: 'lin-5',
          prompt: {
            en: 'What is the difference between `kill` and `kill -9`?',
            es: '¿Cuál es la diferencia entre `kill` y `kill -9`?',
          },
          choices: [
            { en: 'Nothing', es: 'Ninguna' },
            {
              en: '`kill` asks the process to shut down cleanly; `-9` forces the kernel to terminate it immediately',
              es: '`kill` pide al proceso que cierre limpiamente; `-9` obliga al kernel a terminarlo de inmediato',
            },
            { en: '`-9` is slower', es: '`-9` es más lento' },
            {
              en: '`kill` only works on your own processes',
              es: '`kill` solo funciona con tus propios procesos',
            },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Plain `kill` sends SIGTERM, which a well-written process catches to finish requests and flush data. `-9` sends SIGKILL, which cannot be caught — instant death, with whatever corruption that implies. Try SIGTERM first.',
            es: '`kill` a secas envía SIGTERM, que un proceso bien escrito captura para terminar peticiones y volcar datos. `-9` envía SIGKILL, que no se puede capturar: muerte instantánea, con la corrupción que eso implique. Prueba primero con SIGTERM.',
          },
        },
        {
          kind: 'gap',
          id: 'lin-6',
          prompt: {
            en: 'Complete the pipeline that counts the most frequent IPs in a log.',
            es: 'Completa la tubería que cuenta las IPs más frecuentes de un log.',
          },
          code: `awk '{print $1}' access.log | sort | ___ -c | sort -rn | head -5`,
          choices: ['uniq', 'grep', 'wc', 'cut'],
          answerIndex: 0,
          explanation: {
            en: '`uniq -c` collapses adjacent duplicate lines and prefixes each with a count — which is why the `sort` before it is mandatory: uniq only sees neighbours.',
            es: '`uniq -c` colapsa líneas duplicadas adyacentes y antepone el recuento a cada una; por eso el `sort` previo es obligatorio: uniq solo ve vecinos.',
          },
        },
      ],
    },
    {
      id: 'containers',
      title: { en: 'Containers', es: 'Contenedores' },
      icon: '📦',
      summary: {
        en: 'What Docker actually solves, and what it does not.',
        es: 'Qué resuelve Docker de verdad y qué no.',
      },
      concept: {
        headline: {
          en: 'A container packages your app WITH its environment, so "works on my machine" becomes irrelevant.',
          es: 'Un contenedor empaqueta tu app CON su entorno, así "en mi máquina funciona" deja de importar.',
        },
        body: [
          {
            en: 'A container bundles your code, its runtime, its libraries and its OS-level dependencies into one image. That image runs identically on your laptop, in CI, and in production.',
            es: 'Un contenedor agrupa tu código, su runtime, sus librerías y sus dependencias de sistema en una sola imagen. Esa imagen se ejecuta igual en tu portátil, en CI y en producción.',
          },
          {
            en: 'Unlike a virtual machine, containers share the host kernel. That makes them start in milliseconds instead of minutes, and small enough to run dozens per machine.',
            es: 'A diferencia de una máquina virtual, los contenedores comparten el kernel del anfitrión. Eso hace que arranquen en milisegundos en vez de minutos y sean lo bastante pequeños para correr docenas por máquina.',
          },
        ],
        keyPoints: [
          {
            en: 'An IMAGE is the blueprint. A CONTAINER is a running instance of it.',
            es: 'Una IMAGEN es el plano. Un CONTENEDOR es una instancia suya en ejecución.',
          },
          {
            en: 'Images are layered and cached — order your Dockerfile so dependencies install before you copy source code.',
            es: 'Las imágenes están en capas y se cachean: ordena tu Dockerfile para instalar dependencias antes de copiar el código fuente.',
          },
          {
            en: 'Containers are ephemeral. Anything written inside is lost on restart unless it is on a volume.',
            es: 'Los contenedores son efímeros. Lo que se escriba dentro se pierde al reiniciar salvo que esté en un volumen.',
          },
          {
            en: 'A container is not a security boundary as strong as a VM: it shares the host kernel.',
            es: 'Un contenedor no es una frontera de seguridad tan fuerte como una VM: comparte el kernel del anfitrión.',
          },
        ],
        example: {
          caption: {
            en: 'Layer order is the whole performance story',
            es: 'El orden de las capas lo es todo en rendimiento',
          },
          code: {
            en: `FROM node:22-alpine
WORKDIR /app

COPY package*.json ./     # changes rarely
RUN npm ci                # cached until deps change

COPY . .                  # changes every commit
RUN npm run build`,
            es: `FROM node:22-alpine
WORKDIR /app

COPY package*.json ./     # cambia pocas veces
RUN npm ci                # cacheado hasta que cambien las deps

COPY . .                  # cambia en cada commit
RUN npm run build`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'ctr-1',
          prompt: {
            en: 'What is the difference between an image and a container?',
            es: '¿Cuál es la diferencia entre una imagen y un contenedor?',
          },
          choices: [
            { en: 'Nothing, they are synonyms', es: 'Ninguna, son sinónimos' },
            {
              en: 'An image is the immutable blueprint; a container is a running instance of it',
              es: 'Una imagen es el plano inmutable; un contenedor es una instancia suya en ejecución',
            },
            { en: 'An image runs, a container stores', es: 'La imagen se ejecuta, el contenedor guarda' },
            { en: 'Images are for production only', es: 'Las imágenes son solo para producción' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Same relationship as a class and an object, or an ISO file and a booted machine. One image can back a hundred identical containers.',
            es: 'La misma relación que entre una clase y un objeto, o entre un fichero ISO y una máquina arrancada. Una imagen puede respaldar cien contenedores idénticos.',
          },
        },
        {
          kind: 'choice',
          id: 'ctr-2',
          prompt: {
            en: 'Why copy `package.json` and install dependencies BEFORE copying the rest of the source?',
            es: '¿Por qué copiar `package.json` e instalar dependencias ANTES de copiar el resto del código?',
          },
          choices: [
            { en: 'It is required syntax', es: 'Es sintaxis obligatoria' },
            {
              en: 'Docker caches layers — dependencies are only reinstalled when package.json changes',
              es: 'Docker cachea capas: las dependencias solo se reinstalan cuando cambia package.json',
            },
            { en: 'It makes the image smaller', es: 'Hace la imagen más pequeña' },
            { en: 'npm requires it', es: 'Lo exige npm' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Each instruction is a cached layer, invalidated by any change above it. Copy everything first and every one-character code change reinstalls all dependencies — turning a 5-second build into 3 minutes.',
            es: 'Cada instrucción es una capa cacheada que se invalida con cualquier cambio anterior. Si copias todo primero, cambiar un solo carácter reinstala todas las dependencias, convirtiendo un build de 5 segundos en 3 minutos.',
          },
        },
        {
          kind: 'boolean',
          id: 'ctr-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Data written inside a running container persists after it is removed.',
            es: 'Los datos escritos dentro de un contenedor en ejecución sobreviven a su eliminación.',
          },
          answer: false,
          explanation: {
            en: 'The writable layer dies with the container. Anything that must survive — a database, uploads — belongs on a mounted volume or an external service. This surprises people exactly once, usually in production.',
            es: 'La capa escribible muere con el contenedor. Todo lo que deba sobrevivir —una base de datos, ficheros subidos— va en un volumen montado o en un servicio externo. Esto sorprende exactamente una vez, normalmente en producción.',
          },
        },
        {
          kind: 'choice',
          id: 'ctr-4',
          prompt: {
            en: 'How do containers differ from virtual machines?',
            es: '¿En qué se diferencian los contenedores de las máquinas virtuales?',
          },
          choices: [
            { en: 'Containers are slower', es: 'Los contenedores son más lentos' },
            {
              en: 'Containers share the host kernel instead of booting their own OS',
              es: 'Los contenedores comparten el kernel del anfitrión en vez de arrancar su propio sistema operativo',
            },
            { en: 'VMs cannot run Linux', es: 'Las VM no pueden ejecutar Linux' },
            { en: 'Containers need more memory', es: 'Los contenedores necesitan más memoria' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A VM virtualises hardware and boots a full guest OS — heavy, slow, strongly isolated. A container is just isolated processes on the host kernel: milliseconds to start, megabytes in size, weaker isolation.',
            es: 'Una VM virtualiza hardware y arranca un sistema operativo completo: pesada, lenta y fuertemente aislada. Un contenedor son solo procesos aislados sobre el kernel del anfitrión: milisegundos para arrancar, megabytes de tamaño y aislamiento más débil.',
          },
        },
        {
          kind: 'choice',
          id: 'ctr-5',
          prompt: {
            en: 'Why avoid running a container as root?',
            es: '¿Por qué evitar ejecutar un contenedor como root?',
          },
          choices: [
            { en: 'It is slower', es: 'Es más lento' },
            {
              en: 'A container escape or a compromised process would then have root on the host',
              es: 'Un escape del contenedor o un proceso comprometido tendría entonces root en el anfitrión',
            },
            { en: 'Docker forbids it', es: 'Docker lo prohíbe' },
            { en: 'It breaks networking', es: 'Rompe la red' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Container isolation is good, not perfect. Running as an unprivileged user means a kernel-level escape lands an attacker as a nobody rather than as root — a cheap, large reduction in blast radius.',
            es: 'El aislamiento de contenedores es bueno, no perfecto. Ejecutar como usuario sin privilegios hace que un escape a nivel de kernel deje al atacante como un don nadie en vez de como root: una reducción del radio de daño barata y enorme.',
          },
        },
        {
          kind: 'gap',
          id: 'ctr-6',
          prompt: {
            en: 'Complete the Dockerfile so dependency installs stay cached.',
            es: 'Completa el Dockerfile para que la instalación de dependencias siga cacheada.',
          },
          code: `FROM node:22-alpine
WORKDIR /app
___
RUN npm ci
COPY . .`,
          choices: ['COPY package*.json ./', 'COPY . .', 'RUN npm install', 'ADD src/ ./'],
          answerIndex: 0,
          explanation: {
            en: 'Copying only the manifest first means the `npm ci` layer is reused until dependencies actually change. `COPY . .` here would invalidate the cache on every source edit.',
            es: 'Copiar solo el manifiesto primero hace que la capa de `npm ci` se reutilice hasta que cambien de verdad las dependencias. `COPY . .` aquí invalidaría la caché con cada edición del código.',
          },
        },
      ],
    },
    {
      id: 'observability',
      title: { en: 'Observability', es: 'Observabilidad' },
      icon: '📊',
      summary: {
        en: 'Understanding a system you cannot attach a debugger to.',
        es: 'Entender un sistema al que no puedes engancharle un depurador.',
      },
      concept: {
        headline: {
          en: 'You cannot debug production. You can only ask it questions.',
          es: 'No puedes depurar producción. Solo puedes hacerle preguntas.',
        },
        body: [
          {
            en: 'Monitoring tells you THAT something is wrong. Observability is being able to work out WHY, for a failure you never anticipated, without shipping new code.',
            es: 'La monitorización te dice QUE algo va mal. La observabilidad es poder averiguar POR QUÉ, ante un fallo que no anticipaste, sin publicar código nuevo.',
          },
          {
            en: 'Three signals do the work: logs (discrete events), metrics (numbers over time), traces (one request’s path across services).',
            es: 'Tres señales hacen el trabajo: logs (eventos discretos), métricas (números en el tiempo) y trazas (el camino de una petición entre servicios).',
          },
        ],
        keyPoints: [
          {
            en: 'Structured logs (JSON with fields) are searchable. Free-text logs are not.',
            es: 'Los logs estructurados (JSON con campos) se pueden consultar. Los de texto libre, no.',
          },
          {
            en: 'Metrics are cheap and aggregate well; logs are detailed and expensive at volume.',
            es: 'Las métricas son baratas y agregan bien; los logs son detallados y caros en volumen.',
          },
          {
            en: 'Always log a correlation/request ID so one user’s journey can be reconstructed.',
            es: 'Registra siempre un ID de correlación o petición para poder reconstruir el recorrido de un usuario.',
          },
          {
            en: 'Alert on symptoms users feel (error rate, latency), not on causes (CPU at 80%).',
            es: 'Alerta sobre síntomas que nota el usuario (tasa de error, latencia), no sobre causas (CPU al 80%).',
          },
        ],
        example: {
          caption: {
            en: 'A log line you can actually query',
            es: 'Una línea de log que sí se puede consultar',
          },
          code: {
            en: `// Unsearchable
console.log('User checkout failed for ' + id)

// Queryable: "all failed checkouts over 2s for this user"
logger.error('checkout_failed', {
  userId: id, orderId, durationMs: 2310, reason: 'card_declined',
  requestId: ctx.requestId,
})`,
            es: `// Imposible de buscar
console.log('User checkout failed for ' + id)

// Consultable: "todos los pagos fallidos de más de 2s de este usuario"
logger.error('checkout_failed', {
  userId: id, orderId, durationMs: 2310, reason: 'card_declined',
  requestId: ctx.requestId,
})`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'obs-1',
          prompt: {
            en: 'What does a distributed trace show that logs alone cannot?',
            es: '¿Qué muestra una traza distribuida que los logs por sí solos no?',
          },
          choices: [
            { en: 'The error message', es: 'El mensaje de error' },
            {
              en: 'One request’s full path across services, with the time spent in each',
              es: 'El recorrido completo de una petición entre servicios, con el tiempo en cada uno',
            },
            { en: 'The server’s CPU usage', es: 'El uso de CPU del servidor' },
            { en: 'The database schema', es: 'El esquema de la base de datos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'When a request touches six services, logs give you six disconnected islands. A trace stitches them into one timeline, so "where did those 3 seconds go?" has an answer.',
            es: 'Cuando una petición toca seis servicios, los logs te dan seis islas desconectadas. Una traza las cose en una sola línea temporal, así "¿a dónde se fueron esos 3 segundos?" tiene respuesta.',
          },
        },
        {
          kind: 'choice',
          id: 'obs-2',
          prompt: {
            en: 'Which is the better thing to alert on?',
            es: '¿Sobre qué es mejor alertar?',
          },
          choices: [
            { en: 'CPU above 80%', es: 'CPU por encima del 80%' },
            { en: 'Checkout error rate above 1%', es: 'Tasa de error del pago por encima del 1%' },
            { en: 'Disk usage above 50%', es: 'Uso de disco por encima del 50%' },
            { en: 'Number of running containers', es: 'Número de contenedores en ejecución' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'High CPU may be perfectly healthy; low CPU may accompany a total outage. Alert on what users experience — errors and latency — and use resource metrics to diagnose once you know something is wrong.',
            es: 'Una CPU alta puede ser perfectamente sana; una CPU baja puede acompañar a una caída total. Alerta sobre lo que experimenta el usuario —errores y latencia— y usa las métricas de recursos para diagnosticar una vez sabes que algo va mal.',
          },
        },
        {
          kind: 'boolean',
          id: 'obs-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Logging everything at maximum detail is the safest strategy in production.',
            es: 'Registrarlo todo con el máximo detalle es la estrategia más segura en producción.',
          },
          answer: false,
          explanation: {
            en: 'Log volume costs real money, slows the app, and buries the signal you need. Worse, verbose logs frequently leak passwords, tokens and personal data into a system with far weaker access controls than your database.',
            es: 'El volumen de logs cuesta dinero real, ralentiza la app y entierra la señal que necesitas. Peor aún: los logs verbosos filtran a menudo contraseñas, tokens y datos personales a un sistema con controles de acceso mucho más débiles que tu base de datos.',
          },
        },
        {
          kind: 'choice',
          id: 'obs-4',
          prompt: {
            en: 'Why attach a request ID to every log line?',
            es: '¿Por qué adjuntar un ID de petición a cada línea de log?',
          },
          choices: [
            { en: 'To sort logs alphabetically', es: 'Para ordenar los logs alfabéticamente' },
            {
              en: 'To reconstruct a single request’s journey across services and log lines',
              es: 'Para reconstruir el recorrido de una sola petición entre servicios y líneas de log',
            },
            { en: 'To compress logs', es: 'Para comprimir los logs' },
            { en: 'It is required by JSON', es: 'Lo exige JSON' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Under concurrent load, log lines from thousands of requests interleave. A correlation ID lets you filter to exactly one user’s failing request out of millions of lines.',
            es: 'Con carga concurrente, las líneas de log de miles de peticiones se entremezclan. Un ID de correlación te permite filtrar exactamente la petición fallida de un usuario entre millones de líneas.',
          },
        },
        {
          kind: 'choice',
          id: 'obs-5',
          prompt: { en: 'What is an SLO?', es: '¿Qué es un SLO?' },
          choices: [
            { en: 'A type of database index', es: 'Un tipo de índice de base de datos' },
            {
              en: 'A target for reliability, e.g. "99.9% of requests succeed under 300ms"',
              es: 'Un objetivo de fiabilidad, p. ej. "el 99,9% de las peticiones responden bien en menos de 300ms"',
            },
            { en: 'A security policy', es: 'Una política de seguridad' },
            { en: 'A logging format', es: 'Un formato de logs' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A Service Level Objective turns "the site should be fast" into a measurable target. It also defines an error budget: at 99.9%, you have ~43 minutes of failure per month to spend on risk.',
            es: 'Un objetivo de nivel de servicio convierte "la web debería ir rápida" en una meta medible. También define un presupuesto de error: con un 99,9% tienes unos 43 minutos de fallo al mes para gastar en riesgo.',
          },
        },
      ],
    },
    {
      id: 'system-design',
      title: { en: 'System design', es: 'Diseño de sistemas' },
      icon: '🏗️',
      summary: {
        en: 'Putting it together: how systems grow from one server to many.',
        es: 'Juntarlo todo: cómo crecen los sistemas de un servidor a muchos.',
      },
      concept: {
        headline: {
          en: 'Scaling is mostly about removing state from the things you want to duplicate.',
          es: 'Escalar consiste sobre todo en quitar estado de aquello que quieres duplicar.',
        },
        body: [
          {
            en: 'You cannot run ten copies of a server that keeps sessions in local memory — users would randomly lose their login. Make the server stateless, push state to a shared store, and you can run a thousand copies.',
            es: 'No puedes ejecutar diez copias de un servidor que guarda las sesiones en memoria local: los usuarios perderían la sesión al azar. Haz el servidor sin estado, mueve el estado a un almacén compartido y podrás ejecutar mil copias.',
          },
          {
            en: 'Beyond that, the moves are familiar: cache the expensive reads, queue the slow writes, replicate the database for reads, and shard it when one machine is not enough.',
            es: 'Más allá de eso, los movimientos son conocidos: cachea las lecturas caras, encola las escrituras lentas, replica la base de datos para lecturas y fragméntala cuando una máquina no baste.',
          },
        ],
        keyPoints: [
          {
            en: 'Vertical scaling = a bigger machine (simple, has a ceiling). Horizontal = more machines (harder, no ceiling).',
            es: 'Escalado vertical = una máquina más grande (simple, con techo). Horizontal = más máquinas (más difícil, sin techo).',
          },
          {
            en: 'Stateless services scale horizontally. Sessions belong in Redis or a token, not in process memory.',
            es: 'Los servicios sin estado escalan horizontalmente. Las sesiones van en Redis o en un token, no en la memoria del proceso.',
          },
          {
            en: 'A queue absorbs spikes and decouples producer from consumer — at the cost of eventual consistency.',
            es: 'Una cola absorbe picos y desacopla productor de consumidor, a costa de consistencia eventual.',
          },
          {
            en: 'CAP: during a network partition you choose consistency OR availability. You do not get both.',
            es: 'CAP: durante una partición de red eliges consistencia O disponibilidad. No tienes ambas.',
          },
        ],
        example: {
          caption: {
            en: 'Designing a URL shortener, in five decisions',
            es: 'Diseñar un acortador de URLs en cinco decisiones',
          },
          code: {
            en: `1. Write path   POST /shorten -> generate key -> store {key, url}
2. Read path    GET /:key -> lookup -> 301 redirect
3. Read:write is ~1000:1  -> cache aggressively, replicate reads
4. Key = base62 of a counter or hash. 7 chars = 3.5 trillion URLs
5. Bottleneck is the lookup -> Redis in front of the database`,
            es: `1. Escritura   POST /shorten -> generar clave -> guardar {clave, url}
2. Lectura     GET /:clave -> buscar -> redirección 301
3. Lectura:escritura ~1000:1 -> cachea agresivamente, replica lecturas
4. Clave = base62 de un contador o hash. 7 caracteres = 3,5 billones de URLs
5. El cuello de botella es la búsqueda -> Redis delante de la base de datos`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'sd-1',
          prompt: {
            en: 'Why must a service be stateless to scale horizontally?',
            es: '¿Por qué un servicio debe carecer de estado para escalar horizontalmente?',
          },
          choices: [
            { en: 'Stateless services use less CPU', es: 'Los servicios sin estado usan menos CPU' },
            {
              en: 'Any instance must be able to serve any request — local state means the wrong instance has the wrong data',
              es: 'Cualquier instancia debe poder atender cualquier petición: el estado local implica que la instancia equivocada tiene los datos equivocados',
            },
            {
              en: 'Load balancers cannot route stateful traffic',
              es: 'Los balanceadores no pueden enrutar tráfico con estado',
            },
            { en: 'It is a Docker requirement', es: 'Es un requisito de Docker' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'With sessions in local memory, a user is logged in on instance A and logged out on instance B. Push that state to Redis or a signed token and every instance becomes interchangeable.',
            es: 'Con las sesiones en memoria local, el usuario está autenticado en la instancia A y desconectado en la B. Mueve ese estado a Redis o a un token firmado y cada instancia pasa a ser intercambiable.',
          },
        },
        {
          kind: 'choice',
          id: 'sd-2',
          prompt: {
            en: 'What does the CAP theorem force you to choose during a network partition?',
            es: '¿Qué te obliga a elegir el teorema CAP durante una partición de red?',
          },
          choices: [
            { en: 'Speed or cost', es: 'Velocidad o coste' },
            { en: 'Consistency or availability', es: 'Consistencia o disponibilidad' },
            { en: 'SQL or NoSQL', es: 'SQL o NoSQL' },
            { en: 'Reads or writes', es: 'Lecturas o escrituras' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'When nodes cannot talk, you either refuse requests to avoid serving stale data (consistency) or answer with possibly-stale data (availability). A bank picks the first; a social feed picks the second.',
            es: 'Cuando los nodos no pueden hablarse, o rechazas peticiones para no servir datos viejos (consistencia) o respondes con datos posiblemente viejos (disponibilidad). Un banco elige lo primero; un feed social, lo segundo.',
          },
        },
        {
          kind: 'choice',
          id: 'sd-3',
          prompt: {
            en: 'A checkout must send an email, update analytics and generate a PDF. Why move those to a queue?',
            es: 'Un pago debe enviar un correo, actualizar analítica y generar un PDF. ¿Por qué llevar eso a una cola?',
          },
          choices: [
            { en: 'To save money', es: 'Para ahorrar dinero' },
            {
              en: 'The user gets a fast response, and a failing email service no longer breaks checkout',
              es: 'El usuario obtiene una respuesta rápida y que falle el servicio de correo ya no rompe el pago',
            },
            { en: 'Queues are more secure', es: 'Las colas son más seguras' },
            { en: 'To avoid using a database', es: 'Para no usar base de datos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The purchase is the only thing that must happen synchronously. Queueing the rest cuts response time and decouples failure: the email provider going down delays receipts instead of blocking revenue.',
            es: 'La compra es lo único que debe ocurrir de forma síncrona. Encolar el resto reduce el tiempo de respuesta y desacopla los fallos: que se caiga el proveedor de correo retrasa los recibos en vez de bloquear los ingresos.',
          },
        },
        {
          kind: 'boolean',
          id: 'sd-4',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'You should design for millions of users from the very first version.',
            es: 'Deberías diseñar para millones de usuarios desde la primerísima versión.',
          },
          answer: false,
          explanation: {
            en: 'Almost every product dies from lack of users, not lack of scale. Premature distributed architecture costs speed, money and debuggability now, to solve a problem you may never have. Design so you CAN scale; do not build it yet.',
            es: 'Casi todos los productos mueren por falta de usuarios, no por falta de escala. Una arquitectura distribuida prematura cuesta velocidad, dinero y capacidad de depuración hoy, para resolver un problema que quizá nunca tengas. Diseña para PODER escalar; no lo construyas todavía.',
          },
        },
        {
          kind: 'order',
          id: 'sd-5',
          prompt: {
            en: 'Order these scaling steps from the one you should reach for first to the last resort.',
            es: 'Ordena estos pasos de escalado del primero al que recurrir hasta el último recurso.',
          },
          items: [
            {
              en: 'Add an index and fix the slow queries',
              es: 'Añade un índice y arregla las consultas lentas',
            },
            {
              en: 'Add a cache in front of the database',
              es: 'Pon una caché delante de la base de datos',
            },
            { en: 'Add read replicas', es: 'Añade réplicas de lectura' },
            {
              en: 'Shard the database across machines',
              es: 'Fragmenta la base de datos entre varias máquinas',
            },
          ],
          explanation: {
            en: 'Each step adds real operational complexity, so exhaust the cheap ones first. Sharding is genuinely hard — cross-shard joins and rebalancing — and most systems never need it.',
            es: 'Cada paso añade complejidad operativa real, así que agota primero los baratos. Fragmentar es realmente difícil —joins entre fragmentos y rebalanceo— y la mayoría de sistemas nunca lo necesitan.',
          },
        },
      ],
    },
  ],
}
