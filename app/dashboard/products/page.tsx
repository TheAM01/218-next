import { Product } from "@/types/product";
import ProductDashboardClient from "./ProductDashboardClient";
import { products } from "@/lib/products";

export default async function ProductDashboardPage() {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    // const {data: products}: { data: Product[] } = await res.json();

    return <ProductDashboardClient products={products} />
}