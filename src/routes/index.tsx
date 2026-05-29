import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, MessageCircle, Swords, Sparkles, ArrowRight, ClipboardList, CreditCard, Send, ChevronDown } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  InstagramIcon,
  YoutubeIcon,
  DiscordIcon,
  TiktokIcon,
  WhatsappIcon,
} from "@/components/icons/SocialIcons";

const SOCIALS = [
  { name: "WhatsApp", url: "https://wa.me/6281247195240", icon: WhatsappIcon, color: "hover:text-green-500 hover:border-green-500/50 hover:bg-green-500/10" },
  { name: "Discord", url: "#", icon: DiscordIcon, color: "hover:text-[#5865F2] hover:border-[#5865F2]/50 hover:bg-[#5865F2]/10" },
  { name: "Instagram", url: "#", icon: InstagramIcon, color: "hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10" },
  { name: "TikTok", url: "#", icon: TiktokIcon, color: "hover:text-white hover:border-white/50 hover:bg-white/10" },
  { name: "YouTube", url: "#", icon: YoutubeIcon, color: "hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10" },
];

const heroChar = "/assets/background.jpeg";
const genshinImg = "/assets/genshin.jpeg";
const arknightsImg = "/assets/arknights.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZOFFYFEB — Jasa Joki Genshin Impact & Arknights Endfield" },
      { name: "description", content: "Pilot service profesional untuk Genshin Impact & Arknights Endfield. Cepat, aman, terpercaya. Order sekarang!" },
      { property: "og:title", content: "ZOFFYFEB — Pilot Service Genshin & Arknights" },
      { property: "og:description", content: "Jasa joki game terpercaya. Pilot pro, harga bersahabat, hasil maksimal." },
    ],
  }),
  component: Index,
});

function Nav() {
  const { t, lang } = useLang();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow" />
          <span className="font-tech font-black text-xl tracking-wider">ZOFFY<span className="text-primary">FEB</span></span>
        </Link>

        <div className="hidden md:flex gap-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="flex gap-6"
            >
              <Link to="/" className="hover:text-primary transition">Beranda</Link>
              <a href="#layanan" className="hover:text-primary transition">{t("nav.services")}</a>
              <a href="#cara-order" className="hover:text-primary transition">{t("nav.howToOrder")}</a>
              <a href="#why-us" className="hover:text-primary transition">Kenapa Pilih Kami</a>
              <a href="#faq" className="hover:text-primary transition">FAQ</a>
              <a href="#kontak" className="hover:text-primary transition">{t("nav.contact")}</a>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <LanguageSwitcher />
          <a href="#layanan" className="hidden sm:block bg-gradient-primary px-5 py-2 text-sm font-bold uppercase tracking-wider corner-clip shadow-glow hover:scale-105 transition">
            {t("nav.order")}
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const { t, lang } = useLang();
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-hero-radial">
      <div className="absolute top-24 right-6 md:right-12 z-20 flex items-center gap-2 bg-primary px-4 py-1.5 corner-clip">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="font-tech font-black text-xs tracking-widest text-white">LIVE</span>
      </div>
      <div className="absolute top-20 left-6 w-16 h-16 border-t-2 border-l-2 border-foreground/40" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-foreground/40" />
      <div className="absolute left-0 right-0 top-1/2 -translate-y-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
      <div className="absolute left-0 right-0 top-1/2 translate-y-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center relative z-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 border border-primary/40 px-3 py-1 corner-clip">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="font-tech text-xs tracking-widest text-primary">PILOT SERVICE</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl leading-none">
            <span className="block text-gradient-primary">ZOFFYFEB</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={lang + "tagline"}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="block text-3xl md:text-5xl mt-2 text-foreground/90"
              >
                {t("hero.tagline")}
              </motion.span>
            </AnimatePresence>
          </h1>
          <AnimatePresence mode="wait">
            <motion.p
              key={lang + "desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-muted-foreground text-lg max-w-md"
            >
              {t("hero.desc")}
            </motion.p>
          </AnimatePresence>
          <div className="flex flex-wrap gap-4">
            <a href="#layanan" className="bg-gradient-primary px-7 py-3 font-bold uppercase tracking-wider corner-clip shadow-glow hover:scale-105 transition inline-flex items-center gap-2">
              <Swords className="w-4 h-4" /> {t("hero.cta.primary")}
            </a>
            <a href="#cara-order" className="border border-foreground/30 px-7 py-3 font-bold uppercase tracking-wider corner-clip hover:bg-foreground/5 transition">
              {t("hero.cta.secondary")}
            </a>
          </div>
          <div className="flex gap-8 pt-6 border-t border-border/50">
            <Stat n="100%" l="Aman" />
            <Stat n="24/7" l={t("hero.stat.online")} />
            <Stat n="Fast" l="Respon" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-primary/40 shadow-glow" />
            <div className="absolute inset-4 rounded-full border border-foreground/20" />
            <img src={heroChar} alt="ZOFFYFEB" className="absolute inset-6 rounded-full object-cover w-[calc(100%-3rem)] h-[calc(100%-3rem)]" />
            <div className="absolute -top-4 left-12 text-yellow-300 text-3xl">✦</div>
            <div className="absolute top-1/4 -right-2 text-yellow-300 text-2xl">✦</div>
            <div className="absolute bottom-8 left-0 text-yellow-300 text-xl">✦</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-primary">{n}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center space-y-3">
      <div className="inline-flex items-center gap-3 justify-center">
        <div className="w-8 h-px bg-primary" />
        <span className="font-tech text-xs tracking-[0.3em] text-primary uppercase">{eyebrow}</span>
        <div className="w-8 h-px bg-primary" />
      </div>
      <h2 className="font-display text-5xl md:text-6xl text-gradient-primary">{title}</h2>
    </div>
  );
}

