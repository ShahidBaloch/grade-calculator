import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(5000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function parseContactForm(formData: FormData) {
  return contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });
}
