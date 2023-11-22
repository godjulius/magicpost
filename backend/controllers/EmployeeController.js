const {models: {Employee, Branch}} = require("../models");
const bcrypt = require("bcrypt");
const session = require("express-session");
const {Op} = require("sequelize");
const bcryptRound = 10;

class EmployeeController {

    //GET /employee
    async getAllEmployee(req, res, next) {
        if (req.session.role_id === 0) {
            return res.status(200).json(
                await Employee.findAll()
            );
        }
        if (req.session.role_id === 1) {
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
        const employeeId = req.params.id;
        const employee = Employee.findOne({
            where: {
                employee_id: employeeId,
            }
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
        // const email = req.body.email;
        // const password = req.body.password;
        // const first_name = req.body.firstname;
        // const last_name = req.body.lastname;
        // const day = req.body.day;
        // const month = req.body.month;
        // const year = req.body.year;
        // const dob = new Date(year, month - 1, day);
        // const branchId = req.body.branch_id;
        // const address = req.body.address;
        // const phone = req.body.phone;
        // const roleId = req.body.role_id;
        const email = req.body.email;
        const password = req.body.password;
        const first_name = req.body.firstName;
        const last_name = req.body.lastName;
        const day = req.body.day;
        const month = req.body.day;
        const year = req.body.year;
        const dob = new Date(year, month - 1, day);
        const branchId = 1;
        const address = "Vietnam";
        const phone = "03678";
        const roleId = 1;
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
            await Employee.create({
                email: email,
                role_id: roleId,
                phone: phone,
                password: hashedPw,
                first_name: first_name,
                last_name: last_name,
                dob: dob,
                address: address,
            }).then(() => {
                return res.status(200).json({
                    msg: "Create account successfully!",
                })
            })
        }
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

    //GET /employee/manager

}

module.exports = new EmployeeController();
