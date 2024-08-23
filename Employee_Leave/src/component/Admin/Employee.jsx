import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State สำหรับเก็บค่าช่องค้นหา

    useEffect(() => {
        axios.get('http://172.16.251.92:3000/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    // เรียงลำดับข้อมูลพนักงานตามวันที่เริ่มทำงาน
                    const sortedEmployees = result.data.Result.sort((a, b) => new Date(b.start_date) - new Date(a.start_date));
                    setEmployee(sortedEmployees);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    }, []);
    
    const handleDelete = (id) => {
        const confirmDelete = window.confirm('คุณต้องการลบพนักงานคนนี้ใช่หรือไม่?');
        if (confirmDelete) {
            axios.delete('http://172.16.251.92:3000/auth/delete_employee/' + id)
                .then(result => {
                    if (result.data.Status) {
                        window.location.reload();
                    } else {
                        alert(result.data.Error);
                    }
                });
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('th-TH', options);
    };

    // ฟังก์ชันกรองข้อมูลตามค่าที่ค้นหา
    const filteredEmployees = employee.filter((e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>รายชื่อพนักงาน</h3>
            </div>
            <Link to='/dashboard/add_employee' className='btn btn-success'>Add Employee</Link>
            <div className='d-flex align-items-center'>
                <input
                    type="text"
                    placeholder="ค้นหาชื่อพนักงาน"
                    className="form-control me-2 searchEMP-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='btn btn-secondary' onClick={clearSearch}>ล้างการค้นหา</button>
            </div>

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
                            <th>Without Pay</th>
                            <th>บทบาทพนักงาน</th>
                            <th>ลบ/แก้ไข</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((e, index) => (
                            <tr key={index}>
                                <td>{e.username}</td>
                                <td>{e.name}</td>
                                <td>{formatDate(e.start_date)}</td>
                                <td>{e.department}</td>
                                <td>{e.sick_leave}</td>
                                <td>{e.holidays_leave}</td>
                                <td>{e.absence_leave}</td>
                                <td>{e.parent_leave}</td>
                                <td>{e.withoutpay_leave}</td>
                                <td>{e.role}</td>
                                <td>
                                    <Link
                                        to={`/dashboard/edit_employee/` + e.id}
                                        className='btn btn-warning btn-sm me-2'
                                    >
                                        แก้ไข
                                    </Link>
                                    <button className='btn btn-danger btn-sm' onClick={() => handleDelete(e.id)}>ลบ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employee;
