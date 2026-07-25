"use client";

import { Product } from "@/types/product";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProductFormData {
    id: string,
    title: string,
    brand: string,
    price: string,
    boxContent: string,
    image: string,
}

export default function ProductDashboardClient({ product }: { product: Product }) {

    const router = useRouter();

    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<ProductFormData>({
        id: product.id,
        title: product.title,
        brand: product.brand,
        price: product.price.toString(),
        boxContent: product.boxContent.join(", "),
        image: product.image,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setLoading(true);

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

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${product.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct)
            });

            if (!res.ok) {
                throw new Error("There was an error while creating the product");
            }

            // revalidate the products list so the new product shows up
            // await revalidateProducts();
            router.refresh();

            // reset form + close on success
            setFormData({
                id: "",
                title: "",
                brand: "",
                price: "",
                boxContent: "",
                image: "",
            });
            setShowForm(false);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
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

            {error && (
                <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                    {error}
                </div>
            )}

            {loading && (
                <div className="flex gap-2 items-center mb-4">
                    <Loader2 className="animate-spin"/>
                    <span className="text-xl">Adding {formData.title}...</span>
                </div>
            )}

            
            <NewProductForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            
        </section>
    );
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