export type ThemeHeaderStyle = "solid" | "glass" | "border";
export type ThemeComponentStyle = "rounded" | "sharp" | "pill";

export type PageType =
  | "home"
  | "database"
  | "guide"
  | "codes"
  | "updates"
  | "article"
  | "list"
  | "legal";

export interface SiteConfig {
  readyForLaunch: boolean;
  siteName: string;
  shortName: string;
  description: string;
  language: string;
  locale: string;
  authorName: string;
  theme: {
    overrides?: Record<string, string>;
    headerStyle?: ThemeHeaderStyle;
    componentStyle?: ThemeComponentStyle;
    fontId?: string;
  };
  hosting: {
    siteUrl: string;
    basePath: string;
    customDomain: string | null;
  };
  contact: {
    email: string | null;
    url: string | null;
  };
  repositoryUrl: string | null;
  allowedExternalDomains: string[];
  assets: {
    logo: string;
    cover: string;
    openGraph: string;
    favicon: string;
  };
  game: {
    name: string;
    platform: string;
    developer: string;
    genre: string;
    officialUrl: string | null;
  };
  seo: {
    titleTemplate: string;
    defaultKeywords: string[];
  };
}

export interface IntegrationConfig {
  analytics:
    | { provider: "none" }
    | { provider: "google-analytics"; measurementId: string };
  ads:
    | { provider: "none" }
    | {
        provider: "adsterra-native";
        scriptUrl: string;
        containerId: string;
      };
  verification: {
    google: string | null;
    bing: string | null;
  };
}

export interface InternalLink {
  label: string;
  slug: string;
  /** External absolute URL; when set, renders as an outbound anchor instead of an internal route. */
  url?: string;
  description?: string;
}

export interface DataTable {
  caption: string;
  columns: string[];
  rows: string[][];
}

export interface Subsection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: DataTable;
}

export interface PageSection {
  id: string;
  heading: string;
  eyebrow?: string;
  intro?: string;
  paragraphs?: string[];
  subsections?: Subsection[];
  links?: InternalLink[];
  steps?: Array<{ heading: string; description: string }>;
  table?: DataTable;
  /** Index of the column that holds redeemable codes; adds a copy button to those cells. */
  copyCodeColumn?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoPageDefinition {
  enabled: boolean;
  slug: string;
  pageType: Exclude<PageType, "home">;
  navLabel: string;
  title: string;
  description: string;
  keywords: string[];
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  navVisible: boolean;
  hero: {
    eyebrow?: string;
    heading: string;
    lead: string;
  };
  sections: PageSection[];
  faq?: FaqItem[];
  relatedSlugs?: string[];
  lastReviewed: string;
}

export interface HomePageDefinition {
  enabled: true;
  slug: "";
  pageType: "home";
  title: string;
  description: string;
  keywords: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  navVisible: true;
  hero: {
    eyebrow: string;
    heading: string;
    lead: string;
    supportingText: string;
    primaryLink?: InternalLink;
    secondaryLink?: { label: string; url: string };
  };
  stats?: Array<{ label: string; value: string }>;
  sections: PageSection[];
  faq: FaqItem[];
  lastReviewed: string;
}
