import pkg from "./../../package.json";
const ENV = import.meta.env;

export class Config {
  static readonly name: string = pkg.name;
  static readonly version: string = pkg.version;
  static readonly description: string = pkg.description;

  static readonly SMTP = {
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    user: ENV.SMTP_USER,
    pass: ENV.SMTP_PASS,
  };

  static readonly RECAPTCHA_V3 = {
    public: ENV.PUBLIC_RECAPTCHA_SITE_KEY,
    secret: ENV.RECAPTCHA_SECRET,
  };
}
