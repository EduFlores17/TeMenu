import OrderSummary from './OrderSummary';

const CartModal = ({ onClose, cartItems, removeFromCart, clearCart }) => {
  return (
    <div className="bg-[#1a1c2c] p-6 rounded-lg shadow-lg w-80 fixed top-20 right-4 z-50 border border-gray-700">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white text-xl"
      >
        ✕
      </button>
      <OrderSummary 
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
};

export default CartModal;
