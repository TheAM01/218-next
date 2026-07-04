import ReviewCard from "@/components/cards/ReviewCard";
import { products } from "@/lib/products";


export default async function ProductPage({ params }: { params: Promise<{ productId: string; reviewId: string; }> }) {

    const { productId, reviewId } = await params;

    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <main>
                No product found with ID: {productId}
            </main>
        );
    }

    const review = product.reviews[parseInt(reviewId)];

    if (!review) {
        return (
            <main>
                No review found with ID: {reviewId}
            </main>
        );
    }

    return (
        <main>
            <section className="max-w-5xl mx-auto">
                <ReviewCard review={review} />
            </section>
        </main>
    )
}
