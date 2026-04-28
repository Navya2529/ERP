import { useState } from "react";

const Marks = () => {

  /* Example: current semester from student profile later */
  const currentSemester = 3;

  const semesters = Array.from(
    { length: currentSemester },
    (_, i) => i + 1
  );

  const [selectedSemester, setSelectedSemester] =
    useState(currentSemester);

  /* Sample marks data */

  const marksData = {
    1: [
      { subject: "Math", marks: 88 },
      { subject: "Physics", marks: 79 },
      { subject: "Programming", marks: 95 }
    ],
    2: [
      { subject: "Data Structures", marks: 82 },
      { subject: "Electronics", marks: 74 }
    ],
    3: [
      { subject: "DBMS", marks: 91 },
      { subject: "Operating Systems", marks: 86 }
    ]
  };

  const marks = marksData[selectedSemester] || [];

  /* Calculate average */

  const avg =
    marks.reduce((sum, m) => sum + m.marks, 0) /
    (marks.length || 1);

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Marks
        </h1>

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


      {/* SUMMARY CARD */}

      <div className="bg-indigo-600 text-white p-6 rounded-xl shadow">

        <p className="text-sm opacity-80">
          Average Score
        </p>

        <h2 className="text-3xl font-bold">
          {avg.toFixed(1)} / 100
        </h2>

      </div>


      {/* MARKS TABLE */}

      <div className="bg-white rounded-xl shadow p-6">

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-3">Subject</th>
              <th>Marks</th>
              <th>Grade</th>
            </tr>
          </thead>

          <tbody>

            {marks.map((m, i) => {

              const percent = m.marks;

              let grade = "A";
              let color = "bg-green-100 text-green-700";

              if (percent < 90) {
                grade = "B";
                color = "bg-yellow-100 text-yellow-700";
              }

              if (percent < 75) {
                grade = "C";
                color = "bg-red-100 text-red-700";
              }

              return (

                <tr
                  key={i}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="py-3 font-medium">
                    {m.subject}
                  </td>

                  {/* MARKS BAR */}

                  <td className="w-[300px]">

                    <div className="flex items-center gap-3">

                      <div className="w-full bg-gray-200 h-2 rounded-full">

                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{
                            width: `${percent}%`
                          }}
                        />

                      </div>

                      <span className="font-medium">
                        {percent}
                      </span>

                    </div>

                  </td>

                  {/* GRADE */}

                  <td>

                    <span
                      className={`px-2 py-1 text-xs rounded-full ${color}`}
                    >
                      {grade}
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

export default Marks;