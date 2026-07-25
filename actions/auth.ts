"use server";

// import clientPromise from "@/lib/db";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const newUser = {
        fullName,
        email,
        password
    }

    console.log(newUser)

    // const dbName = process.env.DB_NAME;
    // const client = await clientPromise;
    // const database = client.db(dbName);
    // const users = database.collection("users");

    // await users.insertOne(newUser);

    redirect("/login");
}