const User = function (sequelize, Sequelize) {
    return sequelize.define("user", {
        user_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        second_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "roles",
                key: "role_id",
            }
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: false,
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
            },
            {
                name: "users_role_id_foreign",
                unique: true,
                using: "BTREE",
                fields: [
                    {
                        name: "role_id",
                    }
                ]
            },
            {
                name: "users_branch_id_foreign",
                unique: true,
                using: "BTREE",
                fields: [
                    {
                        name: "branch_id",
                    }
                ]
            }
        ]
    });
};

module.exports = User;