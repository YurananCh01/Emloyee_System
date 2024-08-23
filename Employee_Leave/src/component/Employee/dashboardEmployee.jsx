import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './Employee.css';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import logo from '../../assets/logo-step2.png';

const DashboardEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { role, logout } = useAuth(); // รับบทบาทและฟังก์ชัน logout จาก AuthContext

  useEffect(() => {
    // ตรวจสอบบทบาทผู้ใช้
    if (role !== 'employee') {
      navigate('/login'); // หากไม่ได้ล็อกอินเป็นพนักงานให้นำทางไปยังหน้าเข้าสู่ระบบ
    }

    // ดึงข้อมูลพนักงาน
    axios.get(`http://172.16.251.92:3000/employee/detail/${id}`)
      .then(result => {
        if (result.data.loginStatus) {
          setEmployee(result.data.data);
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
    axios.get('http://172.16.251.92:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          logout(); // เรียกใช้ฟังก์ชัน logout จาก AuthContext
          navigate('/login'); // เมื่อ Logout เสร็จสามารถใช้ navigate เพื่อเปลี่ยนหน้าได้
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
          <img src={logo} alt="Logo" className='mb-3' style={{ width: '80%', height: 'auto' }} />
            <h5>บริษัท สเตป โซลูชั่นส์ จำกัด</h5>
            {/* เมนูการนำทาง */}
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start' id='menu'>
              <li className='w-100'>
                <Link to={`/dashboardEmployee/employee_detail/${employee ? employee.id : ''}`} className='nav-link text-white'>
                  <i className="fs-4 bi-person-vcard ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>แบบฟอร์มขอลา</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link to={`/dashboardEmployee/history_employee/${employee ? employee.id : ''}`} className='nav-link text-white'>
                  <i className="fs-4 bi-clock-history ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>ประวัติการลา</span>
                </Link>
              </li>
              <li className='w-100'>
                <Link to={`/dashboardEmployee/resetPassword/${employee ? employee.id : ''}`} className='nav-link text-white'>
                  <i className="fs-4 bi-file-lock2-fill ms-2"></i>
                  <span className='ms-2 d-none d-sm-inline'>เปลี่ยนรหัสผ่าน</span>
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
            <h2>พนักงาน</h2>
          </div>
          <div className='mt-3'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployee;
