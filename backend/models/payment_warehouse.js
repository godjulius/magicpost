const PaymentWarehouse = function (sequelize, Sequelize) {
    return sequelize.define("paymentWarehouse", {
        payment_id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "payments",
                key: "payment_id",
            },
        },
        branch_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "branches",
                key: "branch_id",
            },
        },
    }, {
        sequelize,
        tableName: "payment_warehouse",
        indexes: [
            {
                name: "PRIMARY",
                using: "BTREE",
                unique: true,
                fields: [
                    {name: "payment_id",},
                    {name: "branch_id"},
                ],
            },
            {
                name: "payment_warehouse_branch_fk",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "branch_id"},
                ],
            },
        ],
    })
};

module.exports = PaymentWarehouse;