import { GrocerySectionItem, GROCERY_SECTIONS } from "./grocerySectionsData";
import { FashionSectionItem, FASHION_SECTIONS } from "./fashionSectionsData";

export interface SubrailItem {
  id: string;
  name: string;
  image: string;
}

// Map each subcategory ID to its parent section items for the left rail
const SECTION_SUBCATEGORY_MAP: Record<string, SubrailItem[]> = {};

// Register all Grocery Sections
GROCERY_SECTIONS.forEach((sec) => {
  const items: SubrailItem[] = sec.items.map((it: GrocerySectionItem) => ({
    id: it.id,
    name: it.name,
    image: it.image,
  }));
  sec.items.forEach((it: GrocerySectionItem) => {
    SECTION_SUBCATEGORY_MAP[it.id] = items;
  });
});

// Register all Fashion Sections
FASHION_SECTIONS.forEach((sec) => {
  const items: SubrailItem[] = sec.items.map((it: FashionSectionItem) => ({
    id: it.id,
    name: it.name,
    image: it.image,
  }));
  sec.items.forEach((it: FashionSectionItem) => {
    SECTION_SUBCATEGORY_MAP[it.id] = items;
  });
});

// Specific fruit subrail from the screenshot for "fresh-fruits" deep dive
export const FRUITS_SUBRAIL: SubrailItem[] = [
  { id: "fresh-fruits", name: "Fresh Fruits", image: "/products/fruits/fruit-fresh.png" },
  { id: "premium-fruits", name: "Premium Fruits", image: "/products/fruits/fruit-premium.png" },
  { id: "papaya", name: "Papaya", image: "/products/fruits/fruit-papaya.png" },
  { id: "citrus-fruits", name: "Citrus Fruits", image: "/products/fruits/fruit-citrus.png" },
  { id: "apples", name: "Apples", image: "/products/fruits/fruit-apples.png" },
  { id: "others", name: "Others", image: "/products/fruits/fruit-others.png" },
];

const FRUIT_IDS = new Set(FRUITS_SUBRAIL.map((f) => f.id));

export function getSubrailForSubcategory(subcategoryId: string | null): SubrailItem[] {
  if (!subcategoryId) return [];

  // If inside the fresh fruits subcategory cluster
  if (FRUIT_IDS.has(subcategoryId)) {
    return FRUITS_SUBRAIL;
  }

  // Return the items of the section that contains this clicked card
  return SECTION_SUBCATEGORY_MAP[subcategoryId] || [];
}

