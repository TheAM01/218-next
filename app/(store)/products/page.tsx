import ProductGrid from "@/components/cards/ProductGrid";
import { products } from "@/lib/products";


interface QueryParams {
    order: string;
    sort: string;
    brand: string;
    q: string;
}

export default async function AllProductsPage({ searchParams }: { searchParams: Promise<QueryParams>}) {

    const { order, sort, brand, } = await searchParams;
    return (
        <main>
            <section className="mx-auto max-w-5xl">
                <ProductGrid products={products} />
            </section>
        </main>
    )
}
