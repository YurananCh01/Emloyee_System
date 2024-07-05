import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';
import axios from 'axios';

const Dashboard = () => {
  const anvigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
      .then(result => {
        if (result.data.Status) {
          anvigate('/login')
        }
      })
  }


  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <Link
              to="/dashboard"
              className='d-flex align-items-center pb-3 mb-md-1 mt-mb-3 me-md-auto text-white text-decoration-none'
            >
              <span className='fs-5 fw-bolder d-none d-sm-inline'>บริษัท สเตป โซลูชั่นส์ จำกัด</span>
            </Link>
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
              <li className='w-100'>
                <Link to="/dashboard" className='nav-link text-white'>
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>Dashboard</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link to="/dashboard/employee" className='nav-link text-white'>
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>จัดการพนักงาน</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link to="/dashboard/history" className='nav-link text-white'>
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>ประวัติการลาของพนักงาน</span>
                </Link>
              </li>
              <li className='w-100' onClick={handleLogout}>
                <Link className='nav-link text-white'>
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='col p-3 m-0'>
          <div className='p-2 d-flex justify-content-center shadow'>
            <h2>...................</h2>
          </div>
          <div className='mt-3'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
