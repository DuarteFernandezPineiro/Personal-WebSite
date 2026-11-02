# Implementación de documentación de proyectos

Guía breve para Codex. Leer antes de modificar la documentación visible de un proyecto. Resultado de referencia: Airfryer, apartados 1–2 junto a la ficha y apartados 3 en adelante a todo el ancho, en orden vertical.

Si la petición es crear primero un documento a partir de una carpeta de proyecto, seguir [`Creacion_Documentacion.md`](Creacion_Documentacion.md). Esa fase genera un `.md` para revisión; esta guía se aplica después, cuando Duarte pida expresamente actualizar la web. La entrega o revisión del borrador no autoriza por sí sola su publicación.

## Alcance y campos protegidos

- El documento aportado por Duarte es una fuente de solo lectura. Modificarlo únicamente si lo pide expresamente como archivo de salida.
- Una petición de «actualizar la documentación» cambia solo los apartados del proyecto indicado. Conservar sus títulos, orden y texto cuando se solicite reproducir la fuente; no resumir ni reformular sin autorización.
- Preservar `title`, `summary` (introducción/subtítulo bajo el título), `eyebrow`, `year`, `status`, `category`, `technologies`, `metrics`, `links`, vídeo, orden y proyectos vecinos, salvo petición expresa.
- No sustituir `summary` por el primer párrafo, la etiqueta o el título del documento. El hero siempre muestra `project.summary`.
- Mantener versiones ES y EN equivalentes; no inventar cifras ni convertir resultados de módulos en resultados de cocinado.
- Revisar el diff respecto al estado inicial de la tarea. Conservar cambios ajenos ya presentes.

## Mapa mínimo de archivos

| Archivo | Uso |
| --- | --- |
| `packages/content/src/content.ts` | Buscar el `slug`; editar únicamente `documentationSections` del proyecto. |
| `packages/content/src/rag-documentation.ts` | Apartados ES/EN de RAG; el español reproduce el Markdown revisado del TFG. |
| `packages/content/src/{twinphoto,assistant,bitcoin}-documentation.ts` | Apartados ES/EN de los otros tres proyectos; el español reproduce sus Markdown revisados. |
| `packages/content/src/types.ts` | `ProjectDocumentationSection`: `heading` y `body` como `LocalizedText`. `Project.documentationSections` es opcional. |
| `apps/web/app/[locale]/projects/[slug]/page.tsx` | Selección de plantilla y reparto de apartados. Hero y ficha obtienen sus campos habituales. |
| `apps/web/components/sections/project-documentation.tsx` | Renderizado seguro de Markdown y generación de IDs. |
| `apps/web/app/globals.css` | Buscar `case-layout--documentation`, `case-article--wide`, `case-document-*` y `airfryer-diagram`. |
| `apps/web/e2e/project-documentation-smoke.mjs` | Prueba de todos los proyectos, locales y tamaños; descubre proyectos en el archivo público. |
| `apps/web/e2e/visual-smoke.mjs` | Flujo visual general; incluye la prueba anterior. |

Leer también las instrucciones del ámbito afectado (`packages/content/AGENTS.md`, `apps/web/AGENTS.md`). Para texto basta inspeccionar el bloque del proyecto y el renderizador; evitar recorrer todo el repositorio.

## Implementación habitual

