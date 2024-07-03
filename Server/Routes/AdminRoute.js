import express from 'express';
import connect from '../utils/db.js';
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'


const router = express.Router()

router.post('/login', (req, res) => {
    const sql = "SELECT * FROM employees WHERE username = ? AND password = ?"
    connect.query(sql, [req.body.username, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" })

        if (result.length > 0) {
            const user = result[0];
            const token = jwt.sign({ role: user.role, username: user.username }, "jwt_secret_key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ loginStatus: true, role: user.role, id: user.id  })
        } else {
            return res.json({ loginStatus: false, Error: "Wrong username or password" })
        }
    });
});


//-------------------------------Add manager--------------//

// router.get('/manager', (req, res) => {
//     const sql = "SELECT * FROM employees WHERE role = 'manager' "
//     connect.query(sql, (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" })
//         return res.json({ Status: true, Result: result })
//     })
// })

// router.get('/manager/:id', (req, res) => {
//     const id = req.params.id
//     const sql = "SELECT * FROM employees WHERE id = ? and role = 'manager'"
//     connect.query(sql, [id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" })
//         return res.json({ Status: true, Result: result })
//     })
// })

// router.put('/edit_manager/:id', (req, res) => {

//     const id = req.params.id;
//     const sql = `UPDATE employees set username=?, name=?, department=?, WHERE id = ?`;
//     const values = [
//         req.body.manager_id,
//         req.body.name,
//         req.body.department,
//     ]
//     connect.query(sql, [...values, id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" + err })
//         return res.json({ Status: true, Result: result })
//     })
// })

// router.delete('/delete_manager/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "DELETE FROM employees WHERE id = ?"
//     connect.query(sql, [id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" + err })
//         return res.json({ Status: true, Result: result })
//     })
// })

// router.get('/manager_count', (req,res) => {
//     const sql = "select count(id) as employee from employees WHERE role = 'manager'" 
//     connect.query(sql,  (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" + err })
//         return res.json({ Status: true, Result: result })
//     })
// })
//------------------end manager---------------//


//------------------employee-------------------//

router.post('/add_employee', (req, res) => {
    const sql = `INSERT INTO employees (username,name,password,start_date,department,sick_leave,holidays_leave,absence_leave,parent_leave,role) VALUES (?)`;

    const values = [
        req.body.username,
        req.body.name,
        req.body.password,
        req.body.start_date,
        req.body.department,
        req.body.sick_leave,
        req.body.holidays_leave,
        req.body.absence_leave,
        req.body.parent_leave,
        req.body.role
    ];

    connect.query(sql, [values], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true });
    });
});


router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employees"
    connect.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM employees WHERE id = ? "
    connect.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})


router.put('/edit_employee/:id', (req, res) => {

    const id = req.params.id;
    const sql = `UPDATE employees set username=?, name=?, start_date=?, department=?, sick_leave=?, 
    holidays_leave=?, absence_leave=?, parent_leave=?, role=? WHERE id = ?`;
    const values = [
        req.body.username,
        req.body.name,
        req.body.start_date,
        req.body.department,
        req.body.sick_leave,
        req.body.holidays_leave,
        req.body.absence_leave,
        req.body.parent_leave,
        req.body.role
    ]
    connect.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employees WHERE id = ?"
    connect.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/employee_count', (req,res) => {
    const sql = "select count(id) as employee from employees and role = 'employee'" 
    connect.query(sql,  (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})
//------------------End Employee-------------------//

router.get('/logout', (req,res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter }