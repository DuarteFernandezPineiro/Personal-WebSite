import type { ProjectDocumentationSection } from './types';

export const twinphotoDocumentationSections: ProjectDocumentationSection[] = [
  {
    heading: {
      es: "1. Resumen del proyecto",
      en: "1. Project overview",
    },
    body: {
      es: "TwinPhoto es una aplicación de escritorio para localizar fotografías visualmente parecidas en carpetas locales y, en Windows, en galerías públicas de dispositivos conectados por USB. Está dirigida a personas que quieren revisar colecciones grandes y encontrar duplicados o variantes antes de decidir qué conservar. Su aportación principal es combinar comparación perceptual, reutilización de caché y revisión visual con una acción de borrado explícita, evitando que el análisis modifique los originales.",
      en: "TwinPhoto is a desktop application for finding visually similar photographs in local folders and, on Windows, in public galleries on USB-connected devices. It is intended for people who want to review large collections and find duplicates or variants before deciding what to keep. Its main contribution is to combine perceptual comparison, cache reuse and visual review with an explicit deletion action, so analysis does not modify the originals.",
    },
  },
  {
    heading: {
      es: "2. Problema y objetivos",
      en: "2. Problem and objectives",
    },
    body: {
      es: "Las colecciones fotográficas acumulan copias redimensionadas, recomprimidas o editadas que no se detectan comparando nombres o tamaños. Revisarlas una a una consume tiempo, y una eliminación automática por similitud puede descartar una imagen que el usuario quería conservar. En móviles, el acceso MTP puede ser lento y depende de lo que Windows exponga.\n\nEl objetivo fue agrupar imágenes según su apariencia, facilitar su revisión y dejar la decisión final a la persona. Los análisis repetidos reutilizan resultados y el acceso móvil conserva copias temporales e inventario. El alcance es una aplicación de escritorio para Windows y carpetas locales.",
      en: "Photo collections accumulate resized, recompressed or edited copies that cannot be detected by comparing names or file sizes. Reviewing them one by one takes time, and automatic deletion based only on similarity can discard an image the user wanted to keep. On mobile devices, MTP access can be slow and depends on what Windows exposes.\n\nThe objective was to group images by appearance, make them easier to review and leave the final decision to the user. Repeated analyses reuse results, and mobile access keeps temporary copies and an inventory. The scope is a desktop application for Windows and local folders.",
    },
  },
  {
    heading: {
      es: "3. Solución y arquitectura",
      en: "3. Solution and architecture",
    },
    body: {
      es: "El usuario elige una carpeta o dispositivo y ajusta el umbral. Para carpetas, el analizador consulta SQLite; para móviles, la integración enumera contenido público mediante WPD y prepara una caché local. El mismo motor calcula hashes, busca candidatos y forma grupos. La interfaz presenta miniaturas para revisar y seleccionar imágenes. El borrado exige confirmación y, en móviles, se verifica con el dispositivo antes de actualizar la caché.\n\n```mermaid\nflowchart LR\n    U[Usuario] --> UI[Interfaz de escritorio]\n    UI -->|Carpeta local| Scan[Inventario de imágenes]\n    UI -->|Dispositivo USB en Windows| WPD[Puente WPD]\n    WPD -->|Imágenes públicas| CacheM[Caché local del móvil]\n    CacheM --> Scan\n    Scan <--> DB[(Caché SQLite de hashes)]\n    Scan --> Hash[Hash perceptual pHash]\n    Hash --> Index[Índice de candidatos y agrupación]\n    Index --> UI\n    UI -->|Revisión y confirmación| Delete[Borrado seleccionado]\n    Delete -->|Archivo local| Local[Carpeta analizada]\n    Delete -->|Identificadores del dispositivo| WPD\n```",
      en: "The user chooses a folder or device and sets a similarity threshold. For folders, the analyzer consults SQLite; for mobile devices, the integration enumerates public content through WPD and prepares a local cache. The same engine calculates hashes, searches for candidates and forms groups. The interface displays thumbnails for review and selection. Deletion requires confirmation and, on mobile devices, is verified with the device before the cache is updated.\n\n```mermaid\nflowchart LR\n    U[User] --> UI[Desktop interface]\n    UI -->|Local folder| Scan[Image inventory]\n    UI -->|USB device on Windows| WPD[WPD bridge]\n    WPD -->|Public images| CacheM[Local mobile cache]\n    CacheM --> Scan\n    Scan <--> DB[(SQLite hash cache)]\n    Scan --> Hash[Perceptual hash pHash]\n    Hash --> Index[Candidate index and grouping]\n    Index --> UI\n    UI -->|Review and confirmation| Delete[Selected deletion]\n    Delete -->|Local file| Local[Scanned folder]\n    Delete -->|Device identifiers| WPD\n```",
    },
  },
  {
    heading: {
      es: "4. Desarrollo y decisiones técnicas",
      en: "4. Development and technical decisions",
    },
    body: {
      es: "El núcleo está implementado en Python. Pillow decodifica y normaliza las imágenes, NumPy realiza el cálculo numérico y pillow-heif amplía la lectura a formatos HEIF/HEIC. El código aplica la orientación EXIF, convierte la imagen a escala de grises, la reduce a 32 × 32 píxeles y calcula una transformada discreta del coseno. A partir de sus coeficientes de baja frecuencia genera un pHash de 64 bits; la comparación entre dos imágenes se basa en la distancia de Hamming entre esos hashes. Por eso la similitud es perceptual: una puntuación máxima significa hash idéntico, no identidad byte a byte.\n\nLos niveles disponibles son 80 %, 90 %, 95 % y 100 %. Cada nivel se traduce en una distancia máxima de bits distintos. Para evitar comparar exhaustivamente cada imagen con todas las demás, el motor divide los hashes en fragmentos y consulta un índice de candidatos; después verifica la distancia exacta antes de unir dos imágenes. La agrupación usa una estructura de conjuntos disjuntos, de modo que las relaciones transitivas también conectan elementos en un mismo grupo. Así, pertenecer al mismo grupo no implica necesariamente que cada pareja de imágenes supere directamente el umbral.\n\nEl cálculo inicial se reparte entre procesos. SQLite conserva metadatos y hashes y los reutiliza si tamaño y fecha de modificación no cambian. Las imágenes nuevas pueden incorporarse al índice; cambios, eliminaciones o ajustes del umbral requieren reconstruir grupos porque pueden dividir conjuntos previos. Tkinter mantiene análisis y miniaturas fuera del hilo gráfico, muestra progreso y ofrece vistas de resumen y detalle. Los umbrales son parámetros de comparación, no entrenamiento de un modelo.\n\nLa integración móvil está separada del motor de similitud. Un puente nativo escrito en Rust usa las interfaces Windows Portable Devices (WPD) para detectar dispositivos, recorrer contenido accesible, copiar imágenes a caché temporal y operar sobre identificadores persistentes al borrar. Se conserva una vía de compatibilidad basada en Windows Shell para instalaciones o inventarios antiguos. El sistema omite zonas de Android que normalmente no están disponibles por MTP, así que la cobertura depende de los permisos y del contenido que el teléfono exponga.\n\nLa documentación describe el índice frente a una búsqueda exhaustiva, pero no aporta comparativas de algoritmos ni motivos para descartar otros enfoques. No constan pruebas de modelos de aprendizaje profundo u otros hashes.",
      en: "The core is implemented in Python. Pillow decodes and normalizes images, NumPy performs numerical calculations, and pillow-heif adds support for HEIF/HEIC formats. The code applies EXIF orientation, converts each image to grayscale, reduces it to 32 × 32 pixels and calculates a discrete cosine transform. It generates a 64-bit pHash from the low-frequency coefficients; comparison between two images uses the Hamming distance between their hashes. Similarity is therefore perceptual: a maximum score means identical hashes, not byte-for-byte identity.\n\nThe available levels are 80%, 90%, 95% and 100%. Each level maps to a maximum distance in differing bits. To avoid exhaustively comparing every image with every other image, the engine splits hashes into fragments and queries a candidate index; it then verifies the exact distance before joining two images. Grouping uses a disjoint-set structure, so transitive relationships also connect items in the same group. Thus, two images belonging to the same group does not necessarily mean that their pair directly meets the threshold.\n\nThe initial hash calculation is distributed across processes. SQLite stores metadata and hashes and reuses them when file size and modification time have not changed. New images can be added to the index; changes, deletions or threshold adjustments require rebuilding groups because they may split previous sets. Tkinter keeps analysis and thumbnail loading off the GUI thread, shows progress, and provides summary and detail views. Thresholds are comparison parameters, not model training.\n\nThe mobile integration is separate from the similarity engine. A native bridge written in Rust uses the Windows Portable Devices (WPD) interfaces to detect devices, traverse accessible content, copy images to a temporary cache and operate on persistent identifiers when deleting. A Windows Shell compatibility path is retained for older installations or inventories. The system skips Android areas that are usually unavailable through MTP, so coverage depends on the permissions and content exposed by the phone.\n\nThe documentation describes the index against exhaustive search, but provides no comparisons of algorithms or reasons for rejecting other approaches. It does not document tests of deep-learning models or other hashes.",
    },
  },
  {
    heading: {
      es: "5. Retos y soluciones",
      en: "5. Challenges and solutions",
    },
    body: {
      es: "El índice por fragmentos reduce candidatos y la distancia de Hamming verifica cada uno antes de agrupar. SQLite guarda hashes y metadatos para evitar repetir trabajo; registra también archivos ilegibles para no volver a decodificarlos mientras no cambien.\n\nPara MTP, la caché y el manifiesto de identificadores persistentes permiten reutilizar imágenes sin cambios y actualizar el inventario cuando haga falta. El teléfono debe permanecer encendido, desbloqueado y conectado durante importación o borrado. La interfaz aplica cambios de grupos en puntos de navegación que preservan la revisión en curso.",
      en: "The fragment index reduces the candidate set, and Hamming distance verifies each candidate before grouping. SQLite stores hashes and metadata to avoid repeating work; it also records unreadable files so they are not decoded again while unchanged.\n\nFor MTP, the cache and manifest of persistent identifiers allow unchanged images to be reused and the inventory to be refreshed when needed. The phone must remain powered on, unlocked and connected during import or deletion. The interface applies group updates at navigation points that preserve the current review.",
    },
  },
  {
    heading: {
      es: "6. Evaluación y resultados",
      en: "6. Evaluation and results",
    },
    body: {
      es: "Las pruebas descritas comparan el índice con una búsqueda exhaustiva en los cuatro umbrales y cubren caché, manifiesto móvil, borrado por lotes y compatibilidad. El resultado demostrable es una aplicación empaquetada con análisis, revisión, reutilización de hashes e integración WPD con caché. No hay métricas contrastadas: la guía no publica tiempos, memoria, tamaño de corpus ni precisión y recuperación, por lo que no se puede cuantificar el rendimiento o la detección frente a una verdad de referencia.",
      en: "The documented tests compare the index with exhaustive search at all four thresholds and cover caching, the mobile manifest, batch deletion and compatibility. The demonstrable result is a packaged application with analysis, review, hash reuse and WPD integration with caching. There are no corroborated metrics: the guide publishes no timings, memory use, corpus size, precision or recall, so performance and detection against a ground truth cannot be quantified.",
    },
  },
  {
    heading: {
      es: "7. Estado actual y futuras mejoras",
      en: "7. Current status and future improvements",
    },
    body: {
      es: "La versión incluye interfaz gráfica, análisis de carpetas, umbrales, grupos perceptuales, caché, miniaturas, borrado confirmado, puente WPD y distribución para Windows. El análisis no modifica archivos; el borrado es permanente. En móviles, la cobertura se limita a lo que exponen WPD/MTP.\n\nLas limitaciones son la dependencia de Windows para móviles, la cobertura parcial de galerías protegidas y la falta de evaluación pública con colecciones de referencia. Una mejora sería medir precisión, recuperación y rendimiento en un conjunto controlado. La búsqueda semántica o una versión multiplataforma son posibilidades, no funciones actuales.",
      en: "The version includes a graphical interface, folder analysis, configurable thresholds, perceptual groups, caching, thumbnails, confirmed deletion, a WPD bridge and a Windows distribution. Analysis does not modify files; deletion is permanent. On mobile devices, coverage is limited to what WPD/MTP exposes.\n\nThe limitations are the Windows dependency for mobile access, partial coverage of protected galleries and the lack of a public evaluation on reference collections. One improvement would be to measure precision, recall and performance on a controlled dataset. Semantic search or a cross-platform version are possibilities, not current features.",
    },
  }
];
