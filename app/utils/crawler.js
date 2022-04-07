/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const axios = require("axios");
const cheerio = require("cheerio");

const crawler = async (target_url, formatFunc) => {
  let result_list = [];
  const res = await axios.get(target_url);
  const html = res.data;
  const $ = cheerio.load(html);
  //   result_list = formatFunc($);
  let tr_list = $(".inner_box").find("tbody tr");
  // 遍历tr
  tr_list.map((i,tr) => {
      // 遍历td
      let row = [];
      let td_list = $(tr).find('td');
      td_list.map((m,td) => {
        // 获取td节点数据
        let data = $(td).text()
        row.push(data)
      })
      result_list.push(row)
  })

  return result_list;
};

module.exports = crawler;
