/*
 * @Author: lilunze
 * @LastEditors: lilunze
 * @desc: csv转json数据
 */
const csv = require("csvtojson");
const getCsvData = async (filePath) => {
  let data = await csv().fromFile(filePath)
  return data;
};
module.exports = getCsvData;