function Services() {
  const { t, lang } = useLang();
  const games = [
    { to: "/genshin" as const, name: "GENSHIN IMPACT", sub: t("game.genshin.sub"), desc: t("game.genshin.desc"), img: genshinImg },
    { to: "/arknights" as const, name: "ARKNIGHTS", sub: t("game.ark.sub"), desc: t("game.ark.desc"), img: arknightsImg },
  ];
  return (
    <section id="layanan" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow={t("sec.services.eyebrow")} title={t("sec.services.title")} />
        <AnimatePresence mode="wait">
          <motion.p
            key={lang + "svc-desc"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center text-muted-foreground mt-4 max-w-xl mx-auto"
          >
            {t("sec.services.desc")}
          </motion.p>
        </AnimatePresence>
        <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
          {games.map((g) => (
            <Link key={g.to} to={g.to} className="group relative bg-card border border-border corner-clip overflow-hidden hover:border-primary transition-all hover:shadow-glow">
              <div className="aspect-[16/10] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent z-10" />
                <img src={g.img} alt={g.name} loading="lazy" width={768} height={768} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-2 bg-primary/90 px-2.5 py-1 corner-clip">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  <span className="font-tech text-[10px] tracking-widest text-white font-bold">AVAILABLE</span>
                </div>
              </div>
              <div className="p-6 relative">
                <div className="font-tech text-xs tracking-widest text-primary mb-1">{g.sub}</div>
                <h3 className="font-display text-3xl mb-2">{g.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{g.desc}</p>
                <div className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm text-primary group-hover:gap-3 transition-all">
                  {t("sec.services.cta")} <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowToOrder() {
  const { t } = useLang();
  const steps = [
    { i: ClipboardList, t: t("how.s1.t"), d: t("how.s1.d") },
    { i: MessageCircle, t: t("how.s2.t"), d: t("how.s2.d") },
    { i: CreditCard, t: t("how.s3.t"), d: t("how.s3.d") },
    { i: Send, t: t("how.s4.t"), d: t("how.s4.d") },
  ];
  return (
    <section id="cara-order" className="py-24 bg-card/30 relative">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow={t("how.eyebrow")} title={t("how.title")} />
        <p className="text-center text-muted-foreground mt-4 max-w-xl mx-auto">{t("how.desc")}</p>
        <div className="grid md:grid-cols-4 gap-5 mt-12">
          {steps.map((s, i) => (
            <div key={i} className="relative bg-card border border-border corner-clip p-6 hover:border-primary transition group">
              <div className="absolute top-4 right-4 font-display text-5xl text-primary/20 group-hover:text-primary/40 transition">0{i + 1}</div>
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center mb-4">
                <s.i className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-xl mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY_ITEMS = [
  { emoji: "⚡", label: "Fast Response", desc: "Admin siap membalas pesan dengan cepat setiap saat." },
  { emoji: "🔒", label: "Aman & Private", desc: "Data dan akun kamu dijaga dengan penuh kerahasiaan." },
  { emoji: "🎮", label: "Pilot Berpengalaman", desc: "Dikerjakan oleh pilot pro yang sudah berpengalaman di bidangnya." },
  { emoji: "🕒", label: "Online 24/7", desc: "Admin selalu siap menerima order kapan saja dan di mana saja." },
  { emoji: "📌", label: "Progress Update", desc: "Kamu akan mendapat update perkembangan pengerjaan secara berkala." },
  { emoji: "🚀", label: "Pengerjaan Cepat", desc: "Order dikerjakan sesuai antrean dengan estimasi waktu yang efisien." },
];

function WhyUs() {
  return (
    <section id="why-us" className="py-24">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow="Keunggulan Kami" title="KENAPA PILIH KAMI" />
        <p className="text-center text-muted-foreground mt-4 max-w-xl mx-auto">
          Kami berkomitmen memberikan layanan joki game terbaik, aman, dan profesional untuk kamu.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 max-w-5xl mx-auto">
          {WHY_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group relative bg-card border border-border corner-clip p-6 hover:border-primary hover:shadow-glow transition-all"
            >
              {/* Glow overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-sm" />
              <div className="relative">
                <div className="text-4xl mb-4 leading-none">{item.emoji}</div>
                <h3 className="font-display text-xl mb-2 group-hover:text-primary transition-colors">{item.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: "Apakah joki aman?",
    a: "Ya, pengerjaan dilakukan secara aman dan manual tanpa cheat ataupun program ilegal.",
  },
  {
    q: "Apakah akun saya bisa terkena banned?",
    a: "Risiko sangat minim karena semua pengerjaan dilakukan oleh pilot berpengalaman secara manual.",
  },
  {
    q: "Berapa lama proses pengerjaan?",
    a: "Estimasi pengerjaan tergantung layanan yang dipilih dan antrean order saat ini.",
  },
  {
    q: "Apakah bisa request jam pengerjaan?",
    a: "Bisa, kamu dapat menuliskan request waktu pengerjaan pada catatan order.",
  },
  {
    q: "Apakah saya bisa login saat proses joki?",
    a: "Disarankan tidak login selama proses berlangsung agar pengerjaan lebih lancar dan aman.",
  },
  {
    q: "Bagaimana cara order?",
    a: "Pilih layanan, isi form order, lalu kirim pesanan melalui WhatsApp admin.",
  },
  {
    q: "Apakah tersedia progress update?",
    a: "Ya, admin dapat memberikan update progress selama pengerjaan berlangsung.",
  },
  {
    q: "Metode pembayaran apa yang tersedia?",
    a: "Pembayaran dapat dilakukan melalui transfer bank, e-wallet, atau metode lain yang tersedia.",
  },
  {
    q: "Apakah bisa custom request?",
    a: "Bisa, silakan tuliskan detail request pada catatan order atau hubungi admin langsung.",
  },
  {
    q: "Apakah layanan tersedia 24 jam?",
    a: "Admin online 24/7, namun pengerjaan mengikuti antrean dan jadwal pilot.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="border border-border corner-clip overflow-hidden bg-card hover:border-primary/50 transition-colors"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-sm md:text-base leading-snug pr-2">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-primary">
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQ() {
  return (
    <section id="faq" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow="Pertanyaan Umum" title="FAQ" />
        <p className="text-center text-muted-foreground mt-4 max-w-xl mx-auto mb-12">
          Punya pertanyaan sebelum order? Temukan jawabannya di sini.
        </p>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { t } = useLang();
  return (
    <section id="kontak" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
        <SectionHeader eyebrow={t("cta.eyebrow")} title={t("cta.title")} />
        <p className="text-muted-foreground mt-6 mb-8">{t("cta.desc")}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {SOCIALS.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 border border-foreground/30 px-6 py-3 font-bold uppercase tracking-wider corner-clip transition ${s.color}`}
            >
              <s.icon className="w-5 h-5" />
              <span className="hidden sm:inline">{s.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <div className="font-tech font-black text-xl tracking-wider mb-2 text-center md:text-left">
              ZOFFY<span className="text-primary">FEB</span>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-left">
              {t("footer.tagline")}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className={`w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-muted-foreground transition ${s.color}`}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t border-border/50 text-center text-xs font-tech tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} ZOFFYFEB. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Services />
      <HowToOrder />
      <WhyUs />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
