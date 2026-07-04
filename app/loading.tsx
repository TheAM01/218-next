import { LoaderCircle } from "lucide-react"


export default function LoadingPage() {
    return (
        <main className="w-screen min-h-[70vh] flex flex-col gap-2 items-center justify-center">
            <LoaderCircle className="animate-spin"/>
            Loading your page!
        </main>
    )
}