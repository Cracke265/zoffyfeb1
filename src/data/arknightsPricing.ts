export type RegionKey =
  | "Valley IV"
  | "Wuling"
  | "Base & Infrastruktur"
  | "Etchspace Salvage"
  | "Tantangan & Rawatan";

export type Category =
  | "All"
  | "Explore"
  | "Quest"
  | "Pabrik & Tambang"
  | "Etchspace"
  | "Tantangan"
  | "Rawat Akun";

export const allRegions: RegionKey[] = [
  "Valley IV",
  "Wuling",
  "Base & Infrastruktur",
  "Etchspace Salvage",
  "Tantangan & Rawatan",
];

export const allCategories: Category[] = [
  "All",
  "Explore",
  "Pabrik & Tambang",
  "Etchspace",
  "Tantangan",
  "Rawat Akun",
  "Quest",
];

export type ServiceItem = {
  name: string;
  price: number; // IDR price
  group?: string; // Sub-group inside a category
};

export type PricingBlock = {
  region: RegionKey;
  category: Category;
  items: ServiceItem[];
};

export const arknightsPricingData: PricingBlock[] = [
  // --- VALLEY IV ---
  {
    region: "Valley IV",
    category: "Explore",
    items: [
      { name: "Chest", price: 30000, group: "1. The Hub" },
      { name: "Aurylene", price: 20000, group: "1. The Hub" },
      { name: "Chest", price: 5000, group: "2. Terusan Lembah" },
      { name: "Aurylene", price: 5000, group: "2. Terusan Lembah" },
      { name: "Chest", price: 20000, group: "3. Tambang Batu Aburrey" },
      { name: "Aurylene", price: 14000, group: "3. Tambang Batu Aburrey" },
      { name: "Chest", price: 20000, group: "4. Taman Sains Originium" },
      { name: "Aurylene", price: 20000, group: "4. Taman Sains Originium" },
      { name: "Chest", price: 25000, group: "5. Lodespring Asal" },
      { name: "Aurylene", price: 18000, group: "5. Lodespring Asal" },
      { name: "Chest", price: 15000, group: "6. Dataran Tinggi Daya" },
      { name: "Aurylene", price: 14000, group: "6. Dataran Tinggi Daya" },
    ],
  },
  {
    region: "Valley IV",
    category: "Quest",
    items: [
      { name: "Main Quest Chapter 1", price: 20000, group: "Main Quest" },
      { name: "Operator Side Quest", price: 15000, group: "Side Quest" },
      { name: "Side Quest", price: 15000, group: "Side Quest" },
      { name: "Quest Sekunder", price: 10000, group: "Side Quest" },
    ],
  },

  // --- WULING ---
  {
    region: "Wuling",
    category: "Explore",
    items: [
      { name: "Chest", price: 60000, group: "1. Kota Wuling" },
      { name: "Aurylene", price: 25000, group: "1. Kota Wuling" },
      { name: "Chest", price: 25000, group: "2. Lembah Jingyu" },
      { name: "Aurylene", price: 15000, group: "2. Lembah Jingyu" },
      { name: "Chest", price: 20000, group: "3. Kampung Benteng Qingbo" },
      { name: "Aurylene", price: 5000, group: "3. Kampung Benteng Qingbo" },
      { name: "Chest", price: 25000, group: "4. Batu Penanda" },
      { name: "Aurylene", price: 15000, group: "4. Batu Penanda" },
      { name: "Chest", price: 20000, group: "5. Area Uji Coba" },
      { name: "Aurylene", price: 10000, group: "5. Area Uji Coba" },
    ],
  },
  {
    region: "Wuling",
    category: "Quest",
    items: [
      { name: "Main Quest Chapter 2", price: 20000, group: "Main Quest" },
      { name: "Operator Side Quest", price: 15000, group: "Side Quest" },
      { name: "Side Quest", price: 15000, group: "Side Quest" },
      { name: "Quest Sekunder", price: 10000, group: "Side Quest" },
    ],
  },

  // --- BASE & INFRASTRUKTUR ---
  {
    region: "Base & Infrastruktur",
    category: "Pabrik & Tambang",
    items: [
      { name: "Set Up Pabrik Inti", price: 15000, group: "Set Up Pabrik (Pantau 2 Hari)" },
      { name: "Set Up Pabrik Cabang", price: 10000, group: "Set Up Pabrik (Pantau 2 Hari)" },
      { name: "Pemasangan Ziplin Valley IV", price: 40000, group: "Pemasangan Ziplin" },
      { name: "Pemasangan Ziplin Wuling", price: 35000, group: "Pemasangan Ziplin" },
      { name: "Open Tambang Valley IV", price: 30000, group: "Open Tambang" },
      { name: "Open Tambang Wuling", price: 25000, group: "Open Tambang" },
    ],
  },

  // --- ETCHSPACE SALVAGE ---
  {
    region: "Etchspace Salvage",
    category: "Etchspace",
    items: [
      { name: "Quest Buka Zona", price: 25000, group: "Zone 1 - 3" },
      { name: "Chest", price: 20000, group: "Zone 1 - 3" },
      { name: "Komisi", price: 20000, group: "Zone 1 - 3" },
      
      { name: "Quest Buka Zona", price: 10000, group: "Zone 4" },
      { name: "Chest", price: 10000, group: "Zone 4" },
      { name: "Komisi", price: 10000, group: "Zone 4" },
      
      { name: "Quest Buka Zona", price: 15000, group: "Zone 5 - 6" },
      { name: "Chest", price: 10000, group: "Zone 5 - 6" },
      { name: "Komisi", price: 15000, group: "Zone 5 - 6" },
    ],
  },

  // --- TANTANGAN & RAWATAN ---
  {
    region: "Tantangan & Rawatan",
    category: "Tantangan",
    items: [
      { name: "Monumen Umbra", price: 5000, group: "Tantangan" },
      { name: "Krisis Ulangan (Medal Emas)", price: 10000, group: "Krisis Ulangan" },
      { name: "Event Permanen", price: 5000, group: "Event" },
    ],
  },
  {
    region: "Tantangan & Rawatan",
    category: "Rawat Akun",
    items: [
      { name: "Daily", price: 5000, group: "Rawat Akun" },
      { name: "Weekly", price: 30000, group: "Rawat Akun" },
      { name: "Monthly", price: 110000, group: "Rawat Akun" },
    ],
  },
];

