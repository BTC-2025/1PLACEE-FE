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

  // 12. Apple iPhone 18 Pro / iPhone 16 Pro Max Flagship (Exact match to uploaded screenshots)
  "apple-iphone-18-pro": {
    id: "apple-iphone-18-pro",
    slug: "apple-iphone-18-pro",
    title: "iPhone 16 Pro Max 256GB Desert Titanium 5G - Middle East Version",
    brand: "Apple",
    category: "Smartphones",
    department: "Electronics & Mobiles",
    price: 3799,
    originalPrice: 5099,
    discount: "25% Off",
    rating: 4.6,
    ratingCount: 36942,
    imageUrl: "/banners/noon-iphone-main.png",
    galleryImages: [
      "/banners/noon-iphone-main.png",
      "/banners/noon-thumb-1.png",
      "/banners/noon-thumb-2.png",
      "/banners/noon-thumb-3.png",
      "/banners/noon-thumb-4.png",
      "/banners/noon-thumb-5.png",
      "/banners/noon-thumb-6.png",
    ],
    description: "Apple Intelligence protects your privacy at every step. With on-device processing and Private Cloud Compute, no one but you can access your data — not even Apple. The new Passwords app makes it even easier to access account passwords, passkeys, Wi-Fi passwords, two-factor authentication codes and more.",
    bulletPoints: [
      "4676mAh Battery: Large power reservoir supports extended daily usage without needing frequent wall charging.",
      "5G Dual SIM: Connect to high-speed networks using one physical Nano card and eSIM.",
      "120Hz OLED Display: High refresh rate panel ensures fluid motion across all visual content.",
      "48MP Triple Camera: Capture detailed images using the versatile three-lens rear sensor array system.",
      "A18 Pro Bionic Chip: Industry leading neural processing and ray-tracing performance.",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Get it Tomorrow (Order in 8h 54m)",
    tag: "11.11 Deal 🔥",
    specs: [
      { label: "Memory Type", value: "No Expandable Memory" },
      { label: "Secondary Camera Resolution", value: "12 MP" },
      { label: "SIM Count", value: "Dual SIM" },
      { label: "RAM Size", value: "8 GB" },
      { label: "Battery Size", value: "4676 mAh" },
      { label: "Internal Memory", value: "256 GB" },
      { label: "Product Weight", value: "227 g" },
      { label: "Screen Size", value: "6.9 in" },
      { label: "Version", value: "Middle East Version" },
      { label: "SIM Type", value: "Nano + eSIM" },
      { label: "Primary Camera Resolution", value: "48 MP" },
      { label: "Refresh Rates", value: "120Hz" },
      { label: "Color", value: "Desert Titanium" },
      { label: "Display Type", value: "OLED" },
      { label: "OS Version", value: "iOS 18" },
      { label: "Charging Type", value: "Type-C" },
      { label: "Operating System", value: "iOS" },
      { label: "Item Condition", value: "New" },
      { label: "Network Type", value: "5G" },
      { label: "Fast Charging", value: "Yes" },
      { label: "Flash", value: "Dual Tone flash" },
      { label: "Model Name", value: "iPhone 16 Pro Max" },
      { label: "Model Number", value: "MYWJ3AE/A, MYWJ3AH/A" },
      { label: "Model Year", value: "2024" },
      { label: "Number of Cores", value: "Hexa Core" },
      { label: "Primary Camera Feature", value: "Triple (48+48+12)" },
      { label: "Processor Number", value: "A18 Pro" },
      { label: "Voice Calling Capability", value: "Yes" },
    ],
  },

  // 14. Fresh Fruits: Mango & Dragonfruit
  "fresh-alphonso-mango": {
    id: "fresh-alphonso-mango",
    slug: "fresh-alphonso-mango",
    title: "Premium Ratnagiri Alphonso Mangoes (6 pcs Gift Box) | Naturally Ripened Sweet Taste",
    brand: "Frizto Fresh",
    category: "Fresh Fruits",
    department: "Fresh & Grocery",
    price: 2390,
    originalPrice: 3490,
    discount: "31% off",
    rating: 4.8,
    ratingCount: 1420,
    imageUrl: "/products/fruits/frizto-mango.jpg",
    galleryImages: [
      "/products/fruits/frizto-mango.jpg",
      "/products/fruits/frizto-mango-pack.jpg",
      "/products/fruits/frizto-hamper.jpg",
    ],
    description: "Hand-picked pure Ratnagiri Alphonso mangoes, chemical-free and naturally ripened on tree. Rich aromatic sweetness and fiberless golden pulp.",
    bulletPoints: [
      "Naturally ripened using traditional hay packing",
      "100% Carb-free and preservative-free origin certified",
      "Delivered fresh within 18 minutes by 1PLACE Express",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Get it in 18 Mins",
    tag: "Express Grocery ⚡",
    specs: [
      { label: "Weight", value: "200 g / pc" },
      { label: "Pack Size", value: "6 pcs box" },
      { label: "Origin", value: "Ratnagiri, Maharashtra" },
      { label: "Shelf Life", value: "5 Days" },
      { label: "Diet Type", value: "Vegetarian / Organic" },
    ],
  },

  "fresh-dragonfruit-per-pc": {
    id: "fresh-dragonfruit-per-pc",
    slug: "fresh-dragonfruit-per-pc",
    title: "Fresh Red Pitaya Dragonfruit per pc (Approx 280g - 450g) | Farm Fresh Antioxidant Superfood",
    brand: "Fresh Farm",
    category: "Fresh Fruits",
    department: "Fresh & Grocery",
    price: 79,
    originalPrice: 120,
    discount: "34% off",
    rating: 4.7,
    ratingCount: 890,
    imageUrl: "/products/fruits/dragonfruit.jpg",
    galleryImages: [
      "/products/fruits/dragonfruit.jpg",
      "/products/fruits/dragonfruit.jpg",
    ],
    description: "Exotic farm-fresh red dragonfruit rich in Vitamin C, fiber and active antioxidants. Crisp, lightly sweet taste with healthy seeds.",
    bulletPoints: [
      "Rich in prebiotic fiber and digestive enzymes",
      "Guaranteed farm freshness with zero wax coating",
      "Delivered chilled within 18 minutes",
    ],
    inStock: true,
    isPrimeEligible: true,
    deliveryDate: "Get it in 18 Mins",
    tag: "Express Fresh ⚡",
    specs: [
      { label: "Weight", value: "Approx 280g - 450g" },
      { label: "Pack Type", value: "Individual piece" },
      { label: "Storage", value: "Refrigerate upon delivery" },
      { label: "Shelf Life", value: "4 Days" },
    ],
  },

  "fissman-stockpot": {
    "id": "fissman-stockpot",
    "title": "Fissman Stockpot Seagreen Series Cast Iron 8L Black Induction Base",
    "brand": "Fissman",
    "category": "Cookware",
    "department": "Kitchen & Home",
    "price": 249,
    "originalPrice": 420,
    "discount": "40.71% OFF",
    "rating": 4.8,
    "ratingCount": 1420,
    "imageUrl": "/banners/fissman-stockpot.png",
    "galleryImages": [
        "/banners/fissman-stockpot.png",
        "/banners/fissman-pan.png",
        "/banners/fissman-casserole.jpg"
    ],
    "description": "Crafted from heavy-gauge cast iron with Seagreen durable mineral coating. Ensures rapid even heat distribution for stews, soups, and slow cooking.",
    "bulletPoints": [
        "Heavy-duty cast iron body with heat-retaining lid",
        "Induction, gas, and oven safe up to 260°C",
        "Eco-friendly non-stick natural mineral finish",
        "8 Litre large family cooking capacity"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow by 11 AM",
    "tag": "Top Pick",
    "specs": [
        {
            "label": "Material",
            "value": "Enameled Cast Iron"
        },
        {
            "label": "Capacity",
            "value": "8 Litres"
        },
        {
            "label": "Stovetop Compatibility",
            "value": "Induction, Gas, Electric, Ceramic"
        },
        {
            "label": "Dishwasher Safe",
            "value": "Yes (Hand wash recommended)"
        },
        {
            "label": "Warranty",
            "value": "5 Years Manufacturer Warranty"
        }
    ],
    "slug": "fissman-stockpot"
},

  "fissman-pan": {
    "id": "fissman-pan",
    "title": "Fissman Frying Pan Space Stone Aluminum 26cm Non-Stick",
    "brand": "Fissman",
    "category": "Cookware",
    "department": "Kitchen & Home",
    "price": 115,
    "originalPrice": 220,
    "discount": "47.73% OFF",
    "rating": 4.7,
    "ratingCount": 980,
    "imageUrl": "/banners/fissman-pan.png",
    "galleryImages": [
        "/banners/fissman-pan.png",
        "/banners/fissman-stockpot.png"
    ],
    "description": "Space Stone 4-layer marble coating ensures oil-free healthy frying with maximum scratch resistance and stay-cool ergonomic handle.",
    "bulletPoints": [
        "PFOA and toxin free non-stick surface",
        "26cm diameter for everyday family meals",
        "Ergonomic soft-touch wood-effect handle",
        "Fast heat conducting forged aluminium base"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow by 2 PM",
    "tag": "Best Seller",
    "specs": [
        {
            "label": "Diameter",
            "value": "26 cm"
        },
        {
            "label": "Coating",
            "value": "Space Stone 4-Layer Marble"
        },
        {
            "label": "Handle Material",
            "value": "Heat-Resistant Bakelite"
        },
        {
            "label": "Compatibility",
            "value": "All Cooktops including Induction"
        }
    ],
    "slug": "fissman-pan"
},

  "fissman-flask": {
    "id": "fissman-flask",
    "title": "Fissman Vacuum Flask 1000ml Insulated Travel Stainless Steel",
    "brand": "Fissman",
    "category": "Kitchen & Dining",
    "department": "Home & Travel",
    "price": 60,
    "originalPrice": 121,
    "discount": "50.41% OFF",
    "rating": 4.6,
    "ratingCount": 650,
    "imageUrl": "/banners/fissman-flask.png",
    "galleryImages": [
        "/banners/fissman-flask.png",
        "/banners/fissman-kettle.png"
    ],
    "description": "Double-walled vacuum insulation keeps beverages steaming hot for 24 hours or refreshingly chilled for 36 hours. 100% leak-proof cap.",
    "bulletPoints": [
        "Premium 304 Food-Grade Stainless Steel interior",
        "Double wall vacuum insulation technology",
        "1000ml (1 Litre) generous travel capacity",
        "One-touch push button leakproof pour spout"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow by 5 PM",
    "tag": "Deal of the Day",
    "specs": [
        {
            "label": "Volume",
            "value": "1000 ml"
        },
        {
            "label": "Thermal Retention",
            "value": "24h Hot / 36h Cold"
        },
        {
            "label": "Material",
            "value": "SS 304 Double Wall"
        },
        {
            "label": "BPA Free",
            "value": "Yes"
        }
    ],
    "slug": "fissman-flask"
},

  "fissman-kettle": {
    "id": "fissman-kettle",
    "title": "Fissman Whistling Kettle Anita 2.5L Stainless Steel Rapid Boil",
    "brand": "Fissman",
    "category": "Kitchen & Dining",
    "department": "Kitchen & Home",
    "price": 150,
    "originalPrice": 221,
    "discount": "32.13% OFF",
    "rating": 4.5,
    "ratingCount": 430,
    "imageUrl": "/banners/fissman-kettle.png",
    "galleryImages": [
        "/banners/fissman-kettle.png",
        "/banners/fissman-flask.png"
    ],
    "description": "Sleek mirror polished whistling kettle with loud acoustic alert when water reaches rolling boil. Encapsulated heat-retention base.",
    "bulletPoints": [
        "Loud acoustic whistle indicator",
        "2.5 Litre boiling volume",
        "Stay-cool ergonomic handle with trigger spout",
        "Induction friendly multi-ply capsule base"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Trending",
    "specs": [
        {
            "label": "Capacity",
            "value": "2.5 Litres"
        },
        {
            "label": "Material",
            "value": "Mirror Polish Stainless Steel"
        },
        {
            "label": "Whistle Mechanism",
            "value": "Integrated Acoustic Valve"
        }
    ],
    "slug": "fissman-kettle"
},

  "fissman-knives": {
    "id": "fissman-knives",
    "title": "Fissman Knife Set YASUMOTO 5-Piece Japanese Stainless Steel with Block",
    "brand": "Fissman",
    "category": "Kitchen Knives",
    "department": "Kitchen & Dining",
    "price": 210,
    "originalPrice": 415,
    "discount": "49.40% OFF",
    "rating": 4.9,
    "ratingCount": 810,
    "imageUrl": "/banners/fissman-knives.png",
    "galleryImages": [
        "/banners/fissman-knives.png",
        "/banners/fissman-stockpot.png"
    ],
    "description": "Precision laser-tested razor sharpness crafted from X30Cr13 high-carbon Japanese steel with wooden block storage.",
    "bulletPoints": [
        "5 essential chef, santoku, utility & paring knives",
        "X30Cr13 Japanese high carbon steel blades",
        "Full tang ergonomic balance handle",
        "Moisture resistant wooden display block"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Chef Choice",
    "specs": [
        {
            "label": "Steel Grade",
            "value": "Japanese X30Cr13 High Carbon"
        },
        {
            "label": "Set Pieces",
            "value": "5 Knives + Solid Wooden Block"
        },
        {
            "label": "Rockwell Hardness",
            "value": "54±2 HRC"
        }
    ],
    "slug": "fissman-knives"
},

  "fissman-casserole": {
    "id": "fissman-casserole",
    "title": "Fissman Deep Casserole Pot Diamond Non-Stick 4.5L with Tempered Glass Lid",
    "brand": "Fissman",
    "category": "Cookware",
    "department": "Kitchen & Home",
    "price": 185,
    "originalPrice": 340,
    "discount": "45.58% OFF",
    "rating": 4.6,
    "ratingCount": 390,
    "imageUrl": "/banners/fissman-casserole.jpg",
    "galleryImages": [
        "/banners/fissman-casserole.jpg",
        "/banners/fissman-stockpot.png"
    ],
    "description": "Deep casserole pot coated with Diamond hard crystals for extreme non-stick longevity and steam vented glass lid.",
    "bulletPoints": [
        "Diamond crystal reinforced coating",
        "4.5 Litre stewing & curry capacity",
        "Induction induction bottom",
        "Silicone rimmed glass lid"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Top Pick",
    "specs": [
        {
            "label": "Capacity",
            "value": "4.5 Litres"
        },
        {
            "label": "Diameter",
            "value": "24 cm"
        },
        {
            "label": "Lid Type",
            "value": "Tempered Glass with Steam Vent"
        }
    ],
    "slug": "fissman-casserole"
},

  "fissman-grill-pan": {
    "id": "fissman-grill-pan",
    "title": "Fissman Square Grill Pan Induction Safe 28cm Die-Cast Aluminium",
    "brand": "Fissman",
    "category": "Cookware",
    "department": "Kitchen & Home",
    "price": 130,
    "originalPrice": 245,
    "discount": "46.93% OFF",
    "rating": 4.7,
    "ratingCount": 520,
    "imageUrl": "/banners/fissman-grill.jpg",
    "galleryImages": [
        "/banners/fissman-grill.jpg",
        "/banners/fissman-pan.png"
    ],
    "description": "Deep rib ridges create authentic BBQ grill marks while draining excess oils away for lean, healthy steak and veggie grilling.",
    "bulletPoints": [
        "Raised char-grill ribs for low-fat cooking",
        "Dual pour spouts for mess-free oil draining",
        "Foldable cool-touch handle for compact storage",
        "28x28cm wide cooking area"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Barbecue Pick",
    "specs": [
        {
            "label": "Dimensions",
            "value": "28 x 28 cm"
        },
        {
            "label": "Rib Profile",
            "value": "High Deep Barbecue Ridges"
        },
        {
            "label": "Body",
            "value": "Die-Cast Aluminium"
        }
    ],
    "slug": "fissman-grill-pan"
},

  "fissman-tea-pot": {
    "id": "fissman-tea-pot",
    "title": "Fissman Borosilicate Glass Teapot Infuser 800ml Heat-Resistant",
    "brand": "Fissman",
    "category": "Kitchen & Dining",
    "department": "Kitchen & Home",
    "price": 85,
    "originalPrice": 160,
    "discount": "46.87% OFF",
    "rating": 4.8,
    "ratingCount": 310,
    "imageUrl": "/banners/fissman-teapot.jpg",
    "galleryImages": [
        "/banners/fissman-teapot.jpg",
        "/banners/fissman-flask.png"
    ],
    "description": "Crystal-clear thermal shock resistant borosilicate teapot with ultra-fine stainless steel mesh infuser for loose leaf tea.",
    "bulletPoints": [
        "Thermal shock proof up to 150°C",
        "Stainless steel fine micro-pore filter",
        "Drip-free precision pouring spout",
        "800ml capacity for 3-4 cups"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Top Pick",
    "specs": [
        {
            "label": "Capacity",
            "value": "800 ml"
        },
        {
            "label": "Glass Type",
            "value": "High Borosilicate Glass"
        },
        {
            "label": "Infuser",
            "value": "Laser Cut SS 304"
        }
    ],
    "slug": "fissman-tea-pot"
},

  "casio-analog-diver": {
    "id": "casio-analog-diver",
    "title": "Casio Analog Diver Watch for Men, 46.3mm Stainless Steel 200M Water Resistant",
    "brand": "Casio",
    "category": "Watches",
    "department": "Men's Watches",
    "price": 277,
    "originalPrice": 349,
    "discount": "20.63% OFF",
    "rating": 4.6,
    "ratingCount": 2150,
    "imageUrl": "/banners/watch-casio-diver.png",
    "galleryImages": [
        "/banners/watch-casio-diver.png",
        "/banners/watch-seiko-chrono.jpg"
    ],
    "description": "Classic rugged diver watch featuring anti-reverse rotating bezel, date display, luminous hour markers, and screw-lock crown.",
    "bulletPoints": [
        "200-meter water resistance for deep diving",
        "Stainless steel case with heavy-duty resin band",
        "Anti-reverse rotating bezel with countdown timer",
        "High-glow luminous hands & hour markers"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow by 11 AM",
    "tag": "Best Diver",
    "specs": [
        {
            "label": "Case Diameter",
            "value": "46.3 mm"
        },
        {
            "label": "Water Resistance",
            "value": "200 Meters (20 Bar)"
        },
        {
            "label": "Movement",
            "value": "Japanese Quartz (SR626SW Battery)"
        },
        {
            "label": "Bezel Function",
            "value": "Unidirectional Rotating Bezel"
        },
        {
            "label": "Warranty",
            "value": "2 Years Brand Warranty"
        }
    ],
    "slug": "casio-analog-diver"
},

  "citizen-tsuyosa": {
    "id": "citizen-tsuyosa",
    "title": "Citizen TSUYOSA 37mm Automatic Watch for Men Stainless Steel Integrated Bracelet",
    "brand": "Citizen",
    "category": "Watches",
    "department": "Men's Watches",
    "price": 1249,
    "originalPrice": 1799,
    "discount": "30.57% OFF",
    "rating": 4.7,
    "ratingCount": 1840,
    "imageUrl": "/banners/watch-citizen-tsuyosa.png",
    "galleryImages": [
        "/banners/watch-citizen-tsuyosa.png",
        "/banners/watch-tissot-prx.jpg"
    ],
    "description": "Iconic integrated sports luxury design featuring Calibre 8210 automatic movement, exhibition transparent caseback, and sapphire crystal.",
    "bulletPoints": [
        "In-house Calibre 8210 Automatic Mechanical Movement",
        "Integrated solid link stainless steel bracelet",
        "Scratch-resistant Sapphire crystal with cyclops date",
        "40-hour power reserve with transparent case back"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Luxury Automatic",
    "specs": [
        {
            "label": "Case Diameter",
            "value": "37 mm"
        },
        {
            "label": "Movement Type",
            "value": "Automatic Calibre 8210 (21 Jewels)"
        },
        {
            "label": "Glass",
            "value": "Sapphire Crystal with Date Magnifier"
        },
        {
            "label": "Power Reserve",
            "value": "Approx. 40 Hours"
        },
        {
            "label": "Water Resistance",
            "value": "50 Meters (5 Bar)"
        }
    ],
    "slug": "citizen-tsuyosa"
},

  "movado-museum-classic": {
    "id": "movado-museum-classic",
    "title": "Movado Museum Classic Watch Black Dial Black PVD Stainless Steel Leather Strap",
    "brand": "Movado",
    "category": "Watches",
    "department": "Luxury Watches",
    "price": 3599,
    "originalPrice": 4999,
    "discount": "28.01% OFF",
    "rating": 4.4,
    "ratingCount": 920,
    "imageUrl": "/banners/watch-movado-museum.png",
    "galleryImages": [
        "/banners/watch-movado-museum.png",
        "/banners/watch-police-neist.png"
    ],
    "description": "Legendary minimalist single dot museum dial designed by Nathan George Horwitt. Symbolizes the sun at high noon with sleek black PVD finish.",
    "bulletPoints": [
        "Iconic signature concave dot at 12 o'clock",
        "Swiss quartz movement for precision timekeeping",
        "Durable black PVD-finished stainless steel case",
        "Supple genuine calfskin black leather strap"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Swiss Icon",
    "specs": [
        {
            "label": "Movement",
            "value": "Swiss Quartz"
        },
        {
            "label": "Case Size",
            "value": "40 mm"
        },
        {
            "label": "Case Material",
            "value": "Black PVD Coated Stainless Steel"
        },
        {
            "label": "Dial",
            "value": "Museum Black with Signature Silver Dot"
        }
    ],
    "slug": "movado-museum-classic"
},

  "police-neist-chronograph": {
    "id": "police-neist-chronograph",
    "title": "Police Neist Chronograph Watch for Men - 45mm Gunmetal Stainless Steel",
    "brand": "Police",
    "category": "Watches",
    "department": "Men's Watches",
    "price": 749,
    "originalPrice": 1149,
    "discount": "34.81% OFF",
    "rating": 4.4,
    "ratingCount": 710,
    "imageUrl": "/banners/watch-police-neist.png",
    "galleryImages": [
        "/banners/watch-police-neist.png",
        "/banners/watch-fossil-everett.png"
    ],
    "description": "Bold urban aesthetic with multi-dial chronograph counters, industrial tachymeter scale, and gunmetal stainless steel linked bracelet.",
    "bulletPoints": [
        "Precision multi-function chronograph stopwatch",
        "45mm bold masculine case design",
        "Tough mineral glass crystal with scratch resistance",
        "50M water resistance for everyday splash protection"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Trending",
    "specs": [
        {
            "label": "Dial Size",
            "value": "45 mm"
        },
        {
            "label": "Display Type",
            "value": "Multi-Subdial Chronograph"
        },
        {
            "label": "Finish",
            "value": "Gunmetal Ion Plating"
        }
    ],
    "slug": "police-neist-chronograph"
},

  "fossil-everett-automatic": {
    "id": "fossil-everett-automatic",
    "title": "Fossil Everett Automatic Three-Hand 42 mm Rose Gold Stainless Steel Skeleton",
    "brand": "Fossil",
    "category": "Watches",
    "department": "Men's Watches",
    "price": 719,
    "originalPrice": 1099,
    "discount": "34.58% OFF",
    "rating": 4.3,
    "ratingCount": 650,
    "imageUrl": "/banners/watch-fossil-everett.png",
    "galleryImages": [
        "/banners/watch-fossil-everett.png",
        "/banners/watch-seiko-chrono.jpg"
    ],
    "description": "Mechanical skeleton dial puts intricate gear motions on direct display. Finished in rich rose-gold stainless steel with integrated links.",
    "bulletPoints": [
        "Open-heart skeleton movement window",
        "Self-winding automatic movement (no battery needed)",
        "Rose gold ion-plated solid stainless steel",
        "Double locking fold-over safety clasp"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Automatic",
    "specs": [
        {
            "label": "Case Size",
            "value": "42 mm"
        },
        {
            "label": "Movement",
            "value": "Automatic Mechanical 3-Hand"
        },
        {
            "label": "Case Color",
            "value": "Rose Gold PVD"
        }
    ],
    "slug": "fossil-everett-automatic"
},

  "seiko-chronograph-black": {
    "id": "seiko-chronograph-black",
    "title": "Seiko Neo Classic Chronograph Quartz Black Dial Watch 100M Water Resistant",
    "brand": "Seiko",
    "category": "Watches",
    "department": "Men's Watches",
    "price": 1890,
    "originalPrice": 2699,
    "discount": "29.97% OFF",
    "rating": 4.8,
    "ratingCount": 1420,
    "imageUrl": "/banners/watch-seiko-chrono.jpg",
    "galleryImages": [
        "/banners/watch-seiko-chrono.jpg",
        "/banners/watch-casio-diver.png"
    ],
    "description": "Seiko Calibre 8T63 Japanese chronograph with date display, tachymeter ring, Hardlex crystal, and 100m water resistance.",
    "bulletPoints": [
        "High precision Calibre 8T63 Quartz movement",
        "1/5th second stopwatch counter up to 60 minutes",
        "Seiko proprietary Hardlex mineral crystal",
        "Solid stainless steel construction"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Top Rated",
    "specs": [
        {
            "label": "Movement",
            "value": "Seiko Calibre 8T63 Quartz"
        },
        {
            "label": "Case Diameter",
            "value": "43 mm"
        },
        {
            "label": "Water Resistance",
            "value": "100 Meters (10 Bar)"
        }
    ],
    "slug": "seiko-chronograph-black"
},

  "timex-expedition-scout": {
    "id": "timex-expedition-scout",
    "title": "Timex Expedition Scout 40mm Brown Leather Strap Indiglo Night-Light",
    "brand": "Timex",
    "category": "Watches",
    "department": "Outdoor Watches",
    "price": 450,
    "originalPrice": 650,
    "discount": "30.76% OFF",
    "rating": 4.5,
    "ratingCount": 3200,
    "imageUrl": "/banners/watch-timex-expedition.jpg",
    "galleryImages": [
        "/banners/watch-timex-expedition.jpg",
        "/banners/watch-casio-diver.png"
    ],
    "description": "Trail-tested field watch designed with Indiglo electroluminescent night-light, 24-hour military time, and genuine rugged leather strap.",
    "bulletPoints": [
        "Signature Indiglo full-dial night light",
        "40mm brass case with matte gunmetal finish",
        "Genuine brown leather strap with buckle",
        "50M water resistance for outdoor trails"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Field Choice",
    "specs": [
        {
            "label": "Case Diameter",
            "value": "40 mm"
        },
        {
            "label": "Lighting",
            "value": "Indiglo Night-Light"
        },
        {
            "label": "Strap",
            "value": "Genuine Leather 20mm"
        }
    ],
    "slug": "timex-expedition-scout"
},

  "tissot-prx-powermatic": {
    "id": "tissot-prx-powermatic",
    "title": "Tissot PRX Powermatic 80 Steel Blue Waffle Dial Swiss Luxury Watch",
    "brand": "Tissot",
    "category": "Watches",
    "department": "Swiss Luxury Watches",
    "price": 4200,
    "originalPrice": 5800,
    "discount": "27.58% OFF",
    "rating": 4.9,
    "ratingCount": 2900,
    "imageUrl": "/banners/watch-tissot-prx.jpg",
    "galleryImages": [
        "/banners/watch-tissot-prx.jpg",
        "/banners/watch-citizen-tsuyosa.png"
    ],
    "description": "Retro 1978 design revived with cutting-edge Swiss Powermatic 80 movement offering an astonishing 80-hour power reserve and Nivachron anti-magnetic balance spring.",
    "bulletPoints": [
        "Swiss Made Powermatic 80.111 automatic movement",
        "80-hour power reserve with patented Nivachron balance spring",
        "Blue embossed waffle pattern guilloche dial",
        "Sapphire crystal with anti-reflective coating"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Swiss Masterpiece",
    "specs": [
        {
            "label": "Country of Origin",
            "value": "Switzerland (Swiss Made)"
        },
        {
            "label": "Power Reserve",
            "value": "80 Hours"
        },
        {
            "label": "Case Diameter",
            "value": "40 mm"
        },
        {
            "label": "Crystal",
            "value": "Scratch-Resistant Sapphire"
        },
        {
            "label": "Water Resistance",
            "value": "100 Meters (10 Bar)"
        }
    ],
    "slug": "tissot-prx-powermatic"
},

  "versace-eros": {
    "id": "versace-eros",
    "title": "Versace Eros Najim Parfum 200 ml for Men - Caramel Spices & Cedarwood",
    "brand": "Versace",
    "category": "Perfumes",
    "department": "Beauty & Fragrances",
    "price": 487,
    "originalPrice": 648,
    "discount": "24.85% OFF",
    "rating": 4.8,
    "ratingCount": 3890,
    "imageUrl": "/banners/perfumes-versace-eros.png",
    "galleryImages": [
        "/banners/perfumes-versace-eros.png",
        "/banners/perfumes-french-avenue.png",
        "/banners/perfumes-armani-acqua.png"
    ],
    "description": "Bold sensual fragrance inspired by Greek mythology. Opens with glowing Italian lemon, mint, and candied apple before settling into warm tonka beans and amber.",
    "bulletPoints": [
        "100% Genuine Luxury Imported Parfum concentration",
        "Long lasting projection up to 12+ hours",
        "Notes: Mint, Candied Apple, Tonka Bean, Cedarwood",
        "200ml jumbo collectible flacon"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow by 11 AM",
    "tag": "Luxury Scent",
    "specs": [
        {
            "label": "Fragrance Family",
            "value": "Aromatic Fougère & Amber"
        },
        {
            "label": "Concentration",
            "value": "Parfum (Highest Oil Concentration)"
        },
        {
            "label": "Volume",
            "value": "200 ml"
        },
        {
            "label": "Longevity",
            "value": "12 - 16 Hours"
        },
        {
            "label": "Target Gender",
            "value": "Men"
        }
    ],
    "slug": "versace-eros"
},

  "french-avenue": {
    "id": "french-avenue",
    "title": "French Avenue Aether Extrait de Parfum 100 ml Unisex Niche Collection",
    "brand": "French Avenue",
    "category": "Perfumes",
    "department": "Beauty & Fragrances",
    "price": 107,
    "originalPrice": 179,
    "discount": "40.22% OFF",
    "rating": 4.5,
    "ratingCount": 780,
    "imageUrl": "/banners/perfumes-french-avenue.png",
    "galleryImages": [
        "/banners/perfumes-french-avenue.png",
        "/banners/perfumes-versace-eros.png"
    ],
    "description": "Extrait de Parfum boasting rich metallic lavender notes, sparkling citrus, and woody ambergris for unforgettable all-day elegance.",
    "bulletPoints": [
        "High 30% fragrance oil Extrait de Parfum strength",
        "Modern unisex niche scent profile",
        "Notes of citrus, lavender blossom, cashmeran and ambergris",
        "Handcrafted luxury presentation box"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Niche Pick",
    "specs": [
        {
            "label": "Concentration",
            "value": "Extrait de Parfum"
        },
        {
            "label": "Volume",
            "value": "100 ml"
        },
        {
            "label": "Scent Type",
            "value": "Woody Aquatic / Aromatic"
        },
        {
            "label": "Ideal For",
            "value": "Unisex (Men & Women)"
        }
    ],
    "slug": "french-avenue"
},

  "armani-acqua": {
    "id": "armani-acqua",
    "title": "Armani Acqua di Gio Elixir Parfum 50 ml for Men Marine & Woody",
    "brand": "Giorgio Armani",
    "category": "Perfumes",
    "department": "Beauty & Fragrances",
    "price": 397,
    "originalPrice": 528,
    "discount": "24.81% OFF",
    "rating": 4.9,
    "ratingCount": 4210,
    "imageUrl": "/banners/perfumes-armani-acqua.png",
    "galleryImages": [
        "/banners/perfumes-armani-acqua.png",
        "/banners/perfumes-versace-eros.png"
    ],
    "description": "Intense aquatic freshness meets deep incense and patchouli. Captures the invigorating power of the Mediterranean sea.",
    "bulletPoints": [
        "Signature marine accord with sparkling green mandarin",
        "Heart of rosemary, lavender and geranium",
        "Deep base of smoky incense and Guatemalan patchouli",
        "Refillable eco-designed bottle"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Best Seller",
    "specs": [
        {
            "label": "Volume",
            "value": "50 ml"
        },
        {
            "label": "Fragrance Type",
            "value": "Woody Marine Aquatic"
        },
        {
            "label": "Origin",
            "value": "France"
        }
    ],
    "slug": "armani-acqua"
},

  "tommy-women": {
    "id": "tommy-women",
    "title": "TOMMY HILFIGER Women Sunglasses TH1966S Polarized Gradient Lenses UV400",
    "brand": "Tommy Hilfiger",
    "category": "Eyewear",
    "department": "Fashion Accessories",
    "price": 774,
    "originalPrice": 1580,
    "discount": "51.01% OFF",
    "rating": 4.6,
    "ratingCount": 1140,
    "imageUrl": "/banners/eyewear-tommy-women.png",
    "galleryImages": [
        "/banners/eyewear-tommy-women.png",
        "/banners/eyewear-prada-sps06y.png"
    ],
    "description": "Oversized chic cat-eye acetate silhouette accented with iconic Tommy ribbon stripes. 100% UV400 protection against harmful rays.",
    "bulletPoints": [
        "100% UV400 Polarized glare reduction lenses",
        "Lightweight premium Italian acetate frame",
        "Signature Tommy Hilfiger logo temple hinges",
        "Includes branded protective hard case & cleaning cloth"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow by 11 AM",
    "tag": "Half Price Deal",
    "specs": [
        {
            "label": "Frame Material",
            "value": "Bio-Based Acetate"
        },
        {
            "label": "Lens Technology",
            "value": "Polarized UV400 Protection"
        },
        {
            "label": "Lens Width",
            "value": "54 mm"
        },
        {
            "label": "Bridge Size",
            "value": "18 mm"
        },
        {
            "label": "Temple Length",
            "value": "140 mm"
        }
    ],
    "slug": "tommy-women"
},

  "prada-sps06y": {
    "id": "prada-sps06y",
    "title": "PRADA Linea Rossa Men Sunglasses SPS 06Y Gradient Grey Polarized Sport",
    "brand": "Prada",
    "category": "Eyewear",
    "department": "Fashion Accessories",
    "price": 897,
    "originalPrice": 1830,
    "discount": "50.98% OFF",
    "rating": 4.7,
    "ratingCount": 1520,
    "imageUrl": "/banners/eyewear-prada-sps06y.png",
    "galleryImages": [
        "/banners/eyewear-prada-sps06y.png",
        "/banners/eyewear-lacoste-l6071s.png"
    ],
    "description": "Prada Linea Rossa sporty wrap design with signature red racing stripe on temples. Impact resistant hydrophobic polarized lenses.",
    "bulletPoints": [
        "Iconic Prada Linea Rossa red stripe temple branding",
        "High performance TR90 nylon ultra-durable frame",
        "Hydrophobic and oleophobic smudge resistant coating",
        "Wraparound sport aerodynamics for active wear"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Luxury Sport",
    "specs": [
        {
            "label": "Frame Material",
            "value": "TR90 Grilamid Nylon"
        },
        {
            "label": "Lens Type",
            "value": "Impact-Resistant Polycarbonate Polarized"
        },
        {
            "label": "UV Filter",
            "value": "Category 3 UV400 (100% UV)"
        },
        {
            "label": "Origin",
            "value": "Made in Italy"
        }
    ],
    "slug": "prada-sps06y"
},

  "lacoste-l6071s": {
    "id": "lacoste-l6071s",
    "title": "LACOSTE Unisex Sunglasses L6071S Gradient Brown Lightweight Square Frame",
    "brand": "Lacoste",
    "category": "Eyewear",
    "department": "Fashion Accessories",
    "price": 676,
    "originalPrice": 1380,
    "discount": "51.01% OFF",
    "rating": 4.5,
    "ratingCount": 890,
    "imageUrl": "/banners/eyewear-lacoste-l6071s.png",
    "galleryImages": [
        "/banners/eyewear-lacoste-l6071s.png",
        "/banners/eyewear-tommy-women.png"
    ],
    "description": "Timeless classic square design featuring embossed Lacoste green crocodile emblem and gradient warm tint lenses.",
    "bulletPoints": [
        "Lightweight comfortable everyday silhouette",
        "Subtle crocodile emblem on both temples",
        "Anti-scratch coated gradient lenses",
        "100% UVA & UVB protection"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "50% Off",
    "specs": [
        {
            "label": "Shape",
            "value": "Modern Square"
        },
        {
            "label": "UV Protection",
            "value": "100% UV400"
        },
        {
            "label": "Fit",
            "value": "Standard Unisex"
        }
    ],
    "slug": "lacoste-l6071s"
},

  "oms-10piece": {
    "id": "oms-10piece",
    "title": "OMS 10-Piece Premium Stainless Steel Cookware Set with Glass Lids Induction Safe",
    "brand": "OMS",
    "category": "Cookware Sets",
    "department": "Kitchen & Dining",
    "price": 375,
    "originalPrice": 689,
    "discount": "45.57% OFF",
    "rating": 4.7,
    "ratingCount": 1650,
    "imageUrl": "/banners/cookware-oms-10piece.png",
    "galleryImages": [
        "/banners/cookware-oms-10piece.png",
        "/banners/cookware-oms-9piece-black.png"
    ],
    "description": "Complete professional kitchen suite crafted from 18/10 surgical grade stainless steel with impact-bonded encapsulated aluminum base.",
    "bulletPoints": [
        "10 Essential kitchen pieces: Casseroles, saucepan & frypan",
        "18/10 heavy-gauge stainless steel construction",
        "Impact-bonded 3-ply thermal distribution base",
        "Oven safe up to 260°C and dishwasher safe"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow by 11 AM",
    "tag": "Kitchen Master",
    "specs": [
        {
            "label": "Pieces in Set",
            "value": "10 Pieces (4 Pots, 1 Pan, 5 Lids)"
        },
        {
            "label": "Material",
            "value": "18/10 Surgical Stainless Steel"
        },
        {
            "label": "Base",
            "value": "Impact Bonded 3-Ply Capsule Base"
        },
        {
            "label": "Compatibility",
            "value": "Induction, Gas, Electric, Ceramic, Halogen"
        }
    ],
    "slug": "oms-10piece"
},

  "oms-9piece-black": {
    "id": "oms-9piece-black",
    "title": "OMS 9-Piece Granitec Non-Stick Cookware Set with 4 Casseroles & Frying Pan Black",
    "brand": "OMS",
    "category": "Cookware Sets",
    "department": "Kitchen & Dining",
    "price": 319,
    "originalPrice": 614,
    "discount": "48.05% OFF",
    "rating": 4.6,
    "ratingCount": 1120,
    "imageUrl": "/banners/cookware-oms-9piece-black.png",
    "galleryImages": [
        "/banners/cookware-oms-9piece-black.png",
        "/banners/cookware-oms-9piece-brown.png"
    ],
    "description": "Multi-layered German Granitec stone non-stick coating allows healthy cooking with zero oil or butter. Scratch resistant.",
    "bulletPoints": [
        "German granite non-stick coating 7-layer system",
        "Includes 4 deep casseroles + matching glass lids + 1 frypan",
        "Ergonomic stay-cool silicone coated handles",
        "Easy wipe-clean non-porous interior"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Best Seller",
    "specs": [
        {
            "label": "Coating",
            "value": "German Multi-Layer Granitec Stone"
        },
        {
            "label": "PFOA Free",
            "value": "100% Free of PFOA, Lead & Cadmium"
        },
        {
            "label": "Set Pieces",
            "value": "9 Pieces"
        }
    ],
    "slug": "oms-9piece-black"
},

  "oms-9piece-brown": {
    "id": "oms-9piece-brown",
    "title": "OMS 9-Piece Granitec Non-Stick Cookware Set with Glass Lids Warm Brown Copper",
    "brand": "OMS",
    "category": "Cookware Sets",
    "department": "Kitchen & Dining",
    "price": 399,
    "originalPrice": 689,
    "discount": "42.09% OFF",
    "rating": 4.8,
    "ratingCount": 890,
    "imageUrl": "/banners/cookware-oms-9piece-brown.png",
    "galleryImages": [
        "/banners/cookware-oms-9piece-brown.png",
        "/banners/cookware-oms-10piece.png"
    ],
    "description": "Warm rustic brown copper finish with heat-retaining die-cast aluminum body and steam-vented tempered safety glass lids.",
    "bulletPoints": [
        "Warm brown granite non-stick luxury aesthetic",
        "Uniform edge-to-edge heat distribution",
        "Thick 4.5mm die-cast aluminum rim",
        "Steam-release tempered glass covers"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Top Choice",
    "specs": [
        {
            "label": "Color",
            "value": "Warm Brown Copper"
        },
        {
            "label": "Pieces",
            "value": "9 Pieces"
        },
        {
            "label": "Dishwasher Safe",
            "value": "Yes"
        }
    ],
    "slug": "oms-9piece-brown"
},

  "acm-gel": {
    "id": "acm-gel",
    "title": "ACM Gel Nettoyant Cleansing Gel 200ml Gentle Purifying Face Wash",
    "brand": "ACM Laboratoire",
    "category": "Skincare",
    "department": "Beauty & Personal Care",
    "price": 54,
    "originalPrice": 67.5,
    "discount": "20% OFF",
    "rating": 4.7,
    "ratingCount": 1250,
    "imageUrl": "/banners/skincare-acm-gel.png",
    "galleryImages": [
        "/banners/skincare-acm-gel.png",
        "/banners/skincare-anua-heartleaf.png"
    ],
    "description": "Dermatologist-formulated gentle purifying cleansing gel that cleanses pores, removes excess sebum, and respects the natural skin barrier.",
    "bulletPoints": [
        "Soap-free physiological pH gentle formula",
        "Regulates excess sebum without over-drying",
        "Enriched with soothing zinc and copper PCA",
        "Hypoallergenic and non-comedogenic"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Derm Approved",
    "specs": [
        {
            "label": "Skin Type",
            "value": "Oily, Combination & Sensitive"
        },
        {
            "label": "Volume",
            "value": "200 ml"
        },
        {
            "label": "Key Ingredients",
            "value": "Zinc PCA, Copper PCA, Glycerin"
        },
        {
            "label": "Country of Origin",
            "value": "France"
        }
    ],
    "slug": "acm-gel"
},

  "anua-heartleaf": {
    "id": "anua-heartleaf",
    "title": "Anua Heartleaf Pore Control Cleansing Oil Mild 200ml Korean Skincare",
    "brand": "Anua",
    "category": "Skincare",
    "department": "Beauty & Personal Care",
    "price": 65,
    "originalPrice": 89,
    "discount": "26.97% OFF",
    "rating": 4.8,
    "ratingCount": 3410,
    "imageUrl": "/banners/skincare-anua-heartleaf.png",
    "galleryImages": [
        "/banners/skincare-anua-heartleaf.png",
        "/banners/skincare-medicube-pdrn.png"
    ],
    "description": "Viral K-Beauty pore-melting cleansing oil infused with calming Heartleaf extract. Effortlessly dissolves waterproof makeup and blackheads.",
    "bulletPoints": [
        "10,000ppm soothing Heartleaf extract",
        "Gentle non-comedogenic oil formulation",
        "Dissolves stubborn blackheads and sebum plugs",
        "Leaves zero greasy residue after water rinse"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "K-Beauty Viral",
    "specs": [
        {
            "label": "Volume",
            "value": "200 ml"
        },
        {
            "label": "Hero Ingredient",
            "value": "Houttuynia Cordata (Heartleaf) Extract"
        },
        {
            "label": "Skin Benefit",
            "value": "Blackhead removal & Pore cleansing"
        }
    ],
    "slug": "anua-heartleaf"
},

  "medicube-pdrn": {
    "id": "medicube-pdrn",
    "title": "Medicube PDRN Pink Peptide Serum 1.01 Fl.Oz (30ml) Anti-Aging Firming",
    "brand": "Medicube",
    "category": "Skincare",
    "department": "Beauty & Personal Care",
    "price": 42,
    "originalPrice": 58.8,
    "discount": "28.57% OFF",
    "rating": 4.6,
    "ratingCount": 890,
    "imageUrl": "/banners/skincare-medicube-pdrn.png",
    "galleryImages": [
        "/banners/skincare-medicube-pdrn.png",
        "/banners/skincare-acm-gel.png"
    ],
    "description": "Clinical firming ampoule featuring Salmon PDRN DNA and multi-peptides to stimulate collagen regeneration and firm sagging skin.",
    "bulletPoints": [
        "Salmon DNA PDRN cellular repair technology",
        "Pink Vitamin B12 + 5 Multi-Peptide Complex",
        "Improves skin elasticity and fine line firmness",
        "Glass skin radiant finish without stickiness"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Clinical Grade",
    "specs": [
        {
            "label": "Volume",
            "value": "30 ml (1.01 Fl. Oz.)"
        },
        {
            "label": "Target Concern",
            "value": "Loss of firmness, fine lines, dullness"
        },
        {
            "label": "Active Ingredients",
            "value": "Salmon PDRN, Niacinamide, Cyanocobalamin"
        }
    ],
    "slug": "medicube-pdrn"
},

  "vaux-joggers": {
    "id": "vaux-joggers",
    "title": "Vaux Joggers 26 Inch Fat Tire Mountain Bike with 21-Speed Shimano Gears",
    "brand": "Vaux",
    "category": "Bicycles",
    "department": "Sports & Outdoors",
    "price": 1056,
    "originalPrice": 1569,
    "discount": "32.70% OFF",
    "rating": 4.6,
    "ratingCount": 780,
    "imageUrl": "/banners/outdoor-vaux-joggers.png",
    "galleryImages": [
        "/banners/outdoor-vaux-joggers.png",
        "/banners/outdoor-vaux-max16.png"
    ],
    "description": "All-terrain beast featuring 4-inch wide fat tires, dual mechanical disc brakes, front suspension lock, and Shimano 21-speed thumb shifters.",
    "bulletPoints": [
        "4.0-inch ultra-wide fat tires for snow, sand & rocky trails",
        "Shimano Tourney 21-speed drivetrain gears",
        "Dual front and rear high-stopping disc brakes",
        "Lightweight high-tensile carbon alloy frame"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow (Free doorstep assembly available)",
    "tag": "Outdoor Best",
    "specs": [
        {
            "label": "Wheel Size",
            "value": "26 Inches x 4.0 Fat Tire"
        },
        {
            "label": "Gears",
            "value": "21-Speed Shimano Tourney"
        },
        {
            "label": "Frame Material",
            "value": "High-Tensile Carbon Steel"
        },
        {
            "label": "Brakes",
            "value": "Dual Mechanical Disc Brakes (160mm)"
        }
    ],
    "slug": "vaux-joggers"
},

  "neobreez-stroller": {
    "id": "neobreez-stroller",
    "title": "Neobreez Vomx1 Ultra Lightweight Stroller Olive Compact One-Hand Auto-Fold",
    "brand": "Neobreez",
    "category": "Baby Gear",
    "department": "Baby Products",
    "price": 369,
    "originalPrice": 649,
    "discount": "43.14% OFF",
    "rating": 4.7,
    "ratingCount": 650,
    "imageUrl": "/banners/babygear-neobreez-stroller.png",
    "galleryImages": [
        "/banners/babygear-neobreez-stroller.png",
        "/banners/babygear-littleangel-walker.png"
    ],
    "description": "Cabin-approved travel stroller featuring auto gravity-fold in 1 second. Multi-position recline, UV50+ canopy, and smooth all-wheel shock absorbers.",
    "bulletPoints": [
        "One-second gravity auto-fold with carry handle",
        "Airplane cabin size compliant lightweight 6.2kg frame",
        "Multi-position step-less backrest recline for newborns to toddlers",
        "5-point magnetic harness with bumper bar"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "tag": "Travel Pick",
    "specs": [
        {
            "label": "Stroller Weight",
            "value": "6.2 kg"
        },
        {
            "label": "Maximum Child Weight",
            "value": "22 kg (Newborn to 4 Years)"
        },
        {
            "label": "Fold Mechanism",
            "value": "One-Touch Auto Gravity Fold"
        },
        {
            "label": "Cabin Approved",
            "value": "Yes (IATA standards)"
        }
    ],
    "slug": "neobreez-stroller"
},


  "vaux-max16": {
    "id": "vaux-max16",
    "title": "Vaux Max 16 Kids Bicycle, Sturdy Steel Frame, Dual Caliper Brakes",
    "brand": "Vaux",
    "category": "Bicycles",
    "department": "Sports & Outdoors",
    "price": 268,
    "originalPrice": 397,
    "discount": "32.49% OFF",
    "rating": 4.4,
    "ratingCount": 520,
    "imageUrl": "/banners/outdoor-vaux-max16.png",
    "galleryImages": [
        "/banners/outdoor-vaux-max16.png",
        "/banners/outdoor-vaux-royal16.png"
    ],
    "description": "Built for young riders learning to master balancing. Heavy-duty training wheels and anti-skid pneumatic tires.",
    "bulletPoints": [
        "Durable carbon-steel child frame",
        "Enclosed full-cover chain guard for safety",
        "Dual front and rear hand caliper brakes",
        "Removable quick-adjust training balance wheels"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Wheel Size",
            "value": "16 Inches"
        },
        {
            "label": "Age Group",
            "value": "4 - 7 Years"
        },
        {
            "label": "Brakes",
            "value": "Dual Caliper Brakes"
        }
    ],
    "slug": "vaux-max16"
},

  "vaux-royal16": {
    "id": "vaux-royal16",
    "title": "Vaux Royal 16 Inch Kids Bike with Training Wheels, Front Basket & Bell",
    "brand": "Vaux",
    "category": "Bicycles",
    "department": "Sports & Outdoors",
    "price": 317,
    "originalPrice": 469,
    "discount": "32.41% OFF",
    "rating": 4.3,
    "ratingCount": 410,
    "imageUrl": "/banners/outdoor-vaux-royal16.png",
    "galleryImages": [
        "/banners/outdoor-vaux-royal16.png",
        "/banners/outdoor-vaux-max16.png"
    ],
    "description": "Classic Royal cruiser bike for kids with front woven wicker-style basket, colorful frame, and cushioned saddle.",
    "bulletPoints": [
        "Charming classic vintage design with handlebar bell",
        "Deep tread pneumatic rubber tires",
        "Quick-release adjustable seat post height"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Wheel Size",
            "value": "16 Inches"
        },
        {
            "label": "Accessories",
            "value": "Front Basket, Bell, Mudguards"
        }
    ],
    "slug": "vaux-royal16"
},

  "vaux-starlette": {
    "id": "vaux-starlette",
    "title": "Vaux Starlette 24 Inch Girls Hybrid Bicycle with Multi-Speed Shifter",
    "brand": "Vaux",
    "category": "Bicycles",
    "department": "Sports & Outdoors",
    "price": 379,
    "originalPrice": 569,
    "discount": "33.39% OFF",
    "rating": 4.6,
    "ratingCount": 380,
    "imageUrl": "/banners/outdoor-vaux-starlette.png",
    "galleryImages": [
        "/banners/outdoor-vaux-starlette.png",
        "/banners/outdoor-vaux-joggers.png"
    ],
    "description": "Smooth rolling city and park cruiser with lightweight step-through frame and comfort ergonomic grips.",
    "bulletPoints": [
        "Easy mount and dismount step-through alloy frame",
        "Shimano 7-speed easy twist shifter",
        "Front suspension fork absorbs pavement bumps"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Wheel Size",
            "value": "24 Inches"
        },
        {
            "label": "Gears",
            "value": "7-Speed Shimano RevoShift"
        }
    ],
    "slug": "vaux-starlette"
},

  "mogoo-florida": {
    "id": "mogoo-florida",
    "title": "Mogoo Florida 26 Inch Alloy City Cruiser Bicycle with Rear Rack",
    "brand": "Mogoo",
    "category": "Bicycles",
    "department": "Sports & Outdoors",
    "price": 389,
    "originalPrice": 580,
    "discount": "32.93% OFF",
    "rating": 4.5,
    "ratingCount": 490,
    "imageUrl": "/banners/outdoor-mogoo-florida.png",
    "galleryImages": [
        "/banners/outdoor-mogoo-florida.png"
    ],
    "description": "Urban commuting bicycle with upright relaxed riding geometry, integrated luggage carrier, and full coverage mudguards.",
    "bulletPoints": [
        "6061 heat-treated aluminum alloy frame",
        "Integrated heavy-duty cargo rear rack",
        "Smooth 700c hybrid all-weather tires"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Wheel Size",
            "value": "26 Inches"
        },
        {
            "label": "Frame",
            "value": "Aluminum Alloy 6061"
        }
    ],
    "slug": "mogoo-florida"
},

  "outdoor-road-bike": {
    "id": "outdoor-road-bike",
    "title": "Vaux Aero Race 700C Lightweight Drop Bar Road Bike 14-Speed",
    "brand": "Vaux",
    "category": "Bicycles",
    "department": "Sports & Outdoors",
    "price": 499,
    "originalPrice": 749,
    "discount": "33.38% OFF",
    "rating": 4.7,
    "ratingCount": 320,
    "imageUrl": "/banners/outdoor-road-bike.jpg",
    "galleryImages": [
        "/banners/outdoor-road-bike.jpg"
    ],
    "description": "Built for paved speed with aerodynamically streamlined tubing, dual pivot caliper brakes, and Shimano gearset.",
    "bulletPoints": [
        "Aerodynamic lightweight aluminum road frame",
        "Shimano Tourney 14-speed road groupset",
        "High-pressure 700x25c slick road racing tires"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Wheel Size",
            "value": "700C"
        },
        {
            "label": "Speeds",
            "value": "14-Speed Shimano"
        }
    ],
    "slug": "outdoor-road-bike"
},

  "outdoor-fixie-bike": {
    "id": "outdoor-fixie-bike",
    "title": "Vaux Urban Fixie Single Speed Track Bicycle Deep Dish Wheels",
    "brand": "Vaux",
    "category": "Bicycles",
    "department": "Sports & Outdoors",
    "price": 319,
    "originalPrice": 479,
    "discount": "33.40% OFF",
    "rating": 4.4,
    "ratingCount": 290,
    "imageUrl": "/banners/outdoor-fixie-bike.jpg",
    "galleryImages": [
        "/banners/outdoor-fixie-bike.jpg"
    ],
    "description": "Minimalist urban single-speed with flip-flop rear hub allowing quick switch between fixed gear and freewheel.",
    "bulletPoints": [
        "Flip-flop hub: Ride fixed gear or freewheel coasting",
        "Deep dish 40mm aerodynamic color rims",
        "Front and rear Promax alloy caliper brakes"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Wheel Size",
            "value": "700C x 28mm"
        },
        {
            "label": "Gearing",
            "value": "Single Speed / Fixed Gear"
        }
    ],
    "slug": "outdoor-fixie-bike"
},

  "outdoor-hybrid-bike": {
    "id": "outdoor-hybrid-bike",
    "title": "Vaux Hybrid Explorer 28 Inch All-Weather Commuter Bike",
    "brand": "Vaux",
    "category": "Bicycles",
    "department": "Sports & Outdoors",
    "price": 429,
    "originalPrice": 649,
    "discount": "33.90% OFF",
    "rating": 4.5,
    "ratingCount": 340,
    "imageUrl": "/banners/outdoor-hybrid-bike.jpg",
    "galleryImages": [
        "/banners/outdoor-hybrid-bike.jpg"
    ],
    "description": "The best of road speed and mountain bike versatility with wide puncture-resistant tires and front suspension lock.",
    "bulletPoints": [
        "Lightweight hydroformed alloy hybrid frame",
        "Shimano 21-speed thumb trigger gear shifters",
        "Mechanical dual disc brakes for wet weather stopping"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Wheel Size",
            "value": "28 Inches (700C)"
        },
        {
            "label": "Suspension",
            "value": "Front Alloy Suspension Fork"
        }
    ],
    "slug": "outdoor-hybrid-bike"
},

  "corelle": {
    "id": "corelle",
    "title": "Corelle 16-Piece Vitrelle Glass Dinnerware Set Chip & Break Resistant",
    "brand": "Corelle",
    "category": "Kitchen & Dining",
    "department": "Home & Kitchen",
    "price": 389,
    "originalPrice": 489,
    "discount": "up to 20% Off",
    "rating": 4.9,
    "ratingCount": 2890,
    "imageUrl": "/banners/deal-corelle.png",
    "galleryImages": [
        "/banners/deal-corelle.png"
    ],
    "description": "Triple-layer strong Vitrelle glass dinnerware proudly made in USA. Ultra-hygienic non-porous and microwave, oven, dishwasher safe.",
    "bulletPoints": [
        "Triple-layer Vitrelle glass resists chips and cracks",
        "Lightweight, thin profile stacks compactly",
        "Ultra-hygienic non-porous and easy to clean",
        "100% Microwave, oven and dishwasher safe"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Pieces",
            "value": "16 Pieces (4 Dinner, 4 Salad, 4 Bowls, 4 Mugs)"
        },
        {
            "label": "Material",
            "value": "Patented Vitrelle 3-Layer Glass"
        },
        {
            "label": "Origin",
            "value": "Made in USA"
        }
    ],
    "slug": "corelle"
},

  "ingenuity": {
    "id": "ingenuity",
    "title": "Ingenuity Baby Base 2-in-1 Booster Seat with Cleanable Feeding Tray",
    "brand": "Ingenuity",
    "category": "Baby Gear",
    "department": "Baby Products",
    "price": 189,
    "originalPrice": 289,
    "discount": "up to 35% Off",
    "rating": 4.8,
    "ratingCount": 1780,
    "imageUrl": "/banners/deal-ingenuity.png",
    "galleryImages": [
        "/banners/deal-ingenuity.png"
    ],
    "description": "Easily attaches to dining chairs so your baby can sit up higher and see more during family dinners. Soft foam insert removes as baby grows.",
    "bulletPoints": [
        "Wipes clean easily and includes dishwasher-safe tray",
        "Safety harness keeps baby secured",
        "Removable foam insert grows with baby into toddler years"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Age Range",
            "value": "6 Months to 3 Years"
        },
        {
            "label": "Weight Limit",
            "value": "Up to 15 kg"
        }
    ],
    "slug": "ingenuity"
},

  "acm": {
    "id": "acm",
    "title": "ACM Laboratoire Dermatologique Complete Skincare Purifying Kit",
    "brand": "ACM",
    "category": "Skincare",
    "department": "Beauty & Personal Care",
    "price": 145,
    "originalPrice": 260,
    "discount": "up to 45% Off",
    "rating": 4.7,
    "ratingCount": 1420,
    "imageUrl": "/banners/deal-acm.png",
    "galleryImages": [
        "/banners/deal-acm.png",
        "/banners/skincare-acm-gel.png"
    ],
    "description": "Complete dermatological solution for clear, refined, and blemish-free skin with soothing French thermal minerals.",
    "bulletPoints": [
        "Includes cleansing gel, soothing lotion and sebum-regulating cream",
        "Formulated in France by leading dermatologists",
        "Non-comedogenic and hypoallergenic"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Kit Items",
            "value": "3 Full Size Products"
        },
        {
            "label": "Origin",
            "value": "France"
        }
    ],
    "slug": "acm"
},

  "seiko": {
    "id": "seiko",
    "title": "Seiko 5 Sports Automatic Stainless Steel Watch Black Dial Day-Date",
    "brand": "Seiko",
    "category": "Watches",
    "department": "Men's Watches",
    "price": 1499,
    "originalPrice": 2299,
    "discount": "up to 35% Off",
    "rating": 4.8,
    "ratingCount": 3120,
    "imageUrl": "/banners/deal-seiko.png",
    "galleryImages": [
        "/banners/deal-seiko.png",
        "/banners/watch-seiko-chrono.jpg"
    ],
    "description": "Legendary Seiko 5 reliability powered by automatic Calibre 4R36 with manual winding and hacking seconds capability.",
    "bulletPoints": [
        "In-house Calibre 4R36 Automatic Movement (24 Jewels)",
        "100-meter water resistance with exhibition case back",
        "LumiBrite hands and markers glow brightly in low light"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Movement",
            "value": "Seiko 4R36 Automatic"
        },
        {
            "label": "Case Diameter",
            "value": "42.5 mm"
        },
        {
            "label": "Water Resistance",
            "value": "100 Meters"
        }
    ],
    "slug": "seiko"
},

  "s26-ultra": {
    "id": "s26-ultra",
    "title": "Samsung Galaxy S26 Ultra 5G AI Flagship (256GB Titanium Emerald)",
    "brand": "Samsung",
    "category": "Smartphones",
    "department": "Electronics & Mobiles",
    "price": 3649,
    "originalPrice": 4749,
    "discount": "23% off",
    "rating": 4.9,
    "ratingCount": 1980,
    "imageUrl": "/banners/lowest-s26-ultra.jpg",
    "galleryImages": [
        "/banners/lowest-s26-ultra.jpg"
    ],
    "description": "Next-generation Galaxy AI flagship featuring 200MP Quad Camera with spatial audio zoom, Snapdragon 8 Elite, and built-in S-Pen.",
    "bulletPoints": [
        "Snapdragon 8 Elite 3nm high performance processor",
        "200MP Quad ProVisual AI camera system",
        "Integrated ultra-responsive Bluetooth S-Pen",
        "5000mAh battery with 45W superfast charging"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow by 11 AM",
    "specs": [
        {
            "label": "Display",
            "value": "6.8-inch Dynamic AMOLED 2X 120Hz"
        },
        {
            "label": "Processor",
            "value": "Snapdragon 8 Elite"
        },
        {
            "label": "Storage",
            "value": "256 GB NVMe"
        }
    ],
    "slug": "s26-ultra"
},

  "elitebook": {
    "id": "elitebook",
    "title": "HP EliteBook 840 G5 Enterprise Business Laptop Core i5 16GB RAM 256GB SSD",
    "brand": "HP",
    "category": "Laptops",
    "department": "Computers & Accessories",
    "price": 779,
    "originalPrice": 1015,
    "discount": "23% off",
    "rating": 4.5,
    "ratingCount": 890,
    "imageUrl": "/banners/lowest-elitebook.jpg",
    "galleryImages": [
        "/banners/lowest-elitebook.jpg"
    ],
    "description": "Enterprise durability crafted in full aluminum unibody. Includes Bang & Olufsen premium audio, fingerprint security, and backlit keyboard.",
    "bulletPoints": [
        "Intel Core i5 Quad-Core high efficiency processor",
        "16GB DDR4 High-Speed RAM for seamless multitasking",
        "256GB PCIe NVMe ultra-fast SSD storage",
        "Full HD 14.0-inch Anti-Glare IPS display"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Processor",
            "value": "Intel Core i5-8350U"
        },
        {
            "label": "RAM",
            "value": "16 GB DDR4"
        },
        {
            "label": "Storage",
            "value": "256 GB PCIe NVMe SSD"
        },
        {
            "label": "Screen",
            "value": "14.0\" FHD 1920x1080 IPS"
        }
    ],
    "slug": "elitebook"
},

  "a56-5g": {
    "id": "a56-5g",
    "title": "Samsung Galaxy A56 5G (256GB Awesome Mint) 120Hz Super AMOLED",
    "brand": "Samsung",
    "category": "Smartphones",
    "department": "Electronics & Mobiles",
    "price": 1443,
    "originalPrice": 1875,
    "discount": "23% off",
    "rating": 4.6,
    "ratingCount": 1650,
    "imageUrl": "/banners/lowest-a56.jpg",
    "galleryImages": [
        "/banners/lowest-a56.jpg"
    ],
    "description": "Versatile powerhouse with 50MP OIS triple camera, IP67 water and dust resistance, and 4 generations of Android OS upgrades.",
    "bulletPoints": [
        "6.6-inch Super AMOLED 120Hz vivid display",
        "50MP Main with Optical Image Stabilization (OIS)",
        "IP67 dust and water resistance certified",
        "5000mAh 2-day battery life"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow",
    "specs": [
        {
            "label": "Display",
            "value": "6.6\" Super AMOLED 120Hz"
        },
        {
            "label": "Camera",
            "value": "50MP OIS + 12MP + 5MP"
        },
        {
            "label": "Battery",
            "value": "5000 mAh"
        }
    ],
    "slug": "a56-5g"
},

  "iphone-17": {
    "id": "iphone-17",
    "title": "Apple iPhone 17 Pro Max (256GB, Cosmic Orange) - Titanium 5G",
    "brand": "Apple",
    "category": "Smartphones",
    "department": "Electronics & Mobiles",
    "price": 4899,
    "originalPrice": 6369,
    "discount": "23% off",
    "rating": 4.9,
    "ratingCount": 2420,
    "imageUrl": "/banners/lowest-iphone17.jpg",
    "galleryImages": [
        "/banners/lowest-iphone17.jpg"
    ],
    "description": "Groundbreaking design featuring Apple A19 Pro silicon, revolutionary telephoto zoom, and all-day battery efficiency.",
    "bulletPoints": [
        "Apple A19 Pro Bionic processor",
        "48MP Fusion Triple Camera with 5x Optical Zoom",
        "Super Retina XDR with ProMotion 120Hz",
        "Aerospace Grade Titanium with textured matte glass"
    ],
    "inStock": true,
    "isPrimeEligible": true,
    "deliveryDate": "Tomorrow by 11 AM",
    "specs": [
        {
            "label": "Display",
            "value": "6.9\" Super Retina XDR OLED"
        },
        {
            "label": "Processor",
            "value": "Apple A19 Pro"
        },
        {
            "label": "Storage",
            "value": "256 GB NVMe"
        }
    ],
    "slug": "iphone-17"
},

};