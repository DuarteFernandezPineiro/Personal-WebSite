import type { AboutProfile, Capability, Credential, Hobby, Project, SiteProfile, TimelineEntry } from "./types";

const l = (es: string, en: string) => ({ es, en });

export const profile: SiteProfile = {
  name: "Duarte Fernández Piñeiro",
  shortName: "DFP",
  role: l("Ingeniero de Inteligencia Artificial", "Artificial Intelligence Engineer"),
  hero: l(
    "Graduado de la primera promoción de Inteligencia Artificial por la ESEI, apasionado por la tecnología y siempre atento a sus continuos avances.",
    "Graduate of ESEI’s first Artificial Intelligence class, passionate about technology and always following its continuous evolution."
  ),
  intro: l(
    "Formo parte de la primera promoción de graduados en Inteligencia Artificial de la ESEI. He trabajado con recuperación de información, NLP, visión artificial, modelos de machine learning, agentes y LLM, desde la experimentación hasta la API, la interfaz y el despliegue.",
    "I am part of ESEI’s first graduating class in Artificial Intelligence. I have worked with information retrieval, NLP, computer vision, machine-learning models, agents and LLMs, from experimentation through to the API, interface and deployment."
  ),
  location: l("Santiago de Compostela · Galicia", "Santiago de Compostela · Galicia, Spain"),
  availability: l("Disponible para nuevas oportunidades", "Open to new opportunities"),
  email: "dfernandezpineiro@gmail.com",
  linkedin: "https://www.linkedin.com/in/dfernandezpineiro",
  github: "https://github.com/DuarteFernandezPineiro"
};

export const about: AboutProfile = {
  lead: l(
    "Soy ingeniero de Inteligencia Artificial, sociable, positivo y resolutivo. Me gusta comprender bien los problemas, explicar con claridad lo que estoy haciendo y trabajar con perfiles técnicos y no técnicos.",
    "I am an Artificial Intelligence engineer who is sociable, positive and practical. I like to understand problems properly, explain my work clearly and collaborate with both technical and non-technical people."
  ),
  story: [
    l(
      "Elegí Inteligencia Artificial porque reúne dos cosas que me atraen especialmente: comprender problemas complejos y construir algo útil con ese conocimiento. Durante el grado he trabajado con aprendizaje automático, recuperación de información, NLP, visión artificial, sistemas multiagente e ingeniería de software.",
      "I chose Artificial Intelligence because it brings together two things that strongly motivate me: understanding complex problems and building something useful from that knowledge. During my degree I worked across machine learning, information retrieval, NLP, computer vision, multi-agent systems and software engineering."
    ),
    l(
      "Mi interés principal está en la IA aplicada. Disfruto conectando modelos, agentes y fuentes de conocimiento, pero también midiendo costes, reduciendo contexto innecesario, validando resultados y diseñando una interfaz que haga visible lo que el sistema está haciendo.",
      "My main interest is applied AI. I enjoy connecting models, agents and knowledge sources, but also measuring cost, reducing unnecessary context, validating results and designing an interface that makes the system’s behaviour visible."
    ),
    l(
      "En equipo soy sociable, positivo y directo. Me resulta fácil adaptarme a perfiles distintos, hablar en público y leer el contexto de una conversación. Cuando aparece un problema mantengo la calma, separo lo urgente de lo importante y avanzo hacia una solución práctica.",
      "In a team I am sociable, positive and direct. I find it easy to adapt to different profiles, speak in public and read the room. When a problem appears, I stay calm, separate the urgent from the important and move towards a practical solution."
    )
  ],
  proposition: l(
    "Antes de elegir una técnica intento entender el problema, los datos disponibles, cómo se comprobará el resultado y quién utilizará la solución.",
    "Before choosing a technique, I try to understand the problem, the available data, how the result will be checked and who will use the solution."
  ),
  strengths: [
    {
      index: "01",
      title: l("Trabajo técnico", "Technical work"),
      description: l(
        "Combino RAG, LLM, agentes y modelos clásicos atendiendo a precisión, coste, velocidad, trazabilidad y límites reales.",
        "I combine RAG, LLMs, agents and classical models while considering accuracy, cost, speed, traceability and real limitations."
      )
    },
    {
      index: "02",
      title: l("Comunicación y equipo", "Communication and teamwork"),
      description: l(
        "Sé explicar una arquitectura, presentar en público y adaptar la conversación a perfiles técnicos, de negocio o de producto.",
        "I can explain an architecture, present in public and adapt the conversation to technical, business or product audiences."
      )
    },
    {
      index: "03",
      title: l("Constancia", "Consistency"),
      description: l(
        "Trabajo con calma y disciplina: divido el problema, valido lo que funciona y mantengo el ritmo hasta entregar un resultado sólido.",
        "I work with calm discipline: break down the problem, validate what works and maintain momentum until a solid result is delivered."
      )
    }
  ],
  sport: l(
    "Compito en atletismo y también practico ciclismo, surf y senderismo. Entreno de forma constante y disfruto tanto de la competición como de las actividades al aire libre. El deporte forma parte de mi rutina y ha reforzado mi disciplina, concentración y capacidad para mantener la calma cuando hay presión.",
    "I compete in athletics and also practise cycling, surfing and hiking. I train consistently and enjoy both competition and outdoor activities. Sport is part of my routine and has strengthened my discipline, focus and ability to stay calm under pressure."
  )
};

