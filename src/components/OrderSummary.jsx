const OrderSummary = ({ cartItems, removeFromCart, clearCart }) => {
    // Calcular el total sumando precios base + precios de extras
    const total = cartItems.reduce((acc, item) => {
      const extrasTotal = item.extras?.reduce((sum, extra) => sum + (extra.price || 0), 0) || 0;
      return acc + item.price + extrasTotal;
    }, 0);
  
    return (
      <div className="text-white space-y-4">
        <h2 className="text-lg font-bold">Resumen del pedido</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-400">Tu carrito está vacío.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="border-b border-gray-700 pb-2 mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                  {item.extras?.length > 0 && (
                    <ul className="ml-4 text-sm text-gray-300 list-disc">
                      {item.extras.map((extra, i) => (
                        <li key={i}>
                          {extra.name} (+${extra.price?.toFixed(2)})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
  
        {cartItems.length > 0 && (
          <>
            <p className="text-right font-bold">
              Total: ${total.toFixed(2)}
            </p>
            <button
              onClick={() => {
                alert("¡Orden realizada con éxito!");
                clearCart();
              }}
              className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Realizar pedido
            </button>
          </>
        )}
      </div>
    );
  };
  
  export default OrderSummary;
  