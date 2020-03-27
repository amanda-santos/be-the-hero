// importando crypto para gerar um id string aleatório da ong
const crypto = require('crypto');

module.exports = function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX');
}