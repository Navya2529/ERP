import { useEffect, useState } from "react";
import { getHostelOccupancy } from "../../services/hostelService";

const Hostel = () => {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {

    try {

      const res = await getHostelOccupancy();
      setRooms(res.data);

    } catch {

      alert("Failed to load rooms");

    }

  };

  /* ================= INSIGHTS ================= */

  const totalRooms = rooms.length;

  const totalBeds = rooms.reduce(
    (sum, r) => sum + r.capacity,
    0
  );

  const totalOccupied = rooms.reduce(
    (sum, r) => sum + r.occupied,
    0
  );

  const availableBeds = totalBeds - totalOccupied;

  return (
    <div className="space-y-8">

      <h1 className="text-2xl font-bold">
        Hostel Occupancy
      </h1>

      {/* ================= STATS ================= */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Total Rooms
          </p>
          <h2 className="text-2xl font-bold">
            {totalRooms}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Total Beds
          </p>
          <h2 className="text-2xl font-bold text-indigo-600">
            {totalBeds}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Occupied Beds
          </p>
          <h2 className="text-2xl font-bold text-green-600">
            {totalOccupied}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Available Beds
          </p>
          <h2 className="text-2xl font-bold text-red-600">
            {availableBeds}
          </h2>
        </div>

      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="px-6 py-4 border-b">

          <h2 className="font-semibold">
            Room Status
          </h2>

        </div>

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">

            <tr>
              <th className="px-6 py-3 text-left">Room</th>
              <th className="px-6 py-3 text-left">Capacity</th>
              <th className="px-6 py-3 text-left">Occupied</th>
              <th className="px-6 py-3 text-left">Available</th>
              <th className="px-6 py-3 text-left">Occupancy</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {rooms.map(room => {

              const available =
                room.capacity - room.occupied;

              const percent =
                (room.occupied / room.capacity) * 100;

              const isFull = available === 0;

              return (

                <tr key={room.roomNumber} className="border-b">

                  <td className="px-6 py-3 font-medium">
                    {room.roomNumber}
                  </td>

                  <td className="px-6 py-3">
                    {room.capacity}
                  </td>

                  <td className="px-6 py-3 text-green-600 font-semibold">
                    {room.occupied}
                  </td>

                  <td className="px-6 py-3 text-red-600 font-semibold">
                    {available}
                  </td>

                  {/* OCCUPANCY BAR */}

                  <td className="px-6 py-3 w-[200px]">

                    <div className="w-full bg-gray-200 rounded-full h-2">

                      <div
                        className={`h-2 rounded-full ${
                          isFull
                            ? "bg-red-500"
                            : "bg-indigo-600"
                        }`}
                        style={{ width: `${percent}%` }}
                      />

                    </div>

                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-3">

                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold
                      ${
                        isFull
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >

                      {isFull ? "Full" : "Available"}

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

export default Hostel;