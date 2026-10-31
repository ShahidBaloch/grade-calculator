import { createElement, useEffect, useState, type ComponentType, type ReactNode } from "react";

type Loader<P> = () => Promise<ComponentType<P> | { default: ComponentType<P> }>;

/**
 * Only `ssr: false` is used here: render nothing on the server and in the first client pass,
 * then load the chunk after the island hydrates.
 */
export default function dynamic<P extends object>(
  loader: Loader<P>,
  options: { ssr?: boolean; loading?: () => ReactNode } = {},
): ComponentType<P> {
  let cached: ComponentType<P> | null = null;
  function Dynamic(props: P) {
    const [Component, setComponent] = useState<ComponentType<P> | null>(() => cached);
    useEffect(() => {
      if (Component) return;
      let alive = true;
      loader().then((mod) => {
        cached = "default" in mod ? mod.default : mod;
        if (alive) setComponent(() => cached);
      });
      return () => {
        alive = false;
      };
    }, []);
    if (Component) return createElement(Component, props);
    return options.loading ? <>{options.loading()}</> : null;
  }
  return Dynamic;
}
