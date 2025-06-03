import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import CartModal from './components/CartModal';
import menuItems from './data/products';
import { useState } from 'react';

// Importa vistas de admin
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import ProductsAdmin from './pages/admin/ProductsAdmin';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Platos fuertes');

  const categories = ['Entradas', 'Platos fuertes', 'Bebidas', 'Postres'];

  const handleAddToCart = (product, selectedExtras) => {
    setCartItems((prevItems) => [
      ...prevItems,
      { ...product, extras: selectedExtras },
    ]);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <Routes>
        {/* RUTA CLIENTE */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-[#0f111a] text-white">
              <Header
                onCartClick={() => setShowCart(!showCart)}
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                cartCount={cartItems.length}
              />
              <main className="p-4">
                <Menu
                  items={menuItems}
                  selectedCategory={selectedCategory}
                  addToCart={handleAddToCart}
                />
                {showCart && (
                  <div className="fixed top-20 right-4 w-80 z-50">
                    <CartModal
                      isOpen={showCart}
                      cartItems={cartItems}
                      removeFromCart={handleRemoveFromCart}
                      clearCart={handleClearCart}
                      onClose={() => setShowCart(false)}
                    />
                  </div>
                )}
              </main>
            </div>
          }
        />

        {/* RUTA ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
