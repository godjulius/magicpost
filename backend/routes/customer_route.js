const express=require("express");
const customerController=require("../controllers/CustomerController");
const router=express.Router();

router.get("/customer/:customerId",customerController.getCustomerById);
router.get("/customer",customerController.getAllCustomers);

module.exports = router;
