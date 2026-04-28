import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleType, setRoleType] = useState("ADMIN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  /* ================= ROLE ROUTES ================= */

  const roleRoutes = {
    ADMIN: "/admin/dashboard",
    ACCOUNTANT: "/accountant/dashboard",
    WARDEN: "/warden/dashboard",
    LIBRARIAN: "/library/dashboard",
    STUDENT: "/student/dashboard"
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const role = await login(email, password, roleType);

      const redirectPath = roleRoutes[role];

      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate("/");
      }

    } catch (err) {

      setError("Invalid email or password");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 space-y-8">

        <h2 className="text-3xl font-bold text-gray-800 text-center">
          ERP Login
        </h2>

        {/* ROLE BUTTONS */}

        <div className="flex flex-wrap gap-3 justify-center">

          {["ADMIN", "ACCOUNTANT", "WARDEN", "LIBRARIAN", "STUDENT"].map((role) => (

            <button
              key={role}
              type="button"
              onClick={() => setRoleType(role)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                roleType === role
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {role}
            </button>

          ))}

        </div>

        {/* LOGIN FORM */}

        <form onSubmit={handleSubmit} className="space-y-5">

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : `Login as ${roleType}`}
          </button>

        </form>

      </div>

    </div>

  );

};

export default Login;