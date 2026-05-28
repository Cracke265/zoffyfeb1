import { motion } from "framer-motion";
import type { Lang } from "@/i18n/translations";
import { useLang } from "@/context/LanguageContext";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "id", label: "ID", flag: "🇮🇩" },
  { code: "en", label: "EN", flag: "🇺🇸" },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="relative flex items-center rounded-full border border-white/15 bg-black/50 backdrop-blur-sm p-1 gap-0.5 shadow-[0_0_20px_rgba(239,68,68,0.08)]"
    >
      {/* Neon border glow */}
      <div className="pointer-events-none absolute -inset-px rounded-full opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0" />

      {LANGS.map(({ code, label, flag }) => {
        const active = lang === code;
        return (
          <button
            key={code}
            id={`lang-btn-${code}`}
            onClick={() => setLang(code)}
            aria-pressed={active}
            className="relative px-3 py-1.5 rounded-full text-[11px] font-tech tracking-widest uppercase select-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            {/* Sliding active pill */}
            {active && (
              <motion.span
                layoutId="lang-active-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-full bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.7),inset_0_1px_0_rgba(255,255,255,0.15)]"
              />
            )}
            {/* Label */}
            <span
              className={`relative z-10 flex items-center gap-1.5 transition-colors duration-200 ${
                active ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span className="text-[13px] leading-none">{flag}</span>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
