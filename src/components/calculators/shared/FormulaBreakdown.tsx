"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FormulaBreakdownProps {
  steps: string[];
}

export function FormulaBreakdown({ steps }: FormulaBreakdownProps) {
  if (steps.length === 0) return null;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="steps">
        <AccordionTrigger>Show calculation steps</AccordionTrigger>
        <AccordionContent>
          <ol className="list-decimal space-y-2 pl-5 font-mono text-sm">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
