import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Botón móvil */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-800 text-white p-4 
        transition-transform duration-300 ease-in-out`}>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/admin" className="hover:text-blue-300 p-2 rounded hover:bg-gray-700">Dashboard</Link>
          <Link to="/admin/products" className="hover:text-blue-300 p-2 rounded hover:bg-gray-700">Productos</Link>
          <Link to="/admin/orders" className="hover:text-blue-300 p-2 rounded hover:bg-gray-700">Pedidos</Link>
          <Link to="/admin/users" className="hover:text-blue-300 p-2 rounded hover:bg-gray-700">Usuarios</Link>
        </nav>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-4 md:p-6 bg-[#f9fafb] text-black dark:bg-gray-900 dark:text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;