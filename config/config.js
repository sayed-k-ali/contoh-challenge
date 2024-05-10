require('dotenv').config()
const fs = require('fs')
module.exports = {
  "development": {
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
  "test": {
    "username": "postgres",
    "password": "SuperAdmin",
    "database": "binar_platinum_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    logging: false,
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
