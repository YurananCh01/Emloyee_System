import express from 'express';
import connect from '../utils/db.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()


router.get("/manager_detail/:id", (req, res) => {
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
            return res.json({ loginStatus: false, Error: "Manager not found" });
        }
    });
});


// อัปเดตสถานะการลาเป็นอนุมัติ
router.put("/approve_leave", (req, res) => {
    const { leave_id, employee_id, leave_type, leave_days } = req.body;
    const updateLeaveSql = "UPDATE leaves SET manager_approver = 'อนุมัติ' WHERE id = ?";
    connect.query(updateLeaveSql, [leave_id], (err, result) => {
        if (err) {
            console.error("Query error:", err);
            return res.json({ Status: false, Error: "Query error" });
        }

        let leaveColumn;
        switch (leave_type) {
            case 'ลาพักร้อน':
                leaveColumn = 'holidays_leave';
                break;
            case 'ลาเพื่อดูแลบุพการี':
                leaveColumn = 'parent_leave';
                break;
            default:
                leaveColumn = null;
        }

        if (leaveColumn) {
            const updateEmployeeSql = `UPDATE employees SET ${leaveColumn} = ${leaveColumn} - ? WHERE id = ?`;
            connect.query(updateEmployeeSql, [leave_days, employee_id], (err, result) => {
                if (err) {
                    console.error("Query error:", err);
                    return res.json({ Status: false, Error: "Query error" });
                }
                return res.json({ Status: true });
            });
        } else {
            return res.json({ Status: false, Error: "Invalid leave type" });
        }
    });
});

// อัปเดตสถานะการลาเป็นไม่อนุมัติ
router.put('/reject_leave', (req, res) => {
    const { leave_id } = req.body;
    const sql = "UPDATE leaves SET manager_approver = 'ไม่อนุมัติ' WHERE id = ?";
    connect.query(sql, [leave_id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query error" });
        }
        return res.json({ Status: true });
    });
});




router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})





export { router as ManagerRouter }