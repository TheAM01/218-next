import clientPromise from "@/lib/db";
import { Product } from "@/types/product";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: Promise<{ productId: string; }> }) {
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

        return NextResponse.json(product);

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "We ran into an error!" },
            { status: 500 }
        )
    }


}

export async function PUT(req: Request, { params }: { params: Promise<{ productId: string; }> }) {
    try {
        const dbName = process.env.DB_NAME;
        const client = await clientPromise;
        const database = client.db(dbName);
        const products = database.collection("products");

        const { productId } = await params;
        const body: Product = await req.json();

        const product = await products.findOneAndUpdate(
            { id: productId },
            {
                $set: body
            },
            { returnDocument: 'after' }
        );

        if (!product) {
            return NextResponse.json(
                { message: "No product found with matching ID" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "Updated successfully!", product: product }
        );

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "We ran into an error!" },
            { status: 500 }
        )
    }
}


export async function DELETE(req: Request, { params }: { params: Promise<{ productId: string; }> }) {

    try {
        const dbName = process.env.DB_NAME;
        const client = await clientPromise;
        const database = client.db(dbName);
        const products = database.collection("products");

        const { productId } = await params;

        const product = await products.findOneAndDelete(
            { id: productId },
        );

        if (!product) {
            return NextResponse.json(
                { message: "No product found with matching ID" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "Deleted successfully!", product: product }
        );

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "We ran into an error!" },
            { status: 500 }
        )
    }

}
