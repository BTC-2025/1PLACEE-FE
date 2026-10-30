export interface CategoryCarouselSlide {
  id: string;
  categoryTitle: string;
  image: string;
  viewAllHref: string;
}

export const CATEGORY_CAROUSEL_SLIDES: CategoryCarouselSlide[] = [
  {
    id: "mens-fashion",
    categoryTitle: "Men's fashion",
    image: "/categories/mens-fashion-row.png",
    viewAllHref: "/categories?cat=mens-fashion",
  },
  {
    id: "womens-fashion",
    categoryTitle: "Women's fashion",
    image: "/categories/womens-fashion-row.png",
    viewAllHref: "/categories?cat=womens-fashion",
  },
  {
    id: "beauty",
    categoryTitle: "Beauty",
    image: "/categories/beauty-row.png",
    viewAllHref: "/categories?cat=beauty",
  },
  {
    id: "health-nutrition",
    categoryTitle: "Health & nutrition",
    image: "/categories/health-nutrition-row.png",
    viewAllHref: "/categories?cat=health-nutrition",
  },
  {
    id: "grocery",
    categoryTitle: "Grocery",
    image: "/categories/grocery-row.png",
    viewAllHref: "/categories?cat=grocery",
  },
  {
    id: "stationery-office",
    categoryTitle: "Stationery & office supplies",
    image: "/categories/stationery-office-row.png",
    viewAllHref: "/categories?cat=stationery-office",
  },
  {
    id: "books-media",
    categoryTitle: "Books & media",
    image: "/categories/books-media-row.png",
    viewAllHref: "/categories?cat=books-media",
  },
];
