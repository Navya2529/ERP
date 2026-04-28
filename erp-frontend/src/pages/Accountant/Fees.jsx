import { useState } from "react";
import { payFee } from "../../services/feeService";
import toast from "react-hot-toast";

const Fees = () => {

  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");

  const handlePay = async () => {

    try {

      await payFee({
        studentId,
        amount
      });

      toast.success("Fee paid successfully");

      setStudentId("");
      setAmount("");

    } catch {

      toast.error("Payment failed");

    }

  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Pay Student Fee
      </h1>

      <div className="bg-white p-6 rounded-xl shadow w-[420px]">

        <div className="mb-4">

          <label className="block text-sm mb-1">
            Student ID
          </label>

          <input
            type="text"
            value={studentId}
            onChange={(e)=>setStudentId(e.target.value)}
            className="border w-full p-2 rounded"
          />

        </div>

        <div className="mb-4">

          <label className="block text-sm mb-1">
            Amount
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e)=>setAmount(e.target.value)}
            className="border w-full p-2 rounded"
          />

        </div>

        <button
          onClick={handlePay}
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
        >
          Pay Fee
        </button>

      </div>

    </div>
  );
};

export default Fees;