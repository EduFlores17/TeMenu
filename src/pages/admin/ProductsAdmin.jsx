import { useState } from 'react';
import ProductFormModal from '../../components/ProductFormModal';

const dummyProducts = [
  { id: 1, name: "Hamburguesa clásica", price: 80, category: "Platos fuertes" },
  { id: 2, name: "Pizza margarita", price: 120, category: "Platos fuertes" },
];

function ProductsAdmin() {
  const [products, setProducts] = useState(dummyProducts);
  const [showModal, setShowModal] = useState(false);

  const handleCreateProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Productos</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Crear producto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-700 text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Precio</th>
              <th className="p-2 border">Categoría</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, i) => (
              <tr key={prod.id} className="hover:bg-gray-700">
                <td className="p-2 border">{i + 1}</td>
                <td className="p-2 border">{prod.name}</td>
                <td className="p-2 border">${prod.price}</td>
                <td className="p-2 border">{prod.category}</td>
                <td className="p-2 border">
                  <button className="text-blue-400 hover:underline mr-2">Editar</button>
                  <button className="text-red-400 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
}

export default ProductsAdmin;
