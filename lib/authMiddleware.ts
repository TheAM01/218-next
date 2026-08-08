import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export async function requireAuth(): Promise<boolean> {
    const cookieStore = await cookies();

    const token = cookieStore.get("token");

    if (!token) {
        return false;
    }

    try {
        jwt.verify(token.value, process.env.JWT_SECRET!);
        return true;
    } catch {
        return false;
    }
}