const express = require("express");
const deliveryController = require("../controllers/DeliveryController")
const router = express.Router();

router.post("/delivery/create", deliveryController.createDelivery);
router.post("/delivery/:deliveryId/receive", deliveryController.receiveDelivery);
router.get("/:orderId/path", deliveryController.getPath)
router.get("/delivery", deliveryController.getAllDelivery);

module.exports = router