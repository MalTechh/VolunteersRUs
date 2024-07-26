import dotenv from 'dotenv';
dotenv.config();


console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PORT:', process.env.DB_PORT);

const config = {
    jwtSecret: "your_jwt_secret",
    db: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'root', 
        password: process.env.DB_PASSWORD || '', 
        database: process.env.DB_DATABASE || 'vrus', 
        port: process.env.DB_PORT || 3306, 
        dialect: 'mysql',
    },
  
}


export default config;


