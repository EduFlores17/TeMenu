import { useState } from "react";

function ProductCard({ product, addToCart }) {
  const [selectedExtras, setSelectedExtras] = useState([]);

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.includes(extra)
        ? prev.filter((e) => e.name !== extra.name)
        : [...prev, extra]
    );
  };


  const handleAddToCart = () => {
    addToCart(product, selectedExtras);
    setSelectedExtras([]); // Limpiar selección después de agregar
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-bold dark:text-white">{product.name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
      <p className="font-semibold mt-2 text-blue-600 dark:text-blue-400">
        ${product.price}
      </p>

      {product.extras?.length > 0 && (
        <div className="mt-4">
          <p className="font-medium text-sm text-gray-700 dark:text-gray-300">
            Selecciona extras:
          </p>
          <div className="space-y-1 mt-1">
            {product.extras.map((extra, i) => (
              <label
                key={i}
                className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <input
                  type="checkbox"
                  checked={selectedExtras.some((e) => e.name === extra.name)}
                  onChange={() => toggleExtra(extra)}
                />
                <span>{extra.name} {extra.price ? `(+${extra.price}$)` : ''}</span>

              </label>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;
