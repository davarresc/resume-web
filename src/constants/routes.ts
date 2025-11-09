// Route slugs for each locale
export const ROUTES = {
  home: { en: "", es: "" },
  resume: { en: "resume", es: "curriculum" },
  projects: { en: "projects", es: "proyectos" },
  contact: { en: "contact", es: "contacto" },
} as const;

export type RouteKey = keyof typeof ROUTES;
