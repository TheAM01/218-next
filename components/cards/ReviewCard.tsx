import type { Review } from "@/types/product";

interface ReviewCardProps {
    review: Review;
}

const MAX_STARS = 5;

function clampStars(stars: number): number {
    if (Number.isNaN(stars)) return 0;
    return Math.max(0, Math.min(MAX_STARS, Math.round(stars)));
}

function getInitials(author: string): string {
    const parts = author.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "?";
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
    return (first + last).toUpperCase();
}

function StarRating({ value }: { value: number }) {
    const filled = clampStars(value);
    return (
        <div
            className="flex items-center gap-0.5"
            role="img"
            aria-label={`${filled} out of ${MAX_STARS} stars`}
        >
            {Array.from({ length: MAX_STARS }, (_, i) => (
                <svg
                    key={i}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className={`h-4 w-4 ${i < filled ? "fill-amber-400" : "fill-slate-200"}`}
                >
                    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77 4.8 17.5l.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
                </svg>
            ))}
        </div>
    );
}

export function ReviewCard({ review }: ReviewCardProps) {
    const { author, stars, comment } = review;

    return (
        <article className="max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <header className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {getInitials(author)}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                        {author}
                    </p>
                    <StarRating value={stars} />
                </div>
            </header>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {comment}
            </p>
        </article>
    );
}

export default ReviewCard;
