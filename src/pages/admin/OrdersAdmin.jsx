import { useState, useEffect } from 'react';
import OrdersList from '../../components/OrdersList';
import OrderDetail from '../../components/OrderDetail';
import ProductOrderForm from '../../components/ProductOrderForm';
import { getOrders, updateOrderStatus, addNewOrder } from '../../data/orders';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = getOrders();
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar pedidos:', error);
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const handleStatusUpdate = (orderId, newStatus) => {
    const success = updateOrderStatus(orderId, newStatus);
    if (success) {
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, estado: newStatus } : order
      ));
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, estado: newStatus });
      }
    }
  };

  const handleCreateNewOrder = (mesa) => {
    setSelectedMesa(mesa);
    setShowNewOrderForm(true);
  };

  const handleSaveNewOrder = (newOrder) => {
    const createdOrder = addNewOrder(newOrder);
    setOrders([createdOrder, ...orders]);
    setShowNewOrderForm(false);
    setSelectedMesa('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-300">Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Gestión de Pedidos</h1>
        <button
          onClick={() => {
            const mesa = prompt("Número de mesa:");
            if (mesa) handleCreateNewOrder(mesa);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
        >
          Nuevo Pedido
        </button>
      </div>
      
      {showNewOrderForm ? (
        <ProductOrderForm
          mesa={selectedMesa}
          onSave={handleSaveNewOrder}
          onCancel={() => setShowNewOrderForm(false)}
        />
      ) : (
        <OrdersList 
          orders={orders} 
          onOrderSelect={setSelectedOrder}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
      
      {selectedOrder && (
        <OrderDetail 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
};

export default OrdersAdmin;