import { Product } from "@/types/product";
import Link from "next/link";
import { averageStars } from "@/utils/product-utils";
import { Stars } from "@/components/cards/Stars";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const avg = averageStars(product.reviews);

    return (
        <Link
            href={`/products/${product.id}`}
            className="group flex w-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-left transition hover:border-zinc-900 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
        >
            <div className=" relative aspect-square overflow-hidden bg-zinc-100">
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-zinc-700 backdrop-blur">
                    {product.brand}
                </span>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-semibold text-zinc-900">{product.title}</h3>

                <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                    <Stars value={avg} />
                    <span className="tabular-nums">{avg.toFixed(1)}</span>
                    <span className="text-zinc-300">·</span>
                    <span>
                        {product.reviews.length}{" "}
                        {product.reviews.length === 1 ? "review" : "reviews"}
                    </span>
                </div>

                <div className="mt-auto pt-2">
                    <span className="text-lg font-bold tabular-nums text-zinc-900">
                        ${product.price}
                    </span>
                </div>
            </div>
        </Link>
    );
}
