import { useState } from "react";
import { getFeeStatus } from "../../services/feeService";

const Students = () => {

  const [studentId, setStudentId] = useState("");
  const [fees, setFees] = useState([]);

  const handleCheck = async () => {

    try {

      const res = await getFeeStatus(studentId);

      setFees(res.data);

    } catch {

      alert("No fee records found");

    }

  };

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Fee Status
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e)=>setStudentId(e.target.value)}
            className="border p-2 rounded"
          />

          <button
            onClick={handleCheck}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Check Status
          </button>

        </div>

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b text-left">
              <th>Fee ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {fees.map(fee => (

              <tr key={fee.fee_id} className="border-b">

                <td>{fee.fee_id}</td>

                <td>₹ {fee.amount}</td>

                <td>
                  {new Date(fee.payment_date).toLocaleDateString()}
                </td>

                <td>

                  <span className="text-green-600 font-semibold">
                    {fee.payment_status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
};

export default Students;