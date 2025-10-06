// Don't run directly run 
//                Use
// PS C:\Users\souha\OneDrive\Desktop\CodeSpark\server> node postgresql/index.js
require('dotenv').config();
const {Sequelize} =require('sequelize')

// const sequelize = new Sequelize('db_name', 'db_user', 'password', {
//   host: 'localhost',
//   dialect: 'postgres', // could be also : mysql, mariadb, sqlite, or mssql as needed
// });

const pgconnection= new Sequelize(
    process.env.db_name,
    process.env.db_user,
    process.env.db_password,
    
    {
    host:   process.env.db_host,
    port:   process.env.db_port,
    dialect:process.env.db_dialect
})

module.exports=pgconnection