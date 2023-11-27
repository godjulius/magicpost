const express = require("express");
const parcelController = require("../controllers/ParcelController");
const router = express.Router();

router.get("/parcel/:orderId/receive", parcelController.receiveParcel);
router.get("/parcel", parcelController.getAllParcels);

module.exports = router;
