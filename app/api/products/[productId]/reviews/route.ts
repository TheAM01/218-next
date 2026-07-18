import clientPromise from "@/lib/db";
import { Product, Review } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ productId: string; }> }) {
    try {
        const dbName = process.env.DB_NAME;
        const client = await clientPromise;
        const database = client.db(dbName);
        const products = database.collection("products");

        const { productId } = await params;
        const product = await products.findOne({ id: productId });

        if (!product) {
            return NextResponse.json(
                { message: "No product found with matching ID" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { data: product.reviews }
        );

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "We ran into an error!" },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ productId: string; }> }) {
    try {
        const dbName = process.env.DB_NAME;

        const body: Review = await req.json();

        const client = await clientPromise;
        const database = client.db(dbName);
        const products = database.collection<Product>("products");

        const { productId } = await params;

        const result = await products.updateOne(
            { id: productId },
            { $push: { reviews: body } }
        );

        return NextResponse.json(
            { created: result },
            { status: 201 }
        )
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "We ran into an error!" },
            { status: 500 }
        )
    }

}
