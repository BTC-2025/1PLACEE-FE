export interface GrocerySectionItem {
  id: string;
  name: string;
  image: string;
}

export interface GrocerySection {
  id: string;
  title: string;
  items: GrocerySectionItem[];
}

export const GROCERY_SECTIONS: GrocerySection[] = [
  {
    id: "fresh",
    title: "Fresh",
    items: [
      {
        id: "fresh-fruits",
        name: "Fresh Fruits",
        image: "/categories/app-items/fresh-fruits-cutout.png",
      },
    ],
  },
  {
    id: "biscuits-drinks-packaged-foods",
    title: "Biscuits, Drinks & Packaged Foods",
    items: [
      {
        id: "chips-namkeens",
        name: "Chips & Namkeens",
        image: "/categories/app-items/chips-namkeens-clean.png",
      },
      {
        id: "biscuits-cookies",
        name: "Biscuits & Cookies",
        image: "/categories/app-items/biscuits-cookies-clean.png",
      },
      {
        id: "chocolates-candies",
        name: "Chocolates & Candies",
        image: "/categories/app-items/chocolates-candies-clean.png",
      },
      {
        id: "indian-sweets",
        name: "Indian Sweets",
        image: "/categories/app-items/indian-sweets-clean.png",
      },
      {
        id: "drinks-juices",
        name: "Drinks & Juices",
        image: "/categories/app-items/drinks-juices-clean.png",
      },
      {
        id: "breakfast-cereals",
        name: "Breakfast Cereals",
        image: "/categories/app-items/breakfast-cereals-clean.png",
      },
      {
        id: "noodles-pasta",
        name: "Noodles, Pasta & Vermicelli",
        image: "/categories/app-items/noodles-pasta.png",
      },
      {
        id: "ready-to-cook",
        name: "Ready To Cook & Eat",
        image: "/categories/app-items/ready-to-cook.png",
      },
      {
        id: "spread-sauces",
        name: "Spread, Sauces & Ketchup",
        image: "/categories/app-items/spread-sauces.png",
      },
      {
        id: "pickles-chutney",
        name: "Pickles, Chutney & Flavouring",
        image: "/categories/app-items/pickles-chutney.png",
      },
      {
        id: "tea-coffee",
        name: "Tea & Coffee",
        image: "/categories/app-items/tea-coffee.png",
      },
    ],
  },
  {
    id: "cooking-essentials",
    title: "Cooking Essentials",
    items: [
      {
        id: "atta-flours-sooji",
        name: "Atta, Flours & Sooji",
        image: "/categories/app-items/atta-flours-sooji.png",
      },
      {
        id: "dals-pulses",
        name: "Dals & Pulses",
        image: "/categories/app-items/dals-pulses.png",
      },
      {
        id: "rice-sabudana-poha",
        name: "Rice, Sabudana, Poha & Murmura",
        image: "/categories/app-items/rice-sabudana-poha.png",
      },
      {
        id: "edible-oils",
        name: "Edible Oils",
        image: "/categories/app-items/edible-oils.png",
      },
      {
        id: "masala-spices",
        name: "Masala, Spices & Mukhwas",
        image: "/categories/app-items/masala-spices.png",
      },
      {
        id: "salt-sugar-jaggery",
        name: "Salt, Sugar & Jaggery",
        image: "/categories/app-items/salt-sugar-jaggery.png",
      },
      {
        id: "wheat-soya",
        name: "Wheat & Soya",
        image: "/categories/app-items/wheat-soya.png",
      },
      {
        id: "ghee",
        name: "Ghee",
        image: "/categories/app-items/ghee.png",
      },
      {
        id: "dry-fruits-nuts",
        name: "Dry Fruits & Nuts",
        image: "/categories/app-items/dry-fruits-nuts.png",
      },
      {
        id: "millets-organic",
        name: "Millets & Organic",
        image: "/categories/app-items/millets-organic.png",
      },
      {
        id: "combo-offers",
        name: "Combo Offers",
        image: "/categories/app-items/combo-offers.png",
      },
    ],
  },
  {
    id: "personal-care",
    title: "Personal Care",
    items: [
      {
        id: "hair-care",
        name: "Hair Care",
        image: "/categories/app-items/hair-care.png",
      },
      {
        id: "bath-hand-wash",
        name: "Bath & Hand Wash",
        image: "/categories/app-items/bath-hand-wash.png",
      },
      {
        id: "oral-care",
        name: "Oral Care",
        image: "/categories/app-items/oral-care.png",
      },
      {
        id: "skin-care",
        name: "Skin Care",
        image: "/categories/app-items/skin-care.png",
      },
      {
        id: "feminine-hygiene",
        name: "Feminine Hygiene",
        image: "/categories/app-items/feminine-hygiene.png",
      },
      {
        id: "mens-grooming",
        name: "Men's Grooming",
        image: "/categories/app-items/mens-grooming.png",
      },
      {
        id: "deo-fragrances",
        name: "Deo & Fragrances",
        image: "/categories/app-items/deo-fragrances.png",
      },
      {
        id: "health-wellness",
        name: "Health & Wellness",
        image: "/categories/app-items/health-wellness.png",
      },
      {
        id: "body-wash-accessories",
        name: "Body Wash & Bathing Accessories",
        image: "/categories/app-items/body-wash-accessories.png",
      },
      {
        id: "personal-care-tools",
        name: "Personal Care Tools",
        image: "/categories/app-items/personal-care-tools.png",
      },
      {
        id: "pc-others",
        name: "Others",
        image: "/categories/app-items/pc-others.png",
      },
    ],
  },
  {
    id: "beauty",
    title: "Beauty",
    items: [
      {
        id: "beauty-face",
        name: "Face",
        image: "/categories/app-items/beauty-face.png",
      },
      {
        id: "nails-lips",
        name: "Nails & Lips",
        image: "/categories/app-items/nails-lips.png",
      },
      {
        id: "eyes",
        name: "Eyes",
        image: "/categories/app-items/eyes.png",
      },
      {
        id: "beauty-accessories",
        name: "Beauty Accessories",
        image: "/categories/app-items/beauty-accessories.png",
      },
      {
        id: "beauty-skin-care",
        name: "Skin Care",
        image: "/categories/app-items/beauty-skin-care.png",
      },
      {
        id: "beauty-mens-grooming",
        name: "Men's Grooming",
        image: "/categories/app-items/beauty-mens-grooming.png",
      },
      {
        id: "beauty-personal-care",
        name: "Personal Care",
        image: "/categories/app-items/beauty-personal-care.png",
      },
    ],
  },
  {
    id: "mom-baby-care",
    title: "Mom & Baby Care",
    items: [
      {
        id: "diapers-wipes",
        name: "Diapers & Wipes",
        image: "/categories/app-items/diapers-wipes.png",
      },
      {
        id: "baby-bath-hygiene",
        name: "Bath, Hygiene & Grooming",
        image: "/categories/app-items/baby-bath-hygiene.png",
      },
      {
        id: "baby-food-feeding",
        name: "Food & Feeding",
        image: "/categories/app-items/baby-food-feeding.png",
      },
      {
        id: "baby-bedding-toys",
        name: "Bedding, Toys & Accessories",
        image: "/categories/app-items/baby-bedding-toys.png",
      },
    ],
  },
  {
    id: "home",
    title: "Home",
    items: [
      {
        id: "dishwash",
        name: "Dishwash",
        image: "/categories/app-items/dishwash.png",
      },
      {
        id: "detergents-cleaners",
        name: "Detergents & Cleaners",
        image: "/categories/app-items/detergents-cleaners.png",
      },
      {
        id: "fresheners-repellents",
        name: "Fresheners & Repellents",
        image: "/categories/app-items/fresheners-repellents.png",
      },
      {
        id: "home-cleaning-tools",
        name: "Home & Cleaning Tools",
        image: "/categories/app-items/home-cleaning-tools.png",
      },
      {
        id: "pooja-needs",
        name: "Pooja Needs",
        image: "/categories/app-items/pooja-needs.png",
      },
      {
        id: "basic-electricals",
        name: "Basic Electricals",
        image: "/categories/app-items/basic-electricals.png",
      },
      {
        id: "furnishing-personal-wear",
        name: "Furnishing & Personal Wear",
        image: "/categories/app-items/furnishing-personal-wear.png",
      },
      {
        id: "bags-travel-luggage",
        name: "Bags & Travel Luggage",
        image: "/categories/app-items/bags-travel-luggage.png",
      },
      {
        id: "home-furniture",
        name: "Furniture",
        image: "/categories/app-items/home-furniture.png",
      },
      {
        id: "decor-gifting",
        name: "Decor & Gifting",
        image: "/categories/app-items/decor-gifting.png",
      },
      {
        id: "games-toys-activities",
        name: "Games, Toys & Activities",
        image: "/categories/app-items/games-toys-activities.png",
      },
      {
        id: "bathroom-laundry",
        name: "Bathroom & Laundry",
        image: "/categories/app-items/bathroom-laundry.png",
      },
    ],
  },
  {
    id: "kitchenware",
    title: "Kitchenware",
    items: [
      {
        id: "pots-pans",
        name: "Pots & Pans",
        image: "/categories/app-items/pots-pans.png",
      },
      {
        id: "containers-storage",
        name: "Containers & Storage",
        image: "/categories/app-items/containers-storage.png",
      },
      {
        id: "flask-bottle-tiffin",
        name: "Flask, Bottle & Tiffin Boxes",
        image: "/categories/app-items/flask-bottle-tiffin.png",
      },
      {
        id: "cutting-chopping",
        name: "Cutting & Chopping",
        image: "/categories/app-items/cutting-chopping.png",
      },
      {
        id: "kitchen-tools",
        name: "Kitchen Tools",
        image: "/categories/app-items/kitchen-tools.png",
      },
    ],
  },
  {
    id: "tableware",
    title: "Tableware",
    items: [
      {
        id: "dining",
        name: "Dining",
        image: "/categories/app-items/dining.png",
      },
      {
        id: "cups-mugs",
        name: "Cups, Mugs & more",
        image: "/categories/app-items/cups-mugs.png",
      },
      {
        id: "cutlery",
        name: "Cutlery",
        image: "/categories/app-items/cutlery.png",
      },
      {
        id: "glassware-drinkware",
        name: "Glassware & Drinkware",
        image: "/categories/app-items/glassware-drinkware.png",
      },
      {
        id: "table-accessories",
        name: "Table Accessories",
        image: "/categories/app-items/table-accessories.png",
      },
      {
        id: "serveware",
        name: "Serveware",
        image: "/categories/app-items/serveware.png",
      },
    ],
  },
];

