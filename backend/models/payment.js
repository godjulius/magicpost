const Payment = function (sequelize, Sequelize) {
    return sequelize.define("payment", {
        payment_id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        employee_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id",
            },
        },
        source_branch_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "branches",
                key: "branch_id",
            },
        },
        des_branch_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "branches",
                key: "branch_id",
            },
        },
        details: {
            type: Sequelize.STRING,
            allow: false,
        },
        price: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "payments",
        indexes: [
            {
                name: "PRIMARY",
                using: "BTREE",
                unique: true,
                fields: [
                    {name: "payment_id",},
                ],
            }, {
                name: "payments_employee_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "employee_id",},
                ],
            }, {
                name: "payments_des_branch_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "des_branch_id",},
                ],
            }, {
                name: "payments_source_branch_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "source_branch_id",},
                ],
            },
        ],
    })
};

module.exports = Payment;