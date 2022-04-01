/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
/**
 * File: sqlite.js.
 * Author: lilz.
 * Email: lilunze@hotmail.com.
 * Datetime: 2021/05/15.
 */

 const fs = require('fs');
 const sqlite3 = require('sqlite3').verbose();
 
 var DB = DB || {};
 
 DB.SqliteDB = function (db_name) {
     debugger
     DB.db = new sqlite3.Database(`../dbs/${db_name}.db`);
 
     DB.exist = fs.existsSync(`../dbs/${db_name}.db`);
     if (!DB.exist) {
         console.log("创建数据库文件");
         fs.openSync(`../dbs/${db_name}.db`, 'w');
     };
 };
 
 DB.printErrorInfo = function (err) {
     console.log("Error Message:" + err.message + " ErrorNumber:" + errno);
 };
 
 DB.SqliteDB.prototype.createTable = function (sql) {
     DB.db.serialize(function () {
         DB.db.run(sql, function (err) {
             if (null != err) {
                 DB.printErrorInfo(err);
                 return;
             }
         });
     });
 };
 
 /// tilesData format; [[level, column, row, content], [level, column, row, content]]
 DB.SqliteDB.prototype.insertData = function (sql, objects) {
     DB.db.serialize(function () {
         var stmt = DB.db.prepare(sql);
         for (var i = 0; i < objects.length; ++i) {
             stmt.run(objects[i]);
         }
 
         stmt.finalize();
     });
 };
 
 DB.SqliteDB.prototype.queryData = function (sql, callback) {
     DB.db.all(sql, function (err, rows) {
         if (null != err) {
             DB.printErrorInfo(err);
             return;
         }
 
         /// deal query data.
         if (callback) {
             callback(rows);
         }
     });
 };
 
 DB.SqliteDB.prototype.executeSql = function (sql) {
     DB.db.run(sql, function (err) {
         if (null != err) {
             DB.printErrorInfo(err);
         }
     });
 };
 
 DB.SqliteDB.prototype.close = function () {
     DB.db.close();
 };
 
 /// export SqliteDB
 exports.SqliteDB = DB.SqliteDB;