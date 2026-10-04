"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SourceLink {
  href: string;
  label: string;
}

interface CalculatorDetailsAccordionProps {
  assumptions: string[];
  formula: string;
  workedExample: string;
  primarySources?: SourceLink[];
}

/** Formula, assumptions, and sources — collapsed by default so the calculator stays the focus. */
export function CalculatorDetailsAccordion({
  assumptions,
  formula,
  workedExample,
  primarySources,
}: CalculatorDetailsAccordionProps) {
  const hasSources = primarySources && primarySources.length > 0;

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="assumptions">
        <AccordionTrigger className="text-base font-semibold text-[var(--color-text)] hover:no-underline">
          Assumptions & limits
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc space-y-2 pl-5">
            {assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="formula">
        <AccordionTrigger className="text-base font-semibold text-[var(--color-text)] hover:no-underline">
          Formula & example
        </AccordionTrigger>
        <AccordionContent>
          <p>{formula}</p>
          <p className="mt-2">
            Example: {workedExample}. Letter cutoffs use the unrounded result.
          </p>
        </AccordionContent>
      </AccordionItem>
      {hasSources && (
        <AccordionItem value="sources">
          <AccordionTrigger className="text-base font-semibold text-[var(--color-text)] hover:no-underline">
            Official sources
          </AccordionTrigger>
          <AccordionContent>
            <p>Confirm rules with your school — these are planning aids only.</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {primarySources!.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    className="text-[var(--color-primary)] hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}
