import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type TranslationKey } from "@/i18n/translations";

// ─── Fixed exchange rate (1 USD ≈ Rp 15,000) ───────────────────────────────
const USD_RATE = 17_854;

function idrToUsd(idr: number): string {
  const raw = idr / USD_RATE;
  // Round up to nearest $0.25 for clean pricing
  const rounded = Math.ceil(raw * 4) / 4;
  return "$" + (rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(2));
}

// ─── Context value shape ─────────────────────────────────────────────────────
interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Translate a UI string key */
  t: (key: TranslationKey) => string;
  /** Format a price number (IDR) → localized string */
  formatPrice: (idr: number) => string;
  /** Compact price for cards (e.g. "25K" or "$2") */
  shortPrice: (idr: number) => string;
}

const LS_KEY = "zoffyfeb_lang";
const LangContext = createContext<LangContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LS_KEY);
      if (saved === "id" || saved === "en") return saved;
    }
    return "id";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(LS_KEY, l);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => translations[lang][key] ?? key,
    [lang],
  );

  const formatPrice = useCallback(
    (idr: number): string => {
      if (lang === "id") {
        if (idr >= 1_000_000)
          return (idr / 1_000_000).toFixed(idr % 1_000_000 === 0 ? 0 : 1) + "jt";
        if (idr >= 1_000) return (idr / 1_000).toFixed(0) + "k";
        return String(idr);
      }
      return idrToUsd(idr);
    },
    [lang],
  );

  const shortPrice = useCallback(
    (idr: number): string => {
      if (lang === "id") {
        if (idr >= 1_000_000)
          return (idr / 1_000_000).toFixed(idr % 1_000_000 === 0 ? 0 : 1) + "jt";
        if (idr >= 1_000) return (idr / 1_000).toFixed(0) + "k";
        return String(idr);
      }
      return idrToUsd(idr);
    },
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t, formatPrice, shortPrice }}>
      {children}
    </LangContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
