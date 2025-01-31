import express from "express"
import mysql from "mysql2/promise"
import { config } from "dotenv"
config()

const app = express()
app.use(express.json())

app.get("/employees", async (req,res)=>{
    res.json({employees: await getAllEmployees() })
})

app.get("/employees/:id", async (req,res)=>{
res.json({employee: await getEmployee(req.params.id)})
})

const PORT = process.env.PORT

const pool = mysql.createPool({
    hostname: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})



const getAllEmployees = async ()=>{
    let [employees] = await pool.query("SELECT * FROM employees")
    return employees
}

console.log(await getAllEmployees());

const getEmployee = async (employee_id)=>{
    let [employee] = await pool.query("SELECT * FROM employees WHERE employee_id LIKE ?",[employee_id])

    return employee
}

console.log(await getEmployee());
 
const addEmployee = async ()=>{
    
}

app.listen(PORT,()=>{
    console.log("Welcome to port "+ PORT);
})