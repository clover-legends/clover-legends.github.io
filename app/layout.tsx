import type { CSSProperties, ReactNode } from "react";
import Script from "next/script";
import { SiteFooter } from "@/components/site/site-footer";
import { SkinHeader } from "@/components/site/skin-header";
import { siteConfig } from "@/config/site";
import { themeName, themeTokens } from "@/config/themes";
import { enabledLegalPages, visibleCorePages } from "@/content/registry";
import { fontFaceCss } from "@/lib/fonts";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata = rootMetadata();

const navLinks = visibleCorePages.map((page) => ({ label: page.navLabel, slug: page.slug }));
const legalLinks = enabledLegalPages.map((page) => ({ label: page.navLabel, slug: page.slug }));

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const style = Object.fromEntries(
    Object.entries({ ...themeTokens, ...(siteConfig.theme.overrides ?? {}) }).map(([key, value]) => [`--${key}`, value]),
  ) as CSSProperties;

  return (
    <html
      lang={siteConfig.language}
      data-theme={themeName}
      data-skin="resource"
      data-font={siteConfig.theme.fontId ?? "source-sans"}
      data-header-style={siteConfig.theme.headerStyle ?? "solid"}
      data-component-style={siteConfig.theme.componentStyle ?? "sharp"}
      style={style}
    >
      <body>
        <style dangerouslySetInnerHTML={{ __html: fontFaceCss(siteConfig.hosting.basePath) }} />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SkinHeader links={navLinks} />
        <div id="main-content">{children}</div>
        <SiteFooter coreLinks={navLinks} legalLinks={legalLinks} />
        <Script id="adsterra-social-bar" src="https://pl31604697.profitableratecpmnetwork.com/0c/82/fd/0c82fd5020308952783182886638f780.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
