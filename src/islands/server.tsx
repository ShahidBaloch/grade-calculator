/**
 * Server half of the island runtime. Every export of a "use client" module is wrapped with
 * `__island` during the static render (see integrations/use-client-islands.ts):
 *
 * - Rendered from server code, it emits <gc-island data-i="file#Export" data-p="{props}"> around
 *   its normal HTML, and the browser hydrates just that component (islands/client.ts).
 * - Rendered inside another island, it is plain JSX (it ships in that island's chunk).
 *
 * JSX props (children, slots) stay in the HTML as <gc-slot>; the browser reuses that markup
 * instead of shipping it twice. Islands inside a slot hydrate on their own.
 */
import { createContext, h, isValidElement, type ComponentType } from "preact";
import { useContext } from "preact/hooks";

const InsideIsland = createContext(false);

function isNode(value: unknown): boolean {
  if (isValidElement(value)) return true;
  return Array.isArray(value) && value.length > 0 && value.some(isNode);
}

export function __island<P extends Record<string, unknown>>(
  Component: ComponentType<P>,
  id: string,
): ComponentType<P> {
  function Island(props: P) {
    if (useContext(InsideIsland)) return h(Component, props);

    const serial: Record<string, unknown> = {};
    const rendered: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
      if (key === "key" || key === "ref") continue;
      if (isNode(value)) {
        serial[key] = { __slot: 1 };
        rendered[key] = h(
          "gc-slot",
          { "data-s": key },
          h(InsideIsland.Provider, { value: false }, value as never),
        );
      } else if (typeof value === "function") {
        throw new Error(`Island ${id}: prop "${key}" is a function and cannot reach the browser`);
      } else {
        serial[key] = value;
        rendered[key] = value;
      }
    }

    return h(
      "gc-island",
      { "data-i": id, "data-p": JSON.stringify(serial) },
      h(InsideIsland.Provider, { value: true }, h(Component, rendered as P)),
    );
  }
  Island.displayName = `Island(${id})`;
  return Island;
}
