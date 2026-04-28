import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen bg-gray-100">

        {/* Top Navbar */}
        <TopNavbar />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;