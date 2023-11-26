const ParcelType = function (sequelize, Sequelize) {
    return sequelize.define("parcelType", {
        type_id: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
            primaryKey: true,
        },
        type_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "parcelType",
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                using: "BTREE",
                unique: true,
                fields: [
                    {
                        name: "type_id",
                    },
                ],
            }
        ]
    });
}

module.exports = ParcelType;