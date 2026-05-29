import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle, Star } from "lucide-react";
import { ArknightsPricelistSection } from "@/components/ArknightsPricelistSection";
import { useLang } from "@/context/LanguageContext";

const img = "/assets/arknights.jpeg";

function ArknightsPage() {
  const { t } = useLang();
  return (
    <main className="min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-tech tracking-widest text-muted-foreground hover:text-cyan-400 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> {t("sp.back")}
        </Link>

        <section className="relative bg-hero-radial corner-clip border border-border p-8 md:p-12 mb-4 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-cyan-500/40 px-3 py-1 corner-clip mb-4">
                <Star className="w-3 h-3 text-cyan-500" />
                <span className="font-tech text-xs tracking-widest text-cyan-400">
                  {t("game.ark.sub")}
                </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-none">
                ARKNIGHTS ENDFIELD
              </h1>
              <p className="font-tech text-lg tracking-widest mt-2 text-foreground/80">
                PILOT SERVICE
              </p>
              <p className="text-muted-foreground mt-4 max-w-lg">
                Layanan joki Arknights Endfield lengkap — explore wilayah Valley IV & Wuling, quest, farming aurylene, setup infrastruktur pabrik, hingga rawat akun harian.
              </p>
            </div>
            <div className="relative w-full max-w-xs md:max-w-md mx-auto">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-2xl" />
              <img
                src={img}
                alt="Arknights Endfield"
                className="relative rounded-2xl object-contain w-full h-auto border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(8,145,178,0.3)]"
              />
            </div>
          </div>
        </section>
      </div>

      {/* New modern pricelist section */}
      <ArknightsPricelistSection />

      <div className="container mx-auto px-6 text-center mt-8">
        <a
          href="https://wa.me/6281247195240"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 px-8 py-4 font-bold uppercase tracking-wider corner-clip shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:scale-105 transition"
        >
          <MessageCircle className="w-5 h-5" /> {t("sp.consult")}
        </a>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/arknights")({
  head: () => ({
    meta: [
      { title: "Joki Arknights Endfield — ZOFFYFEB" },
      {
        name: "description",
        content:
          "Pricelist joki Arknights Endfield lengkap: explore, quest, setup pabrik, zipline, etchspace salvage, dan rawat akun.",
      },
    ],
  }),
  component: ArknightsPage,
});
