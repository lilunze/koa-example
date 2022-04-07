/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const SqliteDB = require('../utils/sqlite.js').SqliteDB;

const formatData = (data) => {
    
    let result = data.map(item => [item['日期'],item['开盘'],item['高'],item['低'],item['收盘'], item['涨跌幅'], item['交易量']])
    insertData(result)
}

const insertData = (data) => {
    const sqliteDB = new SqliteDB('db_financial');
    var insertTileSql = 'INSERT INTO stock_000001(date, opening_price, top_price, bottom_price, closing_price, applies, volume) VALUES(?, ?, ?, ?, ?, ?, ?)';
    sqliteDB.insertData(insertTileSql, data);
}

module.exports = formatData;