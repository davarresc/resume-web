import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Config } from "../utils/config";

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  message: z.string(),
  gToken: z.string(),
});

type ContactSchema = z.infer<typeof contactSchema>;

export default defineAction({
  accept: "form",
  input: contactSchema,
  handler: async (input) => {
    await sendMail(input);

    return { success: true };
  },
});

// TODO Update to the resume notifiication mimcroservice when available
const sendMail = async (input: ContactSchema) => {
  const { success, score } = await checkRecaptcha(input.gToken);

  if (!success || (score ?? 0) < 0.5) {
    throw new Error("reCAPTCHA error");
  }

  await fetch("https://calm-bush-1676.arroyoescobardavid.workers.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...input }),
  }).then(async (res) => {
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error de Resend: ${errorText}`);
    }
  });
};

const checkRecaptcha = async (token: string) => {
  const verifyRes = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: Config.RECAPTCHA_V3.secret,
        response: token,
      }),
    },
  );

  type Verify = {
    success: boolean;
    score?: number;
    action?: string;
    "error-codes"?: string[];
  };
  return (await verifyRes.json()) as Verify;
};
