import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Manager = () => {
  const [manager, setManager] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:3000/auth/manager')
          .then(result => {
              if (result.data.Status) {
                  setManager(result.data.Result);
              } else {
                  alert(result.data.Error);
              }
          }).catch(err => console.log(err));
  }, []);



const handleDelete = (id) => {
  axios.delete('http://localhost:3000/auth/delete_manager/'+id)
  .then(result => {
      if(result.data.Status){
          window.location.reload()
      }else {
          alert(result.data.Error);
      }
  })
}

  return (
      <div className='px-5 mt-3'>
          <div className='d-flex justify-content-center'>
              <h3>รายชื่อผู้จัดการ</h3>
          </div>
          <Link to='/dashboard/add_manager' className='btn btn-success'>Add manager</Link>
          <div className='mt-3'>
              <table className='table'>
                  <thead>
                      <tr>
                          <th>รหัสผู้จัดการ</th>
                          <th>ชื่อ - นามสกุล</th>
                          <th>แผนกผู้จัดการ</th>
                      </tr>
                  </thead>
                  <tbody>
                      {manager.map((e, index) => (
                          <tr key={index}>
                              <td>{e.manager_id}</td>
                              <td>{e.name}</td>
                              <td>{e.department}</td>
                              <td>
                                  <Link to={`/dashboard/edit_manager/` + e.id} className='btn btn-warning btn-sm me-2'>แก้ไข</Link>
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

export default Manager