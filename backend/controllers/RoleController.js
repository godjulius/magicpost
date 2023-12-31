const {models: {Role, Employee}} = require("../models");
const Joi = require("joi");

class RoleController {

    //GET /role
    async getAllRoles(req, res, next) {
        const roles = await Role.findAll();
        return res.status(200).json(roles);
    }

    //GET /role/:roleId
    async getEmployeesByRole(req, res, next) {
        const schema = Joi.object({
            id: Joi.number().min(1).max(6).required(),
        });
        const result = schema.validate({
            id: req.params.roleId,
        });
        if (result.error) {
            return res.status(400).send("Bad request");
        }
        const roleId = req.params.roleId;
        const role = await Role.findOne({
            where: {
                role_id: roleId,
            }
        })
        if (!role) {
            return res.status(404).json({
                msg: `There is no role with id ${roleId}`,
            });
        }
        const employees = await Employee.findAll({
            where: {
                role_id: req.params.roleId,
            },
            include: [
                {
                    model: Role,
                    required: true,
                },
            ],
        });

        return res.status(200).json(employees);
    }

}

module.exports = new RoleController();
