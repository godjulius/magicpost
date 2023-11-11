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

module.exports = db;