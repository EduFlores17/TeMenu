import { useState } from 'react';

const OrderDetail = ({ order, onClose, onStatusUpdate }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto border border-gray-700">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800 z-10">
          <h2 className="text-xl font-bold text-white">Pedido #{order.id}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors"
          >
            &times;
          </button>
        </div>
        
        <div className="p-6">
          {/* Información del pedido */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-300">Mesa</h3>
              <p className="text-lg font-bold text-white">{order.mesa}</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-300">Cliente</h3>
              <p className="text-white">{order.cliente}</p>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2 text-gray-300">Mesero/a</h3>
              <p className="text-white">{order.mesero}</p>
            </div>
          </div>

          {/* Estado del pedido */}
          <div className="mb-6 bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-300">Estado</h3>
              <select
                value={order.estado}
                onChange={(e) => onStatusUpdate(order.id, e.target.value)}
                className="border border-gray-600 bg-gray-800 text-white rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pendiente" className="bg-gray-800">Pendiente</option>
                <option value="en proceso" className="bg-gray-800">En proceso</option>
                <option value="completado" className="bg-gray-800">Completado</option>
                <option value="entregado" className="bg-gray-800">Entregado</option>
                <option value="cancelado" className="bg-gray-800">Cancelado</option>
              </select>
            </div>
          </div>

          {/* Productos del pedido */}
          <h3 className="font-medium mb-3 text-white">Detalle del Pedido</h3>
          <div className="border border-gray-700 rounded-lg overflow-hidden mb-6">
            {order.items.map((item, index) => (
              <div key={index} className="p-4 border-b border-gray-700 bg-gray-700">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-medium text-white">{item.quantity}x {item.name}</p>
                    {item.notes && (
                      <p className="text-sm text-gray-400 mt-1">Notas: {item.notes}</p>
                    )}
                  </div>
                  <p className="font-semibold text-white">
                    ${((item.price + (item.extras?.reduce((sum, e) => sum + e.price, 0) || 0) * item.quantity).toFixed(2))}
                  </p>
                </div>
                
                {item.extras?.length > 0 && (
                  <div className="mt-2 ml-4">
                    <p className="text-xs text-gray-400 mb-1">Extras:</p>
                    <ul className="text-xs space-y-1">
                      {item.extras.map((extra, idx) => (
                        <li key={idx} className="flex justify-between text-gray-300">
                          <span>+ {extra.name}</span>
                          <span>${extra.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3 text-white">Resumen</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal:</span>
                <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
              </div>
              {order.propina > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span>Propina:</span>
                  <span>${order.propina?.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-white border-t border-gray-600 pt-2 mt-2">
                <span>Total:</span>
                <span className="text-lg">${order.total?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>

          {/* Notas adicionales */}
          {order.notas && (
            <div className="p-4 bg-yellow-500 bg-opacity-10 rounded-lg border border-yellow-500 border-opacity-30">
              <h3 className="font-medium mb-2 text-yellow-400">Notas Especiales</h3>
              <p className="text-sm text-yellow-300">{order.notas}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;