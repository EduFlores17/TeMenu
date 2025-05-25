const products = [
    {
      id: 1,
      name: "Hamburguesa clásica",
      description: "Jugosa hamburguesa con lechuga, tomate y queso.",
      price: 80,
      category: "Platos fuertes",
      image: "/burguer.jpg",
      extras: [
        { name: 'Catsup', price: 1.5 },
        { name: 'Mostaza', price: 2 },
        { name: 'Picante', price: 2 }
      ]
    },
    {
      id: 2,
      name: "Pizza margarita",
      description: "Pizza con salsa de tomate, queso y albahaca.",
      price: 120,
      category: "Platos fuertes",
      image: "/pizza.jpg",
      extras: [
        { name: 'Queso extra', price: 10 },
        { name: 'Oregano', price: 2 },
        { name: 'Picante', price: 2 }
      ]
    },
    {
        id: 3,
        name: "Tacos al pastor",
        description: "Deliciosos tacos al pastor con tortilla frita y carne jugosa.",
        price: 120,
        category: "Entradas",
        image: "/tacos.jpg",
        extras: [
          { name: 'Salsa roja', price: 1.5 },
          { name: 'Salsa verde', price: 2 },
          { name: 'Pico de gallo', price: 2 }
        ]      },
      {
        id: 4,
        name: "Pollo frito",
        description: "Pollo estilo campero, crujiente y jugoso para chuparse los dedos",
        price: 120,
        category: "Platos fuertes",
        image: "/pollo.jpg",
        extras: [
          { name: 'Extracrunchy', price: 25 },
          { name: 'Mostaza', price: 2 },
          { name: 'Picante', price: 2 }
        ]
      },
      {
        id: 5,
        name: 'Coca-Cola 355ml',
        description: 'Refresco frío de cola.',
        price: 20,
        category: 'Bebidas',
        image: '/coca.jpg',
        extras: [
          { name: 'Hielo', price: 1.5 },
          { name: 'Popote', price: 2 },
          { name: 'En vaso', price: 2 }
        ]
      },
      {
        id: 6,
        name: 'Helado de vainilla',
        description: 'Postre frío con sabor a vainilla.',
        price: 30,
        category: 'Postres',
        image: '/helado.jpg',
        extras: [
          { name: 'Jarabe de chocolate', price: 1.5 },
          { name: 'Chispas', price: 2 },
          { name: 'Picante', price: 2 }
        ]
      },
  ];
  
  export default products;
  