/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const SqliteDB = require('../utils/sqlite.js').SqliteDB;

const sqliteDB = new SqliteDB('db_test1');

const test = (data) => {
    var insertTileSql = "insert into user(nick_name, password, user_id) values(?, ?, ?)";
    sqliteDB.insertData(insertTileSql, data);
}

module.exports = test;

