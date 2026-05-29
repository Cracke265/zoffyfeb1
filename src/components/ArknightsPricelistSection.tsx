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
  Factory,
  Hexagon,
  ShieldAlert,
  Wrench,
  CheckCircle2,
  Check,
  LayoutGrid,
} from "lucide-react";

import {
  arknightsPricingData as pricingData,
  regionTheme,
  allRegions,
  allCategories,
  type Category,
  type RegionKey,
} from "@/data/arknightsPricing";
import { useLang } from "@/context/LanguageContext";
import { OrderFormModal } from "@/components/OrderFormModal";

const categoryIcons: Record<Category, React.ComponentType<{ className?: string }>> = {
  All: LayoutGrid,
  Explore: Compass,
  Quest: ScrollText,
  "Pabrik & Tambang": Factory,
  Etchspace: Hexagon,
  Tantangan: ShieldAlert,
  "Rawat Akun": Wrench,
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
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 rounded-2xl border border-cyan-500/40 bg-zinc-950/95 backdrop-blur-xl px-5 py-3 shadow-[0_8px_40px_rgba(8,145,178,0.35)] min-w-[220px] max-w-xs"
    >
      <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
      <div className="min-w-0">
        <div className="text-[10px] font-tech tracking-widest text-cyan-400 uppercase">Ditambahkan</div>
        <div className="text-sm font-medium truncate text-white">{name}</div>
      </div>
    </motion.div>
  );
}

