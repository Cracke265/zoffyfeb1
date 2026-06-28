import { useEffect, useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  X,
  Filter,
  Sparkles,
  MapPin,
  ChevronRight,
  Calculator,
  Plus,
  Minus,
  ShoppingCart,
  MessageCircle,
  Compass,
  ScrollText,
  UserCog,
  Swords,
  Sword,
  Shield,
  Star,
  Zap,
  Fish,
  Navigation,
  TreePine,
  Wind,
  Mountain,
  Leaf,
  Droplet,
  Flame,
  Check,
  CheckCircle2,
  LayoutGrid,
} from "lucide-react";
import {
  pricingData,
  regionTheme,
  allRegions,
  allCategories,
  type Category,
  type RegionKey,
} from "@/data/genshinPricing";
import { useLang } from "@/context/LanguageContext";
import { OrderFormModal } from "@/components/OrderFormModal";

const categoryIcons: Record<Category, React.ComponentType<{ className?: string }>> = {
  All: LayoutGrid,
  Explore: Compass,
  "Explore Enkanomiya": Compass,
  "Area Khusus": MapPin,
  Quest: ScrollText,
  "Quest Enkanomiya": ScrollText,
  "Quest Prasyarat": Sparkles,
  "Quest Prasyarat Enkanomiya": Sparkles,
  "Quest Prasyarat Aranyaka": TreePine,
  "Quest Prasyarat Sumeru Gurun": Shield,
  "Rawat Akun": UserCog,
  "Ascend Character": Star,
  Talent: Zap,
  "Ascend Weapon": Sword,
  "Joki Mancing": Fish,
  "Unlock Teleport": Navigation,
  "Spiral Abyss": Swords,
  "Stygian Onslought": Swords,
  "Imaginarium Theater": Sparkles,
  "Local Legend": Sword,
};

// USD pricing table: base price brackets + $2 tax
function calculateUsd(idr: number): number {
  let base = 0;
  if (idr >= 215000) base = 13;
  else if (idr >= 197000) base = 11;
  else if (idr >= 179000) base = 10;
  else if (idr >= 161000) base = 9;
  else if (idr >= 144000) base = 8;
  else if (idr >= 126000) base = 7;
  else if (idr >= 90000) base = 6;
  else if (idr >= 72000) base = 5;
  else if (idr >= 55000) base = 4;
  else if (idr >= 36000) base = 3;
  else if (idr >= 18000) base = 2;
  else if (idr >= 1000) base = 1;
  else return 0;
  return base + 2;
}

function getDisplayPrice(idr: number, lang: string, idrFormatter: (n: number) => string): string {
  if (lang === "en") {
    const usd = calculateUsd(idr);
    return usd === 0 ? "—" : `$${usd}`;
  }
  return idrFormatter(idr);
}

type CartItem = { key: string; name: string; price: number; qty: number };

const regionMeta: Record<string, { subtitle: string; icon: React.ElementType; iconColor: string; shadow: string }> = {
  Mondstadt: { subtitle: "City of Freedom", icon: Wind, iconColor: "text-sky-400", shadow: "shadow-[0_0_20px_rgba(56,189,248,0.5)] border-sky-400/30" },
  Liyue: { subtitle: "Land of Contracts", icon: Mountain, iconColor: "text-amber-500", shadow: "shadow-[0_0_20px_rgba(245,158,11,0.5)] border-amber-500/30" },
  Inazuma: { subtitle: "Eternity & Thunder", icon: Zap, iconColor: "text-fuchsia-500", shadow: "shadow-[0_0_20px_rgba(217,70,239,0.5)] border-fuchsia-500/30" },
  "Sumeru Desert": { subtitle: "Sea of Sand", icon: Leaf, iconColor: "text-emerald-500", shadow: "shadow-[0_0_20px_rgba(16,185,129,0.5)] border-emerald-500/30" },
  Sumeru: { subtitle: "Land of Wisdom", icon: Leaf, iconColor: "text-emerald-500", shadow: "shadow-[0_0_20px_rgba(16,185,129,0.5)] border-emerald-500/30" },
  Fontaine: { subtitle: "Nation of Justice", icon: Droplet, iconColor: "text-blue-500", shadow: "shadow-[0_0_20px_rgba(59,130,246,0.5)] border-blue-500/30" },
  Natlan: { subtitle: "Land of Fire", icon: Flame, iconColor: "text-red-500", shadow: "shadow-[0_0_20px_rgba(239,68,68,0.5)] border-red-500/30" },
  Enkanomiya: { subtitle: "Byakuyakoku", icon: Sparkles, iconColor: "text-blue-300", shadow: "shadow-[0_0_20px_rgba(147,197,253,0.5)] border-blue-300/30" },
  "Nod Krai": { subtitle: "Unknown", icon: Sparkles, iconColor: "text-zinc-400", shadow: "shadow-[0_0_20px_rgba(161,161,170,0.5)] border-zinc-400/30" },
  "Joki Up Character": { subtitle: "Account Maintenance", icon: UserCog, iconColor: "text-blue-400", shadow: "shadow-[0_0_20px_rgba(96,165,250,0.5)] border-blue-400/30" },
  "Joki Konten Game": { subtitle: "Special Services", icon: Swords, iconColor: "text-violet-400", shadow: "shadow-[0_0_20px_rgba(167,139,250,0.5)] border-violet-400/30" },
  "Kebutuhan Lainnya": { subtitle: "Other Utilities", icon: Sparkles, iconColor: "text-teal-400", shadow: "shadow-[0_0_20px_rgba(45,212,191,0.5)] border-teal-400/30" },
};

