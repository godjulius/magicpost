const {models: {Branch, Employee}} = require("../models");

class BranchController {

    //GET /branch
    async getAllBranch(req, res, next) {
        const branches = await Branch.findAll({
            attributes: [],
            include: [
                {
                    model: Employee,
                    attributes: [],
                    required: true,
                },
            ],
        });
        return res.status(200).json(branches);
    }

    //GET /branch/:branchId
    async getBranchById(req, res, next) {
        const branchId = req.params.branchId;
        const branch = await Branch.findOne({
            where: {
                branch_id: branchId,
            },
        });

        if (!branch) {
            return res.status(401).json({
                status: "Query fail",
                msg: `Branch with id ${branchId} doesn't exist`,
            });
        }

        return res.status(200).json(branch);
    }


}

module.exports = new BranchController();
