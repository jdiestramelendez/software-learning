import type { Section } from '../types'

export const data: Section = {
  id: 'aws-data',
  title: { en: 'Storage, data and networking', es: 'Almacenamiento, datos y red' },
  subtitle: {
    en: 'Where the bytes live and how packets reach them.',
    es: 'Dónde viven los bytes y cómo llegan hasta ellos los paquetes.',
  },
  units: [
    {
      id: 's3',
      title: { en: 'S3', es: 'S3' },
      icon: '🪣',
      summary: {
        en: 'Infinite object storage — and the most famous misconfiguration in tech.',
        es: 'Almacenamiento de objetos infinito, y la mala configuración más famosa del sector.',
      },
      concept: {
        headline: {
          en: 'S3 stores objects, not files. There are no real folders — only key prefixes.',
          es: 'S3 guarda objetos, no ficheros. No hay carpetas reales, solo prefijos de clave.',
        },
        body: [
          {
            en: 'You put an object under a key like `uploads/2026/photo.jpg` in a bucket. The slashes are part of the key; the "folder" structure is a convenience the console draws for you.',
            es: 'Pones un objeto bajo una clave como `uploads/2026/photo.jpg` dentro de un bucket. Las barras forman parte de la clave; la estructura de "carpetas" es una comodidad que dibuja la consola.',
          },
          {
            en: 'S3 is durable to eleven nines, scales without configuration, and is cheap. It is also where a decade of data breaches came from — buckets accidentally opened to the public internet.',
            es: 'S3 tiene once nueves de durabilidad, escala sin configuración y es barato. También es de donde salió una década de brechas de datos: buckets abiertos por accidente a internet.',
          },
        ],
        keyPoints: [
          {
            en: 'Storage classes trade retrieval speed for price: Standard → Infrequent Access → Glacier.',
            es: 'Las clases de almacenamiento cambian velocidad de recuperación por precio: Standard → Infrequent Access → Glacier.',
          },
          {
            en: 'A presigned URL grants temporary access to one object without making the bucket public.',
            es: 'Una URL prefirmada da acceso temporal a un objeto sin hacer público el bucket.',
          },
          {
            en: 'Versioning protects against overwrite and deletion. Lifecycle rules move or expire old objects automatically.',
            es: 'El versionado protege contra sobrescrituras y borrados. Las reglas de ciclo de vida mueven o caducan objetos viejos automáticamente.',
          },
          {
            en: 'S3 can host a static website — but put CloudFront in front of it for HTTPS, caching and cheaper egress.',
            es: 'S3 puede alojar una web estática, pero pon CloudFront delante para tener HTTPS, caché y salida más barata.',
          },
        ],
        example: {
          caption: {
            en: 'Letting a browser upload without exposing the bucket',
            es: 'Dejar que el navegador suba sin exponer el bucket',
          },
          code: {
            en: `// Backend signs a short-lived URL
const url = await getSignedUrl(s3, new PutObjectCommand({
  Bucket: 'uploads', Key: \`user/\${id}/avatar.jpg\`,
}), { expiresIn: 300 })

// The browser PUTs straight to S3 — bytes never touch your server`,
            es: `// El backend firma una URL de corta duración
const url = await getSignedUrl(s3, new PutObjectCommand({
  Bucket: 'uploads', Key: \`user/\${id}/avatar.jpg\`,
}), { expiresIn: 300 })

// El navegador hace PUT directo a S3 — los bytes no pasan por tu servidor`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-s3-1',
          prompt: {
            en: 'How do you let a user download one private file without making the bucket public?',
            es: '¿Cómo dejas que un usuario descargue un fichero privado sin hacer público el bucket?',
          },
          choices: [
            {
              en: 'Set the bucket ACL to public-read',
              es: 'Poner la ACL del bucket en public-read',
            },
            {
              en: 'Generate a presigned URL that expires',
              es: 'Generar una URL prefirmada que caduca',
            },
            {
              en: 'Email them the AWS credentials',
              es: 'Enviarle por correo las credenciales de AWS',
            },
            { en: 'Copy the file to a public bucket', es: 'Copiar el fichero a un bucket público' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A presigned URL carries a time-limited signature for that one object. It is the standard pattern for both downloads and direct browser uploads — no public access, no credentials on the client.',
            es: 'Una URL prefirmada lleva una firma con caducidad para ese objeto concreto. Es el patrón estándar tanto para descargas como para subidas directas desde el navegador: sin acceso público y sin credenciales en el cliente.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-s3-2',
          prompt: {
            en: 'Your app stores logs in S3 that are rarely read after 30 days. What cuts the cost?',
            es: 'Tu app guarda en S3 logs que casi nunca se leen pasados 30 días. ¿Qué reduce el coste?',
          },
          choices: [
            { en: 'Delete the bucket', es: 'Borrar el bucket' },
            {
              en: 'A lifecycle rule transitioning objects to Infrequent Access, then Glacier',
              es: 'Una regla de ciclo de vida que pase los objetos a Infrequent Access y luego a Glacier',
            },
            { en: 'Enable versioning', es: 'Activar el versionado' },
            { en: 'Move to a cheaper region', es: 'Mudarse a una región más barata' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Lifecycle rules move data down the storage tiers automatically by age. Glacier is roughly a tenth of the Standard price — the trade is retrieval time, measured in minutes to hours.',
            es: 'Las reglas de ciclo de vida bajan los datos de nivel automáticamente según su edad. Glacier cuesta aproximadamente la décima parte que Standard; el precio a pagar es el tiempo de recuperación, de minutos a horas.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-s3-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'S3 has real folders, so moving a folder is a fast metadata operation.',
            es: 'S3 tiene carpetas reales, así que mover una carpeta es una operación rápida de metadatos.',
          },
          answer: false,
          explanation: {
            en: 'Keys are flat strings; the folder tree is a UI illusion. "Renaming a folder" means copying every object to a new key and deleting the originals — an O(n) operation that surprises people with millions of objects.',
            es: 'Las claves son cadenas planas; el árbol de carpetas es una ilusión de la interfaz. "Renombrar una carpeta" significa copiar cada objeto a una clave nueva y borrar los originales: una operación O(n) que sorprende a quien tiene millones de objetos.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-s3-4',
          prompt: {
            en: 'Why put CloudFront in front of an S3 static site rather than serving S3 directly?',
            es: '¿Por qué poner CloudFront delante de una web estática en S3 en vez de servir S3 directamente?',
          },
          choices: [
            { en: 'S3 cannot serve HTML', es: 'S3 no puede servir HTML' },
            {
              en: 'CloudFront adds HTTPS with a custom domain, edge caching, and cheaper egress',
              es: 'CloudFront añade HTTPS con dominio propio, caché en el borde y salida más barata',
            },
            { en: 'It is required by AWS', es: 'Lo exige AWS' },
            {
              en: 'S3 has a request limit of 100/second',
              es: 'S3 tiene un límite de 100 peticiones por segundo',
            },
          ],
          answerIndex: 1,
          explanation: {
            en: 'S3 website hosting cannot serve HTTPS on your own domain, has no edge cache, and bills full egress on every request. CloudFront fixes all three — it is the default for any real static site.',
            es: 'El alojamiento web de S3 no puede servir HTTPS con tu propio dominio, no tiene caché en el borde y factura la salida completa en cada petición. CloudFront arregla las tres cosas: es la opción por defecto para cualquier web estática real.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-s3-5',
          prompt: {
            en: 'What does S3 Versioning protect you from?',
            es: '¿De qué te protege el versionado de S3?',
          },
          choices: [
            { en: 'A region outage', es: 'La caída de una región' },
            {
              en: 'Accidental overwrite or deletion — the previous version is retained and restorable',
              es: 'Sobrescrituras o borrados accidentales: la versión anterior se conserva y se puede restaurar',
            },
            { en: 'Ransomware in all cases', es: 'El ransomware en todos los casos' },
            { en: 'High costs', es: 'Los costes altos' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'A delete becomes a marker rather than destruction, and overwrites keep the prior object. Note the cost side: you now pay for every version, so pair it with a lifecycle rule that expires old ones.',
            es: 'Un borrado se convierte en un marcador en vez de una destrucción, y las sobrescrituras conservan el objeto anterior. Ojo al coste: ahora pagas por cada versión, así que combínalo con una regla de ciclo de vida que caduque las viejas.',
          },
        },
        {
          kind: 'order',
          id: 'aws-s3-6',
          prompt: {
            en: 'Order a secure direct-to-S3 browser upload.',
            es: 'Ordena una subida segura desde el navegador directamente a S3.',
          },
          items: [
            {
              en: 'The browser asks your backend for permission to upload',
              es: 'El navegador pide permiso de subida a tu backend',
            },
            {
              en: 'The backend checks auth and generates a short-lived presigned URL',
              es: 'El backend comprueba la autenticación y genera una URL prefirmada de corta duración',
            },
            {
              en: 'The browser PUTs the file straight to S3 using that URL',
              es: 'El navegador hace PUT del fichero directo a S3 con esa URL',
            },
            {
              en: 'S3 emits an event that triggers post-processing',
              es: 'S3 emite un evento que dispara el procesamiento posterior',
            },
          ],
          explanation: {
            en: 'The file bytes never pass through your server — it only issues permission. That removes bandwidth, memory and timeout limits from the upload path entirely.',
            es: 'Los bytes del fichero nunca pasan por tu servidor: este solo concede el permiso. Eso elimina por completo los límites de ancho de banda, memoria y timeout del camino de subida.',
          },
        },
      ],
    },
    {
      id: 'aws-databases',
      title: { en: 'Databases on AWS', es: 'Bases de datos en AWS' },
      icon: '🗃️',
      summary: {
        en: 'RDS, Aurora, DynamoDB, ElastiCache — picking the right one.',
        es: 'RDS, Aurora, DynamoDB, ElastiCache: elegir la correcta.',
      },
      concept: {
        headline: {
          en: 'Managed means AWS handles backups, patching and failover. It does not handle your schema.',
          es: 'Gestionado significa que AWS se encarga de copias, parches y conmutación. No se encarga de tu esquema.',
        },
        body: [
          {
            en: 'RDS runs standard engines (Postgres, MySQL) with the operations taken care of. Aurora is AWS’s own rewrite of those engines with faster replication and storage that grows automatically.',
            es: 'RDS ejecuta motores estándar (Postgres, MySQL) con la operación resuelta. Aurora es la reescritura propia de AWS de esos motores, con replicación más rápida y almacenamiento que crece solo.',
          },
          {
            en: 'DynamoDB is a different animal: a NoSQL key-value store with single-digit millisecond reads at any scale — provided you design your access patterns first. That constraint is the whole trade.',
            es: 'DynamoDB es otro animal: un almacén NoSQL clave-valor con lecturas de milisegundos de un dígito a cualquier escala, siempre que diseñes antes tus patrones de acceso. Esa restricción es todo el trato.',
          },
        ],
        keyPoints: [
          {
            en: 'RDS/Aurora: relational, joins, transactions, SQL you already know.',
            es: 'RDS/Aurora: relacional, joins, transacciones y el SQL que ya conoces.',
          },
          {
            en: 'DynamoDB: massive scale, predictable latency, but queries must be designed up front.',
            es: 'DynamoDB: escala masiva y latencia predecible, pero las consultas hay que diseñarlas de antemano.',
          },
          {
            en: 'ElastiCache (Redis): in-memory cache and session store, sub-millisecond.',
            es: 'ElastiCache (Redis): caché en memoria y almacén de sesiones, por debajo del milisegundo.',
          },
          {
            en: 'Multi-AZ gives you automatic failover. Read replicas give you read capacity. They are different features.',
            es: 'Multi-AZ te da conmutación automática. Las réplicas de lectura te dan capacidad de lectura. Son funciones distintas.',
          },
        ],
        example: {
          caption: { en: 'Choosing, in one breath', es: 'Elegir, en una frase' },
          code: {
            en: `Relational data, joins, reporting        -> RDS / Aurora Postgres
Huge scale, simple key lookups          -> DynamoDB
Sessions, cache, leaderboards           -> ElastiCache (Redis)
Analytics over billions of rows         -> Redshift / Athena`,
            es: `Datos relacionales, joins, informes       -> RDS / Aurora Postgres
Escala enorme, búsquedas simples por clave -> DynamoDB
Sesiones, caché, clasificaciones          -> ElastiCache (Redis)
Analítica sobre miles de millones de filas -> Redshift / Athena`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-db-1',
          prompt: {
            en: 'What is the difference between Multi-AZ and a read replica in RDS?',
            es: '¿Cuál es la diferencia entre Multi-AZ y una réplica de lectura en RDS?',
          },
          choices: [
            { en: 'They are the same', es: 'Son lo mismo' },
            {
              en: 'Multi-AZ is a standby for automatic failover; a read replica serves read traffic',
              es: 'Multi-AZ es un servidor en espera para conmutación automática; una réplica de lectura atiende tráfico de lectura',
            },
            { en: 'Multi-AZ is cheaper', es: 'Multi-AZ es más barato' },
            { en: 'Read replicas provide backups', es: 'Las réplicas de lectura hacen copias de seguridad' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'The Multi-AZ standby takes no traffic — it exists purely so failover is automatic. A read replica does take traffic but is not a failover target by default. Availability and scale are separate problems with separate features.',
            es: 'El servidor en espera de Multi-AZ no recibe tráfico: existe solo para que la conmutación sea automática. Una réplica de lectura sí recibe tráfico pero no es un destino de conmutación por defecto. Disponibilidad y escala son problemas distintos con funciones distintas.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-db-2',
          prompt: {
            en: 'When is DynamoDB a poor choice?',
            es: '¿Cuándo es DynamoDB una mala elección?',
          },
          choices: [
            { en: 'Very high traffic', es: 'Con tráfico muy alto' },
            {
              en: 'When you need ad-hoc queries and joins across entities',
              es: 'Cuando necesitas consultas improvisadas y joins entre entidades',
            },
            { en: 'Key-value lookups', es: 'Búsquedas clave-valor' },
            { en: 'Serverless applications', es: 'Aplicaciones serverless' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'DynamoDB is designed around access patterns you define in advance. A query nobody planned for means a full table scan — slow and expensive. If the business will ask unpredictable questions of the data, use SQL.',
            es: 'DynamoDB se diseña en torno a patrones de acceso que defines de antemano. Una consulta que nadie previó significa recorrer la tabla entera: lento y caro. Si el negocio va a hacer preguntas impredecibles a los datos, usa SQL.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-db-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A managed database service means you no longer need to think about backups.',
            es: 'Un servicio de base de datos gestionado significa que ya no tienes que pensar en las copias de seguridad.',
          },
          answer: false,
          explanation: {
            en: 'AWS takes the snapshots; you still choose the retention period, verify that restores actually work, and protect against the failure mode automated backups do not cover — someone dropping a table and nobody noticing for a week.',
            es: 'AWS hace las instantáneas; tú sigues eligiendo el periodo de retención, verificando que las restauraciones funcionan de verdad y protegiéndote del fallo que las copias automáticas no cubren: que alguien borre una tabla y nadie se dé cuenta en una semana.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-db-4',
          prompt: {
            en: 'What does Aurora improve over standard RDS?',
            es: '¿Qué mejora Aurora respecto a RDS estándar?',
          },
          choices: [
            { en: 'It supports more SQL syntax', es: 'Soporta más sintaxis SQL' },
            {
              en: 'Storage grows automatically and replicates across AZs, with much faster replica lag and failover',
              es: 'El almacenamiento crece solo y se replica entre zonas, con mucho menos retardo de réplica y conmutación más rápida',
            },
            { en: 'It is always cheaper', es: 'Siempre es más barato' },
            { en: 'It requires no schema', es: 'No necesita esquema' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Aurora separates compute from a distributed storage layer spread across three AZs. Replicas share that storage, so lag drops to milliseconds and failover is far quicker. It usually costs more per hour than plain RDS.',
            es: 'Aurora separa el cómputo de una capa de almacenamiento distribuida entre tres zonas. Las réplicas comparten ese almacenamiento, así el retardo baja a milisegundos y la conmutación es mucho más rápida. Suele costar más por hora que RDS a secas.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-db-5',
          prompt: {
            en: 'Where should an application store user sessions on AWS?',
            es: '¿Dónde debería una aplicación guardar las sesiones de usuario en AWS?',
          },
          choices: [
            { en: 'In each server’s local memory', es: 'En la memoria local de cada servidor' },
            {
              en: 'In ElastiCache (Redis) or a signed token, so any instance can serve any request',
              es: 'En ElastiCache (Redis) o en un token firmado, para que cualquier instancia atienda cualquier petición',
            },
            { en: 'In S3', es: 'En S3' },
            { en: 'In a local file on the instance', es: 'En un fichero local de la instancia' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Local memory breaks the moment you run more than one instance — the load balancer sends the user to a server that has never seen them. Shared session state is what makes horizontal scaling possible.',
            es: 'La memoria local se rompe en cuanto ejecutas más de una instancia: el balanceador manda al usuario a un servidor que nunca lo ha visto. El estado de sesión compartido es lo que hace posible el escalado horizontal.',
          },
        },
      ],
    },
    {
      id: 'vpc',
      title: { en: 'VPC & networking', es: 'VPC y redes' },
      icon: '🕸️',
      summary: {
        en: 'Your private network: subnets, security groups and the NAT gateway bill.',
        es: 'Tu red privada: subredes, grupos de seguridad y la factura del NAT gateway.',
      },
      concept: {
        headline: {
          en: 'A public subnet has a route to an internet gateway. A private one does not. That is the entire distinction.',
          es: 'Una subred pública tiene una ruta a un internet gateway. Una privada no. Esa es toda la diferencia.',
        },
        body: [
          {
            en: 'A VPC is your isolated network inside AWS. You divide it into subnets across AZs. What makes a subnet "public" is nothing more than a route table entry pointing at an Internet Gateway.',
            es: 'Una VPC es tu red aislada dentro de AWS. La divides en subredes repartidas entre zonas. Lo que hace "pública" a una subred no es más que una entrada en la tabla de rutas que apunta a un Internet Gateway.',
          },
          {
            en: 'The standard design: load balancers in public subnets, application servers and databases in private ones. Private resources reach the internet outbound through a NAT Gateway — which cannot be used to reach them inbound.',
            es: 'El diseño estándar: balanceadores en subredes públicas, servidores de aplicación y bases de datos en privadas. Los recursos privados salen a internet a través de un NAT Gateway, que no sirve para llegar a ellos desde fuera.',
          },
        ],
        keyPoints: [
          {
            en: 'Security group = stateful firewall on a resource, allow-only. NACL = stateless firewall on a subnet, allow and deny.',
            es: 'Grupo de seguridad = firewall con estado sobre un recurso, solo permitir. NACL = firewall sin estado sobre una subred, permitir y denegar.',
          },
          {
            en: 'A NAT Gateway lets private subnets make outbound calls. It bills per hour AND per GB.',
            es: 'Un NAT Gateway permite a las subredes privadas hacer llamadas salientes. Factura por hora Y por GB.',
          },
          {
            en: 'Databases belong in private subnets, reachable only from your app’s security group.',
            es: 'Las bases de datos van en subredes privadas, accesibles solo desde el grupo de seguridad de tu app.',
          },
          {
            en: 'A security group can reference another security group as its source — better than hardcoding IP ranges.',
            es: 'Un grupo de seguridad puede referenciar a otro como origen: mejor que fijar rangos de IP a fuego.',
          },
        ],
        example: {
          caption: {
            en: 'The standard three-tier layout',
            es: 'La distribución estándar en tres capas',
          },
          code: {
            en: `Public subnet   (AZ-a, AZ-b)   Load balancer, NAT Gateway
Private subnet  (AZ-a, AZ-b)   App servers / containers
Private subnet  (AZ-a, AZ-b)   RDS — inbound 5432 only from the app's SG`,
            es: `Subred pública  (AZ-a, AZ-b)   Balanceador, NAT Gateway
Subred privada  (AZ-a, AZ-b)   Servidores de app / contenedores
Subred privada  (AZ-a, AZ-b)   RDS — puerto 5432 solo desde el SG de la app`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-vpc-1',
          prompt: {
            en: 'What actually makes a subnet "public"?',
            es: '¿Qué hace realmente que una subred sea "pública"?',
          },
          choices: [
            { en: 'A setting called isPublic', es: 'Una opción llamada isPublic' },
            {
              en: 'A route table entry sending 0.0.0.0/0 to an Internet Gateway',
              es: 'Una entrada en la tabla de rutas que envía 0.0.0.0/0 a un Internet Gateway',
            },
            { en: 'Being in us-east-1', es: 'Estar en us-east-1' },
            { en: 'Having no security group', es: 'No tener grupo de seguridad' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'That route is the whole difference. Subnets are identical otherwise — which is why an accidental route can quietly expose resources you believed were private.',
            es: 'Esa ruta es toda la diferencia. Por lo demás las subredes son idénticas: por eso una ruta puesta por accidente puede exponer en silencio recursos que creías privados.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-vpc-2',
          prompt: {
            en: 'What is the difference between a security group and a network ACL?',
            es: '¿Cuál es la diferencia entre un grupo de seguridad y una ACL de red?',
          },
          choices: [
            { en: 'None', es: 'Ninguna' },
            {
              en: 'A security group is stateful and attaches to resources; a NACL is stateless and applies to a whole subnet',
              es: 'Un grupo de seguridad tiene estado y se asocia a recursos; una NACL no tiene estado y se aplica a una subred entera',
            },
            { en: 'NACLs are for databases only', es: 'Las NACL son solo para bases de datos' },
            {
              en: 'Security groups can deny traffic',
              es: 'Los grupos de seguridad pueden denegar tráfico',
            },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Stateful means an allowed inbound request gets its response out automatically. A NACL evaluates each direction separately, so you must allow the return traffic explicitly — the classic reason a NACL change breaks everything.',
            es: 'Tener estado significa que una petición entrante permitida obtiene su salida de respuesta automáticamente. Una NACL evalúa cada dirección por separado, así que debes permitir el tráfico de vuelta explícitamente: el motivo clásico por el que un cambio de NACL lo rompe todo.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-vpc-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'A NAT Gateway lets the internet reach your private instances.',
            es: 'Un NAT Gateway permite que internet llegue a tus instancias privadas.',
          },
          answer: false,
          explanation: {
            en: 'Exactly backwards. NAT allows private resources to make OUTBOUND connections (package updates, third-party APIs) while remaining unreachable from outside. Inbound access comes from a load balancer in a public subnet.',
            es: 'Exactamente al revés. NAT permite a los recursos privados hacer conexiones SALIENTES (actualizaciones de paquetes, APIs de terceros) sin dejar de ser inalcanzables desde fuera. El acceso entrante llega desde un balanceador en una subred pública.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-vpc-4',
          prompt: {
            en: 'What is the best source rule for the database’s security group?',
            es: '¿Cuál es la mejor regla de origen para el grupo de seguridad de la base de datos?',
          },
          choices: [
            { en: '0.0.0.0/0 on port 5432', es: '0.0.0.0/0 en el puerto 5432' },
            {
              en: 'The application tier’s security group on port 5432',
              es: 'El grupo de seguridad de la capa de aplicación en el puerto 5432',
            },
            {
              en: 'The office IP range on all ports',
              es: 'El rango de IP de la oficina en todos los puertos',
            },
            { en: 'No inbound rules at all', es: 'Ninguna regla de entrada' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Referencing the app’s security group means "whatever instances are currently running the app may connect" — no IP list to maintain as instances scale in and out, and no accidental exposure.',
            es: 'Referenciar el grupo de seguridad de la app significa "que se conecten las instancias que ahora mismo ejecuten la app": sin lista de IP que mantener según escalan las instancias y sin exposiciones accidentales.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-vpc-5',
          prompt: {
            en: 'Your bill shows a large NAT Gateway charge. What is a common fix?',
            es: 'Tu factura muestra un cargo grande de NAT Gateway. ¿Cuál es una solución habitual?',
          },
          choices: [
            { en: 'Delete the VPC', es: 'Borrar la VPC' },
            {
              en: 'Add VPC endpoints so traffic to S3 and DynamoDB bypasses the NAT',
              es: 'Añadir endpoints de VPC para que el tráfico a S3 y DynamoDB no pase por el NAT',
            },
            { en: 'Use a bigger instance', es: 'Usar una instancia más grande' },
            { en: 'Disable the load balancer', es: 'Desactivar el balanceador' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Every gigabyte a private instance pulls from S3 through a NAT Gateway is billed twice — once for NAT processing, once as transfer. A gateway VPC endpoint routes that traffic privately, and it is free.',
            es: 'Cada gigabyte que una instancia privada descarga de S3 a través de un NAT Gateway se factura dos veces: una por el procesamiento del NAT y otra como transferencia. Un endpoint de tipo gateway enruta ese tráfico de forma privada, y es gratis.',
          },
        },
        {
          kind: 'gap',
          id: 'aws-vpc-6',
          prompt: {
            en: 'Complete the database security group rule.',
            es: 'Completa la regla del grupo de seguridad de la base de datos.',
          },
          code: {
            en: `Type: PostgreSQL   Port: 5432
Source: ___`,
            es: `Tipo: PostgreSQL   Puerto: 5432
Origen: ___`,
          },
          choices: [
            {
              en: 'sg-app-tier (the application security group)',
              es: 'sg-app-tier (el grupo de seguridad de la aplicación)',
            },
            { en: '0.0.0.0/0', es: '0.0.0.0/0' },
            { en: 'The VPC CIDR', es: 'El CIDR de la VPC' },
            { en: 'Any IPv4', es: 'Cualquier IPv4' },
          ],
          answerIndex: 0,
          explanation: {
            en: 'Referencing the app tier’s security group means access follows the instances automatically as they scale in and out — no IP list to maintain and nothing exposed to the wider network.',
            es: 'Referenciar el grupo de seguridad de la capa de aplicación hace que el acceso siga a las instancias automáticamente según escalan: sin lista de IP que mantener y sin exponer nada al resto de la red.',
          },
        },
      ],
    },
    {
      id: 'cloudfront',
      title: { en: 'CloudFront & the edge', es: 'CloudFront y el borde' },
      icon: '🌍',
      summary: {
        en: 'Serving content from close to the user.',
        es: 'Servir contenido desde cerca del usuario.',
      },
      concept: {
        headline: {
          en: 'A CDN moves your content nearer the user. Physics does the rest.',
          es: 'Un CDN acerca tu contenido al usuario. La física hace el resto.',
        },
        body: [
          {
            en: 'CloudFront caches responses at hundreds of edge locations worldwide. A user in Madrid gets a file from Madrid rather than Virginia — a 90ms round trip becomes single digits.',
            es: 'CloudFront cachea respuestas en cientos de ubicaciones de borde por todo el mundo. Un usuario en Madrid recibe un fichero desde Madrid en vez de desde Virginia: un ida y vuelta de 90ms pasa a ser de un solo dígito.',
          },
          {
            en: 'It is also where you terminate TLS, attach a custom domain, block bad traffic with WAF, and cut egress costs, since CloudFront egress is cheaper than S3 or EC2 egress.',
            es: 'También es donde terminas TLS, asocias un dominio propio, bloqueas tráfico malicioso con WAF y recortas costes de salida, ya que la salida por CloudFront es más barata que la de S3 o EC2.',
          },
        ],
        keyPoints: [
          {
            en: 'An ORIGIN is where CloudFront fetches from — S3, a load balancer, or any HTTP server.',
            es: 'Un ORIGEN es de donde CloudFront obtiene el contenido: S3, un balanceador o cualquier servidor HTTP.',
          },
          {
            en: 'Cache behaviours let different paths have different rules: cache /assets/* forever, never cache /api/*.',
            es: 'Los comportamientos de caché permiten reglas distintas por ruta: cachear /assets/* para siempre y no cachear nunca /api/*.',
          },
          {
            en: 'Invalidation clears cached objects. Better: use content-hashed filenames so URLs never need invalidating.',
            es: 'La invalidación borra objetos cacheados. Mejor: usa nombres con hash del contenido para que las URLs nunca necesiten invalidarse.',
          },
          {
            en: 'Free managed TLS certificates come from ACM — but for CloudFront they must be issued in us-east-1.',
            es: 'Los certificados TLS gestionados y gratuitos vienen de ACM, pero para CloudFront deben emitirse en us-east-1.',
          },
        ],
        example: {
          caption: {
            en: 'Exactly how this app would be served',
            es: 'Exactamente cómo se serviría esta app',
          },
          code: {
            en: `Browser -> CloudFront edge -> S3 bucket (dist/)

/assets/index-a3f9.js   cache 1 year   (hashed name = immutable)
/index.html             cache 0        (must always be fresh)
/*                      -> /index.html (SPA routing fallback)`,
            es: `Navegador -> borde de CloudFront -> bucket S3 (dist/)

/assets/index-a3f9.js   caché 1 año   (nombre con hash = inmutable)
/index.html             caché 0       (siempre debe estar fresco)
/*                      -> /index.html (fallback de rutas SPA)`,
          },
        },
      },
      questions: [
        {
          kind: 'choice',
          id: 'aws-cf-1',
          prompt: {
            en: 'What is the primary benefit of a CDN?',
            es: '¿Cuál es el beneficio principal de un CDN?',
          },
          choices: [
            { en: 'It compresses your database', es: 'Comprime tu base de datos' },
            {
              en: 'Content is served from an edge location near the user, cutting latency',
              es: 'El contenido se sirve desde una ubicación de borde cercana al usuario, reduciendo la latencia',
            },
            { en: 'It replaces your backend', es: 'Sustituye a tu backend' },
            { en: 'It encrypts data at rest', es: 'Cifra los datos en reposo' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Distance is latency, and no code makes light faster. Serving from a nearby edge is often the single biggest perceived-performance win available to a global app.',
            es: 'La distancia es latencia, y ningún código hace más rápida la luz. Servir desde un borde cercano suele ser la mayor mejora de rendimiento percibido disponible para una app global.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cf-2',
          prompt: {
            en: 'Why is a content hash in the filename better than invalidating the CDN cache?',
            es: '¿Por qué es mejor un hash del contenido en el nombre del fichero que invalidar la caché del CDN?',
          },
          choices: [
            {
              en: 'Invalidations are slow and cost money; a new hash is simply a new URL that was never cached',
              es: 'Las invalidaciones son lentas y cuestan dinero; un hash nuevo es sencillamente una URL nueva que nunca se cacheó',
            },
            { en: 'Hashes are shorter', es: 'Los hashes son más cortos' },
            { en: 'Invalidation does not work', es: 'La invalidación no funciona' },
            {
              en: 'Browsers ignore invalidations',
              es: 'Los navegadores ignoran las invalidaciones',
            },
          ],
          answerIndex: 0,
          explanation: {
            en: 'Change the content and the filename changes, so the request is for a URL the cache has never seen — instantly correct everywhere. Invalidation is a slower, chargeable workaround for when you cannot hash.',
            es: 'Si cambia el contenido cambia el nombre, así que la petición es de una URL que la caché nunca ha visto: correcto al instante en todas partes. La invalidación es un apaño más lento y con coste para cuando no puedes usar hash.',
          },
        },
        {
          kind: 'boolean',
          id: 'aws-cf-3',
          prompt: { en: 'True or false?', es: '¿Verdadero o falso?' },
          statement: {
            en: 'CloudFront can only serve static files from S3.',
            es: 'CloudFront solo puede servir ficheros estáticos desde S3.',
          },
          answer: false,
          explanation: {
            en: 'Any HTTP origin works — an Application Load Balancer, API Gateway, even a server outside AWS. Many setups route /api/* to a dynamic origin uncached and /* to S3 cached, all under one domain.',
            es: 'Sirve cualquier origen HTTP: un Application Load Balancer, API Gateway o incluso un servidor fuera de AWS. Muchos montajes enrutan /api/* a un origen dinámico sin cachear y /* a S3 cacheado, todo bajo un mismo dominio.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cf-4',
          prompt: {
            en: 'Where must an ACM certificate be issued to be used with CloudFront?',
            es: '¿Dónde debe emitirse un certificado de ACM para usarlo con CloudFront?',
          },
          choices: [
            {
              en: 'The same region as the origin',
              es: 'En la misma región que el origen',
            },
            { en: 'us-east-1', es: 'us-east-1' },
            { en: 'Any region', es: 'En cualquier región' },
            { en: 'eu-west-1', es: 'eu-west-1' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'CloudFront is a global service whose control plane lives in us-east-1, so its certificates must be there. Requesting one in your local region and finding it unselectable is a rite of passage.',
            es: 'CloudFront es un servicio global cuyo plano de control vive en us-east-1, así que sus certificados deben estar ahí. Pedir uno en tu región local y descubrir que no se puede seleccionar es un rito de iniciación.',
          },
        },
        {
          kind: 'choice',
          id: 'aws-cf-5',
          prompt: {
            en: 'Beyond latency, what does putting CloudFront in front of your origin protect against?',
            es: 'Además de la latencia, ¿de qué te protege poner CloudFront delante de tu origen?',
          },
          choices: [
            { en: 'SQL injection', es: 'La inyección SQL' },
            {
              en: 'Traffic spikes and DDoS — the edge absorbs load your origin never sees',
              es: 'Picos de tráfico y DDoS: el borde absorbe carga que tu origen nunca ve',
            },
            { en: 'Data loss', es: 'La pérdida de datos' },
            { en: 'Expired certificates', es: 'Los certificados caducados' },
          ],
          answerIndex: 1,
          explanation: {
            en: 'Cached responses are served at the edge, so a viral moment or a flood never reaches your servers. AWS Shield Standard is included, and WAF can be attached for filtering malicious requests.',
            es: 'Las respuestas cacheadas se sirven en el borde, así que un momento viral o una avalancha nunca llegan a tus servidores. AWS Shield Standard está incluido y puedes añadir WAF para filtrar peticiones maliciosas.',
          },
        },
      ],
    },
  ],
}
