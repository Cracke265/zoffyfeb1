import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, Star } from "lucide-react";
import { GenshinPricelistSection } from "@/components/GenshinPricelistSection";

const img = "/assets/miko.jpg";

function GenshinPage() {
  return (
    <main className="min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-tech tracking-widest text-muted-foreground hover:text-primary transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> KEMBALI
        </Link>

        <section className="relative bg-hero-radial corner-clip border border-border p-8 md:p-12 mb-4 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-primary/40 px-3 py-1 corner-clip mb-4">
                <Star className="w-3 h-3 text-primary" />
                <span className="font-tech text-xs tracking-widest text-primary">
                  TEYVAT EXPEDITION
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl text-gradient-primary leading-none">
                GENSHIN IMPACT
              </h1>
              <p className="font-tech text-lg tracking-widest mt-2 text-foreground/80">
                PILOT SERVICE
              </p>
              <p className="text-muted-foreground mt-4 max-w-lg">
                Layanan joki Genshin Impact lengkap — explore semua region, quest, oculus, account
                service, spiral abyss, hingga weapon service. Pilot pro berpengalaman.
              </p>
            </div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/40 shadow-glow" />
              <img
                src={img}
                alt="Genshin Impact"
                className="absolute inset-0 w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </section>
      </div>

      {/* New modern pricelist section */}
      <GenshinPricelistSection />

      <div className="container mx-auto px-6 text-center mt-8">
        <a
          href="https://wa.me/6281247195240"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-primary px-8 py-4 font-bold uppercase tracking-wider corner-clip shadow-glow hover:scale-105 transition"
        >
          <MessageCircle className="w-5 h-5" /> Konsultasi via WhatsApp
        </a>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/genshin")({
  head: () => ({
    meta: [
      { title: "Joki Genshin Impact — ZOFFYFEB" },
      {
        name: "description",
        content:
          "Pricelist joki Genshin Impact lengkap: explore, quest, oculus, account service, spiral abyss, dan weapon service.",
      },
    ],
  }),
  component: GenshinPage,
});
