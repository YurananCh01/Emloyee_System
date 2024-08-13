import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [employeeTotal, setEmployeeCount] = useState(0);
  const [managerTotal, setManagerCount] = useState(0);

  useEffect(() => {
    employeeCount();
    managerCount();
  }, []);

  const employeeCount = () => {
    axios.get('http://192.168.59.1:3000/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeCount(result.data.Result[0].employee_count);
        }
      })
      .catch(err => console.log(err));
  };

  const managerCount = () => {
    axios.get('http://192.168.59.1:3000/auth/manager_count')
      .then(result => {
        if (result.data.Status) {
          setManagerCount(result.data.Result[0].manager_count);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-md-4'>
          <div className='card text-center shadow-sm'>
            <div className='card-body'>
              <h4 className='card-title'>ผู้จัดการ</h4>
              <h5 className='card-text'>จำนวน: {managerTotal} คน</h5>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card text-center shadow-sm'>
            <div className='card-body'>
              <h4 className='card-title'>พนักงาน</h4>
              <h5 className='card-text'>จำนวน: {employeeTotal} คน</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
