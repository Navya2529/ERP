import { useState, useRef, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";

const TopNavbar = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /* CLOSE DROPDOWN ON OUTSIDE CLICK */

  useEffect(() => {

    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);

  }, []);

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-6 ml-64">

      {/* Left */}
      <h2 className="text-lg font-semibold text-gray-700">
        Dashboard
      </h2>

      {/* Right */}
      <div className="flex items-center gap-6 relative" ref={dropdownRef}>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <Bell className="text-gray-600 hover:text-indigo-600 transition" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer"
        >

          <img
            src={`https://ui-avatars.com/api/?name=${user?.role || "User"}&background=4f46e5&color=fff`}
            alt="profile"
            className="w-9 h-9 rounded-full border"
          />

          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-800">
              {user?.email || "User"}
            </p>

            <p className="text-xs text-gray-500">
              {user?.role}
            </p>
          </div>

          <ChevronDown size={16} className="text-gray-500" />

        </div>

        {/* Dropdown */}

        {open && (
          <div className="absolute right-0 top-14 w-48 bg-white shadow-lg rounded-lg border py-2 z-50">

            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
              <User size={16} />
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default TopNavbar;