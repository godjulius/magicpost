const Parcel = function (sequelize, Sequelize) {
    return sequelize.define("parcel", {
        parcel_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        branch_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "branch",
                key: "branch_id",
            },
        },
        weight: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        details: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: "parcel",
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                using: "BTREE",
                unique: true,
                fields: [
                    {name: "parcel_id",},
                ]
            }, {
                name: "parcel_branch_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "branch_id",},
                ]
            },
        ],
    })
}

module.exports = Parcel;