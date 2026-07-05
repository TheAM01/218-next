import ProductGrid from "@/components/cards/ProductGrid";
import { Product } from "@/types/product";
// import { products } from "@/lib/products";


interface QueryParams {
    order?: string;
    sort?: string;
    brand?: string;
    q?: string;
}

export default async function AllProductsPage({ searchParams }: { searchParams: Promise<QueryParams>}) {

    const { order, sort, brand, q } = await searchParams;


    const res = await fetch("http://localhost:3000/api/products");
    const products: Product[] = await res.json();
    let filteredProducts = products;

    if (q) {
        filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(q.toLowerCase()));
    }

    if (brand) {
        filteredProducts = filteredProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }

    if (sort?.toLowerCase() === "price") {
        filteredProducts.sort((a, b) => {
            if (order === "desc") {
                return b.price - a.price;
            }
            return a.price - b.price;
        });
    }

    if (sort?.toLowerCase() === "title") {
        filteredProducts.sort((a, b) => {
            if (order === "desc") {
                if (a.title < b.title) return 1;
                if (a.title > b.title) return -1;
                return 0;
            }

            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
        })
    }

    return (
        <main>
            <section className="mx-auto max-w-5xl">
                <ProductGrid products={filteredProducts} />
            </section>
        </main>
    )
}
