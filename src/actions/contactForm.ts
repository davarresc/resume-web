import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  message: z.string(),
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
  const transporter = nodemailer.createTransport({
    host: import.meta.env.SMTP_HOST,
    port: import.meta.env.SMTP_PORT,
    secure: true,
    auth: {
      user: import.meta.env.SMTP_USER,
      pass: import.meta.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${input.firstName} ${input.lastName}" <${input.email}>`,
    to: "emaildavidprueba@gmail.com",
    subject: "Resume web: Nuevo mensaje disponible",
    text: input.message,
  });
};
