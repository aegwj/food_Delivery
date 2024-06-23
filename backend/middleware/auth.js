// 引入 jwt 库
import jwt from "jsonwebtoken";

// 定义一个异步的认证中间件函数
const authMiddleware = async (req, res, next) => {
  // 从请求头中获取 token
  const { token } = req.headers;

  // 如果没有 token，返回错误信息
  if (!token) {
    return res.json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    // 使用 jwt.verify 方法验证 token
    // 这个方法会解码 token，并使用你提供的密钥（JWT_SECRET）进行验证
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // 将解码后的用户 ID 添加到请求体中
    req.body.userId = token_decode.id;

    // 调用 next 函数，继续执行后续的中间件或路由处理函数
    next();
  } catch (error) {
    // 如果验证过程中出现错误（例如，token 无效或过期），则捕获错误并返回错误信息
    console.log(error);
    res.json({
      success: false,
      message: "Invalid token",
    });
  }
};

// 导出 authMiddleware 函数
export default authMiddleware;
