/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
// 定义中间件
const auth = async (ctx, next) => {
  if (ctx.url !== "/login") {
    const token = ctx.request.header.authorization;
    if(token){
      // 存在token,则校验token
      await next();
    }else{
      // 不存在token
      ctx.body = {
        code: 500,
        message: "请求未授权，检查请求头部是否包含token信息!"
      }
    }
    console.log(ctx)
  }else{
    await next();
  }
};

module.exports = auth;