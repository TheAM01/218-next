"use client";


import { Product } from "@/types/product";
import { Stars } from "./Stars";
import { averageStars } from "@/utils/product-utils";

interface ProductDetailProps {
    product: Product;
    onAddToCart?: (id: string) => void;
}

export default function ProductDetail({
    product,
    onAddToCart,
}: ProductDetailProps) {
    const avg = averageStars(product.reviews);

    return (
        <div className="mx-auto max-w-5xl px-4 py-8">
            <div className="grid gap-8 md:grid-cols-2">
                {/* Image */}
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                        src={product.image}
                        alt={product.title}
                        className="aspect-square w-full object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col">
                    <span className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                        {product.brand}
                    </span>
                    <h1 className="mt-1 text-3xl font-bold text-zinc-900">
                        {product.title}
                    </h1>

                    <div className="mt-3 flex items-center gap-2 text-sm text-zinc-600">
                        <Stars value={avg} />
                        <span className="font-medium tabular-nums">
                            {avg.toFixed(1)}
                        </span>
                        <span className="text-zinc-300">·</span>
                        <span>
                            {product.reviews.length}{" "}
                            {product.reviews.length === 1
                                ? "review"
                                : "reviews"}
                        </span>
                    </div>

                    <div className="mt-6 text-4xl font-bold tabular-nums text-zinc-900">
                        ${product.price}
                    </div>

                    <button
                        type="button"
                        onClick={() => onAddToCart?.(product.id)}
                        className="mt-6 w-full rounded-xl bg-zinc-900 px-6 py-3.5 font-semibold text-white transition hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 sm:w-auto"
                    >
                        Add to cart
                    </button>

                    {/* Box contents */}
                    <div className="mt-8">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                            In the box
                        </h2>
                        <ul className="mt-3 space-y-2">
                            {product.boxContent.map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-2.5 text-zinc-700"
                                >
                                    <svg
                                        viewBox="0 0 20 20"
                                        className="h-4 w-4 shrink-0 fill-zinc-900"
                                        aria-hidden="true"
                                    >
                                        <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.29 6.8-6.79a1 1 0 011.9 0z" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <section className="mt-12 border-t border-zinc-200 pt-8">
                <h2 className="text-xl font-bold text-zinc-900">
                    Reviews ({product.reviews.length})
                </h2>

                {product.reviews.length === 0 ? (
                    <p className="mt-4 text-zinc-500">
                        No reviews yet. Be the first to share your thoughts.
                    </p>
                ) : (
                    <ul className="mt-6 space-y-5">
                        {product.reviews.map((review, i) => (
                            <li
                                key={i}
                                className="rounded-xl border border-zinc-200 bg-white p-5"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-zinc-900">
                                        {review.author}
                                    </span>
                                    <Stars value={review.stars} />
                                </div>
                                <p className="mt-2 text-zinc-600">
                                    {review.comment}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
