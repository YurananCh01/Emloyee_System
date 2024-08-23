import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {

    const navigate = useNavigate()
    const [employee, setEmployee] = useState({
        username: '',
        name: '',
        password: '',
        start_date: '',
        department: '',
        sick_leave: 0,
        holidays_leave: 0,
        absence_leave: 0,
        parent_leave: 0,
        withoutpay_leave: 0,
        role: ''



    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://172.16.251.92:3000/auth/add_employee', employee)
            .then(result => {
                if (result.data.Status) {
                    alert("เพิ่มข้อมูลพนักงานเรียบร้อยแล้ว");
                    navigate('/dashboard/employee')
                } else {
                    alert(result.data.Error)
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-75'>
            <div className='p-3 rounded w-25 border'>
                <h3>เพิ่มข้อมูลพนักงาน</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='text' className='form-label'>กรอกรหัสพนักงาน</label>
                        <input type='text' placeholder='รหัสพนักงาน'
                            className='form-control rounded-0'
                            onChange={(e) => setEmployee({ ...employee, username: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputName' className='form-label'>ชื่อ - นามสกุล</label>
                        <input type='text' placeholder='กรอกชื่อ - นามสกุล'
                            className='form-control rounded-0'
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputPassword' className='form-label'>รหัสผ่านพนักงาน</label>
                        <input type='password' placeholder='กรอกรหัสผ่านพนักงาน'
                            className='form-control rounded-0'
                            onChange={(e) => setEmployee({ ...employee, password: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputStart_date' className='form-label'>วันที่เริ่มทำงาน</label>
                        <input type='date' placeholder='กรอกรหัสผ่านพนักงาน'
                            className='form-control rounded-0'
                            onChange={(e) => setEmployee({ ...employee, start_date: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputDepartment' className='form-label'>แผนกพนักงาน</label>
                        <select
                            id='inputDepartment'
                            name='department'
                            className='form-control rounded-0'
                            value={employee.department}
                            onChange={(e) => setEmployee({ ...employee, department: e.target.value })} required
                        >
                            <option value='' disabled>กรุณาเลือกแผนกพนักงาน</option>
                            <option value='Admin'>Admin</option>
                            <option value='Sales'>Sales</option>
                            <option value='Marketing'>Marketing</option>
                            <option value='Installation'>Installation</option>
                            <option value='Operation'>Operation</option>
                            <option value='Service'>Service</option>
                            <option value='R&D'>R&D</option>
                            <option value='Production'>Production</option>         
                            <option value='ACCOUNTANT'>ACCOUNTANT</option>    
                        </select>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputSick_leave' className='form-label'>จำนวนลาป่วยทั้งหมด</label>
                        <input type='text' placeholder='กรอกจำนวนลาป่วยทั้งหมด'
                            className='form-control rounded-0'
                            onChange={(e) => setEmployee({ ...employee, sick_leave: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputHolidays_leave' className='form-label'>จำนวนลาพักร้อนทั้งหมด</label>
                        <input type='text' placeholder='กรอกจำนวนลาพักร้อนทั้งหมด'
                            className='form-control rounded-0'
                            onChange={(e) => setEmployee({ ...employee, holidays_leave: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputAbsence_leave' className='form-label'>จำนวนลากิจทั้งหมด</label>
                        <input type='text' placeholder='กรอกจำนวนลากิจทั้งหมด'
                            className='form-control rounded-0'
                            onChange={(e) => setEmployee({ ...employee, absence_leave: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputParent_leave' className='form-label'>จำนวนลาเพื่อดูแลบุพการี (พ่อ แม่ และลูก)</label>
                        <input type='text' placeholder='กรอกจำนวนลาเพื่อดูแลบุพการี (พ่อ แม่ และลูก)'
                            className='form-control rounded-0'
                            onChange={(e) => setEmployee({ ...employee, parent_leave: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputWihtoutpay' className='form-label'>Without Pay</label>
                        <input type='text'
                            className='form-control rounded-0'
                            value={employee.withoutpay_leave}
                            onChange={(e) => setEmployee({ ...employee, withoutpay_leave: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputRole' className='form-label'>ตำแหน่งพนักงาน</label>
                        <select
                            id='inputRole'
                            name='department'
                            className='form-control rounded-0'
                            value={employee.role}
                            onChange={(e) => setEmployee({ ...employee, role: e.target.value })} required
                        >
                            <option value='' disabled>กรุณาเลือกตำแหน่ง</option>
                            <option value='admin'>admin</option>
                            <option value='manager'>manager</option>
                            <option value='employee'>employee</option>
                            
                        </select>
                    </div>
                    <div className='col-12'>
                        <button type='submit' className='btn btn-primary w-100'>Add Employee</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddEmployee