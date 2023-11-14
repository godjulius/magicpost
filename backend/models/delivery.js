const Delivery = function (sequelize, Sequelize) {
    return sequelize.define("delivery", {
        delivery_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        sender_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "branch",
                key: "branch_id",
            },
        },
        receiver_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "branch",
                key: "branch_id",
            },
        },
        send_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        receive_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false, // 0: pending, 1: delivering, 2: delivered
        },
    }, {
        sequelize,
        tableName: "delivery",
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                using: "BTREE",
                unique: true,
                fields: [
                    {name: "delivery_id",},
                ]
            }, {
                name: "delivery_receiver_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "receiver_id",},
                ],
            }, {
                name: "delivery_sender_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "sender_id",},
                ],
            }
        ]
    })
}

module.exports = Delivery;