function Particles() {
  const dots = Array.from({ length: 25 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => {
        const left = (i * 47) % 100;
        const top = (i * 83) % 100;
        const delay = (i % 7) * 0.6;
        const dur = 6 + (i % 4) * 2;
        const size = 1.5 + (i % 3);
        return (
          <motion.span
            key={i}
            initial={{ y: "100%", x: "-50%", opacity: 0 }}
            animate={{ y: "-10%", x: "50%", opacity: [0, 0.6, 0] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            className="absolute rounded-none bg-cyan-400/70 shadow-[0_0_8px_2px_rgba(34,211,238,0.6)] rotate-45"
          />
        );
      })}
    </div>
  );
}

export function ArknightsPricelistSection({ waNumber = "6281247195240" }: { waNumber?: string }) {
  const { t, formatPrice, shortPrice, lang } = useLang();

  const [category, setCategory] = useState<Category>("All");
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [openRegion, cartOpen, formOpen]);

  // Regions visible in current category
  const regionsInCategory = useMemo(() => {
    if (category === "All") return allRegions;
    const set = new Set<RegionKey>();
    pricingData
      .filter((b) => b.category === category)
      .forEach((b) => set.add(b.region));
    return allRegions.filter((r) => set.has(r));
  }, [category]);

  // Get items for a specific region + category
  const getItems = (region: RegionKey, cat: Category = category) => {
    return pricingData.find((b) => b.region === region && b.category === cat)?.items ?? [];
  };

  // Search results across everything
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
        ) {
          results.push({ region: b.region, category: b.category, name: it.name, price: it.price });
        }
      });
    });
    return results.slice(0, 12);
  }, [search]);

  // Filtered cards based on region dropdown
  const visibleRegions = useMemo(
    () =>
      regionsInCategory.filter((r) => regionFilter === "all" || r === regionFilter),
    [regionsInCategory, regionFilter],
  );

  // ───── Cart helpers ─────
  const addToCart = useCallback((key: string, name: string, price: number) => {
    setCart((c) => ({ ...c, [key]: { key, name, price, qty: (c[key]?.qty ?? 0) + 1 } }));
    setToast(name);
  }, []);
  const subFromCart = useCallback((key: string) =>
    setCart((c) => {
      const cur = c[key];
      if (!cur) return c;
      const qty = cur.qty - 1;
      if (qty <= 0) {
        const { [key]: _, ...rest } = c;
        return rest;
      }
      return { ...c, [key]: { ...cur, qty } };
    }), []);

  const removeFromCart = useCallback((key: string) => {
    setCart((c) => {
      const { [key]: _, ...rest } = c;
      return rest;
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(8,145,178,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <Particles />
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <AddedToast key={toast + Date.now()} name={toast} onDone={() => setToast(null)} />}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-cyan-500" />
            <span className="font-tech text-xs tracking-[0.4em] text-cyan-400 uppercase">
              Pricelist
            </span>
            <span className="h-px w-10 bg-cyan-500" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider bg-gradient-to-b from-white via-white to-cyan-400 bg-clip-text text-transparent">
            ARKNIGHTS ENDFIELD
          </h2>
          <p className="font-tech text-xs md:text-sm tracking-[0.3em] text-zinc-400 mt-2">
            OPERATIONAL PILOT SERVICE
          </p>
        </motion.div>

        {/* Search + Filter row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-6 grid gap-3 md:grid-cols-[1fr_auto]"
        >
          <div className="relative group">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-cyan-500/60 via-cyan-500/0 to-cyan-500/60 opacity-60 blur-sm group-focus-within:opacity-100 transition" />
            <div className="relative flex items-center gap-3 rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl px-4 py-3">
              <Search className="w-4 h-4 text-cyan-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("gpl.search.placeholder")}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-zinc-500 hover:text-white transition"
                  aria-label="Clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search dropdown */}
            <AnimatePresence>
              {search && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute z-30 mt-2 w-full rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(8,145,178,0.4)]"
                >
                  {searchResults.length === 0 ? (
                    <div className="p-6 text-center text-sm text-zinc-500">
                      {t("gpl.noResults")} "{search}"
                    </div>
                  ) : (
                    <ul className="max-h-80 overflow-y-auto">
                      {searchResults.map((r, i) => (
                        <li key={i}>
                          <button
                            onClick={() => {
                              setCategory(r.category);
                              setRegionFilter("all");
                              setSearch("");
                              setOpenRegion(r.region);
                            }}
                            className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-cyan-500/10 transition border-b border-white/5 last:border-none"
                          >
                            <div className="min-w-0">
                              <div className="text-sm font-medium truncate">{r.name}</div>
                              <div className="text-xs text-zinc-500 mt-0.5">
                                {r.region} · {r.category}
                              </div>
                            </div>
                            <span className="font-tech text-sm text-cyan-400 tabular-nums">
                              {getDisplayPrice(r.price, lang, shortPrice)}
                            </span>
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
              <Filter className="w-4 h-4 text-cyan-400" />
            </div>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value as RegionKey | "all")}
              className="w-full md:w-64 appearance-none rounded-xl border border-white/10 bg-black/60 backdrop-blur-xl pl-10 pr-10 py-3 text-sm outline-none focus:border-cyan-500/60 transition cursor-pointer"
            >
              <option value="all">{t("gpl.filter.allRegions")}</option>
              {allRegions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rotate-90 text-zinc-500 pointer-events-none" />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="mb-8 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-cyan-500/30 snap-x">
            {allCategories.map((c) => {
              const Icon = categoryIcons[c];
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`relative shrink-0 snap-start group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-tech tracking-wider uppercase transition ${active
                      ? "border-cyan-500/60 bg-cyan-500/10 text-white shadow-[0_0_20px_-4px_rgba(8,145,178,0.6)]"
                      : "border-white/10 bg-black/40 text-zinc-400 hover:text-white hover:border-white/20"
                    }`}
                >
                  {active && (
                    <motion.span
                      layoutId="tab-glow-ark"
                      className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-cyan-500/20 to-cyan-500/0"
                    />
                  )}
                  <Icon className={`w-4 h-4 ${active ? "text-cyan-400" : ""}`} />
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visibleRegions.length === 0 ? (
              <div className="col-span-full text-center py-16 text-zinc-500">
                {t("gpl.noServices")}
              </div>
            ) : (
              visibleRegions.map((region, idx) => {
                const items = getItems(region);
                const min = items.length ? Math.min(...items.map((i) => i.price)) : 0;
                const theme = regionTheme[region];
                return (
                  <motion.button
                    key={region}
                    onClick={() => setOpenRegion(region)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.4 }}
                    whileHover={{ y: -6 }}
                    className={`group relative overflow-hidden rounded-2xl text-left ring-1 ${theme.ring} bg-zinc-950/60 backdrop-blur-xl hover:${theme.glow} transition-shadow`}
                  >
                    {/* Gradient art panel */}
                    <div className="relative h-36 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${theme.from} ${theme.to} transition-transform duration-700 group-hover:scale-110`}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[10px] font-tech tracking-widest uppercase border border-white/10">
                        <MapPin className={`w-3 h-3 ${theme.label}`} />
                        {t("gpl.card.region")}
                      </div>
                      <div className="absolute bottom-3 left-4 right-4">
                        <h3 className={`font-display text-3xl tracking-wider ${theme.label} drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}>
                          {region}
                        </h3>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">
                          <span className="text-white font-bold tabular-nums">{items.length}</span>{" "}
                          {t("gpl.card.services")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/5 transition">
                        <span className="text-xs font-tech tracking-widest uppercase">
                          {t("gpl.card.view")}
                        </span>
                        <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition" />
                      </div>
                    </div>

                    {/* Animated gradient border on hover */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition">
                      <div className="absolute inset-0 rounded-2xl border border-cyan-500/40" />
                    </div>
                  </motion.button>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Estimated Price Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/60 via-cyan-500/0 to-cyan-500/60 blur opacity-50" />
            <div className="relative rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl tracking-wider">
                    {t("gpl.calc.title")}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {t("gpl.calc.desc")}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-4">
                <select
                  value={calcRegion}
                  onChange={(e) => {
                    setCalcRegion(e.target.value as RegionKey | "");
                    setCalcItem("");
                  }}
                  className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none focus:border-cyan-500/60"
                >
                  <option value="">{t("gpl.calc.region")}</option>
                  {allRegions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <select
                  value={calcCategory}
                  onChange={(e) => {
                    setCalcCategory(e.target.value as Category | "");
                    setCalcItem("");
                  }}
                  className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none focus:border-cyan-500/60"
                >
                  <option value="">{t("gpl.calc.category")}</option>
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  value={calcItem}
                  onChange={(e) => setCalcItem(e.target.value)}
                  disabled={!calcItems.length}
                  className="rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-sm outline-none focus:border-cyan-500/60 disabled:opacity-50"
                >
                  <option value="">{t("gpl.calc.item")}</option>
                  {calcItems.map((i) => (
                    <option key={i.name} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                </select>
                <div className="rounded-xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/15 to-transparent px-4 py-3 flex flex-col justify-center">
                  <span className="text-[10px] font-tech tracking-widest uppercase text-zinc-400">
                    {t("gpl.calc.estimate")}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={lang + String(calcEstimate)}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className="font-display text-2xl text-cyan-300 tabular-nums"
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

      {/* ───── Detail Modal ───── */}
      <AnimatePresence>
        {openRegion && (
          <RegionModal
            region={openRegion}
            category={category}
            onClose={() => setOpenRegion(null)}
            onAdd={(name, price, itemCategory, group) => {
              const key = `${openRegion}-${itemCategory}-${group ?? ""}-${name}`;
              addToCart(key, `${name} (${group ? group + " - " : ""}${openRegion})`, price);
            }}
            cart={cart}
            onRemove={(name, itemCategory, group) => removeFromCart(`${openRegion}-${itemCategory}-${group ?? ""}-${name}`)}
            allCategoriesForRegion={allCategories}
            getItems={getItems}
            onOrderNow={() => setFormOpen(true)}
          />
        )}
      </AnimatePresence>

      <OrderFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        themeColor="blue"
        packageSummary={cartEntries.length > 0 ? `${cartQty} layanan terpilih` : "Belum ada paket dipilih"}
        cartEntries={cartEntries}
        cartTotal={cartTotal}
        game="arknights"
        waNumber={waNumber}
      />

      {/* ───── Floating Cart Button ───── */}
      <motion.button
        onClick={() => setCartOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-cyan-500 px-5 py-3.5 font-tech tracking-wider uppercase text-sm shadow-[0_10px_40px_-10px_rgba(8,145,178,0.8)] border border-cyan-400/50"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {cartQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-cyan-400 border border-cyan-400 rounded-full w-5 h-5 text-[10px] flex items-center justify-center font-bold">
              {cartQty}
            </span>
          )}
        </div>
        <span className="hidden sm:inline tabular-nums">
          {cartEntries.length === 0 ? t("ark.cart.game") : `${cartQty} item`}
        </span>
      </motion.button>

      {/* ───── Cart Drawer ───── */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-zinc-950/95 backdrop-blur-2xl border-l border-cyan-500/30 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div>
                  <div className="font-tech text-[10px] tracking-[0.3em] text-cyan-400 uppercase">
                    {t("gpl.cart.title")}
                  </div>
                  <h3 className="font-display text-2xl">{t("ark.cart.game")}</h3>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10"
                >
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
                      <li
                        key={e.key}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{e.name}</div>
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={lang + e.key}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="text-xs font-tech text-cyan-400 tabular-nums"
                            >
                              {getDisplayPrice(e.price, lang, formatPrice)}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        <button
                          onClick={() => removeFromCart(e.key)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/20 transition"
                          title="Hapus"
                        >
                          <X className="w-4 h-4" />
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
                    <motion.span
                      key={lang + cartTotal}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="font-display text-3xl text-cyan-300 tabular-nums"
                    >
                      {cartTotalDisplay}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <button
                  onClick={() => setFormOpen(true)}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-tech tracking-wider uppercase text-sm transition ${cartEntries.length === 0
                      ? "bg-zinc-800 text-zinc-500 pointer-events-none"
                      : "bg-gradient-to-r from-cyan-600 to-cyan-500 shadow-[0_10px_30px_-10px_rgba(8,145,178,0.8)] hover:scale-[1.02]"
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

// ───────────── Modal ─────────────

function RegionModal({
  region,
  category,
  onClose,
  onAdd,
  onRemove,
  cart,
  allCategoriesForRegion,
  getItems,
  onOrderNow,
}: {
  region: RegionKey;
  category: Category;
  onClose: () => void;
  onAdd: (name: string, price: number, itemCategory: string, group?: string) => void;
  onRemove: (name: string, itemCategory: string, group?: string) => void;
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

  // group by `group` field
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 280 }}
        className="fixed inset-x-3 top-[5vh] bottom-[5vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-[8vh] md:bottom-auto md:max-h-[84vh] md:w-[min(720px,92vw)] z-50 flex flex-col rounded-2xl overflow-hidden"
      >
        {/* Gradient border wrapper */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/70 via-cyan-500/10 to-cyan-500/70 blur-sm opacity-80 pointer-events-none" />
        <div className="relative flex flex-col flex-1 rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-2xl overflow-hidden">
          {/* Header */}
          <div className={`relative p-5 md:p-6 border-b border-white/10 bg-gradient-to-br ${theme.from} ${theme.to}`}>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur px-2.5 py-1 text-[10px] font-tech tracking-widest uppercase border border-white/10 mb-2">
                  <MapPin className={`w-3 h-3 ${theme.label}`} /> {t("gpl.modal.label")}
                </div>
                <h3 className={`font-display text-4xl md:text-5xl tracking-wider ${theme.label}`}>
                  {region}
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  {t("gpl.modal.hint")}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg bg-black/50 hover:bg-black/80 flex items-center justify-center border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category sub-tabs (within modal) */}
          <div className="px-5 md:px-6 pt-4">
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none">
              <button
                onClick={() => setActiveCat("All")}
                className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-tech tracking-wider uppercase transition ${activeCat === "All"
                    ? "border-cyan-500/60 bg-cyan-500/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                  }`}
              >
                All
              </button>
              {availableCats.filter(c => c !== "All").map((c) => {
                const Icon = categoryIcons[c];
                const active = activeCat === c;
                return (
                  <button
                    key={c}
                    onClick={() => setActiveCat(c)}
                    className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-tech tracking-wider uppercase transition ${active
                        ? "border-cyan-500/60 bg-cyan-500/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white"
                      }`}
                  >
                    <Icon className="w-3 h-3" /> {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-5 md:px-6 pb-6 space-y-6">
            {groups.length === 0 && (
              <div className="text-center py-12 text-zinc-500 text-sm">
                {t("gpl.modal.empty")}
              </div>
            )}
            {groups.map(([groupName, list]) => (
              <div key={groupName}>
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-tech text-xs tracking-widest uppercase text-zinc-300">
                    {groupName}
                  </span>
                  <span className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
                </div>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left bg-white/[0.03] text-[10px] font-tech tracking-widest uppercase text-zinc-400">
                        <th className="px-4 py-2.5">{t("gpl.modal.col.area")}</th>
                        <th className="px-4 py-2.5 text-right">{t("gpl.modal.col.price")}</th>
                        <th className="px-4 py-2.5 w-28 text-right">{t("gpl.modal.col.action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((it) => {
                        const key = `${region}-${it.originalCategory}-${it.group ?? ""}-${it.name}`;
                        const inCart = cart[key];
                        return (
                          <tr
                            key={`${it.group}-${it.name}`}
                            className="border-t border-white/5 hover:bg-cyan-500/5 transition"
                          >
                            <td className="px-4 py-3">{it.name}</td>
                            <td className="px-4 py-3 text-right font-tech text-cyan-300 tabular-nums">
                              <AnimatePresence mode="wait">
                                <motion.span
                                  key={lang + it.group + it.name}
                                  initial={{ opacity: 0, y: -3 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 3 }}
                                  transition={{ duration: 0.15 }}
                                  className="inline-block"
                                >
                                  {getDisplayPrice(it.price, lang, formatPrice)}
                                </motion.span>
                              </AnimatePresence>
                            </td>
                            <td className="px-4 py-3 text-right">
                              {inCart ? (
                                <button
                                  onClick={() => onRemove(it.name, it.originalCategory, it.group)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500 bg-cyan-500/20 px-3 py-1.5 text-[10px] font-tech tracking-wider uppercase text-cyan-400 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500 transition"
                                >
                                  <Check className="w-3 h-3" /> Added
                                </button>
                              ) : (
                                <button
                                  onClick={() => onAdd(it.name, it.price, it.originalCategory, it.group)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/5 px-3 py-1.5 text-[10px] font-tech tracking-wider uppercase hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition"
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
