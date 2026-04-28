import { useEffect, useState } from "react";
import { getStudents } from "../../services/studentService";

const Students = () => {

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

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

  /* ================= SEARCH + FILTER ================= */

  useEffect(() => {

    let data = [...students];

    /* SEARCH BY NAME OR ID */

    if (search) {

      data = data.filter((student) => {

        const fullName =
          `${student.first_name} ${student.last_name}`.toLowerCase();

        return (
          fullName.includes(search.toLowerCase()) ||
          String(student.student_id).includes(search)
        );

      });

    }

    /* FILTER STATUS */

    if (statusFilter !== "ALL") {

      data = data.filter(
        (student) =>
          student.admission_status.toLowerCase() ===
          statusFilter.toLowerCase()
      );

    }

    setFilteredStudents(data);
    setCurrentPage(1);

  }, [search, statusFilter, students]);

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

  const approved = students.filter(
    (s) => s.admission_status.toLowerCase() === "approved"
  ).length;

  const pending = students.filter(
    (s) => s.admission_status.toLowerCase() === "pending"
  ).length;

  return (

    <div>

      {/* HEADER */}

      <h1 className="text-2xl font-bold mb-6">
        Student Management
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
            Approved
          </p>
          <h2 className="text-3xl font-bold text-green-600">
            {approved}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">
            Pending
          </p>
          <h2 className="text-3xl font-bold text-orange-500">
            {pending}
          </h2>
        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-[260px]"
        />

        <select
          value={statusFilter}
          onChange={(e)=>setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >

          <option value="ALL">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>

        </select>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">

            <tr>

              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {currentStudents.map((student) => (

              <tr
                key={student.student_id}
                className="border-b hover:bg-gray-50"
              >

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
                  {student.course}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-semibold
                    ${
                      student.admission_status.toLowerCase() === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >

                    {student.admission_status}

                  </span>

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
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium
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

    </div>

  );

};

export default Students;