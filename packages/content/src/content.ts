import type { AboutProfile, Capability, Credential, Hobby, Project, SiteProfile, TimelineEntry } from "./types";
import { ragDocumentationSections } from "./rag-documentation";
import { twinphotoDocumentationSections } from "./twinphoto-documentation";
import { assistantDocumentationSections } from "./assistant-documentation";
import { bitcoinDocumentationSections } from "./bitcoin-documentation";

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
  location: l("Noia, A Coruña", "Noia, A Coruña, Spain"),
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
    documentationSections: ragDocumentationSections,
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
      "Proyecto final implementado como sistema real e integrado con el software de la empresa para el procesamiento de documentación corporativa",
      "Final project implemented as a real system and integrated with the company’s software for corporate document processing."
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
    slug: "airfryer-vision-cocinado",
    order: 2,
    featured: true,
    year: "2026",
    status: "research",
    category: l("Visión artificial · Sistemas inteligentes", "Computer vision · Intelligent systems"),
    title: l("Airfryer: visión artificial para cocinado inteligente", "Airfryer: computer vision for intelligent cooking"),
    eyebrow: l("Prototipo modular de visión artificial y planificación · V2", "Modular computer vision and planning prototype · V2"),
    summary: l(
      "Un proyecto ambicioso de I+D que conecta percepción visual y planificación de cocinado: analiza una cesta, separa sus piezas y propone tiempos y temperaturas. Combina deep learning, geometría computacional y reglas interpretables en una arquitectura orientada al cocinado automático universal.",
      "An ambitious R&D project connecting visual perception with cooking planning: it analyses a basket, separates individual pieces and proposes cooking times and temperatures. It combines deep learning, computational geometry and interpretable rules in an architecture aimed at universal automatic cooking."
    ),
    problem: l(
      "Configurar una airfryer requiere elegir programa, tiempo y temperatura según el tipo, tamaño y preparación de los alimentos. Una receta fija no representa bien una cesta con piezas distintas. La foto tampoco revela su grosor ni permite confirmar que el interior esté cocinado, por lo que las medidas visibles no deben confundirse con magnitudes físicas o resultados térmicos.",
      "Setting an airfryer requires choosing a programme, time and temperature for the food type, size and preparation. A fixed recipe does not represent a basket of different pieces well. A photo also cannot reveal thickness or confirm that the inside is cooked, so visible measurements must not be confused with physical quantities or thermal outcomes."
    ),
    role: l(
      "Desarrollé una prueba de concepto que conecta estimación de ocupación, separación y clasificación de piezas, medidas geométricas y planificación. La ejecución coordina modelos mediante adaptadores, conserva identificadores por pieza y registra resultados intermedios, logs y advertencias para que la propuesta se pueda revisar.",
      "I developed a proof of concept connecting occupancy estimation, piece separation and classification, geometric measurements and planning. The run coordinates models through adapters, preserves per-piece identifiers, and records intermediate results, logs and warnings so the proposal can be reviewed."
    ),
    decisions: [
      l("Separar la máscara semántica global de alimento/fondo de la segmentación por instancia permite evaluar ocupación y piezas individualmente.", "Keeping the global food/background semantic mask separate from instance segmentation allows occupancy and individual pieces to be evaluated independently."),
      l("Usar YOLO11n para proponer piezas y SAM 2.1 Hiera Tiny para refinar sus contornos; la ejecución en CPU omite SAM y se registra como una variante distinta.", "Use YOLO11n to propose pieces and SAM 2.1 Hiera Tiny to refine their contours; CPU execution omits SAM and is recorded as a distinct variant."),
      l("Asignar tareas especializadas: SegFormer-B0 para ocupación, DINOv3 ConvNeXt-B para siete cortes de pollo y DINOv3 ViT-B/16 con SVM RBF para rebozado.", "Assign specialised tasks: SegFormer-B0 for occupancy, DINOv3 ConvNeXt-B for seven chicken cuts, and DINOv3 ViT-B/16 with an RBF SVM for breading."),
      l("Mantener el planificador como motor Python determinista con perfiles JSON, separado de los modelos visuales y con factores de cálculo trazables.", "Keep the planner as a deterministic Python engine with JSON profiles, separate from the vision models and with traceable calculation factors."),
      l("Preparar particiones por tarea y agrupar imágenes relacionadas para reducir filtraciones; las predicciones inciertas quedan disponibles para revisión humana.", "Prepare task-specific splits and group related images to reduce leakage; uncertain predictions remain available for human review.")
    ],
    results: [
      l("V2 completa el recorrido desde una imagen hasta un plan JSON provisional, con máscara global, instancias, clasificación, atributo de rebozado y geometría.", "V2 completes the journey from an image to a provisional JSON plan, with a global mask, instances, classification, breading attribute and geometry."),
      l("Cada pieza mantiene un identificador común entre máscaras, predicciones y medidas; la salida registra propuestas y advertencias para su revisión.", "Each piece keeps a shared identifier across masks, predictions and measurements; the output records proposals and warnings for review."),
      l("En un ejemplo guardado, la ejecución terminó con siete piezas y dejó constancia de clases bajo el umbral, encuadre sin calibración física y cocinado pendiente de revisión.", "In a saved example, the run finished with seven pieces and recorded classes below threshold, an uncalibrated frame and cooking that still needed review.")
    ],
    architecture: [
      l("La imagen se normaliza a RGB y se corrige su orientación EXIF antes de ejecutar los modelos.", "The image is normalised to RGB and its EXIF orientation corrected before the models run."),
      l("SegFormer-B0 estima alimento, fondo y ocupación; YOLO11n detecta piezas y SAM 2.1 Hiera Tiny refina sus máscaras.", "SegFormer-B0 estimates food, background and occupancy; YOLO11n detects pieces and SAM 2.1 Hiera Tiny refines their masks."),
      l("Los recortes por pieza se clasifican entre siete cortes de pollo con DINOv3 ConvNeXt-B; un especialista DINOv3 ViT-B/16 + SVM RBF estima el rebozado.", "Per-piece crops are classified among seven chicken cuts with DINOv3 ConvNeXt-B; a DINOv3 ViT-B/16 + RBF SVM specialist estimates breading."),
      l("El análisis geométrico resume área, caja, centroide, elongación y solidez en píxeles; sus medidas todavía no equivalen a dimensiones físicas.", "Geometric analysis summarises area, bounding box, centroid, elongation and solidity in pixels; these measurements are not yet physical dimensions."),
      l("El motor de reglas combina predicciones y perfiles JSON para proponer tiempos, temperaturas y fases cuando están configuradas.", "The rule engine combines predictions and JSON profiles to propose times, temperatures and stages when configured.")
    ],
    validation: l(
      "Los estudios de cada módulo usan conjuntos y particiones distintos. SegFormer-B0 obtuvo 92,82 % de IoU y 1,01 puntos porcentuales de error medio en cobertura en una comparación de 114 imágenes; YOLO26n semántico alcanzó 90,63 % y 1,55 puntos. YOLO11n + SAM logró en validación (114 fotos, 2.036 piezas) MAE de conteo 0,956, 61,4 % de conteos exactos y AP de máscaras 0,825. En el test histórico de 115 fotos obtuvo MAE 1,009 y AP 0,816; ese test no cambió la selección. ConvNeXt-B obtuvo 92,40 % de exactitud y macro-F1 92,17 % en validación y 91,71 % de exactitud en el test documentado. Su umbral operativo es 0,90; el rechazo estadístico no certificó el objetivo de precisión del 95 %. El especialista de rebozado obtuvo 96,20 % de balanced accuracy, 89,35 % de precisión y 93,79 % de recall en un test agrupado de 1.449 imágenes, por lo que requiere confirmación humana. Estas métricas describen tareas distintas, no el resultado del cocinado.",
      "The module studies use different datasets and splits. SegFormer-B0 achieved 92.82% IoU and 1.01 percentage points of mean coverage error in a 114-image comparison; semantic YOLO26n reached 90.63% and 1.55 points. YOLO11n + SAM achieved a count MAE of 0.956, 61.4% exact counts and mask AP of 0.825 on validation (114 photos, 2,036 pieces). On the historical test of 115 photos it scored MAE 1.009 and AP 0.816; that test did not change the selection. ConvNeXt-B achieved 92.40% accuracy and 92.17% macro-F1 on validation, and 91.71% accuracy on the documented test. Its operational threshold is 0.90; statistical rejection did not certify the 95% precision target. The breading specialist achieved 96.20% balanced accuracy, 89.35% precision and 93.79% recall on a grouped test of 1,449 images, so it requires human confirmation. These metrics describe different tasks, not cooking outcomes."
    ),
    learning: l(
      "La calidad de los datos depende de controlar duplicados y procedencia entre particiones; el flujo usa hashes exactos y perceptuales y revisa conflictos de etiquetas. También es esencial separar las máscaras globales de las instancias cuando las piezas se tocan, conservar la incertidumbre y distinguir los píxeles de medidas físicas. La cámara calibrada y los ensayos térmicos en un aparato concreto siguen siendo necesarios antes de validar recomendaciones de cocinado.",
      "Data quality depends on controlling duplicates and provenance across splits; the workflow uses exact and perceptual hashes and reviews label conflicts. It is also essential to separate global masks from instances when pieces touch, preserve uncertainty and distinguish pixels from physical measurements. A calibrated camera and thermal trials on a specific appliance are still needed before cooking recommendations can be validated."
    ),
    scope: l(
      "V2 ejecuta un pipeline desde una imagen hasta un plan provisional trazable. El clasificador cubre siete cortes de pollo y el especialista de rebozado requiere confirmación. La cámara aún no está calibrada para convertir píxeles en medidas físicas y cada propuesta necesita revisión humana. La ampliación a más alimentos y aparatos depende de nuevas sesiones de cámara y ensayos térmicos.",
      "V2 runs a traceable pipeline from an image to a provisional plan. The classifier covers seven chicken cuts and the breading specialist requires confirmation. The camera is not yet calibrated to convert pixels into physical measurements, and every proposal needs human review. Expanding to more foods and appliances depends on new camera sessions and thermal trials."
    ),
    documentationSections: [
      {
        heading: l("1. Resumen del proyecto", "1. Project overview"),
        body: l([
          "He desarrollado un prototipo que analiza una fotografía de los alimentos en la cesta de una airfryer. Localiza las piezas, propone su categoría y algunos atributos visibles y, con esa información, prepara un plan de cocinado que una persona puede revisar. Está concebido como punto de partida para fabricantes de electrodomésticos y equipos de producto interesados en explorar una experiencia asistida por cámara.",
          "La solución integra visión artificial, geometría y reglas de cocinado en un pipeline trazable. Cada módulo puede evaluarse y sustituirse de forma independiente, lo que permite evolucionar el sistema sin perder de vista cómo se obtiene cada resultado."
        ].join("\n\n"), [
          "I developed a prototype that analyses a photograph of the food in an airfryer basket. It locates the pieces, suggests their category and some visible attributes, and uses that information to prepare a cooking plan for a person to review. It is intended as a starting point for appliance manufacturers and product teams exploring a camera-assisted cooking experience.",
          "The solution brings together computer vision, geometry and cooking rules in a traceable pipeline. Each module can be evaluated and replaced independently, making it possible to evolve the system while keeping track of how each result is produced."
        ].join("\n\n"))
      },
      {
        heading: l("2. Problema y objetivos", "2. Problem and objectives"),
        body: l([
          "Elegir un programa para la airfryer implica considerar el tipo de alimento, el tamaño de las piezas y su preparación, además de ajustar tiempo y temperatura. Una receta fija no representa bien una cesta con alimentos distintos. La imagen aporta información sobre lo que contiene, pero no revela con precisión el grosor ni confirma que el interior esté cocinado.",
          "El objetivo fue crear una prueba de concepto que conectase esas decisiones en un proceso reproducible: estimar la superficie ocupada, separar piezas, clasificarlas, extraer medidas visibles y generar una propuesta explicable. La primera versión operativa se limitó a siete cortes de pollo e incorporó un clasificador especializado en rebozado. La arquitectura permite ampliar el dominio cuando haya datos y validación suficientes."
        ].join("\n\n"), [
          "Choosing an airfryer programme involves considering the food type, piece size and preparation, as well as adjusting time and temperature. A fixed recipe does not represent a basket of different foods well. An image provides information about what is in the basket, but it cannot reveal thickness precisely or confirm that the inside is cooked.",
          "The goal was to build a proof of concept that connects these decisions in a reproducible process: estimate occupied surface area, separate pieces, classify them, extract visible measurements and generate an explainable proposal. The first operational version was limited to seven chicken cuts and included a specialist breading classifier. The architecture can expand to a broader domain when enough data and validation are available."
        ].join("\n\n"))
      },
      {
        heading: l("3. Solución y arquitectura", "3. Solution and architecture"),
        body: l([
          "El proceso parte de una imagen. El orquestador corrige su orientación, coordina los modelos mediante adaptadores y guarda resultados intermedios, logs e informes de cada ejecución. Los módulos intercambian máscaras e información estructurada vinculadas a un identificador estable por pieza.",
          [
            "```mermaid",
            '%%{init: {"theme": "base", "themeVariables": {"fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif", "fontSize": "14px", "primaryTextColor": "#17324d", "lineColor": "#718096", "clusterBkg": "#f5f8fb", "clusterBorder": "#c9d6e2", "edgeLabelBackground": "#ffffff"}, "flowchart": {"curve": "basis", "nodeSpacing": 34, "rankSpacing": 46, "htmlLabels": true}}}%%',
            "flowchart LR",
            "    A([Foto de la cesta]) --> B[Normalización RGB<br/>y orientación EXIF]",
            "",
            "    subgraph vision[Visión y separación]",
            "        direction LR",
            "        C[SegFormer-B0<br/>alimento, fondo y ocupación]",
            "        D[YOLO11n 512<br/>detección de piezas]",
            "        E[SAM 2.1 Hiera Tiny<br/>refinamiento de máscaras]",
            "        F[Recortes por pieza<br/>e identificadores]",
            "        C -. control de ocupación .-> K[Control de ocupación<br/>y máscaras]",
            "        D --> E --> F",
            "    end",
            "",
            "    B --> C",
            "    B --> D",
            "",
            "    subgraph analysis[Análisis por pieza]",
            "        direction TB",
            "        G[DINOv3 ConvNeXt-B<br/>7 cortes de pollo]",
            "        H[DINOv3 ViT-B/16 + SVM RBF<br/>atributo de rebozado]",
            "        I[Geometría por pieza<br/>área, caja y forma]",
            "    end",
            "",
            "    F --> G",
            "    F --> H",
            "    E --> I",
            "",
            "    subgraph planning[Planificación y revisión]",
            "        direction LR",
            "        J[Motor de reglas<br/>y perfiles JSON]",
            "        L[Plan provisional<br/>por pieza y por tanda]",
            "        M([Revisión humana<br/>y termómetro])",
            "        J --> L --> M",
            "    end",
            "",
            "    G --> J",
            "    H --> J",
            "    I --> J",
            "    K --> J",
            "",
            "    classDef input fill:#e8f1fb,stroke:#4b78a8,color:#17324d,stroke-width:1.5px;",
            "    classDef visionNode fill:#e8f6f3,stroke:#459487,color:#17324d,stroke-width:1.5px;",
            "    classDef analysisNode fill:#f2edfb,stroke:#8065ad,color:#2c2340,stroke-width:1.5px;",
            "    classDef planningNode fill:#fff3df,stroke:#c48a35,color:#493316,stroke-width:1.5px;",
            "    class A,B input;",
            "    class C,D,E,F,K visionNode;",
            "    class G,H,I analysisNode;",
            "    class J,L,M planningNode;",
            "    style vision fill:#f3faf8,stroke:#b7d9d1,stroke-width:1px",
            "    style analysis fill:#f8f5fc,stroke:#d2c5e6,stroke-width:1px",
            "    style planning fill:#fffbf3,stroke:#ead5ad,stroke-width:1px",
            "```"
          ].join("\n"),
          "La ejecución genera máscaras, predicciones por identificador, medidas en píxeles, una propuesta de tiempo y temperatura y las advertencias correspondientes. `pipeline.json` define las etapas, sus adaptadores y entornos. Desarrollo conserva el entrenamiento, la selección y el historial. Los experimentos y alternativas que no forman parte de la selección activa aportan evidencia técnica, pero no se ejecutan en el runtime."
        ].join("\n\n"), [
          "The process starts with an image. The orchestrator corrects its orientation, coordinates the models through adapters, and saves intermediate results, logs and a report for each run. The modules exchange masks and structured information linked by a stable identifier for each piece.",
          [
            "```mermaid",
            '%%{init: {"theme": "base", "themeVariables": {"fontFamily": "Inter, ui-sans-serif, system-ui, sans-serif", "fontSize": "14px", "primaryTextColor": "#17324d", "lineColor": "#718096", "clusterBkg": "#f5f8fb", "clusterBorder": "#c9d6e2", "edgeLabelBackground": "#ffffff"}, "flowchart": {"curve": "basis", "nodeSpacing": 34, "rankSpacing": 46, "htmlLabels": true}}}%%',
            "flowchart LR",
            "    A([Basket photo]) --> B[RGB normalisation<br/>and EXIF orientation]",
            "",
            "    subgraph vision[Vision and separation]",
            "        direction LR",
            "        C[SegFormer-B0<br/>food, background and occupancy]",
            "        D[YOLO11n 512<br/>piece detection]",
            "        E[SAM 2.1 Hiera Tiny<br/>mask refinement]",
            "        F[Per-piece crops<br/>and identifiers]",
            "        C -. occupancy control .-> K[Occupancy and mask<br/>checks]",
            "        D --> E --> F",
            "    end",
            "",
            "    B --> C",
            "    B --> D",
            "",
            "    subgraph analysis[Per-piece analysis]",
            "        direction TB",
            "        G[DINOv3 ConvNeXt-B<br/>7 chicken cuts]",
            "        H[DINOv3 ViT-B/16 + RBF SVM<br/>breading attribute]",
            "        I[Per-piece geometry<br/>area, box and shape]",
            "    end",
            "",
            "    F --> G",
            "    F --> H",
            "    E --> I",
            "",
            "    subgraph planning[Planning and review]",
            "        direction LR",
            "        J[Rule engine<br/>and JSON profiles]",
            "        L[Provisional plan<br/>by piece and batch]",
            "        M([Human review<br/>and thermometer])",
            "        J --> L --> M",
            "    end",
            "",
            "    G --> J",
            "    H --> J",
            "    I --> J",
            "    K --> J",
            "",
            "    classDef input fill:#e8f1fb,stroke:#4b78a8,color:#17324d,stroke-width:1.5px;",
            "    classDef visionNode fill:#e8f6f3,stroke:#459487,color:#17324d,stroke-width:1.5px;",
            "    classDef analysisNode fill:#f2edfb,stroke:#8065ad,color:#2c2340,stroke-width:1.5px;",
            "    classDef planningNode fill:#fff3df,stroke:#c48a35,color:#493316,stroke-width:1.5px;",
            "    class A,B input;",
            "    class C,D,E,F,K visionNode;",
            "    class G,H,I analysisNode;",
            "    class J,L,M planningNode;",
            "    style vision fill:#f3faf8,stroke:#b7d9d1,stroke-width:1px",
            "    style analysis fill:#f8f5fc,stroke:#d2c5e6,stroke-width:1px",
            "    style planning fill:#fffbf3,stroke:#ead5ad,stroke-width:1px",
            "```"
          ].join("\n"),
          "The run generates masks, per-identifier predictions, measurements in pixels, a proposed time and temperature, and relevant warnings. `pipeline.json` defines the stages, adapters and environments. Development retains the training, selection and history. Experiments and alternatives outside the active selection provide technical evidence but do not run in the runtime."
        ].join("\n\n"))
      },
      {
        heading: l("4. Desarrollo y decisiones técnicas", "4. Development and technical decisions"),
        body: l([
          "El pipeline asigna a cada modelo una tarea concreta, en lugar de pedir a una sola red que resuelva problemas distintos.",
          "Los datos de desarrollo reúnen fotografías de cestas reales e imágenes recopiladas para ampliar la variedad. Cada tarea tiene etiquetas y particiones propias. El estudio de instancias reunió 1.255 fotos: 1.023 de entrenamiento, 114 de validación, 115 de test histórico y tres capturas continuas fuera del conteo. Las herramientas de adquisición, anotación y limpieza apoyan la experimentación, pero no intervienen en la inferencia de una cesta.",
          [
            "- **Alimento y fondo — SegFormer-B0.** Genera una máscara semántica global y estima la ocupación. En una comparación de 114 imágenes obtuvo 92,82 % de IoU y 1,01 puntos porcentuales de error medio en cobertura. Superó en esas métricas a YOLO26n semántico (90,63 % de IoU y 1,55 puntos de error), por lo que se mantuvo como modelo seleccionado.",
            "- **Separación de piezas — YOLO11n 512 + SAM 2.1 Hiera Tiny.** YOLO propone una máscara para cada pieza y SAM refina sus contornos. La selección se basó en un criterio fijado sobre validación que combina el error de conteo con umbrales mínimos de calidad. En 114 fotos de validación (2.036 piezas), obtuvo un MAE de conteo de 0,956, un 61,4 % de conteos exactos y un AP de máscaras de 0,825. En el test histórico de 115 fotos, el MAE fue 1,009 y el AP 0,816. El test no se utilizó para cambiar la selección.",
            "- **Clasificación de cortes — DINOv3 ConvNeXt-B ajustado.** Procesa cada recorte a 256 × 256 y una cabeza lineal predice una de siete clases. La validación registrada obtuvo un 92,40 % de exactitud y un macro-F1 de 92,17 %; la evaluación de test documentada obtuvo un 91,71 % de exactitud. El sistema asigna una clase operativa a partir de 0,90 de confianza. Como el mecanismo estadístico de rechazo no certificó el objetivo de precisión del 95 %, algunas piezas pueden quedar pendientes de revisión.",
            "- **Atributo de rebozado — DINOv3 ViT-B/16 + SVM RBF.** El encoder genera características que clasifica un SVM calibrado mediante regresión logística. En un test agrupado de 1.449 imágenes alcanzó un 96,20 % de balanced accuracy, un 89,35 % de precisión y un 93,79 % de recall para “Rebozado”. La precisión medida y la diferencia entre las imágenes de entrenamiento y los recortes de cámara hacen que el resultado requiera confirmación humana antes de modificar el plan.",
            "- **Geometría y cocinado.** El resumen calcula área, caja, centroide, elongación y solidez en píxeles; también puede proponer consensos de forma provisionales. El planificador es un componente determinista en Python con perfiles JSON, no un modelo entrenado. Ajusta rangos de tiempo a partir de los parámetros disponibles y devuelve acciones y fases de temperatura cuando están configuradas."
          ].join("\n"),
          "También se probaron otras familias y configuraciones, entre ellas YOLO semántico, variantes de segmentación de instancias y clasificadores ViT con cabezas lineales o métodos clásicos. Las comparaciones permitieron elegir un componente adecuado para cada tarea. En clasificación, ConvNeXt obtuvo el mejor resultado puntual de validación frente a las variantes ViT ensayadas. En instancias, la combinación seleccionada cumplió los umbrales de conteo y máscara fijados de antemano. Los resultados completos y las recetas permanecen en los módulos de Desarrollo."
        ].join("\n\n"), [
          "The pipeline assigns a specific task to each model instead of asking one network to solve different problems.",
          "Development data combines photographs of real baskets with images gathered to increase variety. Each task has its own labels and splits. The instance study brought together 1,255 photos: 1,023 for training, 114 for validation, 115 in a historical test and three continuous captures outside the count. Acquisition, annotation and cleaning tools support experimentation but do not run during basket inference.",
          [
            "- **Food and background — SegFormer-B0.** It produces a global semantic mask and estimates occupancy. In a 114-image comparison it achieved 92.82% IoU and 1.01 percentage points of mean coverage error. It outperformed semantic YOLO26n on those metrics (90.63% IoU and 1.55 error points), so it remained the selected model.",
            "- **Piece separation — YOLO11n 512 + SAM 2.1 Hiera Tiny.** YOLO proposes a mask for each piece and SAM refines its contours. Selection used a validation criterion combining count error with minimum quality thresholds. On 114 validation photos (2,036 pieces), it achieved a count MAE of 0.956, 61.4% exact counts and mask AP of 0.825. On the historical test of 115 photos, MAE was 1.009 and AP was 0.816. The test was not used to change the selection.",
            "- **Cut classification — fine-tuned DINOv3 ConvNeXt-B.** It processes each crop at 256 × 256 and a linear head predicts one of seven classes. Recorded validation achieved 92.40% accuracy and 92.17% macro-F1; the documented test evaluation achieved 91.71% accuracy. The system assigns an operational class from 0.90 confidence. Because the statistical rejection mechanism did not certify the 95% precision target, some pieces may be left for review.",
            "- **Breading attribute — DINOv3 ViT-B/16 + RBF SVM.** The encoder generates features classified by an SVM calibrated with logistic regression. On a grouped test of 1,449 images it achieved 96.20% balanced accuracy, 89.35% precision and 93.79% recall for “Breaded”. The measured precision and the difference between training images and camera crops mean the result requires human confirmation before changing the plan.",
            "- **Geometry and cooking.** The summary calculates area, bounding box, centroid, elongation and solidity in pixels; it can also produce provisional shape consensus. The planner is a deterministic Python component with JSON profiles, not a trained model. It adjusts time ranges from available parameters and returns actions and temperature stages when configured."
          ].join("\n"),
          "Other model families and configurations were also explored, including semantic YOLO, instance segmentation variants and ViT classifiers with linear heads or classical methods. The comparisons helped select a suitable component for each task. For classification, ConvNeXt achieved the best single validation result against the ViT variants tested. For instances, the selected combination met the pre-set count and mask thresholds. Full results and recipes remain in the Development modules."
        ].join("\n\n"))
      },
      {
        heading: l("5. Retos y soluciones", "5. Challenges and solutions"),
        body: l([
          "Uno de los principales retos fue evitar que la calidad de las particiones inflase las métricas. Las copias exactas o las imágenes casi idénticas distribuidas entre conjuntos pueden dar una impresión demasiado optimista del rendimiento. El proceso de preparación utiliza hashes exactos y perceptuales, agrupación por procedencia y revisión de conflictos de etiquetas para reducir ese riesgo. Las particiones y las métricas se mantienen específicas para cada tarea.",
          "En algunas imágenes las piezas están muy próximas o se solapan. Mantener separadas la máscara global del alimento y la segmentación por instancia permite evaluar cada problema por su cuenta. SAM refina las propuestas de YOLO y las máscaras exportadas conservan identificadores únicos. La máscara semántica se utiliza como control; todavía no se ha validado su uso para recortar automáticamente las instancias.",
          "También era necesario preservar la integridad de los checkpoints, las dependencias y las salidas. V2 separa los entornos de inferencia, configura cada etapa explícitamente y comprueba hashes y contratos de datos. Si falta memoria GPU, el modo automático puede recurrir a CPU. En el análisis de instancias, la ejecución en CPU omite SAM y se registra como una variante distinta del método seleccionado."
        ].join("\n\n"), [
          "One of the main challenges was preventing split quality from inflating the metrics. Exact duplicates or near-identical images spread across sets can make performance look too optimistic. Preparation uses exact and perceptual hashes, grouping by provenance and label-conflict review to reduce that risk. Splits and metrics remain specific to each task.",
          "In some images, pieces are very close together or overlap. Keeping the global food mask separate from instance segmentation makes it possible to evaluate each problem independently. SAM refines YOLO proposals and exported masks retain unique identifiers. The semantic mask serves as a control; using it to crop instances automatically has not yet been validated.",
          "The integrity of checkpoints, dependencies and outputs also had to be preserved. V2 separates inference environments, configures every stage explicitly and checks hashes and data contracts. If GPU memory is unavailable, automatic mode can fall back to CPU. For instance analysis, CPU execution omits SAM and is recorded as a different variant from the selected method."
        ].join("\n\n"))
      },
      {
        heading: l("6. Evaluación y resultados", "6. Evaluation and results"),
        body: l([
          "La evaluación combina métricas específicas de cada tarea con comprobaciones de integración. IoU y Dice miden el solapamiento de máscaras; AP y F1 evalúan la detección de instancias; MAE y la tasa de conteo exacto describen el recuento; exactitud, macro-F1 y balanced accuracy resumen la clasificación. Una prueba de humo comprueba la carga de artefactos, la ejecución y la correspondencia de identificadores en todo el pipeline, pero no mide la calidad predictiva.",
          "V2 puede completar un recorrido desde la máscara de alimento hasta el plan JSON: genera instancias, clasificación, análisis de rebozado y geometría. En un ejemplo guardado, la ejecución terminó con siete piezas y registró tres advertencias: las clases no superaron el umbral operativo, el encuadre no estaba calibrado a cm² y la propuesta de cocinado requería revisión. El ejemplo muestra por qué conviene registrar la incertidumbre y la procedencia junto a cada predicción.",
          "Las cifras de los modelos proceden de conjuntos y particiones diferentes; no constituyen una puntuación global ni garantizan el rendimiento en una cámara o airfryer comercial. En particular, el resultado de rebozado sigue sujeto a revisión y el test de instancias es histórico, no una evaluación independiente por sesión."
        ].join("\n\n"), [
          "Evaluation combines task-specific metrics with integration checks. IoU and Dice measure mask overlap; AP and F1 evaluate instance detection; MAE and exact-count rate describe counting; accuracy, macro-F1 and balanced accuracy summarise classification. A smoke test checks artifact loading, execution and identifier correspondence throughout the pipeline, but does not measure predictive quality.",
          "V2 can complete a run from the food mask to a JSON plan: it produces instances, classification, breading analysis and geometry. In a saved example, the run finished with seven pieces and recorded three warnings: classes did not exceed the operational threshold, the frame was not calibrated to cm², and the cooking proposal needed review. The example shows why uncertainty and provenance should be recorded alongside each prediction.",
          "Model figures come from different datasets and splits; they are not a single overall score and do not guarantee performance with a commercial camera or airfryer. In particular, the breading result remains under review and the instance test is historical, not an independent per-session evaluation."
        ].join("\n\n"))
      },
      {
        heading: l("7. Estado actual y futuras mejoras", "7. Current status and future improvements"),
        body: l([
          "**Estado actual:** V2 ejecuta el recorrido desde una imagen hasta un plan provisional. Cuenta con configuración centralizada, modelos seleccionados, resultados trazables y pruebas estructurales y de humo documentadas. El clasificador principal cubre siete cortes de pollo; las medidas físicas necesitan calibración y el planificador requiere revisión humana.",
          "**Siguientes pasos:** validar el sistema con recortes de una cámara real y sesiones independientes; ampliar y equilibrar alimentos y preparaciones; calibrar la cámara para convertir píxeles en medidas físicas; recopilar ensayos de tiempo, peso, grosor y temperatura interna en un aparato concreto; recalibrar los perfiles y umbrales con esos datos; y medir el rendimiento y la latencia en el hardware objetivo. La ampliación y profesionalizacion del proyecto sigue en constante desarrollo.",
        ].join("\n\n"), [
          "**Current status:** V2 runs the workflow from an image to a provisional plan. It has central configuration, selected models, traceable outputs, and documented structural and smoke tests. The main classifier covers seven chicken cuts; physical measurements need calibration and the planner requires human review.",
          "**Next steps:** validate the system on crops from a real camera and independent sessions; expand and balance foods and preparations; calibrate the camera to convert pixels into physical measurements; collect trials for time, weight, thickness and internal temperature on a specific appliance; recalibrate profiles and thresholds with those data; and measure performance and latency on the target hardware. The project’s expansion and professionalisation are ongoing.",
        ].join("\n\n"))
      }
    ],
    technologies: ["Python", "PyTorch", "DINOv3", "YOLO11n", "SAM 2.1", "SegFormer", "OpenCV", "scikit-learn"],
    metrics: [
      { value: "7", label: l("cortes de pollo integrados", "integrated chicken cuts"), evidence: "Airfryer V2 · configuración operativa" },
      { value: "91,71%", label: l("accuracy del clasificador · 603 imágenes de test", "classifier accuracy · 603 test images"), evidence: "Airfryer V2 · documentación técnica general, sección 5" },
      { value: "92,82%", label: l("IoU de alimento/fondo · casos positivos", "food/background IoU · positive cases"), evidence: "Airfryer V2 · documentación técnica general, sección 3" }
    ],
    links: [
      { label: l("Ver proyecto en GitHub", "View project on GitHub"), href: "https://github.com/DuarteFernandezPineiro/vision-artificial-cocinado-inteligente", kind: "external" },
      { label: l("Arquitectura técnica (PDF)", "Technical architecture (PDF)"), href: "https://github.com/DuarteFernandezPineiro/vision-artificial-cocinado-inteligente/blob/main/Arquitectura%20T%C3%A9cnica%20Airfryer.md.pdf", kind: "external" }
    ]
  },
  {
    slug: "twinphoto",
    documentationSections: twinphotoDocumentationSections,
    order: 3,
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
    documentationSections: bitcoinDocumentationSections,
    order: 4,
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
      "Proyecto experimental que analiza el sentimiento general acerca de bitcoin, como asesoramiento para posibles inversiones",
      "Experimental project that analyses general sentiment around Bitcoin as guidance for potential investments."
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
    documentationSections: assistantDocumentationSections,
    order: 5,
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
