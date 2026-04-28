import { useState } from "react";
import { createStudent } from "../../services/studentService";

const Admissions = () => {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    course: "",
    department: "",
    year: "",
    semester: "",
    gender: "",
    dob: ""
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await createStudent(formData);

      alert("Student created successfully");

      console.log(res.data);

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        course: "",
        department: "",
        year: "",
        semester: "",
        gender: "",
        dob: ""
      });

    } catch (error) {

      console.error("Student creation failed", error);

      alert("Failed to create student");

    }

  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        New Student Admission
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow grid md:grid-cols-2 gap-6"
      >

        <input
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="semester"
          placeholder="Semester"
          value={formData.semester}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <input
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="col-span-2 bg-indigo-600 text-white py-3 rounded-lg"
        >
          Create Student
        </button>

      </form>

    </div>
  );
};

export default Admissions;