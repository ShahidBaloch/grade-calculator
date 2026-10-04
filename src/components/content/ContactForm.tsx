"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { contactConfig } from "@/data/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: { ok?: boolean; error?: string } = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Failed to send message.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please email us directly.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="max-w-lg space-y-3 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-5 text-[var(--color-text)]"
        role="status"
      >
        <p className="text-lg font-semibold">Message sent</p>
        <p className="text-sm text-[var(--color-text-muted)]">{contactConfig.successLead}</p>
        <Button type="button" variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative max-w-lg space-y-4" noValidate>
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-name">Name</Label>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={120}
          placeholder="Your name"
          disabled={status === "submitting"}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-email">Your email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@email.com"
          disabled={status === "submitting"}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          disabled={status === "submitting"}
          placeholder="Question about a calculator, formula correction, or site feedback…"
          className="flex w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        />
      </div>

      <p className="text-sm text-[var(--color-text-muted)]">
        We use your details only to reply. Do not include personal grade information. See our{" "}
        <Link href="/privacy-policy" className="text-[var(--color-primary)] hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : contactConfig.inquiryCta}
      </Button>

      {status === "error" ? (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}. Or email{" "}
          <a href={`mailto:${contactConfig.email}`} className="font-medium underline">
            {contactConfig.email}
          </a>{" "}
          directly.
        </p>
      ) : null}
    </form>
  );
}
