const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        port: dbConfig.port,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
        define: {
            timestamp: false,
        }
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models = {};

db.models.User = require("./user")(sequelize, Sequelize);
db.models.Transportation = require("./transportation")(sequelize, Sequelize);
db.models.Role = require("./role")(sequelize, Sequelize);
db.models.PaymentWarehouse = require("./payment_warehouse")(sequelize, Sequelize);
db.models.Payment = require("./payment")(sequelize, Sequelize);
db.models.Branch = require("./branch")(sequelize, Sequelize);

db.models.Role.hasMany(db.models.User, {
    foreignKey: "role_id",
});
db.models.User.belongsTo(db.models.Role, {
    foreignKey: "role_id",
});

db.models.User.hasMany(db.models.Payment, {
    foreignKey: "employee_id",
});
db.models.Payment.belongsTo(db.models.User, {
    foreignKey: "employee_id",
});

db.models.Payment.belongsToMany(db.models.Branch, {
    through: db.models.PaymentWarehouse,
    foreignKey: "payment_id",
    otherKey: "branch_id",
})
db.models.Branch.belongsToMany(db.models.Payment, {
    through: db.models.PaymentWarehouse,
    foreignKey: "branch_id",
    otherKey: "payment_id",
});
db.models.Payment.belongsTo(db.models.PaymentWarehouse, {
    foreignKey: "payment_id",
});
db.models.PaymentWarehouse.hasMany(db.models.Payment, {
    foreignKey: "payment_id",
});
db.models.Branch.belongsTo(db.models.PaymentWarehouse, {
    foreignKey: "branch_id",
});
db.models.PaymentWarehouse.hasMany(db.models.Branch, {
    foreignKey: "branch_id",
});

db.models.Payment.belongsTo(db.models.Branch, {
    foreignKey: "source_branch_id",
});
db.models.Branch.hasMany(db.models.Payment, {
    foreignKey: "source_branch_id",
})

db.models.Payment.belongsTo(db.models.Branch, {
    foreignKey: "des_branch_id",
});
db.models.Branch.hasMany(db.models.Payment, {
    foreignKey: "des_branch_id",
});

db.models.Branch.belongsTo(db.models.Branch, {
    foreignKey: "warehouse_id",
});
db.models.Branch.hasMany(db.models.Branch, {
    foreignKey: "warehouse_id",
});

db.models.Branch.belongsTo(db.models.User, {
    foreignKey: "manager_id",
});
db.models.User.hasOne(db.models.Branch, {
    foreignKey: "manager_id",
});

db.models.User.belongsTo(db.models.Branch, {
    foreignKey: "branch_id",
});
db.models.Branch.hasMany(db.models.User, {
    foreignKey: "branch_id",
});

db.models.Transportation.belongsTo(db.models.Branch, {
    foreignKey: "sender_id",
});
db.models.Branch.hasOne(db.models.Transportation, {
    foreignKey: "sender_id",
});

db.models.Transportation.belongsTo(db.models.Branch, {
    foreignKey: "receiver_id",
});
db.models.Branch.hasOne(db.models.Transportation, {
    foreignKey: "receiver_id",
});

db.models.Transportation.belongsTo(db.models.Payment, {
    foreignKey: "payment_id",
});
db.models.Payment.hasOne(db.models.Transportation, {
    foreignKey: "payment_id",
})

module.exports = db;