const express=require("express");
const orderController=require("../controllers/OrderController");
const router=express.Router();

router.post("/order/create",orderController.createOrder);
router.post("/order/:orderId/:statusId",orderController.receiveOrReturn);
router.get("/order/tracking/:searchValue",orderController.getOrderByIds);
router.get("/order/:statusId",orderController.getOrderByStatus);
router.get("/order",orderController.getAllOrders);

module.exports = router;