function Particles() {
  const dots = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const delay = (i % 7) * 0.6;
        const dur = 8 + (i % 5) * 2;
        const size = 2 + (i % 4);
        return (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 0.8, 0] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
            style={{ left: `${left}%`, width: size, height: size }}
            className="absolute rounded-full bg-red-500/70 shadow-[0_0_8px_2px_rgba(239,68,68,0.6)]"
          />
        );
      })}
    </div>
  );
}

// ── Toast Notification ──
function AddedToast({ name, onDone }: { name: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", damping: 22, stiffness: 280 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 rounded-2xl border border-red-500/40 bg-zinc-950/95 backdrop-blur-xl px-5 py-3 shadow-[0_8px_40px_rgba(239,68,68,0.35)] min-w-[220px] max-w-xs"
    >
      <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0" />
      <div className="min-w-0">
        <div className="text-[10px] font-tech tracking-widest text-red-400 uppercase">Ditambahkan</div>
        <div className="text-sm font-medium truncate text-white">{name}</div>
      </div>
    </motion.div>
  );
}

export function GenshinPricelistSection({ waNumber = "6281247195240" }: { waNumber?: string }) {
  const { t, formatPrice, shortPrice, lang } = useLang();

  const [category, setCategory] = useState<Category>("Explore");
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<RegionKey | "all">("all");
  const [openRegion, setOpenRegion] = useState<RegionKey | null>(null);
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Calculator state
  const [calcRegion, setCalcRegion] = useState<RegionKey | "">("");
  const [calcCategory, setCalcCategory] = useState<Category | "">("");
  const [calcItem, setCalcItem] = useState<string>("");

  // Lock body scroll when any drawer/modal open
  useEffect(() => {
    const lock = openRegion || cartOpen || formOpen;
    if (lock) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [openRegion, cartOpen, formOpen]);

  // Regions visible in current category
  const regionsInCategory = useMemo(() => {
    if (category === "All") return allRegions;
    const set = new Set<RegionKey>();
    pricingData.filter((b) => b.category === category).forEach((b) => set.add(b.region));
    return allRegions.filter((r) => set.has(r));
  }, [category]);

  const getItems = (region: RegionKey, cat: Category = category) =>
    pricingData.find((b) => b.region === region && b.category === cat)?.items ?? [];

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    const results: { region: RegionKey; category: Category; name: string; price: number }[] = [];
    pricingData.forEach((b) => {
      b.items.forEach((it) => {
        if (
          it.name.toLowerCase().includes(q) ||
          b.region.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          (it.group ?? "").toLowerCase().includes(q)
        ) results.push({ region: b.region, category: b.category, name: it.name, price: it.price });
      });
    });
    return results.slice(0, 12);
  }, [search]);

  const visibleRegions = useMemo(
    () => regionsInCategory.filter((r) => regionFilter === "all" || r === regionFilter),
    [regionsInCategory, regionFilter],
  );

  // ── Cart helpers ──
  const addToCart = useCallback((key: string, name: string, price: number) => {
    setCart((c) => ({ ...c, [key]: { key, name, price, qty: 1 } }));
    setToast(name);
  }, []);

  const subFromCart = useCallback((key: string) => {
    setCart((c) => {
      const cur = c[key];
      if (!cur) return c;
      const qty = cur.qty - 1;
      if (qty <= 0) { const { [key]: _, ...rest } = c; return rest; }
      return { ...c, [key]: { ...cur, qty } };
    });
  }, []);

  const cartEntries = Object.values(cart);
  const cartTotal = cartEntries.reduce((s, e) => s + e.price * e.qty, 0);
  const cartTotalDisplay = lang === "en" 
    ? `$${cartEntries.reduce((s, e) => s + calculateUsd(e.price) * e.qty, 0)}`
    : formatPrice(cartTotal);
  const cartQty = cartEntries.reduce((s, e) => s + e.qty, 0);

  // Calculator estimate
  const calcEstimate = useMemo(() => {
    if (!calcRegion || !calcCategory || !calcItem) return null;
    const items = getItems(calcRegion as RegionKey, calcCategory as Category);
    return items.find((i) => i.name === calcItem)?.price ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcRegion, calcCategory, calcItem]);

  const calcItems = useMemo(() => {
    if (!calcRegion || !calcCategory) return [];
    return getItems(calcRegion as RegionKey, calcCategory as Category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcRegion, calcCategory]);

  return (
    <section className="relative py-16 md:py-24">
      {/* Ambient bg */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <Particles />
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <AddedToast key={toast + Date.now()} name={toast} onDone={() => setToast(null)} />}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-red-500" />
            <span className="font-tech text-xs tracking-[0.4em] text-red-400 uppercase">Pricelist</span>
            <span className="h-px w-10 bg-red-500" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider bg-gradient-to-b from-white via-white to-red-400 bg-clip-text text-transparent">
            GENSHIN IMPACT
          </h2>
          <p className="font-tech text-xs md:text-sm tracking-[0.3em] text-zinc-400 mt-2">PROFESSIONAL PILOT SERVICE</p>
        </motion.div>

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="relative mb-6 grid gap-3 md:grid-cols-[1fr_auto]"
        >
          <div className="relative group">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-red-500/60 via-red-500/0 to-red-500/60 opacity-60 blur-sm group-focus-within:opacity-100 transition" />
            <div className="relative flex items-center gap-3 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl px-4 py-3">
              <Search className="w-4 h-4 text-red-400 shrink-0" />
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder={t("gpl.search.placeholder")}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-zinc-500 hover:text-white transition" aria-label="Clear">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <AnimatePresence>
              {search && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  className="absolute z-30 mt-2 w-full rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(239,68,68,0.4)]"
                >
                  {searchResults.length === 0 ? (
                    <div className="p-6 text-center text-sm text-zinc-500">{t("gpl.noResults")} "{search}"</div>
                  ) : (
                    <ul className="max-h-80 overflow-y-auto">
                      {searchResults.map((r, i) => (
                        <li key={i}>
                          <button
                            onClick={() => { setCategory(r.category); setRegionFilter("all"); setSearch(""); setOpenRegion(r.region); }}
                            className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-red-500/10 transition border-b border-white/5 last:border-none"
                          >
                            <div className="min-w-0">
                              <div className="text-sm font-medium truncate">{r.name}</div>
                              <div className="text-xs text-zinc-500 mt-0.5">{r.region} · {r.category}</div>
                            </div>
                            <span className="font-sans font-semibold text-sm text-red-400 tabular-nums">{getDisplayPrice(r.price, lang, shortPrice)}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Filter className="w-4 h-4 text-red-400" />
            </div>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as RegionKey | "all")}
              className="w-full md:w-64 appearance-none rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl pl-10 pr-10 py-3 text-sm outline-none focus:border-red-500/60 transition cursor-pointer"
            >
              <option value="all">{t("gpl.filter.allRegions")}</option>
              {allRegions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 text-zinc-500 pointer-events-none" />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="mb-8 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-red-500/30 snap-x">
            {allCategories.map((c) => {
              const Icon = categoryIcons[c];
              const active = category === c;
              return (
                <button key={c} onClick={() => setCategory(c)}
                  className={`relative shrink-0 snap-start group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-tech tracking-wider uppercase transition ${
                    active
                      ? "border-red-500/60 bg-red-500/10 text-white shadow-[0_0_20px_-4px_rgba(239,68,68,0.6)]"
                      : "border-white/10 bg-black/40 text-zinc-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {active && <motion.span layoutId="tab-glow" className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-red-500/20 to-red-500/0" />}
                  <Icon className={`w-4 h-4 ${active ? "text-red-400" : ""}`} />
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Region Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category + regionFilter}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visibleRegions.length === 0 ? (
              <div className="col-span-full text-center py-16 text-zinc-500">{t("gpl.noServices")}</div>
            ) : (
              visibleRegions.map((region, idx) => {
                const items = getItems(region);
                const min = items.length ? Math.min(...items.map((i) => i.price)) : 0;
                const theme = regionTheme[region];
                const meta = regionMeta[region] || regionMeta["Nod Krai"];
                return (
                  <motion.button
                    key={region} onClick={() => setOpenRegion(region)}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.4 }} whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-[2rem] text-left border border-white/5 bg-zinc-950 hover:border-white/10 transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />
                    <div className={`absolute -top-24 -left-24 w-64 h-64 bg-gradient-to-br ${theme.from} to-transparent opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700 z-0`} />
                    <div className="relative z-10 p-7 flex flex-col h-full min-h-[300px]">
                      <div className="flex justify-between items-start mb-auto">
                        <div className={`w-14 h-14 rounded-full border bg-black/40 flex items-center justify-center ${meta.shadow}`}>
                          <meta.icon className={`w-6 h-6 ${meta.iconColor}`} />
                        </div>
                      </div>
                      <div className="mt-8 mb-6">
                        <div className="text-[10px] font-tech tracking-[0.2em] uppercase text-zinc-400 mb-2">{meta.subtitle}</div>
                        <h3 className="font-display text-4xl text-white tracking-wider drop-shadow-md">{region}</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[10px] font-tech text-zinc-300 tracking-widest uppercase mb-8">
                        <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-red-500" /> Explore</div>
                        <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-red-500" /> Oculus</div>
                        <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-red-500" /> Quest</div>
                        <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-red-500" /> Achievement</div>
                      </div>
                      <div className="text-xs font-tech font-bold uppercase tracking-widest text-red-500 flex items-center gap-2 group-hover:gap-3 transition-all">
                        {t("gpl.card.view")} <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.button>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Estimated Price Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-red-500/60 via-red-500/0 to-red-500/60 blur opacity-50" />
            <div className="relative rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/40 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl tracking-wider">{t("gpl.calc.title")}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{t("gpl.calc.desc")}</p>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                <select value={calcRegion} onChange={(e) => { setCalcRegion(e.target.value as RegionKey | ""); setCalcItem(""); }}
                  className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none focus:border-red-500/60">
                  <option value="">{t("gpl.calc.region")}</option>
                  {allRegions.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <select value={calcCategory} onChange={(e) => { setCalcCategory(e.target.value as Category | ""); setCalcItem(""); }}
                  className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none focus:border-red-500/60">
                  <option value="">{t("gpl.calc.category")}</option>
                  {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={calcItem} onChange={(e) => setCalcItem(e.target.value)} disabled={!calcItems.length}
                  className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none focus:border-red-500/60 disabled:opacity-50">
                  <option value="">{t("gpl.calc.item")}</option>
                  {calcItems.map((i) => <option key={i.name} value={i.name}>{i.name}</option>)}
                </select>
                <div className="rounded-xl border border-red-500/40 bg-gradient-to-br from-red-500/15 to-transparent px-4 py-3 flex flex-col justify-center">
                  <span className="text-[10px] font-tech tracking-widest uppercase text-zinc-400">{t("gpl.calc.estimate")}</span>
                  <AnimatePresence mode="wait">
                    <motion.span key={lang + String(calcEstimate)}
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }} className="font-sans font-semibold text-2xl text-red-300 tabular-nums"
                    >
                      {calcEstimate !== null ? getDisplayPrice(calcEstimate, lang, formatPrice) : "—"}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {openRegion && (
          <RegionModal
            region={openRegion}
            category={category}
            onClose={() => setOpenRegion(null)}
            onAdd={(name, price, itemCategory) => {
              const key = `${openRegion}-${itemCategory}-${name}`;
              addToCart(key, `${name} (${openRegion})`, price);
            }}
            onSub={(name, itemCategory) => subFromCart(`${openRegion}-${itemCategory}-${name}`)}
            cart={cart}
            allCategoriesForRegion={allCategories}
            getItems={getItems}
            onOrderNow={() => setFormOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* ── Order Form Modal ── */}
      <OrderFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        themeColor="red"
        packageSummary={cartEntries.length > 0 ? `${cartQty} layanan terpilih` : "Belum ada paket dipilih"}
        cartEntries={cartEntries}
        cartTotal={cartTotal}
        game="genshin"
        waNumber={waNumber}
      />

      {/* ── Floating Cart Button ── */}
      <motion.button
        onClick={() => setCartOpen(true)}
        initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-5 py-3.5 font-tech tracking-wider uppercase text-sm shadow-[0_10px_40px_-10px_rgba(239,68,68,0.8)] border border-red-400/50"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {cartQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-red-400 border border-red-400 rounded-full w-5 h-5 text-[10px] flex items-center justify-center font-bold">
              {cartQty}
            </span>
          )}
        </div>
        <span className="hidden sm:inline tabular-nums">
          {cartEntries.length === 0 ? t("gpl.cart.game") : `${cartQty} item`}
        </span>
      </motion.button>

      {/* ── Cart Drawer ── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-zinc-950/95 backdrop-blur-2xl border-l border-red-500/30 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div>
                  <div className="font-tech text-[10px] tracking-[0.3em] text-red-400 uppercase">{t("gpl.cart.title")}</div>
                  <h3 className="font-display text-2xl">{t("gpl.cart.game")}</h3>
                </div>
                <button onClick={() => setCartOpen(false)} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                {cartEntries.length === 0 ? (
                  <div className="text-center py-16 text-zinc-500">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p>{t("gpl.cart.empty")}</p>
                    <p className="text-xs mt-1">{t("gpl.cart.emptyHint")}</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {cartEntries.map((e) => (
                      <li key={e.key} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{e.name}</div>
                          <AnimatePresence mode="wait">
                              <motion.div key={lang + e.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                                className="text-xs font-sans font-semibold text-red-400 tabular-nums">
                                {getDisplayPrice(e.price, lang, formatPrice)}
                              </motion.div>
                          </AnimatePresence>
                        </div>
                        <button onClick={() => subFromCart(e.key)} className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 transition">
                          <X className="w-3 h-3" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="border-t border-white/10 p-5 space-y-3 bg-black/40">
                <div className="flex items-center justify-between">
                  <span className="font-tech text-[10px] tracking-widest text-zinc-400 uppercase">
                    {t("gpl.cart.total")} ({cartQty} {cartQty === 1 ? "item" : "items"})
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span key={lang + cartTotal}
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }} className="font-sans font-semibold text-3xl text-red-300 tabular-nums">
                      {cartTotalDisplay}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <button
                  onClick={() => setFormOpen(true)}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-tech tracking-wider uppercase text-sm transition ${
                    cartEntries.length === 0
                      ? "bg-zinc-800 text-zinc-500 pointer-events-none"
                      : "bg-gradient-to-r from-red-600 to-red-500 shadow-[0_10px_30px_-10px_rgba(239,68,68,0.8)] hover:scale-[1.02]"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("gpl.cart.orderWa")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

// ───────────── Region Modal ─────────────
function RegionModal({
  region, category, onClose, onAdd, onSub, cart, allCategoriesForRegion, getItems, onOrderNow,
}: {
  region: RegionKey;
  category: Category;
  onClose: () => void;
  onAdd: (name: string, price: number, itemCategory: string) => void;
  onSub: (name: string, itemCategory: string) => void;
  cart: Record<string, CartItem>;
  allCategoriesForRegion: Category[];
  getItems: (r: RegionKey, c?: Category) => { name: string; price: number; group?: string }[];
  onOrderNow: () => void;
}) {
  const { t, formatPrice, lang } = useLang();
  const availableCats = allCategoriesForRegion.filter((c) => getItems(region, c).length > 0);
  const [activeCat, setActiveCat] = useState<Category | "All">(() => {
    if (getItems(region, category).length > 0) return category;
    return availableCats[0] || "All";
  });
  const theme = regionTheme[region];

  const items = useMemo(() => {
    if (activeCat === "All") {
      return availableCats.flatMap(c => getItems(region, c).map(i => ({ ...i, originalCategory: c })));
    }
    return getItems(region, activeCat).map(i => ({ ...i, originalCategory: activeCat }));
  }, [region, activeCat, getItems, availableCats]);
  const groups = useMemo(() => {
    const map = new Map<string, typeof items>();
    items.forEach((i) => {
      const k = i.group ?? t("gpl.modal.group.default");
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(i);
    });
    return Array.from(map.entries());
  }, [items, t]);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
        className="fixed inset-x-3 top-[5vh] bottom-[5vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-[8vh] md:bottom-auto md:max-h-[84vh] md:w-[min(720px,92vw)] z-50 flex flex-col rounded-2xl overflow-hidden"
      >
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-red-500/70 via-red-500/10 to-red-500/70 blur-sm opacity-80 pointer-events-none" />
        <div className="relative flex flex-col flex-1 rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-2xl overflow-hidden">
          {/* Header */}
          <div className={`relative p-5 md:p-6 border-b border-white/10 bg-gradient-to-br ${theme.from} ${theme.to}`}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[10px] font-tech tracking-widest uppercase border border-white/10 mb-2">
                  <MapPin className="w-3 h-3 text-red-400" /> {t("gpl.modal.label")}
                </div>
                <h3 className={`font-display text-4xl md:text-5xl tracking-wider ${theme.label}`}>{region}</h3>
                <p className="text-xs text-zinc-300 mt-1">{t("gpl.modal.hint")}</p>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-lg bg-black/50 hover:bg-black/80 flex items-center justify-center border border-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category sub-tabs */}
          <div className="px-5 md:px-6 pt-4">
            <div className="flex gap-2 overflow-x-auto pb-3">
              <button
                onClick={() => setActiveCat("All")}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-tech tracking-wider uppercase transition ${
                  activeCat === "All"
                    ? "border-red-500/60 bg-red-500/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                }`}
              >
                All
              </button>
              {availableCats.filter(c => c !== "All").map((c) => {
                const Icon = categoryIcons[c];
                const active = activeCat === c;
                return (
                  <button key={c} onClick={() => setActiveCat(c)}
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-tech tracking-wider uppercase transition ${
                      active ? "border-red-500/60 bg-red-500/10 text-white" : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3 h-3" /> {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-5 md:px-6 pb-4 space-y-6">
            {groups.length === 0 && (
              <div className="text-center py-12 text-zinc-500 text-sm">{t("gpl.modal.empty")}</div>
            )}
            {groups.map(([groupName, list]) => (
              <div key={groupName}>
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  <span className="font-tech text-xs tracking-widest uppercase text-zinc-300">{groupName}</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-red-500/40 to-transparent" />
                </div>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left bg-white/[0.03] text-[10px] font-tech tracking-widest uppercase text-zinc-400">
                        <th className="px-4 py-2.5">{t("gpl.modal.col.area")}</th>
                        <th className="px-4 py-2.5 text-right">{t("gpl.modal.col.price")}</th>
                        <th className="px-4 py-2.5 w-36 text-right">{t("gpl.modal.col.action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((it) => {
                        const key = `${region}-${it.originalCategory}-${it.name}`;
                        const inCart = cart[key];
                        return (
                          <tr key={it.name} className="border-t border-white/5 hover:bg-red-500/5 transition">
                            <td className="px-4 py-3">{it.name}</td>
                            <td className="px-4 py-3 text-right font-sans font-semibold text-red-300 tabular-nums">
                              <AnimatePresence mode="wait">
                                <motion.span key={lang + it.name}
                                  initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 3 }} transition={{ duration: 0.15 }} className="inline-block">
                                  {getDisplayPrice(it.price, lang, formatPrice)}
                                </motion.span>
                              </AnimatePresence>
                            </td>
                            <td className="px-4 py-3 text-right">
                              {inCart ? (
                                <button
                                  onClick={() => onSub(it.name, it.originalCategory)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-green-500/60 bg-green-500/10 px-3 py-1.5 text-[10px] font-tech tracking-wider uppercase text-green-400 hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400 transition group/btn"
                                >
                                  <Check className="w-3 h-3" /> Added
                                </button>
                              ) : (
                                <button
                                  onClick={() => onAdd(it.name, it.price, it.originalCategory)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/5 px-3 py-1.5 text-[10px] font-tech tracking-wider uppercase hover:bg-red-500 hover:text-white hover:border-red-500 transition"
                                >
                                  <Plus className="w-3 h-3" /> Add
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>


        </div>
      </motion.div>
    </>
  );
}
