import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HistoryEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios.get('http://localhost:3000/employee/history_employee/' + id)
      .then(result => {
        if (result.data) {
          const sortedLeaves = result.data.data.sort((a, b) => b.id - a.id);
          setEmployee(sortedLeaves);
        } else {
          console.log(result.data.Error);
        }
      }).catch(err => console.log(err))

  }, [id])
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  };

  return (
    <div>
      <h2>ประวัติการลาของพนักงาน</h2>
      {employee.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              {/* <th>รหัสพนักงาน</th> */}
              <th>ประเภทการลา</th>
              <th>วันที่เริ่มต้น</th>
              <th>เวลาเริ่มลา</th>
              <th>วันที่สิ้นสุด</th>
              <th>เวลาสิ้นสุดการลา</th>
              <th>จำนวนการลา</th>
              <th>เหตุผลการลา</th>
              <th>การอนุมัติ</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((emp, index) => (
              <tr key={index}>
                {/* <td>{emp.id}</td> */}
                <td>{emp.leave_type}</td>
                <td>{formatDate(emp.start_date)}</td>
                <td>{emp.start_time}</td>
                <td>{formatDate(emp.end_date)}</td>
                <td>{emp.end_time}</td>
                <td>{emp.leave_days}</td>
                <td>{emp.reason}</td>
                <td>{emp.manager_approver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>ไม่มีข้อมูลการลา</p>
      )}
    </div>
  )
}

export default HistoryEmployee