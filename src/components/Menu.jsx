// Menu.jsx
import ProductCard from "./ProductCard";
import menuItems from "../data/products";

function Menu({ selectedCategory, addToCart }) {
  return (
    <div className="grid gap-10">
      <section>
        <h2 className="text-xl font-semibold mb-4">{selectedCategory}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {menuItems
            .filter((item) => item.category === selectedCategory)
            .map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                addToCart={addToCart}
              />
            ))}
        </div>
      </section>
    </div>
  );
}

export default Menu;
