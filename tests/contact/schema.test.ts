import { describe, expect, it } from "vitest";
import { contactFormSchema, parseContactForm } from "@/lib/contact/schema";

describe("contactFormSchema", () => {
  it("accepts valid input", () => {
    const result = contactFormSchema.safeParse({
      name: "Alex",
      email: "alex@example.com",
      message: "Please fix the HEC band table.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short messages", () => {
    const result = contactFormSchema.safeParse({
      name: "Alex",
      email: "alex@example.com",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("parses FormData", () => {
    const formData = new FormData();
    formData.set("name", "Sam");
    formData.set("email", "sam@school.edu");
    formData.set("message", "Question about weighted grades.");
    const parsed = parseContactForm(formData);
    expect(parsed.success).toBe(true);
  });
});
