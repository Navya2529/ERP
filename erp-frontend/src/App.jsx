import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";

/* ================= ADMIN ================= */

import AdminDashboard from "./pages/Admin/AdminDashboard";
import Students from "./pages/Admin/Students";
import Admissions from "./pages/Admin/Admissions";
import Fees from "./pages/Admin/Fees";
import Approval from "./pages/Admin/Approval";
import Library from "./pages/Admin/Library";
import Exams from "./pages/Admin/Exams";

/* ================= ACCOUNTANT ================= */

import AccountantDashboard from "./pages/Accountant/AccountantDashboard";
import AccountantStudents from "./pages/Accountant/Students";
import AccountantFees from "./pages/Accountant/Fees";

/* ================= WARDEN ================= */

import WardenDashboard from "./pages/Warden/WardenDashboard";
import AllocateHostel from "./pages/Warden/AllocateHostel";
import WardenHostel from "./pages/Warden/Hostel";

/* ================= LIBRARIAN ================= */

import IssueBook from "./pages/library/IssueBook";
import ReturnBook from "./pages/library/ReturnBook";
import LibraryDashboard from "./pages/library/LibraryDashboard";
import IssuedBooks from "./pages/library/IssuedBooks";

/* ================= STUDENT ================= */

import StudentDashboard from "./pages/Student/StudentDashboard";
import Profile from "./pages/Student/Profile";
import FeesStudent from "./pages/Student/Fees";
import LibraryStudent from "./pages/Student/Library";
import Attendance from "./pages/Student/Attendence";
import Marks from "./pages/Student/Marks";
import HostelStudent from "./pages/Student/Hostel";
import ExamRegister from "./pages/Student/ExamRegister";

function App() {
  return (
    <>

      {/* GLOBAL TOAST NOTIFICATIONS */}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#111827",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />

      <AuthProvider>

        <Routes>

          {/* ================= LOGIN ================= */}

          <Route path="/" element={<Login />} />

          {/* ================= ADMIN ================= */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="fees" element={<Fees />} />
            <Route path="approval" element={<Approval />} />
            <Route path="library" element={<Library />} />
            <Route path="exams" element={<Exams />} />
          </Route>

          {/* ================= ACCOUNTANT ================= */}

          <Route
            path="/accountant"
            element={
              <ProtectedRoute allowedRoles={["ACCOUNTANT"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<AccountantDashboard />} />
            <Route path="students" element={<AccountantStudents />} />
            <Route path="fees" element={<AccountantFees />} />
          </Route>

          {/* ================= WARDEN ================= */}

          <Route
            path="/warden"
            element={
              <ProtectedRoute allowedRoles={["WARDEN"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<WardenDashboard />} />
            <Route path="students" element={<AllocateHostel />} />
            <Route path="hostel" element={<WardenHostel />} />
          </Route>

          {/* ================= LIBRARIAN ================= */}

          <Route
            path="/library"
            element={
              <ProtectedRoute allowedRoles={["LIBRARIAN"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<LibraryDashboard />} />
            <Route path="issue" element={<IssueBook />} />
            <Route path="return" element={<ReturnBook />} />
            <Route path="issued-books" element={<IssuedBooks />} />
          </Route>

          {/* ================= STUDENT ================= */}

          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={["STUDENT"]}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="fees" element={<FeesStudent />} />
            <Route path="library" element={<LibraryStudent />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="marks" element={<Marks />} />
            <Route path="hostel" element={<HostelStudent />} />
            <Route path="exam-register" element={<ExamRegister />} />
          </Route>

          {/* ================= FALLBACK ================= */}

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>

      </AuthProvider>

    </>
  );
}

export default App;