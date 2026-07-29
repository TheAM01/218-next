// import ProductCard from "@/components/cards/ProductCard";
import ProductDetail from "@/components/cards/ProductDetail";
import { products } from "@/lib/products";
import { Metadata } from "next";

interface ProductDetailsPageProps {
    params: Promise<{
        productId: string;
    }>
}

export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
    const { productId } = await params;

    const product = products.find(p => p.id === productId);

    return {
        title: {
            absolute: `Buy ${product?.title}`
        },
    }
}



export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {

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
