require('dotenv').config()
// const http = require('node:http')

const app = require('./app')
// const logger = require('./libs/logger')

// const server = http.createServer(app)

// const port = process.env.PORT || 3000;

// server.listen(port, () => logger.info(null, "server listen on port %d", port))

// console.log("Not run")

// process.on('SIGINT', () => {
//     server.close((err) => {
//         if (err) {
//             logger.error(err)
//             process.exit(1)
//         }

//         logger.info("Server gracefully shutdown")
//         process.exit(0)
//     })
// })


const express = require('express');
const server = express();

server.use(app)

const listener = server.listen(3000, () => console.log("Server run on port 3000"))

process.on('SIGINT', () => {
    listener.close((err) => {
        if (err) {
            logger.error(err)
            process.exit(1)
        }

        logger.info("Server gracefully shutdown")
        process.exit(0)
    })
})