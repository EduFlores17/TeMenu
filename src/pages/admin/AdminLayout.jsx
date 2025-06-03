import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/admin" className="hover:text-blue-300">Dashboard</Link>
          <Link to="/admin/products" className="hover:text-blue-300">Productos</Link>
          <Link to="/admin/orders" className="hover:text-blue-300">Pedidos</Link>
          <Link to="/admin/users" className="hover:text-blue-300">Usuarios</Link>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-6 bg-[#f9fafb] text-black dark:bg-gray-900 dark:text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
