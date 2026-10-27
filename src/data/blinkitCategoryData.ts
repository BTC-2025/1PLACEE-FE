export interface CategorySubItem {
  id: string;
  name: string;
  icon?: string;
}

export interface CategoryGroup {
  id: string;
  name: string;
  icon: string;
  subcategories: CategorySubItem[];
}

export interface CategoryProduct {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  discountBadge?: string;
  deliveryTime: string;
  image: string;
  subcategoryId: string;
}

export const BLINKIT_CATEGORIES: CategoryGroup[] = [
  {
    id: "vegetables-fruits",
    name: "Vegetables & Fruits",
    icon: "🥕",
    subcategories: [
      { id: "fresh-vegetables", name: "Fresh Vegetables" },
      { id: "fresh-fruits", name: "Fresh Fruits" },
      { id: "exotics", name: "Exotics" },
      { id: "coriander-mint", name: "Coriander & Herbs" },
      { id: "cut-sprouts", name: "Freshly Cut & Sprouts" },
      { id: "organic-veg", name: "Organic Vegetables" },
    ],
  },
  {
    id: "dairy-breakfast",
    name: "Dairy & Breakfast",
    icon: "🥛",
    subcategories: [
      { id: "milk", name: "Milk" },
      { id: "bread-pav", name: "Bread & Pav" },
      { id: "eggs", name: "Eggs" },
      { id: "paneer-tofu", name: "Paneer & Tofu" },
      { id: "butter-cheese", name: "Butter & More" },
      { id: "curd-yogurt", name: "Curd & Yogurt" },
    ],
  },
  {
    id: "instant-food",
    name: "Instant Food",
    icon: "🍜",
    subcategories: [
      { id: "instant-noodles", name: "Instant Noodles" },
      { id: "hakka-noodles", name: "Hakka & Cup Noodles" },
      { id: "pasta", name: "Pasta & Vermicelli" },
      { id: "instant-soups", name: "Instant Soups" },
      { id: "ready-to-eat", name: "Ready to Eat Meals" },
      { id: "dessert-mixes", name: "Dessert & Cake Mixes" },
    ],
  },
  {
    id: "munchies",
    name: "Munchies",
    icon: "🍟",
    subcategories: [
      { id: "chips-crisps", name: "Chips & Crisps" },
      { id: "nachos", name: "Nachos & Dips" },
      { id: "bhujia-namkeen", name: "Bhujia & Mixtures" },
      { id: "popcorn", name: "Popcorn" },
      { id: "roasted-makhana", name: "Roasted Makhana & Snacks" },
    ],
  },
  {
    id: "cold-drinks-juices",
    name: "Cold Drinks & Juices",
    icon: "🥤",
    subcategories: [
      { id: "soft-drinks", name: "Soft Drinks" },
      { id: "fruit-juices", name: "Fruit Juices" },
      { id: "energy-drinks", name: "Energy & Sports Drinks" },
      { id: "soda-mixers", name: "Soda & Cocktail Mixers" },
      { id: "coconut-water", name: "Coconut Water & Ice" },
    ],
  },
  {
    id: "bakery-biscuits",
    name: "Bakery & Biscuits",
    icon: "🍪",
    subcategories: [
      { id: "cookies-biscuits", name: "Cookies & Biscuits" },
      { id: "rusk-khari", name: "Rusk & Khari" },
      { id: "cakes-muffins", name: "Cakes & Muffins" },
      { id: "buns-pizza-base", name: "Buns & Pizza Base" },
    ],
  },
  {
    id: "tea-coffee",
    name: "Tea, Coffee & More",
    icon: "☕",
    subcategories: [
      { id: "tea-leaves", name: "Tea & Chai Masala" },
      { id: "green-tea", name: "Green & Herbal Tea" },
      { id: "instant-coffee", name: "Instant Coffee" },
      { id: "health-drinks", name: "Health & Nutrition Drinks" },
    ],
  },
  {
    id: "atta-rice-dal",
    name: "Atta, Rice & Dal",
    icon: "🌾",
    subcategories: [
      { id: "atta-flours", name: "Atta & Other Flours" },
      { id: "basmati-rice", name: "Rice & Rice Products" },
      { id: "pulses-dals", name: "Dals & Pulses" },
      { id: "grains-poha", name: "Poha, Daliya & Millets" },
    ],
  },
  {
    id: "masala-oil",
    name: "Masala, Oil & More",
    icon: "🫒",
    subcategories: [
      { id: "cooking-oil", name: "Refined & Mustard Oil" },
      { id: "ghee-vanaspati", name: "Pure Desi Ghee" },
      { id: "whole-spices", name: "Whole & Ground Spices" },
      { id: "salt-sugar-jaggery", name: "Salt, Sugar & Jaggery" },
    ],
  },
  {
    id: "sweet-tooth",
    name: "Sweet Tooth",
    icon: "🍫",
    subcategories: [
      { id: "chocolates", name: "Chocolates" },
      { id: "indian-sweets", name: "Mithai & Traditional Sweets" },
      { id: "ice-creams", name: "Ice Creams & Kulfi" },
      { id: "dessert-toppings", name: "Syrups & Toppings" },
    ],
  },
  {
    id: "cleaning-essentials",
    name: "Cleaning Essentials",
    icon: "🧹",
    subcategories: [
      { id: "detergent-powder", name: "Detergent Powders & Liquids" },
      { id: "dishwash", name: "Dishwashing Liquids & Bars" },
      { id: "floor-cleaners", name: "Floor & Surface Cleaners" },
      { id: "toilet-cleaners", name: "Toilet Cleaners & Fresheners" },
    ],
  },
  {
    id: "personal-care",
    name: "Personal Care",
    icon: "🧴",
    subcategories: [
      { id: "bath-soaps", name: "Soaps & Body Wash" },
      { id: "hair-care", name: "Shampoo & Hair Oils" },
      { id: "oral-care", name: "Toothpaste & Toothbrushes" },
      { id: "skin-face", name: "Face Wash & Moisturisers" },
    ],
  },
  {
    id: "baby-care",
    name: "Baby Care",
    icon: "👶",
    subcategories: [
      { id: "diapers-wipes", name: "Diapers & Baby Wipes" },
      { id: "baby-food", name: "Baby Food & Formula" },
      { id: "baby-skincare", name: "Baby Soaps & Shampoos" },
    ],
  },
  {
    id: "pet-care",
    name: "Pet Care",
    icon: "🐾",
    subcategories: [
      { id: "dog-food", name: "Dog Food & Treats" },
      { id: "cat-food", name: "Cat Food & Litter" },
      { id: "pet-grooming", name: "Pet Accessories & Shampoo" },
    ],
  },
];

