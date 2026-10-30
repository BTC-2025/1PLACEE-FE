export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  href: string;
}

export interface InteractiveCategoryRow {
  id: string;
  title: string;
  viewAllHref: string;
  items: CategoryItem[];
}

export const INTERACTIVE_CATEGORY_ROWS: InteractiveCategoryRow[] = [
  {
    id: "mens-fashion",
    title: "Men's fashion",
    viewAllHref: "/categories?cat=mens-fashion",
    items: [
      { id: "mf-1", name: "T-Shirts & Polos", image: "/categories/items/mf-1.png", href: "/categories?cat=mens-tshirts" },
      { id: "mf-2", name: "Pants", image: "/categories/items/mf-2.png", href: "/categories?cat=mens-pants" },
      { id: "mf-3", name: "Luggage", image: "/categories/items/mf-3.png", href: "/categories?cat=luggage" },
      { id: "mf-4", name: "Sportswear", image: "/categories/items/mf-4.png", href: "/categories?cat=mens-sportswear" },
      { id: "mf-5", name: "Footwear", image: "/categories/items/mf-5.png", href: "/categories?cat=mens-footwear" },
      { id: "mf-6", name: "Accessories", image: "/categories/items/mf-6.png", href: "/categories?cat=mens-accessories" },
      { id: "mf-7", name: "Jackets", image: "/categories/items/mf-7.png", href: "/categories?cat=mens-jackets" },
    ],
  },
  {
    id: "womens-fashion",
    title: "Women's fashion",
    viewAllHref: "/categories?cat=womens-fashion",
    items: [
      { id: "wf-1", name: "Tops", image: "/categories/items/wf-1.png", href: "/categories?cat=womens-tops" },
      { id: "wf-2", name: "Dresses", image: "/categories/items/wf-2.png", href: "/categories?cat=womens-dresses" },
      { id: "wf-3", name: "Sportswear", image: "/categories/items/wf-3.png", href: "/categories?cat=womens-sportswear" },
      { id: "wf-4", name: "Pants", image: "/categories/items/wf-4.png", href: "/categories?cat=womens-pants" },
      { id: "wf-5", name: "Sandals", image: "/categories/items/wf-5.png", href: "/categories?cat=womens-sandals" },
      { id: "wf-6", name: "Footwear", image: "/categories/items/wf-6.png", href: "/categories?cat=womens-footwear" },
      { id: "wf-7", name: "Handbags", image: "/categories/items/wf-7.png", href: "/categories?cat=womens-handbags" },
    ],
  },
  {
    id: "beauty",
    title: "Beauty",
    viewAllHref: "/categories?cat=beauty",
    items: [
      { id: "beauty-1", name: "Makeup", image: "/categories/items/beauty-1.png", href: "/categories?cat=makeup" },
      { id: "beauty-2", name: "Skincare", image: "/categories/items/beauty-2.png", href: "/categories?cat=skincare" },
      { id: "beauty-3", name: "Hairstyling Tools", image: "/categories/items/beauty-3.png", href: "/categories?cat=hairstyling-tools" },
      { id: "beauty-4", name: "Hair Care", image: "/categories/items/beauty-4.png", href: "/categories?cat=hair-care" },
      { id: "beauty-5", name: "Electronic Beauty Tools", image: "/categories/items/beauty-5.png", href: "/categories?cat=electronic-beauty-tools" },
      { id: "beauty-6", name: "Men's Care", image: "/categories/items/beauty-6.png", href: "/categories?cat=mens-care" },
      { id: "beauty-7", name: "Bath & Body Essentials", image: "/categories/items/beauty-7.png", href: "/categories?cat=bath-body" },
    ],
  },
  {
    id: "health-nutrition",
    title: "Health & nutrition",
    viewAllHref: "/categories?cat=health-nutrition",
    items: [
      { id: "hn-1", name: "Weighing Scales", image: "/categories/items/hn-1.png", href: "/categories?cat=weighing-scales" },
      { id: "hn-2", name: "Massage & Relaxation", image: "/categories/items/hn-2.png", href: "/categories?cat=massage-relaxation" },
      { id: "hn-3", name: "Family Planning", image: "/categories/items/hn-3.png", href: "/categories?cat=family-planning" },
      { id: "hn-4", name: "Vitamins & Nutrition", image: "/categories/items/hn-4.png", href: "/categories?cat=vitamins-nutrition" },
      { id: "hn-5", name: "Health Monitors", image: "/categories/items/hn-5.png", href: "/categories?cat=health-monitors" },
      { id: "hn-6", name: "Mobility Aids", image: "/categories/items/hn-6.png", href: "/categories?cat=mobility-aids" },
      { id: "hn-7", name: "Braces & Splints", image: "/categories/items/hn-7.png", href: "/categories?cat=braces-splints" },
    ],
  },
  {
    id: "grocery",
    title: "Grocery",
    viewAllHref: "/categories?cat=grocery",
    items: [
      { id: "grocery-1", name: "Beverages", image: "/categories/items/grocery-1.png", href: "/categories?cat=beverages" },
      { id: "grocery-2", name: "Laundry & Dishwashing", image: "/categories/items/grocery-2.png", href: "/categories?cat=laundry-dishwashing" },
      { id: "grocery-3", name: "Pet Supplies", image: "/categories/items/grocery-3.png", href: "/categories?cat=pet-supplies" },
      { id: "grocery-4", name: "Cooking Oils & Vinegars", image: "/categories/items/grocery-4.png", href: "/categories?cat=cooking-oils" },
      { id: "grocery-5", name: "Rice, Pasta & Canned Food", image: "/categories/items/grocery-5.png", href: "/categories?cat=rice-pasta" },
      { id: "grocery-6", name: "Cleaning Supplies", image: "/categories/items/grocery-6.png", href: "/categories?cat=cleaning-supplies" },
      { id: "grocery-7", name: "Snacks & Sweets", image: "/categories/items/grocery-7.png", href: "/categories?cat=snacks-sweets" },
    ],
  },
  {
    id: "stationery-office",
    title: "Stationery & office supplies",
    viewAllHref: "/categories?cat=stationery-office",
    items: [
      { id: "st-1", name: "Calculators", image: "/categories/items/stationery-1.png", href: "/categories?cat=calculators" },
      { id: "st-2", name: "Writing Supplies", image: "/categories/items/stationery-2.png", href: "/categories?cat=writing-supplies" },
      { id: "st-3", name: "Notebooks", image: "/categories/items/stationery-3.png", href: "/categories?cat=notebooks" },
      { id: "st-4", name: "Desk Accessories", image: "/categories/items/stationery-4.png", href: "/categories?cat=desk-accessories" },
      { id: "st-5", name: "Presentation Boards", image: "/categories/items/stationery-5.png", href: "/categories?cat=presentation-boards" },
      { id: "st-6", name: "Tapes & Fasteners", image: "/categories/items/stationery-6.png", href: "/categories?cat=tapes-fasteners" },
      { id: "st-7", name: "Labels, Indexes & Stamps", image: "/categories/items/stationery-7.png", href: "/categories?cat=labels-stamps" },
    ],
  },
  {
    id: "books-media",
    title: "Books & media",
    viewAllHref: "/categories?cat=books-media",
    items: [
      { id: "bm-1", name: "Self-help books", image: "/categories/items/books-1.png", href: "/categories?cat=self-help-books" },
      { id: "bm-2", name: "Children's books", image: "/categories/items/books-2.png", href: "/categories?cat=childrens-books" },
      { id: "bm-3", name: "Fiction", image: "/categories/items/books-3.png", href: "/categories?cat=fiction-books" },
      { id: "bm-4", name: "Academic books", image: "/categories/items/books-4.png", href: "/categories?cat=academic-books" },
      { id: "bm-5", name: "E-readers", image: "/categories/items/books-5.png", href: "/categories?cat=e-readers" },
      { id: "bm-6", name: "Studio & recording", image: "/categories/items/books-6.png", href: "/categories?cat=studio-recording" },
      { id: "bm-7", name: "Guitars", image: "/categories/items/books-7.png", href: "/categories?cat=guitars" },
    ],
  },
];
