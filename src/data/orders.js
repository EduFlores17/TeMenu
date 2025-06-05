export const ordersData = [
  {
    id: 'MESA-001-2023',
    mesa: 'Mesa 1',
    cliente: 'Carlos Martínez',
    mesero: 'Juan Pérez',
    horaPedido: '2023-11-15T14:30:00',
    horaEntrega: '2023-11-15T15:15:00',
    items: [
      { 
        id: 1, // ID del producto
        productId: 1, // Referencia al producto original
        name: "Hamburguesa clásica",
        price: 80,
        quantity: 2,
        extras: [
          { name: 'Catsup', price: 1.5 },
          { name: 'Picante', price: 2 }
        ],
        notes: "Sin cebolla"
      },
      {
        id: 5,
        productId: 5,
        name: 'Coca-Cola 355ml',
        price: 20,
        quantity: 2,
        extras: [
          { name: 'Hielo', price: 1.5 }
        ]
      }
    ],
    estado: 'entregado',
    notas: 'Para compartir',
    subtotal: 225, // (80*2 + 20*2 + extras)
    propina: 30,
    total: 255
  },
  // Más pedidos...
];

// Función para calcular totales automáticamente
const calculateOrderTotals = (order) => {
  const subtotal = order.items.reduce((sum, item) => {
    const itemExtras = item.extras.reduce((extraSum, extra) => extraSum + extra.price, 0);
    return sum + (item.price * item.quantity) + (itemExtras * item.quantity);
  }, 0);

  return {
    ...order,
    subtotal,
    total: subtotal + (order.propina || 0)
  };
};

export const getOrders = () => {
  return ordersData.map(calculateOrderTotals);
};

export const updateOrderStatus = (orderId, newStatus) => {
  const orderIndex = ordersData.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    ordersData[orderIndex].estado = newStatus;
    if (newStatus === 'entregado') {
      ordersData[orderIndex].horaEntrega = new Date().toISOString();
    }
    return true;
  }
  return false;
};

export const addNewOrder = (newOrder) => {
  const orderWithTotals = calculateOrderTotals(newOrder);
  ordersData.unshift(orderWithTotals);
  return orderWithTotals;
};