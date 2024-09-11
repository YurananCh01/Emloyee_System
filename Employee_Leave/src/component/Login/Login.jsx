import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import logo from '../../assets/step-solutions-logo.jpg';
import { Helmet } from 'react-helmet'; 

const Login = () => {
  const [values, setValues] = useState({
    username: '', 
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/auth/login', values);
      console.log(result.data);
      const { role, id, loginStatus, Error } = result.data;

      if (loginStatus) {
        login(role, id);

        switch (role) {
          case 'admin':
            navigate('/dashboard');
            break;
          case 'employee':
            navigate(`/dashboardEmployee/employee_detail/${id}`);
            break;
          case 'manager':
            navigate(`/dashboardManager/manager_leave/${id}`);
            break;
          default:
            break;
        }
      } else {
        setError(Error || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      }
    } catch (err) {
      console.error(err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    }
  };

  return (
    <div className='bodyloginPage'>
       <Helmet>
        <title>บริษัท สเตป โซลูชั่นส์ จำกัด</title>
        <link rel="icon" href={logo} type="image/jpeg" />
      </Helmet>
      <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <form className='form' onSubmit={handleSubmit}>
          {error && <div className='text-danger'>{error}</div>}
          <h2>หน้าเข้าสู่ระบบ</h2>
          <span className='input-span'>
            <label htmlFor='username' className='label'>รหัสพนักงาน</label>
            <input
              type='username'
              name='username'
              id='username'
              autoComplete='off'
              placeholder='กรอกรหัสพนักงาน'
              onChange={(e) => setValues({ ...values, username: e.target.value })}
            />
          </span>
          <span className='input-span'>
            <label htmlFor='password' className='label'>รหัสผ่าน</label>
            <input
              type='password'
              name='password'
              id='password'
              autoComplete='off'
              placeholder='กรอกรหัสผ่าน'
              onChange={(e) => setValues({ ...values, password: e.target.value })}
            />
          </span>
          <input className='submit' type='submit' value='เข้าสู่ระบบ' />
        </form>
      </div>
    </div>
  );
};

export default Login;
