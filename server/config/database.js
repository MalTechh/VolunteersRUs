
import { Sequelize } from 'sequelize';
import config from './config.js';

const { host, username, password, database, port, dialect } = config.db;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: dialect,
    logging: false, // Disable logging; set to true if you want to see SQL queries
});

// Function to test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection(); // Call the function to test the connection

export default sequelize;
