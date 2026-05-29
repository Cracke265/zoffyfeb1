export type Category =
  | "Explore"
  | "Explore Enkanomiya"
  | "Area Khusus"
  | "Quest"
  | "Quest Enkanomiya"
  | "Quest Prasyarat"
  | "Quest Prasyarat Enkanomiya"
  | "Quest Prasyarat Aranyaka"
  | "Quest Prasyarat Sumeru Gurun"
  | "Rawat Akun"
  | "Ascend Character"
  | "Talent"
  | "Ascend Weapon"
  | "Joki Mancing"
  | "Unlock Teleport"
  | "Spiral Abyss";

export type RegionKey =
  | "Mondstadt"
  | "Liyue"
  | "Inazuma"
  | "Sumeru Desert"
  | "Fontaine"
  | "Natlan"
  | "Nod Krai"
  | "Joki Lainnya 01"
  | "Joki Lainnya 02";

export interface ServiceItem {
  name: string;
  price: number; // IDR
  group?: string; // e.g. sub-area "Dragonspine"
}

export interface RegionServiceBlock {
  region: RegionKey;
  category: Category;
  items: ServiceItem[];
}

// Region theming — used for cards, accents, modal borders
export const regionTheme: Record<
  RegionKey,
  { from: string; to: string; ring: string; glow: string; label: string }
> = {
  Mondstadt: {
    from: "from-sky-300/30",
    to: "to-white/5",
    ring: "ring-sky-300/40",
    glow: "shadow-[0_0_40px_-5px_rgba(125,211,252,0.55)]",
    label: "text-sky-200",
  },
  Liyue: {
    from: "from-amber-400/30",
    to: "to-orange-500/10",
    ring: "ring-amber-400/40",
    glow: "shadow-[0_0_40px_-5px_rgba(251,191,36,0.55)]",
    label: "text-amber-200",
  },
  Inazuma: {
    from: "from-fuchsia-500/30",
    to: "to-purple-700/10",
    ring: "ring-fuchsia-400/40",
    glow: "shadow-[0_0_40px_-5px_rgba(217,70,239,0.6)]",
    label: "text-fuchsia-200",
  },
  "Sumeru Desert": {
    from: "from-emerald-400/30",
    to: "to-green-700/10",
    ring: "ring-emerald-400/40",
    glow: "shadow-[0_0_40px_-5px_rgba(52,211,153,0.55)]",
    label: "text-emerald-200",
  },
  Fontaine: {
    from: "from-cyan-300/30",
    to: "to-blue-700/10",
    ring: "ring-cyan-300/40",
    glow: "shadow-[0_0_40px_-5px_rgba(103,232,249,0.55)]",
    label: "text-cyan-200",
  },
  Natlan: {
    from: "from-red-500/30",
    to: "to-orange-600/10",
    ring: "ring-red-500/40",
    glow: "shadow-[0_0_40px_-5px_rgba(239,68,68,0.6)]",
    label: "text-red-200",
  },
  "Nod Krai": {
    from: "from-cyan-400/30",
    to: "to-blue-900/20",
    ring: "ring-cyan-400/40",
    glow: "shadow-[0_0_40px_-5px_rgba(34,211,238,0.55)]",
    label: "text-cyan-200",
  },
  "Joki Lainnya 01": {
    from: "from-blue-500/30",
    to: "to-indigo-600/10",
    ring: "ring-blue-500/40",
    glow: "shadow-[0_0_40px_-5px_rgba(59,130,246,0.6)]",
    label: "text-blue-200",
  },
  "Joki Lainnya 02": {
    from: "from-violet-500/30",
    to: "to-fuchsia-600/10",
    ring: "ring-violet-500/40",
    glow: "shadow-[0_0_40px_-5px_rgba(139,92,246,0.6)]",
    label: "text-violet-200",
  },
};

export const allRegions: RegionKey[] = [
  "Mondstadt",
  "Liyue",
  "Inazuma",
  "Sumeru Desert",
  "Fontaine",
  "Natlan",
  "Nod Krai",
  "Joki Lainnya 01",
  "Joki Lainnya 02",
];

