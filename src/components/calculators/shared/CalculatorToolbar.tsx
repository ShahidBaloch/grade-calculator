"use client";

import { Printer, RotateCcw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalculatorToolbarProps {
  onShare?: () => void;
  onReset?: () => void;
  copied?: boolean;
}

export function CalculatorToolbar({ onShare, onReset, copied }: CalculatorToolbarProps) {
  return (
    <div className="no-print flex flex-wrap gap-2">
      <Button type="button" variant="outline" size="sm" onClick={() => window.print()}>
        <Printer className="mr-1.5 h-4 w-4" />
        Print
      </Button>
      {onShare && (
        <Button type="button" variant="outline" size="sm" onClick={onShare}>
          <Share2 className="mr-1.5 h-4 w-4" />
          {copied ? "Link copied!" : "Share"}
        </Button>
      )}
      {onReset && (
        <Button type="button" variant="ghost" size="sm" onClick={onReset}>
          <RotateCcw className="mr-1.5 h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );
}
