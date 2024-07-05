import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';
import axios from 'axios';

const DashboardEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3000/employee/detail/' + id)
      .then(result => {
        if (result.data.loginStatus) {
          setEmployee(result.data.data);
        } else {
          console.log(result.data.Error);
        }
      })
      .catch(err => console.log(err))
  }, [id]);

  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        {/* คอลัมน์สำหรับแถบด้านข้าง */}
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <h5>บริษัท สเตป โซลูชั่นส์ จำกัด</h5>
            {/* เมนูการนำทาง */}
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
              <li className='w-100'>
                <Link to={`/dashboardEmployee/employee_detail/${employee.id}`} className='nav-link text-white'>
                  <i className="fs-4 bi-person-vcard ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>แบบฟอร์มขอลา</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link to="/dashboardEmployee/historyEmployee" className='nav-link text-white'>
                  <i className="fs-4 bi-clock-history ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>ประวัติการลา</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col p-3 m-0'>
          <div className='p-2 d-flex justify-content-center shadow'>
            <h2>พนักงาน</h2>
          </div>
          <div className='mt-3'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardEmployee;
