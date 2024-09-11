import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login/Login.jsx';
import Dashboard from './component/Admin/dashboard.jsx';
import Home from './component/Admin/Home.jsx';
import Employee from './component/Admin/Employee.jsx';
import AddEmployee from './component/Admin/AddEmployee.jsx';
import EditEmployee from './component/Admin/EditEmployee.jsx';
import EmployeeDetail from './component/Employee/EmployeeDetail.jsx';
import ManagerDetail from './component/Manager/ManagerDetail.jsx';
import HistoryLeave from './component/Admin/HistoryLeave.jsx';
import DashboardEmployee from './component/Employee/dashboardEmployee.jsx';
import DashboardManager from './component/Manager/dashboardManager.jsx';
import HistoryEmployee from './component/Employee/HistoryEmployee.jsx';
import HistoryEmployeeDepartment from './component/Manager/HistoryEmployeeDepartment.jsx';
import { AuthProvider, useAuth } from './AuthContext';
import LeaveManager from './component/Manager/LeaveManager.jsx';
import ResetPassword from './component/Employee/resetPassword.jsx';

const PrivateRoute = ({ children, role }) => {
  const { role: userRole } = useAuth();
  if (userRole !== role) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* employee */}
          <Route path="/dashboardEmployee" element={<PrivateRoute role="employee"><DashboardEmployee /></PrivateRoute>}>
            <Route path="/dashboardEmployee/employee_detail/:id" element={<EmployeeDetail />} />
            <Route path="/dashboardEmployee/history_employee/:id" element={<HistoryEmployee />} />
            <Route path="/dashboardEmployee/resetPassword/:id" element={<ResetPassword />} />
          </Route>
          
          {/* manager */}
          <Route path="/dashboardManager" element={<PrivateRoute role="manager"><DashboardManager /></PrivateRoute>}>
          <Route path="/dashboardManager/manager_leave/:id" element={<LeaveManager />} />
            <Route path="/dashboardManager/manager_detail/:id" element={<ManagerDetail />} />
            <Route path="/dashboardManager/history_employee_department/:id" element={<HistoryEmployeeDepartment />} />
            <Route path="/dashboardManager/resetPassword/:id" element={<ResetPassword />} />
          </Route>
          
          {/* admin */}
          <Route path="/dashboard" element={<PrivateRoute role="admin"><Dashboard /></PrivateRoute>}>
            <Route path="" element={<Home />} />
            <Route path="/dashboard/history" element={<HistoryLeave />} />
            <Route path="/dashboard/employee" element={<Employee />} />
            <Route path="/dashboard/add_employee" element={<AddEmployee />} />
            <Route path="/dashboard/edit_employee/:id" element={<EditEmployee />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
