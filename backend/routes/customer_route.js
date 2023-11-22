const express=require("express");
const customerController=require("../controllers/CustomerController");
const router=express.Router();

router.get("/customer",customerController.getAllCustomers);

module.exports = router;
