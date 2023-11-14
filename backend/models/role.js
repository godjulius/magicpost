const Role = function (sequelize, Sequelize) {
    return sequelize.define("role", {
        role_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        role_name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: "role",
        timestamps:false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    {name: "role_id",},
                ]
            },
        ]
    })
};

module.exports = Role;