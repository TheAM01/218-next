"use server";

import { cookies } from "next/headers";
// import clientPromise from "@/lib/db";
import { redirect } from "next/navigation";

interface LoginResponse {
    message: string;
    token: string;
}

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

export async function login(formData: FormData) {

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const res = await fetch(`${process.env.BACKEND_URI!}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.BACKEND_API_KEY!
        },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        return redirect("/login?invalid-credentials=true");
    }

    const result = (await res.json()) as LoginResponse;

    const cookieStore = await cookies();

    cookieStore.set("token", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
    });

    // return {
    //     success: true,
    //     message: "Logged in successfully"
    // }

    return redirect("/dashboard/products");
}