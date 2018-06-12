const levelup = require('levelup')
const leveldown = require('leveldown')
const path = require('path');
const dbPath = path.join(__dirname, './mydb')
// 1) Create our store
const db = levelup(leveldown(dbPath))
module.exports = db;