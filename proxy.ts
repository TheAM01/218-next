import { NextRequest, NextResponse } from "next/server";


export function proxy(req: NextRequest) {

    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        const token = req.cookies.get("token");

        if (token === undefined) {
            // return NextResponse.rewrite(new URL("/login", req.url));
        }
    }

    if (req.nextUrl.pathname.startsWith("/api")) {
        const apiKeyHeader = req.headers.get("x-api-key");

        if (!apiKeyHeader) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }
    }


    const response = NextResponse.next();
    response.headers.set("x-custom-header", "hello-world");
    response.cookies.set("theme", "dark", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    return response;
}

// :path*

// export const config = {
//     matcher: [
//         "/dashboard/:path*",
//         "/products/:path*",
//         "/cart/:path*"
//     ]
// }
