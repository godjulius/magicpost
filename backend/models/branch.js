const Branch = function (sequelize, Sequelize) {
    return sequelize.define("branch", {
        branch_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        branch_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        manager_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id",
            }
        },
        location:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        warehouse_id:{
            type:Sequelize.BIGINT.UNSIGNED,
            allowNull:true,
            references: {
                model:"branches",
                key:"branch_id",
            }
        },
        branch_type:{
            type: Sequelize.BOOLEAN,
            allowNull:false,
        }
    }, {
        sequelize,
        indexes: [
            {
                name: "PRIMARY",
                using: "BTREE",
                unique: true,
                fields: [
                    {name: "branch_id",},
                ]
            }, {
                name: "branches_warehouse_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "warehouse_id",},
                ]
            }, {
                name: "branches_manager_id_foreign",
                using: "BTREE",
                unique: false,
                fields: [
                    {name: "manager_id",},
                ]
            },
        ]
    })
};

module.exports = Branch;