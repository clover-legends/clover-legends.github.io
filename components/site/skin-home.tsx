import { BookOpen, CalendarCheck2, ExternalLink, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { NativeAdSlot } from "@/components/integrations/native-ad-slot";
import { Faq } from "@/components/site/faq";
import { JsonLd } from "@/components/site/json-ld";
import { PageSections } from "@/components/site/page-sections";
import { siteConfig } from "@/config/site";
import { homePage } from "@/content/home";
import { visibleCorePages } from "@/content/registry";
import { homeSchemas } from "@/lib/schema";
import { assetPath, routePath } from "@/lib/urls";

export function SkinHomePage() {
  const pages = visibleCorePages;

  return (
    <>
      <JsonLd data={homeSchemas(homePage)} />
      <main>
        <section className="skin-resource-hero site-container">
          <div className="skin-hero-grid">
            <div>
              <p className="eyebrow">{homePage.hero.eyebrow}</p>
              <h1>{homePage.hero.heading}</h1>
              <p className="section-lead">{homePage.hero.lead}</p>
              <p className="max-w-3xl leading-7 text-muted-foreground">{homePage.hero.supportingText}</p>
              <p className="skin-reviewed mt-4 text-sm font-bold">
                <CalendarCheck2 size={16} />
                Updated: <time dateTime={homePage.lastReviewed}>{new Date(`${homePage.lastReviewed}T00:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {homePage.hero.primaryLink ? (
                  <Link href={routePath(homePage.hero.primaryLink.slug)} className="button-primary">
                    <BookOpen size={18} />{homePage.hero.primaryLink.label}
                  </Link>
                ) : null}
                {siteConfig.game.officialUrl && homePage.hero.secondaryLink ? (
                  <a href={siteConfig.game.officialUrl} rel="noopener noreferrer" className="button-secondary">
                    <Gamepad2 size={18} />{homePage.hero.secondaryLink.label}<ExternalLink size={15} />
                  </a>
                ) : null}
              </div>
              {homePage.stats?.length ? (
                <dl className="skin-fact-grid mt-8" aria-label="Clover Legends quick facts">
                  {homePage.stats.map((stat) => (
                    <div key={stat.label} className="content-card !p-4">
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</dt>
                      <dd className="mt-1 text-lg font-black text-foreground">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <div className="skin-quick-links mt-8">
                {pages.map((page) => (
                  <Link key={page.slug} href={routePath(page.slug)}>{page.navLabel}</Link>
                ))}
              </div>
            </div>
            <aside className="skin-hero-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath(siteConfig.assets.cover)}
                alt={`${siteConfig.game.name} cover art — Roblox Action RPG by ${siteConfig.game.developer}`}
                width={1516}
                height={852}
                loading="eager"
              />
            </aside>
          </div>
        </section>

        <div className="site-container"><NativeAdSlot /></div>
        <div className="site-container space-y-16 py-12 sm:py-16">
          <PageSections sections={homePage.sections} />
          {homePage.faq.length ? <Faq items={homePage.faq} /> : null}
        </div>
      </main>
    </>
  );
}
