import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'




const EditEmployee = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState({
        username: '',
        name: '',
        start_date: '',
        department: '',
        sick_leave: '0',
        holidays_leave: '0',
        absence_leave: '0',
        parent_leave: '0',
        role: ''

    })


    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee/'+ id)
            .then(result => {
                console.log(result.data.Result);
                setEmployee({
                    ...employee,
                    username: result.data.Result[0].username,
                    name: result.data.Result[0].name,
                    start_date: result.data.Result[0].start_date.substring(0, 10),
                    department: result.data.Result[0].department,
                    sick_leave: result.data.Result[0].sick_leave,
                    holidays_leave: result.data.Result[0].holidays_leave,
                    absence_leave: result.data.Result[0].absence_leave,
                    parent_leave: result.data.Result[0].parent_leave,
                    role: result.data.Result[0].role,
                });
            }).catch(err => console.log(err));

    }, []);


    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/' + id, employee, {
            start_date: employee.start_date.substring(0, 10)
        }).then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee')
                }
                else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-75'>
            <div className='p-3 rounded w-25 border'>
                <h3>แก้ไขข้อมูลพนักงาน</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='inputId' className='form-label'>กรอกรหัสพนักงาน</label>
                        <input type='id' placeholder='รหัสพนักงาน'
                            className='form-control rounded-0'
                            value={employee.username}
                            onChange={(e) => setEmployee({ ...employee, username: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputName' className='form-label'>ชื่อ - นามสกุล</label>
                        <input type='text' placeholder='กรอกชื่อ - นามสกุล'
                            className='form-control rounded-0'
                            value={employee.name}
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputStart_date' className='form-label'>วันที่เริ่มทำงาน</label>
                        <input type='date' placeholder='กรอกรหัสผ่านพนักงาน'
                            className='form-control rounded-0'
                            value={employee.start_date}
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
                            <option value='seles & Marketing'>seles & Marketing</option>
                            <option value='Product & Solutions'>Product & Solutions</option>
                            <option value='Service'>Service</option>
                            <option value='Innovation'>Innovation</option>
                            <option value='Manufacturing'>Manufacturing</option>
                            <option value='Operation'>Operation</option>
                            <option value='Admin'>Admin</option>
                            <option value='HR & Legal'>HR & Legal</option>
                            
                        </select>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputSick_leave' className='form-label'>จำนวนลาป่วยทั้งหมด</label>
                        <input type='text' placeholder='กรอกจำนวนลาป่วยทั้งหมด'
                            className='form-control rounded-0'
                            value={employee.sick_leave}
                            onChange={(e) => setEmployee({ ...employee, sick_leave: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputHolidays_leave' className='form-label'>จำนวนลาพักร้อนทั้งหมด</label>
                        <input type='text' placeholder='กรอกจำนวนลาพักร้อนทั้งหมด'
                            className='form-control rounded-0'
                            value={employee.holidays_leave}
                            onChange={(e) => setEmployee({ ...employee, holidays_leave: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputAbsence_leave' className='form-label'>จำนวนลากิจทั้งหมด</label>
                        <input type='text' placeholder='กรอกจำนวนลากิจทั้งหมด'
                            className='form-control rounded-0'
                            value={employee.absence_leave}
                            onChange={(e) => setEmployee({ ...employee, absence_leave: e.target.value })} required/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='inputParent_leave' className='form-label'>จำนวนลาเพื่อดูแลบุพการี (พ่อ แม่ และลูก)</label>
                        <input type='text' placeholder='กรอกจำนวนลาเพื่อดูแลบุพการี (พ่อ แม่ และลูก)'
                            className='form-control rounded-0'
                            value={employee.parent_leave}
                            onChange={(e) => setEmployee({ ...employee, parent_leave: e.target.value })} required/>
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
                        <button type='submit' className='btn btn-primary w-100'>Edit Employee</button>
                    </div>

                </form>
            </div>
        </div>
    )

}

export default EditEmployee