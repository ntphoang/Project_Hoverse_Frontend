import { NavLink } from "react-router-dom";
import {
  MapPin,
  Users,
  FolderTree,
  TagIcon,
  ChartNoAxesCombined,
  X,
} from "lucide-react";

const ADMIN_MENUS = [
  { title: "Dashboard", path: "/admin/dashboard", icon: ChartNoAxesCombined },
  { title: "Quản lý địa điểm", path: "/admin/places", icon: MapPin },
  { title: "Quản lý người dùng", path: "/admin/users", icon: Users },
  { title: "Quản lý danh mục", path: "/admin/categories", icon: FolderTree },
  { title: "Quản lý tag", path: "/admin/tags", icon: TagIcon },
];

const AdminSideBar = ({ isOpen, onClose }) => {
  const navItemStyles = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
      isActive
        ? "bg-slate-900 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col shadow-2xl md:shadow-none
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-0 md:h-full md:min-h-[calc(100vh-76px)] shrink-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      `}
      >
        <div className="flex items-center justify-between p-4 md:hidden border-b border-slate-100 mb-4">
          <span className="font-heading font-bold text-lg text-slate-900">
            Điều hướng
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-1 px-4 md:pt-6">
          {ADMIN_MENUS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={navItemStyles}
              onClick={onClose}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="truncate">{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSideBar;
