/** Copy de producto. Mantener explícitas las capacidades pendientes. */
export type LandingNavItem = { label: string; href: string }

export type LandingBullet = { title: string; description: string }

export type LandingStep = { step: string; title: string; description: string }

export type LandingFaqItem = { question: string; answer: string }

export const landingContent = {
  "brand": {
    "name": "EduPey"
  },
  "header": {
    "nav": [
      {
        "label": "Campañas",
        "href": "/campanas"
      },
      {
        "label": "Nuestra propuesta",
        "href": "#solution"
      },
      {
        "label": "Cómo funciona",
        "href": "#how-it-works"
      },
      {
        "label": "Preguntas",
        "href": "#faq"
      }
    ],
    "loginLabel": "Entrar",
    "signupLabel": "Crear cuenta",
    "dashboardLabel": "Mi seguimiento"
  },
  "hero": {
    "eyebrow": "Crowdfunding por la educación",
    "title": "Su próxima oportunidad empieza contigo.",
    "lede": "Una comunidad que impulsa el aprendizaje y abre camino al talento de los niños. Conoce las metas educativas y acompaña su desarrollo.",
    "primaryCta": {
      "label": "Explorar campañas",
      "href": "/campanas"
    },
    "secondaryCta": {
      "label": "Conoce la propuesta",
      "href": "#how-it-works"
    }
  },
  "problem": {
    "id": "problem",
    "eyebrow": "El punto de partida",
    "title": "El talento necesita oportunidades para crecer",
    "lede": "Queremos conectar la voluntad de ayudar con metas educativas concretas y una participación constante.",
    "items": [
      {
        "title": "Acceso a recursos",
        "description": "Materiales, cursos y experiencias pueden abrir nuevas posibilidades de aprendizaje."
      },
      {
        "title": "Motivación para continuar",
        "description": "Nuestra propuesta de juegos une misiones educativas, progreso y beneficios revisados por personas."
      },
      {
        "title": "Un vínculo con el avance",
        "description": "Los donantes podrán acompañar las campañas y conocer el destino de sus aportaciones."
      }
    ]
  },
  "solution": {
    "id": "solution",
    "eyebrow": "Nuestra propuesta",
    "title": "Juntos financiamos su próxima oportunidad",
    "lede": "Campañas con metas, presupuesto y criterios de selección claros. Un camino para descubrir talento y apoyar a quienes destacan por su progreso y constancia.",
    "highlights": [
      "Donaciones colectivas, sin rendimientos financieros",
      "Beneficios educativos sujetos a validación humana",
      "Seguimiento de campañas guardado en tu cuenta"
    ]
  },
  "howItWorks": {
    "id": "how-it-works",
    "eyebrow": "Así lo estamos construyendo",
    "title": "De una causa compartida a una nueva posibilidad",
    "steps": [
      {
        "step": "01",
        "title": "Encuentra una oportunidad",
        "description": "Explora las campañas, revisa su presupuesto y guarda las que quieras acompañar."
      },
      {
        "step": "02",
        "title": "Suma a una meta",
        "description": "Próximamente podrás aportar mediante un QR CoDi generado con Pey. Los cobros todavía no están habilitados."
      },
      {
        "step": "03",
        "title": "Acompaña el aprendizaje",
        "description": "El siguiente paso será conectar misiones educativas y beneficios con revisión humana antes de entregarlos."
      }
    ]
  },
  "features": {
    "id": "features",
    "eyebrow": "Los pilares de EduPey",
    "title": "Cada oportunidad tiene un propósito",
    "items": [
      {
        "title": "Campañas educativas",
        "description": "Consulta metas de materiales, becas y tecnología educativa."
      },
      {
        "title": "Aprendizaje jugando",
        "description": "Estamos preparando un primer juego de matemáticas con retos y metas de aprendizaje."
      },
      {
        "title": "Beneficios con destino",
        "description": "Priorizamos becas pagadas a instituciones y cupones restringidos a recursos educativos."
      },
      {
        "title": "Protección proporcional",
        "description": "Combinaremos validación institucional, señales de edad y comprobación humana del aprendizaje."
      }
    ]
  },
  "socialProof": {
    "eyebrow": "Nuestros compromisos",
    "title": "La confianza se construye con claridad",
    "stats": [
      {
        "value": "Metas claras",
        "label": "Un presupuesto visible para cada campaña"
      },
      {
        "value": "Revisión humana",
        "label": "Antes de entregar beneficios de valor real"
      },
      {
        "value": "Identidad protegida",
        "label": "Información mínima de los niños para los donantes"
      }
    ],
    "quote": {
      "text": "Pequeñas aportaciones. Grandes posibilidades.",
      "attribution": "El propósito de EduPey"
    }
  },
  "faq": {
    "id": "faq",
    "eyebrow": "Preguntas frecuentes",
    "title": "Lo que debes saber antes de sumarte",
    "items": [
      {
        "question": "¿Recibiré un rendimiento por donar?",
        "answer": "Son donaciones para fines educativos, sin participación financiera ni rendimientos económicos para el donante."
      },
      {
        "question": "¿Ya puedo realizar una donación?",
        "answer": "Todavía no. Puedes explorar y seguir campañas. La integración de cobros con Pey y CoDi es una próxima etapa."
      },
      {
        "question": "¿Cómo se reduce el riesgo de abuso?",
        "answer": "La propuesta combina participantes validados, controles de edad y revisión humana del aprendizaje. Ningún beneficio real se entregará únicamente por la puntuación del juego."
      },
      {
        "question": "¿Las campañas demo representan niños reales?",
        "answer": "No. Están identificadas como ejemplos, sin donaciones ni beneficiarios reales."
      }
    ]
  },
  "finalCta": {
    "title": "El siguiente capítulo lo construimos juntos",
    "lede": "Encuentra una causa que te importe y empieza a acompañarla.",
    "primaryCta": {
      "label": "Ver campañas",
      "href": "/campanas"
    },
    "secondaryCta": {
      "label": "Crear mi cuenta",
      "href": "/sign-up"
    }
  },
  "footer": {
    "tagline": "Una comunidad que cree en el futuro de los niños.",
    "links": [
      {
        "label": "Campañas",
        "href": "/campanas"
      },
      {
        "label": "Mi seguimiento",
        "href": "/dashboard"
      },
      {
        "label": "Preguntas",
        "href": "#faq"
      }
    ],
    "copyright": "© {year} EduPey."
  }
} as const
