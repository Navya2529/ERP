import { useEffect, useState } from "react";
import { getHostelOccupancy } from "../../services/hostelService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const WardenDashboard = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {

    try {

      const res = await getHostelOccupancy();
      setRooms(res.data);

    } catch {

      console.error("Failed to load hostel data");

    }

  };

  /* ================= CALCULATIONS ================= */

  const totalRooms = rooms.length;

  const totalCapacity = rooms.reduce(
    (sum, r) => sum + r.capacity,
    0
  );

  const totalOccupied = rooms.reduce(
    (sum, r) => sum + r.occupied,
    0
  );

  const availableBeds = totalCapacity - totalOccupied;

  const occupancyRate =
    totalCapacity > 0
      ? Math.round((totalOccupied / totalCapacity) * 100)
      : 0;

  /* ================= ROOM OCCUPANCY CHART ================= */

  const roomLabels = rooms.map(r => `Room ${r.room_number}`);

  const roomData = {
    labels: roomLabels,
    datasets: [
      {
        label: "Occupied Beds",
        data: rooms.map(r => r.occupied),
        backgroundColor: "#6366F1"
      },
      {
        label: "Capacity",
        data: rooms.map(r => r.capacity),
        backgroundColor: "#E5E7EB"
      }
    ]
  };

  /* ================= BED UTILIZATION ================= */

  const bedChart = {
    labels: ["Occupied Beds", "Available Beds"],
    datasets: [
      {
        data: [totalOccupied, availableBeds],
        backgroundColor: ["#22C55E", "#EF4444"]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold">
        Hostel Management Dashboard
      </h1>

      {/* ================= KPI CARDS ================= */}

      <div className="grid md:grid-cols-5 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Rooms</p>
          <h2 className="text-2xl font-bold">{totalRooms}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Beds</p>
          <h2 className="text-2xl font-bold text-indigo-600">
            {totalCapacity}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Occupied Beds</p>
          <h2 className="text-2xl font-bold text-green-600">
            {totalOccupied}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Available Beds</p>
          <h2 className="text-2xl font-bold text-red-600">
            {availableBeds}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Occupancy Rate</p>
          <h2 className="text-2xl font-bold text-purple-600">
            {occupancyRate}%
          </h2>
        </div>

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* ROOM OCCUPANCY */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4 text-sm">
            Room Occupancy Overview
          </h2>

          <div className="h-[260px]">
            <Bar data={roomData} options={chartOptions} />
          </div>

        </div>

        {/* BED UTILIZATION */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="font-semibold mb-4 text-sm">
            Bed Utilization
          </h2>

          <div className="h-[260px] flex justify-center">
            <Doughnut data={bedChart} options={chartOptions} />
          </div>

        </div>

      </div>

      {/* ================= ROOM TABLE ================= */}

      <div className="bg-white rounded-xl shadow">

        <div className="px-6 py-4 border-b">

          <h2 className="font-semibold">
            Hostel Room Status
          </h2>

        </div>

        <table className="w-full text-sm">

          <thead className="bg-gray-50">

            <tr>
              <th className="px-6 py-3 text-left">Room</th>
              <th className="px-6 py-3 text-left">Capacity</th>
              <th className="px-6 py-3 text-left">Occupied</th>
              <th className="px-6 py-3 text-left">Available</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {rooms.map(room => {

              const available = room.capacity - room.occupied;

              return (

                <tr key={room.id} className="border-b">

                  <td className="px-6 py-3">
                    {room.room_number}
                  </td>

                  <td className="px-6 py-3">
                    {room.capacity}
                  </td>

                  <td className="px-6 py-3 text-green-600 font-medium">
                    {room.occupied}
                  </td>

                  <td className="px-6 py-3 text-red-600 font-medium">
                    {available}
                  </td>

                  <td className="px-6 py-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        available === 0
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >

                      {available === 0 ? "Full" : "Available"}

                    </span>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default WardenDashboard;