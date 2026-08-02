import clientPromise from "@/lib/db";
import { Product } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(`${process.env.BACKEND_URI!}/api/products`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.BACKEND_API_KEY!
            }
        });
        const products = await res.json();

        return NextResponse.json(
            { data: products }
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

        const body: Product = await req.json();

        console.log(body);

        const res = await fetch(`${process.env.BACKEND_URI!}/api/products`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.BACKEND_API_KEY!
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            return NextResponse.json(
                { message: "We ran into an error!" },
                { status: 500 }
            )
        }

        const createdProduct = await res.json();

        return NextResponse.json(
            { created: createdProduct.product },
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
