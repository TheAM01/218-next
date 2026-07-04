import { Product, Review } from "@/types/product";

export function averageStars(reviews: Product["reviews"]): number {
    if (reviews.length === 0) return 0;
    return (
        reviews.reduce((sum: number, r: Review) => sum + r.stars, 0) /
        reviews.length
    );
}
