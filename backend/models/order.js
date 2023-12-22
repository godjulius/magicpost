const {flatten} = require("express/lib/utils");
const Order = function (sequelize, Sequelize) {
    return sequelize.define("order", {
        order_id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        customer_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "customer",
                key: "customer_id",
            },
        },
        parcel_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "parcel",
                key: "parcel_id",
            },
        },
        employee_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "employee",
                key: "employee_id",
            },
        },
        status_id: {
            type: Sequelize.TINYINT(1).UNSIGNED,
            allowNull: false,
            defaultValue: 1,
            references: {
                model: "status",
                key: "status_id",
            }
        },
        branch_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "branch",
                key: "branch_id"
            }
        },
        order_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        receiver_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        receiver_phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        receiver_address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "order",
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                using: "BTREE",
                unique: true,
                fields: [
                    {name: "order_id",},
                ],
            }, {
                name: "order_employee_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "employee_id",},
                ],
            }, {
                name: "order_customer_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "customer_id",},
                ],
            }, {
                name: "order_parcel_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "parcel_id",},
                ],
            }, {
                name: "order_status_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "status_id",},
                ],
            }
        ]
    },)
}

module.exports = Order;
