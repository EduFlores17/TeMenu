import { X, ShoppingBag } from "lucide-react";

const OrderSummary = ({ cartItems, removeFromCart, clearCart }) => {
  const calculateItemTotal = (item) => {
    const extrasTotal = item.extras?.reduce((sum, extra) => sum + (extra.price || 0), 0) || 0;
    return (item.price + extrasTotal) * (item.quantity || 1);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
        <h2 className="text-lg font-bold flex items-center">
          <ShoppingBag size={20} className="mr-2" />
          Tu Pedido
        </h2>
        <span className="text-sm bg-blue-600 px-2 py-1 rounded-full">
          {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} {cartItems.length === 1 ? 'ítem' : 'ítems'}
        </span>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-center py-4">Tu carrito está vacío</p>
      ) : (
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {cartItems.map((item, index) => {
            const extrasTotal = item.extras?.reduce((sum, extra) => sum + (extra.price || 0), 0) || 0;
            const itemTotal = calculateItemTotal(item);
            
            return (
              <div key={index} className="bg-[#252a3a] p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium">{item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}</p>
                    
                    {/* Precio base */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Precio base:</span>
                      <span className="text-blue-400">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                    
                    {/* Extras */}
                    {item.extras?.length > 0 && (
                      <div className="mt-1">
                        <p className="text-xs text-gray-400">Extras:</p>
                        <ul className="text-xs text-gray-300 space-y-1 mt-1">
                          {item.extras.map((extra, i) => (
                            <li key={i} className="flex justify-between">
                              <span>• {extra.name}</span>
                              <span>+${(extra.price * (item.quantity || 1)).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-gray-400">Total extras:</span>
                          <span className="text-blue-400">+${(extrasTotal * (item.quantity || 1)).toFixed(2)}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Total por ítem */}
                    <div className="flex justify-between mt-2 pt-2 border-t border-gray-700">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="text-sm font-bold text-green-400">
                        ${itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-gray-400 hover:text-red-500 ml-2 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-4 border-t border-gray-700 pt-3">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total del pedido:</span>
            <span className="text-lg font-bold text-green-400">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={clearCart}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded text-sm transition-colors"
            >
              Vaciar
            </button>
            <button
              onClick={() => {
                alert(`¡Pedido realizado por $${calculateTotal().toFixed(2)}!`);
                clearCart();
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm transition-colors"
            >
              Pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CartModal = ({ isOpen, onClose, cartItems, removeFromCart, clearCart }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Fondo oscuro que cierra al hacer clic */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Contenido del modal - previene la propagación del clic */}
      <div 
        className="fixed inset-0 z-50 flex justify-end"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#1a1c2c] w-full max-w-md h-full shadow-xl p-4 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <OrderSummary 
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
          />
        </div>
      </div>
    </>
  );
};

export default CartModal;