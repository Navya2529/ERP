import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/dashboardService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const AdminDashboard = () => {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const data = await getAdminDashboard();
        setDashboard(data);

      } catch (error) {

        console.error("Dashboard load failed:", error);

      }

    };

    loadDashboard();

  }, []);

  if (!dashboard) return <div>Loading dashboard...</div>;

  /* ================= ADMISSIONS ================= */

  const admissionChart = {
    labels: ["Approved", "Pending"],
    datasets: [
      {
        label: "Admissions",
        data: [
          dashboard.summary.approvedAdmissions,
          dashboard.summary.pendingAdmissions
        ],
        backgroundColor: ["#10B981", "#F59E0B"],
        borderRadius: 6
      }
    ]
  };

  /* ================= FINANCE ================= */

  const financeChart = {
    labels: ["Fees Collected", "Pending Fines"],
    datasets: [
      {
        data: [
          dashboard.summary.feesCollected,
          dashboard.summary.pendingFines
        ],
        backgroundColor: ["#6366F1", "#EF4444"]
      }
    ]
  };

  /* ================= ACTIVITY ================= */

  const activityChart = {
    labels: ["Students", "Exams", "Library"],
    datasets: [
      {
        label: "System Activity",
        data: [
          dashboard.summary.students,
          dashboard.summary.examRegistrations,
          dashboard.summary.issuedBooks
        ],
        backgroundColor: ["#6366F1", "#8B5CF6", "#06B6D4"],
        borderRadius: 6
      }
    ]
  };

  /* ================= TREND LINE ================= */

  const trendChart = {
    labels: ["Students", "Admissions", "Exams", "Books"],
    datasets: [
      {
        label: "System Growth",
        data: [
          dashboard.summary.students,
          dashboard.summary.approvedAdmissions,
          dashboard.summary.examRegistrations,
          dashboard.summary.issuedBooks
        ],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99,102,241,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (

    <div>

      {/* Header */}

      <h1 className="text-2xl font-bold mb-2">
        {dashboard.message}
      </h1>

      <p className="text-gray-500 mb-8">
        System insights & analytics
      </p>

      {/* Stats Cards */}

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Students</p>
          <h2 className="text-xl font-bold">
            {dashboard.summary.students}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Approved</p>
          <h2 className="text-xl font-bold text-green-600">
            {dashboard.summary.approvedAdmissions}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-xl font-bold text-orange-500">
            {dashboard.summary.pendingAdmissions}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Fees</p>
          <h2 className="text-xl font-bold text-indigo-600">
            ₹{dashboard.summary.feesCollected}
          </h2>
        </div>

      </div>

      {/* Charts */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* Admissions */}

        <div className="bg-white p-4 rounded-lg shadow h-[260px]">

          <h3 className="font-semibold mb-3 text-sm">
            Admissions
          </h3>

          <Bar
            data={admissionChart}
            options={{ maintainAspectRatio: false }}
          />

        </div>

        {/* Finance */}

        <div className="bg-white p-4 rounded-lg shadow h-[260px]">

          <h3 className="font-semibold mb-3 text-sm">
            Finance
          </h3>

          <Doughnut
            data={financeChart}
            options={{ maintainAspectRatio: false }}
          />

        </div>

        {/* Activity */}

        <div className="bg-white p-4 rounded-lg shadow h-[260px]">

          <h3 className="font-semibold mb-3 text-sm">
            System Activity
          </h3>

          <Bar
            data={activityChart}
            options={{ maintainAspectRatio: false }}
          />

        </div>

        {/* Trend Line */}

        <div className="bg-white p-4 rounded-lg shadow h-[260px]">

          <h3 className="font-semibold mb-3 text-sm">
            Growth Trend
          </h3>

          <Line
            data={trendChart}
            options={{ maintainAspectRatio: false }}
          />

        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;