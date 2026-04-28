import { useEffect, useState } from "react";
import { getStudents } from "../../services/studentService";

const Fees = () => {

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 15;

  useEffect(() => {

    const fetchStudents = async () => {

      try {

        const res = await getStudents();

        const data = res.data.data || [];

        setStudents(data);
        setFilteredStudents(data);

      } catch (error) {

        console.error("Failed to fetch students", error);

      }

    };

    fetchStudents();

  }, []);

  /* ================= SEARCH ================= */

  useEffect(() => {

    let data = [...students];

    if (search) {

      data = data.filter(student => {

        const fullName =
          `${student.first_name} ${student.last_name}`.toLowerCase();

        return (
          fullName.includes(search.toLowerCase()) ||
          String(student.student_id).includes(search)
        );

      });

    }

    setFilteredStudents(data);
    setCurrentPage(1);

  }, [search, students]);

  /* ================= PAGINATION ================= */

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredStudents.length / recordsPerPage
  );

  const paginate = (page) => setCurrentPage(page);

  /* ================= STATS ================= */

  const paid = students.filter(
    s => s.fee_status === "PAID"
  ).length;

  const pending = students.length - paid;

  return (

    <div>

      {/* HEADER */}

      <h1 className="text-2xl font-bold mb-6">
        Fee Management
      </h1>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Total Students
          </p>
          <h2 className="text-3xl font-bold">
            {students.length}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Fees Paid
          </p>
          <h2 className="text-3xl font-bold text-green-600">
            {paid}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Pending Fees
          </p>
          <h2 className="text-3xl font-bold text-red-600">
            {pending}
          </h2>
        </div>

      </div>

      {/* SEARCH */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-[260px]"
        />

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">

            <tr>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Year</th>
              <th className="p-4 text-left">Fee Status</th>
              <th className="p-4 text-left">Profile</th>
            </tr>

          </thead>

          <tbody>

            {currentStudents.map(student => (

              <tr
                key={student.student_id}
                className="border-b hover:bg-gray-50"
              >

                {/* STUDENT */}

                <td className="p-4 flex items-center gap-3">

                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-full font-bold">

                    {student.first_name.charAt(0)}

                  </div>

                  <div>

                    <p className="font-semibold">
                      {student.first_name} {student.last_name}
                    </p>

                    <p className="text-xs text-gray-500">
                      ID: {student.student_id}
                    </p>

                  </div>

                </td>

                <td className="p-4">
                  {student.department}
                </td>

                <td className="p-4">
                  {student.course}
                </td>

                <td className="p-4">
                  {student.year}
                </td>

                {/* FEE STATUS */}

                <td className="p-4">

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold
                    ${
                      student.fee_status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {student.fee_status || "Pending"}

                  </span>

                </td>

                {/* PROFILE */}

                <td className="p-4">

                  <button
                    onClick={()=>setSelectedStudent(student)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    View
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}

      <div className="flex justify-center mt-6 gap-2">

        {[...Array(totalPages)].map((_, index) => (

          <button
            key={index}
            onClick={()=>paginate(index + 1)}
            className={`px-4 py-2 rounded-lg text-sm
            ${
              currentPage === index + 1
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >

            {index + 1}

          </button>

        ))}

      </div>

      {/* PROFILE MODAL */}

      {selectedStudent && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-[520px] rounded-xl p-6 shadow-lg">

            <h2 className="text-xl font-bold mb-4">
              Student Profile
            </h2>

            <div className="space-y-2 text-sm">

              <p><b>Name:</b> {selectedStudent.first_name} {selectedStudent.last_name}</p>
              <p><b>Email:</b> {selectedStudent.email}</p>
              <p><b>Phone:</b> {selectedStudent.phone}</p>
              <p><b>Gender:</b> {selectedStudent.gender}</p>
              <p><b>DOB:</b> {selectedStudent.dob}</p>
              <p><b>Course:</b> {selectedStudent.course}</p>
              <p><b>Department:</b> {selectedStudent.department}</p>
              <p><b>Year:</b> {selectedStudent.year}</p>
              <p><b>Semester:</b> {selectedStudent.semester}</p>

            </div>

            <button
              onClick={()=>setSelectedStudent(null)}
              className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

};

export default Fees;