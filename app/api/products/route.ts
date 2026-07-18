import clientPromise from "@/lib/db";
import { Product } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const dbName = process.env.DB_NAME;
        const client = await clientPromise;
        const database = client.db(dbName);
        const products = database.collection("products");

        const allProducts = await products.find({}).toArray();

        return NextResponse.json(
            { data: allProducts }
        );
    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "We ran into an error!" },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        const dbName = process.env.DB_NAME;

        const body: Product = await req.json();

        const client = await clientPromise;
        const database = client.db(dbName);
        const products = database.collection("products");

        const newProduct = await products.insertOne(body);


        return NextResponse.json(
            { created: newProduct },
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


// ObjectId (_id)
//
