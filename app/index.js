/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const Koa = require("koa");
const app = new Koa();
const router = require("./routes");
const koaBody = require('koa-body');
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

app.use(koaBody());
// 注册路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000);
