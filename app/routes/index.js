/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const Router = require("koa-router");
const auth = require("../middleware/auth");
const test = require('../controller/test')

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

// router.get('/test',(ctx) => {
  
// })

module.exports = router;
