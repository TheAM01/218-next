import { products } from "@/lib/products";
import { Product } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
    const body: Product = await req.json();

    products.push(body);

    return NextResponse.json(
        { message: "Successfully added product" },
        { status: 201 }
    );
}