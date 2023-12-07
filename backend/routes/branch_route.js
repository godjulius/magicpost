const express = require("express");
const branchController = require("../controllers/BranchController");
const router = express.Router();

router.post("/branch/create", branchController.createBranch);
router.get("/branch/:branchId/employee", branchController.getEmployeeOfBranch);
router.get("/branch/employee", branchController.getEmployeeByManager);
router.get("/branch/:branchId/parcel", branchController.getAllParcelsAtBranch);
router.get("/branch/:branchId", branchController.getBranchById);
router.get("/branch", branchController.getAllBranch);

module.exports = router;
