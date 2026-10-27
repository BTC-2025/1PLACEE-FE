export interface SeoSectionContent {
  title: string;
  intro: string;
  typesOfItems: { title: string; desc: string }[];
  nutritionalTitle?: string;
  nutritionalTable?: { nutrient: string; value: string }[];
  benefitsTitle: string;
  benefits: { title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export const CATEGORY_SEO_ARTICLES: Record<string, SeoSectionContent> = {
  "instant-noodles": {
    title: "Instant Noodles at 1PLACE Blinkit Delivery",
    intro:
      "Instant noodles are pre-cooked noodles, usually sold in individual packets, cups or bowls. Their primary components are flour, starch, water, salt and a tastemaker seasoning sachet. They are beloved across India for their unmatched convenience, ready in just 2 minutes for late-night cravings or fast snacking.",
    typesOfItems: [
      {
        title: "Classic Masala Noodles",
        desc: "The quintessential Indian instant noodles seasoned with aromatic Indian roasted spices, coriander, turmeric, and fenugreek.",
      },
      {
        title: "Atta & Whole Grain Noodles",
        desc: "Made with 100% whole wheat flour (atta) and fortified with dietary fibers and plant proteins for a nutritious twist.",
      },
      {
        title: "Spicy Korean Ramen & Soupy Noodles",
        desc: "Fiery Korean ramen with chili oil and Gochujang style sauces, plus rich Japanese broth-based cup noodles.",
      },
      {
        title: "Hakka & Stir Fry Noodles",
        desc: "Flat or round wheat noodles ideal for wok tossing with cabbage, carrots, bell peppers, and soy sauce.",
      },
    ],
    nutritionalTitle: "Nutritional Values of Noodles (Per 70g serving)",
    nutritionalTable: [
      { nutrient: "Energy / Calories", value: "312 kcal" },
      { nutrient: "Carbohydrates", value: "43.5 g" },
      { nutrient: "Proteins", value: "6.8 g" },
      { nutrient: "Total Fats", value: "12.1 g" },
      { nutrient: "Dietary Fiber", value: "2.4 g" },
      { nutrient: "Sodium", value: "820 mg" },
      { nutrient: "Iron", value: "2.8 mg (18% RDA)" },
    ],
    benefitsTitle: "Benefits of Instant Noodles",
    benefits: [
      {
        title: "Quick & Easy Preparation",
        desc: "Boil water, add the noodle cake and tastemaker, and in 2-3 minutes your hot savory meal is ready.",
      },
      {
        title: "Budget Friendly & Pocket Savvy",
        desc: "Extremely affordable snack option starting from just ₹14, accessible for students, families, and professionals.",
      },
      {
        title: "Highly Customizable",
        desc: "Add your choice of scrambled eggs, cheese slices, fried paneer, or fresh crunchy vegetables for complete nourishment.",
      },
      {
        title: "Long Shelf Life",
        desc: "Dehydrated noodles remain fresh in your pantry for months, making them a dependable quick-commerce staple.",
      },
    ],
    faqs: [
      {
        question: "Are instant noodles delivered within 8-10 minutes on 1PLACE?",
        answer:
          "Yes! 1PLACE quick-commerce partners ensure instant dispatch from local micro-fulfillment centers directly to your doorstep in minutes.",
      },
      {
        question: "How can I make instant noodles healthier?",
        answer:
          "Opt for Atta or Millet noodles, add plenty of steamed vegetables like peas and carrots, and include boiled eggs or grilled paneer for extra protein.",
      },
      {
        question: "What top brands of instant noodles are available?",
        answer:
          "Maggi, Sunfeast YiPPee!, Wai Wai, Nongshim Shin Ramyun, Samyang Buldak, Ching's Secret, and Nissin Cup Noodles.",
      },
    ],
  },
  "fresh-vegetables": {
    title: "Fresh Farm Vegetables Online Delivery",
    intro:
      "Order farm-fresh vegetables directly sourced from local growers. Packed under strict hygienic conditions and delivered within minutes to preserve natural vitamins, hydration, and crispness.",
    typesOfItems: [
      {
        title: "Daily Staples (Onion, Potato, Tomato)",
        desc: "Handpicked premium grade staple kitchen veggies essential for Indian gravies and curries.",
      },
      {
        title: "Green Leafy Veggies",
        desc: "Fresh Palak, Coriander, Methi, and Mint cleaned and pesticide-tested.",
      },
      {
        title: "Exotic Vegetables",
        desc: "Crisp broccoli florets, colored bell peppers, zucchini, and button mushrooms.",
      },
    ],
    nutritionalTitle: "Nutritional Highlights",
    nutritionalTable: [
      { nutrient: "Vitamins", value: "Rich in Vitamin A, C, K" },
      { nutrient: "Fiber", value: "High Dietary Fiber" },
      { nutrient: "Calories", value: "Low calorie density" },
      { nutrient: "Antioxidants", value: "Natural polyphenols" },
    ],
    benefitsTitle: "Why Choose 1PLACE Farm Fresh Vegetables?",
    benefits: [
      {
        title: "Direct Sourced",
        desc: "Picked daily at morning harvest from verified local agricultural partners.",
      },
      {
        title: "Triple Checked Quality",
        desc: "Graded for size, firmness, color, and zero spoilage before dispatch.",
      },
    ],
    faqs: [
      {
        question: "How fresh are the vegetables delivered?",
        answer: "Our dark stores receive fresh farm shipments twice every morning and evening.",
      },
    ],
  },
};
