// Route slugs for each locale
export const ROUTES = {
  home: { en: "", es: "" },
  resume: { en: "resume", es: "curriculum" },
  projects: { en: "projects", es: "proyectos" },
  contact: { en: "contact", es: "contacto" },
  changelog: { en: "changelog", es: "changelog" },
} as const;

export type RouteKey = keyof typeof ROUTES;

const excludeRoutes = ["changelog"];
export const MENU = Object.fromEntries(
  Object.entries(ROUTES).filter(([key]) => !excludeRoutes.includes(key)),
);
