
import * as EmployeeModel from "../models/employeeModel.js";

export const getAll = async (req, res) => {
    res.json({ employees: await EmployeeModel.getAllEmployees() });
};

export const getById = async (req, res) => {
    res.json({ employee: await EmployeeModel.getEmployee(req.params.id) });
};

export const getByLocation = async (req, res) => {
    res.json({ employees: await EmployeeModel.getEmployeeByLocation(req.params.location) });
};

export const create = async (req, res) => {
    const { first_name, last_name, email, phone_number, salary, department_id } = req.body;
    res.json({ employee: await EmployeeModel.addEmployee(first_name, last_name, email, phone_number, salary, department_id) });
};

export const remove = async (req, res) => {
    res.json({ employee: await EmployeeModel.deleteEmployee(req.params.employee_id) });
};

export const removeAll = async (req, res) => {
    res.json({ employees: await EmployeeModel.deleteAllEmployees() });
};

export const update = async (req, res) => {
    const { first_name, last_name, email, phone_number, salary, department_id } = req.body;
    res.json({ employee: await EmployeeModel.updateEmployee(first_name, last_name, email, phone_number, salary, department_id, req.params.employee_id) });
};