import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeColor?: "red" | "blue";
  packageSummary: string; // e.g., "Region Mondstadt - mulai 20K"
  cartEntries: { name: string; price: number; qty: number }[];
  cartTotal: number;
  game: "genshin" | "arknights";
  waNumber: string;
}

export function OrderFormModal({
  isOpen,
  onClose,
  themeColor = "red",
  packageSummary,
  cartEntries,
  cartTotal,
  game,
  waNumber,
}: OrderFormModalProps) {
  const { t, formatPrice, lang } = useLang();
  
  const [ign, setIgn] = useState("");
  const [server, setServer] = useState("Asia");
  const [notes, setNotes] = useState("");

  const themeClass = themeColor === "red" ? "text-red-500 border-red-500" : "text-cyan-500 border-cyan-500";
  const bgClass = themeColor === "red" ? "bg-red-600" : "bg-cyan-600";
  const glowClass = themeColor === "red" ? "shadow-[0_0_20px_rgba(220,38,38,0.5)]" : "shadow-[0_0_20px_rgba(8,145,178,0.5)]";

  const handleSend = () => {
    const isEn = lang === "en";
    const totalFormatted = formatPrice(cartTotal);
    const lines = isEn ? [
      "Hello Admin Zoffyfeb,",
      "",
      "I would like to order a boosting service with the following details:",
      "",
      `*Game:* ${game === "genshin" ? "Genshin Impact" : "Arknights Endfield"}`,
      `*Services List:*`,
      ...cartEntries.map(
        (e, i) => `${i + 1}. ${e.name} ×${e.qty}`
      ),
      "",
      `*Total Price:* ${totalFormatted}`,
      "",
      `*Account Details:*`,
      `- IGN / Nickname: ${ign}`,
      `- Server: ${server}`,
      `- Notes: ${notes.trim() || "-"}`,
      "",
      "Please provide guidance for the payment steps and the next execution process. Thank you.",
    ] : [
      "Halo Admin Zoffyfeb,",
      "",
      "Saya ingin melakukan pemesanan layanan joki dengan rincian berikut:",
      "",
      `*Game:* ${game === "genshin" ? "Genshin Impact" : "Arknights Endfield"}`,
      `*Daftar Layanan:*`,
      ...cartEntries.map(
        (e, i) => `${i + 1}. ${e.name} ×${e.qty}`
      ),
      "",
      `*Total Harga:* ${totalFormatted}`,
      "",
      `*Detail Akun:*`,
      `- IGN / Nickname: ${ign}`,
      `- Server: ${server}`,
      `- Catatan: ${notes.trim() || "-"}`,
      "",
      "Mohon panduan untuk langkah pembayaran dan proses pengerjaan selanjutnya. Terima kasih.",
    ];
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className={`fixed inset-x-3 top-[5vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-[10vh] md:w-[min(480px,92vw)] z-[60] flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/95 shadow-2xl ring-1 ${themeColor === "red" ? "ring-red-500/20" : "ring-cyan-500/20"}`}
          >
            {/* Header */}
            <div className="relative p-5 md:p-6 border-b border-white/10 bg-black/40 flex items-start justify-between">
              <div>
                <div className={`font-tech text-[10px] tracking-widest uppercase mb-1 ${themeColor === "red" ? "text-red-500" : "text-cyan-500"}`}>
                  {t("form.title")}
                </div>
                <h3 className="font-display text-3xl">{t("form.subtitle")}</h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-5 md:p-6 space-y-5 overflow-y-auto max-h-[60vh]">
              {/* Paket (Readonly) */}
              <div>
                <label className="block text-[11px] font-tech tracking-widest text-zinc-400 uppercase mb-2">
                  {t("form.package")}
                </label>
                <div className={`px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-sm font-medium ${themeColor === "red" ? "text-red-100" : "text-cyan-100"}`}>
                  {packageSummary}
                </div>
              </div>

              {/* NAMA / IGN */}
              <div>
                <label className="block text-[11px] font-tech tracking-widest text-zinc-400 uppercase mb-2">
                  {t("form.name")}
                </label>
                <input
                  type="text"
                  value={ign}
                  onChange={(e) => setIgn(e.target.value)}
                  placeholder={t("form.name.placeholder")}
                  className={`w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm outline-none transition focus:border-opacity-50 ${themeColor === "red" ? "focus:border-red-500" : "focus:border-cyan-500"}`}
                />
              </div>

              {/* SERVER */}
              <div>
                <label className="block text-[11px] font-tech tracking-widest text-zinc-400 uppercase mb-2">
                  {t("form.server")}
                </label>
                <select
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm outline-none transition focus:border-opacity-50 appearance-none ${themeColor === "red" ? "focus:border-red-500" : "focus:border-cyan-500"}`}
                >
                  <option value="Asia">Asia</option>
                  <option value="America">America</option>
                  <option value="Europe">Europe</option>
                  <option value="TW/HK/MO">TW/HK/MO</option>
                  {game === "arknights" && <option value="Bilibili">Bilibili</option>}
                </select>
              </div>

              {/* CATATAN */}
              <div>
                <label className="block text-[11px] font-tech tracking-widest text-zinc-400 uppercase mb-2">
                  {t("form.notes")}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("form.notes.placeholder")}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm outline-none transition focus:border-opacity-50 resize-none ${themeColor === "red" ? "focus:border-red-500" : "focus:border-cyan-500"}`}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 md:p-6 border-t border-white/10 bg-black/40">
              <button
                onClick={handleSend}
                disabled={!ign.trim()}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed ${bgClass} ${ign.trim() ? glowClass + " hover:scale-[1.02]" : ""}`}
              >
                {t("form.submit")}
              </button>
              <p className="text-center text-[10px] text-zinc-500 mt-3">
                {t("form.footer")}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
