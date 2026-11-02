import type { Locale } from "@duarte/content";

type NodeTone = "input" | "vision" | "analysis" | "planning";

function DiagramNode({
  x,
  y,
  width,
  height,
  title,
  detail,
  tone
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  detail: string;
  tone: NodeTone;
}) {
  return (
    <g className={`airfryer-diagram__node airfryer-diagram__node--${tone}`}>
      <rect x={x} y={y} width={width} height={height} rx="8" />
      <text x={x + width / 2} y={y + 21} textAnchor="middle">
        <tspan className="airfryer-diagram__node-title">{title}</tspan>
        <tspan className="airfryer-diagram__node-detail" x={x + width / 2} dy="17">{detail}</tspan>
      </text>
    </g>
  );
}

export function AirfryerPipelineDiagram({ locale }: { locale: Locale }) {
  const isEs = locale === "es";
  const labels = isEs
    ? {
        title: "Pipeline de visión y planificación de Airfryer",
        description: "Una foto se normaliza y se procesa en paralelo para estimar ocupación y separar piezas. Los modelos analizan cada pieza; las reglas producen un plan provisional para revisión humana.",
        input: "Entrada y preparación",
        vision: "Visión y separación",
        analysis: "Análisis por pieza",
        planning: "Planificación y revisión",
        photo: "Foto de la cesta",
        normalize: "y orientación EXIF",
        occupancyModel: "alimento / fondo y ocupación",
        detection: "detección de piezas",
        masks: "refinamiento de máscaras",
        crops: "recortes por pieza · IDs",
        occupancyControl: "control de ocupación y máscaras",
        chicken: "7 cortes de pollo",
        breading: "atributo de rebozado",
        geometry: "área, caja y forma en píxeles",
        rules: "motor determinista · perfiles JSON",
        plan: "plan por pieza y por tanda",
        review: "revisión humana · termómetro"
      }
    : {
        title: "Airfryer vision and planning pipeline",
        description: "A photo is normalised and processed in parallel to estimate occupancy and separate pieces. Models analyse each piece; rules produce a provisional plan for human review.",
        input: "Input and preparation",
        vision: "Vision and separation",
        analysis: "Per-piece analysis",
        planning: "Planning and review",
        photo: "Basket photo",
        normalize: "and EXIF orientation",
        occupancyModel: "food / background and occupancy",
        detection: "piece detection",
        masks: "mask refinement",
        crops: "per-piece crops · IDs",
        occupancyControl: "occupancy and mask checks",
        chicken: "7 chicken cuts",
        breading: "breading attribute",
        geometry: "pixel area, box and shape",
        rules: "deterministic engine · JSON profiles",
        plan: "plan by piece and batch",
        review: "human review · thermometer"
      };

  return (
    <figure className="airfryer-diagram" aria-label={labels.title}>
      <div className="airfryer-diagram__viewport" tabIndex={0} aria-label={isEs ? "Diagrama desplazable" : "Scrollable diagram"}>
        <svg className="airfryer-diagram__svg" viewBox="0 0 720 710" role="img" aria-labelledby="airfryer-diagram-title airfryer-diagram-description">
          <title id="airfryer-diagram-title">{labels.title}</title>
          <desc id="airfryer-diagram-description">{labels.description}</desc>
          <defs>
            <marker id="airfryer-diagram-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" markerUnits="strokeWidth">
              <path d="M0 0 L8 4 L0 8 z" />
            </marker>
          </defs>

          <rect className="airfryer-diagram__group airfryer-diagram__group--input" x="16" y="14" width="688" height="98" rx="12" />
          <rect className="airfryer-diagram__group airfryer-diagram__group--vision" x="16" y="138" width="688" height="226" rx="12" />
          <rect className="airfryer-diagram__group airfryer-diagram__group--analysis" x="16" y="390" width="688" height="136" rx="12" />
          <rect className="airfryer-diagram__group airfryer-diagram__group--planning" x="16" y="552" width="688" height="132" rx="12" />

          <text className="airfryer-diagram__group-title" x="32" y="36">{labels.input}</text>
          <text className="airfryer-diagram__group-title" x="32" y="160">{labels.vision}</text>
          <text className="airfryer-diagram__group-title" x="32" y="412">{labels.analysis}</text>
          <text className="airfryer-diagram__group-title" x="32" y="574">{labels.planning}</text>

          <g className="airfryer-diagram__edges" aria-hidden="true">
            <path d="M280 77 H438" markerEnd="url(#airfryer-diagram-arrow)" />
            <path d="M548 102 V138" markerEnd="url(#airfryer-diagram-arrow)" />
            <path className="airfryer-diagram__edge--control" d="M228 228 H248" markerEnd="url(#airfryer-diagram-arrow)" />
            <path d="M188 306 H218" markerEnd="url(#airfryer-diagram-arrow)" />
            <path d="M368 306 H398" markerEnd="url(#airfryer-diagram-arrow)" />
            <path d="M360 364 V390" markerEnd="url(#airfryer-diagram-arrow)" />
            <path d="M360 526 V552" markerEnd="url(#airfryer-diagram-arrow)" />
            <path d="M230 628 H258" markerEnd="url(#airfryer-diagram-arrow)" />
            <path d="M462 628 H490" markerEnd="url(#airfryer-diagram-arrow)" />
          </g>

          <DiagramNode x={60} y={52} width={220} height={50} title={labels.photo} detail="" tone="input" />
          <DiagramNode x={438} y={52} width={220} height={50} title={isEs ? "Normalización RGB" : "RGB normalisation"} detail={labels.normalize} tone="input" />
          <DiagramNode x={38} y={200} width={190} height={56} title="SegFormer-B0" detail={labels.occupancyModel} tone="vision" />
          <DiagramNode x={248} y={200} width={190} height={56} title={isEs ? "Control" : "Checks"} detail={labels.occupancyControl} tone="vision" />
          <DiagramNode x={38} y={278} width={150} height={56} title="YOLO11n 512" detail={labels.detection} tone="vision" />
          <DiagramNode x={218} y={278} width={150} height={56} title="SAM 2.1 Tiny" detail={labels.masks} tone="vision" />
          <DiagramNode x={398} y={278} width={200} height={56} title={isEs ? "Recortes por pieza" : "Per-piece crops"} detail={labels.crops} tone="vision" />
          <DiagramNode x={38} y={438} width={198} height={58} title="DINOv3 ConvNeXt-B" detail={labels.chicken} tone="analysis" />
          <DiagramNode x={260} y={438} width={198} height={58} title="DINOv3 ViT-B/16 + SVM RBF" detail={labels.breading} tone="analysis" />
          <DiagramNode x={482} y={438} width={198} height={58} title={isEs ? "Geometría" : "Geometry"} detail={labels.geometry} tone="analysis" />
          <DiagramNode x={38} y={597} width={192} height={62} title={isEs ? "Motor de reglas" : "Rule engine"} detail={labels.rules} tone="planning" />
          <DiagramNode x={258} y={597} width={204} height={62} title={isEs ? "Plan provisional" : "Provisional plan"} detail={labels.plan} tone="planning" />
          <DiagramNode x={490} y={597} width={198} height={62} title={isEs ? "Revisión humana" : "Human review"} detail={labels.review} tone="planning" />
        </svg>
      </div>
    </figure>
  );
}
