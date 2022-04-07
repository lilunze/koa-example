/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const SqliteDB = require('../utils/sqlite.js').SqliteDB;

const sqliteDB = new SqliteDB('db_test');

const test = (data) => {
    var insertTileSql = "INSERT INTO stock_000001(date, opening_price, top_price, bottom_price, closing_price, change_amount, applies, volume, trading_volume) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    sqliteDB.insertData(insertTileSql, data);
}

module.exports = test;

