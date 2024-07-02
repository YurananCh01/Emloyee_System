import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './component/Login.jsx'
import Dashboard from './component/dashboard.jsx'
import Home from './component/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Employee from './component/Employee.jsx'
import AddEmployee from './component/AddEmployee.jsx'
import EditEmployee from './component/EditEmployee.jsx'
// import Start from './component/Start.jsx'
// import EmployeeLogin from './component/EmployeeLogin.jsx'
import EmployeeDetail from './component/EmployeeDetail.jsx'
// import Manager from './component/Manager.jsx'
// import AddManager from './component/AddManager.jsx'
// import EditManager from './component/EditManager.jsx'
// import ManagerLogin from './component/ManagerLogin.jsx'
import ManagerDetail from './component/ManagerDetail.jsx'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/manager_detail/:id' element={<ManagerDetail />}></Route>  
        <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          {/* <Route path='/dashboard/manager' element={<Manager />}></Route>
          <Route path='/dashboard/add_manager' element={<AddManager />}></Route>
          <Route path='/dashboard/edit_manager/:id' element={<EditManager />}></Route> */}
           <Route path='/dashboard/employee' element={<Employee />}></Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
          
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
