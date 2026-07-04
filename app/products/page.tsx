import ProductGrid from "@/components/cards/ProductGrid";
import { products } from "@/lib/products";

export default function AllProductsPage() {
    return (
        <main>
            <section className="mx-auto max-w-5xl">
                <ProductGrid products={products} />
            </section>
        </main>
    )
}
