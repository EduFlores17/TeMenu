import { useState, useEffect } from 'react';
import products from '../data/products';

const ProductOrderForm = ({ mesa, onSave, onCancel }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [notes, setNotes] = useState('');
  const [cliente, setCliente] = useState('');
  const [mesero, setMesero] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extraer categorías únicas
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    setCategories(uniqueCategories);
  }, []);

  const handleAddItem = () => {
    if (!selectedProduct) return;

    const newItem = {
      id: Date.now(), // ID temporal
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity,
      extras: selectedExtras,
      notes
    };

    setOrderItems([...orderItems, newItem]);
    resetItemForm();
  };

  const resetItemForm = () => {
    setSelectedProduct(null);
    setQuantity(1);
    setSelectedExtras([]);
    setNotes('');
  };

  const handleExtraToggle = (extra) => {
    setSelectedExtras(prev => 
      prev.some(e => e.name === extra.name)
        ? prev.filter(e => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  const handleRemoveItem = (itemId) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  const handleSubmit = () => {
    const newOrder = {
      id: `MESA-${mesa}-${Date.now()}`,
      mesa: `Mesa ${mesa}`,
      cliente,
      mesero,
      horaPedido: new Date().toISOString(),
      items: orderItems,
      estado: 'pendiente',
      subtotal: orderItems.reduce((sum, item) => {
        const extrasTotal = item.extras.reduce((eSum, extra) => eSum + extra.price, 0);
        return sum + (item.price + extrasTotal) * item.quantity;
      }, 0),
      propina: 0,
      total: orderItems.reduce((sum, item) => {
        const extrasTotal = item.extras.reduce((eSum, extra) => eSum + extra.price, 0);
        return sum + (item.price + extrasTotal) * item.quantity;
      }, 0)
    };

    onSave(newOrder);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl mx-auto border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Nuevo Pedido - Mesa {mesa}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulario de cliente/mesero */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Cliente</label>
            <input
              type="text"
              className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Mesero</label>
            <input
              type="text"
              className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={mesero}
              onChange={(e) => setMesero(e.target.value)}
            />
          </div>
        </div>
        
        {/* Resumen del pedido */}
        <div className="border border-gray-700 bg-gray-700 rounded-lg p-4">
          <h3 className="font-medium mb-3 text-white">Resumen del Pedido</h3>
          {orderItems.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No hay items agregados</p>
          ) : (
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {orderItems.map(item => (
                <li key={item.id} className="border-b border-gray-600 pb-3">
                  <div className="flex justify-between">
                    <span className="text-white">
                      {item.quantity}x {item.name}
                      {item.notes && (
                        <span className="text-xs block text-gray-400 mt-1">Nota: {item.notes}</span>
                      )}
                    </span>
                    <span className="text-white font-medium">
                      ${((item.price + item.extras.reduce((sum, e) => sum + e.price, 0)) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                  {item.extras.length > 0 && (
                    <div className="text-xs text-gray-400 ml-2 mt-1">
                      Extras: {item.extras.map(e => e.name).join(', ')}
                    </div>
                  )}
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-400 hover:text-red-300 text-xs mt-1"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
          {orderItems.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-600">
              <div className="flex justify-between font-medium text-white">
                <span>Subtotal:</span>
                <span>
                  ${orderItems.reduce((sum, item) => {
                    const extrasTotal = item.extras.reduce((eSum, extra) => eSum + extra.price, 0);
                    return sum + (item.price + extrasTotal) * item.quantity;
                  }, 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Selección de productos */}
      <div className="mt-8">
        <h3 className="font-medium mb-3 text-white">Agregar Productos</h3>
        
        {/* Filtro por categoría */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedProduct?.category === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setSelectedProduct(null)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Lista de productos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {products
            .filter(p => !selectedProduct || p.category === selectedProduct.category)
            .map(product => (
              <button
                key={product.id}
                className={`border rounded-lg p-3 text-left transition-all ${
                  selectedProduct?.id === product.id
                    ? 'border-blue-500 bg-gray-700 shadow-lg'
                    : 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="font-medium text-white">{product.name}</div>
                <div className="text-sm text-blue-400">${product.price}</div>
              </button>
            ))}
        </div>
        
        {/* Detalles del producto seleccionado */}
        {selectedProduct && (
          <div className="border border-gray-600 bg-gray-700 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-lg text-white">{selectedProduct.name}</h4>
              <span className="font-bold text-blue-400">${selectedProduct.price}</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">{selectedProduct.description}</p>
            
            {/* Extras */}
            {selectedProduct.extras?.length > 0 && (
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-3 text-gray-300">Extras</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.extras.map(extra => (
                    <label 
                      key={extra.name}
                      className={`flex items-center text-xs rounded-lg px-3 py-2 cursor-pointer transition-colors ${
                        selectedExtras.some(e => e.name === extra.name)
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-gray-600 border-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedExtras.some(e => e.name === extra.name)}
                        onChange={() => handleExtraToggle(extra)}
                      />
                      {extra.name} (+${extra.price})
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {/* Cantidad y notas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Cantidad</label>
                <input
                  type="number"
                  min="1"
                  className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Notas</label>
                <input
                  type="text"
                  className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej: Sin cebolla"
                />
              </div>
            </div>
            
            <button
              onClick={handleAddItem}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition-colors"
            >
              Agregar al Pedido
            </button>
          </div>
        )}
      </div>
      
      {/* Acciones */}
      <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-700">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={orderItems.length === 0 || !cliente || !mesero}
          className={`px-6 py-2 rounded-lg text-white transition-colors ${
            orderItems.length === 0 || !cliente || !mesero
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Guardar Pedido
        </button>
      </div>
    </div>
  );
};

export default ProductOrderForm;