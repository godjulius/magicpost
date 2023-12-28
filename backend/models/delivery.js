const Delivery = function (sequelize, Sequelize) {
    return sequelize.define("delivery", {
        delivery_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: "order",
                key: "order_id",
            }
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
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        receive_date: {
            type: Sequelize.DATEONLY,
            allowNull: true,
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
            },{
            name:"delivery_order_id_foreign",
                using:"BTREE",
                unique:false,
                fields:[
                    {name: "order_id"},
                ]
            }
        ],
    });
}

module.exports = Delivery;
