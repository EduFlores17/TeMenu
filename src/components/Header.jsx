// Header.jsx
import { ShoppingCart } from 'lucide-react';

const Header = ({ onCartClick, categories, selectedCategory, onSelectCategory, cartCount }) => {
  return (
    <header className="bg-[#1a1c2c] px-6 py-4 flex flex-col md:flex-row justify-between md:items-center shadow-md gap-4">
      <h1 className="text-2xl font-bold text-white">TeMenú</h1>
      <nav className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              selectedCategory === category ? 'bg-white text-[#1a1c2c]' : 'text-white border border-white hover:bg-white hover:text-[#1a1c2c]'
            }`}
          >
            {category}
          </button>
        ))}
      </nav>
      <button
        className="text-white hover:text-blue-400 flex items-center gap-2 relative"
        onClick={onCartClick}
      >
        <ShoppingCart />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
        Ver carrito
      </button>
    </header>
  );
};

export default Header;
