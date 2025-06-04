import ProductCard from "./ProductCard";

function Menu({ items, selectedCategory, addToCart }) {
  return (
    <div className="px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-white">{selectedCategory}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items
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
    </div>
  );
}

export default Menu;