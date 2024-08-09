const { Sequelize } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
require("dotenv").config();

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], {
        dialectOptions: {
            timezone: 'local', // Aquí establece tu zona horaria local
        }
    });
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
        {   database: config.database,
            dialectOptions: {
                timezone: 'local', // Aquí establece tu zona horaria local
            }
        }
    );
}

module.exports = sequelize;