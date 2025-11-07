// Route slugs for each locale
export const ROUTES = {
  home: { en: "", es: "" },
  projects: { en: "projects", es: "proyectos" },
  repositories: { en: "repositories", es: "repositorios" },
  contact: { en: "contact", es: "contacto" },
} as const;

export type RouteKey = keyof typeof ROUTES;
