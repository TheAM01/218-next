"use client";

import { Product } from "@/types/product";
import ProductCard from "@/components/cards/ProductCard";
import { useState } from "react";
import {
	useRouter,
	usePathname,
	useSearchParams,
} from "next/navigation";

interface ProductGridProps {
	products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [query, setQuery] = useState(searchParams.get("q") ?? "");

	function updateParam(key: string, value: string) {
		const params = new URLSearchParams(searchParams.toString());

		if (value.trim()) {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		router.push(`${pathname}?${params.toString()}`);
	}

	return (
		<>
			<div className="flex flex-wrap gap-2 py-4">
				<input
					type="text"
					placeholder="Search our store..."
					className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							updateParam("q", query);
						}
					}}
				/>

				<button
					onClick={() => updateParam("q", query)}
					className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
				>
					Search
				</button>

				<select
					className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
					defaultValue={searchParams.get("brand") ?? ""}
					onChange={(e) => updateParam("brand", e.target.value)}
				>
					<option value="">All</option>
					{[...new Set(products.map((p) => p.brand))].map((brand) => (
						<option key={brand} value={brand}>
							{brand}
						</option>
					))}
				</select>

				<select
					className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
					defaultValue={searchParams.get("sort") ?? ""}
					onChange={(e) => updateParam("sort", e.target.value)}
				>
					<option value="">Sort By</option>
					<option value="title">Title</option>
					<option value="price">Price</option>
				</select>

				<select
					className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
					defaultValue={searchParams.get("order") ?? "asc"}
					onChange={(e) => updateParam("order", e.target.value)}
				>
					<option value="asc">Ascending</option>
					<option value="desc">Descending</option>
				</select>
			</div>

			<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>
	);
}