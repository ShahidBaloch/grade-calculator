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
      className="rounded-md border border-amber-300/80 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-50"
    >
      <span className="font-medium">Example data.</span> Numbers below are samples so you can see
      how scoring works. Enter your quiz results or tap <strong>Reset</strong> to clear saved
      inputs on this device.
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
