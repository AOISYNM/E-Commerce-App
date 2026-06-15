import { useCart } from "../context/CartContext";

function CartPage(){
    const {cart, removeFromCart, UpdateQuantity} = useCart();
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    const total = cart.reduce(
        (acc, item) => acc + parseFloat(item.product_price) * item.quantity, 0
    );
    return(
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                {item.product_image && (
                                    <img src={`${BASE_URL}${item.product_image}`}
                                     alt={item.product_name}
                                     className="w-20 h-20 object-cover rounded-2xl"
                                     />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{item.product_name}</h2>
                                <p className="text-gray-500">${item.product_price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => UpdateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition duration-300"
                                    > + </button>

                                <button
                                    onClick={() => UpdateQuantity(item.id, item.quantity - 1)}
                                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 transition duration-300"
                                    > - </button>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition duration-300"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="border-t pt-4 mt-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Total:</h2>
                        <p className="text-2xl font-bold text-green-600">${total.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;