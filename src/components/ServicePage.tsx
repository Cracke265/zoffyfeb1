import { Link } from "@tanstack/react-router";
import { Check, MessageCircle, ArrowLeft, Star } from "lucide-react";
import { PriceListOrder } from "./PriceListOrder";
import { useLang } from "@/context/LanguageContext";

export interface Tier {
  name: string;
  price: string;
  period: string;
  items: string[];
  hot?: boolean;
}

export interface PriceItem {
  name: string;
  price: string;
  bold?: boolean;
}

export interface PriceCategory {
  title: string;
  items: PriceItem[];
}

export interface PriceList {
  heading: string;
  subheading?: string;
  categories: PriceCategory[];
}

interface Props {
  title: string;
  subtitle: string;
  tagline: string;
  accent: string;
  tiers?: Tier[];
  priceList?: PriceList;
  image: string;
}

export function ServicePage({ title, subtitle, tagline, accent, tiers, priceList, image }: Props) {
  const { lang } = useLang();
  return (
    <main className="min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-tech tracking-widest text-muted-foreground hover:text-primary transition mb-8">
          <ArrowLeft className="w-4 h-4" /> KEMBALI
        </Link>

        <section className="relative bg-hero-radial corner-clip border border-border p-8 md:p-12 mb-12 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-primary/40 px-3 py-1 corner-clip mb-4">
                <Star className="w-3 h-3 text-primary" />
                <span className="font-tech text-xs tracking-widest text-primary">{accent}</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl text-gradient-primary leading-none">{title}</h1>
              <p className="font-tech text-lg tracking-widest mt-2 text-foreground/80">{subtitle}</p>
              <p className="text-muted-foreground mt-4 max-w-lg">{tagline}</p>
            </div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/40 shadow-glow" />
              <img src={image} alt={title} className="absolute inset-3 rounded-full object-cover w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)]" />
            </div>
          </div>
        </section>

        {tiers && tiers.length > 0 && (
          <>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 justify-center mb-3">
                <div className="w-8 h-px bg-primary" />
                <span className="font-tech text-xs tracking-[0.3em] text-primary uppercase">Pricing</span>
                <div className="w-8 h-px bg-primary" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-gradient-primary">PAKET HARGA</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
              {tiers.map((t, i) => (
                <div key={i} className={`relative corner-clip p-8 border transition-all ${t.hot ? "border-primary bg-gradient-to-b from-primary/10 to-card shadow-glow md:scale-105" : "border-border bg-card hover:border-primary/50"}`}>
                  {t.hot && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1 corner-clip">
                      Most Popular
                    </div>
                  )}
                  <div className="font-tech text-sm tracking-widest text-primary mb-2">{t.name}</div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-display text-5xl">{t.price}</span>
                    <span className="text-muted-foreground text-sm">{t.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {t.items.map((it, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" /> {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/6281247195240?text=${encodeURIComponent(
                      lang === "en"
                        ? `Dear Admin Zoffyfeb,\n\nI would like to order a boosting service *${title} - ${t.name}*. Please provide further guidance. Thank you.`
                        : `Yth. Admin Zoffyfeb,\n\nSaya ingin memesan layanan joki *${title} - ${t.name}*. Mohon panduan lebih lanjut. Terima kasih.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`block text-center py-3 font-bold uppercase tracking-wider corner-clip transition ${t.hot ? "bg-gradient-primary shadow-glow" : "border border-foreground/30 hover:bg-foreground/5"}`}
                  >
                    Order Sekarang
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {priceList && (
          <PriceListOrder priceList={priceList} serviceTitle={title} />
        )}



        <div className="text-center">
          <a href="https://wa.me/6281247195240" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-gradient-primary px-8 py-4 font-bold uppercase tracking-wider corner-clip shadow-glow hover:scale-105 transition">
            <MessageCircle className="w-5 h-5" /> Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
