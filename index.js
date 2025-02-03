import express from "express";
import { config } from "dotenv";
import employeeRoutes from "./routes/employeeRoutes.js";

config();

const app = express();
app.use(express.json());
app.use("/employees", employeeRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});