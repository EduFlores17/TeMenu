import { useState } from "react";
import { Plus } from "lucide-react";

function ProductCard({ product, addToCart }) {
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.name === extra.name)
        ? prev.filter((e) => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedExtras);
    }
    setSelectedExtras([]);
    setQuantity(1);
  };

  const totalPrice = (product.price + selectedExtras.reduce((total, extra) => total + extra.price, 0)) * quantity;

  return (
    <div className="bg-[#1e2130] rounded-lg overflow-hidden shadow-md border border-gray-700 flex flex-col h-full">
      {/* Imagen más compacta */}
      <div className="relative pt-[60%] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/food-placeholder.png';
          }}
        />
      </div>

      {/* Contenido compacto */}
      <div className="p-3 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-semibold text-white line-clamp-1">{product.name}</h3>
          <p className="text-sm font-medium text-blue-400 whitespace-nowrap ml-2">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <p className="text-xs text-gray-400 line-clamp-2 mb-2">{product.description}</p>

        {/* Selector de cantidad compacto */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Cantidad:</span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded text-white text-xs"
            >
              -
            </button>
            <span className="text-xs w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded text-white text-xs"
            >
              +
            </button>
          </div>
        </div>

        {/* Extras compactos */}
        {product.extras?.length > 0 && (
          <details className="group mt-2">
            <summary className="text-xs text-gray-400 cursor-pointer list-none flex justify-between items-center">
              <span>Personalizar</span>
              <span className="text-xs">▼</span>
            </summary>
            <div className="mt-2 space-y-2">
              {product.extras.map((extra, i) => (
                <label
                  key={`${product.id}-${i}`}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedExtras.some(e => e.name === extra.name)}
                      onChange={() => toggleExtra(extra)}
                      className="h-3 w-3 text-blue-600 rounded border-gray-600 bg-gray-700"
                    />
                    <span className="text-xs text-gray-300">{extra.name}</span>
                  </div>
                  <span className="text-xs text-blue-400">+${extra.price.toFixed(2)}</span>
                </label>
              ))}
            </div>
          </details>
        )}

        {/* Precio total y botón */}
        <div className="mt-3 pt-2 border-t border-gray-700 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">Total:</p>
            <p className="text-sm font-bold text-green-400">${totalPrice.toFixed(2)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center"
          >
            <Plus size={14} className="mr-1" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;