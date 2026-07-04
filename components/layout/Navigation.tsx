import Link from "next/link";

export function Navigation() {
    return (
        <nav className="border-b border-gray-500 p-2 flex justify-around items-center">
            <Link href={"/"} className="font-semibold text-3xl">218Next</Link>
            <div className="flex gap-4 ">
                <Link className="text-neutral-500 hover:underline hover:text-black duration-500" href="/">Home</Link>
                <Link className="text-neutral-500 hover:underline hover:text-black duration-500" href="/about">About</Link>
                <Link className="text-neutral-500 hover:underline hover:text-black duration-500" href="/products">Products</Link>
                <Link className="text-neutral-500 hover:underline hover:text-black duration-500" href="/contact/admin">Contact Admin</Link>
                <Link className="text-neutral-500 hover:underline hover:text-black duration-500" href="/contact/support">Contact Support</Link>
                <Link className="text-neutral-500 hover:underline hover:text-black duration-500" href="/contact-us">Contact Us</Link>
            </div>
        </nav>
    )
}
