import { useState } from 'react';

const OrdersList = ({ orders, onOrderSelect, onStatusUpdate }) => {
  const [sortBy, setSortBy] = useState('horaPedido');
  const [sortDirection, setSortDirection] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('pendiente');

  const sortedOrders = [...orders]
    .filter(order => statusFilter === 'todos' || order.estado === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'horaPedido') {
        return sortDirection === 'asc' 
          ? new Date(a.horaPedido) - new Date(b.horaPedido)
          : new Date(b.horaPedido) - new Date(a.horaPedido);
      } else if (sortBy === 'mesa') {
        return sortDirection === 'asc' 
          ? a.mesa.localeCompare(b.mesa)
          : b.mesa.localeCompare(a.mesa);
      }
      return 0;
    });

  const getEstadoStyles = (estado) => {
    switch(estado) {
      case 'pendiente':
        return 'bg-yellow-500 text-white';
      case 'en proceso':
        return 'bg-blue-500 text-white';
      case 'completado':
        return 'bg-purple-500 text-white';
      case 'entregado':
        return 'bg-green-500 text-white';
      case 'cancelado':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Pedidos Activos</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select
            className="border border-gray-600 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="todos" className="bg-gray-700">Todos</option>
            <option value="pendiente" className="bg-gray-700">Pendientes</option>
            <option value="en proceso" className="bg-gray-700">En proceso</option>
            <option value="completado" className="bg-gray-700">Completados</option>
            <option value="entregado" className="bg-gray-700">Entregados</option>
            <option value="cancelado" className="bg-gray-700">Cancelados</option>
          </select>
          
          <select 
            className="border border-gray-600 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="horaPedido" className="bg-gray-700">Ordenar por hora</option>
            <option value="mesa" className="bg-gray-700">Ordenar por mesa</option>
          </select>
          
          <button 
            className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
            onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
          >
            {sortDirection === 'asc' ? '↑ Asc' : '↓ Desc'}
          </button>
        </div>
      </div>
      
      {sortedOrders.length === 0 ? (
        <div className="bg-gray-700 rounded-lg p-8 text-center">
          <p className="text-gray-400">No hay pedidos {statusFilter !== 'todos' ? `en estado ${statusFilter}` : ''}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedOrders.map(order => (
            <div 
              key={order.id} 
              className="border border-gray-700 bg-gray-700 p-4 rounded-xl hover:shadow-lg cursor-pointer transition-all hover:border-blue-500"
              onClick={() => onOrderSelect(order)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-xl text-white">{order.mesa}</h3>
                  <p className="text-sm text-gray-300">{order.cliente}</p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${getEstadoStyles(order.estado)}`}>
                  {order.estado.toUpperCase()}
                </span>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-300">
                  <span className="font-medium">Mesero:</span> {order.mesero}
                </span>
                <span className="text-sm font-medium text-blue-400">
                  {new Date(order.horaPedido).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2 text-white">Pedido:</h4>
                <ul className="text-sm space-y-2 max-h-24 overflow-y-auto pr-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-gray-300">
                      <span>{item.cantidad}x {item.name}</span>
                      <span className="font-medium">${(item.price * item.cantidad).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-3 border-t border-gray-600 flex justify-between items-center">
                <select
                  value={order.estado}
                  onChange={(e) => {
                    e.stopPropagation();
                    onStatusUpdate(order.id, e.target.value);
                  }}
                  className="text-xs border border-gray-600 bg-gray-800 text-white rounded-lg px-2 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pendiente" className="bg-gray-800">Pendiente</option>
                  <option value="en proceso" className="bg-gray-800">En proceso</option>
                  <option value="completado" className="bg-gray-800">Completado</option>
                  <option value="entregado" className="bg-gray-800">Entregado</option>
                  <option value="cancelado" className="bg-gray-800">Cancelado</option>
                </select>
                
                <span className="font-bold text-lg text-white">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersList;