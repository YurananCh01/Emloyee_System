import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const HistoryLeave = () => {
    const [leaves, setLeaves] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [department, setDepartment] = useState('');

    useEffect(() => {
        axios.get('http://172.16.252.120:3000/auth/history')
            .then(result => {
                if (result.data.Status) {
                    setLeaves(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));

        axios.get('http://172.16.252.120:3000/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    setEmployees(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));


    }, []);
    useEffect(() => {
        // Combine leaves and employees data based on username
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


        const matchesDateRange = (!start || leaveStartDate >= start) && (!end || leaveEndDate <= end)
        const matchesDepartment = !department || leave.department === department;
        console.log(start)
        return matchesDateRange && matchesDepartment;

    });

    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
        setDepartment('');
    };

    //========================== export excel ===========================================
    const exportToExcel = () => {
        const formattedData = filteredData.map(leave => ({
            'รหัสพนักงาน': leave.username,
            'ชื่อ - นามสกุล': leave.name,
            'ประเภทการลา': leave.leave_type,
            'วันที่เริ่มต้น': formatDate(leave.start_date),
            'เวลาเริ่มลา' : (leave.start_time),
            'วันที่สิ้นสุด': formatDate(leave.end_date),
            'เวลาสิ้นสุดการลา' : (leave.end_time),
            'แผนกพนักงาน': leave.department,
            'จำนวนวันลา': leave.leave_days,
            'การอนุมัติ': leave.manager_approver

        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        // Adding custom styles to the header row
        const headerStyle = {
            font: { bold: true },
            alignment: { horizontal: "center", vertical: "center" },
            border: {
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" },
                right: { style: "thin" }
            }
        };
        ["A1", "B1", "C1", "D1", "E1", "F1", "G1"].forEach((cell) => {
            worksheet[cell].s = headerStyle;
        });


        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'HistoryLeave');
        XLSX.writeFile(workbook, 'history_leave.xlsx');
    };
    //========================== end export =============================================
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
                    <div className='col-4'>
                        <label htmlFor='department'>แผนกพนักงาน:</label>
                        <select
                            id='department'
                            className='form-select'
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        >
                            <option value=''>แผนกทั้งหมด</option>
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
                    <div className='col-2'>
                        <button className='btn btn-warning mt-4' onClick={clearFilters}>ล้างการค้นหาวันที่</button>
                    </div>
                    <div className='col-3 mt-4'>
                        <button className='btn btn-success' onClick={exportToExcel}>ส่งออกเป็น Excel</button>
                    </div>
                </div>
                <table className='table mt-3'>
                    <thead>
                        <tr>
                            <th>รหัสพนักงาน</th>
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
                                <td>{leave.username}</td>
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
}

export default HistoryLeave