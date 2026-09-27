import { describe, expect, it } from "vitest";
import {
  formatMailboxFrom,
  gmailPlusAlias,
  normalizeSmtpPassword,
  resolveSmtpRecipient,
  sanitizeSubjectFragment,
} from "@/lib/contact/email-utils";

describe("email-utils", () => {
  it("adds a Gmail plus alias", () => {
    expect(gmailPlusAlias("hello@gmail.com", "gradcalc")).toBe("hello+gradcalc@gmail.com");
  });

  it("does not double-alias", () => {
    expect(gmailPlusAlias("hello+inbox@gmail.com", "gradcalc")).toBe("hello+inbox@gmail.com");
  });

  it("strips newlines from subject fragments", () => {
    expect(sanitizeSubjectFragment("Alex\r\n")).toBe("Alex");
  });

  it("strips spaces from a Google App Password", () => {
    expect(normalizeSmtpPassword("abcd efgh ijkl mnop")).toBe("abcdefghijklmnop");
  });

  it("does not double-wrap a From address", () => {
    expect(formatMailboxFrom("hello@gradcalc.com")).toBe(
      '"GradeCalculator Contact" <hello@gradcalc.com>',
    );
    expect(formatMailboxFrom('"GradeCalculator" <hello@gradcalc.com>')).toBe(
      '"GradeCalculator" <hello@gradcalc.com>',
    );
  });

  it("sends Gmail SMTP to a plus alias unless CONTACT_TO is set", () => {
    expect(
      resolveSmtpRecipient({
        host: "smtp.gmail.com",
        smtpUser: "owner@gmail.com",
        publicInbox: "hello@gradcalc.com",
      }),
    ).toBe("owner+gradcalc@gmail.com");

    expect(
      resolveSmtpRecipient({
        host: "smtp.gmail.com",
        smtpUser: "owner@gmail.com",
        contactTo: "hello@gradcalc.com",
        publicInbox: "hello@gradcalc.com",
      }),
    ).toBe("hello@gradcalc.com");
  });
});
