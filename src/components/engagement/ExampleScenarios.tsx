"use client";

import type { ExampleScenario } from "@/types/calculator";
import { Button } from "@/components/ui/button";

interface ExampleScenariosProps {
  examples: ExampleScenario[];
  onSelect: (values: ExampleScenario["values"]) => void;
}

export function ExampleScenarios({ examples, onSelect }: ExampleScenariosProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {examples.map((example) => (
        <Button
          key={example.label}
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0"
          onClick={() => onSelect(example.values)}
        >
          {example.label}
        </Button>
      ))}
    </div>
  );
}
