import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  message: z.string(),
});

export default defineAction({
  accept: "form",
  input: contactSchema,
  handler: async (input) => {
    return `Hello, ${input.firstName}!`;
  },
});
