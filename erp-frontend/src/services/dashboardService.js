import API from "../api/axios";

/* ================= ADMIN DASHBOARD ================= */

export const getAdminDashboard = async () => {
  const res = await API.get("/dashboard/admin");
  return res.data;
};

/* ================= ADMISSION DASHBOARD ================= */

export const getAdmissionsStats = async () => {
  const res = await API.get("/dashboard/admissions");
  return res.data;
};

/* ================= FEES DASHBOARD ================= */

export const getFeesStats = async () => {
  const res = await API.get("/dashboard/fees");
  return res.data;
};

/* ================= HOSTEL DASHBOARD ================= */

export const getHostelStats = async () => {
  const res = await API.get("/dashboard/hostel");
  return res.data;
};

/* ================= LIBRARY DASHBOARD ================= */

export const getLibraryStats = async () => {
  const res = await API.get("/dashboard/library");
  return res.data;
};

/* ================= EXAM DASHBOARD ================= */

export const getExamStats = async () => {
  const res = await API.get("/dashboard/exams");
  return res.data;
};