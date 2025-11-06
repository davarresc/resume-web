declare namespace App {
  interface Locals {
    locale: "en" | "es";
    t: (key: string, vars?: Record<string, string | number>) => string;
  }
}

declare module "@tabler/icons";
