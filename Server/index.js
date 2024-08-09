import express from 'express';
import cors from 'cors'
import { adminRouter } from './Routes/AdminRoute.js';
import { EmployeeRouter } from './Routes/EmployeeRoute.js';
import { ManagerRouter } from './Routes/ManagerRoute.js';
import { LeaveRoute } from './Routes/LeaveRoute.js';

const app = express();
app.use(cors({
    origin: ["http://172.16.252.120:5173"],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}))
app.use(express.json())
app.use('/auth',adminRouter)
app.use('/employee',EmployeeRouter)
app.use('/manager',ManagerRouter)
app.use('/leave',LeaveRoute)
app.use(express.static('Public'))


app.listen(3000, () =>{
    console.log("Server is runing port 3000")
})