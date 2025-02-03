import express from "express";
import * as EmployeeController from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", EmployeeController.getAll);
router.get("/:id", EmployeeController.getById);
router.get("/location/:location", EmployeeController.getByLocation);
router.post("/", EmployeeController.create);
router.delete("/:employee_id", EmployeeController.remove);
router.delete("/", EmployeeController.removeAll);
router.patch("/:employee_id", EmployeeController.update);

export default router;