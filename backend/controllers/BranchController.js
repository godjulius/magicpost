const {models: {Branch, Employee, Parcel, Delivery, Order, Customer, ParcelType, Status}} = require("../models");
const Joi = require("joi");
const {Op} = require("sequelize");

class BranchController {

    //GET /branch
    async getAllBranch(req, res, next) {
        const branches = await Branch.findAll({
            include: [
                {
                    model: Employee,
                    required: false,
                },
            ],
        });
        return res.status(200).json(branches);
    }

    //POST /branch/create
    async createBranch(req, res, next) {
        if (!req.session.User) {
            return res.status(401).json({
                msg: "Login first",
            })
        }
        if (req.session.User.roleId !== 1 && req.session.User.roleId !== 2) {
            return res.status(403).json({
                msg: "No authorize",
            })
        }
        const schema = Joi.object({
            managerId: Joi.number().integer().min(1),
            branchName: Joi.string().required(),
            province: Joi.string().required(),
            district: Joi.string().required(),
            detailAddress: Joi.string().required(),
            isHub: Joi.number().integer().min(0).max(1).required(),
            hubId: Joi.number().integer().min(1),
        });

        const result = schema.validate(req.body);

        if (result.error) {
            return res.status(400).send("Bad request");
        }
        const {managerId, branchName, province, district, detailAddress, isHub} = req.body;
        const newBranch = async () => {
            if (isHub === 0) {
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
        if (!req.session.User) {
            return res.status(401).json({
                msg: "Login first",
            });
        }
        const schema = Joi.object({
            id: Joi.number().min(1).required(),
        });
        const result = schema.validate({
            id: req.params.branchId,
        });
        if (result.error) {
            return res.status(400).send("Invalid ID");
        }
        const roleId = req.session.User.roleId;
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
        const managerId = req.session.User.employeeId;
        const roleId = req.session.User.roleId;
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
        if (!req.session.User) {
            return res.status(403).json({
                msg: "Login first",
            })
        }
        if (req.session.User.roleId === 4 || req.session.User.roleId === 6) {
            return res.status(403).json({
                msg: "Forbidden",
            })
        }
        if ((req.session.User.roleId === 3 || req.session.User.roleId === 5) && req.session.User.branchId !== branch.branch_id) {
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

    //GET /branch/search
    async searchBranch(req, res) {
        console.log(req.session.User);
        if (!req.session.User) {
            return res.status(403).json({
                msg: "You are not login",
            });
        }
        const schema = Joi.object({
            province: Joi.string().pattern(
                new RegExp("^[a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ,./ ]+$")
            ),
            district: Joi.string().pattern(
                new RegExp("^[a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ,./ ]+$")
            ),
        });
        const validate = schema.validate(req.body);
        if (validate.error) {
            return res.status(400).send("Bad request");
        }
        const province = req.body.province;
        const district = req.body.district;
        const branches = await Branch.findAll();
        let filteredBranches = [...branches];
        if (province) {
            filteredBranches = branches.filter(branch => branch.location.includes(province));
        }
        if (district) {
            filteredBranches = filteredBranches.filter(branch => branch.location.includes(district));
        }
        return res.status(200).json(filteredBranches);
    }

    //GET /branch/:branchId/send
    async getSendByBranch(req, res) {
        if (!req.session.User) {
            return res.status(401).json({
                msg: "Login first",
            });
        }
        if (req.session.User.roleId === 4 || req.session.roleId === 6) {
            return res.status(401).json({
                msg: "No authorize",
            });
        }
        const schema = Joi.number().integer().min(1).required();
        const validateResult = schema.validate(req.params.branchId);
        if (validateResult.error) {
            return res.status(403).send("Bad request");
        }

        const branch = await Branch.findOne({
            where: {
                branch_id: req.params.branchId,
            }
        });
        if (!branch) {
            return res.status(404).json({
                msg: "Branch not found",
            });
        }
        const send = await Delivery.findAll({
            where: {
                sender_id: req.params.branchId,
            },
            include: [
                {
                    model: Order,
                    required: true,
                    include: [
                        {
                            model: Customer,
                            required: true,
                        }, {
                            model: Employee,
                            required: true,
                            attributes: [
                                "first_name", "last_name"
                            ]
                        }, {
                            model: Parcel,
                            required: true,
                            include: [
                                {
                                    model: ParcelType,
                                    required: true,
                                }
                            ]
                        }, {
                            model: Status,
                            required: true,
                        }
                    ],
                },
            ],
        });
        if (!send) {
            return res.status(200).json({
                msg: "No data",
            });
        }
        return res.status(200).json(send);
    }

    //GET /branch/:branchId/receive
    async getReceiveByBranch(req, res) {
        if (!req.session.User) {
            return res.status(401).json({
                msg: "Login first",
            });
        }
        if (req.session.User.roleId === 4 || req.session.User.roleId === 6) {
            return res.status(401).json({
                msg: "No authorize",
            })
        }
        const schema = Joi.number().integer().min(1).required();
        const validateResult = schema.validate(req.params.branchId);
        if (validateResult.error) {
            return res.status(403).send("Bad request");
        }

        const branch = await Branch.findOne({
            where: {
                branch_id: req.params.branchId,
            }
        });
        if (!branch) {
            return res.status(404).json({
                msg: "Branch not found",
            });
        }
        const receive = await Delivery.findAll({
            where: {
                receiver_id: req.params.branchId,
                receive_date: {
                    [Op.ne]: null,
                },
            },
            include: [
                {
                    model: Order,
                    required: true,
                    include: [
                        {
                            model: Customer,
                            required: true,
                        }, {
                            model: Employee,
                            required: true,
                            attributes: [
                                "first_name", "last_name"
                            ]
                        }, {
                            model: Parcel,
                            required: true,
                            include: [
                                {
                                    model: ParcelType,
                                    required: true,
                                }
                            ]
                        }, {
                            model: Status,
                            required: true,
                        }
                    ],
                },
            ],
        });
        if (!receive) {
            return res.status(200).json({
                msg: "No data",
            });
        }
        return res.status(200).json(receive);
    }

}

module.exports = new BranchController();
