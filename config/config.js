require('dotenv').config()
const fs = require('fs')
module.exports = {
  "production": {
    "username": "binar-psql-db",
    "password": "4GZfP_X1DS00SiOAhRl4Yw",
    "database": "bingle-shop",
    "host": "binar-psql-db-6765.6xw.aws-ap-southeast-1.cockroachlabs.cloud",
    port: "26257",
    "dialect": "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync(__dirname + '/root.crt').toString(),
      }
    }

  },
}
