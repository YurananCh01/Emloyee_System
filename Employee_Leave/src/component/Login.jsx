import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/login', values)
            .then(result => {
                const role = result.data.role;
                    console.log(result.data)        
                if (result.data.loginStatus) {
                    if (role == 'admin'){
                        navigate('/dashboard');
                    }else if (role == 'employee'){
                        navigate('/employee_detail/'+ result.data.id)
                    }else if (role == 'manager'){
                        navigate('/manager_detail/'+ result.data.id)
                    }
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginFrom'>
                <div className='text-warning'>
                    {error && error}
                </div>
                <h2>หน้าเข้าสู่ระบบ</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='username'><strong>ชื่อผู้ใช้:</strong></label>
                        <input type='username' name='username' autoComplete='off' placeholder='กรอกชื่อผู้ใช้'
                            onChange={(e) => setValues({ ...values, username: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>รหัสผ่าน:</strong></label>
                        <input type='password' name='password' autoComplete='off' placeholder='กรอกรหัสผ่าน'
                            onChange={(e) => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2'>เข้าสู่ระบบ</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
