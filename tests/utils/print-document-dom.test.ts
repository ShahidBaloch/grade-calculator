/** @vitest-environment jsdom */
import { beforeEach, describe, expect, it } from "vitest";
import {
  buildPrintDocumentTitle,
  getCalculatorArticleClone,
  syncClonedFormValues,
} from "@/lib/utils/print-document";

describe("print DOM helpers", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    document.head.innerHTML = "";
  });

  it("clone keeps live input values and omits site chrome outside the article", () => {
    document.body.innerHTML = `
      <div data-print-chrome>Your grades stay on this device</div>
      <article aria-labelledby="calculator-page-title">
        <h1 id="calculator-page-title">Grade Calculator &amp; Easy Grader</h1>
        <p class="no-print">Estimates only — confirm with your school.</p>
        <div class="calculator-print-area">
          <input type="number" value="1" />
        </div>
      </article>
    `;
    const input = document.querySelector("input") as HTMLInputElement;
    input.value = "10";

    const clone = getCalculatorArticleClone();
    expect(clone).not.toBeNull();
    expect(clone!.textContent).not.toContain("Your grades stay");
    expect(clone!.textContent).not.toContain("Estimates only");
    expect(clone!.querySelector(".no-print")).toBeNull();
    expect((clone!.querySelector("input") as HTMLInputElement).value).toBe("10");
  });

  it("syncClonedFormValues copies textarea and select values", () => {
    document.body.innerHTML = `
      <div id="source">
        <textarea>alpha</textarea>
        <select><option value="a">A</option><option value="b">B</option></select>
      </div>
      <div id="clone">
        <textarea></textarea>
        <select><option value="a">A</option><option value="b">B</option></select>
      </div>
    `;
    const source = document.getElementById("source")!;
    const clone = document.getElementById("clone")!;
    (source.querySelector("textarea") as HTMLTextAreaElement).value = "beta";
    (source.querySelector("select") as HTMLSelectElement).value = "b";
    syncClonedFormValues(source, clone);
    expect((clone.querySelector("textarea") as HTMLTextAreaElement).value).toBe("beta");
    expect((clone.querySelector("select") as HTMLSelectElement).value).toBe("b");
  });

  it("buildPrintDocumentTitle matches homepage heading", () => {
    const title = buildPrintDocumentTitle("Grade Calculator & Easy Grader", new Date(2026, 8, 27));
    expect(title).toBe("Grade Calculator & Easy Grader - GradeCalculator - 2026-09-27");
  });
});
