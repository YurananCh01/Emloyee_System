import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        username: '',
        password: ''
    });
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmPassword, setShowconfirmPassword] = useState(false);

    useEffect(() => {
        axios.get(`http://192.168.59.1:3000/employee/detail/${id}`)
            .then(result => {
                setEmployee({
                    ...employee,
                    username: result.data.data.username,
                    password: result.data.data.password
                });
            }).catch(err => console.log(err));
    }, [id]);

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("รหัสผ่านใหม่ไม่ตรงกัน");
            return;
        }

        axios.put(`http://192.168.59.1:3000/employee/reset_password/${id}`, { password: newPassword })
            .then(response => {
                if (response.data.Status) {
                    alert("รีเซ็ตรหัสผ่านเรียบร้อยแล้ว");
                    window.location.reload();
                } else {
                    alert(response.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 rounded w-25 border'>
                <h3>เปลี่ยนรหัสผ่าน</h3>
                <form onSubmit={handleResetPassword}>
                    <div className='mb-3'>
                        <label htmlFor='inputUsername' className='form-label'>ชื่อผู้ใช้</label>
                        <div className='form-control rounded-0 bg-light'>
                            {employee.username}
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='inputNewPassword' className='form-label'>รหัสผ่านใหม่</label>
                        <div className='input-group'>
                            <input
                                type={showPassword ? 'text' : 'password'} // เปลี่ยน type ขึ้นอยู่กับสถานะ
                                className='form-control rounded-0'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <button
                                type='button'
                                className='btn btn-outline-secondary'
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ marginLeft: '-1px' }}
                            >
                                {showPassword ? 'ซ่อน' : 'แสดง'}
                            </button>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='inputConfirmPassword' className='form-label'>ยืนยันรหัสผ่านใหม่</label>
                        <div className='input-group'>
                            <input
                                type={showconfirmPassword ? 'text' : 'password'}
                                className='form-control rounded-0'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type='button'
                                className='btn btn-outline-secondary'
                                onClick={() => setShowconfirmPassword(!showconfirmPassword)}
                                style={{ marginLeft: '-1px' }}
                            >
                                {showconfirmPassword ? 'ซ่อน' : 'แสดง'}
                            </button>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary w-100'>รีเซ็ตรหัสผ่าน</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