// All possible categories, used for modal rendering
export const allCategories: Category[] = [
  "Explore",
  "Explore Enkanomiya",
  "Area Khusus",
  "Quest",
  "Quest Enkanomiya",
  "Quest Prasyarat",
  "Quest Prasyarat Enkanomiya",
  "Quest Prasyarat Aranyaka",
  "Quest Prasyarat Sumeru Gurun",
  "Rawat Akun",
  "Ascend Character",
  "Talent",
  "Ascend Weapon",
  "Joki Mancing",
  "Unlock Teleport",
  "Spiral Abyss",
];

// Main horizontal tabs shown on the homepage
export const mainCategories: Category[] = [
  "Explore",
  "Explore Enkanomiya",
  "Area Khusus",
  "Quest",
  "Quest Enkanomiya",
  "Quest Prasyarat",
  "Quest Prasyarat Enkanomiya",
  "Quest Prasyarat Aranyaka",
  "Quest Prasyarat Sumeru Gurun",
];

// Data — keep prices in IDR (number)
export const pricingData: RegionServiceBlock[] = [
  // ───── MONDSTADT ─────
  {
    region: "Mondstadt",
    category: "Explore",
    items: [
      { name: "Windcry Hill", price: 25000 },
      { name: "Windwail Highland", price: 25000 },
      { name: "Starfell Valley", price: 35000 },
      { name: "Brightcrown Mountains", price: 30000 },
      { name: "Windrest Peak", price: 20000 },
      { name: "All Anemoculus", price: 35000 },
    ],
  },
  {
    region: "Mondstadt",
    category: "Area Khusus",
    items: [
      { name: "Dragonspine — Quest", price: 25000, group: "Dragonspine" },
      { name: "Dragonspine — Explore Chest", price: 40000, group: "Dragonspine" },
      { name: "Dragonspine — All Crimson Agate", price: 35000, group: "Dragonspine" },
      { name: "Temple Of Space — Quest", price: 35000, group: "Temple Of Space" },
      { name: "Temple Of Space — Explore Chest", price: 45000, group: "Temple Of Space" },
      { name: "Temple Of Space — All Mnemonic Clusters", price: 20000, group: "Temple Of Space" },
    ],
  },
  {
    region: "Mondstadt",
    category: "Quest",
    items: [
      { name: "Normal Quest Pendek", price: 5000 },
      { name: "Normal Quest Panjang", price: 10000 },
    ],
  },

  // ───── LIYUE ─────
  {
    region: "Liyue",
    category: "Explore",
    items: [
      { name: "Sea Of Clouds", price: 35000 },
      { name: "Lisha", price: 30000 },
      { name: "Qiongji Estuary", price: 35000 },
      { name: "Minlin", price: 60000 },
      { name: "Bishui Plain", price: 50000 },
      { name: "The Chasm", price: 25000 },
      { name: "All Geoculus", price: 50000 },
    ],
  },
  {
    region: "Liyue",
    category: "Area Khusus",
    items: [
      { name: "Chenyu Vale — Quest: Berkah Chenyu Dari Giok Karam", price: 40000, group: "Chenyu Vale" },
      { name: "Chenyu Vale — Explore Chest: Upper Vale", price: 35000, group: "Chenyu Vale" },
      { name: "Chenyu Vale — Explore Chest: Southern Mountain", price: 35000, group: "Chenyu Vale" },
      { name: "Chenyu Vale — Explore Chest: Mt Laixin", price: 10000, group: "Chenyu Vale" },
      { name: "Chenyu Vale — All Spirit Carp", price: 40000, group: "Chenyu Vale" },
      { name: "The Chasm Underground — Quest Prasyarat: Archon Chapter II: Bagian IV (Lagu yang Bergema di Dasar Jurang)", price: 35000, group: "The Chasm: Underground Mines" },
      { name: "The Chasm Underground — World Quest: Jurnal Penjelajah Chasm", price: 30000, group: "The Chasm: Underground Mines" },
      { name: "The Chasm Underground — Explore Chest", price: 35000, group: "The Chasm: Underground Mines" },
      { name: "The Chasm Underground — All Lumenspar", price: 40000, group: "The Chasm: Underground Mines" },
    ],
  },
  {
    region: "Liyue",
    category: "Quest",
    items: [
      { name: "Normal Quest Pendek", price: 5000 },
      { name: "Normal Quest Panjang", price: 10000 },
    ],
  },

  // ───── INAZUMA ─────
  {
    region: "Inazuma",
    category: "Explore",
    items: [
      { name: "Narukami Island", price: 40000 },
      { name: "Kannazuka", price: 30000 },
      { name: "Yashiori Island", price: 30000 },
      { name: "Watatsumi Island", price: 30000 },
      { name: "Seirai Island", price: 30000 },
      { name: "Tsurumi Island", price: 40000 },
      { name: "All Electroculus", price: 85000 },
    ],
  },
  {
    region: "Inazuma",
    category: "Quest Prasyarat",
    items: [
      { name: "Ritual Pemurnian Sacred Sakura", price: 45000 },
      { name: "Kisah Tatara", price: 20000 },
      { name: "Warisan Orobashi", price: 30000 },
      { name: "Dasar Pemandian Bulan", price: 15000 },
      { name: "Pemburu Badai Seirai", price: 25000 },
      { name: "Perjalanan Menembus Kabut", price: 50000 },
    ],
  },
  {
    region: "Inazuma",
    category: "Quest",
    items: [
      { name: "Normal Quest Pendek", price: 5000 },
      { name: "Normal Quest Panjang", price: 10000 },
    ],
  },

  // ───── ENKANOMIYA (sub Inazuma) ─────
  {
    region: "Inazuma",
    category: "Quest Enkanomiya",
    items: [
      { name: "Buka Enkanomiya — Dasar Pemandian Bulan", price: 15000, group: "Quest Buka Area Enkanomiya" },
      { name: "Buka Enkanomiya — Pintu Masuk Ke Tokoyo", price: 15000, group: "Quest Buka Area Enkanomiya" },
      { name: "Buka Enkanomiya — Aliran Air Yang Tenang", price: 15000, group: "Quest Buka Area Enkanomiya" },
      { name: "Buka Enkanomiya — Dari Senja Hingga Fajar Byakuyakoku", price: 30000, group: "Quest Buka Area Enkanomiya" },
      { name: "Kolenski Naga Dan Ular (Perlu Tantangan Date, Berkas Tiga Warna, Antigonus)", price: 30000, group: "Quest Prasyarat Dalam Enkanomiya" },
      { name: "Nyanyian Duka Hyperion (Perlu Kumpul 59 Sigil)", price: 15000, group: "Quest Prasyarat Dalam Enkanomiya" },
      { name: "Pemakan Lotus", price: 15000, group: "Quest Prasyarat Dalam Enkanomiya" },
    ],
  },
  {
    region: "Inazuma",
    category: "Quest Prasyarat Enkanomiya",
    items: [
      { name: "Rahasia Erobos (Tantangan Yachimatahiko, Yachimatahime, Kunado, Tija Ujian)", price: 15000 },
    ],
  },
  {
    region: "Inazuma",
    category: "Explore Enkanomiya",
    items: [
      { name: "Explore Chest + 59 Sigil", price: 75000 },
      { name: "59 Sigil Saja", price: 30000 },
    ],
  },

  // ───── SUMERU DESERT ─────
  {
    region: "Sumeru Desert",
    category: "Explore",
    items: [
      { name: "Gurun Hijau — Lokapala Jungle", price: 30000, group: "Explore Gurun Hijau" },
      { name: "Gurun Hijau — Vanarana", price: 10000, group: "Explore Gurun Hijau" },
      { name: "Gurun Hijau — Vissudha Field", price: 25000, group: "Explore Gurun Hijau" },
      { name: "Gurun Hijau — Avidya Forest", price: 30000, group: "Explore Gurun Hijau" },
      { name: "Gurun Hijau — Ashavan Realm", price: 45000, group: "Explore Gurun Hijau" },
      { name: "Gurun Hijau — Ardravi Valley", price: 35000, group: "Explore Gurun Hijau" },
      { name: "Gurun Hijau — Lost Nursery", price: 5000, group: "Explore Gurun Hijau" },
      { name: "Gurun Pasir — Land Of Upper Setekh", price: 25000, group: "Explore Gurun Pasir" },
      { name: "Gurun Pasir — Hypostyle Desert", price: 50000, group: "Explore Gurun Pasir" },
      { name: "Gurun Pasir — Land Of Lower Setekh", price: 40000, group: "Explore Gurun Pasir" },
      { name: "Gurun Pasir — Desert Of Hadramaveth", price: 90000, group: "Explore Gurun Pasir" },
      { name: "Gurun Pasir — Gavireh Lajavan", price: 40000, group: "Explore Gurun Pasir" },
      { name: "Gurun Pasir — Realm Of Farakhkert", price: 35000, group: "Explore Gurun Pasir" },
      { name: "All Dendroculus", price: 200000 },
      { name: "All Plume of Purifying Light", price: 25000 },
    ],
  },
  {
    region: "Sumeru Desert",
    category: "Quest",
    items: [
      { name: "Normal Quest Pendek", price: 5000 },
      { name: "Normal Quest Panjang", price: 10000 },
    ],
  },
  {
    region: "Sumeru Desert",
    category: "Quest Prasyarat Aranyaka",
    items: [
      { name: "Aranyaka I — Perjumpaan Di Hutan", price: 20000, group: "Quest Aranyaka" },
      { name: "Aranyaka II — Kebut Bibit Di Dalam Mimpi", price: 75000, group: "Quest Aranyaka" },
      { name: "Aranyaka III — Taman Impian Yang Hilang", price: 50000, group: "Quest Aranyaka" },
      { name: "Aranyaka IV — Pada Akhirnya Hutan Akan Selalu Mengingat", price: 20000, group: "Quest Aranyaka" },
      { name: "Centang Chapter I : Perjumpaan Di Hutan", price: 5000, group: "Quest Aranyaka" },
      { name: "Centang Chapter III : Varuna Gatha", price: 20000, group: "Quest Aranyaka" },
      { name: "Centang Chapter IV : Agnihotra Sutra", price: 25000, group: "Quest Aranyaka" },
      { name: "76 Aranara", price: 50000, group: "Quest Aranyaka" },
    ],
  },
  {
    region: "Sumeru Desert",
    category: "Quest Prasyarat Sumeru Gurun",
    items: [
      { name: "Gurun Pasir — Dilema Afratus (Land Of Upper Setekh)", price: 15000, group: "Quest Prasyarat Gurun Pasir" },
      { name: "Gurun Pasir — Mimpi Emas (Tersesat Di Lautan Pasir / Arkeologi / Al-Ahmar / Pasir Membakar)", price: 75000, group: "Quest Prasyarat Gurun Pasir" },
      { name: "Gurun Pasir — Pepatah Lama, Pepatah Baru (Bukti Ganda / Penghalang / Mercenary / Bukti Pasir / Soheil)", price: 75000, group: "Quest Prasyarat Gurun Pasir" },
      { name: "Gurun Pasir — Lagu Berkabung Bilqis (Kuil Mengalir / Pasir Mengubur 1-3 / Hijau Abadi)", price: 75000, group: "Quest Prasyarat Gurun Pasir" },
      { name: "Gurun Pasir — Tadhla si \"Elang Pemburu\"", price: 15000, group: "Quest Prasyarat Gurun Pasir" },
      { name: "Gurun Pasir — Kiamat Yang Telah Berlalu", price: 20000, group: "Quest Prasyarat Gurun Pasir" },
      { name: "Gurun Pasir — Khvarena Baik Dan Buruk (Langit Indah / Asipattravana / Gema / Terang Khvarena / Tir Yazad)", price: 75000, group: "Quest Prasyarat Gurun Pasir" },
    ],
  },

  // ───── FONTAINE ─────
  {
    region: "Fontaine",
    category: "Explore",
    items: [
      { name: "Beryl Region", price: 35000 },
      { name: "Belleau Region", price: 20000 },
      { name: "Court of Fontaine Region", price: 40000 },
      { name: "Liffey Region", price: 25000 },
      { name: "Fontaine Research Institute", price: 45000 },
      { name: "Erinnyes Forest", price: 25000 },
      { name: "Morte Region", price: 40000 },
      { name: "All Hydroculus", price: 200000 },
    ],
  },
  {
    region: "Fontaine",
    category: "Area Khusus",
    items: [
      { name: "Nostoi Region & Sea Of Bygone Eras — Exploration", price: 60000, group: "Area Khusus Exploration" },
      { name: "Nostoi Region & Sea Of Bygone Eras — Quest", price: 40000, group: "Area Khusus Quest" },
    ],
  },
  {
    region: "Fontaine",
    category: "Quest",
    items: [
      { name: "Normal Quest Pendek", price: 5000 },
      { name: "Normal Quest Panjang", price: 10000 },
    ],
  },
  {
    region: "Fontaine",
    category: "Quest Prasyarat",
    items: [
      { name: "Beryl — Warna Warna Kuno", price: 55000, group: "Beryl" },
      { name: "Beryl — Kitab Kebenaran Samudera & Berkas Misterius", price: 20000, group: "Beryl" },
      { name: "Court of Fontaine — Petualangan Narzissenkreuz", price: 20000, group: "Court of Fontaine" },
      { name: "Court of Fontaine — Kerajaan Dalam Cermin (Kisah Ann)", price: 20000, group: "Court of Fontaine" },
      { name: "Court of Fontaine — \"Jika Dia Sudah Tak Lagi Memimpikanmu...\" (Kisah Mary-Ann)", price: 20000, group: "Court of Fontaine" },
      { name: "Court of Fontaine — Jejak Pasang Laut", price: 25000, group: "Court of Fontaine" },
      { name: "Liffey — Komedi Yang Belum Selesai", price: 75000, group: "Liffey" },
      { name: "Research Inst. — Kisah Institusi Penelitian Fontaine", price: 45000, group: "Research Inst" },
      { name: "Research Inst. — Menuju Keganjilan", price: 25000, group: "Research Inst" },
      { name: "Research Inst. — Cahaya Pengkhianatan Dasar Laut", price: 20000, group: "Research Inst" },
      { name: "Erinnyes Forest — Peri Dari Erinnyes (Jalan Hutan Kabut / Dedalu Terisak / Mata Air / Kedalaman)", price: 25000, group: "Erinnyes Forest" },
      { name: "Morte — Jejak Narcissus (Pencarian Di Lautan Alga / Kebangkitan / Bangkit Dari Mimpi / Perahu Sungai)", price: 75000, group: "Morte" },
    ],
  },

  // ───── NATLAN ─────
  {
    region: "Natlan",
    category: "Explore",
    items: [
      { name: "Taquemecan Valley", price: 35000 },
      { name: "Coatepec Mountain", price: 40000 },
      { name: "Toyac Springs", price: 25000 },
      { name: "Basin Of Unnumbered Flames", price: 25000 },
      { name: "Tezcatepetonco Range", price: 25000 },
      { name: "Quahuacan Cliff", price: 20000 },
      { name: "Ochkanatlan", price: 40000 },
      { name: "Atocpan", price: 45000 },
      { name: "Easybreeze Holiday Resort", price: 90000 },
      { name: "All Pyroculus", price: 225000 },
    ],
  },
  {
    region: "Natlan",
    category: "Area Khusus",
    items: [
      { name: "Ancient Sacred Mountain — Explore Chest", price: 45000, group: "Ancient Sacred Mountain Explore Chest" },
      { name: "Ancient Sacred Mountain — Jalan Menuju Puncak Berkobar (Lompatan Nahuatzin)", price: 10000, group: "Ancient Sacred Mountain Quest" },
      { name: "Ancient Sacred Mountain — Penyair Kota Yang Hancur", price: 45000, group: "Ancient Sacred Mountain Quest" },
      { name: "Ancient Sacred Mountain — Akhir Dari Kembalinya Bara Api", price: 10000, group: "Ancient Sacred Mountain Quest" },
    ],
  },
  {
    region: "Natlan",
    category: "Quest Prasyarat",
    items: [
      { name: "Taquemecan — Bayangan Gunung", price: 35000, group: "Taquemecan" },
      { name: "Taquemecan — Memancing Masalah", price: 10000, group: "Taquemecan" },
      { name: "Coatepec — Kembalikan Malam Pada Sang Malam", price: 30000, group: "Coatepec" },
      { name: "Toyac — Kisah Mengambil Mimpi Di Tengah Api", price: 25000, group: "Toyac" },
      { name: "Toyac — Antara Janji Dan Lupa", price: 35000, group: "Toyac" },
      { name: "Tezcatepetonco — Misteri Bulu Mengapung Di Tepi Pantai", price: 20000, group: "Tezcatepetonco" },
      { name: "Ochkanatlan — Kota Yang Terkubur Oleh Abu", price: 20000, group: "Ochkanatlan" },
      { name: "Ochkanatlan — Mimpi Akan Langit Yang Jatuh", price: 25000, group: "Ochkanatlan" },
      { name: "Ochkanatlan — Buka Jantungmu Untukku", price: 20000, group: "Ochkanatlan" },
      { name: "Atocpan — Penyelidikan Reruntuhan Kuno / Batu Hancur & Sejarahnya", price: 5000, group: "Atocpan" },
      { name: "Easybreeze — Menuju Liburan Yang Menyenangkan", price: 10000, group: "Easybreeze" },
      { name: "Easybreeze — Dunia Adalah Kanvasmu (Tebing Warna / Tebing Guiztli / Teluk Gelombang)", price: 40000, group: "Easybreeze" },
      { name: "Easybreeze — Kejutan Yang Menanti Kita Semua", price: 20000, group: "Easybreeze" },
      { name: "Easybreeze — Penutupan Malam Musim Yang Penuh Warna", price: 10000, group: "Easybreeze" },
    ],
  },

  // ───── NOD KRAI ─────
  {
    region: "Nod Krai",
    category: "Explore",
    items: [
      { name: "Hiisi Island", price: 25000 },
      { name: "Lempo Isle", price: 40000 },
      { name: "Paha Isle", price: 30000 },
      { name: "Voidsea Outlook", price: 25000 },
      { name: "Wavachaser Plain", price: 30000 },
      { name: "Ashveil Peak", price: 20000 },
      { name: "All Luno Culus (Max Level 8)", price: 150000 },
    ],
  },
  {
    region: "Nod Krai",
    category: "Quest",
    items: [
      { name: "Hiisi — Kisah Gerbang Batu", price: 4000, group: "Hiisi Island" },
      { name: "Hiisi — Hadiah Fatamorgana", price: 4000, group: "Hiisi Island" },
      { name: "Hiisi — Cermin, Labirin, Dan Sang Tsar", price: 9000, group: "Hiisi Island" },
      { name: "Hiisi — Demi Sebuah Pulau Yang Hijau...", price: 8000, group: "Hiisi Island" },
      { name: "Hiisi — Gema Masa Lalu Yang Tak Terselesaikan", price: 8000, group: "Hiisi Island" },
      { name: "Lempo — Hati Pemberita Rahasia", price: 18000, group: "Lempo Isle" },
      { name: "Lempo — Tim Teliti, Atau Tim Intuisi", price: 15000, group: "Lempo Isle" },
      { name: "Lempo — Bisikan Bawah Ombak", price: 8000, group: "Lempo Isle" },
      { name: "Lempo — Kekuatan Penelitian", price: 8000, group: "Lempo Isle" },
      { name: "Lempo — Teman Lembah Moley", price: 8000, group: "Lempo Isle" },
      { name: "Lempo (Hidden) — Kecemasan Pergantian Karir", price: 9000, group: "Lempo Isle" },
      { name: "Lempo (Hidden) — Warna Kekosongan", price: 10000, group: "Lempo Isle" },
      { name: "Paha — Anak Tukang Sepatu, Tapi Tidak Pakai Sepatu", price: 18000, group: "Paha Isle" },
      { name: "Paha — Prioritas Utama", price: 12000, group: "Paha Isle" },
      { name: "Paha — Janji Terbang Ke Langit", price: 7000, group: "Paha Isle" },
      { name: "Voidsea — Gelombang Tiupan Angin", price: 13000, group: "Voidsea Outlook" },
      { name: "Voidsea — Malam Terakhir, Cahaya Pertama", price: 7000, group: "Voidsea Outlook" },
      { name: "Voidsea — Silsilah Gagak", price: 8000, group: "Voidsea Outlook" },
      { name: "Voidsea — Menghukum Pendosa Dengan Dosa", price: 8000, group: "Voidsea Outlook" },
      { name: "Wavachaser — Menara Terbalik", price: 13000, group: "Wavachaser Plain" },
      { name: "Wavachaser — Gema Lagu Yang Diasingkan", price: 10000, group: "Wavachaser Plain" },
      { name: "Wavachaser — Kembali Ke Tangan Pemilik Sebenarnya", price: 14000, group: "Wavachaser Plain" },
      { name: "Ashveil — Saat Lagu Perang Digemakan", price: 15000, group: "Ashveil Peak" },
      { name: "Ashveil — Dengungan Roh Para Pahlawan", price: 4000, group: "Ashveil Peak" },
    ],
  },

  // ───── JOKI LAINNYA 01 CARD ─────
  {
    region: "Joki Lainnya 01",
    category: "Rawat Akun",
    items: [
      { name: "Daily", price: 3000 },
      { name: "Weekly", price: 20000 },
      { name: "Monthly", price: 75000 },
      { name: "Vip Monthly (Include Pengerjaan Event)", price: 110000 },
    ],
  },
  {
    region: "Joki Lainnya 01",
    category: "Ascend Character",
    items: [
      { name: "Level 1 - 20", price: 5000 },
      { name: "Level 20 - 40", price: 5000 },
      { name: "Level 40 - 50", price: 5000 },
      { name: "Level 50 – 60", price: 10000 },
      { name: "Level 60 – 70", price: 10000 },
      { name: "Level 70 – 80", price: 15000 },
      { name: "Level 80 – 90", price: 20000 },
    ],
  },
  {
    region: "Joki Lainnya 01",
    category: "Talent",
    items: [
      { name: "Level 1 – 2", price: 2000 },
      { name: "Level 2 – 3", price: 3000 },
      { name: "Level 3 – 4", price: 4000 },
      { name: "Level 4 – 5", price: 5000 },
      { name: "Level 5 – 6", price: 6000 },
      { name: "Level 6 – 7", price: 7000 },
      { name: "Level 7 – 8", price: 8000 },
      { name: "Level 8 – 9", price: 9000 },
      { name: "Level 9 – 10", price: 10000 },
    ],
  },
  {
    region: "Joki Lainnya 01",
    category: "Ascend Weapon",
    items: [
      { name: "Level 1 - 20", price: 3000 },
      { name: "Level 20 - 40", price: 3000 },
      { name: "Level 40 - 50", price: 3000 },
      { name: "Level 50 – 60", price: 6000 },
      { name: "Level 60 – 70", price: 6000 },
      { name: "Level 70 – 80", price: 10000 },
      { name: "Level 80 – 90", price: 15000 },
    ],
  },

  // ───── JOKI LAINNYA 02 CARD ─────
  {
    region: "Joki Lainnya 02",
    category: "Joki Mancing",
    items: [
      { name: "The Catch — Senjata Saja/R1", price: 17000, group: "1. The Catch" },
      { name: "The Catch — Sampai R5", price: 50000, group: "1. The Catch" },
      { name: "End Of The Line — Senjata Saja/R1", price: 17000, group: "2. End Of The Line" },
      { name: "End Of The Line — Sampai R5", price: 40000, group: "2. End Of The Line" },
      { name: "Fleuve Cendre Ferryman — Senjata Saja/R1", price: 17000, group: "3. Fleuve Cendre Ferryman" },
      { name: "Fleuve Cendre Ferryman — Sampai R5", price: 50000, group: "3. Fleuve Cendre Ferryman" },
    ],
  },
  {
    region: "Joki Lainnya 02",
    category: "Unlock Teleport",
    items: [
      { name: "Mondstadt", price: 10000 },
      { name: "Liyue", price: 15000 },
      { name: "Inazuma", price: 20000 },
      { name: "Sumeru", price: 25000 },
      { name: "Fontaine", price: 20000 },
      { name: "Natlan", price: 25000 },
      { name: "Nod Krai", price: 15000 },
    ],
  },
  {
    region: "Joki Lainnya 02",
    category: "Spiral Abyss",
    items: [
      { name: "Lantai 1 – 8 (per lantai)", price: 5000 },
      { name: "Lantai 9 – 10 (per lantai)", price: 10000 },
      { name: "Lantai 11 – 12 (per lantai)", price: 15000 },
    ],
  },
];

export const formatIDR = (n: number) =>
  "Rp " + n.toLocaleString("id-ID");

export const shortPrice = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + "JT";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return String(n);
};
