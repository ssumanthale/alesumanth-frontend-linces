import { Search } from 'lucide-react';

const AdminNavbar = ({ title }) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-gray-900 font-bold">
            A
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
