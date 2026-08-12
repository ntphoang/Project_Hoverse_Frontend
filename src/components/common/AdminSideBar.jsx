import { useAuthStore } from "@/store";
import { NavLink } from "react-router-dom";
import { MapPin, Users } from "lucide-react";

const ADMIN_MENUS = [
  { title: "Quản lý địa điểm", path: "/admin/places", icon: MapPin },
  { title: "Quản lý người dùng", path: "/admin/users", icon: Users },
];

const AdminSideBar = () => {
  const navItemStyles = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 h-full min-h-[calc(100vh-76px)] flex flex-col pt-6 px-4">
      {/* Danh sách Menu */}
      <nav className="flex flex-col gap-2 flex-1">
        {ADMIN_MENUS.map((item) => (
          <NavLink to={item.path} className={navItemStyles}>
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSideBar;
