import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: Promise<{ productId: string; reviewId: string; }> }) {
    try {
        const dbName = process.env.DB_NAME;
        const client = await clientPromise;
        const database = client.db(dbName);
        const products = database.collection("products");

        const { productId, reviewId } = await params;

        const product = await products.findOne({ id: productId });

        if (!product) {
            return NextResponse.json(
                { message: "No product found with matching ID" },
                { status: 404 }
            )
        }

        return NextResponse.json(product.reviews[reviewId]);

    } catch (e) {
        console.log(e);
        return NextResponse.json(
            { message: "We ran into an error!" },
            { status: 500 }
        )
    }


}

// export async function PUT(req: Request, { params }: { params: Promise<{ productId: string; reviewId: string; }> }) {
//     try {
//         const dbName = process.env.DB_NAME;
//         const client = await clientPromise;
//         const database = client.db(dbName);
//         const products = database.collection("products");

//         const { productId, reviewId } = await params;
//         const body: Product = await req.json();

//         const product = await products.findOneAndUpdate(
//             { id: productId },
//             {
//                 $set: "reviews"
//             },
//             { returnDocument: 'after' }
//         );

//         if (!product) {
//             return NextResponse.json(
//                 { message: "No product found with matching ID" },
//                 { status: 404 }
//             )
//         }

//         return NextResponse.json(
//             { message: "Updated successfully!", product: product }
//         );

//     } catch (e) {
//         console.log(e);
//         return NextResponse.json(
//             { message: "We ran into an error!" },
//             { status: 500 }
//         )
//     }
// }


export async function DELETE(req: Request, { params }: { params: Promise<{ productId: string; reviewId: string; }> }) {

    try {
        const dbName = process.env.DB_NAME;
        const client = await clientPromise;
        const database = client.db(dbName);
        const products = database.collection("products");

        const { productId, reviewId } = await params;

        const product = await products.findOneAndUpdate(
            { id: productId },
            { $unset: { [`reviews.${reviewId}`]: 1 } }
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
