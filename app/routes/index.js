/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const Router = require("koa-router");
const auth = require("../middleware/auth");

const router = new Router();

router.get("/", auth, (ctx) => {
  ctx.body = "首页";
});

router.get("/data", auth, (ctx) => {
  ctx.body = {
      test: '123'
  }
});

module.exports = router;
