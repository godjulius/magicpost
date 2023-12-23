const express=require("express");
const orderController=require("../controllers/OrderController");
const router=express.Router();

router.post("/order/create",orderController.createOrder);
router.get("/order/tracking/:searchValue",orderController.getOrderByIds);
router.get("/order",orderController.getAllOrders);

module.exports = router;
