export interface CategorySubItem {
  id: string;
  name: string;
  icon?: string;
  image?: string;
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
    id: "instant-food",
    name: "Instant Food",
    icon: "🍜",
    subcategories: [
      {
        id: "instant-noodles",
        name: "Instant Noodles",
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "hakka-cup-noodles",
        name: "Hakka & Cup Noodles",
        image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "pasta-vermicelli",
        name: "Pasta & Vermicelli",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "instant-soups",
        name: "Instant Soups",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "ready-to-eat",
        name: "Ready to Eat Meals",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "dessert-mixes",
        name: "Dessert & Cake Mixes",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "breakfast-cereals",
        name: "Breakfast Cereals & Oats",
        image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "sauces-spreads",
        name: "Sauces & Mayo",
        image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "papad-fryums",
        name: "Papad & Fryums",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "vegetables-fruits",
    name: "Vegetables & Fruits",
    icon: "🥕",
    subcategories: [
      {
        id: "fresh-vegetables",
        name: "Fresh Vegetables",
        image: "https://images.unsplash.com/photo-1546470427-e26264be0b11?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "fresh-fruits",
        name: "Fresh Fruits",
        image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "exotics",
        name: "Exotics & Mushrooms",
        image: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "coriander-mint",
        name: "Herbs & Seasonings",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "cut-sprouts",
        name: "Fresh Cut & Sprouts",
        image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "organic-veg",
        name: "Certified Organic",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "dairy-breakfast",
    name: "Dairy & Breakfast",
    icon: "🥛",
    subcategories: [
      {
        id: "milk",
        name: "Milk",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "bread-pav",
        name: "Bread & Pav",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "eggs",
        name: "Eggs",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "paneer-tofu",
        name: "Paneer & Tofu",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "butter-cheese",
        name: "Butter & Cheese",
        image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "curd-yogurt",
        name: "Curd & Yogurt",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "munchies",
    name: "Munchies & Snacks",
    icon: "🍟",
    subcategories: [
      {
        id: "chips-crisps",
        name: "Chips & Crisps",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "nachos-dips",
        name: "Nachos & Dips",
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "bhujia-namkeen",
        name: "Bhujia & Namkeen",
        image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "popcorn",
        name: "Popcorn & Puffs",
        image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "roasted-makhana",
        name: "Makhana & Dry Snacks",
        image: "https://images.unsplash.com/photo-1606851094655-b2593a9af63f?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "cold-drinks-juices",
    name: "Cold Drinks & Juices",
    icon: "🥤",
    subcategories: [
      {
        id: "soft-drinks",
        name: "Soft Drinks",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "fruit-juices",
        name: "Fruit Juices",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "energy-drinks",
        name: "Energy Drinks",
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "soda-mixers",
        name: "Soda & Syrups",
        image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "bakery-biscuits",
    name: "Bakery & Biscuits",
    icon: "🍪",
    subcategories: [
      {
        id: "cookies-biscuits",
        name: "Cookies & Biscuits",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "rusk-khari",
        name: "Rusk & Khari",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "cakes-muffins",
        name: "Cakes & Muffins",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "tea-coffee",
    name: "Tea, Coffee & More",
    icon: "☕",
    subcategories: [
      {
        id: "tea-leaves",
        name: "Tea & Chai Masala",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "instant-coffee",
        name: "Instant Coffee",
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "atta-rice-dal",
    name: "Atta, Rice & Dal",
    icon: "🌾",
    subcategories: [
      {
        id: "atta-flours",
        name: "Atta & Flours",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "basmati-rice",
        name: "Basmati Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "cleaning-essentials",
    name: "Cleaning & Household",
    icon: "🧹",
    subcategories: [
      {
        id: "detergents",
        name: "Detergents",
        image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "dishwash",
        name: "Dishwash",
        image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "personal-care",
    name: "Personal Care",
    icon: "🧴",
    subcategories: [
      {
        id: "soaps-bodywash",
        name: "Soaps & Body Wash",
        image: "https://images.unsplash.com/photo-1608248597359-52b885b51b32?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "shampoo-hair",
        name: "Shampoo & Hair Care",
        image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
];

export const CATEGORY_PRODUCTS_DATABASE: Record<string, CategoryProduct[]> = {
  // 1. Instant Noodles (matching second screenshot exactly with real packaging images)
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
    {
      id: "top-ramen-curry-veg-280g",
      name: "Top Ramen Curry Veg Instant Flat Noodles",
      weight: "280 g (Pack of 4)",
      price: 80,
      originalPrice: 90,
      discountBadge: "11% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "maggi-oats-noodles-290g",
      name: "Maggi Nutri-licious Delicious Oats Noodles",
      weight: "290 g",
      price: 110,
      originalPrice: 125,
      discountBadge: "12% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "instant-noodles",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=350&q=80",
    },
  ],

  // 2. Hakka & Cup Noodles
  "hakka-cup-noodles": [
    {
      id: "chings-hakka-noodles-600g",
      name: "Ching's Secret Veg Hakka Noodles Pouch",
      weight: "600 g",
      price: 85,
      originalPrice: 95,
      discountBadge: "10% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "hakka-cup-noodles",
      image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "nissin-gekikara-ramen-80g",
      name: "Nissin Gekikara Hot & Spicy Seafood Cup",
      weight: "80 g",
      price: 65,
      originalPrice: 75,
      discountBadge: "13% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "hakka-cup-noodles",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=350&q=80",
    },
  ],

  // 3. Fresh Vegetables
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

  // 4. Fresh Fruits
  "fresh-fruits": [
    {
      id: "banana-robusta-1kg",
      name: "Fresh Robusta Banana (Vazhaipazham)",
      weight: "1 kg (approx 6-8 pcs)",
      price: 45,
      originalPrice: 55,
      discountBadge: "18% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "fresh-fruits",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "apple-shimla-4pcs",
      name: "Sweet Shimla Royal Delicious Apples",
      weight: "4 pcs (500g - 600g)",
      price: 130,
      originalPrice: 160,
      discountBadge: "18% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "fresh-fruits",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "pomegranate-kandhari-2pcs",
      name: "Kandhari Pomegranate (Madulai)",
      weight: "2 pcs (approx 450g)",
      price: 145,
      originalPrice: 170,
      discountBadge: "14% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "fresh-fruits",
      image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=350&q=80",
    },
  ],

  // 5. Milk
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

  // 6. Chips & Crisps
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
