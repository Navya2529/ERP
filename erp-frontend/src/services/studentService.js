import API from "../api/axios";

/* ================= ADMIN STUDENT APIs ================= */

/* Get all students (Admin / Accountant) */
export const getStudents = () => {
  return API.get("/students");
};

/* Get student by ID */
export const getStudentById = (id) => {
  return API.get(`/students/${id}`);
};

/* Create new student */
export const createStudent = (data) => {
  return API.post("/students/create", data);
};

/* Approve student admission */
export const approveAdmission = (id) => {
  return API.put(`/admission/approve/${id}`);
};


/* ================= STUDENT SELF APIs ================= */

/* Logged-in student dashboard data */
export const getStudentDashboard = () => {
  return API.get("/students/me");
};

/* Alias if needed in other pages */
export const getCurrentStudent = () => {
  return API.get("/students/me");
};