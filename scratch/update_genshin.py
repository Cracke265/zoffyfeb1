import re

with open('src/data/genshinPricing.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Categories
content = re.sub(
    r'export type Category =[^;]+;',
    '''export type Category =
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
  | "Spiral Abyss";''',
    content
)

# 2. RegionKey
content = re.sub(
    r'export type RegionKey =[^;]+;',
    '''export type RegionKey =
  | "Mondstadt"
  | "Liyue"
  | "Inazuma"
  | "Sumeru Desert"
  | "Fontaine"
  | "Natlan"
  | "Nod Krai"
  | "Joki Lainnya 01"
  | "Joki Lainnya 02";''',
    content
)

content = re.sub(r'"Enkanomiya",\s*', '', content) # from allRegions array

# 3. allCategories array
content = re.sub(
    r'export const allCategories: Category\[\] = \[.*?\];',
    '''export const allCategories: Category[] = [
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
];''',
    content, flags=re.DOTALL
)

# 4. regionTheme Enkanomiya removal
content = re.sub(r'Enkanomiya: \{[^}]+\},\s*', '', content, flags=re.DOTALL)

# 5. Enkanomiya data to Inazuma
content = re.sub(r'region:\s*"Enkanomiya",\s*category:\s*"Quest",', 'region: "Inazuma",\n    category: "Quest Enkanomiya",', content)
content = re.sub(r'region:\s*"Enkanomiya",\s*category:\s*"Quest Prasyarat",', 'region: "Inazuma",\n    category: "Quest Prasyarat Enkanomiya",', content)
content = re.sub(r'region:\s*"Enkanomiya",\s*category:\s*"Explore",', 'region: "Inazuma",\n    category: "Explore Enkanomiya",', content)

# 6. Sumeru Desert "Umum" -> "Spesial Item"
content = re.sub(r'group:\s*"Umum"', 'group: "Spesial Item"', content)

# 7. Fontaine Area Khusus
content = re.sub(
    r'\{ name: "Nostoi Region & Sea Of Bygone Eras.*?\}',
    '{ name: "Nostoi Region & Sea Of Bygone Eras — Exploration", price: 60000, group: "Area Khusus (Nostoi & Sea Of Bygone Eras)" }',
    content
) # Wait, it is already in explore, but we need to move it out. 
# Actually let's just do it with python string replace.

with open('src/data/genshinPricing.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Basic string replacements done.")
