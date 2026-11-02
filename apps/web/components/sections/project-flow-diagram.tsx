import { translate, type Locale } from "@duarte/content";
import { projectFlowDiagrams, type FlowProject } from "./project-flow-diagrams";

export function ProjectFlowDiagram({ project, locale }: { project: FlowProject; locale: Locale }) {
  const diagram = projectFlowDiagrams[project];
  const title = translate(diagram.title, locale);
  const markerId = `${project}-flow-arrow`;
  return (
    <figure className="project-flow" data-project-diagram={project} aria-label={title}>
      <div className="project-flow__viewport" tabIndex={0} role="region" aria-label={`${locale === "es" ? "Diagrama desplazable" : "Scrollable diagram"}: ${title}`}>
        <svg className="project-flow__svg" viewBox={`0 0 900 ${diagram.height}`} role="img" aria-labelledby={`${project}-flow-title`} aria-describedby={`${project}-flow-description`}>
          <title id={`${project}-flow-title`}>{title}</title>
          <desc id={`${project}-flow-description`}>{translate(diagram.description, locale)}</desc>
          <defs><marker id={markerId} viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" /></marker></defs>
          {diagram.stages.map((stage, index) => <g key={stage.y}><rect className={`project-flow__stage project-flow__stage--${index % 2}`} x={20} y={stage.y} width={860} height={stage.height} rx={16} /><text className="project-flow__heading" x={40} y={stage.y + 30}>{translate(stage.label, locale)}</text></g>)}
          <g className="project-flow__edges">{diagram.edges.map((edge, index) => <path key={index} d={edge.d} strokeDasharray={edge.dashed ? "5 5" : undefined} markerEnd={`url(#${markerId})`} markerStart={edge.both ? `url(#${markerId})` : undefined} />)}</g>
          {diagram.edges.filter((edge) => edge.label).map((edge, index) => <text key={index} className="project-flow__label" x={edge.x} y={edge.y} textAnchor="middle">{translate(edge.label!, locale)}</text>)}
          {diagram.nodes.map((node) => <g className="project-flow__node" key={node.id} data-flow-node={node.id}>
            <rect x={node.x} y={node.y} width={node.width} height={65} rx={9} />
            <text x={node.x + node.width / 2} y={node.y + (node.lines[locale].length > 1 ? 27 : 38)} textAnchor="middle">{node.lines[locale].map((line, index) => <tspan key={index} x={node.x + node.width / 2} dy={index ? 21 : 0}>{line}</tspan>)}</text>
          </g>)}
        </svg>
      </div>
    </figure>
  );
}
