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
    id: "groceries",
    name: "Groceries",
    icon: "🛒",
    subcategories: [
      {
        id: "fresh-fruits",
        name: "Fresh Fruits",
        image: "/categories/app-items/fresh-fruits-cutout.png",
      },
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
        id: "dairy-breakfast",
        name: "Dairy & Milk",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "atta-rice-dal",
        name: "Atta, Rice & Dal",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "👗",
    subcategories: [
      {
        id: "mens-tshirts",
        name: "Men's T-Shirts & Polos",
        image: "/categories/items/mf-1.png",
      },
      {
        id: "mens-pants",
        name: "Men's Pants & Trousers",
        image: "/categories/items/mf-2.png",
      },
      {
        id: "womens-tops",
        name: "Women's Tops & Kurtas",
        image: "/categories/items/wf-1.png",
      },
      {
        id: "womens-dresses",
        name: "Dresses & Jumpsuits",
        image: "/categories/items/wf-2.png",
      },
      {
        id: "footwear",
        name: "Casual & Sports Footwear",
        image: "/categories/items/mf-5.png",
      },
      {
        id: "handbags-luggage",
        name: "Handbags & Luggage",
        image: "/categories/items/wf-7.png",
      },
      {
        id: "fashion-accessories",
        name: "Watches & Accessories",
        image: "/categories/items/mf-6.png",
      },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: "📺",
    subcategories: [
      {
        id: "smartphones",
        name: "Smartphones & Tablets",
        image: "/banners/preowned-s22-ultra.png",
      },
      {
        id: "laptops-computers",
        name: "Laptops & Computers",
        image: "/banners/tile-laptop-1.png",
      },
      {
        id: "smartwatches",
        name: "Smartwatches & Wearables",
        image: "/banners/watch-casio-diver.png",
      },
      {
        id: "headphones-audio",
        name: "Headphones & Audio",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "gaming-consoles",
        name: "Gaming & Consoles",
        image: "/banners/banner-playstation-consoles.png",
      },
      {
        id: "cameras-accessories",
        name: "Cameras & Accessories",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "home-lifestyle",
    name: "Home & Lifestyle",
    icon: "🏠",
    subcategories: [
      {
        id: "cookware-dining",
        name: "Cookware & Dining",
        image: "/banners/cookware-oms-10piece.png",
      },
      {
        id: "kitchen-appliances",
        name: "Kitchen Appliances",
        image: "/banners/cookware-dutch-oven.jpg",
      },
      {
        id: "home-decor",
        name: "Home Decor & Lighting",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "bedding-linen",
        name: "Bedding & Bed Linen",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "cleaning-essentials",
        name: "Cleaning & Storage",
        image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "industrial-professional",
    name: "Industrial & Professional",
    icon: "🔨",
    subcategories: [
      {
        id: "power-tools",
        name: "Power Tools & Kits",
        image: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "hardware-fittings",
        name: "Hardware & Fasteners",
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "safety-equipment",
        name: "Safety Helmets & Vests",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "electrical-testing",
        name: "Electrical & Testing",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "scientific-lab",
        name: "Lab & Measurement",
        image: "/categories/items/stationery-1.png",
      },
    ],
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: "🛋️",
    subcategories: [
      {
        id: "living-room-sofas",
        name: "Sofas & Recliners",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "beds-mattresses",
        name: "Beds & Mattresses",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "study-office-furniture",
        name: "Office Chairs & Desks",
        image: "https://images.unsplash.com/photo-1580481077195-c328a37db729?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "dining-tables",
        name: "Dining Sets & Tables",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=120&q=80",
      },
      {
        id: "wardrobes-storage",
        name: "Wardrobes & Shoe Racks",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=120&q=80",
      },
    ],
  },
  {
    id: "beauty-personal-care",
    name: "Beauty & Personal Care",
    icon: "💄",
    subcategories: [
      {
        id: "skincare-lotions",
        name: "Skincare & Serums",
        image: "/categories/items/beauty-2.png",
      },
      {
        id: "haircare-shampoo",
        name: "Hair Care & Oils",
        image: "/categories/items/beauty-4.png",
      },
      {
        id: "luxury-perfumes",
        name: "Perfumes & Deos",
        image: "/banners/banner-perfumes-luxury.png",
      },
      {
        id: "makeup-cosmetics",
        name: "Makeup & Beauty Tools",
        image: "/categories/items/beauty-1.png",
      },
      {
        id: "mens-grooming",
        name: "Men's Grooming & Shaving",
        image: "/categories/items/beauty-6.png",
      },
    ],
  },
  {
    id: "stationery-books",
    name: "Stationery & Books",
    icon: "📚",
    subcategories: [
      {
        id: "notebooks-journals",
        name: "Notebooks & Diaries",
        image: "/categories/items/stationery-3.png",
      },
      {
        id: "pens-writing",
        name: "Pens & Writing Supplies",
        image: "/categories/items/stationery-2.png",
      },
      {
        id: "calculators-desk",
        name: "Calculators & Desk Gear",
        image: "/categories/items/stationery-1.png",
      },
      {
        id: "best-selling-books",
        name: "Bestselling Fiction & Non-Fiction",
        image: "/categories/items/books-3.png",
      },
      {
        id: "children-education",
        name: "Children Books & Learning",
        image: "/categories/items/books-2.png",
      },
    ],
  },
  {
    id: "baby-kids",
    name: "Baby & Kids",
    icon: "👶",
    subcategories: [
      {
        id: "strollers-prams",
        name: "Strollers & Prams",
        image: "/banners/babygear-neobreez-stroller.png",
      },
      {
        id: "car-seats",
        name: "Car Seats & Carriers",
        image: "/banners/babygear-baby-carseat.jpg",
      },
      {
        id: "diapers-wipes",
        name: "Diapers & Baby Wipes",
        image: "/banners/babygear-diaper-backpack.png",
      },
      {
        id: "baby-feeding",
        name: "High Chairs & Feeding",
        image: "/banners/babygear-high-chair.jpg",
      },
      {
        id: "toys-games",
        name: "Toys & Soft Play",
        image: "/banners/babygear-littleangel-walker.png",
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

  // 4. Fresh Fruits - Matches exact user uploaded screenshot items
  "fresh-fruits": [
    {
      id: "frizto-freeze-dried-mango-pack",
      name: "FRIZTO Freeze-Dried Mango | MANGO 25GM PACK OF 10 | 100% Natural Crispy Fruit...",
      weight: "200 g",
      price: 2390,
      originalPrice: 3490,
      discountBadge: "31% OFF",
      deliveryTime: "18 Mins",
      subcategoryId: "fresh-fruits",
      image: "/products/fruits/frizto-mango.jpg",
    },
    {
      id: "fresh-dragonfruit-per-pc",
      name: "Dragonfruit per pc (Approx 280 g - 450 g)",
      weight: "1 Pieces",
      price: 79,
      originalPrice: 120,
      discountBadge: "34% OFF",
      deliveryTime: "18 Mins",
      subcategoryId: "fresh-fruits",
      image: "/products/fruits/dragonfruit.jpg",
    },
    {
      id: "frizto-hamper-chocolate-gift",
      name: "FRIZTO Premium Freeze-Dried Chocolate Fruit Gift Hamper | CH KIWI 70GM +...",
      weight: "675 g",
      price: 4281,
      originalPrice: 5541,
      discountBadge: "23% OFF",
      deliveryTime: "18 Mins",
      subcategoryId: "fresh-fruits",
      image: "/products/fruits/frizto-hamper.jpg",
    },
    {
      id: "frizto-freeze-dried-pineapple",
      name: "FRIZTO Freeze-Dried Pineapple | PINAPPLE 25GM PACK OF 8 | 100% Natural...",
      weight: "200 g",
      price: 1912,
      originalPrice: 2792,
      discountBadge: "31% OFF",
      deliveryTime: "18 Mins",
      subcategoryId: "fresh-fruits",
      image: "/products/fruits/frizto-pineapple.jpg",
    },
    {
      id: "frizto-strawberry-chocolate-coated",
      name: "FRIZTO Freeze Dried Chocolate Coated Strawberry | CHO-STBRY 80GM...",
      weight: "80 g",
      price: 549,
      originalPrice: 749,
      discountBadge: "27% OFF",
      deliveryTime: "18 Mins",
      subcategoryId: "fresh-fruits",
      image: "/products/fruits/frizto-strawberry.jpg",
    },
    {
      id: "frizto-strawberry-can-delight",
      name: "FRIZTO Crispy Coated Strawberry Deluxe Can",
      weight: "100 g",
      price: 599,
      originalPrice: 799,
      discountBadge: "25% OFF",
      deliveryTime: "18 Mins",
      subcategoryId: "fresh-fruits",
      image: "/products/fruits/frizto-can-straw.jpg",
    },
    {
      id: "frizto-mango-pack-duo",
      name: "FRIZTO 100% Pure Freeze Dried Mango Chunks",
      weight: "150 g",
      price: 1450,
      originalPrice: 1890,
      discountBadge: "23% OFF",
      deliveryTime: "18 Mins",
      subcategoryId: "fresh-fruits",
      image: "/products/fruits/frizto-mango-pack.jpg",
    },
    {
      id: "frizto-assorted-snack-pouches",
      name: "FRIZTO Assorted Tropical Fruits Crunchy Multipack",
      weight: "4 x 50 g",
      price: 1850,
      originalPrice: 2200,
      discountBadge: "16% OFF",
      deliveryTime: "18 Mins",
      subcategoryId: "fresh-fruits",
      image: "/products/fruits/frizto-pouch-set.jpg",
    },
    {
      id: "frizto-dried-orange-crisps",
      name: "FRIZTO Sun-Dried Orange Slices Natural Treat",
      weight: "120 g",
      price: 699,
      originalPrice: 899,
      discountBadge: "22% OFF",
      deliveryTime: "18 Mins",
      subcategoryId: "fresh-fruits",
      image: "/products/fruits/frizto-dried-orange.jpg",
    },
    {
      id: "frizto-royal-festival-hamper",
      name: "FRIZTO Royal Celebration Fruit Hamper Basket",
      weight: "850 g",
      price: 4999,
      originalPrice: 6200,
      discountBadge: "19% OFF",
      deliveryTime: "18 Mins",
      subcategoryId: "fresh-fruits",
      image: "/products/fruits/frizto-hamper-2.jpg",
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

  // 7. Chips & Namkeens alias for image 1 subcategories
  "chips-namkeens": [
    {
      id: "haldirams-bhujia-sev-400g",
      name: "Haldiram's Nagpur Bhujia Sev",
      weight: "400 g",
      price: 115,
      originalPrice: 130,
      discountBadge: "12% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "chips-namkeens",
      image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "lays-spanish-tomato-50g",
      name: "Lay's Spanish Tomato Tango Chips",
      weight: "50 g",
      price: 20,
      originalPrice: 20,
      deliveryTime: "8 MINS",
      subcategoryId: "chips-namkeens",
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "bikaji-navratna-mixture-400g",
      name: "Bikaji Sub Kuch Navratna Mixture",
      weight: "400 g",
      price: 120,
      originalPrice: 135,
      discountBadge: "11% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "chips-namkeens",
      image: "https://images.unsplash.com/photo-1606851094655-b2593a9af63f?auto=format&fit=crop&w=350&q=80",
    },
  ],

  // 8. Biscuits & Cookies
  "biscuits-cookies": [
    {
      id: "parle-g-gold-1kg",
      name: "Parle-G Gold Glucose Biscuits",
      weight: "1 kg",
      price: 120,
      originalPrice: 130,
      discountBadge: "8% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "biscuits-cookies",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "dark-fantasy-choco-fills-300g",
      name: "Sunfeast Dark Fantasy Choco Fills",
      weight: "300 g",
      price: 99,
      originalPrice: 150,
      discountBadge: "34% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "biscuits-cookies",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=350&q=80",
    },
  ],

  // 9. Drinks & Juices
  "drinks-juices": [
    {
      id: "coca-cola-750ml",
      name: "Coca-Cola Original Taste Bottle",
      weight: "750 ml",
      price: 40,
      originalPrice: 40,
      deliveryTime: "8 MINS",
      subcategoryId: "drinks-juices",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "real-mixed-fruit-juice-1l",
      name: "Real Fruit Power Mixed Fruit Juice",
      weight: "1 L",
      price: 110,
      originalPrice: 130,
      discountBadge: "15% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "drinks-juices",
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=350&q=80",
    },
  ],

  // 10. Indian Sweets
  "indian-sweets": [
    {
      id: "haldirams-gulab-jamun-1kg",
      name: "Haldiram's Gulab Jamun Tin",
      weight: "1 kg",
      price: 240,
      originalPrice: 270,
      discountBadge: "11% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "indian-sweets",
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=350&q=80",
    },
    {
      id: "haldirams-rasgulla-1kg",
      name: "Haldiram's Spongy Rasgulla Tin",
      weight: "1 kg",
      price: 230,
      originalPrice: 260,
      discountBadge: "12% OFF",
      deliveryTime: "8 MINS",
      subcategoryId: "indian-sweets",
      image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=350&q=80",
    },
  ],
};
