import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= RESTORE USER ON REFRESH ================= */

  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setUser({ role });
    }

    setLoading(false);

  }, []);

  /* ================= LOGIN ================= */

  const login = async (email, password, roleType) => {

    const res = await API.post("/auth/login", {
      email,
      password,
      role: roleType
    });

    const { accessToken, role } = res.data;

    /* STORE TOKEN */

    localStorage.setItem("token", accessToken);
    localStorage.setItem("role", role);

    /* SET USER */

    const userData = { role };

    setUser(userData);

    return role;
  };

  /* ================= LOGOUT ================= */

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

/* ================= CUSTOM HOOK ================= */

export const useAuth = () => useContext(AuthContext);