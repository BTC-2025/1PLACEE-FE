export interface SeoArticle {
  title: string;
  description: string;
  keyPoints?: string[];
}

export const CATEGORY_SEO_ARTICLES: Record<string, SeoArticle> = {
  "fresh-fruits": {
    title: "Fresh Fruits Online",
    description: "Order fresh farm-picked seasonal fruits with doorstep delivery.",
  },
  "fresh-vegetables": {
    title: "Fresh Vegetables Online",
    description: "Get farm fresh daily veggies and organic produce delivered fast.",
  },
  "dairy-breakfast": {
    title: "Dairy, Milk & Breakfast Essentials",
    description: "Buy fresh milk, butter, cheese, paneer, and breakfast cereals.",
  },
};

