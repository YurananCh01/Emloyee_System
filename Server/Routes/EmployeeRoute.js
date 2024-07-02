import express from 'express';
import connect from '../utils/db.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()


// router.post("/login", (req, res) => {
//     const sql = "SELECT * from employees Where username = ? and password = ? and role = 'employee'";
//     connect.query(sql, [req.body.emp_id], (err, result) => {
//         if (err) return res.json({ loginStatus: false, Error: "Query error" });
//         if (result.length > 0) {
//             if (req.body.password === result[0].password) {
//                 const username = result[0].username;
//                 const token = jwt.sign(
//                     { role: "employee", username: username, id: result[0].id },
//                     "jwt_secret_key",
//                     { expiresIn: "1d" }
//                 );
//                 res.cookie('token', token);
//                 return res.json({ loginStatus: true, id: result[0].id });
//             } else {
//                 return res.json({ loginStatus: false, Error: "Wrong Password" });
//             }
//         } else {
//             return res.json({ loginStatus: false, Error: "Wrong ID or Password" });
//         }
//     });
// });



router.get("/detail/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * from employees WHERE id = ?";
    connect.query(sql, [id], (err, result) => {
        console.log(result);
        if (err) {
            console.error("Query error:", err);
            return res.json({ loginStatus: false, Error: "Query error" });
        }
        if (result.length > 0) {
            console.log(result);
            return res.json({ loginStatus: true, data: result[0] });
        } else {
            return res.json({ loginStatus: false, Error: "Employee not found" });
        }
    });
});






router.get('/employee_detail', (req, res) => {
    w
    const sql = "SELECT * FROM leave"
    connect.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

export { router as EmployeeRouter }