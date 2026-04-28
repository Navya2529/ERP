import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../services/studentService";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

const StudentDashboard = () => {

  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {

    const res = await getStudentDashboard();
    setStudent(res.data);

  };

  if (!student) return <p>Loading...</p>;

  /* SAMPLE DATA FOR PERFORMANCE */

  const performanceData = [
    { subject: "Math", marks: 78 },
    { subject: "DBMS", marks: 85 },
    { subject: "OS", marks: 72 },
    { subject: "Networks", marks: 80 },
    { subject: "AI", marks: 90 }
  ];

  const timelineData = [
    { month: "Jan", attendance: 75 },
    { month: "Feb", attendance: 82 },
    { month: "Mar", attendance: 78 },
    { month: "Apr", attendance: 88 },
    { month: "May", attendance: 90 }
  ];

  return (

    <div>

      {/* HEADER */}

      <h1 className="text-2xl font-bold mb-6">
        Welcome {student.first_name} {student.last_name}
      </h1>

      {/* PROFILE INFO */}

      <div className="bg-white p-6 rounded-xl shadow mb-10 grid md:grid-cols-3 gap-6">

        <div>
          <p className="text-gray-500 text-sm">Department</p>
          <p className="font-semibold">{student.department}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Course</p>
          <p className="font-semibold">{student.course}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Year</p>
          <p className="font-semibold">{student.year}</p>
        </div>

      </div>


      {/* PERFORMANCE BAR GRAPH */}

      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-lg font-semibold mb-4">
          Academic Performance
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={performanceData}>

            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="marks" fill="#6366f1" />

          </BarChart>

        </ResponsiveContainer>

      </div>


      {/* ATTENDANCE TIMELINE */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Attendance Timeline
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={timelineData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#10b981"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default StudentDashboard;