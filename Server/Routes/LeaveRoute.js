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
    const sql = `INSERT INTO leaves (leave_type, start_date, end_date, start_time, end_time, leave_days, reason, manager_approver, employee_id, employee_name, employee_department, employee_username) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        req.body.leave_type,
        req.body.start_date,
        req.body.end_date,
        req.body.start_time,
        req.body.end_time,
        req.body.leave_days,
        req.body.reason,
        req.body.manager_approver,
        req.body.employee_id,
        req.body.employee_name,
        req.body.employee_department,
        req.body.employee_username
    ];

    connect.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Status: false, Error: "Database query error" });
        }

        if (req.body.leave_type === 'ลาป่วย' || req.body.leave_type === 'ลากิจ' || req.body.leave_type === 'without pay') {
            let leaveColumn;
            let updateOperation = '-'; // Default operation is subtraction

            switch (req.body.leave_type) {
                case 'ลาป่วย':
                    leaveColumn = 'sick_leave';
                    break;
                case 'ลากิจ':
                    leaveColumn = 'absence_leave';
                    break;
                case 'without pay':
                    leaveColumn = 'withoutpay_leave';
                    updateOperation = '+'; // Change operation to addition
                    break;
                default:
                    leaveColumn = null;
            }

            if (leaveColumn) {
                const updateEmployeeSql = `UPDATE employees SET ${leaveColumn} = ${leaveColumn} ${updateOperation} ? WHERE id = ?`;
                connect.query(updateEmployeeSql, [req.body.leave_days, req.body.employee_id], (err, result) => {
                    if (err) {
                        console.error("Query error:", err);
                        return res.status(500).json({ Status: false, Error: "Error updating employee leave days" });
                    }
                    return res.json({ Status: true, Message: "บันทึกการลาและอัปเดตจำนวนวันลาในบัญชีของพนักงานเรียบร้อยแล้ว" });
                });
            } else {
                return res.status(400).json({ Status: false, Error: "ประเภทการลาไม่ถูกต้อง" });
            }
        } else {
            res.json({ Status: true, Message: "บันทึกการลาเรียบร้อยแล้ว" });
        }
    });
});


export { router as LeaveRoute }