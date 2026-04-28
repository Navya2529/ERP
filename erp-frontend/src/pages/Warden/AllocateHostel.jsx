import { useState } from "react";
import { allocateHostel } from "../../services/hostelService";

const AllocateHostel = () => {

  const [studentId, setStudentId] = useState("");

  const handleAllocate = async () => {

    try {

      const res = await allocateHostel({ studentId });

      alert(
        `Room Allocated: ${res.data.roomNumber}`
      );

      setStudentId("");

    } catch (error) {

      alert(error.response?.data?.message || "Allocation failed");

    }

  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Allocate Hostel Room
      </h1>

      <div className="bg-white p-6 rounded-xl shadow w-[400px]">

        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleAllocate}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Allocate Room
        </button>

      </div>

    </div>
  );
};

export default AllocateHostel;