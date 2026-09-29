import type { SiteConfig } from "./types";
import rawSiteConfig from "../content/data/site.json";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || "";

const generated = rawSiteConfig as SiteConfig;

export const siteConfig: SiteConfig = {
  ...generated,
  hosting: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || generated.hosting.siteUrl,
    basePath,
    customDomain: process.env.NEXT_PUBLIC_CUSTOM_DOMAIN?.trim() || generated.hosting.customDomain,
  },
};
