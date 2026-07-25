import { Product } from "@/types/product";
import EditProductDashboardClient from "./EditProductDashboardClient";
import { products } from "@/lib/products";

export default async function ProductDashboardPage({ params }: { params: Promise<{ productId: string }>}) {
    const { productId } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`);
    const {product}: { product: Product } = await res.json();


    // const product = products.find(p => p.id === productId);

    if (!product) return (
        <div className="">No product found: {productId}</div>
    )

    return <EditProductDashboardClient product={product} />
}