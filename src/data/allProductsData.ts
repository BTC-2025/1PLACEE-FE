export interface UniversalProduct {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: string;
  department: string;
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  ratingCount: number;
  imageUrl: string;
  galleryImages: string[];
  description: string;
  bulletPoints: string[];
  inStock: boolean;
  isPrimeEligible: boolean;
  deliveryDate: string;
  tag?: string;
  specs: { label: string; value: string }[];
}

export const ALL_PRODUCTS: Record<string, UniversalProduct> = {
  // 1. KOTTY Mens Jeans (Chinos & Trousers)
  "kotty-mens-jeans": {
    id: "kotty-mens-jeans",
    slug: "kotty-mens-jeans",
    title: "KOTTY Mens Regular Fit | Classic Design with Stylish Look | Day Comfort Mid Rise Stretchable Jeans",
    brand: "KOTTY",
    category: "Men's Jeans",
    department: "Men's Fashion",
    price: 401,
    originalPrice: 1999,
    discount: "80% off",
    rating: 3.6,
    ratingCount: 3175,
    imageUrl: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Upgrade your casual wardrobe with these regular fit stretchable jeans from KOTTY. Made from premium breathable denim, these jeans offer unbeatable freedom of movement and modern style.",
    bulletPoints: [
      "Material: 98% Cotton, 2% Elastane Stretch Denim",
      "Closure: Zip fly with button closure; 5-pocket styling",
      "Rise: Mid-rise with clean tailored fit",
      "Care Instructions: Machine wash cold with like colors",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Thursday, 29 October",
    tag: "Great Indian Festival",
    specs: [
      { label: "Fit Type", value: "Regular Relaxed Fit" },
      { label: "Fabric", value: "Stretch Denim Cotton" },
      { label: "Waist Rise", value: "Mid Rise" },
      { label: "Occasion", value: "Casual & Daily Wear" },
    ],
  },

  // 2. OnePlus CE6 Lite 5G Smartphone
  "oneplus-ce6-lite": {
    id: "oneplus-ce6-lite",
    slug: "oneplus-ce6-lite",
    title: "OnePlus Nord CE4 Lite 5G (Super Silver, 8GB RAM, 128GB Storage) | 5500 mAh Battery | 80W SUPERVOOC",
    brand: "OnePlus",
    category: "Mobiles & Smartphones",
    department: "Mobiles & Computers",
    price: 17999,
    originalPrice: 20999,
    discount: "14% off",
    rating: 4.2,
    ratingCount: 14890,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=800&q=80",
    ],
    description: "The OnePlus Nord CE4 Lite 5G brings flagship-tier Sony LYT-600 50MP Camera with OIS, 120 Hz AMOLED display, and a massive 5500 mAh battery with ultra-fast 80W charging.",
    bulletPoints: [
      "Camera: 50MP Sony LYT-600 with OIS + 2MP Depth Assist",
      "Display: 6.67-inch 120Hz AMOLED, 2100 nits Peak Brightness",
      "Battery: 5500 mAh with 80W SUPERVOOC fast charging",
      "Processor: Qualcomm Snapdragon 695 5G Chipset",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Tomorrow, 2 PM",
    tag: "Blockbuster Deal",
    specs: [
      { label: "RAM / Storage", value: "8GB RAM | 128GB Storage" },
      { label: "Display", value: "6.67 inch 120Hz AMOLED" },
      { label: "OS", value: "OxygenOS 14 based on Android 14" },
      { label: "Weight", value: "191 g" },
    ],
  },

  // 3. Samsung Galaxy S24 Ultra
  "samsung-galaxy-s24": {
    id: "samsung-galaxy-s24",
    slug: "samsung-galaxy-s24",
    title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB, 256GB Storage) | 200MP AI Camera | S-Pen Included",
    brand: "Samsung",
    category: "Mobiles & Smartphones",
    department: "Mobiles & Computers",
    price: 119999,
    originalPrice: 134999,
    discount: "11% off",
    rating: 4.7,
    ratingCount: 8430,
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Welcome to the era of Galaxy AI. Capture breathtaking 200MP details, circle to search with Google, and translate calls in real time.",
    bulletPoints: [
      "200MP Primary Sensor with 100x Space Zoom",
      "Snapdragon 8 Gen 3 for Galaxy processor",
      "Built-in S-Pen for sketching, note taking and navigation",
      "Titanium frame with Gorilla Glass Armor",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Tomorrow, 10 AM",
    tag: "Flagship Choice",
    specs: [
      { label: "Processor", value: "Snapdragon 8 Gen 3" },
      { label: "Display", value: "6.8 inch Dynamic AMOLED 2X" },
      { label: "Battery", value: "5000 mAh" },
    ],
  },

  // 4. HP Victus Gaming Laptop
  "hp-victus-gaming-laptop": {
    id: "hp-victus-gaming-laptop",
    slug: "hp-victus-gaming-laptop",
    title: "HP Victus Gaming Laptop AMD Ryzen 5 5600H (15.6-inch FHD, 8GB DDR4, 512GB SSD, RTX 3050 4GB Graphics)",
    brand: "HP",
    category: "Laptops",
    department: "Mobiles & Computers",
    price: 52990,
    originalPrice: 74999,
    discount: "29% off",
    rating: 4.3,
    ratingCount: 5410,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Gear up for victory with the HP Victus 15. Powered by AMD Ryzen 5 and NVIDIA GeForce RTX 3050, it delivers silky-smooth gameplay on an anti-glare 144Hz FHD screen.",
    bulletPoints: [
      "Processor: AMD Ryzen 5 5600H (up to 4.2 GHz max boost clock, 6 cores)",
      "Graphics: NVIDIA GeForce RTX 3050 Laptop GPU (4 GB GDDR6)",
      "Display: 39.6 cm (15.6\") diagonal, FHD, 144 Hz, IPS, micro-edge",
      "Cooling: Upgraded thermal design with wide rear air vents",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Friday, 30 October",
    tag: "Great Indian Festival",
    specs: [
      { label: "CPU", value: "AMD Ryzen 5 5600H" },
      { label: "GPU", value: "NVIDIA RTX 3050 4GB" },
      { label: "Memory", value: "8GB DDR4 (Expandable to 32GB)" },
      { label: "Storage", value: "512GB PCIe Gen4 NVMe M.2 SSD" },
    ],
  },

  // 5. Dell 15 AI Laptop
  "dell-15-ai-laptop": {
    id: "dell-15-ai-laptop",
    slug: "dell-15-ai-laptop",
    title: "Dell 15 AI Powered Intel Core i5 13th Gen Laptop (16GB RAM, 512GB SSD, Windows 11, MS Office, Backlit Keyboard)",
    brand: "Dell",
    category: "Laptops",
    department: "Mobiles & Computers",
    price: 48990,
    originalPrice: 65990,
    discount: "26% off",
    rating: 4.4,
    ratingCount: 3820,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Dell 15 with integrated Intel AI boosts your everyday productivity, battery management, and video conferencing with noise cancelation.",
    bulletPoints: [
      "Intel Core i5-1335U 13th Gen Processor",
      "16GB DDR4 High-Speed RAM & 512GB NVMe SSD",
      "FHD 120Hz Anti-Glare Narrow Border Display",
      "Pre-installed Windows 11 Home & Office 2021",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Tomorrow, 5 PM",
    tag: "Top Choice",
    specs: [
      { label: "Processor", value: "Intel Core i5-1335U" },
      { label: "RAM", value: "16GB DDR4" },
      { label: "Display", value: "15.6 inch FHD 120Hz" },
    ],
  },

  // 6. SONY WH-1000XM5 Wireless Headphones
  "sony-wh1000xm5-headphones": {
    id: "sony-wh1000xm5-headphones",
    slug: "sony-wh1000xm5-headphones",
    title: "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones with Auto NC Optimizer | 30hr Battery",
    brand: "Sony",
    category: "Audio Headphones",
    department: "TV, Appliances, Electronics",
    price: 26990,
    originalPrice: 34990,
    discount: "23% off",
    rating: 4.6,
    ratingCount: 11200,
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Industry-leading noise cancellation optimized automatically with two processors and 8 microphones. Enjoy magnificent Hi-Res audio and crystal clear hands-free calls.",
    bulletPoints: [
      "Magnificent Sound: Engineered with newly developed 30mm driver unit",
      "Crystal Clear Calling: 4 beamforming microphones with AI noise reduction",
      "Battery: Up to 30 hours playback with 3-minute quick charge for 3 hours",
      "Multipoint Connection: Pair with two Bluetooth devices simultaneously",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Tomorrow, 11 AM",
    tag: "Top Choice",
    specs: [
      { label: "Battery Life", value: "Up to 30 Hours with ANC" },
      { label: "Bluetooth Version", value: "5.2 with LDAC support" },
      { label: "Weight", value: "250 grams" },
      { label: "Noise Cancellation", value: "Integrated Processor V1 + QN1" },
    ],
  },

  // 7. Philips All-in-One Trimmer
  "philips-grooming-trimmer": {
    id: "philips-grooming-trimmer",
    slug: "philips-grooming-trimmer",
    title: "Philips All-in-One Grooming Kit 13-in-1 Face, Head and Body Trimmer with DualCut Technology",
    brand: "Philips",
    category: "Personal Care Appliances",
    department: "Beauty, Health & Personal Care",
    price: 1849,
    originalPrice: 2895,
    discount: "36% off",
    rating: 4.4,
    ratingCount: 22450,
    imageUrl: "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Craft your personal look with this versatile trimmer featuring 13 premium tools for styling your face, beard, hair and body grooming.",
    bulletPoints: [
      "13-in-1 multi-grooming kit with tempered steel blades",
      "DualCut technology for maximum precision with 2x more blades",
      "Run time: Up to 120 minutes of cordless use per charge",
      "Showerproof for convenient use in the shower and easy cleaning",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Tomorrow, 10 AM",
    tag: "Best Seller",
    specs: [
      { label: "Battery Run Time", value: "120 mins" },
      { label: "Tools", value: "13 Attachments" },
      { label: "Blade Material", value: "Self-sharpening Stainless Steel" },
    ],
  },

  // 8. Sesa Ayurvedic Hair Oil
  "sesa-ayurvedic-hair-oil": {
    id: "sesa-ayurvedic-hair-oil",
    slug: "sesa-ayurvedic-hair-oil",
    title: "Sesa Ayurvedic Medicinal Hair Oil with 18 Herbs & 5 Nourishing Oils | Controls Hair Fall & Dandruff (200ml)",
    brand: "Sesa",
    category: "Haircare & Wellness",
    department: "Beauty, Health & Personal Care",
    price: 320,
    originalPrice: 450,
    discount: "29% off",
    rating: 4.2,
    ratingCount: 18900,
    imageUrl: "https://images.unsplash.com/photo-1608248597359-5f2122606822?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1608248597359-5f2122606822?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Certified Ayurvedic medicinal oil crafted using ancient Kshir Pak Vidhi with 18 rare herbs and pure cow milk to stop hair fall and stimulate hair regrowth.",
    bulletPoints: [
      "Formulated with Bhringraj, Brahmi, Neem and pure Sesame Oil",
      "Clinically proven to control hair fall and revitalize hair roots",
      "100% Herbal formulation with no mineral oil or parabens",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Tomorrow, 9 AM",
    tag: "Ayurvedic Heritage",
    specs: [
      { label: "Volume", value: "200 ml" },
      { label: "Hair Type", value: "All Hair Types" },
      { label: "Origin", value: "Made in India" },
    ],
  },

  // 9. Luxury Skincare / CeraVe Moisturizer
  "cerave-moisturizing-cream": {
    id: "cerave-moisturizing-cream",
    slug: "cerave-moisturizing-cream",
    title: "CeraVe Moisturizing Cream for Dry to Very Dry Skin with 3 Essential Ceramides & Hyaluronic Acid (453g)",
    brand: "CeraVe",
    category: "Skincare & Beauty",
    department: "Beauty, Health & Personal Care",
    price: 1250,
    originalPrice: 1650,
    discount: "24% off",
    rating: 4.6,
    ratingCount: 32400,
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Developed with dermatologists, CeraVe Moisturizing Cream has a unique formula that provides 24-hour hydration and helps restore the protective skin barrier with three essential ceramides.",
    bulletPoints: [
      "Essential Ceramides 1, 3, 6-II to restore protective skin barrier",
      "MVE Technology: Controlled release for all-day hydration",
      "Non-comedogenic, oil-free, fragrance-free and gentle on skin",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Tomorrow, 1 PM",
    tag: "Dermatologist Recommended",
    specs: [
      { label: "Skin Type", value: "Dry, Normal, Sensitive" },
      { label: "Item Weight", value: "453 Grams" },
      { label: "Form", value: "Cream" },
    ],
  },

  // 10. Apple Watch / Smartwatch
  "noise-smartwatch-ultra": {
    id: "noise-smartwatch-ultra",
    slug: "noise-smartwatch-ultra",
    title: "Noise ColorFit Ultra 3 Bluetooth Calling Smart Watch with 1.96\" AMOLED Display, Metallic Finish, 7-Day Battery",
    brand: "Noise",
    category: "Smartwatches & Wearables",
    department: "TV, Appliances, Electronics",
    price: 2499,
    originalPrice: 7999,
    discount: "69% off",
    rating: 4.1,
    ratingCount: 16500,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Experience bigger and brighter visuals on the 1.96-inch AMOLED display. Enjoy crisp Bluetooth calling, gesture control, and 100+ sports modes.",
    bulletPoints: [
      "1.96\" AMOLED Display with Always-on feature",
      "Advanced single-chip Bluetooth calling with dial pad",
      "Health tracking: 24x7 Heart Rate, SpO2, Sleep monitor",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Tomorrow, 3 PM",
    tag: "Mega Deal",
    specs: [
      { label: "Screen Size", value: "1.96 inch AMOLED" },
      { label: "Battery Life", value: "Up to 7 Days" },
      { label: "Water Resistance", value: "IP68" },
    ],
  },

  // 11. Ergonomic Office Chair / Work from Home
  "green-soul-ergonomic-chair": {
    id: "green-soul-ergonomic-chair",
    slug: "green-soul-ergonomic-chair",
    title: "Green Soul Monster Ultimate Ergonomic Chair with Breathable Spandex & Heavy-Duty Metal Base",
    brand: "Green Soul",
    category: "Office Furniture",
    department: "Home, Kitchen, Pets",
    price: 14990,
    originalPrice: 24990,
    discount: "40% off",
    rating: 4.5,
    ratingCount: 4210,
    imageUrl: "https://images.unsplash.com/photo-1580481077195-c9e846059e6c?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1580481077195-c9e846059e6c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Work or game in unmatched comfort. Engineered with adjustable lumbar support, 4D armrests, and 180-degree reclining mechanism.",
    bulletPoints: [
      "Breathable fabric designed for long work hours in Indian climate",
      "Class 4 hydraulic gas lift with 135 kg capacity",
      "3 Years Comprehensive Manufacturer Warranty",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Saturday, 31 October",
    tag: "WFH Essential",
    specs: [
      { label: "Max Weight", value: "135 kg" },
      { label: "Material", value: "Breathable Fabric & Metal" },
      { label: "Warranty", value: "3 Years" },
    ],
  },

  // 12. California Almonds & Dry Fruits
  "happilo-premium-almonds": {
    id: "happilo-premium-almonds",
    slug: "happilo-premium-almonds",
    title: "Happilo 100% Natural Premium California Almonds (1kg Value Pack) | Crunchy, Gluten-Free & Protein Rich",
    brand: "Happilo",
    category: "Grocery & Gourmet Foods",
    department: "Fresh & Grocery",
    price: 789,
    originalPrice: 1250,
    discount: "37% off",
    rating: 4.3,
    ratingCount: 45200,
    imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Handpicked premium California almonds, vacuum packed for unmatched freshness and crunchiness. Loaded with Vitamin E, protein, and healthy fats.",
    bulletPoints: [
      "100% Real California Almonds with zero preservatives",
      "Rich in Dietary Fiber, Protein and Heart-Healthy Omega 3",
      "Resealable zipper pouch maintains crunchiness",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "⚡ 4 mins Delivery (1PLACE now)",
    tag: "Festival Special",
    specs: [
      { label: "Weight", value: "1000 Grams (1 kg)" },
      { label: "Diet Type", value: "Vegetarian / Gluten Free" },
      { label: "Package", value: "Pouch" },
    ],
  },
};