export const CATEGORY_PRODUCTS_DATABASE: Record<string, CategoryProduct[]> = {
  // 1. Instant Noodles (Matching second image exactly)
  "instant-noodles": [
    {
      id: "maggi-2min-noodles-70g",
      name: "Maggi 2-Minute Masala Instant Noodles",
      weight: "70 g",
      price: 14,
      originalPrice: 14,
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "yippee-magic-masala-240g",
      name: "Sunfeast YiPPee! Magic Masala Noodles",
      weight: "240 g (Pack of 4)",
      price: 52,
      originalPrice: 60,
      discountBadge: "13% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "maggi-special-masala-73g",
      name: "Maggi Special Masala Instant Noodles",
      weight: "73 g",
      price: 20,
      originalPrice: 20,
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "wai-wai-chicken-70g",
      name: "Wai Wai 1-2-3 Veg Ready to Eat Noodles",
      weight: "70 g",
      price: 15,
      originalPrice: 15,
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "maggi-cuppa-masala-70g",
      name: "Maggi Cuppa Masala Instant Noodles",
      weight: "70 g",
      price: 50,
      originalPrice: 55,
      discountBadge: "9% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "samyang-buldak-spicy-140g",
      name: "Samyang Buldak 2x Spicy Hot Chicken Ramen",
      weight: "140 g",
      price: 139,
      originalPrice: 150,
      discountBadge: "7% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1623341214825-9f4f963727da?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "nongshim-shin-ramyun-120g",
      name: "Nongshim Shin Ramyun Spicy Gourmet Noodles",
      weight: "120 g",
      price: 110,
      originalPrice: 125,
      discountBadge: "12% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "maggi-atta-noodles-290g",
      name: "Maggi Nutri-licious Masala Veg Atta Noodles",
      weight: "290 g (Pack of 4)",
      price: 105,
      originalPrice: 120,
      discountBadge: "12% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "chings-secret-schezwan-60g",
      name: "Ching's Secret Schezwan Instant Noodles",
      weight: "60 g",
      price: 15,
      originalPrice: 15,
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "nissin-cup-noodles-spicy-70g",
      name: "Nissin Cup Noodles Spicy Masala",
      weight: "70 g",
      price: 45,
      originalPrice: 50,
      discountBadge: "10% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=350&q=80",
    },
  ],

  // 2. Fresh Vegetables
  "fresh-vegetables": [
    {
      id: "onion-1kg",
      name: "Hybrid Fresh Onion (Vengayam)",
      weight: "1 kg",
      price: 38,
      originalPrice: 48,
      discountBadge: "20% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "fresh-vegetables",
      image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "potato-1kg",
      name: "Fresh Jyoti Potato (Urulaikilangu)",
      weight: "1 kg",
      price: 32,
      originalPrice: 40,
      discountBadge: "20% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "fresh-vegetables",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "tomato-local-1kg",
      name: "Farm Fresh Country Tomato (Thakkali)",
      weight: "1 kg",
      price: 28,
      originalPrice: 35,
      discountBadge: "20% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "fresh-vegetables",
      image: "https://images.unsplash.com/photo-1546470427-e26264be0b11?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "cauliflower-1pc",
      name: "Fresh Farm Cauliflower",
      weight: "1 pc (400g - 600g)",
      price: 35,
      originalPrice: 45,
      discountBadge: "22% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "fresh-vegetables",
      image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=350&q=80",
    },
  ],

  // 3. Milk
  "milk": [
    {
      id: "amul-taaza-milk-500ml",
      name: "Amul Taaza Homogenised Toned Milk",
      weight: "500 ml",
      price: 27,
      originalPrice: 27,
      deliveryTime: "8 MINS",
      subcategoryId: "milk",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "amul-gold-milk-1000ml",
      name: "Amul Gold Full Cream Fresh Milk",
      weight: "1 L",
      price: 66,
      originalPrice: 68,
      discountBadge: "3% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "milk",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "nandini-toned-milk-500ml",
      name: "Nandini Pasteurized Toned Milk",
      weight: "500 ml",
      price: 24,
      originalPrice: 24,
      deliveryTime: "8 MINS",
      subcategoryId: "milk",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=350&q=80",
    },
  ],

  // 4. Chips & Crisps
  "chips-crisps": [
    {
      id: "lays-magic-masala-50g",
      name: "Lay's India's Magic Masala Potato Chips",
      weight: "50 g",
      price: 20,
      originalPrice: 20,
      deliveryTime: "8 MINS",
      subcategoryId: "chips-crisps",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "kurkure-masala-munch-82g",
      name: "Kurkure Masala Munch Crispy Snack",
      weight: "82 g",
      price: 20,
      originalPrice: 20,
      deliveryTime: "8 MINS",
      subcategoryId: "chips-crisps",
      image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "pringles-sour-cream-107g",
      name: "Pringles Sour Cream & Onion Potato Crisps",
      weight: "107 g",
      price: 115,
      originalPrice: 125,
      discountBadge: "8% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "chips-crisps",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=350&q=80",
    },
  ],
};