export const projects: Project[] = [
  {
    slug: "rag-hibrido-documentacion",
    order: 1,
    featured: true,
    year: "2026",
    status: "completed",
    category: l("IA generativa · Recuperación", "Generative AI · Retrieval"),
    title: l("RAG híbrido para documentación corporativa", "Hybrid RAG for corporate documentation"),
    eyebrow: l("Trabajo de Fin de Grado", "Bachelor’s thesis"),
    summary: l(
      "Un RAG auditable construido de extremo a extremo: procesa documentación heterogénea, combina BM25 y búsqueda vectorial, rerankea la evidencia y conserva trazabilidad hasta la página para que cada respuesta pueda verificarse.",
      "An auditable, end-to-end RAG system: it processes heterogeneous documents, combines BM25 with vector search, reranks evidence and preserves page-level traceability so every answer can be verified."
    ),
    problem: l(
      "Consultar documentación corporativa heterogénea exigía reducir búsquedas manuales sin perder la evidencia que permite verificar cada respuesta.",
      "Querying heterogeneous corporate documentation required reducing manual search without losing the evidence needed to verify each answer."
    ),
    role: l(
      "Diseñé e implementé el flujo completo: extracción por página, limpieza, metadatos, chunking, índices, fusión, reranking, generación y validación.",
      "I designed and implemented the complete pipeline: page extraction, cleaning, metadata, chunking, indexes, fusion, reranking, generation and validation."
    ),
    decisions: [
      l("Separar el procesamiento offline de la consulta online para poder reconstruir y auditar cada fase.", "Separate offline processing from online querying so every stage can be rebuilt and audited."),
      l("Combinar BM25 y ChromaDB mediante Reciprocal Rank Fusion en lugar de depender de un único recuperador.", "Combine BM25 and ChromaDB through Reciprocal Rank Fusion instead of relying on one retriever."),
      l("Mantener procedencia explícita en todos los fragmentos y aplicar Jina Reranker antes de generar.", "Keep explicit provenance on every chunk and apply Jina Reranker before generation.")
    ],
    results: [
      l("Pipeline reproducible con artefactos persistentes y reindexación selectiva.", "Reproducible pipeline with persistent artifacts and selective reindexing."),
      l("Respuestas fundamentadas con fuentes identificables y una interfaz de consulta local.", "Grounded answers with identifiable sources and a local query interface."),
      l("Validación automatizada de contratos, recuperación y comportamiento del sistema.", "Automated validation of contracts, retrieval and system behavior.")
    ],
    architecture: [
      l("Extracción visual página a página y conversión a Markdown jerárquico para documentos con maquetaciones heterogéneas.", "Page-by-page visual extraction into hierarchical Markdown for documents with heterogeneous layouts."),
      l("Chunking semántico con rutas de sección, páginas, procedencia, nivel de seguridad y representaciones específicas para búsqueda léxica y vectorial.", "Semantic chunking with section paths, pages, provenance, security level and representations tailored to lexical and vector search."),
      l("Índices persistentes BM25 y ChromaDB, búsqueda paralela, fusión RRF y reranking de los mejores candidatos antes de generar.", "Persistent BM25 and ChromaDB indexes, parallel retrieval, RRF fusion and reranking of the strongest candidates before generation."),
      l("Contexto numerado y respuesta en streaming con citas, fuentes, puntuaciones y diagnósticos visibles en una interfaz local.", "Numbered context and streamed answers with citations, sources, scores and visible diagnostics in a local interface.")
    ],
    validation: l(
      "La suite cubre extracción, metadatos, limpieza, chunking, BM25, embeddings, recuperación híbrida y generación con clientes simulados. También preparé lotes de preguntas para inspeccionar la evidencia recuperada y comparar BM25, embeddings, RRF y reranking. Las cifras prueban la ejecución del pipeline; no se presentan como una garantía universal de precisión.",
      "The suite covers extraction, metadata, cleaning, chunking, BM25, embeddings, hybrid retrieval and generation using simulated clients. I also prepared question batches to inspect retrieved evidence and compare BM25, embeddings, RRF and reranking. The figures demonstrate pipeline execution; they are not presented as a universal accuracy guarantee."
    ),
    learning: l(
      "La calidad final de un RAG no depende solo del LLM. Una extracción deficiente, una tabla fragmentada sin contexto o una recuperación débil condicionan todo lo que ocurre después. Diseñar trazabilidad desde la ingesta fue tan importante como elegir el modelo generativo.",
      "The final quality of a RAG system does not depend on the LLM alone. Poor extraction, a table split without context or weak retrieval constrains everything downstream. Designing traceability from ingestion was as important as choosing the generative model."
    ),
    scope: l(
      "TFG y prototipo funcional desarrollado sobre documentación corporativa real. No se presenta como un sistema RAG operando actualmente en producción.",
      "Bachelor’s thesis and functional prototype developed with real corporate documentation. It is not presented as a RAG system currently operating in production."
    ),
    video: {
      youtubeId: "5Gklw2n4dSs",
      title: l("Fases y estructura de un RAG explicadas", "The stages and structure of a RAG system"),
      description: l(
        "Presentación de 26 minutos en la que explico la arquitectura completa, los problemas encontrados y las decisiones tomadas durante el desarrollo.",
        "A 26-minute presentation in which I explain the complete architecture, the problems encountered and the decisions made during development."
      )
    },
    technologies: ["Python", "BM25", "ChromaDB", "RRF", "Jina Reranker", "PyMuPDF", "Pydantic", "OpenAI API"],
    metrics: [
      { value: "109", label: l("documentos procesados", "documents processed"), evidence: "TFG" },
      { value: "2.913", label: l("fragmentos trazables", "traceable chunks"), evidence: "TFG" },
      { value: "57", label: l("pruebas automatizadas", "automated tests"), evidence: "TFG" }
    ],
    links: [
      { label: l("Ver repositorio", "View repository"), href: "https://github.com/DuarteFernandezPineiro/RAG-empresarial-TFG", kind: "code" },
      { label: l("Ver presentación", "Watch presentation"), href: "https://youtu.be/5Gklw2n4dSs", kind: "external" }
    ]
  },
  {
    slug: "twinphoto",
    order: 2,
    featured: true,
    year: "2026",
    status: "completed",
    category: l("Visión artificial · Producto", "Computer vision · Product"),
    title: l("TwinPhoto", "TwinPhoto"),
    eyebrow: l("Aplicación de escritorio", "Desktop application"),
    summary: l(
      "Un producto de escritorio que combina hashing perceptual, un índice incremental en SQLite, procesamiento paralelo y un puente nativo en Rust para revisar y eliminar duplicados con seguridad, incluso en móviles conectados por USB.",
      "A desktop product combining perceptual hashing, an incremental SQLite index, parallel processing and a native Rust bridge to review and safely remove duplicates—even from USB-connected phones."
    ),
    problem: l(
      "Las colecciones grandes de imágenes convierten la comparación directa en un proceso lento y hacen especialmente delicado el borrado en dispositivos móviles.",
      "Large photo collections make direct comparison slow, while deletion on mobile devices is particularly sensitive."
    ),
    role: l(
      "Diseñé el producto, el pipeline de similitud, la persistencia incremental, la interfaz y el puente nativo para Windows Portable Devices.",
      "I designed the product, similarity pipeline, incremental persistence, interface and native Windows Portable Devices bridge."
    ),
    decisions: [
      l("Usar hashing perceptual de 64 bits para reducir drásticamente el espacio de comparación.", "Use 64-bit perceptual hashing to drastically reduce the comparison space."),
      l("Persistir huellas en SQLite y recalcular solo archivos nuevos o modificados.", "Persist fingerprints in SQLite and recompute only new or modified files."),
      l("Implementar operaciones WPD críticas en Rust y verificar los lotes antes de borrar.", "Implement critical WPD operations in Rust and verify batches before deletion.")
    ],
    results: [
      l("Análisis paralelo e incremental apto para bibliotecas grandes.", "Parallel and incremental analysis suitable for large libraries."),
      l("Sincronización y borrado por lotes en móviles USB con comprobaciones explícitas.", "Batch synchronization and deletion on USB phones with explicit checks."),
      l("Distribución instalable para Windows.", "Installable Windows distribution.")
    ],
    architecture: [
      l("Escaneo local y generación de una huella perceptual compacta por imagen para comparar contenido visual y no solo nombres de archivo.", "Local scanning and generation of a compact perceptual fingerprint per image to compare visual content rather than filenames alone."),
      l("Persistencia de huellas y metadatos en SQLite para reutilizar trabajo previo y procesar únicamente archivos nuevos o modificados.", "Fingerprint and metadata persistence in SQLite to reuse previous work and process only new or modified files."),
      l("Agrupación de coincidencias y revisión visual antes de cualquier operación destructiva.", "Match grouping and visual review before any destructive operation."),
      l("Puente nativo en Rust para interactuar con dispositivos Windows Portable Devices conectados por USB.", "A native Rust bridge to interact with USB-connected Windows Portable Devices.")
    ],
    validation: l(
      "El flujo separa detección, revisión y borrado para que una similitud no se convierta automáticamente en una eliminación. Las operaciones por lotes se verifican antes de ejecutarse y el índice incremental evita repetir el análisis completo.",
      "The flow separates detection, review and deletion so a similarity match never becomes an automatic removal. Batch operations are verified before execution and the incremental index avoids repeating the full analysis."
    ),
    learning: l(
      "En un producto que toca archivos personales, la precisión técnica no basta: la interfaz debe comunicar por qué dos imágenes se consideran similares y mantener siempre la decisión final en manos del usuario.",
      "In a product that touches personal files, technical accuracy is not enough: the interface must explain why two images are considered similar and always keep the final decision with the user."
    ),
    scope: l(
      "Aplicación de escritorio para Windows. El repositorio público documenta el producto; la distribución descargable se añadirá cuando exista una release pública verificada.",
      "Windows desktop application. The public repository documents the product; a download will be added when a verified public release exists."
    ),
    technologies: ["Python", "NumPy", "SQLite", "Tkinter", "Rust", "WPD"],
    metrics: [
      { value: "64-bit", label: l("hash perceptual", "perceptual hash"), evidence: "CV" },
      { value: "O(n)", label: l("indexación incremental", "incremental indexing"), evidence: "project docs" },
      { value: "2", label: l("entornos: PC y móvil", "targets: PC and mobile"), evidence: "CV" }
    ],
    links: [
      { label: l("Ver repositorio", "View repository"), href: "https://github.com/DuarteFernandezPineiro/TwinPhoto", kind: "code" }
    ]
  },
  {
    slug: "bitcoin-sentiment",
    order: 3,
    featured: true,
    year: "2026",
    status: "deployed",
    category: l("Machine learning · NLP", "Machine learning · NLP"),
    title: l("Sentimiento aplicado a Bitcoin", "Bitcoin sentiment analysis"),
    eyebrow: l("Modelo y API explicativa", "Model and explanatory API"),
    summary: l(
      "Un pipeline experimental para una señal especialmente ruidosa: transforma texto en embeddings semánticos, combina dos ensembles LightGBM y convierte cada clasificación en una explicación con confianza, señales y límites visibles.",
      "An experimental pipeline for an especially noisy signal: it turns text into semantic embeddings, combines two LightGBM ensembles and translates each classification into an explanation with visible confidence, signals and limitations."
    ),
    problem: l(
      "Una etiqueta positiva o negativa aislada aporta poco valor si no se explican la confianza, las señales y los límites del modelo.",
      "A positive or negative label offers little value without explaining confidence, signals and model limitations."
    ),
    role: l(
      "Preparé los datos, entrené y comparé el pipeline, optimicé el umbral sobre validación y expuse el modelo mediante FastAPI.",
      "I prepared the data, trained and compared the pipeline, optimized the validation threshold and exposed the model with FastAPI."
    ),
    decisions: [
      l("Separar validación y test antes de ajustar el umbral de decisión.", "Separate validation and test before tuning the decision threshold."),
      l("Usar embeddings de Sentence Transformers y un ensemble LightGBM.", "Use Sentence Transformers embeddings and a LightGBM ensemble."),
      l("Comunicar probabilidad y limitaciones en vez de presentar la salida como consejo financiero.", "Communicate probability and limitations rather than present output as financial advice.")
    ],
    results: [
      l("Rendimiento equilibrado en test y experiencia web desplegada.", "Balanced test performance and a deployed web experience."),
      l("API capaz de acompañar cada inferencia con contexto comprensible.", "An API that pairs each inference with understandable context.")
    ],
    architecture: [
      l("Codificación del mensaje con Sentence Transformers para obtener una representación semántica reutilizable por los clasificadores.", "Message encoding with Sentence Transformers to obtain a semantic representation shared by the classifiers."),
      l("Dos ensembles LightGBM organizados como una decisión en dos etapas, cada uno con su umbral persistido y validado.", "Two LightGBM ensembles arranged as a two-stage decision, each with its own persisted and validated threshold."),
      l("FastAPI sirve la interfaz y la API desde el mismo servicio; los modelos y el embedding se cargan en servidor y nunca se exponen al navegador.", "FastAPI serves the interface and API from the same service; models and embeddings load server-side and are never exposed to the browser."),
      l("OpenAI puede redactar la explicación final, con una respuesta local determinista disponible cuando la API no está configurada.", "OpenAI can write the final explanation, with a deterministic local fallback available when the API is not configured.")
    ],
    validation: l(
      "Separé validación y test antes de ajustar los umbrales. Las pruebas de API cubren salud, carga del runtime, las ramas de decisión y el fallback sin OpenAI. El contenedor incorpora el modelo de embeddings durante el build para que Cloud Run no dependa de Hugging Face al arrancar.",
      "I separated validation and test before tuning thresholds. API tests cover health, runtime loading, decision branches and the no-OpenAI fallback. The container downloads the embedding model during build so Cloud Run does not depend on Hugging Face at startup."
    ),
    learning: l(
      "El reto no era mostrar una etiqueta, sino convertir una salida probabilística en una experiencia responsable. Por eso la interfaz separa análisis experimental de recomendación financiera y comunica explícitamente sus límites.",
      "The challenge was not displaying a label, but turning a probabilistic output into a responsible experience. The interface therefore separates experimental analysis from financial advice and states its limits explicitly."
    ),
    scope: l(
      "Proyecto educativo experimental: analiza un mensaje en inglés relacionado con Bitcoin. No predice precios y no ofrece asesoramiento financiero.",
      "Experimental educational project: it analyses one English Bitcoin-related message. It does not predict prices or provide financial advice."
    ),
    technologies: ["Python", "Sentence Transformers", "LightGBM", "scikit-learn", "FastAPI"],
    metrics: [
      { value: "87,5%", label: l("accuracy en test", "test accuracy"), evidence: "CV" },
      { value: "88,1%", label: l("F1 en test", "test F1"), evidence: "CV" },
      { value: "Live", label: l("demo pública", "public demo"), evidence: "deployment" }
    ],
    links: [
      { label: l("Abrir demo", "Open demo"), href: "https://bitcoin-decision-chat-674899194994.europe-southwest1.run.app/", kind: "demo" },
      { label: l("Ver repositorio", "View repository"), href: "https://github.com/DuarteFernandezPineiro/bitcoin-decision-chat", kind: "code" }
    ]
  },
  {
    slug: "asistente-profesional",
    order: 4,
    featured: true,
    year: "2026",
    status: "deployed",
    category: l("GenAI · Backend", "GenAI · Backend"),
    title: l("Asistente profesional para entrevistas", "Professional interview assistant"),
    eyebrow: l("Producto de IA desplegado", "Deployed AI product"),
    summary: l(
      "Un asistente de IA generativa concebido como servicio público, no como una demo aislada: recuperación controlada, streaming NDJSON, sesiones, cola, límites de uso y saneado de privacidad en una experiencia conversacional.",
      "A generative AI assistant designed as a public service rather than an isolated demo: controlled retrieval, NDJSON streaming, sessions, queueing, usage limits and privacy sanitisation in one conversational experience."
    ),
    problem: l(
      "Un CV estático obliga a todos los entrevistadores a seguir la misma profundidad y no demuestra cómo construyo un producto de IA generativa.",
      "A static resume forces every interviewer into the same level of detail and does not demonstrate how I build a generative AI product."
    ),
    role: l(
      "Diseñé y desarrollé backend, recuperación documental, herramientas del modelo, streaming, sesiones, interfaz, seguridad, pruebas y despliegue.",
      "I designed and developed the backend, document retrieval, model tools, streaming, sessions, interface, security, tests and deployment."
    ),
    decisions: [
      l("Conservar el historial en servidor y limitar el contexto enviado al modelo.", "Keep conversation history on the server and limit context sent to the model."),
      l("Forzar selección de fuentes antes de responder y sanear la salida en streaming.", "Require source selection before answering and sanitize streamed output."),
      l("Controlar concurrencia, cola y tasa de peticiones para proteger coste y disponibilidad.", "Control concurrency, queueing and request rate to protect cost and availability.")
    ],
    results: [
      l("Conversaciones contextuales con tres niveles de detalle y cancelación.", "Contextual conversations with three detail levels and cancellation."),
      l("Respuestas parciales recuperables y referencias de error sin filtrar información interna.", "Recoverable partial answers and error references without leaking internals."),
      l("Servicio Docker desplegado con analítica opcional basada en consentimiento.", "Docker service deployed with optional consent-based analytics.")
    ],
    architecture: [
      l("Catálogo estructurado y documentos Markdown controlados; el modelo debe seleccionar fuentes antes de redactar la respuesta.", "A structured catalogue and controlled Markdown documents; the model must select sources before drafting an answer."),
      l("FastAPI mantiene sesiones efímeras en servidor, limita el historial y transmite eventos NDJSON para estado, texto, métricas y errores.", "FastAPI maintains ephemeral server-side sessions, limits history and streams NDJSON events for status, text, metrics and errors."),
      l("Cola FIFO con dos generaciones simultáneas, límites por IP y presupuesto mensual para proteger disponibilidad y coste.", "A FIFO queue with two concurrent generations, per-IP limits and a monthly budget to protect availability and cost."),
      l("Saneado incremental de la salida, cookies HttpOnly y analítica agregada únicamente tras consentimiento.", "Incremental output sanitisation, HttpOnly cookies and aggregate analytics only after consent.")
    ],
    validation: l(
      "La suite verifica contratos del chat, selección documental, sesiones, reinicio, cancelación, continuación tras respuestas incompletas, concurrencia, cola, rate limiting, presupuesto y saneado de datos personales. También prueba el adaptador CMS y su última copia válida.",
      "The suite verifies chat contracts, document selection, sessions, reset, cancellation, continuation after incomplete responses, concurrency, queueing, rate limits, budget controls and personal-data sanitisation. It also tests the CMS adapter and its last-known-good copy."
    ),
    learning: l(
      "Publicar un chatbot implica diseñar el sistema que rodea al modelo: qué puede leer, cuánto contexto recibe, cómo se controla el coste, qué ocurre cuando falla y qué información nunca debe aparecer en una respuesta.",
      "Publishing a chatbot means designing the system around the model: what it may read, how much context it receives, how cost is controlled, what happens when it fails and what information must never appear in an answer."
    ),
    scope: l(
      "Producto público para explorar mi perfil profesional. Las sesiones viven en memoria de una única instancia; escalar horizontalmente requeriría un almacén compartido.",
      "Public product for exploring my professional profile. Sessions live in one instance’s memory; horizontal scaling would require shared storage."
    ),
    technologies: ["Python", "FastAPI", "OpenAI Responses API", "JavaScript", "Docker", "DigitalOcean"],
    metrics: [
      { value: "37", label: l("pruebas del servicio", "service tests"), evidence: "local test suite" },
      { value: "2", label: l("generaciones simultáneas", "concurrent generations"), evidence: "service config" },
      { value: "20", label: l("consultas en cola", "queued requests"), evidence: "service config" }
    ],
    links: [
      { label: l("Abrir versión actual", "Open current version"), href: "https://asistente-personal-contratacion-9i9eg.ondigitalocean.app/", kind: "demo" },
      { label: l("Ver repositorio", "View repository"), href: "https://github.com/DuarteFernandezPineiro/Chat-Profesional-para-Entrevistas-/tree/feat/public-koyeb-deployment", kind: "code" }
    ]
  }
];

