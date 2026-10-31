/** Type-only stand-ins for `import type { Metadata, MetadataRoute } from "next"`. */
export type Metadata = Record<string, any>;
export type ResolvingMetadata = Promise<Metadata>;
export declare namespace MetadataRoute {
  type Robots = Record<string, any>;
  type Sitemap = Array<{
    url: string;
    lastModified?: string | Date;
    changeFrequency?: string;
    priority?: number;
  }>;
}
