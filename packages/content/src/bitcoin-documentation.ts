import type { ProjectDocumentationSection } from "./types";

export const bitcoinDocumentationSections: ProjectDocumentationSection[] = [
  {
    "heading": {
      "es": "1. Resumen del proyecto",
      "en": "1. Project overview"
    },
    "body": {
      "es": "Bitcoin Decision Chat es un prototipo web educativo que analiza mensajes en inglés relacionados con Bitcoin. Combina clasificación de texto y una explicación generada por un asistente para mostrar una orientación general —«Invest» o «Do not invest»— a partir del lenguaje del mensaje. Está dirigido a personas interesadas en explorar cómo aplicar modelos de NLP a un caso financiero; su aportación principal es reunir inferencia, explicación y una interfaz sencilla en un mismo servicio. La orientación es experimental: no predice precios ni constituye asesoramiento financiero.",
      "en": "Bitcoin Decision Chat is an educational web prototype that analyzes English messages about Bitcoin. It combines text classification with an assistant-generated explanation to provide a general orientation—“Invest” or “Do not invest”—based on the wording of a message. It is intended for people interested in exploring NLP applications in a financial context; its main contribution is bringing inference, explanation, and a simple interface together in one service. The orientation is experimental: it does not predict prices or constitute financial advice."
    }
  },
  {
    "heading": {
      "es": "2. Problema y objetivos",
      "en": "2. Problem and objectives"
    },
    "body": {
      "es": "Los mensajes de mercado expresan opiniones con contexto incompleto. El proyecto explora cómo transformar un texto sobre Bitcoin en una clasificación y explicación legible, dejando claros los límites de esa interpretación.\n\nLos objetivos técnicos son aceptar mensajes de forma controlada, descartar textos sin una referencia reconocible a Bitcoin, estimar su orientación con modelos de clasificación y presentar una explicación que no convierta el tono textual en una predicción de mercado. También se busca mantener una respuesta cuando el proveedor de lenguaje falla.",
      "en": "Market messages express opinions with incomplete context. The project explores how to turn a text about Bitcoin into a readable classification and explanation while making the limits of that interpretation clear.\n\nThe technical objectives are to accept messages in a controlled way, reject texts without a recognizable reference to Bitcoin, estimate their orientation with classification models, and provide an explanation that does not turn textual tone into a market prediction. Another goal is to keep a response available when the language provider fails."
    }
  },
  {
    "heading": {
      "es": "3. Solución y arquitectura",
      "en": "3. Solution and architecture"
    },
    "body": {
      "es": "El navegador ofrece ejemplos y un campo para introducir un mensaje. El servicio valida el texto, aplica normalización y comprueba que haya una referencia a Bitcoin. Después transforma el mensaje en una representación semántica y consulta dos ensembles de LightGBM en secuencia. El primer clasificador evalúa señales negativas y, cuando su probabilidad alcanza el umbral, el segundo valora señales neutrales. Los umbrales determinan la orientación devuelta. A continuación, un modelo de OpenAI redacta la explicación; sin credenciales o ante un fallo, se utiliza una respuesta local. La interfaz muestra el resultado y la advertencia informativa.\n\n```mermaid\nflowchart LR\n    U[Persona usuaria] --> W[Interfaz web]\n    W -->|Mensaje en inglés| V[Validación y filtro Bitcoin]\n    V --> N[Normalización del texto]\n    N --> E[Embedding semántico]\n    E --> A[Ensemble: señales negativas]\n    A -->|Prob. negativa < umbral| D[Do not invest]\n    A -->|Prob. negativa ≥ umbral| B[Ensemble: señales neutrales]\n    B -->|Prob. neutral ≥ umbral| I[Invest]\n    B -->|Prob. neutral < umbral| D\n    D --> R[Orientación general]\n    I --> R\n    R --> L[Explicación con OpenAI]\n    L -->|Sin servicio o error| F[Explicación local]\n    L --> W\n    F --> W\n```",
      "en": "The browser provides examples and a field for entering a message. The service validates and normalizes the text, then checks that it refers to Bitcoin. It converts the message into a semantic representation and queries two LightGBM ensembles in sequence. The first classifier evaluates negative signals; when its probability reaches the threshold, the second evaluates neutral signals. The thresholds determine the returned orientation. An OpenAI model then writes the explanation; if credentials are unavailable or a call fails, a local response is used. The interface displays the result and an informational notice.\n\n```mermaid\nflowchart LR\n    U[User] --> W[Web interface]\n    W -->|English message| V[Validation and Bitcoin filter]\n    V --> N[Text normalization]\n    N --> E[Semantic embedding]\n    E --> A[Ensemble: negative signals]\n    A -->|Negative probability < threshold| D[Do not invest]\n    A -->|Negative probability ≥ threshold| B[Ensemble: neutral signals]\n    B -->|Neutral probability ≥ threshold| I[Invest]\n    B -->|Neutral probability < threshold| D\n    D --> R[General orientation]\n    I --> R\n    R --> L[Explanation with OpenAI]\n    L -->|Service unavailable or error| F[Local explanation]\n    L --> W\n    F --> W\n```"
    }
  },
  {
    "heading": {
      "es": "4. Desarrollo y decisiones técnicas",
      "en": "4. Development and technical decisions"
    },
    "body": {
      "es": "La aplicación está organizada como un servicio FastAPI que entrega tanto la interfaz estática como las respuestas de análisis. Esta elección mantiene el flujo de usuario y la inferencia en el mismo despliegue y evita colocar credenciales del proveedor de lenguaje en el navegador. El contrato de entrada restringe el mensaje a un máximo de 800 caracteres y rechaza entradas vacías. Una comprobación léxica requiere una referencia reconocible a Bitcoin o al mercado cripto antes de ejecutar el análisis.\n\nLa preparación del texto pasa a minúsculas, elimina enlaces, menciones y símbolos de ticker, conserva signos útiles y reduce repeticiones y espacios. Mantener una limpieza coherente es importante porque el clasificador trabaja sobre una representación derivada del texto, no sobre variables de mercado. Sentence Transformers genera el embedding semántico; los clasificadores LightGBM operan sobre esa representación. En lugar de una única etiqueta multiclase, la inferencia encadena dos ensembles. Si la probabilidad de la clase negativa queda por debajo de su umbral, devuelve «Do not invest»; si lo alcanza, evalúa el ensemble neutral. En esa segunda etapa, una probabilidad neutral igual o superior a su umbral da «Invest»; de lo contrario, la salida también es «Do not invest».\n\nLa explicación es una capa posterior a la clasificación, no el mecanismo que decide la orientación. Cuando OpenAI está configurado, recibe el texto original como dato no confiable junto con la etiqueta del modelo y debe explicar el resultado sin inventar probabilidades ni prometer rendimientos. Si la llamada falla o no hay clave, el sistema genera una explicación local. Esta alternativa evita que la disponibilidad del proveedor externo sea requisito para recibir un resultado. La respuesta mantiene explícita la incertidumbre del análisis.\n\nPara el empaquetado, Docker prepara los artefactos y el modelo de embeddings durante la construcción, y el servicio los carga en modo sin conexión al arrancar. Se usa un único worker para contener la memoria duplicada de los modelos. FastAPI expone comprobaciones de salud; la aplicación incorpora límite de solicitudes, cabeceras de seguridad y una respuesta genérica ante errores internos. Estas decisiones incorporan aspectos de operación y protección de credenciales.\n\nEl proyecto conserva también una iteración de clasificación binaria de sentimiento positivo o negativo, con otro flujo de API y ajuste del umbral sobre validación. Es una línea distinta de la aplicación web secuencial y sus resultados no describen el rendimiento de esta.",
      "en": "The application is organized as a FastAPI service that serves both the static interface and analysis responses. This keeps the user flow and inference in one deployment and avoids placing language-provider credentials in the browser. The input contract limits messages to 800 characters and rejects empty entries. A lexical check requires a recognizable reference to Bitcoin or the crypto market before analysis begins.\n\nText preparation lowercases the input, removes links, mentions, and ticker symbols, preserves useful punctuation, and reduces repeated characters and whitespace. Consistent cleaning matters because the classifier works on a representation derived from text, not on market variables. Sentence Transformers generates the semantic embedding; LightGBM classifiers operate on that representation. Instead of one multiclass label, inference chains two ensembles. If the negative-class probability is below its threshold, the result is “Do not invest”; if it reaches the threshold, the neutral ensemble is evaluated. In that second stage, a neutral probability equal to or above its threshold yields “Invest”; otherwise the result is also “Do not invest.”\n\nThe explanation is a layer after classification; it does not determine the orientation. When OpenAI is configured, it receives the original text as untrusted data together with the model label and is instructed to explain the result without inventing probabilities or promising returns. If the call fails or no key is available, the system generates a local explanation. This means the external provider does not have to be available for the user to receive a result. The response also makes the uncertainty of the analysis clear.\n\nFor packaging, Docker prepares the model artifacts and embedding model during the build, and the service loads them in offline mode at startup. A single worker is used to limit duplicated model memory. FastAPI exposes health checks; the application also includes a request limit, security headers, and a generic response to internal errors. These decisions address operational concerns and credential protection.\n\nThe project also preserves a separate binary sentiment-classification iteration—positive or negative—with another API flow and threshold tuning on validation data. It is distinct from the sequential web application, and its results do not describe the latter’s performance."
    }
  },
  {
    "heading": {
      "es": "5. Retos y soluciones",
      "en": "5. Challenges and solutions"
    },
    "body": {
      "es": "El flujo debe distinguir un mensaje sobre Bitcoin de texto ajeno al tema; el filtro previo rechaza este último antes del análisis. También desacopla la explicación de la disponibilidad del proveedor generativo mediante una respuesta local, y empaqueta el modelo de embeddings para que el arranque no dependa de una descarga externa.",
      "en": "The flow needs to distinguish messages about Bitcoin from unrelated text; a preliminary filter rejects the latter before analysis. It also decouples the explanation from the generative provider’s availability through a local response, and packages the embedding model so startup does not depend on an external download."
    }
  },
  {
    "heading": {
      "es": "6. Evaluación y resultados",
      "en": "6. Evaluation and results"
    },
    "body": {
      "es": "Las pruebas automatizadas cubren la entrega de la página, el estado de salud, las dos salidas de orientación y el rechazo de mensajes ajenos a Bitcoin. Los resultados históricos corresponden a experimentos de clasificación binaria y no miden el modelo secuencial de la aplicación web. Por tanto, todavía falta una evaluación predictiva documentada para el sistema actual.",
      "en": "The automated tests cover page delivery, health status, both orientation outputs, and rejection of messages unrelated to Bitcoin. Historical results come from binary-classification experiments and do not measure the web application’s sequential model. A documented predictive evaluation of the current system is therefore still needed."
    }
  },
  {
    "heading": {
      "es": "7. Estado actual y futuras mejoras",
      "en": "7. Current state and future improvements"
    },
    "body": {
      "es": "El código configura una aplicación web y una API funcionales, carga los dos ensembles desde artefactos y ofrece una explicación generativa con alternativa local. El alcance sigue siendo experimental y depende de los datos y etiquetas de entrenamiento. El siguiente paso sería documentar el protocolo de cada clase y evaluar los modelos con mensajes recientes y representativos, midiendo errores y calibración por etapa. También convendría evaluar texto ambiguo, irónico o fuera de dominio.",
      "en": "The code configures a web application and API, loads both ensembles from artifacts, and provides a generated explanation with a local fallback. The scope remains experimental and depends on the training data and labels. The next step would be to document each class’s protocol and evaluate the models on recent, representative messages, measuring errors and calibration at each stage. It would also be useful to evaluate ambiguous, ironic, or out-of-domain text."
    }
  }
];
