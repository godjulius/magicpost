const {models: {User}} = require("../models");

class UsersController {
    async getAllUser(req, res, next) {
        return res.status(200).json(await User.findAll({
                attributes: ["user_id", "first_name", "second_name",
                    "dob", "email", "password", "email", "role_id"],
            }
        ));
    }

    async logIn(req, res, next) {
        const user = await User.findOne({
            where: {email: req.body.email},
        });

        if (!user) {
            return res.status(200).json({msg: "Invalid email"});
        } else {
            const checkPassword = (req.body.password === user.password);
            if (!checkPassword) {
                return res.status(200).json({msg: "Invalid password"},);
            } else {
                req.session.isLogin = true;
                req.session.userId = user.user_id;
                return res.status(200).json({
                    msg: "Successfully login",
                    id: user.user_id,
                    email: user.email,
                    firstname: user.first_name,
                    lastname: user.second_name,
                    dob: user.dob,
                    role: user.role_id,
                    cookie: req.headers.cookie,
                });
            }
        }
    }

    async createUser(req, res, next) {
        // const email = req.body.email;
        // const password = req.body.password;
        // const firstname = req.body.firstname;
        // const lastname = req.body.lastname;
        // const dob = req.body.dob;
        // const role = req.body.role;
        const email = "admin@gmail.com";
        const password = "123456";
        const firstname = "admin";
        const lastname = "admin";
        const dob = new Date("1990-01-01");
        const role = 1;

        try {
            if (await User.findOne({where: {email: email,},})) {
                return res.status(200).json({
                    msg: "Email is already existed",
                });
            }
            await User.create({
                email: email,
                password: password,
                first_name: firstname,
                second_name: lastname,
                dob: dob,
                role_id: role,
            }).then(() => {
                return res.status(201).json({msg: "Create user account successfully!",});
            }).catch((err) => {
                console.log(err);
            })
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new UsersController();