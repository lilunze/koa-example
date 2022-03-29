/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const Koa = require("koa");
const app = new Koa();
const router = require("./routes");
const cors = require("koa2-cors");

// 定义允许跨域的origin
const allowOrigins = [
  "http://localhost:8080"
];

app.use(
  cors({
    origin: (ctx) => {
      if (allowOrigins.includes(ctx.header.origin)) {
        return ctx.header.origin;
      }
      return false;
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    withCredentials: true,
    allowMethods: ["GET", "POST", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

// 注册路由
app.use(router.routes());
// 自动丰富 response 相应头，当未设置响应状态(status)的时候自动设置，在所有路由中间件最后设置(全局，推荐)，也可以设置具体某一个路由（局部），例如：router.get('/index', router.allowedMethods()); 这相当于当访问 /index 时才设置
app.use(router.allowedMethods());

app.listen(4000);
