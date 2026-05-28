import { useMemo, useState } from "react";
import { Plus, Minus, ShoppingCart, MessageCircle, X, Trash2, Check } from "lucide-react";
import type { PriceList } from "./ServicePage";
import { useLang } from "@/context/LanguageContext";

function parsePrice(p: string): number {
  // "25k" -> 25000, "1.5jt" -> 1500000
  const s = p.trim().toLowerCase().replace(/\s/g, "");
  const num = parseFloat(s.replace(/[^0-9.,]/g, "").replace(",", "."));
  if (Number.isNaN(num)) return 0;
  if (s.includes("jt") || s.includes("juta")) return Math.round(num * 1_000_000);
  if (s.includes("k") || s.includes("rb")) return Math.round(num * 1_000);
  return Math.round(num);
}

const formatIDR = (n: number) =>
  "Rp " + n.toLocaleString("id-ID");

type CartEntry = { key: string; name: string; price: number; qty: number };

export function PriceListOrder({
  priceList,
  serviceTitle,
  waNumber = "6281247195240",
}: {
  priceList: PriceList;
  serviceTitle: string;
  waNumber?: string;
}) {
  const { lang } = useLang();
  const [cart, setCart] = useState<Record<string, CartEntry>>({});
  const [open, setOpen] = useState(false);

  const entries = Object.values(cart).filter((e) => e.qty > 0);
  const total = entries.reduce((s, e) => s + e.price * e.qty, 0);
  const totalQty = entries.reduce((s, e) => s + e.qty, 0);

  const add = (key: string, name: string, price: number) =>
    setCart((c) => ({ ...c, [key]: { key, name, price, qty: (c[key]?.qty ?? 0) + 1 } }));
  const sub = (key: string) =>
    setCart((c) => {
      const cur = c[key];
      if (!cur) return c;
      const qty = cur.qty - 1;
      if (qty <= 0) {
        const { [key]: _, ...rest } = c;
        return rest;
      }
      return { ...c, [key]: { ...cur, qty } };
    });
  const remove = (key: string) =>
    setCart((c) => {
      const { [key]: _, ...rest } = c;
      return rest;
    });
  const clear = () => setCart({});

  const waLink = useMemo(() => {
    if (entries.length === 0) return `https://wa.me/${waNumber}`;
    const isEn = lang === "en";
    const lines = isEn ? [
      "Dear Admin Zoffyfeb,",
      "",
      `I would like to order a boosting service for *${serviceTitle}* with the following details:`,
      "",
      ...entries.map((e, i) => `${i + 1}. ${e.name} ×${e.qty}`),
      "",
      "Please provide guidance for the payment steps and the next execution process. Thank you.",
    ] : [
      "Yth. Admin Zoffyfeb,",
      "",
      `Saya ingin melakukan pemesanan layanan joki *${serviceTitle}* dengan rincian berikut:`,
      "",
      ...entries.map((e, i) => `${i + 1}. ${e.name} ×${e.qty}`),
      "",
      "Mohon panduan untuk langkah pembayaran dan proses pengerjaan selanjutnya. Terima kasih.",
    ];
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [entries, serviceTitle, waNumber, lang]);

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 justify-center mb-3">
          <div className="w-8 h-px bg-primary" />
          <span className="font-tech text-xs tracking-[0.3em] text-primary uppercase">Pricelist</span>
          <div className="w-8 h-px bg-primary" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-gradient-primary">{priceList.heading}</h2>
        {priceList.subheading && (
          <p className="font-tech text-sm tracking-widest text-muted-foreground mt-2">{priceList.subheading}</p>
        )}
        <p className="text-sm text-muted-foreground mt-4">
          Tap item untuk menambahkan ke keranjang order
        </p>
      </div>

      <div className="space-y-10">
        {priceList.categories.map((cat, ci) => (
          <div key={ci}>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display text-2xl md:text-3xl tracking-wider">{cat.title}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-primary/60 to-transparent" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {cat.items.map((it, ii) => {
                const key = `${ci}-${ii}`;
                const price = parsePrice(it.price);
                const inCart = cart[key];
                return (
                  <div
                    key={key}
                    className={`group relative corner-clip border p-4 transition-all ${inCart
                        ? "border-primary bg-primary/10 shadow-glow"
                        : "border-border bg-card/60 hover:border-primary/60 hover:bg-card"
                      }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className={`text-sm md:text-base ${it.bold ? "font-bold" : ""}`}>
                          {it.name}
                        </div>
                        <div className="font-tech text-primary text-sm mt-1 tabular-nums">
                          {formatIDR(price)}
                        </div>
                      </div>
                      {inCart ? (
                        <div className="flex items-center gap-1 corner-clip border border-primary bg-background">
                          <button
                            onClick={() => sub(key)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-primary/20 transition"
                            aria-label="Kurangi"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center font-bold tabular-nums">{inCart.qty}</span>
                          <button
                            onClick={() => add(key, it.name, price)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-primary/20 transition"
                            aria-label="Tambah"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => add(key, it.name, price)}
                          className="shrink-0 inline-flex items-center gap-1 corner-clip border border-primary/50 px-3 py-2 text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition"
                        >
                          <Plus className="w-3 h-3" /> Add
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Floating cart button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-40 group flex items-center gap-3 corner-clip bg-gradient-primary px-5 py-4 font-bold uppercase tracking-wider shadow-glow hover:scale-105 transition ${entries.length === 0 ? "opacity-80" : ""
          }`}
        aria-label="Buka keranjang"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-background text-primary border border-primary rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
              {totalQty}
            </span>
          )}
        </div>
        <span className="hidden sm:inline text-sm">
          {entries.length === 0 ? "Keranjang" : formatIDR(total)}
        </span>
      </button>

      {/* Cart drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-card border-l border-primary/40 flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <div className="font-tech text-xs tracking-[0.3em] text-primary uppercase">Order</div>
                <h3 className="font-display text-2xl">{serviceTitle}</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 flex items-center justify-center hover:bg-primary/10 transition corner-clip"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {entries.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p>Keranjang masih kosong</p>
                  <p className="text-xs mt-1">Pilih paket dari pricelist</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {entries.map((e) => (
                    <li key={e.key} className="flex items-center gap-3 p-3 border border-border corner-clip bg-background/50">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{e.name}</div>
                        <div className="text-xs font-tech text-primary tabular-nums">
                          {formatIDR(e.price)} × {e.qty}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 border border-primary/50 corner-clip">
                        <button
                          onClick={() => sub(e.key)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-primary/20"
                          aria-label="Kurangi"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{e.qty}</span>
                        <button
                          onClick={() => add(e.key, e.name, e.price)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-primary/20"
                          aria-label="Tambah"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => remove(e.key)}
                        className="text-muted-foreground hover:text-primary p-1"
                        aria-label="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-border p-5 space-y-3 bg-background/50">
              <div className="flex items-center justify-between">
                <span className="font-tech text-xs tracking-widest text-muted-foreground uppercase">
                  Total ({totalQty} item)
                </span>
                <span className="font-display text-3xl text-gradient-primary tabular-nums">
                  {formatIDR(total)}
                </span>
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-center gap-2 py-4 font-bold uppercase tracking-wider corner-clip transition ${entries.length === 0
                    ? "bg-muted text-muted-foreground pointer-events-none"
                    : "bg-gradient-primary shadow-glow hover:scale-[1.02]"
                  }`}
              >
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp
              </a>

              {entries.length > 0 && (
                <button
                  onClick={clear}
                  className="w-full text-xs text-muted-foreground hover:text-primary transition flex items-center justify-center gap-1"
                >
                  <Check className="w-3 h-3" /> Kosongkan keranjang
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
