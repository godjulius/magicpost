const {models: {Branch, Employee, Parcel}} = require("../models");
const Joi = require("Joi");

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

    //POST /branch/create
    async createBranch(req, res, next) {
        const {managerId, branchName, province, district, detailAddress, isHub} = req.body;
        const schema = Joi.object({
            managerId: Joi.number().integer().min(0).required(),
            branchName: Joi.string().required(),
            province: Joi.string().required(),
            district: Joi.string().required(),
            detailAddress: Joi.string().required(),
            isHub: Joi.number().integer().min(0).max(1).required(),
        });

        const result = schema.validate({
            managerId: managerId,
            branchName: branchName,
            province: province,
            district: district,
            detailAddress: detailAddress,
            isHub: isHub,
        });

        if (result.error) {
            return res.status(400).send("Bad request");
        }

        const newBranch = async () => {
            if (isHub === 1) {
                return await Branch.create({
                    manager_id: managerId,
                    branch_name: branchName,
                    location: `${detailAddress}, ${district}, ${province}`,
                    is_hub: isHub,
                    hub_id: req.body.hubId,
                });
            } else {
                const branch = await Branch.create({
                    manager_id: managerId,
                    branch_name: branchName,
                    location: `${detailAddress}, ${district}, ${province}`,
                    is_hub: isHub,
                });
            }
        }
        return res.status(200).json({
            msg: "Create branch successfully",
            branch: newBranch(),
        })
    }

    //GET /branch/:branchId
    async getBranchById(req, res, next) {
        const schema = Joi.object({
            id: Joi.number().min(1).required(),
        });
        const result = schema.validate({
            id: req.params.branchId,
        });
        if (result.error) {
            return res.status(400).send("Invalid ID");
        }
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
        const schema = Joi.object({
            id: Joi.number().min(1).required(),
        });
        const result = schema.validate({
            id: req.params.branchId,
        });
        if (result.error) {
            return res.status(400).send("Invalid ID");
        }
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

    //GET /branch/:branchId/parcel
    async getAllParcelsAtBranch(req, res) {
        const schema = Joi.object({
            id: Joi.number().min(1).required(),
        });
        const result = schema.validate({
            id: req.params.branchId,
        });
        if (result.error) {
            return res.status(400).send("Invalid ID");
        }
        const branchId = req.params.branchId;
        const branch = await Branch.findOne({
            where: {
                branch_id: branchId,
            }
        });
        if (!branch) {
            return res.status(404).json({
                msg: "Branch not found!",
            });
        }
        if (!req.session.isLogin) {
            return res.status(403).json({
                msg: "Login first",
            })
        }
        if (req.session.roleId === 4 || req.session.roleId === 6) {
            return res.status(403).json({
                msg: "Forbidden",
            })
        }
        if ((req.session.roleId === 3 || req.session.roleId === 5) && req.session.branchId !== branch.branch_id) {
            return res.status(403).json({
                msg: "Forbidden",
            })
        }

        const parcels = await Parcel.findAll({
            where: {
                branch_id: branchId,
            }
        });
        return res.status(200).json(parcels);
    }

}

module.exports = new BranchController();
