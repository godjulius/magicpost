const express = require("express");
const deliveryController = require("../controllers/DeliveryController")
const router = express.Router();

router.post("/delivery/:deliveryId/transshipment", deliveryController.transshipment);
router.post("/delivery/create", deliveryController.createDelivery);
router.get("/delivery", deliveryController.getAllDelivery);

module.exports = router