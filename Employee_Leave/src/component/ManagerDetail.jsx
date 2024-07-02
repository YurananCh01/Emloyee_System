import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ManagerDetail = () => {
    const [manager, setManager] = useState(null);
    const { id } = useParams();
    const [leaves, setLeaves] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // ดึงข้อมูลผู้จัดการ
        axios.get(`http://localhost:3000/manager/manager_detail/${id}`)
            .then(result => {
                if (result.data.loginStatus) {
                    setManager(result.data.data);
                } else {
                    console.log(result.data.Error);
                }
            }).catch(err => console.log(err));

        // ดึงข้อมูลการลา
        axios.get('http://localhost:3000/leave/leaves')
            .then(result => {
                if (result.data.Status) {
                    setLeaves(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));

        // ดึงข้อมูลพนักงาน
        axios.get('http://localhost:3000/auth/employee')
            .then(result => {
                if (result.data.Status) {
                    setEmployees(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    }, [id]);

    const handleLogout = () => {
        axios.get('http://localhost:3000/manager/logout')
            .then(result => {
                if (result.data.Status) {
                    navigate('/login');
                }
            }).catch(err => console.log(err));
    };

    const handleApprove = (leave) => {
        axios.put('http://localhost:3000/manager/approve_leave', {
            leave_id: leave.id,
            employee_id: leave.employee_id,
            leave_type: leave.leave_type,
            leave_days: leave.leave_days
        }).then(result => {
            if (result.data.Status) {
                alert('การลาได้รับการอนุมัติ');
                // Update leave status locally
                setLeaves(prevLeaves => prevLeaves.map(lv =>
                    lv.id === leave.id ? { ...lv, manager_approver: 'อนุมัติ' } : lv
                ));
                // Update employee leave days locally
                const updatedEmployees = employees.map(emp => {
                    if (emp.id === leave.employee_id) {
                        switch (leave.leave_type) {
                            case 'ลาป่วย':
                                return { ...emp, sick_leave: emp.sick_leave - leave.leave_days };
                            case 'ลาพักร้อน':
                                return { ...emp, vacation_leave: emp.vacation_leave - leave.leave_days };
                            case 'ลากิจ':
                                return { ...emp, personal_leave: emp.personal_leave - leave.leave_days };
                            default:
                                return emp;
                        }
                    }
                    return emp;
                });
                setEmployees(updatedEmployees);
            } else {
                alert(result.data.Error);
            }
        }).catch(err => console.log(err));
    };

    const handleReject = (leave_id) => {
        axios.put('http://localhost:3000/manager/reject_leave', { leave_id })
            .then(result => {
                if (result.data.Status) {
                    alert('การลาไม่ได้รับการอนุมัติ');
                    // อัปเดตสถานะ leave ท้องถิ่น
                    setLeaves(prevLeaves => prevLeaves.map(leave =>
                        leave.id === leave_id ? { ...leave, manager_approver: 'ไม่อนุมัติ' } : leave
                    ));
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    };

    // รวมข้อมูลการลากับชื่อพนักงานเฉพาะแผนกเดียวกัน
    const filteredLeaves = leaves.filter(leave => {
        const employee = employees.find(emp => emp.id === leave.employee_id);
        return employee && employee.department === manager?.department && leave.manager_approver === 'รออนุมัติ..';
    }).map(leave => {
        const employee = employees.find(emp => emp.id === leave.employee_id);
        return { ...leave, employeeName: employee ? employee.name : 'Unknown' };
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('th-TH', options); 
    };

    return (
        <div className="container mt-4">
            <div className='d-flex justify-content-center'>
                <h3>รายละเอียดผู้จัดการ</h3>
            </div>
            <div className='mt-3'>
                {manager ? (
                    <div>
                        <div className="mb-4">
                            <p><strong>ชื่อ - นามสกุล:</strong> {manager.name}</p>
                            <p><strong>แผนก:</strong> {manager.department}</p>
                        </div>
                        <div>
                            <h5>พนักงานในแผนกเดียวกัน</h5>
                            <ul>
                                {filteredLeaves.map((leave, index) => (
                                    <li key={index}>
                                        ชื่อ - นามสกุล {leave.employeeName} - วันที่เริ่มลา: {formatDate(leave.start_date)} เวลา {leave.start_time} , 
                                        ถึง {formatDate(leave.end_date)} เวลา {leave.end_time} ระยะเวลาการลา: {leave.leave_days} วัน,ประเภทการลา: {leave.leave_type}, เหตุผล: {leave.reason}
                                        <div>
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() => handleApprove(leave.id)}
                                                disabled={leave.status === 'อนุมัติ'}
                                            >
                                                อนุมัติ
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleReject(leave.id)}
                                                disabled={leave.status === 'ไม่อนุมัติ'}
                                            >
                                                ไม่อนุมัติ
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <button type="button" className="btn btn-danger mt-3" onClick={handleLogout}>ออกจากระบบ</button>
        </div>
    );
};

export default ManagerDetail;