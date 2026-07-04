"use client";

import { TriangleAlert } from "lucide-react";

interface ErrorPageProps {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
}


export default function ErrorPage({ error, reset }: ErrorPageProps) {
    return (
        <main className="w-screen min-h-[70vh] flex items-center justify-center">
            <div className="flex flex-col gap-2 ">    
                <p><TriangleAlert />Oops. We ran into an error :(</p>
                <p className="bg-gray-500 p-2 border rounded-lg text-red-500">{error.message}</p>
                <button onClick={reset} className="underline text-gray-700 hover:text-gray-900">Reset</button>
            </div>
        </main>
    )
}