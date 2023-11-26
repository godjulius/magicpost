const Status=function (sequelize, Sequelize) {
    return sequelize.define("status",{
        status_id:{
            type:Sequelize.TINYINT(1),
            allowNull:false,
            primaryKey:true,
        },
        status_detail:{
            type: Sequelize.STRING,
            allowNull: false,
        },
    },{
        sequelize,
        tableName:"status",
        timestamps:false,
        indexes:[
            {
                name:"PRIMARY",
                using:"BTREE",
                unique:true,
                fields:[
                    {name: "status_id",},
                ],
            },
        ],
    });
}

module.exports = Status;
