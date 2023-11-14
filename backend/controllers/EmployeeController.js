const {models: {Employee}} = require("../models");
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



}

module.exports = new EmployeeController();
