const {Pool} = require('pg');
const {db} = require('./config')

const pool = new Pool({
    user:db.user,
    password:db.password,
    host:db.host,
    port:db.port,
    database:db.database,
})

module.exports = pool;

// const { Sequelize } = require('sequelize');
// const { db } = require('./config');

// const pool = new Sequelize(db.database, db.user, db.password, {
//     host: db.host,
//     port: db.port,
//     dialect: 'postgres',
//     dialectOptions: {
//         charset: 'utf8',
//         collate: 'utf8_general_ci',
//     },
// });


// module.exports = pool;
