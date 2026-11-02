import type { ProjectDocumentationSection } from "./types";

export const assistantDocumentationSections: ProjectDocumentationSection[] = [
  {
    "heading": {
      "es": "1. Resumen del proyecto",
      "en": "1. Project summary"
    },
    "body": {
      "es": "He creado una aplicación web conversacional que permite a reclutadores y otras personas interesadas consultar información profesional mediante preguntas en lenguaje natural. El asistente combina una interfaz de chat con un backend que busca evidencias en un conjunto curado de documentos y fichas de proyectos antes de generar cada respuesta. Su aportación principal es convertir un perfil profesional estructurado en una experiencia interactiva, con respuestas adaptables y controles para limitar la exposición de información.",
      "en": "I built a conversational web application that lets recruiters and other interested visitors ask questions about professional information in natural language. The assistant combines a chat interface with a backend that looks for evidence in a curated set of documents and project records before generating each response. Its main contribution is to turn a structured professional profile into an interactive experience, with adjustable answers and controls that limit information exposure."
    }
  },
  {
    "heading": {
      "es": "2. Problema y objetivos",
      "en": "2. Problem and objectives"
    },
    "body": {
      "es": "Un currículum presenta la información de forma fija y obliga a localizar manualmente la experiencia relevante para cada pregunta. Este proyecto busca facilitar una exploración contextual del perfil, mantener el hilo entre consultas y permitir iniciar, detener o reiniciar la conversación. También persigue objetivos de ingeniería: limitar las fuentes consultadas, gestionar carga y errores, y proteger las credenciales.",
      "en": "A CV presents information in a fixed format, requiring readers to locate the experience relevant to each question themselves. This project aims to make profile exploration more contextual, preserve continuity between questions, and let visitors start, stop or reset a conversation. It also addresses engineering goals: limiting the sources consulted, managing load and errors, and protecting credentials."
    }
  },
  {
    "heading": {
      "es": "3. Solución y arquitectura",
      "en": "3. Solution and architecture"
    },
    "body": {
      "es": "El visitante escribe una pregunta y selecciona el nivel de detalle. El servicio valida la solicitud, asigna una sesión y aplica límites de uso. Antes de responder, el modelo debe seleccionar fuentes con herramientas restringidas para leer documentos del catálogo o buscar fichas de proyectos. El backend ejecuta esas consultas, devuelve la evidencia al modelo y transmite la respuesta al navegador como eventos NDJSON. Las conversaciones completadas se conservan en memoria para aportar contexto a la siguiente pregunta.\n\n```mermaid\nflowchart LR\n    V[Visitante] --> UI[Interfaz web]\n    UI -->|pregunta y nivel de detalle| API[Servicio FastAPI]\n    API -->|plan de fuentes con herramientas| LLM[API de modelo OpenAI]\n    LLM -->|selección de fuentes| API\n    API --> CAT[Catálogo y documentos Markdown]\n    API --> IDX[Índice estructurado de proyectos]\n    CAT --> API\n    IDX --> API\n    API -->|evidencias seleccionadas| LLM\n    LLM -->|respuesta progresiva| API\n    API -->|eventos NDJSON| UI\n```",
      "en": "Visitors enter a question and choose a level of detail. The service validates the request, assigns a session and applies usage limits. Before answering, the model must select sources through restricted tools to read catalogued documents or search project records. The backend runs those queries, returns the evidence to the model and streams the answer to the browser as NDJSON events. Completed conversations are kept in memory to provide context for the next question.\n\n```mermaid\nflowchart LR\n    V[Visitor] --> UI[Web interface]\n    UI -->|question and detail level| API[FastAPI service]\n    API -->|source plan with tools| LLM[OpenAI model API]\n    LLM -->|source selection| API\n    API --> CAT[Catalog and Markdown documents]\n    API --> IDX[Structured project index]\n    CAT --> API\n    IDX --> API\n    API -->|selected evidence| LLM\n    LLM -->|streamed answer| API\n    API -->|NDJSON events| UI\n```"
    }
  },
  {
    "heading": {
      "es": "4. Desarrollo y decisiones técnicas",
      "en": "4. Development and technical decisions"
    },
    "body": {
      "es": "El backend usa Python, FastAPI y Uvicorn. La integración con OpenAI emplea la API Responses y herramientas de función con esquemas cerrados. La selección de fuentes es obligatoria: si el modelo no propone consultas válidas, la planificación falla. Así se separa la decisión sobre qué consultar de la lectura, que ejecutan funciones locales.\n\nLa información reside en documentos Markdown descritos por un catálogo YAML y un índice estructurado de proyectos. La resolución de fuentes restringe las lecturas a la colección permitida. El buscador de proyectos normaliza términos y tildes, cuenta coincidencias en campos priorizados y aplica reglas editoriales para temas concretos. Es una estrategia determinista léxica, no vectorial. En documentos extensos, el sistema divide por encabezados y selecciona secciones que coinciden con la pregunta hasta un límite de contexto.\n\nEl modelo es configurable y el código establece `gpt-5.5` como valor predeterminado. La salida ofrece tres niveles de detalle y se transmite por streaming. Si queda incompleta, el backend puede pedir una continuación. Un saneador retiene un margen entre fragmentos para detectar patrones sensibles que crucen sus límites.\n\nEl cliente usa HTML, CSS y JavaScript sin framework; gestiona streaming, cancelación, reinicio y preferencia visual. Una cookie `HttpOnly` identifica la sesión; el historial queda en la memoria del proceso y tiene límites de tamaño. El servicio valida solicitudes, limita uso y concurrencia, ordena la cola y aplica cabeceras de seguridad. La clave permanece en el backend. PostHog es opcional y requiere configuración y consentimiento, con captura automática y grabación de sesiones desactivadas.\n\nLa imagen Docker usa una base Python ligera y un usuario sin privilegios. No constan comparativas controladas entre modelos, proveedores o estrategias alternativas.",
      "en": "The backend uses Python, FastAPI and Uvicorn. Its OpenAI integration uses the Responses API and function tools with closed schemas. Source selection is mandatory: if the model does not propose valid queries, planning fails. This separates the decision about what to consult from reading the sources, which is carried out by local functions.\n\nInformation is stored in Markdown documents described by a YAML catalog and a structured project index. Source resolution restricts reads to the permitted collection. The project search normalises terms and diacritics, counts matches in prioritised fields and applies editorial rules for specific topics. This is a deterministic lexical strategy, not vector search. For long documents, the system splits content by headings and selects sections matching the question up to a context limit.\n\nThe model is configurable, with `gpt-5.5` set as the code default. Responses offer three levels of detail and are streamed. If a response is incomplete, the backend can request a continuation. A sanitizer retains a margin between chunks to detect sensitive patterns that span their boundaries.\n\nThe client uses HTML, CSS and JavaScript without a framework; it handles streaming, cancellation, conversation reset and visual preference. An `HttpOnly` cookie identifies the session; history remains in process memory and is size-limited. The service validates requests, limits usage and concurrency, orders the queue and applies security headers. The provider key remains on the backend. PostHog is optional and requires configuration and consent, with automatic capture and session recording disabled.\n\nThe Docker image uses a lightweight Python base and a non-privileged user. No controlled comparisons between models, providers or alternative strategies are documented."
    }
  },
  {
    "heading": {
      "es": "5. Retos y soluciones",
      "en": "5. Challenges and solutions"
    },
    "body": {
      "es": "Un reto es recuperar evidencia útil sin enviar toda la documentación al modelo. El catálogo orienta la selección de fuentes, el índice devuelve fichas compactas y los documentos largos se reducen a secciones coincidentes. La resolución acotada y los campos públicos permitidos limitan el acceso y la información devuelta.\n\nEl streaming plantea retos de continuidad y privacidad: pueden producirse errores tras mostrar parte de una respuesta o dividirse un dato sensible entre fragmentos. El cliente conserva respuestas parciales; el backend guarda en historial solo respuestas completadas y mantiene texto en búfer antes de emitirlo. La cola y los límites de peticiones gestionan la capacidad frente a una API externa.",
      "en": "One challenge is retrieving useful evidence without sending all documentation to the model. The catalog guides source selection, the index returns compact project records, and long documents are reduced to matching sections. Restricted path resolution and the permitted public fields limit access and the information returned.\n\nStreaming raises continuity and privacy challenges: errors can occur after part of an answer has been shown, or sensitive data can be split across chunks. The client preserves partial answers; the backend stores only completed answers in the conversation history and buffers text before emitting it. The queue and request limits manage capacity when relying on an external API."
    }
  },
  {
    "heading": {
      "es": "6. Evaluación y resultados",
      "en": "6. Evaluation and results"
    },
    "body": {
      "es": "El repositorio incluye pruebas unitarias para catálogo, búsqueda, sesiones, cola, cabeceras, streaming, errores y saneamiento, además de regresiones simuladas para respuestas incompletas.\n\nEl proyecto ofrece tres niveles de respuesta y configura dos generaciones simultáneas con hasta veinte consultas adicionales en cola FIFO; son parámetros de capacidad, no resultados de una prueba de carga. No constan evaluación con usuarios, preguntas etiquetadas, comparativa de calidad, latencia bajo carga ni métricas de precisión o recuperación. La calidad percibida y el rendimiento real quedan por medir.",
      "en": "The repository includes unit tests for the catalog, search, sessions, queue, headers, streaming, errors and sanitization, as well as simulated regressions for incomplete responses.\n\nThe project offers three response levels and configures two simultaneous generations with up to twenty additional requests in a FIFO queue; these are capacity settings, not load-test results. There is no documented user evaluation, labelled question set, quality comparison, under-load latency, or precision or retrieval metrics. Perceived quality and real-world performance remain to be measured."
    }
  },
  {
    "heading": {
      "es": "7. Estado actual y futuras mejoras",
      "en": "7. Current state and future improvements"
    },
    "body": {
      "es": "La implementación reúne interfaz, servicio, fuentes estructuradas, generación conectada a OpenAI, streaming y contenedor. La documentación y el índice del proyecto registran un despliegue público en DigitalOcean App Platform; la disponibilidad actual no se ha verificado. Las sesiones y la concurrencia son locales a una instancia; escalar a varias réplicas requiere compartir el estado. Coste y latencia también dependen del proveedor externo.\n\nComo siguiente etapa, propongo medir recuperación y calidad con preguntas representativas y revisar latencia bajo carga. También sería posible externalizar sesiones para escalar y evaluar recuperación semántica si las pruebas muestran límites de la búsqueda léxica. Son líneas futuras, no funcionalidades ya implementadas.",
      "en": "The implementation brings together the interface, service, structured sources, OpenAI-connected generation, streaming and a container. The documentation and project index record a public deployment on DigitalOcean App Platform; current availability has not been verified. Sessions and concurrency are local to one instance; scaling to multiple replicas requires shared state. Cost and latency also depend on the external provider.\n\nAs a next step, I propose measuring retrieval and answer quality with representative questions and reviewing latency under load. Session state could also be externalised for scaling, and semantic retrieval evaluated if tests show the limits of lexical search. These are future work, not implemented features."
    }
  }
];

