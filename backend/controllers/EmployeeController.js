const {models: {Employee, Branch, Customer, Order, Role}} = require("../models");
const bcrypt = require("bcrypt");
const session = require("express-session");
const {Op} = require("sequelize");
const sequelize = require("sequelize");
const bcryptRound = 10;

class EmployeeController {

    //GET /employee
    async getAllEmployee(req, res, next) {
        if (true) {
            return res.status(200).json(
                await Employee.findAll()
            );
        }
        if (req.session.roleId === 1) {
            return res.status(200).json(
                await Employee.findAll({
                    where: {
                        id: {
                            [Op.ne]: 0,
                        },
                    },
                })
            );
        }
        return res.status(400).json({
            msg: "You are not authorized to access!"
        });
    }

    //GET /employee/:id
    async getEmployeeById(req, res, next) {
        console.log(req.params);
        const employeeId = req.params.id;
        const employee = await Employee.findOne({
            where: {
                employee_id: employeeId,
            },
            attributes: {exclude: ["password",],},
        });
        if (!employee) {
            return res.status(401).json({
                status: "Query fail",
                msg: `Employee with id ${employeeId} doesn't exists`,
            });
        }
        return res.status(200).json(employee);
    }

    //POST /employee/create
    async createAccount(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        const first_name = req.body.firstName;
        const last_name = req.body.lastName;
        const day = req.body.day;
        const month = req.body.month;
        const year = req.body.year;
        const dob = new Date(year, month - 1, day);
        // const branchId = 1;
        const address = req.body.address;
        const phone = req.body.phone;
        const roleId = req.body.roleId;
        console.log(req.body);

        if (await Employee.findOne({
            where: {
                email: email,
            },
        })) {
            return res.status(200).json({
                msg: "Email is already existed!",
            });
        } else if (await Employee.findOne({
            where: {
                phone: phone,
            },
        })) {
            return res.status(200).json({
                msg: "Phone is already existed!",
            });
        } else {
            const hashedPw = await bcrypt.hash(password, bcryptRound);
            if (!hashedPw) {
                throw new Error("Hashed password error");
            }
            const employee = await Employee.create({
                email: email,
                role_id: roleId,
                phone: phone,
                password: hashedPw,
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
                    email: employee.email,
                    phone: employee.phone,
                    fullName: `${employee.first_name} ${employee.last_name}`,
                }
            })
        }
    }

    //POST /login
    async logIn(req, res, next) {
        const employee = await Employee.findOne({
            where: {
                email: req.body.email,
                // email: "duy@gmail.com"
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
