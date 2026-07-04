// "use client";

import { Product } from "@/types/product";
import ProductCard from "@/components/cards/ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products}: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
