import { useState } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import CartModal from './components/CartModal';
import menuItems from './data/products';

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
  );
}

export default App;