export const timeline: TimelineEntry[] = [
  {
    period: "2026",
    title: l("Prácticas de IA y Analítica de Datos", "AI and Data Analytics Internship"),
    organization: l("AHORA Enterprise", "AHORA Enterprise"),
    description: l(
      "Prácticas curriculares y extracurriculares en las que trasladé IA y analítica de datos a casos empresariales: sistemas RAG, automatización documental, Power BI y evaluación de alternativas eficientes para soluciones con LLM.",
      "A curricular and extracurricular internship where I applied AI and data analytics to business use cases: RAG systems, document automation, Power BI and the evaluation of efficient alternatives for LLM solutions."
    ),
    details: [
      {
        title: l("Adaptación a procesos reales", "Adapting to real processes"),
        description: l(
          "Primero aprendí el software, los flujos de trabajo y la estructura de datos de la empresa. A partir de esa base participé en automatizaciones para asignar temas y detectar, extraer y clasificar información de facturas, siempre integrándome en procesos ya existentes.",
          "I first learned the company’s software, workflows and data structure. From that foundation, I contributed to automation for topic assignment and for detecting, extracting and classifying invoice information, always working within existing processes."
        )
      },
      {
        title: l("Sistema RAG empresarial", "Enterprise RAG system"),
        description: l(
          "La línea principal fue proponer, desarrollar y evolucionar un sistema RAG para consultar documentación corporativa heterogénea. Trabajé el procesamiento de documentos, la recuperación de evidencia, la generación de respuestas fundamentadas y una interfaz que facilitase la consulta y la verificación.",
          "The main workstream involved proposing, developing and evolving a RAG system for querying heterogeneous corporate documentation. I worked on document processing, evidence retrieval, grounded answer generation and an interface designed to make querying and verification easier."
        )
      },
      {
        title: l("Analítica y eficiencia", "Analytics and efficiency"),
        description: l(
          "También desarrollé dashboards en Power BI, participé en migraciones desde Qlik e investigué modelos semánticos reutilizables. Paralelamente evalué modelos locales, alternativas de código abierto, costes de infraestructura y agentes aplicados al análisis y la predicción de ventas.",
          "I also developed Power BI dashboards, contributed to migrations from Qlik and researched reusable semantic models. In parallel, I evaluated local models, open-source alternatives, infrastructure costs and agents applied to sales analysis and forecasting."
        )
      }
    ]
  },
  {
    period: "2022—2026",
    title: l("Grado en Inteligencia Artificial", "Degree in Artificial Intelligence"),
    organization: l("ESEI · Universidade de Vigo", "ESEI · University of Vigo"),
    description: l(
      "Formación multidisciplinar como parte de la primera promoción del grado: matemáticas, software, datos, machine learning, NLP, visión artificial, sistemas distribuidos, agentes e IA responsable.",
      "Multidisciplinary training as part of the degree’s first graduating class: mathematics, software, data, machine learning, NLP, computer vision, distributed systems, agents and responsible AI."
    ),
    details: [
      {
        title: l("Fundamentos técnicos", "Technical foundations"),
        description: l(
          "Construí una base sólida en álgebra, cálculo, estadística, probabilidad y optimización, junto con programación, estructuras de datos, algoritmos, pruebas e ingeniería de software. Esto me permite comprender tanto el comportamiento de un modelo como el sistema que lo lleva a producción.",
          "I built a strong foundation in algebra, calculus, statistics, probability and optimisation, together with programming, data structures, algorithms, testing and software engineering. This allows me to understand both model behaviour and the system that supports it."
        )
      },
      {
        title: l("Especialización en IA", "AI specialisation"),
        description: l(
          "Trabajé aprendizaje supervisado y no supervisado, deep learning, IA simbólica, razonamiento con incertidumbre, NLP, recuperación de información, visión artificial, sistemas expertos y agentes. Cada área se llevó a ejercicios o proyectos donde había que preparar datos, elegir métodos y evaluar resultados.",
          "I worked across supervised and unsupervised learning, deep learning, symbolic AI, reasoning under uncertainty, NLP, information retrieval, computer vision, expert systems and agents. Each area was applied through exercises or projects involving data preparation, method selection and evaluation."
        )
      },
      {
        title: l("Visión de sistema", "A systems perspective"),
        description: l(
          "La formación se completó con bases de datos, Big Data, cloud, concurrencia, paralelismo, IoT, ciberseguridad, ética y legislación. Las prácticas y el TFG reunieron esas piezas en proyectos completos, desde el análisis del problema hasta la validación y la comunicación técnica.",
          "The programme also covered databases, Big Data, cloud, concurrency, parallelism, IoT, cybersecurity, ethics and legislation. My internship and thesis brought these pieces together in complete projects, from problem analysis through validation and technical communication."
        )
      }
    ]
  }
];

