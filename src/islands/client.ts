/**
 * Browser half of the island runtime: hydrates each <gc-island> when it scrolls near the
 * viewport (or at idle if it rendered nothing), loading only that component's chunk.
 */
import { h, render, type ComponentType } from "preact";
import { islands } from "virtual:gc-islands";

type Loader = () => Promise<Record<string, unknown>>;
const loaders = islands as Record<string, Loader>;

let providerPromise: Promise<ComponentType<{ children: unknown }>> | null = null;
function gradingScaleProvider() {
  providerPromise ??= import("@/components/providers/grading-scale-provider").then(
    (m) => m.GradingScaleProvider as unknown as ComponentType<{ children: unknown }>,
  );
  return providerPromise;
}

function ownSlots(root: Element, name: string): Element | null {
  for (const slot of root.querySelectorAll(`gc-slot[data-s="${name}"]`)) {
    if (slot.closest("gc-island") === root) return slot;
  }
  return null;
}

/** data-h="1" while an island loads, "2" once it is interactive. */
const pending = new WeakMap<HTMLElement, Promise<void>>();

function hydrate(el: HTMLElement): Promise<void> {
  let job = pending.get(el);
  if (!job) {
    job = load(el).then(() => {
      el.dataset.h = "2";
    });
    pending.set(el, job);
  }
  return job;
}

async function load(el: HTMLElement) {
  el.dataset.h = "1";
  const [file, name] = (el.dataset.i ?? "").split("#");
  const load = loaders[file];
  if (!load) return;
  const [mod, Provider] = await Promise.all([load(), gradingScaleProvider()]);
  const Component = mod[name] as ComponentType<Record<string, unknown>>;
  const props = JSON.parse(el.dataset.p ?? "{}") as Record<string, unknown>;
  for (const [key, value] of Object.entries(props)) {
    if (value && typeof value === "object" && "__slot" in value) {
      const slot = ownSlots(el, key);
      props[key] = h("gc-slot", {
        "data-s": key,
        dangerouslySetInnerHTML: { __html: slot?.innerHTML ?? "" },
      });
    }
  }
  const typed = typedBeforeHydration(el);
  render(h(Provider, { children: h(Component, props) }), el);
  replayTyped(typed);
}

type FormField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * Fields the visitor already changed in the server HTML. Rendering resets controlled fields to the
 * component's initial state, so their values are put back and announced afterwards.
 */
function typedBeforeHydration(el: HTMLElement): Array<[FormField, string | boolean]> {
  const changed: Array<[FormField, string | boolean]> = [];
  for (const field of el.querySelectorAll<FormField>("input, textarea, select")) {
    if (field instanceof HTMLInputElement && (field.type === "checkbox" || field.type === "radio")) {
      if (field.checked !== field.defaultChecked) changed.push([field, field.checked]);
    } else if (field instanceof HTMLSelectElement) {
      const initial = [...field.options].find((o) => o.defaultSelected)?.value ?? field.options[0]?.value;
      if (field.value !== initial) changed.push([field, field.value]);
    } else if (field.value !== field.defaultValue) {
      changed.push([field, field.value]);
    }
  }
  return changed;
}

function replayTyped(changed: Array<[FormField, string | boolean]>) {
  for (const [field, value] of changed) {
    if (!field.isConnected) continue;
    if (typeof value === "boolean") (field as HTMLInputElement).checked = value;
    else field.value = value;
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

const idleWithin = (ms: number): ((cb: () => void) => void) =>
  "requestIdleCallback" in window
    ? (cb) => requestIdleCallback(cb, { timeout: ms })
    : (cb) => setTimeout(cb, 1);
/** Off-screen and empty islands: whenever the browser is idle. */
const idle = idleWithin(1500);
/** On-screen islands: soon, so the first tap rarely beats them. */
const soon = idleWithin(200);

/**
 * A tap on a button whose island has not loaded yet would do nothing. Hold it, load that island
 * now and replay the click once it is interactive. Plain links and <details> work without JS and
 * are left alone.
 */
const CONTROL = 'button, [role="button"], [role="combobox"], [role="tab"], [aria-haspopup], input[type="checkbox"], input[type="radio"]';
document.addEventListener(
  "click",
  (event) => {
    const target = event.target as Element | null;
    const island = target?.closest<HTMLElement>("gc-island");
    if (!island || island.dataset.h === "2" || !event.isTrusted) return;
    const control = target!.closest<HTMLElement>(CONTROL);
    if (!control || !island.contains(control) || control.closest("summary")) return;
    event.preventDefault();
    event.stopPropagation();
    hydrate(island).then(() => requestAnimationFrame(() => control.isConnected && control.click()));
  },
  true,
);

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const island = (entry.target as HTMLElement & { __island?: HTMLElement }).__island;
      observer.unobserve(entry.target);
      if (island) idle(() => hydrate(island));
    }
  },
  { rootMargin: "300px" },
);

/** Already on screen at load: no need to wait for the observer (which background tabs pause). */
function nearViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight + 300 && rect.bottom > -300;
}

function start() {
  for (const el of document.querySelectorAll<HTMLElement>("gc-island:not([data-h])")) {
    // gc-island is display:contents (no box), so watch its first rendered element.
    const target = el.firstElementChild as (HTMLElement & { __island?: HTMLElement }) | null;
    if (!target || target.tagName === "GC-SLOT") {
      idle(() => hydrate(el));
      continue;
    }
    if (nearViewport(target)) {
      soon(() => hydrate(el));
      continue;
    }
    target.__island = el;
    observer.observe(target);
    // Interaction before the idle callback fires: hydrate right away.
    el.addEventListener("pointerenter", () => hydrate(el), { once: true });
    el.addEventListener("focusin", () => hydrate(el), { once: true });
  }
}

start();

// Native <details> accordions (components/ui/accordion.tsx): mirror the open state on the
// summary's aria-expanded so assistive tech hears "expanded"/"collapsed" as with a button.
document.addEventListener(
  "toggle",
  (event) => {
    const details = event.target;
    if (!(details instanceof HTMLDetailsElement)) return;
    details.querySelector(":scope > summary")?.setAttribute("aria-expanded", String(details.open));
  },
  true,
);
