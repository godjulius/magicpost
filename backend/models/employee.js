const Employee = function (sequelize, Sequelize) {
    return sequelize.define("employee", {
        employee_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "role",
                key: "role_id",
            },
        },
        branch_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "branch",
                key: "branch_id",
            },
        },
        phone: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        dob: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: "employee",
        timestamps:false,
        indexes: [
            {
                name: "PRIMARY",
                using: "BTREE",
                unique: true,
                fields: [
                    {name: "employee_id",},
                ],
            }, {
                name: "employee_email_unique",
                using: "BTREE",
                unique: true,
                fields: [
                    {name: "email",},
                ],
            }, {
                name: "employee_phone_unique",
                using: "BTREE",
                unique: true,
                fields: [
                    {name: "phone",},
                ],
            }, {
                name: "employee_branch_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "branch_id",},
                ],
            }, {
                name: "employee_role_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "role_id",},
                ],
            },
        ],
    })
}

module.exports = Employee;
