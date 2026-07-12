import { products } from "@/lib/products";
import { Product } from "@/types/product";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: Promise<{ productId: string; }> }) {

    const { productId } = await params;

    const productToSend = products.find(p => p.id === productId);

    if (!productToSend) {
        return NextResponse.json(
            { message: "No product found with matching ID" },
            { status: 404 }
        )
    }

    return NextResponse.json(productToSend);

}

export async function PUT(req: Request, { params }: { params: Promise<{ productId: string; }> }) {

    const { productId } = await params;

    const productToUpdate = products.find(p => p.id === productId);

    if (!productToUpdate) {
        return NextResponse.json(
            { message: "No product found with matching ID" },
            { status: 404 }
        )
    }

    const body: Product = await req.json();

    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return NextResponse.json(
            { message: "No product found with matching ID" },
            { status: 404 }
        )
    }

    products[index] = body;

    return NextResponse.json(
        body,
        { status: 200 }
    );
}


export async function DELETE(req: Request, { params }: { params: Promise<{ productId: string; }> }) {

    const { productId } = await params;

    const productToDelete = products.find(p => p.id === productId);

    if (!productToDelete) {
        return NextResponse.json(
            { message: "No product found with matching ID" },
            { status: 404 }
        )
    }

    const index = products.findIndex(p => p.id === productId);

    const deletedProduct = products.splice(index, 1)[0];

    return NextResponse.json(
        {
            message: "Product deleted successfully",
            product: deletedProduct,
            remainingProducts: products,
        }
    )

}