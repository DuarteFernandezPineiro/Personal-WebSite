import type { LocalizedText } from "@duarte/content";

export type FlowProject = "twinphoto" | "asistente-profesional" | "bitcoin-sentiment";
type FlowNode = { id: string; x: number; y: number; width: number; lines: { es: string[]; en: string[] } };
type FlowEdge = { d: string; both?: boolean; dashed?: boolean; label?: LocalizedText; x?: number; y?: number };
type FlowStage = { y: number; height: number; label: LocalizedText };
type FlowDiagram = { title: LocalizedText; description: LocalizedText; height: number; stages: FlowStage[]; nodes: FlowNode[]; edges: FlowEdge[] };
const l = (es: string, en: string): LocalizedText => ({ es, en });
const n = (id: string, x: number, y: number, width: number, es: string[], en: string[]): FlowNode => ({ id, x, y, width, lines: { es, en } });

export const projectFlowDiagrams: Record<FlowProject, FlowDiagram> = {
  twinphoto: {
    title: l("Arquitectura de TwinPhoto", "TwinPhoto architecture"),
    description: l("Las carpetas locales o la caché móvil alimentan el inventario. Los hashes perceptuales y el índice forman grupos para revisar. El borrado seleccionado exige confirmación y se dirige al archivo local o al dispositivo WPD.", "Local folders or the mobile cache feed an inventory. Perceptual hashes and the index form groups for review. Selected deletion requires confirmation and targets the local file or the WPD device."),
    height: 825,
    stages: [{ y: 20, height: 170, label: l("Revisión y control", "Review and control") }, { y: 215, height: 580, label: l("Datos y análisis perceptual", "Data and perceptual analysis") }],
    nodes: [
      n("user", 40, 90, 150, ["Usuario"], ["User"]),
      n("ui", 310, 90, 280, ["Interfaz de escritorio"], ["Desktop interface"]),
      n("delete", 650, 90, 210, ["Borrado seleccionado"], ["Selected deletion"]),
      n("wpd", 650, 260, 210, ["Puente WPD"], ["WPD bridge"]),
      n("cache", 650, 390, 210, ["Caché local del móvil"], ["Local mobile cache"]),
      n("scan", 310, 390, 280, ["Inventario de imágenes"], ["Image inventory"]),
      n("database", 40, 535, 210, ["Caché SQLite", "de hashes"], ["SQLite hash", "cache"]),
      n("hash", 310, 535, 280, ["Hash perceptual pHash"], ["Perceptual hash: pHash"]),
      n("local", 650, 535, 210, ["Carpeta analizada"], ["Analysed folder"]),
      n("index", 310, 680, 280, ["Índice de candidatos", "y agrupación"], ["Candidate index", "and grouping"])
    ],
    edges: [
      { d: "M190 122 H310" },
      { d: "M590 122 H650", label: l("confirmar", "confirm"), x: 620, y: 110 },
      { d: "M450 155 V390", label: l("carpeta local", "local folder"), x: 450, y: 295 },
      { d: "M590 143 H620 V292 H650", label: l("USB", "USB"), x: 618, y: 240 },
      { d: "M755 325 V390", label: l("imágenes públicas", "public images"), x: 755, y: 360 },
      { d: "M650 422 H590" },
      { d: "M310 430 H270 V567 H250", both: true },
      { d: "M450 455 V535" }, { d: "M450 600 V680" },
      { d: "M310 712 H280 V140 H310", label: l("grupos", "groups"), x: 278, y: 657 },
      { d: "M755 155 V260", dashed: true, label: l("dispositivo", "device"), x: 755, y: 220 },
      { d: "M860 122 H885 V567 H860", dashed: true, label: l("archivo local", "local file"), x: 803, y: 510 }
    ]
  },
  "asistente-profesional": {
    title: l("Arquitectura del asistente profesional", "Professional assistant architecture"),
    description: l("FastAPI valida la pregunta y coordina al modelo de OpenAI con un catálogo documental y un índice de proyectos. La respuesta vuelve por streaming NDJSON; solo las conversaciones completadas se conservan en memoria.", "FastAPI validates the question and coordinates the OpenAI model with a document catalogue and project index. The answer returns through NDJSON streaming; only completed conversations are retained in memory."),
    height: 780,
    stages: [{ y: 20, height: 170, label: l("Interacción", "Interaction") }, { y: 215, height: 530, label: l("Generación y fuentes", "Generation and sources") }],
    nodes: [
      n("visitor", 40, 90, 150, ["Visitante"], ["Visitor"]),
      n("ui", 310, 90, 250, ["Interfaz web"], ["Web interface"]),
      n("api", 310, 285, 250, ["Servicio FastAPI"], ["FastAPI service"]),
      n("llm", 650, 285, 210, ["API de modelo OpenAI"], ["OpenAI model API"]),
      n("catalogue", 40, 470, 250, ["Catálogo y documentos", "Markdown"], ["Catalogue and Markdown", "documents"]),
      n("projects", 610, 470, 250, ["Índice estructurado", "de proyectos"], ["Structured", "project index"]),
      n("session", 310, 630, 250, ["Sesión en memoria", "respuestas completadas"], ["In-memory session", "completed answers"])
    ],
    edges: [
      { d: "M190 122 H310" },
      { d: "M435 155 V285", label: l("pregunta y detalle", "question and detail"), x: 450, y: 220 },
      { d: "M310 317 H275 V140 H310", label: l("NDJSON", "NDJSON"), x: 235, y: 220 },
      { d: "M560 300 H650", label: l("plan / evidencias", "plan / evidence"), x: 605, y: 280 },
      { d: "M650 335 H560", label: l("fuentes / respuesta", "sources / answer"), x: 605, y: 370 },
      { d: "M340 350 V405 H165 V470" }, { d: "M215 470 V430 H390 V350" },
      { d: "M530 350 V405 H735 V470" }, { d: "M685 470 V430 H480 V350" },
      { d: "M435 350 V630", dashed: true, label: l("historial", "history"), x: 435, y: 580 }
    ]
  },
  "bitcoin-sentiment": {
    title: l("Arquitectura de Bitcoin Decision Chat", "Bitcoin Decision Chat architecture"),
    description: l("Un mensaje validado se normaliza y transforma en un embedding. Dos ensembles LightGBM aplican umbrales secuenciales para producir una orientación experimental. OpenAI redacta la explicación, con alternativa local cuando falla el servicio.", "A validated message is normalised and embedded. Two LightGBM ensembles apply sequential thresholds to produce experimental guidance. OpenAI writes the explanation, with a local alternative when the service fails."),
    height: 1320,
    stages: [{ y: 20, height: 530, label: l("Entrada y representación", "Input and representation") }, { y: 570, height: 575, label: l("Clasificación secuencial", "Sequential classification") }, { y: 1165, height: 130, label: l("Explicación", "Explanation") }],
    nodes: [
      n("user", 40, 90, 150, ["Persona usuaria"], ["User"]),
      n("ui", 310, 90, 250, ["Interfaz web"], ["Web interface"]),
      n("validation", 310, 220, 250, ["Validación y filtro Bitcoin"], ["Validation and Bitcoin filter"]),
      n("normalise", 310, 345, 250, ["Normalización del texto"], ["Text normalisation"]),
      n("embedding", 310, 470, 250, ["Embedding semántico"], ["Semantic embedding"]),
      n("negative", 310, 610, 250, ["Ensemble:", "señales negativas"], ["Ensemble:", "negative signals"]),
      n("neutral", 310, 760, 250, ["Ensemble:", "señales neutrales"], ["Ensemble:", "neutral signals"]),
      n("no-invest", 650, 760, 210, ["Do not invest"], ["Do not invest"]),
      n("invest", 310, 920, 250, ["Invest"], ["Invest"]),
      n("result", 310, 1060, 250, ["Orientación general"], ["General guidance"]),
      n("explanation", 310, 1215, 250, ["Explicación con OpenAI"], ["OpenAI explanation"]),
      n("fallback", 650, 1215, 210, ["Explicación local"], ["Local explanation"])
    ],
    edges: [
      { d: "M190 122 H310" }, { d: "M435 155 V220", label: l("mensaje en inglés", "English message"), x: 435, y: 193 },
      { d: "M435 285 V345" }, { d: "M435 410 V470" }, { d: "M435 535 V610" },
      { d: "M560 642 H755 V760", label: l("prob. negativa < umbral", "negative prob. < threshold"), x: 725, y: 625 },
      { d: "M435 675 V760", label: l("prob. negativa ≥ umbral", "negative prob. ≥ threshold"), x: 430, y: 720 },
      { d: "M560 792 H650", label: l("< umbral", "< threshold"), x: 605, y: 780 },
      { d: "M435 825 V920", label: l("prob. neutral ≥ umbral", "neutral prob. ≥ threshold"), x: 435, y: 875 },
      { d: "M435 985 V1060" }, { d: "M755 825 V1092 H560" }, { d: "M435 1125 V1215" },
      { d: "M560 1247 H650", dashed: true, label: l("error / sin servicio", "error / no service"), x: 605, y: 1203 },
      { d: "M310 1247 H260 V140 H310" }, { d: "M860 1247 H885 V122 H560" }
    ]
  }
};
