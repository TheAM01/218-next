// import ProductCard from "@/components/cards/ProductCard";
import ProductDetail from "@/components/cards/ProductDetail";
import { products } from "@/lib/products";


// http://localhost:3000/products/[productId]/reviews/[reviewId]

export default async function ProductPage({ params }: { params: Promise<{ productId: string; }> }) {

    const { productId } = await params;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <main>
                No product found with ID: {productId}
            </main>
        );
    }

    return (
        <main>
            <section className="max-w-5xl mx-auto">
                <ProductDetail product={product}/>
            </section>
        </main>
    )
}


// http://localhost/product/[productId]/review/[reviewId]
