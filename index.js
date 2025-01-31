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

app.get("/employees/:location", async (req, res) => {


         res.json({ employees: await getEmployeeByLocation(req.params.location) });

        
    
});


app.post("/employees", async (req,res)=>{
    let {first_name,last_name,email,phone_number,salary,department_id} = req.body
    res.json({employee: await addEmployee(first_name,last_name,email,phone_number,salary,department_id)})
})

app.delete("/employees/:employee_id", async (req,res)=>{
    res.json({employee: await deleteEmployee(req.params.employee_id)})
})

app.delete("/employees", async (req,res)=>{
    res.json({employees: await deleteAllEmployees() })
})


app.patch("/employees/:employee_id", async (req,res)=>{
    let {first_name,last_name,email,phone_number,salary,department_id} = req.body

    let {employee_id} = req.params
    
    res.json({employee: await updateEmployee(first_name,last_name,email,phone_number,salary,department_id, employee_id)})
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
 
const addEmployee = async (first_name,last_name,email,phone_number,salary,department_id)=>{
    let [employee] = await pool.query("INSERT INTO employees (first_name,last_name,email,phone_number,salary,department_id) VALUES (?,?,?,?,?,?)",[first_name,last_name,email,phone_number,salary,department_id])

    return await getAllEmployees()
}

// console.log(await addEmployee("Sivuyile", "Mtwetwe", "sivuyilemtwetwe@gmail.com", "082-625-4659", 100000.00,2 ))

const deleteEmployee = async (employee_id)=>{
    let [employee] = await pool.query("DELETE FROM employees WHERE employee_id LIKE ?",[employee_id])

    return await getAllEmployees()
}

// console.log(await deleteEmployee(4));

const updateEmployee = async (first_name,last_name,email,phone_number,salary,department_id,employee_id) =>{
    let [employee ] = await pool.query("UPDATE employees SET first_name = ?,last_name = ?,email = ?,phone_number = ?,salary = ?,department_id = ? WHERE employee_id LIKE ?", [first_name,last_name,email,phone_number,salary,department_id,employee_id])

    return getAllEmployees()
}

// console.log(await updateEmployee("Sivu","Mtwe", "sivumtwe@gmail.com", "0000-000-000", 19.00,2,3));

// console.log();

const deleteAllEmployees = async ()=>{
    let [employees] = await pool.query("TRUNCATE TABLE employees")

    return await getAllEmployees()
}
// console.log(await deleteAllEmployees());

const getEmployeeByLocation = async (location)=>{
    let [employees] = await pool.query("SELECT CONCAT(first_name, ' ', last_name) AS 'Full Name' FROM employees INNER JOIN departments ON employees.department_id = departments.department_id WHERE location LIKE ?",[location]
)


    return employees
}

console.log(await getEmployeeByLocation("Europe"));

app.listen(PORT,()=>{
    console.log("Welcome to port "+ PORT);
})