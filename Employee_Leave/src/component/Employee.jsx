import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Employee = () => {

    const [employee, setEmployee] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));

            
    }, []);



const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/'+id)
    .then(result => {
        if(result.data.Status){
            window.location.reload()
        }else {
            alert(result.data.Error);
        }
    })
}
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('th-TH', options); 
    };
    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>รายชื่อพนักงาน</h3>
            </div>
            <Link to='/dashboard/add_employee' className='btn btn-success'>Add Employee</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>รหัสพนักงาน</th>
                            <th>ชื่อ - นามสกุล</th>
                            <th>วันที่เริ่มทำงาน</th>
                            <th>แผนกพนักงาน</th>
                            <th>จำนวนลาป่วยทั้งหมด</th>
                            <th>จำนวนลาพักร้อนทั้งหมด</th>
                            <th>จำนวนลากิจทั้งหมด</th>
                            <th>จำนวนลาเพื่อดูแลบุพการี (พ่อ แม่ และลูก)</th>
                            <th>บทบาทพนักงาน</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((e, index) => (
                            <tr key={index}>
                                <td>{e.username}</td>
                                <td>{e.name}</td>
                                <td>{formatDate(e.start_date)}</td>
                                <td>{e.department}</td>
                                <td>{e.sick_leave}</td>
                                <td>{e.holidays_leave}</td>
                                <td>{e.absence_leave}</td>
                                <td>{e.parent_leave}</td>
                                <td>{e.role}</td>
                                <td>
                                    <Link to={`/dashboard/edit_employee/` + e.id} className='btn btn-warning btn-sm me-2'>แก้ไข</Link>
                                    <button className='btn btn-danger btn-sm' onClick={() => handleDelete(e.id)}>ลบ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employee;
