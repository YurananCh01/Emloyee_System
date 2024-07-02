import  axios  from 'axios'
import React, {useEffect, useState}from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditManager = () => {
  const { id } = useParams()
  const [manager, setManager] = useState({
      manager_id: '',
      name: '',
      department: ''

  })


  useEffect(() => {
      axios.get('http://localhost:3000/auth/manager/'+ id)
          .then(result => {
              console.log(result.data.Result);
              setManager({
                  ...manager,
                  manager_id: result.data.Result[0].manager_id,
                  name: result.data.Result[0].name,
                  department: result.data.Result[0].department
              })
          }).catch(err => console.log(err));
      
  }, []);


const navigate = useNavigate();
const handleSubmit = (e) =>{
  e.preventDefault()
  axios.put('http://localhost:3000/auth/edit_manager/'+id, manager
  )
  .then(result => {
      if(result.data.Status){
          navigate('/dashboard/manager')
      }
      else{
          alert(result.data.Error)
      }
  }).catch(err => console.log(err))
}

  return (
      <div className='d-flex justify-content-center align-items-center vh-75'>
          <div className='p-3 rounded w-25 border'>
              <h3>แก้ไขข้อมูลผู้จัดการ</h3>
              <form className='row g-1' onSubmit={handleSubmit}>
                  <div className='col-12'>
                      <label htmlFor='inputId' className='form-label'>กรอกรหัสผู้จัดการ</label>
                      <input type='id' placeholder='รหัสผู้จัดการ'
                          className='form-control rounded-0'
                          value={manager.manager_id}
                          onChange={(e) => setManager({ ...manager, manager_id: e.target.value })} />
                  </div>
                  <div className='col-12'>
                      <label htmlFor='inputName' className='form-label'>ชื่อ - นามสกุล</label>
                      <input type='text' placeholder='กรอกชื่อ - นามสกุล'
                          className='form-control rounded-0'
                          value={manager.name}
                          onChange={(e) => setManager({ ...manager, name: e.target.value })} />
                  </div>
                  <div className='col-12'>
                        <label htmlFor='inputDepartment' className='form-label'>แผนกผู้จัดการ</label>
                        <select
                            id='inputDepartment'
                            name='department'
                            className='form-control rounded-0'
                            value={manager.department}
                            onChange={(e) => setManager({ ...manager, department: e.target.value })}
                        >
                            <option value='' disabled>กรุณาเลือกแผนกผู้จัดการ</option>
                            <option value='op1'>op1</option>
                            <option value='op2'>op2</option>
                            <option value='op3'>op3</option>
                            <option value='op4'>op4</option>
                            
                        </select>
                    </div>
                  <div className='col-12'>
                      <button type='submit' className='btn btn-primary w-100'>Edit Manager</button>
                  </div>

              </form>
          </div>
      </div>
  )
}

export default EditManager