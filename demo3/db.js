const levelup = require('levelup')
const leveldown = require('leveldown')

// 1) Create our store
const db = levelup(leveldown('./mydb'))
module.exports = db;