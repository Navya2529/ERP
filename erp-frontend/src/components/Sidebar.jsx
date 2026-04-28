import { useAuth } from "../auth/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  BookOpen,
  GraduationCap,
  CheckCircle,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role || "ADMIN";

  const menuByRole = {
    ADMIN: [
      { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
      { name: "Students", path: "/admin/students", icon: Users },
      { name: "Approval", path: "/admin/approval", icon: CheckCircle },
      { name: "Fees", path: "/admin/fees", icon: CreditCard },
    ],

    ACCOUNTANT: [
      {
        name: "Dashboard",
        path: "/accountant/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Pay Student Fee",
        path: "/accountant/fees",
        icon: CreditCard,
      },
      {
        name: "Check Fee Status",
        path: "/accountant/students",
        icon: Users,
      },
    ],

    WARDEN: [
      { name: "Dashboard", path: "/warden/dashboard", icon: LayoutDashboard },
      { name: "Students", path: "/warden/students", icon: Users },
      { name: "Hostel", path: "/warden/hostel", icon: BookOpen },
    ],

    STUDENT: [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Profile",
    path: "/student/profile",
    icon: Users,
  },
  {
    name: "Attendance",
    path: "/student/attendance",
    icon: CheckCircle,
  },
  {
    name: "Marks",
    path: "/student/marks",
    icon: GraduationCap,
  },
  {
    name: "Hostel",
    path: "/student/hostel",
    icon: BookOpen,
  },
  {
    name: "Exam Registration",
    path: "/student/exam-register",
    icon: CreditCard,
  }
],
    LIBRARIAN: [
  {
    name: "Dashboard",
    path: "/library/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Issue Book",
    path: "/library/issue",
    icon: BookOpen,
  },
  {
    name: "Return Book",
    path: "/library/return",
    icon: CheckCircle,
  },
  {
    name: "Issued Books",
    path: "/library/issued-books",
    icon: Users,
  },
]
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-gradient-to-b from-slate-950 via-slate-900 to-black text-gray-300 flex flex-col justify-between border-r border-slate-800">

      {/* TOP */}
      <div>
        <div className="px-6 py-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white">JL ERP</h1>

          <p className="text-xs text-gray-400 mt-2">
            Logged in as
            <span className="ml-2 px-2 py-1 text-xs rounded-full bg-indigo-600 text-white">
              {role}
            </span>
          </p>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menuByRole[role]?.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {Icon && <Icon size={18} />}
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="p-6 border-t border-slate-800 space-y-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={18} />
          Logout
        </button>

        <div className="flex justify-center opacity-70 hover:opacity-100 transition">
          <img src="/company-logo.png" alt="Company Logo" className="h-8" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;