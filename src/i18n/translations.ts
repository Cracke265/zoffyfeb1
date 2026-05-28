export type Lang = "id" | "en";

export type TranslationKey =
  // Nav
  | "nav.services" | "nav.howToOrder" | "nav.testimonials" | "nav.contact" | "nav.order"
  // Hero
  | "hero.tagline" | "hero.desc" | "hero.cta.primary" | "hero.cta.secondary"
  | "hero.stat.orders" | "hero.stat.online" | "hero.stat.rating"
  // Services section
  | "sec.services.eyebrow" | "sec.services.title" | "sec.services.desc" | "sec.services.cta"
  | "game.genshin.sub" | "game.genshin.desc"
  | "game.ark.sub" | "game.ark.desc"
  // How to Order
  | "how.eyebrow" | "how.title" | "how.desc"
  | "how.s1.t" | "how.s1.d" | "how.s2.t" | "how.s2.d"
  | "how.s3.t" | "how.s3.d" | "how.s4.t" | "how.s4.d"
  // Why Us
  | "why.eyebrow" | "why.title"
  | "why.safe.t" | "why.safe.d" | "why.fast.t" | "why.fast.d"
  | "why.live.t" | "why.live.d" | "why.guarantee.t" | "why.guarantee.d"
  // Testimonials
  | "testi.eyebrow" | "testi.title"
  | "testi.r1.name" | "testi.r1.text" | "testi.r2.name" | "testi.r2.text" | "testi.r3.name" | "testi.r3.text"
  // CTA
  | "cta.eyebrow" | "cta.title" | "cta.desc"
  // Footer
  | "footer.tagline"
  // ServicePage
  | "sp.back" | "sp.orderNow" | "sp.consult" | "sp.pricing"
  // Genshin Pricelist
  | "gpl.search.placeholder"
  | "gpl.filter.allRegions"
  | "gpl.card.region" | "gpl.card.services" | "gpl.card.from" | "gpl.card.view"
  | "gpl.noServices" | "gpl.noResults"
  | "gpl.calc.title" | "gpl.calc.desc"
  | "gpl.calc.region" | "gpl.calc.category" | "gpl.calc.item" | "gpl.calc.estimate"
  | "gpl.modal.label" | "gpl.modal.hint"
  | "gpl.modal.col.area" | "gpl.modal.col.price" | "gpl.modal.col.action"
  | "gpl.modal.empty" | "gpl.modal.group.default"
  | "gpl.cart.title" | "gpl.cart.game"
  | "gpl.cart.empty" | "gpl.cart.emptyHint"
  | "gpl.cart.total" | "gpl.cart.orderWa"
  | "gpl.wa.greeting" | "gpl.wa.services" | "gpl.wa.total"
  | "gpl.wa.ign" | "gpl.wa.server" | "gpl.wa.notes"
  // Language switcher label
  | "lang.label"
  // Form Order
  | "form.title" | "form.subtitle" | "form.package"
  | "form.name" | "form.name.placeholder"
  | "form.server"
  | "form.notes" | "form.notes.placeholder"
  | "form.submit" | "form.footer"
  // Arknights
  | "ark.cart.game"
  | "ark.wa.greeting";

type Translations = Record<Lang, Record<TranslationKey, string>>;

