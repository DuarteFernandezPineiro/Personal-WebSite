import type { Locale } from "@duarte/content";

function Node({ x, y, width = 260, lines }: { x: number; y: number; width?: number; lines: string[] }) {
  return (
    <g className="rag-diagram__node">
      <rect x={x} y={y} width={width} height={65} rx={9} />
      <text x={x + width / 2} y={y + (lines.length > 1 ? 27 : 38)} textAnchor="middle">
        {lines.map((line, index) => <tspan key={line} x={x + width / 2} dy={index ? 21 : 0}>{line}</tspan>)}
      </text>
    </g>
  );
}

export function RagPipelineDiagram({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const labels = es ? {
    title: "Arquitectura del RAG documental",
    description: "Los PDF se preparan e indexan con BM25 y embeddings en Chroma. Las consultas combinan ambos índices mediante RRF, con reranking opcional, y generan respuestas con referencias.",
    preparation: "Preparación del corpus", query: "Consulta",
    extraction: ["Extracción por página", "y normalización"], metadata: ["Markdown y metadatos", "trazables"], chunks: ["Segmentación semántica"],
    bm25: ["Índice BM25"], vectors: ["Embeddings y", "colección Chroma"], question: ["Pregunta y filtros"], retrieval: ["Recuperación léxica", "y vectorial"],
    fusion: ["Fusión RRF"], reranking: ["Reranking Jina opcional"], context: ["Contexto con fuentes"], answer: ["Respuesta OpenAI", "y referencias"], bypass: ["reranking", "desactivado"]
  } : {
    title: "Document RAG architecture",
    description: "PDFs are prepared and indexed with BM25 and embeddings in Chroma. Queries combine both indexes through RRF, with optional reranking, and generate answers with references.",
    preparation: "Corpus preparation", query: "Query",
    extraction: ["Page extraction", "and normalisation"], metadata: ["Markdown and traceable", "metadata"], chunks: ["Semantic chunking"],
    bm25: ["BM25 index"], vectors: ["Embeddings and", "Chroma collection"], question: ["Question and filters"], retrieval: ["Lexical and", "vector retrieval"],
    fusion: ["RRF fusion"], reranking: ["Optional Jina reranking"], context: ["Context with sources"], answer: ["OpenAI answer", "and references"], bypass: ["reranking", "disabled"]
  };
  return (
    <figure className="rag-diagram" data-project-diagram="rag" aria-label={labels.title}>
      <div className="rag-diagram__viewport" tabIndex={0} role="region" aria-label={es ? "Diagrama desplazable del RAG" : "Scrollable RAG diagram"}>
        <svg className="rag-diagram__svg" viewBox="0 0 900 1050" role="img" aria-labelledby="rag-diagram-title" aria-describedby="rag-diagram-description">
          <title id="rag-diagram-title">{labels.title}</title>
          <desc id="rag-diagram-description">{labels.description}</desc>
          <defs><marker id="rag-diagram-arrow" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>
          <rect className="rag-diagram__stage" x={20} y={20} width={860} height={335} rx={16} />
          <rect className="rag-diagram__stage rag-diagram__stage--query" x={20} y={395} width={860} height={630} rx={16} />
          <text className="rag-diagram__heading" x={45} y={55}>{labels.preparation}</text>
          <text className="rag-diagram__heading" x={45} y={435}>{labels.query}</text>
          <g className="rag-diagram__edges">
            <path d="M155 118 H185" /><path d="M380 118 H410" /><path d="M610 118 H640" />
            <path d="M745 151 V200 H510 V250" /><path d="M745 151 V250" />
            <path d="M510 315 V375 H480 V485" /><path d="M750 315 V385 H560 V485" />
            <path d="M270 518 H360" /><path d="M490 550 V600" /><path d="M490 665 V710" />
            <path d="M490 775 V820" /><path d="M490 885 V930" />
            <path className="rag-diagram__bypass" d="M620 632 H770 V852 H620" />
          </g>
          <text className="rag-diagram__note" x={748} y={728} textAnchor="end"><tspan x={748}>{labels.bypass[0]}</tspan><tspan x={748} dy={19}>{labels.bypass[1]}</tspan></text>
          <Node x={45} y={86} width={110} lines={["PDF"]} />
          <Node x={185} y={86} width={195} lines={labels.extraction} />
          <Node x={410} y={86} width={200} lines={labels.metadata} />
          <Node x={640} y={86} width={210} lines={labels.chunks} />
          <Node x={410} y={250} width={200} lines={labels.bm25} />
          <Node x={650} y={250} width={200} lines={labels.vectors} />
          <Node x={45} y={485} width={225} lines={labels.question} />
          <Node x={360} y={485} lines={labels.retrieval} />
          <Node x={360} y={600} lines={labels.fusion} />
          <Node x={360} y={710} lines={labels.reranking} />
          <Node x={360} y={820} lines={labels.context} />
          <Node x={360} y={930} lines={labels.answer} />
        </svg>
      </div>
    </figure>
  );
}
