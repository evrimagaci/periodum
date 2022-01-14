// eslint-disable-next-line node/no-path-concat
require('dotenv').config({ path: __dirname + '/../.env' })
const { Sequelize } = require('sequelize')

const connection = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  pool: {
    max: parseInt(process.env.MAX_POOL_SIZE),
    min: parseInt(process.env.MIN_POOL_SIZE),
    idle: 60000,
    acquire: 120000,
  },
  define: {
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_unicode_ci',
    },
  },
  logging: process.env.NODE_ENV !== 'production',
  // logging: false
})

module.exports = connection
