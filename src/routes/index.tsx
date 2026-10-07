import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { CartProvider } from "@/lib/cart";
import { useRevealAll } from "@/hooks/use-motion";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Featured } from "@/components/site/Featured";
import { MenuSection } from "@/components/site/MenuSection";
import { Story } from "@/components/site/Story";
import { Lifestyle } from "@/components/site/Lifestyle";
import { Gallery } from "@/components/site/Gallery";
import { Location, FinalCta, Footer } from "@/components/site/Closing";
import { CartDrawer, MobileOrderBar } from "@/components/site/CartDrawer";

const title = "Fifth & Field — Good food, made to move | NYC";
const description = "Fresh bowls, salads, sandwiches and cold brew made every morning in New York City. Order ahead for pickup or delivery.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=75" },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=75" },
    ],
  }),
  component: Index,
});

function Index() {
  useRevealAll();
  return (
    <CartProvider>
      <Nav />
      <main>
        <Hero />
        <Featured />
        <MenuSection />
        <Story />
        <Lifestyle />
        <Gallery />
        <Location />
        <FinalCta />
      </main>
      <Footer />
      <CartDrawer />
      <MobileOrderBar />
      <Toaster position="top-center" toastOptions={{ style: { borderRadius: "999px" } }} />
    </CartProvider>
  );
}