1. Identificar el `slug` y registrar el estado inicial de los campos protegidos. Leer la fuente y comprobar los apartados antes de editar.
2. Crear o actualizar `documentationSections: [{ heading: { es, en }, body: { es, en } }]` en el proyecto seleccionado. Cada entrada representa un apartado completo. No cambiar los campos narrativos de la plantilla antigua para alimentar esta plantilla.
3. Mantener el fallback completo. Si el contenido procede de Sanity, comprobar su precedencia en `getPortfolioContent`; el fallback local no actualiza un registro remoto que ya lo sobrescriba.
4. Si se introduce un campo nuevo, revisar también el contrato, el esquema de Studio y la consulta/merge de `apps/web/lib/content-repository.ts`. No modificar contratos para una simple actualización de texto.
5. Conservar títulos originales y párrafos/listas. El renderizador admite párrafos, listas `- `, negrita, código en línea y separadores. Los enlaces Markdown actuales muestran su etiqueta, sin navegar a rutas relativas del documento original.
6. Mermaid: el bloque cercado debe tratarse completo, incluidas sus líneas vacías. La página selecciona explícitamente el componente por `slug` y lo pasa como `diagram` a ambos grupos de `ProjectDocumentation`: `AirfryerPipelineDiagram`, `RagPipelineDiagram` o `ProjectFlowDiagram` (TwinPhoto, asistente y Bitcoin; sus nodos/conexiones bilingües están en `project-flow-diagrams.ts`). Para otro proyecto, implementar y seleccionar su propio diagrama; sin componente se muestra código como texto seguro, nunca el diagrama de otro proyecto. No ejecutar Markdown ni insertar HTML sin sanear.

## Contrato de composición visual

- Con `documentationSections`, el primer `.case-article` recibe `slice(0, 2)`. La ficha `.case-facts` permanece a su derecha en escritorio.
- El contenedor `.case-article--wide` recibe `slice(2)` y `startIndex={2}`. Ocupa `grid-column: 1 / -1`, `width: 100%` y `max-width: none`.
- El apartado 3 empieza **debajo del 2**. Los apartados siguientes se apilan y utilizan el mismo borde izquierdo y derecho del marco de contenido. No alternar apartados entre columnas ni ponerlos en el hueco estrecho de la ficha.
- Mantener los IDs `case-document-section-1`… sin duplicarlos al dividir los grupos. Títulos con tamaño consistente y `scroll-margin-top` para la cabecera fija.
- La ficha de esta plantilla es estática: termina antes del grupo expandido. No hacerla sticky sobre los apartados a todo el ancho.
- En móvil hay una sola columna; la ficha queda tras la documentación. Los diagramas grandes se desplazan dentro de su propio contenedor, sin desbordar la página.
- El contenido del hero y los datos de la ficha conservan su fuente original. Las páginas sin `documentationSections` usan la plantilla anterior.
- La visibilidad de la etiqueta del hero no depende de añadir `documentationSections`: RAG conserva «Trabajo de Fin de Grado» y el año; Airfryer mantiene su excepción visual previa.
- No usar `display: contents` para convertir cada apartado en una celda del grid exterior ni reglas `nth-child` para alternarlos: eso produjo desorden y títulos apelotonados.

## Comprobaciones obligatorias

Con el servidor local actualizado y activo:

```powershell
npm run check
npm run lint --workspace @duarte/web
npm run build
npm run test:documentation
npm run test:e2e
git diff --check
```

`test:e2e` ya incluye `test:documentation`; basta una ejecución completa correcta. La prueba específica sirve para iterar sin repetir el resto del sitio. Usar `PLAYWRIGHT_BASE_URL` si cambia el puerto y `PLAYWRIGHT_CHROMIUM_EXECUTABLE` si cambia Chromium.

La prueba descubre todos los proyectos y comprueba ES/EN en 1440×900, 1920×1080, 390×844 y movimiento reducido. Revisa orden, solapamiento con la ficha al desplazarse por cada apartado, IDs únicos, márgenes del grupo expandido y desbordamiento. Las capturas quedan en `test-results/` y son artefactos de revisión, no fuentes de arquitectura.

Revisar visualmente las capturas de escritorio y móvil y el foco por teclado con el flujo general. Si se sirve con `next start`, reconstruir y reiniciar tras cambiar contenido o CSS; recargar una compilación antigua no muestra los cambios.

Antes de entregar: confirmar que solo cambió el proyecto solicitado y los archivos necesarios, que el documento original está intacto y que título, introducción y ficha conservan sus valores. Facilitar una vista previa actualizada e informar de cualquier comprobación pendiente o fallida.
