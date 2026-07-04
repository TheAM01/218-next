export function Stars({ value }: { value: number }) {
    return (
        <span
            className="inline-flex"
            aria-label={`${value.toFixed(1)} out of 5 stars`}
        >
            {Array.from({ length: 5 }).map((_, i) => {
                const filled = i + 1 <= Math.round(value);
                return (
                    <svg
                        key={i}
                        viewBox="0 0 20 20"
                        className={`h-4 w-4 ${filled ? "fill-amber-400" : "fill-zinc-200"}`}
                        aria-hidden="true"
                    >
                        <path d="M10 1.5l2.6 5.3 5.9.86-4.25 4.14 1 5.87L10 15.9l-5.25 2.77 1-5.87L1.5 7.66l5.9-.86L10 1.5z" />
                    </svg>
                );
            })}
        </span>
    );
}
