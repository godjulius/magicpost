const {models: {Employee, Branch, Customer, Order, Role}} = require("../models");
const bcrypt = require("bcrypt");
const session = require("express-session");
const {Op} = require("sequelize");
const sequelize = require("sequelize");
const Joi = require("joi");
const bcryptRound = 10;

class EmployeeController {

    //GET /employee
    async getAllEmployee(req, res, next) {
        req.session.roleId = 1;

        if (req.session.roleId === 1 || req.session.roleId === 2) {
            return res.status(200).json(
                await Employee.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: Role,
                            required: true,
                        },
                    ],
                })
            );
        }
        return res.status(400).json({
            msg: "You are not authorized to access!"
        });
    }

    //GET /employee/:id
    async getEmployeeById(req, res, next) {
        const idSchema = Joi.number().integer().min(1);
        const result = idSchema.validate(req.params.id);
        if (result.error) {
            return res.status(400).send("Bad request");
        }
        console.log(req.params);
        const employeeId = req.params.id;
        const employee = await Employee.findOne({
            where: {
                employee_id: employeeId,
            },
            attributes: {exclude: ["password",],},
        });
        if (!employee) {
            return res.status(404).json({
                status: "Query fail",
                msg: `Employee with id ${employeeId} doesn't exists`,
            });
        }
        return res.status(200).json(employee);
    }

    //POST /employee/create
    async createAccount(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            first_name: Joi.string().pattern(
                new RegExp("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ ]+$")
            ).required(),
            last_name: Joi.string().pattern(
                new RegExp("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ ]+$")
            ).required(),
            address: Joi.string().pattern(
                new RegExp("^[a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳỵỷỹđĐ,./ ]+$")
            ).required(),
            phone: Joi.string().pattern(
                new RegExp("^\\+?[0-9]{1,15}$")
            ).required(),
            roleId: Joi.number().integer().min(1).max(6),
            branchId: Joi.number().integer().min(1),
        });
        const dateSchema = Joi.object({
            day: Joi.number().integer().min(1).max(31).required(),
            month: Joi.number().integer().min(1).max(12).required(),
            year: Joi.number().integer().min(1900).max(2099).required()
        }).custom((value, helpers) => {
            const {day, month, year} = value;
            const date = new Date(year, month - 1, day);
            if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                return helpers.error('any.invalid');
            }
            return value;
        }, 'Date validation');
        const result = schema.validate({
            email: req.body.email,
            password: req.body.password,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            address: req.body.address,
            phone: req.body.phone,
            roleId: req.body.roleId,
            branchId: req.body.branchId,
        });
        const dateResult = dateSchema.validate({
            day: req.body.day,
            month: req.body.month,
            year: req.body.year,
        });
        if (result.error || dateResult.error) {
            return res.status(400).send("Bad request");
        }

        const email = req.body.email;
        const password = req.body.password;
        const first_name = req.body.firstName;
        const last_name = req.body.lastName;
        const day = req.body.day;
        const month = req.body.month;
        const year = req.body.year;
        const dob = new Date(year, month - 1, day);
        const address = req.body.address;
        const phone = req.body.phone;

        if (await Employee.findOne({
            where: {
                email: email,
            },
        })) {
            return res.status(200).json({
                msg: "Email is already existed!",
            });
        }
        if (await Employee.findOne({
            where: {
                phone: phone,
            },
        })) {
            return res.status(200).json({
                msg: "Phone is already existed!",
            });
        }
        let roleId
        let branchId;
        req.session.roleId = 1;
        if (req.session.roleId === 1 || req.session.roleId === 2) {
            roleId = req.body.roleId;
            branchId = req.body.branchId;
        }
        if (req.session.roleId === 3 || req.session.roleId === 5) {
            roleId = req.session.roleId;
            branchId = req.session.branchId;
        }
        const hashedPw = await bcrypt.hash(password, bcryptRound);
        if (!hashedPw) {
            throw new Error("Hashed password error");
        }
        const employee = await Employee.create({
            email: email,
            role_id: roleId,
            phone: phone,
            password: hashedPw,
            branch_id: branchId,
            first_name: first_name,
            last_name: last_name,
            dob: dob,
            address: address,
        })
        return res.status(200).json({
            msg: "Create account successfully!",
            employee: {
                employee_id: employee.employee_id,
                role_id: employee.role_id,
                phone: employee.phone,
                fullName: `${employee.first_name} ${employee.last_name}`,
            }
        })
    }

    //POST /login
    async logIn(req, res, next) {
        const employee = await Employee.findOne({
            where: {
                // email: req.body.email,
                email: "duy@gmail.com"
            },
        });
        try {
            if (!employee) {
                return res.status(200).json({
                    msg: "Invalid email",
                })
            }
            const checkedPassword = await bcrypt.compareSync(
                req.body.password,
                employee.password,
            );
            if (!checkedPassword) {
                return res.status(200).json({
                    msg: "Invalid password",
                });
            }

            req.session.isLogin = true;
            req.session.employeeId = employee.employee_id;
            req.session.roleId = employee.role_id;
            req.session.branchId = employee.branch_id;
            console.log(req.session);
            return res.status(200).json(
                {
                    employee: employee,
                    cookie: req.headers.cookie,
                }
            );
        } catch (err) {
            next(err);
        }
    }

//GET /employee/:employeeId/customer
    async getCustomerOfEmployee(req, res, next) {
        const employeeId = req.params.employeeId;
        const employee = await Employee.findOne({
            where: {
                employee_id: employeeId,
            }
        });
        if (!employee) {
            return res.status(404).json({
                msg: `Employee with id ${employeeId} doesn't exists`,
            });
        }
        const customers = await Customer.findAll({
            include: [
                {
                    model: Order,
                    required: true,
                    where: {
                        employee_id: employeeId,
                    },
                    attributes: [],
                    include: [
                        {
                            model: Employee,
                            required: true,
                            attributes: [sequelize.fn('concat', sequelize.col('first_name'), ' ',
                                sequelize.col('last_name')), 'employeeFullName'],
                        }
                    ],
                },
            ],
        });

        return res.status(200).json(customers);
    }

//GET /employee/hubManager
    async getAllHubManager(req, res, next) {
        const hubManagers = await Employee.findAll({
            include: [
                {
                    model: Role,
                    required: true,
                    where: {
                        role_name: "Trưởng điểm tập kết",
                    },
                },
            ],
        });
        return res.status(200).json(hubManagers);
    }

//

}

module.exports = new EmployeeController();
