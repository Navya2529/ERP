import { useState } from "react";

const Attendance = () => {

  /* assume this comes from student profile later */
  const currentSemester = 3;

  const semesters = Array.from(
    { length: currentSemester },
    (_, i) => i + 1
  );

  const [selectedSemester, setSelectedSemester] =
    useState(currentSemester);

  /* sample attendance data */

  const attendanceData = {
    1: [
      { subject: "Math", percentage: 90 },
      { subject: "Physics", percentage: 85 },
      { subject: "Programming", percentage: 95 }
    ],
    2: [
      { subject: "Data Structures", percentage: 88 },
      { subject: "Electronics", percentage: 82 }
    ],
    3: [
      { subject: "DBMS", percentage: 92 },
      { subject: "Operating Systems", percentage: 87 }
    ]
  };

  const attendance = attendanceData[selectedSemester] || [];

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Attendance
        </h1>

        {/* SEMESTER DROPDOWN */}

        <select
          value={selectedSemester}
          onChange={(e) =>
            setSelectedSemester(Number(e.target.value))
          }
          className="border rounded-lg px-3 py-2 text-sm"
        >

          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}

        </select>

      </div>


      {/* ATTENDANCE CARD */}

      <div className="bg-white rounded-xl shadow p-6">

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-3">Subject</th>
              <th>Attendance</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {attendance.map((a, i) => {

              const percent = a.percentage;

              let color = "bg-green-500";
              let status = "Good";

              if (percent < 75) {
                color = "bg-red-500";
                status = "Low";
              } else if (percent < 85) {
                color = "bg-yellow-500";
                status = "Warning";
              }

              return (

                <tr
                  key={i}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-3 font-medium">
                    {a.subject}
                  </td>

                  {/* PROGRESS BAR */}

                  <td className="w-[300px]">

                    <div className="flex items-center gap-3">

                      <div className="w-full bg-gray-200 h-2 rounded-full">

                        <div
                          className={`${color} h-2 rounded-full`}
                          style={{
                            width: `${percent}%`
                          }}
                        />

                      </div>

                      <span className="text-sm font-medium">
                        {percent}%
                      </span>

                    </div>

                  </td>

                  {/* STATUS */}

                  <td>

                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        percent >= 85
                          ? "bg-green-100 text-green-700"
                          : percent >= 75
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {status}

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

export default Attendance;