export const credentials: Credential[] = [
  {
    id: "ai-degree",
    kind: "degree",
    title: l("Grado en Inteligencia Artificial", "Bachelor’s Degree in Artificial Intelligence"),
    issuer: l("ESEI · Universidade de Vigo", "ESEI · University of Vigo"),
    period: l("2022—2026", "2022—2026"),
    description: l(
      "Título universitario cursado como parte de la primera promoción del grado, con formación en software, datos, aprendizaje automático, lenguaje, visión, agentes y sistemas distribuidos.",
      "University degree completed as part of the programme’s first graduating class, covering software, data, machine learning, language, vision, agents and distributed systems."
    )
  },
  {
    id: "delf-b1",
    kind: "language",
    title: l("DELF B1 · Francés", "DELF B1 · French"),
    issuer: l("Ministerio de Educación Nacional de Francia", "French Ministry of National Education"),
    period: l("Nivel B1 certificado", "Certified B1 level"),
    description: l(
      "Certificación oficial que acredita comprensión y comunicación autónoma en francés en situaciones habituales.",
      "Official certification demonstrating independent French comprehension and communication in everyday situations."
    )
  },
  {
    id: "microsoft-foundry-chat-app",
    kind: "applied-skill",
    title: l(
      "Microsoft Applied Skills: Develop a Generative AI Chat App Using the Microsoft Foundry SDK",
      "Microsoft Applied Skills: Develop a Generative AI Chat App Using the Microsoft Foundry SDK"
    ),
    issuer: l("Microsoft", "Microsoft"),
    period: l("Expedición · agosto de 2026", "Issued · August 2026"),
    description: l(
      "Acreditación práctica centrada en el desarrollo de una aplicación de chat de IA generativa con Microsoft Foundry SDK.",
      "Practical credential focused on developing a generative AI chat application with the Microsoft Foundry SDK."
    ),
    credentialId: "E0A6793EE57A22FF"
  }
];

