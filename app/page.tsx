import { SkinHomePage } from "@/components/site/skin-home";
import { homePage } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(homePage);

export default function HomePage() {
  return <SkinHomePage />;
}
