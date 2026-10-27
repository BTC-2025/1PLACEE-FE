import { ALL_PRODUCTS } from "@/data/allProductsData";
import { DynamicProductClient } from "./DynamicProductClient";

export const dynamicParams = true;

export async function generateStaticParams() {
  return Object.keys(ALL_PRODUCTS).map((slug) => ({
    slug,
  }));
}

export default async function DynamicProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DynamicProductClient slug={slug} />;
}
