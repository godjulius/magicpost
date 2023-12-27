const Branch = function (sequelize, Sequelize) {
    return sequelize.define("branch", {
        branch_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        manager_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: "employee",
                key: "employee_id",
            },
        },
        hub_id: { // Các điểm giao dịch có cùng điểm tập kết sẽ có hub_id giống nhau, phân biệt bằng is_hub
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: "branch",
                key: "branch_id",
            },
        },
        branch_name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        is_hub: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        sequelize,
        tableName: "branch",
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                using: "BTREE",
                unique: true,
                fields: [
                    {name: "branch_id",},
                ],
            }, {
                name: "branch_hub_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "hub_id",},
                ],
            }, {
                name: "branch_manager_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "manager_id",},
                ],
            },
        ]
    })
}

module.exports = Branch;
