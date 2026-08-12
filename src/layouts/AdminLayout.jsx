import AdminSideBar from "@/components/common/AdminSideBar";
import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto">
        <AdminSideBar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
