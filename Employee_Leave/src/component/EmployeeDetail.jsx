import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState({
    employee_id: id,
    leave_type: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    leave_days: '',
    reason: '',
    manager_approver: 'รออนุมัติ..'
  });

  useEffect(() => {
    axios.get('http://localhost:3000/employee/detail/' + id)
      .then(result => {
        if (result.data.loginStatus) {
          setEmployee(result.data.data);
        } else {
          console.log(result.data.Error);
        }
      })
      .catch(err => console.log(err))
  }, [id]);

  const handleLogout = () => {
    axios.get('http://localhost:3000/employee/logout')
      .then(result => {
        if (result.data.Status) {
          navigate('/login')
        }
      }).catch(err => console.log(err))
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedLeaveData = { ...leaveData };

    // ตรวจสอบประเภทการลา
    if (leaveData.leave_type === 'ลาป่วย' || leaveData.leave_type === 'ลากิจ') {
      updatedLeaveData.manager_approver = 'อนุมัติ';
    }

    axios.post('http://localhost:3000/leave/add_leave', updatedLeaveData)
      .then(result => {
        alert("เพิ่มข้อมูลการลาเรียบร้อยแล้ว");
        window.location.reload();
        console.log('Successfully added leave:', result.data);
      })
      .catch(error => {
        console.error('Error adding leave:', error);
        alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูลการลา");
      });
  };

  return (
    <div className="container mt-4">
      {employee ? (
        <div>
          <h1 className="mb-4">รายละเอียดพนักงาน</h1>
          <div className="mb-4">
            <p><strong>ชื่อ - นามสกุล:</strong> {employee.name}</p>
            <p><strong>วันที่เริ่มทำงาน:</strong> {formatDate(employee.start_date)}</p>
            <p><strong>แผนก:</strong> {employee.department}</p>
            <p><strong>จำนวนลาป่วยทั้งหมด:</strong> {employee.sick_leave} วัน</p>
            <p><strong>จำนวนลาพักร้อนทั้งหมด:</strong> {employee.holidays_leave} วัน</p>
            <p><strong>จำนวนลากิจทั้งหมด:</strong> {employee.absence_leave} วัน</p>
            <p><strong>จำนวนลาเพื่อดูแลบุพการี:</strong> {employee.parent_leave} วัน</p>
          </div>

          <h2 className="mb-3">เพิ่มวันลา</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputLeaveType" className="form-label">ประเภทการลา</label>
                <select
                  id="inputLeaveType"
                  name="leave_type"
                  className="form-select"
                  value={leaveData.leave_type}
                  onChange={e => setLeaveData({ ...leaveData, leave_type: e.target.value })}
                  required
                >
                  <option value="">กรุณาเลือกประเภทการลา</option>
                  <option value="ลาป่วย">ลาป่วย</option>
                  <option value="ลากิจ">ลากิจ</option>
                  <option value="ลาพักร้อน">ลาพักร้อน</option>
                  <option value="ลาเพื่อดูแลบุพการี">ลาเพื่อดูแลบุพการี</option>
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="inputStartDate" className="form-label">วันที่เริ่มลา</label>
                <input
                  type="date"
                  id="inputStartDate"
                  className="form-control"
                  value={leaveData.start_date}
                  onChange={e => setLeaveData({ ...leaveData, start_date: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputStartTime" className="form-label">เวลาเริ่มลา</label>
                <input
                  type="time"
                  id="inputStartTime"
                  className="form-control"
                  value={leaveData.start_time}
                  onChange={e => setLeaveData({ ...leaveData, start_time: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEndDate" className="form-label">วันที่สิ้นสุดการลา</label>
                <input
                  type="date"
                  id="inputEndDate"
                  className="form-control"
                  value={leaveData.end_date}
                  onChange={e => setLeaveData({ ...leaveData, end_date: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEndTime" className="form-label">เวลาสิ้นสุดการลา</label>
                <input
                  type="time"
                  id="inputEndTime"
                  className="form-control"
                  value={leaveData.end_time}
                  onChange={e => setLeaveData({ ...leaveData, end_time: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLeaveDays" className="form-label">จำนวนวันลา *หมายเหตุถ้าลาครึ่งวันให้ใส่ 0.5</label>
                <input
                  type="number"
                  id="inputLeaveDays"
                  className="form-control"
                  value={leaveData.leave_days}
                  onChange={e => setLeaveData({ ...leaveData, leave_days: e.target.value })}
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputReason" className="form-label">เหตุผลการลา</label>
                <input
                  type="text"
                  id="inputReason"
                  className="form-control"
                  value={leaveData.reason}
                  onChange={e => setLeaveData({ ...leaveData, reason: e.target.value })}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100">ยืนยัน</button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button type="button" className="btn btn-danger mt-3" onClick={handleLogout}>ออกจากระบบ</button>
    </div>
  );
}

export default EmployeeDetail;
