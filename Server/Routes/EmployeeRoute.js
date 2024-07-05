import express from 'express';
import connect from '../utils/db.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()


router.get("/detail/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * from employees WHERE id = ?";
    connect.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Query error:", err);
            return res.json({ loginStatus: false, Error: "Query error" });
        }
        if (result.length > 0) {
            return res.json({ loginStatus: true, data: result[0] });
        } else {
            return res.json({ loginStatus: false, Error: "Employee not found" });
        }
    });
});

router.get('/employee_detail', (req, res) => {
    
    const sql = "SELECT * FROM leaves"
    connect.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/history_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM leaves WHERE employee_id = ?";
    connect.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Query error:", err);
            return res.json({ historyStatus: false, Error: "Query error" });
        }
        if (result.length > 0) {
            return res.json({ historyStatus: true, data: result });
        } else {
            return res.json({ historyStatus: false, Error: "Employee not found" });
        }
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

export { router as EmployeeRouter }