export const regionTheme: Record<
  RegionKey,
  { from: string; to: string; ring: string; glow: string; label: string }
> = {
  "Valley IV": {
    from: "from-blue-900",
    to: "to-cyan-900/50",
    ring: "ring-cyan-500/30",
    glow: "shadow-[0_0_30px_-5px_rgba(8,145,178,0.4)]",
    label: "text-cyan-400",
  },
  "Wuling": {
    from: "from-yellow-900",
    to: "to-amber-900/50",
    ring: "ring-yellow-500/30",
    glow: "shadow-[0_0_30px_-5px_rgba(234,179,8,0.4)]",
    label: "text-yellow-400",
  },
  "Base & Infrastruktur": {
    from: "from-slate-800",
    to: "to-slate-900",
    ring: "ring-slate-400/30",
    glow: "shadow-[0_0_30px_-5px_rgba(148,163,184,0.4)]",
    label: "text-slate-300",
  },
  "Etchspace Salvage": {
    from: "from-purple-900",
    to: "to-fuchsia-900/50",
    ring: "ring-purple-500/30",
    glow: "shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]",
    label: "text-purple-400",
  },
  "Tantangan & Rawatan": {
    from: "from-emerald-900",
    to: "to-teal-900/50",
    ring: "ring-emerald-500/30",
    glow: "shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]",
    label: "text-emerald-400",
  },
};
