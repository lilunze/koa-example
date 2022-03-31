/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, EXPIRED } = require("../config/config");

class Jwt {
  // 生成token
  static generateToken(payload) {
    const token = jwt.sign(payload, PRIVATE_KEY, EXPIRED);
    return token;
  }

  // 验证token
  static verifyToken(token) {
    try {
      let tokenInfo = jwt.verify(token, PRIVATE_KEY, { algorithms: ["HS256"] });
      return {
          code: 200,
          message: '权限验证通过！'
      };
    } catch (err) {
      return {
          code: 401,
          message: '权限验证不通过！'
      };
    }
  }
}

module.exports = Jwt;
