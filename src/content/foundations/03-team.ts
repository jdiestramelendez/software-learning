import type { Section } from '../types'

export const team: Section = {
  id: 'team',
  title: { en: 'Working on a team', es: 'Trabajar en equipo' },
  subtitle: {
    en: 'Software is a team sport. These are the rules of play.',
    es: 'El software es un deporte de equipo. Estas son las reglas del juego.',
  },
  units: [
    {
      id: 'git',
      title: { en: 'Git', es: 'Git' },
      icon: '🌿',
      summary: {
        en: 'Version control, and how to undo absolutely anything.',
        es: 'Control de versiones, y cómo deshacer absolutamente cualquier cosa.',
      },
      concept: {
        headline: {
          en: 'Git is a graph of snapshots. A branch is just a label pointing at one.',
          es: 'Git es un grafo de instantáneas. Una rama solo es una etiqueta que apunta a una de ellas.',
        },
        body: [
          {
            en: 'Every commit is a full snapshot of your project plus a pointer to its parent. Branches are cheap because they are nothing more than a movable label — creating one copies nothing.',
            es: 'Cada commit es una instantánea completa del proyecto más un puntero a su padre. Las ramas son baratas porque no son más que una etiqueta móvil: crear una no copia nada.',
          },
          {
            en: 'Work moves through three places: your working directory, the staging area (what will go into the next commit), and the repository (committed history).',
            es: 'El trabajo pasa por tres sitios: tu directorio de trabajo, el área de preparación (lo que irá en el próximo commit) y el repositorio (el historial confirmado).',
          },
        ],
        keyPoints: [
          {
            en: '`add` stages, `commit` records, `push` publishes. Three separate steps on purpose.',
            es: '`add` prepara, `commit` registra, `push` publica. Tres pasos separados a propósito.',
          },
          {
            en: 'Merge preserves history and adds a merge commit. Rebase rewrites your commits onto a new base — linear, but new hashes.',
            es: 'Merge conserva el historial y añade un commit de fusión. Rebase reescribe tus commits sobre una base nueva: lineal, pero con hashes nuevos.',
          },
          {
            en: 'Never rebase or force-push a branch other people have pulled.',
            es: 'Nunca hagas rebase ni force-push de una rama que otras personas ya han descargado.',
          },
          {
            en: 'Almost nothing is truly lost: `git reflog` remembers where HEAD has been.',
            es: 'Casi nada se pierde de verdad: `git reflog` recuerda por dónde ha pasado HEAD.',
          },
        ],
        example: {
          caption: {
            en: 'Undoing things, in increasing severity',
            es: 'Deshacer cosas, de menos a más grave',
          },
          code: {
            en: `git restore file.ts            # discard uncommitted changes to a file
git reset --soft HEAD~1        # undo last commit, keep the changes staged
git revert <sha>               # new commit that undoes an old one (safe on shared branches)
git reflog                     # find a commit you thought you destroyed`,
            es: `git restore file.ts            # descarta cambios sin confirmar de un fichero
git reset --soft HEAD~1        # deshace el último commit y deja los cambios preparados
git revert <sha>               # nuevo commit que deshace otro (seguro en ramas compartidas)
git reflog                     # encuentra un commit que creías destruido`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'git-1',
          prompt: {
            en: 'Which command stages a file without committing it?',
            es: '¿Qué comando prepara un fichero sin confirmarlo?',
          },
          choices: ['git commit', 'git add', 'git push', 'git stash'],
          answerIndex: 1,
          explanation: {
            en: '`git add` moves changes into the staging area. Keeping staging separate from committing is what lets you commit only part of your work — one logical change per commit.',
            es: '`git add` lleva los cambios al área de preparación. Mantener la preparación separada de la confirmación es lo que te permite confirmar solo parte del trabajo: un cambio lógico por commit.',
          },
        },
        {
          kind: 'choice',
          id: 'git-2',
          prompt: {
            en: 'What does `git rebase main` do to your branch?',
            es: '¿Qué le hace `git rebase main` a tu rama?',
          },
          choices: [
            {
              en: 'Deletes commits older than main',
              es: 'Borra los commits más antiguos que main',
            },
            {
              en: 'Replays your commits on top of main, giving them new hashes',
              es: 'Reaplica tus commits encima de main, dándoles hashes nuevos',
            },
            {
              en: 'Merges main into your branch with a merge commit',
              es: 'Fusiona main en tu rama con un commit de fusión',
            },
            { en: 'Pushes your branch to main', es: 'Empuja tu rama a main' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Rebase rewrites your commits so they start from the tip of main. The history is linear and clean — but the hashes change, which is why it is dangerous on a branch someone else has already pulled.',
            es: 'Rebase reescribe tus commits para que arranquen desde la punta de main. El historial queda lineal y limpio, pero los hashes cambian, y por eso es peligroso en una rama que otra persona ya ha descargado.',
          },
        },
        {
          kind: 'boolean',
          id: 'git-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Force-pushing a shared branch is fine as long as you tell the team afterwards.',
            es: 'Hacer force-push a una rama compartida está bien mientras avises al equipo después.',
          },
          answer: false,
          explanation: {
            en: 'Force-pushing rewrites history that others have already based work on. Their next pull conflicts with itself, and recovering means manual surgery on every checkout. Use `git revert` on shared branches — it undoes changes by adding a commit rather than rewriting.',
            es: 'El force-push reescribe historial sobre el que otras personas ya han construido. Su siguiente pull entra en conflicto consigo mismo y recuperarse exige cirugía manual en cada copia. Usa `git revert` en ramas compartidas: deshace cambios añadiendo un commit en vez de reescribir.',
          },
        },
        {
          kind: 'choice',
          id: 'git-4',
          prompt: {
            en: 'You committed a secret API key and pushed. What is the correct response?',
            es: 'Has confirmado una clave de API secreta y has hecho push. ¿Cuál es la respuesta correcta?',
          },
          choices: [
            {
              en: 'Delete the line and commit again',
              es: 'Borrar la línea y volver a confirmar',
            },
            {
              en: 'Rotate the key immediately — it is in the history and must be treated as compromised',
              es: 'Rotar la clave de inmediato: está en el historial y hay que darla por comprometida',
            },
            { en: 'Force-push over it and move on', es: 'Hacer force-push encima y seguir' },
            { en: 'Make the repo private', es: 'Poner el repositorio en privado' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The key exists in history, in every clone, and in any bot that scrapes public pushes — often within seconds. Purging history is secondary; revoking and reissuing the credential is the only thing that actually protects you.',
            es: 'La clave existe en el historial, en cada clon y en cualquier bot que rastree pushes públicos, a menudo en segundos. Limpiar el historial es secundario: revocar y reemitir la credencial es lo único que te protege de verdad.',
          },
        },
        {
          kind: 'choice',
          id: 'git-5',
          prompt: { en: 'What is a merge conflict?', es: '¿Qué es un conflicto de fusión?' },
          choices: [
            { en: 'Two branches with the same name', es: 'Dos ramas con el mismo nombre' },
            {
              en: 'Two branches changed the same lines and git cannot pick a winner',
              es: 'Dos ramas cambiaron las mismas líneas y git no puede elegir ganador',
            },
            { en: 'A corrupted repository', es: 'Un repositorio corrupto' },
            { en: 'A push rejected by the server', es: 'Un push rechazado por el servidor' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Git merges automatically when changes touch different regions. When both sides edited the same lines, it has no way to know which is right, so it hands you both versions and asks you to decide.',
            es: 'Git fusiona solo cuando los cambios tocan regiones distintas. Cuando ambos lados editaron las mismas líneas no tiene forma de saber cuál es la correcta, así que te entrega las dos versiones y te pide que decidas.',
          },
        },
        {
          kind: 'gap',
          id: 'git-6',
          prompt: {
            en: 'Complete the command that undoes a commit on a SHARED branch safely.',
            es: 'Completa el comando que deshace un commit en una rama COMPARTIDA de forma segura.',
          },
          code: {
            en: `# main is public; other people have already pulled it
git ___ a1b2c3d`,
            es: `# main es pública; otras personas ya la han descargado
git ___ a1b2c3d`,
          },
          choices: ['revert', 'reset --hard', 'rebase -i', 'commit --amend'],
          answerIndex: 0,
          explanation: {
            en: '`revert` creates a NEW commit that undoes the old one, so history everyone else holds stays valid. The other three rewrite history and break every other checkout.',
            es: '`revert` crea un commit NUEVO que deshace el antiguo, así el historial que tienen los demás sigue siendo válido. Los otros tres reescriben el historial y rompen todas las demás copias.',
          },
        },
      ],
    },
    {
      id: 'code-review',
      title: { en: 'Code review', es: 'Revisión de código' },
      icon: '👀',
      summary: {
        en: 'How to give feedback that helps, and receive it without flinching.',
        es: 'Cómo dar feedback que ayuda y recibirlo sin encogerte.',
      },
      concept: {
        headline: {
          en: 'Review is about sharing knowledge, not catching people out.',
          es: 'Revisar va de compartir conocimiento, no de pillar a nadie.',
        },
        body: [
          {
            en: 'Bugs found in review are a bonus. The real value is spreading context: now two people understand that code, and the reviewer learns the part of the system they had not touched.',
            es: 'Los bugs que salen en la revisión son un extra. El valor real es repartir contexto: ahora dos personas entienden ese código, y quien revisa aprende la parte del sistema que no había tocado.',
          },
          {
            en: 'The single biggest factor in review quality is size. Under 200 lines gets careful attention; a 2,000-line PR gets "LGTM" and a rubber stamp.',
            es: 'El factor que más influye en la calidad de una revisión es el tamaño. Menos de 200 líneas recibe atención de verdad; un PR de 2.000 líneas recibe un "LGTM" y un sello.',
          },
        ],
        keyPoints: [
          {
            en: 'Small PRs get real reviews. Split large work into reviewable steps.',
            es: 'Los PR pequeños reciben revisiones reales. Parte el trabajo grande en pasos revisables.',
          },
          {
            en: 'Comment on the code, not the person: "this could null here", not "you forgot".',
            es: 'Comenta sobre el código, no sobre la persona: "esto puede ser null aquí", no "se te olvidó".',
          },
          {
            en: 'Separate blocking issues from preferences — label nitpicks as nitpicks.',
            es: 'Separa lo que bloquea de lo que es preferencia: etiqueta las minucias como minucias.',
          },
          {
            en: 'If you cannot explain WHY, it is a preference, not a standard. Automate real standards with a linter.',
            es: 'Si no puedes explicar el POR QUÉ, es una preferencia, no un estándar. Automatiza los estándares reales con un linter.',
          },
        ],
        example: {
          caption: { en: 'The same feedback, twice', es: 'El mismo comentario, dos veces' },
          code: {
            en: `❌ "This is wrong, you clearly did not test it."

✅ "If \`items\` is empty this divides by zero — line 42.
    Worth an early return? (blocking)"

✅ "nit: I'd name this \`activeUsers\`, but happy either way."`,
            es: `❌ "Esto está mal, está claro que no lo probaste."

✅ "Si \`items\` está vacío aquí se divide por cero — línea 42.
    ¿Merece un return temprano? (bloqueante)"

✅ "minucia: yo lo llamaría \`activeUsers\`, pero me vale igual."`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'cr-1',
          prompt: {
            en: 'What most improves the quality of a code review?',
            es: '¿Qué mejora más la calidad de una revisión de código?',
          },
          choices: [
            { en: 'More reviewers', es: 'Más revisores' },
            { en: 'A smaller pull request', es: 'Un pull request más pequeño' },
            { en: 'A longer description', es: 'Una descripción más larga' },
            { en: 'Reviewing at the end of the sprint', es: 'Revisar al final del sprint' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Attention per line collapses as size grows. Studies and experience agree: beyond a few hundred lines, defect detection drops sharply because reviewers start skimming.',
            es: 'La atención por línea se desploma según crece el tamaño. Los estudios y la experiencia coinciden: más allá de unos cientos de líneas, la detección de defectos cae en picado porque quien revisa empieza a leer en diagonal.',
          },
        },
        {
          kind: 'boolean',
          id: 'cr-2',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'Formatting and style debates are a good use of code review time.',
            es: 'Los debates de formato y estilo son un buen uso del tiempo de revisión.',
          },
          answer: false,
          explanation: {
            en: 'Those should be settled once by a formatter and a linter running in CI. Human review time is expensive — spend it on logic, edge cases, naming, and design, which no tool can check.',
            es: 'Eso debería zanjarlo de una vez un formateador y un linter en CI. El tiempo de revisión humana es caro: gástalo en lógica, casos límite, nombres y diseño, que ninguna herramienta puede comprobar.',
          },
        },
        {
          kind: 'choice',
          id: 'cr-3',
          prompt: {
            en: 'A reviewer suggests a large refactor on your PR. What is usually the best response?',
            es: 'Alguien propone un refactor grande en tu PR. ¿Cuál suele ser la mejor respuesta?',
          },
          choices: [
            { en: 'Do it immediately in this PR', es: 'Hacerlo ya mismo en este PR' },
            { en: 'Ignore it', es: 'Ignorarlo' },
            {
              en: 'Agree on the direction and do it in a follow-up PR',
              es: 'Acordar la dirección y hacerlo en un PR posterior',
            },
            { en: 'Close the PR', es: 'Cerrar el PR' },
          ],
          answerIndex: 2,
          explanation: {
            en: 'Growing a PR to satisfy a refactor makes it harder to review and delays shipping. Capture the idea, agree it matters, and keep the current change focused — as long as the follow-up genuinely happens.',
            es: 'Engordar un PR para meter un refactor lo hace más difícil de revisar y retrasa la entrega. Recoge la idea, acepta que importa y mantén el cambio actual enfocado, siempre que el PR posterior ocurra de verdad.',
          },
        },
        {
          kind: 'choice',
          id: 'cr-4',
          prompt: {
            en: 'What should a reviewer prioritise ABOVE everything else?',
            es: '¿Qué debería priorizar quien revisa POR ENCIMA de todo?',
          },
          choices: [
            { en: 'Variable naming', es: 'Los nombres de variables' },
            { en: 'Correctness and edge cases', es: 'La corrección y los casos límite' },
            { en: 'Line length', es: 'La longitud de línea' },
            { en: 'Commit message style', es: 'El estilo de los mensajes de commit' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Does it work, and does it fail safely when the input is empty, null, huge, or hostile? Naming matters, but a beautifully named function that corrupts data on an empty list is still a broken function.',
            es: '¿Funciona, y falla de forma segura cuando la entrada está vacía, es null, es enorme o es hostil? Los nombres importan, pero una función preciosamente nombrada que corrompe datos con una lista vacía sigue siendo una función rota.',
          },
        },
        {
          kind: 'choice',
          id: 'cr-5',
          prompt: {
            en: 'Why is it useful to label a comment as "nit"?',
            es: '¿Por qué es útil etiquetar un comentario como "minucia"?',
          },
          choices: [
            { en: 'It is required by GitHub', es: 'Lo exige GitHub' },
            {
              en: 'It tells the author which comments block merging and which are optional',
              es: 'Indica al autor qué comentarios bloquean la fusión y cuáles son opcionales',
            },
            { en: 'It makes the review shorter', es: 'Acorta la revisión' },
            { en: 'It hides the comment from others', es: 'Oculta el comentario a los demás' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Without that signal, authors treat every comment as mandatory and reviews grind on. Explicitly marking preferences as optional keeps things moving and keeps trust intact.',
            es: 'Sin esa señal, quien escribe trata cada comentario como obligatorio y la revisión se eterniza. Marcar explícitamente las preferencias como opcionales mantiene el ritmo y la confianza intactos.',
          },
        },
      ],
    },
    {
      id: 'ci-cd',
      title: { en: 'CI/CD', es: 'CI/CD' },
      icon: '🔄',
      summary: {
        en: 'Automating the path from your laptop to production.',
        es: 'Automatizar el camino de tu portátil a producción.',
      },
      concept: {
        headline: {
          en: 'CI protects the main branch. CD gets changes to users.',
          es: 'CI protege la rama principal. CD lleva los cambios a los usuarios.',
        },
        body: [
          {
            en: 'Continuous Integration runs your checks — build, lint, tests — on every change, so main stays releasable. Continuous Delivery/Deployment takes what passed and ships it.',
            es: 'La integración continua ejecuta tus comprobaciones —build, lint, tests— en cada cambio, para que main siga siendo publicable. La entrega/despliegue continuo coge lo que pasó y lo publica.',
          },
          {
            en: 'The economics are simple: the cost of fixing a bug rises steeply the later it is found. A pipeline pushes discovery as early as possible, ideally before a human ever reviews it.',
            es: 'La economía es simple: el coste de arreglar un bug sube en picado cuanto más tarde se descubre. Un pipeline adelanta ese descubrimiento todo lo posible, idealmente antes de que nadie lo revise.',
          },
        ],
        keyPoints: [
          {
            en: 'CI must be fast. A 40-minute pipeline stops being a feedback loop and becomes a queue.',
            es: 'CI tiene que ser rápido. Un pipeline de 40 minutos deja de ser un bucle de feedback y se convierte en una cola.',
          },
          {
            en: 'Red main is an emergency — everyone is blocked until it is green.',
            es: 'Main en rojo es una emergencia: todo el mundo está bloqueado hasta que vuelva a verde.',
          },
          {
            en: 'Build once, deploy the same artifact to every environment. Rebuilding per environment means you never tested what you shipped.',
            es: 'Construye una vez y despliega el mismo artefacto en todos los entornos. Reconstruir por entorno significa que nunca probaste lo que publicaste.',
          },
          {
            en: 'Deploy strategies: blue-green (two environments, flip traffic), butter (a small % first), rolling (replace instances gradually).',
            es: 'Estrategias de despliegue: blue-green (dos entornos, se cambia el tráfico), butter (primero un % pequeño), rolling (sustituir instancias poco a poco).',
          },
        ],
        example: {
          caption: { en: 'The minimum viable pipeline', es: 'El pipeline mínimo viable' },
          code: {
            en: `on: [pull_request]
jobs:
  verify:
    steps:
      - checkout
      - install dependencies
      - typecheck
      - lint
      - test
      - build          # the same command production uses`,
            es: `on: [pull_request]
jobs:
  verify:
    steps:
      - checkout
      - instalar dependencias
      - typecheck
      - lint
      - test
      - build          # el mismo comando que usa producción`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'ci-1',
          prompt: {
            en: 'What is the main purpose of Continuous Integration?',
            es: '¿Cuál es el propósito principal de la integración continua?',
          },
          choices: [
            {
              en: 'Deploying to production automatically',
              es: 'Desplegar a producción automáticamente',
            },
            {
              en: 'Catching broken changes early, keeping the main branch always releasable',
              es: 'Detectar cambios rotos pronto, manteniendo la rama principal siempre publicable',
            },
            { en: 'Managing servers', es: 'Gestionar servidores' },
            { en: 'Writing tests for you', es: 'Escribir los tests por ti' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'CI is the gate. Every change gets built and tested before it lands, so main never drifts into a broken state that someone discovers days later on release day.',
            es: 'CI es la puerta. Cada cambio se construye y se testea antes de entrar, así main nunca deriva a un estado roto que alguien descubre días después el día de la entrega.',
          },
        },
        {
          kind: 'choice',
          id: 'ci-2',
          prompt: {
            en: 'In a butter deployment, what happens?',
            es: 'En un despliegue butter, ¿qué ocurre?',
          },
          choices: [
            {
              en: 'The whole fleet is replaced at once',
              es: 'Toda la flota se sustituye de golpe',
            },
            {
              en: 'The new version goes to a small percentage of traffic first',
              es: 'La versión nueva va primero a un pequeño porcentaje del tráfico',
            },
            { en: 'Two identical environments swap', es: 'Dos entornos idénticos se intercambian' },
            { en: 'The database migrates first', es: 'La base de datos migra primero' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A small slice of real users exercises the new version. If error rates rise you roll back having affected 1% instead of 100% — and you get real production signal that staging can never give you.',
            es: 'Una porción pequeña de usuarios reales ejercita la versión nueva. Si suben los errores das marcha atrás habiendo afectado al 1% en vez de al 100%, y obtienes señal real de producción que staging nunca te dará.',
          },
        },
        {
          kind: 'boolean',
          id: 'ci-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'It is fine to disable a failing test to unblock a release.',
            es: 'Está bien desactivar un test que falla para desbloquear una entrega.',
          },
          answer: false,
          explanation: {
            en: 'A disabled test is a hole in your safety net that nobody remembers to fill. Either the test found a real bug (fix the bug) or the test is wrong (fix the test). Skipping it postpones the problem to the worst possible moment.',
            es: 'Un test desactivado es un agujero en tu red de seguridad que nadie recuerda tapar. O el test encontró un bug real (arregla el bug) o el test está mal (arregla el test). Saltárselo aplaza el problema al peor momento posible.',
          },
        },
        {
          kind: 'choice',
          id: 'ci-4',
          prompt: {
            en: 'Why build the artifact ONCE and promote it through environments?',
            es: '¿Por qué construir el artefacto UNA VEZ y promoverlo por los entornos?',
          },
          choices: [
            { en: 'It saves disk space', es: 'Ahorra espacio en disco' },
            {
              en: 'Rebuilding per environment means production runs something you never tested',
              es: 'Reconstruir por entorno significa que producción ejecuta algo que nunca probaste',
            },
            { en: 'It is faster to type', es: 'Se escribe más rápido' },
            { en: 'Docker requires it', es: 'Docker lo exige' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Rebuild and you may pick up a different dependency version, a different base image, a different compiler. The binary that passed staging must be the exact binary that reaches production.',
            es: 'Si reconstruyes puedes arrastrar otra versión de una dependencia, otra imagen base, otro compilador. El binario que pasó staging tiene que ser exactamente el binario que llega a producción.',
          },
        },
        {
          kind: 'choice',
          id: 'ci-5',
          prompt: {
            en: 'Your CI pipeline takes 45 minutes. What is the real cost?',
            es: 'Tu pipeline de CI tarda 45 minutos. ¿Cuál es el coste real?',
          },
          choices: [
            { en: 'Higher compute bills only', es: 'Solo una factura de cómputo mayor' },
            {
              en: 'Developers context-switch, batch changes into bigger PRs, and start ignoring results',
              es: 'La gente cambia de contexto, agrupa cambios en PR más grandes y empieza a ignorar los resultados',
            },
            { en: 'Nothing, it runs in the background', es: 'Ninguno, se ejecuta en segundo plano' },
            { en: 'Tests become less reliable', es: 'Los tests se vuelven menos fiables' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Slow feedback changes behaviour: people stop pushing small commits, PRs grow, and a red result arrives long after they moved on. Pipeline speed is a developer-productivity feature, not an infrastructure detail.',
            es: 'El feedback lento cambia el comportamiento: la gente deja de subir commits pequeños, los PR engordan y el resultado en rojo llega mucho después de haber pasado a otra cosa. La velocidad del pipeline es una funcionalidad de productividad, no un detalle de infraestructura.',
          },
        },
        {
          kind: 'order',
          id: 'ci-6',
          prompt: {
            en: 'Order a CI pipeline from fastest-failing to slowest.',
            es: 'Ordena un pipeline de CI del que falla más rápido al más lento.',
          },
          items: [
            { en: 'Lint and format check', es: 'Lint y comprobación de formato' },
            { en: 'Typecheck', es: 'Comprobación de tipos' },
            { en: 'Unit tests', es: 'Tests unitarios' },
            { en: 'Production build', es: 'Build de producción' },
            { en: 'End-to-end tests', es: 'Tests end-to-end' },
          ],
          explanation: {
            en: 'Put the cheapest checks first so a missing semicolon fails in 10 seconds instead of after a 12-minute browser suite. Fast feedback is the whole point.',
            es: 'Pon primero las comprobaciones más baratas para que un punto y coma que falta falle en 10 segundos y no tras una suite de navegador de 12 minutos. El feedback rápido es todo el objetivo.',
          },
        },
      ],
    },
  ],
}
