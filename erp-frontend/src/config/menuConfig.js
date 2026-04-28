import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CreditCard,
  Home,
  BookOpen,
  ClipboardCheck,
  FileText,
  User,
} from "lucide-react";

export const menuByRole = {

  /* ================= ADMIN ================= */

  ADMIN: [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Students", path: "/admin/students", icon: Users },
    { name: "Admissions", path: "/admin/admissions", icon: GraduationCap },
    { name: "Fees", path: "/admin/fees", icon: CreditCard },
    { name: "Approval", path: "/admin/approval" },
    { name: "Library", path: "/admin/library", icon: BookOpen },
    { name: "Exams", path: "/admin/exams", icon: FileText },
  ],

  /* ================= STUDENT ================= */

  STUDENT: [
    { name: "Dashboard", path: "/student", icon: LayoutDashboard },
    { name: "Attendance", path: "/student/attendance", icon: ClipboardCheck },
    { name: "Fees", path: "/student/fees", icon: CreditCard },
    { name: "Marks", path: "/student/marks", icon: GraduationCap },
    { name: "Library", path: "/student/library", icon: BookOpen },
    { name: "Hostel", path: "/student/hostel", icon: Home },
    { name: "Profile", path: "/student/profile", icon: User },
  ],

  /* ================= ACCOUNTANT ================= */

  ACCOUNTANT: [
    { name: "Dashboard", path: "/accountant", icon: LayoutDashboard },
    { name: "Pay Fees", path: "/accountant/pay-fees", icon: CreditCard },
    { name: "Pending Fees", path: "/accountant/pending-fees", icon: FileText },
    { name: "Students", path: "/accountant/students", icon: Users },
  ],

  /* ================= WARDEN ================= */

  WARDEN: [
    { name: "Dashboard", path: "/warden", icon: LayoutDashboard },
    { name: "Hostel Occupancy", path: "/warden/occupancy", icon: Home },
    { name: "Allocate Hostel", path: "/warden/allocate", icon: Users },
  ],

  /* ================= LIBRARIAN ================= */

  LIBRARIAN: [
    { name: "Dashboard", path: "/admin/library", icon: LayoutDashboard },
    { name: "Issue Books", path: "/admin/library/issue", icon: BookOpen },
    { name: "Return Books", path: "/admin/library/return", icon: ClipboardCheck },
    { name: "Library Records", path: "/admin/library/records", icon: FileText },
  ],

};