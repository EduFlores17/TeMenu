import { useState } from 'react';
import ProductFormModal from '../../components/ProductFormModal';

const dummyProducts = [
  { 
    id: 1, 
    name: "Hamburguesa clásica", 
    description: "Deliciosa hamburguesa con queso y vegetales",
    price: 80, 
    category: "Platos fuertes",
    extras: [{name: "Queso", price: 10}, {name: "Tocino", price: 15}],
    image: "/burguer.jpg"
  },
  { 
    id: 2, 
    name: "Pizza Margarita", 
    description: "Pizza clásica con salsa de tomate y mozzarella",
    price: 120, 
    category: "Platos fuertes",
    extras: [{name: "Extra queso", price: 15}, {name: "Champiñones", price: 10}],
    image: "/pizza.jpg"
  }
];

function ProductsAdmin() {
  const [products, setProducts] = useState(dummyProducts);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleSaveProduct = (productData) => {
    if (currentProduct) {
      setProducts(products.map(p => 
        p.id === currentProduct.id ? { ...productData, id: currentProduct.id } : p
      ));
    } else {
      setProducts([...products, { ...productData, id: Date.now() }]);
    }
    setCurrentProduct(null);
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setProducts(products.filter(prod => prod.id !== id));
    }
  };

  const formatExtras = (extras) => {
    if (!extras || extras.length === 0) return "Ninguno";
    return extras.map(extra => `${extra.name} (+$${extra.price})`).join(", ");
  };

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      {/* Header responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
          Gestión de Productos
        </h2>
        <button
          onClick={() => {
            setCurrentProduct(null);
            setShowModal(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <span>+</span>
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Tabla para desktop */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Imagen</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Nombre</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Descripción</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Precio</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Categoría</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Extras</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-3">
                  {prod.image ? (
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                      <span className="text-xs text-gray-500">Sin imagen</span>
                    </div>
                  )}
                </td>
                <td className="p-3 text-gray-800 dark:text-gray-200 font-medium">{prod.name}</td>
                <td className="p-3 text-gray-600 dark:text-gray-400 max-w-xs truncate">{prod.description}</td>
                <td className="p-3 text-gray-800 dark:text-gray-200">${prod.price.toFixed(2)}</td>
                <td className="p-3 text-gray-600 dark:text-gray-400">{prod.category}</td>
                <td className="p-3 text-gray-600 dark:text-gray-400 text-sm">
                  {formatExtras(prod.extras)}
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards para móvil */}
      <div className="md:hidden space-y-4">
        {products.map((prod) => (
          <div key={prod.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700">
            <div className="flex gap-4">
              {prod.image ? (
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-16 h-16 object-cover rounded-md"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                  <span className="text-xs text-gray-500">Sin imagen</span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800 dark:text-white">{prod.name}</h3>
                  <span className="text-gray-800 dark:text-white font-medium">${prod.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{prod.category}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{prod.description}</p>
                <div className="mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Extras:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {formatExtras(prod.extras)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => handleEdit(prod)}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(prod.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductFormModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentProduct(null);
        }}
        onSubmit={handleSaveProduct}
        initialData={currentProduct}
      />
    </div>
  );
}

export default ProductsAdmin;