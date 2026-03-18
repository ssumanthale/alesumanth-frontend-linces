import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, FileText, LogOut, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => location.pathname.startsWith(path);

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/quotes', label: 'Quote Requests', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-gray-950 text-white min-h-screen fixed left-0 top-0 border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
            <Zap size={20} className="text-gray-900" />
          </div>
          <span className="text-xl font-bold tracking-tight">Admin</span>
        </div>
      </div>

      <nav className="flex-1 py-8 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
