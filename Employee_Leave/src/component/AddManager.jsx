import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddManager = () => {
  const navigate = useNavigate()
    const [manager, setManager] = useState({
        manager_id: '',
        name: '',
        password: '',
        department: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_manager', manager)
            .then(result => {
                if (result.data.Status) {
                    alert("เพิ่มข้อมูลผู้จัดการเรียบร้อยแล้ว");
                    navigate('/dashboard/manager')
                } else {
                    alert(result.data.Error)
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center vh-75'>
            <div className='p-3 rounded w-25 border'>
                <h3>เพิ่มข้อมูลผู้จัดการ</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='text' className='form-label'>กรอกรหัสผู้จัดการ</label>
                        <input type='text' placeholder='รหัสผู้จัดการ'
                            className='form-control rounded-0'
                            onChange={(e) => setManager({ ...manager, manager_id: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputName' className='form-label'>ชื่อ - นามสกุล</label>
                        <input type='text' placeholder='กรอกชื่อ - นามสกุล'
                            className='form-control rounded-0'
                            onChange={(e) => setManager({ ...manager, name: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputPassword' className='form-label'>รหัสผ่านพนักงาน</label>
                        <input type='password' placeholder='กรอกรหัสผ่านผู้จัดการ'
                            className='form-control rounded-0'
                            onChange={(e) => setManager({ ...manager, password: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputDepartment' className='form-label'>แผนกผู้จัดการ</label>
                        <select
                            id='inputDepartment'
                            name='department'
                            className='form-control rounded-0'
                            value={manager.department}
                            onChange={(e) => setManager({ ...manager, department: e.target.value })}
                        >
                            <option value='' disabled>กรุณาเลือกแผนกผู้จัดการ</option>
                            <option value='op1'>op1</option>
                            <option value='op2'>op2</option>
                            <option value='op3'>op3</option>
                            <option value='op4'>op4</option>
                            
                        </select>
                    </div>
                    <div className='col-12'>
                        <button type='submit' className='btn btn-primary w-100'>Add Manager</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddManager