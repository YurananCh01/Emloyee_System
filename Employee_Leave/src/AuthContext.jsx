import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    const storedRole = localStorage.getItem('role');
    return storedRole ? JSON.parse(storedRole) : null;
  });
  const [userId, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? JSON.parse(storedUserId) : null;
  });
  const [logoutTimeout, setLogoutTimeout] = useState(null);

  const login = (userRole, id) => {
    setRole(userRole);
    setUserId(id);
    localStorage.setItem('role', JSON.stringify(userRole));
    localStorage.setItem('userId', JSON.stringify(id));

    // ตั้งเวลาล็อกเอาต์ 30 นาที
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }
    const timeout = setTimeout(() => {
      logout();
      alert("คุณถูก Logout เนื่องจากไม่มีการใช้งาน");
    }, 30 * 60 * 1000); // 30 นาที
    setLogoutTimeout(timeout);
  };

  const logout = () => {
    setRole(null);
    setUserId(null);
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }
  };

  // ตรวจสอบผู้ใช้ที่ล็อกอินเมื่อเริ่มต้น
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedUserId = localStorage.getItem('userId');
    if (storedRole) {
      setRole(JSON.parse(storedRole));
    }
    if (storedUserId) {
      setUserId(JSON.parse(storedUserId));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};