export const translations: Translations = {
  id: {
    // Nav
    "nav.services": "Layanan",
    "nav.howToOrder": "Cara Order",
    "nav.testimonials": "Testimoni",
    "nav.contact": "Kontak",
    "nav.order": "Order",

    // Hero
    "hero.tagline": "GENSHIN & ARKNIGHTS",
    "hero.desc": "Joki cepat, aman, dan terpercaya. Tingkatkan akun-mu tanpa keluar keringat. Dikerjakan langsung oleh pilot pro.",
    "hero.cta.primary": "Pilih Game",
    "hero.cta.secondary": "Cara Order",
    "hero.stat.orders": "Order Selesai",
    "hero.stat.online": "Online",
    "hero.stat.rating": "Rating",

    // Services
    "sec.services.eyebrow": "Layanan",
    "sec.services.title": "PILIH GAME-MU",
    "sec.services.desc": "Klik game di bawah untuk melihat detail paket dan harga.",
    "sec.services.cta": "Lihat Paket",
    "game.genshin.sub": "Teyvat Expedition",
    "game.genshin.desc": "Daily, Spiral Abyss, AR up, farming material lengkap.",
    "game.ark.sub": "Endfield Operations",
    "game.ark.desc": "Daily mission, sanity farming, story, dan event lengkap.",

    // How to Order
    "how.eyebrow": "How To",
    "how.title": "CARA ORDER",
    "how.desc": "Hanya 4 langkah mudah untuk mulai joki bersama kami.",
    "how.s1.t": "Pilih Game & Paket",
    "how.s1.d": "Klik game yang ingin di-joki, lalu pilih paket sesuai kebutuhan.",
    "how.s2.t": "Chat Admin",
    "how.s2.d": "Hubungi admin via WhatsApp, sertakan detail akun & target.",
    "how.s3.t": "Bayar & Konfirmasi",
    "how.s3.d": "Lakukan pembayaran via QRIS, transfer bank, atau e-wallet.",
    "how.s4.t": "Joki Dimulai",
    "how.s4.d": "Pilot mulai bekerja, progress dilaporkan real-time ke chat-mu.",

    // Why
    "why.eyebrow": "Why Us",
    "why.title": "KENAPA ZOFFYFEB?",
    "why.safe.t": "100% Aman",
    "why.safe.d": "Privacy & akun dijamin aman tanpa banned.",
    "why.fast.t": "Super Cepat",
    "why.fast.d": "Pengerjaan kilat dengan pilot berpengalaman.",
    "why.live.t": "Live Update",
    "why.live.d": "Progress real-time langsung ke chat-mu.",
    "why.guarantee.t": "Garansi",
    "why.guarantee.d": "Tidak sesuai? Refund 100% tanpa ribet.",

    // Testimonials
    "testi.eyebrow": "Testimoni",
    "testi.title": "KATA MEREKA",
    "testi.r1.name": "Reza A.",
    "testi.r1.text": "AR 45 → 55 cuma 4 hari. Mantap!",
    "testi.r2.name": "Dinda M.",
    "testi.r2.text": "Spiral Abyss 36★ aman, fast respon banget.",
    "testi.r3.name": "Galang",
    "testi.r3.text": "Udah langganan 3 bulan, gak pernah kecewa.",

    // CTA
    "cta.eyebrow": "Kontak",
    "cta.title": "SIAP NAIK RANK?",
    "cta.desc": "Hubungi kami di WhatsApp atau Discord. Pilot kami online 24/7 siap bantu akun-mu.",

    // Footer
    "footer.tagline": "Pilot Service · Genshin Impact · Arknights Endfield",

    // ServicePage
    "sp.back": "KEMBALI",
    "sp.orderNow": "Order Sekarang",
    "sp.consult": "Konsultasi via WhatsApp",
    "sp.pricing": "PAKET HARGA",

    // Genshin Pricelist
    "gpl.search.placeholder": "Cari quest, area, atau layanan (cth: Aranyaka)",
    "gpl.filter.allRegions": "Semua Region",
    "gpl.card.region": "Region",
    "gpl.card.services": "layanan",
    "gpl.card.from": "Mulai dari",
    "gpl.card.view": "Lihat Detail",
    "gpl.noServices": "Tidak ada layanan untuk filter ini.",
    "gpl.noResults": "Tidak ada hasil untuk",
    "gpl.calc.title": "Kalkulator Estimasi Harga",
    "gpl.calc.desc": "Pilih region, kategori, dan area untuk melihat estimasi",
    "gpl.calc.region": "Pilih Region",
    "gpl.calc.category": "Pilih Kategori",
    "gpl.calc.item": "Pilih Area / Layanan",
    "gpl.calc.estimate": "Estimasi Harga",
    "gpl.modal.label": "Region Detail",
    "gpl.modal.hint": "Pilih layanan, tap untuk menambahkan ke keranjang",
    "gpl.modal.col.area": "Area / Layanan",
    "gpl.modal.col.price": "Harga",
    "gpl.modal.col.action": "Aksi",
    "gpl.modal.empty": "Belum ada layanan untuk kategori ini.",
    "gpl.modal.group.default": "Umum",
    "gpl.cart.title": "Ringkasan Order",
    "gpl.cart.game": "Genshin Impact",
    "gpl.cart.empty": "Keranjang masih kosong",
    "gpl.cart.emptyHint": "Tap layanan untuk menambahkan",
    "gpl.cart.total": "Total",
    "gpl.cart.orderWa": "Order via WhatsApp",
    "gpl.wa.greeting": "Halo Admin, saya ingin order *Joki Genshin Impact*:",
    "gpl.wa.services": "Layanan",
    "gpl.wa.total": "TOTAL",
    "gpl.wa.ign": "IGN:",
    "gpl.wa.server": "Server:",
    "gpl.wa.notes": "Catatan:",

    // Language
    "lang.label": "Bahasa",

    // Form Order
    "form.title": "FORM ORDER",
    "form.subtitle": "Lengkapi Data",
    "form.package": "Paket",
    "form.name": "NAMA / IGN",
    "form.name.placeholder": "Nama panggilan",
    "form.server": "SERVER",
    "form.notes": "CATATAN (OPSIONAL)",
    "form.notes.placeholder": "Permintaan khusus...",
    "form.submit": "Kirim ke WhatsApp →",
    "form.footer": "Kamu akan diarahkan ke WhatsApp dengan pesan terformat otomatis",

    // Arknights
    "ark.cart.game": "Arknights Endfield",
    "ark.wa.greeting": "Halo Admin, saya ingin order *Joki Arknights Endfield*:",
  },

  en: {
    // Nav
    "nav.services": "Services",
    "nav.howToOrder": "How to Order",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",
    "nav.order": "Order",

    // Hero
    "hero.tagline": "GENSHIN & ARKNIGHTS",
    "hero.desc": "Fast, safe, and reliable boosting. Level up your account without breaking a sweat. Handled by professional pilots.",
    "hero.cta.primary": "Choose Game",
    "hero.cta.secondary": "How to Order",
    "hero.stat.orders": "Orders Done",
    "hero.stat.online": "Online",
    "hero.stat.rating": "Rating",

    // Services
    "sec.services.eyebrow": "Services",
    "sec.services.title": "CHOOSE YOUR GAME",
    "sec.services.desc": "Click a game below to view packages and pricing.",
    "sec.services.cta": "View Packages",
    "game.genshin.sub": "Teyvat Expedition",
    "game.genshin.desc": "Daily commissions, Spiral Abyss, AR leveling, full material farming.",
    "game.ark.sub": "Endfield Operations",
    "game.ark.desc": "Daily missions, sanity farming, story clears, and event completions.",

    // How to Order
    "how.eyebrow": "How To",
    "how.title": "HOW TO ORDER",
    "how.desc": "Just 4 easy steps to start boosting with us.",
    "how.s1.t": "Choose Game & Package",
    "how.s1.d": "Click the game you want boosted, then select the package you need.",
    "how.s2.t": "Chat Admin",
    "how.s2.d": "Contact the admin via WhatsApp with your account details and goals.",
    "how.s3.t": "Pay & Confirm",
    "how.s3.d": "Make payment via QRIS, bank transfer, or e-wallet.",
    "how.s4.t": "Boost Begins",
    "how.s4.d": "Your pilot starts working and reports progress in real-time to your chat.",

    // Why
    "why.eyebrow": "Why Us",
    "why.title": "WHY ZOFFYFEB?",
    "why.safe.t": "100% Safe",
    "why.safe.d": "Privacy & account guaranteed safe — no bans.",
    "why.fast.t": "Lightning Fast",
    "why.fast.d": "Blazing speed with experienced pilots.",
    "why.live.t": "Live Update",
    "why.live.d": "Real-time progress updates straight to your chat.",
    "why.guarantee.t": "Guarantee",
    "why.guarantee.d": "Not satisfied? Full refund, no hassle.",

    // Testimonials
    "testi.eyebrow": "Testimonials",
    "testi.title": "WHAT THEY SAY",
    "testi.r1.name": "Reza A.",
    "testi.r1.text": "AR 45 → 55 in just 4 days. Incredible!",
    "testi.r2.name": "Dinda M.",
    "testi.r2.text": "Spiral Abyss 36★ done safely, super responsive.",
    "testi.r3.name": "Galang",
    "testi.r3.text": "Been a subscriber for 3 months, never disappointed.",

    // CTA
    "cta.eyebrow": "Contact",
    "cta.title": "READY TO RANK UP?",
    "cta.desc": "Reach us on WhatsApp or Discord. Our pilots are online 24/7 ready to help your account.",

    // Footer
    "footer.tagline": "Pilot Service · Genshin Impact · Arknights Endfield",

    // ServicePage
    "sp.back": "BACK",
    "sp.orderNow": "Order Now",
    "sp.consult": "Consult via WhatsApp",
    "sp.pricing": "PRICING PACKAGES",

    // Genshin Pricelist
    "gpl.search.placeholder": "Search quest, area, or service (e.g. Aranyaka)",
    "gpl.filter.allRegions": "All Regions",
    "gpl.card.region": "Region",
    "gpl.card.services": "services",
    "gpl.card.from": "Starting from",
    "gpl.card.view": "View Details",
    "gpl.noServices": "No services available for this filter.",
    "gpl.noResults": "No results for",
    "gpl.calc.title": "Price Estimate Calculator",
    "gpl.calc.desc": "Select region, category, and area to see an estimate",
    "gpl.calc.region": "Select Region",
    "gpl.calc.category": "Select Category",
    "gpl.calc.item": "Select Area / Service",
    "gpl.calc.estimate": "Estimated Price",
    "gpl.modal.label": "Region Detail",
    "gpl.modal.hint": "Choose a service, tap to add to cart",
    "gpl.modal.col.area": "Area / Service",
    "gpl.modal.col.price": "Price",
    "gpl.modal.col.action": "Action",
    "gpl.modal.empty": "No services available for this category.",
    "gpl.modal.group.default": "General",
    "gpl.cart.title": "Order Summary",
    "gpl.cart.game": "Genshin Impact",
    "gpl.cart.empty": "Your cart is empty",
    "gpl.cart.emptyHint": "Tap a service to add it",
    "gpl.cart.total": "Total",
    "gpl.cart.orderWa": "Order via WhatsApp",
    "gpl.wa.greeting": "Hello Admin, I want to order a *Genshin Impact Boosting* service:",
    "gpl.wa.services": "Services",
    "gpl.wa.total": "TOTAL",
    "gpl.wa.ign": "IGN:",
    "gpl.wa.server": "Server:",
    "gpl.wa.notes": "Notes:",

    // Language
    "lang.label": "Language",

    // Form Order
    "form.title": "ORDER FORM",
    "form.subtitle": "Complete Details",
    "form.package": "Package",
    "form.name": "NAME / IGN",
    "form.name.placeholder": "Nickname",
    "form.server": "SERVER",
    "form.notes": "NOTES (OPTIONAL)",
    "form.notes.placeholder": "Special requests...",
    "form.submit": "Send to WhatsApp →",
    "form.footer": "You will be redirected to WhatsApp with an auto-formatted message",

    // Arknights
    "ark.cart.game": "Arknights Endfield",
    "ark.wa.greeting": "Hello Admin, I want to order an *Arknights Endfield Boosting* service:",
  },
};
