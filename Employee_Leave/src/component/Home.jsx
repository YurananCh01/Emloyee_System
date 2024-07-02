import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [employeeTotal, setEmployeeCount] = useState()
  const [managerTotal, setManagerCount] = useState()

  useEffect(() => {
    employeeConut();
    managerConut();
  }, [])
  const employeeConut = () => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result =>{
      if(result.data.Status){
        setEmployeeCount(result.data.Result[0].employee)
      }
    })
  }
  const managerConut = () => {
    axios.get('http://localhost:3000/auth/manager_count')
    .then(result =>{
      if(result.data.Status){
        setManagerCount(result.data.Result[0].manager)
      }
    })
  }

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pd-1'>
            <h4>Manager</h4>
          </div>
          <div>
            <h5>Tatal: {managerTotal}</h5>
          </div>
          <hr />
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <div>
            <h5>Tatal: {employeeTotal}</h5>
          </div>
          <hr />
        </div>
      </div>
    </div>
  )
}

export default Home