import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../services/studentService";

const Hostel = () => {

  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {

    try {

      const res = await getStudentDashboard();

      setStudent(res.data);

    } catch {

      console.error("Failed to load hostel info");

    }

  };

  if (!student) return <p>Loading...</p>;

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Hostel Information
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">

        {student.hostelRoom ? (

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500 text-sm">
                Room Number
              </p>

              <p className="text-xl font-semibold">
                {student.hostelRoom}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Hostel Block
              </p>

              <p className="text-xl font-semibold">
                {student.hostelBlock || "A"}
              </p>
            </div>

          </div>

        ) : (

          <div className="text-center py-10">

            <p className="text-lg text-gray-500">
              Hostel Not Allocated
            </p>

          </div>

        )}

      </div>

    </div>

  );

};

export default Hostel;