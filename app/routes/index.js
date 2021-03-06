/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const Router = require("koa-router");
const auth = require("../middleware/auth");
const test = require('../controller/test');
const crypto = require('crypto');
const crawler = require('../utils/crawler');
const getCsvData = require('../utils/csvtojson');
const formatData = require('../controller/stockDataController');

const router = new Router();

router.get("/", auth, (ctx) => {
  ctx.body = "首页";
});

router.get("/data/:id/:age", auth, (ctx) => {
  console.log(ctx.params)
  ctx.body = {
      test: '123'
  }
});

router.post("/login", (ctx) => {
  // console.log(ctx.request.body)
  ctx.body= {
    code: 200,
    message: '请求成功！'
  }
})

router.get('/test',async (ctx) => {
  let data = await getCsvData('./app/temp/test.csv')
  formatData(data);
  ctx.body= {
    code: 200,
    data: data,
    message: '请求成功！'
  }
  
})

module.exports = router;
