const {models: {Branch, Employee}} = require("../models");

class BranchController {

    //GET /branch
    async getAllBranch(req, res, next) {
        const branches = await Branch.findAll({
            include: [
                {
                    model: Employee,
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

    //GET /branch/:branchId/employee
    async getEmployeeOfBranch(req, res, next) {
        console.log(req.session);
        const roleId = req.session.roleId;
        if (roleId !== 1 || roleId !== 2) {
            return res.status(401).json({
                msg: "You are not authorized to access!"
            });
        }
        const employees = await Employee.findAll({
            attributes: [],
            where: {
                branch_id: req.params.branchId,
            },
            include: [
                {
                    model: Branch,
                    required: true,
                    attributes: [],
                },
            ],
        });

        return res.status(200).json(employees);
    }

    //GET /branch/employee
    async getEmployeeByManager(req, res, next) {
        const managerId = req.session.employeeId;
        const roleId = req.session.roleId;
        if (roleId !== 3 || roleId !== 5) {
            res.status(401).json({
                msg: "You are not authorized to access!",
            });
        }
        const branch = await Branch.findOne({
            where: {
                manager_id: managerId,
            }
        })
        const branchId = branch.branch_id;
        const employees = await Employee.findAll({
            where: {
                branch_id: branchId,
            }
        })

        return res.status(200).json({
            employees: employees,
            branch: branch,
        });
    }

}

module.exports = new BranchController();
