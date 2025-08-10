import { useCart } from "../context/CartContext";
import { Button } from "react-bootstrap";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return <div className="p-8 text-lg">🛒 Your cart is empty.</div>;

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 rounded-lg shadow flex items-center gap-6"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg border"
          />

          <div className="flex-1 space-y-1">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600 text-sm">Price: ₹{item.price}</p>
            <div className="flex items-center gap-3 mt-2">
              <button
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
              >
                -
              </button>
              <span className="min-w-[24px] text-center">{item.quantity}</span>
              <button
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-600 hover:text-red-800 font-medium transition"
          >
            🗑️ Remove
          </button>
        </div>
      ))}

      <div className="border-t pt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ₹{total.toFixed(2)}</p>
        <div className="space-x-4">
          <Button variant="danger" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button variant="success">Pay ₹{total.toFixed(2)}</Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
