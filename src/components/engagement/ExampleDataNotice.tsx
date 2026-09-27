"use client";

import * as React from "react";

interface ExampleDataNoticeProps {
  /** Shown until the user edits inputs or picks a different example scenario. */
  visible: boolean;
}

export function ExampleDataNotice({ visible }: ExampleDataNoticeProps) {
  if (!visible) return null;

  return (
    <div
      role="note"
      className="no-print rounded-md border border-[var(--color-notice-border)] bg-[var(--color-notice-bg)] px-3 py-2 text-sm text-[var(--color-notice-text)]"
    >
      <span className="font-medium">Example numbers</span> — replace with yours, or tap{" "}
      <strong>Reset</strong> to start fresh.
    </div>
  );
}

/** Tracks whether the user has changed calculator inputs from the loaded state. */
export function useExampleDataNotice(initialVisible = true) {
  const [showExampleNotice, setShowExampleNotice] = React.useState(initialVisible);

  const markUserEdited = React.useCallback(() => {
    setShowExampleNotice(false);
  }, []);

  const showAgain = React.useCallback(() => {
    setShowExampleNotice(true);
  }, []);

  return { showExampleNotice, markUserEdited, showAgain };
}
