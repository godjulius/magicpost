const express=require("express");
const orderController=require("../controllers/OrderController");
const router=express.Router();

router.post("/order/create",orderController.createOrder);
router.get("/order/:orderId",orderController.getOrderById);
router.get("/order",orderController.getAllOrders);

module.exports = router;
