const pino = require('pino').default;

const logger = pino({}) // mau di config buat lempar log ke file, tapi untuk saat ini bisa di abaikan

module.exports = logger