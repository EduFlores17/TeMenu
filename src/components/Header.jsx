import { ShoppingCart, Menu as MenuIcon } from 'lucide-react';
import { useState } from 'react';

const Header = ({ onCartClick, categories, selectedCategory, onSelectCategory, cartCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#1a1c2c] px-4 py-3 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo y menú móvil */}
        <div className="flex items-center space-x-4">
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon size={24} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center">
            <span className="bg-blue-600 rounded-lg px-2 py-1 mr-2">TM</span>
            TeMenú
          </h1>
        </div>

        {/* Menú de categorías - Desktop */}
        <nav className="hidden md:flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                onSelectCategory(category);
                setMobileMenuOpen(false);
              }}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-[#252a3a] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Botón del carrito */}
        <button
          onClick={onCartClick}
          className="relative flex items-center space-x-1 bg-[#252a3a] hover:bg-[#2d3448] px-3 py-2 rounded-lg transition-colors duration-200 group"
        >
          <ShoppingCart className="text-gray-300 group-hover:text-white" size={20} />
          <span className="text-sm text-gray-300 group-hover:text-white hidden sm:inline">
            Carrito
          </span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#252a3a] mt-2 rounded-lg p-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onSelectCategory(category);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-sm font-medium text-left transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-[#1e2130]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;