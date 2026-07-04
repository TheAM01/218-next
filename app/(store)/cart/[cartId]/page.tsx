import CartClient from "./CartClient";

export default async function CartPage({ params }: { params: Promise<{ cartId: string; }> }) {
    const { cartId } = await params;

    // cart
    const cartDetails = {
        id: cartId,
        sum: 2000,
    }
    return (
        <main>
            id: {cartId}
            <CartClient cartDetails={cartDetails}/>
        </main>
    )

}
