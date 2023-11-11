const {models: {User}} = require("../models");

class UsersController {
    async getAllUser(req, res, next) {
        return res.status(200).json(await User.findAll({
                attributes: ["user_id", "username", "password", "email", "role_id"],
            }
        ));
    }
}

module.exports = new UsersController();