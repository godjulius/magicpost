const Transportation = function (sequelize, Sequelize) {
    return sequelize.define("transportation", {
        trans_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        sender_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "branches",
                key: "branch_id",
            },
        },
        receiver_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "branches",
                key: "branch_id",
            },
        },
        send_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        receive_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        payment_id: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: "payments",
                key: "payment_id",
            },
        },
    }, {
        sequelize,
        tableName: "transportations",
        indexes: [
            {
                name: "PRIMARY",
                using: "BTREE",
                unique: true,
                fields: [
                    {name: "trans_id",},
                ],
            }, {
                name: "transportations_receiver_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "receiver_id",},
                ],
            }, {
                name: "transportations_sender_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "sender_id",},
                ],
            }, {
                name: "transportations_payment_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "payment_id",},
                ],
            },
        ],
    })
};

module.exports = Transportation;