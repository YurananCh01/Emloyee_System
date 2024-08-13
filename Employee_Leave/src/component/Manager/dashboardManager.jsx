import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../style.css';
import axios from 'axios';
import { useAuth } from '../../AuthContext'; // เพิ่มการนำเข้า AuthContext
import logo from '../../assets/logo-step2.png';
import { Helmet } from 'react-helmet'; 


const dashboardManager = () => {
  const [manager, setManager] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { role,logout } = useAuth(); // รับบทบาทจาก AuthContext

  useEffect(() => {
    // ตรวจสอบบทบาทผู้ใช้
    if (role !== 'manager') {
      navigate('/login'); // หากไม่ได้ล็อกอินเป็นผู้จัดการให้นำทางไปยังหน้าเข้าสู่ระบบ
    }

    // ดึงข้อมูลผู้จัดการ
    axios.get(`http://192.168.59.1:3000/manager/manager_detail/${id}`)
      .then(result => {
        if (result.data.loginStatus) {
          setManager(result.data.data);
        } else {
          console.log(result.data.Error);
          navigate('/login'); // หากไม่สามารถดึงข้อมูลได้ ให้นำทางไปยังหน้าเข้าสู่ระบบ
        }
      })
      .catch(err => {
        console.error(err);
        navigate('/login'); // หากเกิดข้อผิดพลาด ให้นำทางไปยังหน้าเข้าสู่ระบบ
      });
  }, [id, role, navigate]);

  const handleLogout = () => {
    axios.get('http://192.168.59.1:3000/manager/logout')
      .then(result => {
        if (result.data.Status) {
          logout();
          navigate('/login'); // เมื่อ Logout เสร็จสามารถใช้ navigate เพื่อเปลี่ยนหน้าได้
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container-fluid'>
      <Helmet>
        <title>บริษัท สเตป โซลูชั่นส์ จำกัด</title>
        <link rel="icon" href={logo} type="image/jpeg" />
      </Helmet>
      <div className='row flex-nowrap'>
        {/* คอลัมน์สำหรับแถบด้านข้าง */}
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
          <img src={logo} alt="Logo" className='mb-3' style={{ width: '80%', height: 'auto' }} />
            <h5>บริษัท สเตป โซลูชั่นส์ จำกัด</h5>
            {/* เมนูการนำทาง */}
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
              <li className='w-100'>
                <Link to={`/dashboardManager/manager_leave/${manager ? manager.id : ''}`} className='nav-link text-white'>
                  <i className="fs-4 bi bi-person-circle ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>หน้าหลัก</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link to={`/dashboardManager/manager_detail/${manager ? manager.id : ''}`} className='nav-link text-white'>
                  <i className="fs-4 bi-person-vcard ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>รายละเอียดการขอลางาน</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link to={`/dashboardManager/history_employee_department/${manager ? manager.id : ''}`} className='nav-link text-white'>
                  <i className="fs-4 bi-clock-history ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>ประวัติการลาของพนักงาน</span>
                </Link>
              </li>
              <li className='w-100' onClick={handleLogout}>
                <Link className='nav-link text-white'>
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>ออกจากระบบ</span>
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
  );
}

export default dashboardManager