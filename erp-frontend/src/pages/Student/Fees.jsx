

const Fees = () => {

  const student = students[0];

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Fee Status
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        <p className="text-lg">
          Current Fee Status:
          <span className={`ml-3 font-bold ${
            student.feeStatus === "Paid"
            ? "text-green-600"
            : "text-red-600"
          }`}>
            {student.feeStatus}
          </span>
        </p>

      </div>

    </div>
  );
};

export default Fees;