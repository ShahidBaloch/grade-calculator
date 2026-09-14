"use client";

import type { ExampleScenario } from "@/types/calculator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExampleScenariosProps {
  examples: ExampleScenario[];
  onSelect: (values: ExampleScenario["values"]) => void;
  /** When provided, highlights the example whose values match current inputs. */
  activeValues?: ExampleScenario["values"] | null;
}

function valuesMatch(
  example: ExampleScenario["values"],
  active: ExampleScenario["values"] | null | undefined,
): boolean {
  if (!active) return false;
  const keys = Object.keys(example);
  if (keys.length === 0) return false;
  return keys.every((key) => {
    const left = example[key];
    const right = active[key];
    return JSON.stringify(left) === JSON.stringify(right);
  });
}

export function ExampleScenarios({ examples, onSelect, activeValues }: ExampleScenariosProps) {
  return (
    <div className="no-print flex gap-2 overflow-x-auto pb-2">
      {examples.map((example) => {
        const selected = valuesMatch(example.values, activeValues);
        return (
          <Button
            key={example.label}
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "shrink-0",
              selected && "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]",
            )}
            aria-pressed={selected}
            onClick={() => onSelect(example.values)}
          >
            {example.label}
          </Button>
        );
      })}
    </div>
  );
}
