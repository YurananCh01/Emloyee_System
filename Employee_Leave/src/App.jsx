import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './component/Login.jsx'
import Dashboard from './component/dashboard.jsx'
import Home from './component/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Employee from './component/Employee.jsx'
import AddEmployee from './component/AddEmployee.jsx'
import EditEmployee from './component/EditEmployee.jsx'
import EmployeeDetail from './component/EmployeeDetail.jsx'
import ManagerDetail from './component/ManagerDetail.jsx'
import HistoryLeave from './component/HistoryLeave.jsx'
import DashboardEmployee from './component/dashboardEmployee.jsx'
import DashboardManager from './component/dashboardManager.jsx'
import HistoryEmployee from './component/HistoryEmployee.jsx'
import HistoryEmployeeDepartment from './component/HistoryEmployeeDepartment.jsx'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        {/* employee */}
        <Route path='/dashboardEmployee' element={<DashboardEmployee />}>
          <Route path='/dashboardEmployee/employee_detail/:id' element={<EmployeeDetail />}></Route>
          <Route path='/dashboardEmployee/history_employee/:id' element={<HistoryEmployee />}></Route>
        </Route>

        {/* manager */}
        <Route path='/dashboardManager' element={<DashboardManager />}>
          <Route path='/dashboardManager/manager_detail/:id' element={<ManagerDetail />}></Route>
          <Route path='/dashboardManager/history_employee_department/:id' element={<HistoryEmployeeDepartment />}></Route>
        </Route>

        {/* admin */}
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/dashboard/history' element={<HistoryLeave />}></Route>
          <Route path='/dashboard/employee' element={<Employee />}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
