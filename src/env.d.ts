declare namespace App {
  interface Locals {
    runtime: { env: { RECAPTCHA_SECRET: string } };
    locale: "en" | "es";
    t: (key: string, vars?: Record<string, string | number>) => string;
  }
}

declare module "@tabler/icons";
