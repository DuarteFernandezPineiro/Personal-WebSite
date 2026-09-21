import type { Locale } from "./types";

export const dictionary = {
  es: {
    nav: { work: "Proyectos", about: "Sobre mí", contact: "Contacto", ask: "Pregunta a mi IA" },
    hero: {
      kicker: "Ingeniero de Inteligencia Artificial",
      ctaWork: "Explorar proyectos",
      ctaChat: "Conversar con mi asistente",
      scroll: "Desliza para descubrir"
    },
    sections: {
      proof: "Datos de los proyectos",
      projects: "Proyectos principales",
      projectsLead: "Cuatro proyectos explicados con su contexto, tecnologías, decisiones y resultados.",
      trajectory: "Trayectoria",
      capabilities: "Cómo construyo",
      human: "Fuera del código",
      chat: "Un CV que responde",
      contact: "Contacto"
    },
    common: {
      viewCase: "Ver caso",
      allProjects: "Ver los cuatro proyectos",
      live: "Disponible",
      menu: "Menú",
      close: "Cerrar",
      soundOn: "Activar ambiente de río",
      soundOff: "Silenciar ambiente de río",
      back: "Volver",
      filterAll: "Todos",
      status: "Estado",
      technology: "Tecnología",
      year: "Año",
      nextProject: "Siguiente proyecto"
    },
    contact: {
      eyebrow: "Disponible para nuevas oportunidades",
      lead: "Busco equipos que conviertan IA y datos en productos fiables, comprensibles y útiles.",
      name: "Nombre",
      email: "Email",
      company: "Empresa (opcional)",
      topic: "Motivo",
      message: "Mensaje",
      consent: "Acepto que mis datos se usen únicamente para responder a esta consulta.",
      send: "Enviar mensaje",
      sending: "Enviando…",
      success: "Mensaje enviado. Te responderé lo antes posible.",
      fallback: "El formulario todavía no está configurado. Puedes escribirme directamente por email o LinkedIn."
    },
    chat: {
      title: "Pregunta sobre Duarte",
      subtitle: "Formación, experiencia, proyectos y forma de trabajar.",
      placeholder: "Pregunta lo que quieras sobre Duarte",
      send: "Enviar",
      stop: "Detener",
      new: "Nueva conversación",
      ready: "Elige una pregunta o escribe la tuya.",
      unavailable: "El asistente se conectará cuando se configure la URL del backend.",
      suggestions: ["¿Qué aporta Duarte a un equipo de IA?", "Explícame su proyecto RAG", "¿Qué tecnologías domina?"]
    }
  },
  en: {
    nav: { work: "Work", about: "About", contact: "Contact", ask: "Ask my AI" },
    hero: {
      kicker: "Artificial Intelligence Engineer",
      ctaWork: "Explore projects",
      ctaChat: "Talk to my assistant",
      scroll: "Scroll to discover"
    },
    sections: {
      proof: "Project figures",
      projects: "Main projects",
      projectsLead: "Four projects explained through their context, technologies, decisions and outcomes.",
      trajectory: "Trajectory",
      capabilities: "How I build",
      human: "Beyond the code",
      chat: "A resume that answers",
      contact: "Contact"
    },
    common: {
      viewCase: "View case",
      allProjects: "View the four projects",
      live: "Available",
      menu: "Menu",
      close: "Close",
      soundOn: "Enable river ambience",
      soundOff: "Mute river ambience",
      back: "Back",
      filterAll: "All",
      status: "Status",
      technology: "Technology",
      year: "Year",
      nextProject: "Next project"
    },
    contact: {
      eyebrow: "Open to new opportunities",
      lead: "I am looking for teams that turn AI and data into reliable, understandable and useful products.",
      name: "Name",
      email: "Email",
      company: "Company (optional)",
      topic: "Subject",
      message: "Message",
      consent: "I agree that my data may be used only to reply to this enquiry.",
      send: "Send message",
      sending: "Sending…",
      success: "Message sent. I will reply as soon as possible.",
      fallback: "The form is not configured yet. You can contact me directly by email or LinkedIn."
    },
    chat: {
      title: "Ask about Duarte",
      subtitle: "Education, experience, projects and working style.",
      placeholder: "Ask anything you would like to know about Duarte",
      send: "Send",
      stop: "Stop",
      new: "New conversation",
      ready: "Choose a question or write your own.",
      unavailable: "The assistant will connect when the backend URL is configured.",
      suggestions: ["What does Duarte bring to an AI team?", "Explain his RAG project", "Which technologies does he know?"]
    }
  }
} as const;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}
