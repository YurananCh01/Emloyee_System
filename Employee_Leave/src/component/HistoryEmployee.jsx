import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HistoryEmployee = () => {

    const [employee, setEmployee] = useState([]);
    useEffect = (() =>{
        axios.get('http://localhost:3000/employee/history_employee/' + id)
        .then(result => {
          if (result.data.loginStatus) {
            setEmployee(result.data.data);
          } else {
            console.log(result.data.Error);
          }
        }).catch(err => console.log(err))

    }, [])

  return (
    <div>HistoryEmployee</div>
  )
}

export default HistoryEmployee