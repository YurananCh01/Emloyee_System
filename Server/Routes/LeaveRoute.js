import express from 'express';
import connect from '../utils/db.js';
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'

const router = express.Router()


router.get('/leaves', (req, res) => {
    const sql = "SELECT * FROM leaves"
    connect.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add_leave', (req, res) => {
    const sql = `INSERT INTO leaves (leave_type,start_date,end_date,start_time,end_time,leave_days,reason,manager_approver,employee_id) VALUES (?,?,?,?,?,?,?,?,?)`;
    const values = [
        req.body.leave_type,
        req.body.start_date,
        req.body.end_date,
        req.body.start_time,
        req.body.end_time,
        req.body.leave_days,
        req.body.reason,
        req.body.manager_approver,
        req.body.employee_id
    ];
    connect.query(sql, values, (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ Status: false, Error: "Database query error" });
        }
        res.json({ Status: true, Message: "Leave record added successfully" });
    });
});

export { router as LeaveRoute }