export const capabilities: Capability[] = [
  {
    id: "mathematics",
    index: "01",
    title: l("Matemáticas y optimización", "Mathematics and optimisation"),
    description: l(
      "Base para formular problemas, interpretar datos, validar modelos y optimizar funciones objetivo.",
      "A foundation for formulating problems, interpreting data, validating models and optimising objective functions."
    ),
    tools: ["Álgebra lineal", "Estadística", "Probabilidad", "Optimización"],
    toolsEn: ["Linear algebra", "Statistics", "Probability", "Optimisation"]
  },
  {
    id: "software",
    index: "02",
    title: l("Programación y software", "Programming and software"),
    description: l(
      "Programación modular y funcional, estructuras de datos, algoritmos, pruebas, calidad y mantenimiento de software.",
      "Modular and functional programming, data structures, algorithms, testing, quality and software maintenance."
    ),
    tools: ["Python", "Java", "Algoritmos", "Testing", "Git"],
    toolsEn: ["Python", "Java", "Algorithms", "Testing", "Git"]
  },
  {
    id: "data",
    index: "03",
    title: l("Datos e infraestructura", "Data and infrastructure"),
    description: l(
      "Diseño relacional, SQL y NoSQL, procesamiento masivo, flujos de datos, contenedores e infraestructura en la nube.",
      "Relational design, SQL and NoSQL, large-scale processing, data flows, containers and cloud infrastructure."
    ),
    tools: ["SQL", "NoSQL", "Big Data", "Docker", "Cloud"]
  },
  {
    id: "symbolic-ai",
    index: "04",
    title: l("IA simbólica y agentes", "Symbolic AI and agents"),
    description: l(
      "Lógica, representación del conocimiento, búsqueda, incertidumbre, sistemas expertos y coordinación entre agentes.",
      "Logic, knowledge representation, search, uncertainty, expert systems and coordination between agents."
    ),
    tools: ["Búsqueda", "Lógica", "Razonamiento", "Multiagente"],
    toolsEn: ["Search", "Logic", "Reasoning", "Multi-agent"]
  },
  {
    id: "machine-learning",
    index: "05",
    title: l("Aprendizaje automático", "Machine learning"),
    description: l(
      "Preparación de datos, validación, clasificación, regresión, clustering, aprendizaje por refuerzo y redes profundas.",
      "Data preparation, validation, classification, regression, clustering, reinforcement learning and deep networks."
    ),
    tools: ["scikit-learn", "PyTorch", "LightGBM", "Clustering"]
  },
  {
    id: "language-retrieval",
    index: "06",
    title: l("Lenguaje y recuperación", "Language and retrieval"),
    description: l(
      "Procesamiento del lenguaje, minería de textos, búsqueda documental, transformers, LLM, RAG y respuestas con fuentes.",
      "Language processing, text mining, document search, transformers, LLMs, RAG and source-grounded answers."
    ),
    tools: ["NLP", "Transformers", "RAG", "BM25", "Embeddings"]
  },
  {
    id: "vision-interfaces",
    index: "07",
    title: l("Visión e interfaces", "Vision and interfaces"),
    description: l(
      "Procesamiento de señales e imagen, visión artificial, sensores, interacción inteligente, IoT y robótica basada en comportamiento.",
      "Signal and image processing, computer vision, sensors, intelligent interaction, IoT and behaviour-based robotics."
    ),
    tools: ["OpenCV", "Visión", "Señales", "IoT", "Robótica"],
    toolsEn: ["OpenCV", "Vision", "Signals", "IoT", "Robotics"]
  },
  {
    id: "distributed",
    index: "08",
    title: l("Sistemas distribuidos", "Distributed systems"),
    description: l(
      "Redes, concurrencia, paralelismo, sistemas distribuidos, aceleración hardware y computación en el borde.",
      "Networks, concurrency, parallelism, distributed systems, hardware acceleration and edge computing."
    ),
    tools: ["OpenMP", "MPI", "CUDA", "Redes", "Edge"],
    toolsEn: ["OpenMP", "MPI", "CUDA", "Networks", "Edge"]
  },
  {
    id: "responsible-ai",
    index: "09",
    title: l("IA responsable", "Responsible AI"),
    description: l(
      "Ciberseguridad, protección de datos, sesgos, ética, legislación y gobernanza en sistemas de inteligencia artificial.",
      "Cybersecurity, data protection, bias, ethics, legislation and governance in artificial intelligence systems."
    ),
    tools: ["Privacidad", "Seguridad", "Ética", "Gobernanza"],
    toolsEn: ["Privacy", "Security", "Ethics", "Governance"]
  }
];

export const hobbies: Hobby[] = [
  {
    title: l("Atletismo", "Athletics"),
    description: l("Compito en atletismo y entreno con regularidad. Es la disciplina que estructura buena parte de mi rutina.", "I compete in athletics and train regularly. It is the discipline that structures much of my routine."),
    accent: "00D9C0"
  },
  {
    title: l("Océano y montaña", "Ocean and mountain"),
    description: l("Practico ciclismo, surf y senderismo: distintas formas de moverme, desconectar y pasar tiempo al aire libre.", "I cycle, surf and hike: different ways to move, switch off and spend time outdoors."),
    accent: "D9FF43"
  },
  {
    title: l("Música", "Music"),
    description: l("Finalicé el Grado Elemental y cursé cinco años de Grado Profesional de música como Violonchelista.", "I completed Elementary Music Studies and pursued five years of Professional Music Studies as a cellist."),
    accent: "7CA7FF"
  }
];
