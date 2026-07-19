import clientPromise from "@/lib/db";
import { Collection } from "@/types/collection";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: Promise<{ collectionId: string; }> }) {
    try {
        const dbName = process.env.DB_NAME;
        const client = await clientPromise;
        const database = client.db(dbName);
        const collections = database.collection("collections");

        const { collectionId } = await params;

        const collection = await collections.findOne({ id: collectionId });

        if (!collection) {
            return NextResponse.json(
                { message: "No collection found with matching ID" },
                { status: 404 }
            )
        }

        return NextResponse.json(collection);

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "We ran into an error!" },
            { status: 500 }
        )
    }


}

export async function PUT(req: Request, { params }: { params: Promise<{ collectionId: string; }> }) {
    try {
        const dbName = process.env.DB_NAME;
        const client = await clientPromise;
        const database = client.db(dbName);
        const collections = database.collection("collections");

        const { collectionId } = await params;
        const body: Collection = await req.json();

        const collection = await collections.findOneAndUpdate(
            { id: collectionId },
            {
                $set: body
            },
            { returnDocument: 'after' }
        );

        if (!collection) {
            return NextResponse.json(
                { message: "No collection found with matching ID" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "Updated successfully!", collection: collection }
        );

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "We ran into an error!" },
            { status: 500 }
        )
    }
}


export async function DELETE(req: Request, { params }: { params: Promise<{ collectionId: string; }> }) {

    try {
        const dbName = process.env.DB_NAME;
        const client = await clientPromise;
        const database = client.db(dbName);
        const collections = database.collection("collections");

        const { collectionId } = await params;

        const collection = await collections.findOneAndDelete(
            { id: collectionId },
        );

        if (!collection) {
            return NextResponse.json(
                { message: "No collection found with matching ID" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "Deleted successfully!", collection: collection }
        );

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "We ran into an error!" },
            { status: 500 }
        )
    }

}
