import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/types/seo";

export function FaqAccordion({ faqs, headingLevel }: { faqs: FaqItem[]; headingLevel?: 2 | 3 }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.question} value={`faq-${index}`}>
          <AccordionTrigger headingLevel={headingLevel}>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
