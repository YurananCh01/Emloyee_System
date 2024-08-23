import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

const HistoryLeave = () => {
    const { id } = useParams(); // get id
    const [leaves, setLeaves] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [managerDepartment, setManagerDepartment] = useState('');

    useEffect(() => {
        // ดึงข้อมูลผู้จัดการปัจจุบัน
        axios.get(`http://172.16.251.92:3000/manager/manager_detail/${id}`)
            .then(result => {
                if (result.data.loginStatus) {
                    const currentUser = result.data.data;
                    setManagerDepartment(currentUser.department);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));

        // ดึงข้อมูลการลา
        axios.get('http://172.16.251.92:3000/auth/history')
            .then(result => {
                if (result.data.Status) {
                    setLeaves(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));

        // ดึงข้อมูลพนักงาน
        axios.get('http://172.16.251.92:3000/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    setEmployees(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        // รวมข้อมูลการลาและพนักงานโดยอิงจาก employee_id
        if (leaves.length > 0 && employees.length > 0) {
            const combined = leaves.map(leave => {
                const employee = employees.find(emp => emp.id === leave.employee_id);
                return {
                    ...leave,
                    username: employee ? employee.username : 'ไม่พบรหัสพนักงาน',
                    name: employee ? employee.name : 'ไม่พบชื่อพนักงาน',
                    department: employee ? employee.department : 'ไม่พบแผนก'
                };
            });
            setCombinedData(combined);
        }
    }, [leaves, employees]);

    const setToMidnight = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d.toISOString();
    };

    const filteredData = combinedData.filter(leave => {
        const leaveStartDate = setToMidnight(new Date(leave.start_date));
        const leaveEndDate = setToMidnight(new Date(leave.end_date));
        const start = startDate ? setToMidnight(new Date(startDate)) : null;
        const end = endDate ? setToMidnight(new Date(endDate)) : null;

        const matchesDateRange = (!start || leaveStartDate >= start) && (!end || leaveEndDate <= end);
        const matchesDepartment = leave.department === managerDepartment; // ตรวจสอบว่าแผนกตรงกับแผนกของผู้จัดการ

        return matchesDateRange && matchesDepartment;
    });

    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('th-TH', options);
    };

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>ประวัติการลา</h3>
            </div>
            <div className='mt-3'>
                <div className='row'>
                    <div className='col-6'>
                        <label htmlFor='startDate'>วันที่เริ่มต้น:</label>
                        <input
                            type='date'
                            id='startDate'
                            className='form-control'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className='col-6'>
                        <label htmlFor='endDate'>วันที่สิ้นสุด:</label>
                        <input
                            type='date'
                            id='endDate'
                            className='form-control'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className='col-2'>
                        <button className='btn btn-warning mt-4' onClick={clearFilters}>ล้างการค้นหา</button>
                    </div>
                </div>
                <table className='table mt-3'>
                    <thead>
                        <tr>
                            <th>ชื่อ - นามสกุล</th>
                            <th>ประเภทการลา</th>
                            <th>วันที่เริ่มต้น</th>
                            <th>เวลาเริ่มลา</th>
                            <th>วันที่สิ้นสุด</th>
                            <th>เวลาสิ้นสุดการลา</th>
                            <th>แผนกพนักงาน</th>
                            <th>จำนวนวันลา</th>
                            <th>การอนุมัติ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((leave, index) => (
                            <tr key={index}>
                                <td>{leave.name}</td>
                                <td>{leave.leave_type}</td>
                                <td>{formatDate(leave.start_date)}</td>
                                <td>{leave.start_time}</td>
                                <td>{formatDate(leave.end_date)}</td>
                                <td>{leave.end_time}</td>
                                <td>{leave.department}</td>
                                <td>{leave.leave_days}</td>
                                <td>{leave.manager_approver}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryLeave;
