const express = require("express");
const router = express.Router();
const toolController = require("../controllers/ToolController");

router.get('/print/:orderId', toolController.print);

module.exports = router;