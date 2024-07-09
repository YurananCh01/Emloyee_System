import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './style.css';
import axios from 'axios';

const dashboardManager = () => {
  const [manager, setManager] = useState([]);
  const { id } = useParams();
  const anvigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/manager/manager_detail/'+id)
      .then(result => {
        if (result.data.loginStatus) {
          setManager(result.data.data);
        } else {
          console.log(result.data.Error);
        }
      })
      .catch(err => console.log(err))
  }, [id]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/manager/logout')
      .then(result => {
        if (result.data.Status) {
          anvigate('/login'); // เมื่อ Logout เสร็จสามารถใช้ navigate เพื่อเปลี่ยนหน้าได้
        }
      })
      .catch(err => console.log(err));
  };
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
                <Link to={`/dashboardManager/manager_detail/${manager.id}`} className='nav-link text-white'>
                  <i className="fs-4 bi-person-vcard ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>หน้าหลัก</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link to={`/dashboardManager/history_employee_department/${manager.id}`} className='nav-link text-white'>
                  <i className="fs-4 bi-clock-history ms-2"></i>
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
            <h2>ผู้จัดการ</h2>
          </div>
          <div className='mt-3'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default dashboardManager