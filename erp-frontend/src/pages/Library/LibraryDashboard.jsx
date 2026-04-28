import { useEffect, useState } from "react";
import { getLibraryStats } from "../../services/dashboardService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

const LibraryDashboard = () => {

  const [stats, setStats] = useState({
    issuedBooks: 0,
    pendingFines: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {

    try {

      const data = await getLibraryStats();
      setStats(data);

    } catch {

      alert("Failed to load library stats");

    }

  };

  /* SAMPLE ANALYTICS DATA (later connect API) */

  const bookData = [
    { name: "Mon", issued: 4, returned: 2 },
    { name: "Tue", issued: 6, returned: 3 },
    { name: "Wed", issued: 5, returned: 4 },
    { name: "Thu", issued: 8, returned: 5 },
    { name: "Fri", issued: 7, returned: 6 },
    { name: "Sat", issued: 3, returned: 4 }
  ];

  const timelineData = [
    { name: "Week 1", activity: 20 },
    { name: "Week 2", activity: 35 },
    { name: "Week 3", activity: 28 },
    { name: "Week 4", activity: 42 }
  ];

  return (

    <div>

      <h1 className="text-2xl font-bold mb-8">
        Library Dashboard
      </h1>

      {/* STATS CARDS */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-gray-500 text-sm">
            Books Issued
          </p>

          <h2 className="text-4xl font-bold text-indigo-600">
            {stats.issuedBooks}
          </h2>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-gray-500 text-sm">
            Pending Fines
          </p>

          <h2 className="text-4xl font-bold text-red-600">
            ₹{stats.pendingFines}
          </h2>

        </div>

      </div>


      {/* BAR GRAPH */}

      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-lg font-semibold mb-4">
          Books Issued vs Returned
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={bookData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="issued" fill="#6366f1" />

            <Bar dataKey="returned" fill="#10b981" />

          </BarChart>

        </ResponsiveContainer>

      </div>


      {/* TIMELINE GRAPH */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Library Activity Timeline
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={timelineData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="activity"
              stroke="#6366f1"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default LibraryDashboard;