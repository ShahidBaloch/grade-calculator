export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
