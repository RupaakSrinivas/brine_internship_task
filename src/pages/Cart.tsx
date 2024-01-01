import { useUser } from "../context";

export default function Cart() {
    const { user } = useUser();
    const cartItems = user?.cart.items || [];

    return (
        <div>
            {cartItems.length === 0 ? (
                <p>Empty Cart</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <p>{item.id}</p>
                        <p>{item.quantity}</p>
                    </div>
                ))
            )}
        </div>
    )
}