/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */

 const fs = require('fs');
 const sqlite3 = require('sqlite3').verbose();
 
 var DB = DB || {};
 
 DB.SqliteDB = function (db_name) {
     DB.exist = fs.existsSync(`app/dbs/${db_name}.db`);
     if (!DB.exist) {
         console.log("创建数据库文件");
         fs.openSync(`app/dbs/${db_name}.db`, 'w');
     };
     DB.db = new sqlite3.Database(`app/dbs/${db_name}.db`);
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