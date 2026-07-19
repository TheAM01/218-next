import clientPromise from "@/lib/db";
import { Collection } from "@/types/collection";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const dbName = process.env.DB_NAME;
        const client = await clientPromise;
        const database = client.db(dbName);
        const collections = database.collection("collections");

        const allCollections = await collections.find({}).toArray();

        return NextResponse.json(
            { data: allCollections }
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

        const body: Collection = await req.json();

        const client = await clientPromise;
        const database = client.db(dbName);
        const collections = database.collection("collections");

        const newCollection = await collections.insertOne(body);


        return NextResponse.json(
            { created: newCollection },
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