import ProductDashboardClient from "./ProductDashboardClient";
import { products } from "@/lib/products";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/authMiddleware";

export default async function ProductDashboardPage() {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    // const {data: products}: { data: Product[] } = await res.json();

    const isLoggedIn = requireAuth();

    if (!isLoggedIn) {
        return redirect("/login?login-first=true");
    }

    return <ProductDashboardClient products={products} />
}