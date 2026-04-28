import { useEffect, useState } from "react";
import { getCurrentStudent } from "../../services/studentService";

const Profile = () => {

  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const res = await getCurrentStudent();
      setStudent(res.data);
    } catch {
      console.error("Failed to fetch student profile");
    }
  };

  if (!student) {
    return (
      <div className="flex justify-center items-center h-[300px] text-gray-500">
        Loading profile...
      </div>
    );
  }

  const initials =
    student.first_name?.charAt(0) + student.last_name?.charAt(0);

  return (
    <div className="space-y-8">

      {/* HEADER CARD */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg p-8 flex items-center gap-6">

        {/* AVATAR */}

        <div className="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-2xl font-bold">
          {initials}
        </div>

        {/* STUDENT INFO */}

        <div>
          <h1 className="text-2xl font-bold">
            {student.first_name} {student.last_name}
          </h1>

          <p className="opacity-90">
            {student.department} • Year {student.year}
          </p>

          <p className="text-sm opacity-80">
            Registration No: {student.registration_no}
          </p>
        </div>

      </div>


      {/* PROFILE DETAILS */}

      <div className="bg-white rounded-2xl shadow p-8">

        <h2 className="text-lg font-semibold mb-6">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <Info label="Email" value={student.email} />

          <Info label="Phone" value={student.phone || "N/A"} />

          <Info label="Department" value={student.department} />

          <Info label="Course" value={student.course} />

          <Info label="Year" value={student.year} />

          <Info label="Semester" value={student.semester} />

          <Info label="Gender" value={student.gender || "N/A"} />

          <Info label="Date of Birth" value={student.dob || "N/A"} />

        </div>

      </div>

    </div>
  );
};


/* SMALL REUSABLE COMPONENT */

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

export default Profile;