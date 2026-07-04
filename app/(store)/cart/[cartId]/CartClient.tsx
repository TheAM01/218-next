"use client";

import { useState } from "react";

interface CartClientProps {
    cartDetails: { id: string; sum: number };
}

export default function CartClient({ cartDetails }: CartClientProps) {
    const [counter, setCounter] = useState<number>(1);

    return (
        <section className="m-4 mx-auto w-full p-4 flex flex-col">
            <article className="flex gap-4 p-2 border border-gray-500 rounded-lg">
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img
                    src={"https://placehold.co/500/000000/FFFFFF"}
                    alt={"Cart item image"}
                    className="w-40"
                />

                <div className="flex flex-col gap-2 flex-1">
                    <h1 className="text-xl font-semibold">Cart Item</h1>
                    <p className="italic text-gray-500 text-sm">
                        This is a generic cart item
                    </p>
                </div>

                <div className="flex flex-col gap-1">
                    <div className="p-2 border border-black flex items-center justify-center">
                        {counter}
                    </div>
                    <div className="flex gap-1">
                        <button
                            className="p-1 border border-black text-sm w-5 h-5 flex items-center justify-center"
                            onClick={() => setCounter(counter - 1)}
                        >
                            -
                        </button>
                        <button
                            className="p-1 border border-black text-sm w-5 h-5 flex items-center justify-center"
                            onClick={() => setCounter(counter + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </article>

            <div className="flex">
                <span className="items-end">
                    Total: {cartDetails.sum}
                </span>
            </div>
        </section>
    );
}
