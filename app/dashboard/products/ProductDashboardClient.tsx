"use client";

import { Product } from "@/types/product";
import { useState } from "react";

interface ProductFormData {
    id: string,
    title: string,
    brand: string,
    price: string,
    boxContent: string,
    image: string,
}

export default function ProductDashboardClient({ products }: { products: Product[] }) {

    const [showForm, setShowForm] = useState<boolean>(false);

    const [formData, setFormData] = useState<ProductFormData>({
        id: "",
        title: "",
        brand: "",
        price: "",
        boxContent: "",
        image: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct: Product = {
            id: formData.id,
            title: formData.title,
            brand: formData.brand,
            price: parseFloat(formData.price) || 0,
            boxContent: formData.boxContent
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            image: formData.image,
            reviews: []
        };


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct)
        });

        if (!res.ok) {
            console.error("There was an error while creating the product");
        }


    };

    return (
        <section className="p-6">
            <div className="flex w-full justify-between items-center py-2 my-2">
                <h1 className="text-4xl font-bold">All Products</h1>
                <button
                    className="bg-black px-2 py-1 rounded-lg text-white hover:shadow-md hover:text-gray-300 duration-200 cursor-pointer"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close form" : "Add New +"}
                </button>
            </div>

            {showForm &&
                <NewProductForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            }

            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <ProductsTable products={products} />
            </div>
        </section>
    );
}

function ProductsTable({ products }: { products: Product[] }) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Image
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Brand
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Box Content
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Reviews
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
                {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-12 w-12 rounded-md object-cover"
                            />
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {product.title}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                            {product.brand}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                            ${product.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                            <ul className="list-inside list-disc space-y-0.5">
                                {product.boxContent.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600">
                            {product.reviews.length}
                        </td>
                    </tr>
                ))}
                {products.length === 0 && (
                    <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-400">
                            No products found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

function NewProductForm({
    formData, handleChange, handleSubmit
}: {
    formData: ProductFormData; handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; handleSubmit: (e: React.FormEvent) => void;
}) {
    

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto flex mb-4 flex-col gap-4 rounded-lg border border-gray-200 p-6 shadow-sm"
        >
            <div className="flex flex-col gap-1">
                <label htmlFor="id" className="text-sm font-medium text-gray-700">
                    Product ID
                </label>
                <input
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="brand" className="text-sm font-medium text-gray-700">
                    Brand
                </label>
                <input
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="price" className="text-sm font-medium text-gray-700">
                    Price
                </label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="boxContent" className="text-sm font-medium text-gray-700">
                    Box Content <span className="text-gray-400">(comma separated)</span>
                </label>
                <textarea
                    id="boxContent"
                    name="boxContent"
                    value={formData.boxContent}
                    onChange={handleChange}
                    rows={3}
                    placeholder="e.g. Charger, Manual, Cable"
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="image" className="text-sm font-medium text-gray-700">
                    Image URL
                </label>
                <input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                />
            </div>

            <button
                type="submit"
                className="mt-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
                Add Product
            </button>
        </form>
    );
}