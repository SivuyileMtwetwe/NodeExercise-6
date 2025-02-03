import mysql from "mysql2/promise";
import { config } from "dotenv";
config();

const pool = mysql.createPool({
    host: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

export const getAllEmployees = async () => {
    const [employees] = await pool.query("SELECT * FROM employees");
    return employees;
};

export const getEmployee = async (id) => {
    const [employee] = await pool.query("SELECT * FROM employees WHERE employee_id = ?", [id]);
    return employee;
};

export const addEmployee = async (first_name, last_name, email, phone_number, salary, department_id) => {
    await pool.query("INSERT INTO employees (first_name, last_name, email, phone_number, salary, department_id) VALUES (?, ?, ?, ?, ?, ?)", [first_name, last_name, email, phone_number, salary, department_id]);
    return getAllEmployees();
};

export const deleteEmployee = async (id) => {
    await pool.query("DELETE FROM employees WHERE employee_id = ?", [id]);
    return getAllEmployees();
};

export const deleteAllEmployees = async () => {
    await pool.query("TRUNCATE TABLE employees");
    return getAllEmployees();
};

export const updateEmployee = async (first_name, last_name, email, phone_number, salary, department_id, id) => {
    await pool.query("UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone_number = ?, salary = ?, department_id = ? WHERE employee_id = ?", [first_name, last_name, email, phone_number, salary, department_id, id]);
    return getAllEmployees();
};

export const getEmployeeByLocation = async (location) => {
    const [employees] = await pool.query("SELECT CONCAT(first_name, ' ', last_name) AS 'Full Name' FROM employees INNER JOIN departments ON employees.department_id = departments.department_id WHERE location LIKE ?", [location]);
    return employees;
};