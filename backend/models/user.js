const User = function (sequelize, Sequelize) {
    return sequelize.define("user", {
        user_id: {
            type: Sequelize.MEDIUMINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: "username"
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: "email",
        },
        role_id: {
            type: Sequelize.MEDIUMINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "role",
                key: "role_id",
            }
        }
    }, {
        sequelize,
        tableName: "users",
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {
                        name: "user_id",
                    }
                ]
            }, {
                name: "username",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "username",},
                ],
            }, {
                name: "role_id",
                unique: false,
                using: "BTREE",
                fields: [
                    {name: "role_id",},
                ],
            }, {
                name: "branch_id",
                unique: false,
                using: "BTREE",
                fields: [
                    {name: "branch_id",},
                ],
            },
        ]
    });
};

module.exports = User;