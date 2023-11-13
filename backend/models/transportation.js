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
            allowNull: false,
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        payments: {
            type: Sequelize.JSON,
            allowNull: false,
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
            },
        ],
    })
};

module.exports = Transportation;