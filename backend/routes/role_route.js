const express = require("express");
const roleController = require("../controllers/RoleController");
const router = express.Router();

router.get("/role", roleController.getAllRoles);
router.get("/role/:roleId", roleController.getEmployeesByRole);

module.exports = router;
