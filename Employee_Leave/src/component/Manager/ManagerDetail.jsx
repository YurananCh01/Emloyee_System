import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ManagerDetail = () => {
    const [manager, setManager] = useState(null);
    const { id } = useParams();
    const [leaves, setLeaves] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        // Function to fetch manager details
        const fetchManagerDetails = async () => {
            try {
                const response = await axios.get(`http://172.16.251.92:3000/manager/manager_detail/${id}`);
                if (response.data.loginStatus) {
                    setManager(response.data.data);
                } else {
                    console.log(response.data.Error);
                }
            } catch (error) {
                console.error('Error fetching manager details:', error);
            }
        };

        // Function to fetch leave requests
        const fetchLeaveRequests = async () => {
            try {
                const response = await axios.get('http://172.16.251.92:3000/leave/leaves');
                if (response.data.Status) {
                    setLeaves(response.data.Result);
                } else {
                    alert(response.data.Error);
                }
            } catch (error) {
                console.error('Error fetching leave requests:', error);
            }
        };

        // Function to fetch employees
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://172.16.251.92:3000/auth/employee');
                if (response.data.Status) {
                    setEmployees(response.data.Result);
                } else {
                    alert(response.data.Error);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        // Call all fetch functions
        fetchManagerDetails();
        fetchLeaveRequests();
        fetchEmployees();
    }, [id]);


    const handleApprove = (leave) => {
        axios.put('http://172.16.251.92:3000/manager/approve_leave', {
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
                                return { ...emp, holidays_leave: emp.holidays_leave - leave.leave_days };
                            case 'ลากิจ':
                                return { ...emp, absence_leave: emp.absence_leave - leave.leave_days };
                            case 'ลาเพื่อดูแลบุพการี':
                                return { ...emp, parent_leave: emp.parent_leave - leave.leave_days };
                            case 'without pay':
                                return { ...emp, withoutpay_leave: emp.withoutpay_leave - leave.leave_days };
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
        axios.put('http://172.16.251.92:3000/manager/reject_leave', { leave_id })
            .then(result => {
                if (result.data.Status) {
                    alert('การลาไม่ได้รับการอนุมัติ');
                    // Update leave status locally
                    setLeaves(prevLeaves => prevLeaves.map(lv =>
                        lv.id === leave_id ? { ...lv, manager_approver: 'ไม่อนุมัติ' } : lv
                    ));
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));
    };

    // Filter leaves for display
    const filteredLeaves = leaves.filter(leave => {
        const employee = employees.find(emp => emp.id === leave.employee_id);
        return employee && employee.department === manager?.department && leave.manager_approver === 'รออนุมัติ..';
    }).map(leave => {
        const employee = employees.find(emp => emp.id === leave.employee_id);
        return { ...leave, employeeName: employee ? employee.name : 'Unknown' };
    });

    // Format date function
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
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ชื่อ - นามสกุล</th>
                                        <th>วันที่เริ่มลา</th>
                                        <th>เวลาเริ่มลา</th>
                                        <th>วันที่สิ้นสุด</th>
                                        <th>เวลาสิ้นสุด</th>
                                        <th>ระยะเวลาการลา (วัน)</th>
                                        <th>ประเภทการลา</th>
                                        <th>เหตุผล</th>
                                        <th>การดำเนินการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeaves.map((leave, index) => (
                                        <tr key={index}>
                                            <td>{leave.employeeName}</td>
                                            <td>{formatDate(leave.start_date)}</td>
                                            <td>{leave.start_time}</td>
                                            <td>{formatDate(leave.end_date)}</td>
                                            <td>{leave.end_time}</td>
                                            <td>{leave.leave_days}</td>
                                            <td>{leave.leave_type}</td>
                                            <td>{leave.reason}</td>
                                            <td>
                                                <button
                                                    className="btn btn-success btn-sm me-2"
                                                    onClick={() => handleApprove(leave)}
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
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ManagerDetail;
