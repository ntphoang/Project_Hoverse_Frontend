import { useState } from "react";
import AdminSideBar from "@/components/common/AdminSideBar";
import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <div className="md:hidden flex items-center p-4 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="ml-2 font-heading font-bold text-slate-900">
          Menu Quản trị
        </span>
      </div>

      <div className="flex flex-1 w-full max-w-[1600px] mx-auto relative overflow-hidden md:overflow-visible">
        <AdminSideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
