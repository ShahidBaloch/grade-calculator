"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DynamicRowListProps<T> {
  items: T[];
  minRows?: number;
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderRow: (item: T, index: number) => React.ReactNode;
  addLabel?: string;
}

export function DynamicRowList<T>({
  items,
  minRows = 1,
  onAdd,
  onRemove,
  renderRow,
  addLabel = "Add row",
}: DynamicRowListProps<T>) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-2">
          <div className="flex-1">{renderRow(item, index)}</div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Remove row ${index + 1}`}
            disabled={items.length <= minRows}
            onClick={() => onRemove(index)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={onAdd}>
        <Plus className="h-4 w-4" />
        {addLabel}
      </Button>
    </div>
  );
}
