const express=require("express");
const employeeController=require("../controllers/EmployeeController");
const router=express.Router();

router.post("/employee/create",employeeController.createAccount);
router.post("/login",employeeController.logIn);
router.get("/employee/:id",employeeController.getEmployeeById);
router.get("/employee",employeeController.getAllEmployee);

module.exports = router;
