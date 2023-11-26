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
            allowNull: true,
            references: {
                model: "branch",
                key: "branch_id",
            },
        },
        receiver_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: "branch",
                key: "branch_id",
            },
        },
        send_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        receive_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        status_id: {
            type: Sequelize.TINYINT(1),
            allowNull: false, // 1: pending, 2: delivering, 3: delivered, 4: return
            defaultValue: 1,
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
            }, {
                name: "delivery_status_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "status_id",},
                ],
            },
        ],
    });
}

module.exports = Delivery;
