import { products as LLMResponse } from "@/lib/products";
import { Product } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    
    return NextResponse.json(LLMResponse);
}

export async function POST(req: NextRequest) {
    const body: Product = await req.json();

    LLMResponse.push(body);

    return NextResponse.json(
        { message: "Successfully added product" },
        { status: 201 }
    );
}