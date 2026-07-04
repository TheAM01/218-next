import { TriangleAlert } from "lucide-react"
import Link from "next/link"


export default function LoadingPage() {
    return (
        <main className="w-screen min-h-[70vh] flex items-center justify-center">
            <div className="flex flex-col gap-2 ">    
                <p><TriangleAlert />Oops. We couldn&apos;t find the page you were looking for :(</p>
                <p>Go back to <Link href="/" className="underline text-gray-700 hover:text-gray-900">home</Link>?</p>
            </div>
        </main>
    )
}