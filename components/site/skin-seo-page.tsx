import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";
import { ResponsiveBanner } from "@/components/integrations/responsive-banner";
import type { SeoPageDefinition } from "@/config/types";
import { getRelatedPages } from "@/content/registry";
import { pageSchemas } from "@/lib/schema";
import { routePath } from "@/lib/urls";
import { Breadcrumbs } from "./breadcrumbs";
import { Faq } from "./faq";
import { JsonLd } from "./json-ld";
import { PageSections } from "./page-sections";
import { RelatedPages } from "./related-pages";

export function SkinSeoPage({ page }: { page: SeoPageDefinition }) {
  const related = getRelatedPages(page);
  const reviewed = new Date(`${page.lastReviewed}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd data={pageSchemas(page)} />
      <main className="skin-article">
        <header className="skin-article-hero">
          <div className="site-container">
            <Breadcrumbs slug={page.slug} current={page.hero.heading} />
            {page.hero.eyebrow ? <p className="eyebrow">{page.hero.eyebrow}</p> : null}
            <h1>{page.hero.heading}</h1>
            <p className="section-lead">{page.hero.lead}</p>
            <p className="skin-reviewed">
              <CalendarCheck2 size={16} />
              Last reviewed: <time dateTime={page.lastReviewed}>{reviewed}</time>
            </p>
          </div>
        </header>
        <ResponsiveBanner />
        <div className="site-container skin-article-grid has-aside">
          <article>
            <PageSections sections={page.sections} nativeAfterFirstParagraph />
            {page.faq?.length ? <Faq items={page.faq} /> : null}
          </article>
          <aside className="skin-article-aside">
            <p className="eyebrow">On this page</p>
            <ul>
              {page.sections.map((section) => (
                <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>
              ))}
            </ul>
            {related.length ? (
              <>
                <p className="eyebrow">Related</p>
                <ul>
                  {related.map((item) => (
                    <li key={item.slug}><Link href={routePath(item.slug)}>{item.navLabel}</Link></li>
                  ))}
                </ul>
              </>
            ) : null}
          </aside>
        </div>
        <div className="site-container skin-article-related">
          <RelatedPages pages={related} />
        </div>
      </main>
    </>
  );
}
