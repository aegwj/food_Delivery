import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

import 'dotenv/config'

const app = express(); // 创建 express 应用实例
const port = 4000; // 定义服务器监听端口

// 使用中间件
app.use(express.json()); // 解析 JSON 格式的请求体
app.use(cors()); // 启用所有跨域请求

// 连接数据库
connectDB(); // 调用数据库连接函数

// 设置路由
app.use("/api/food", foodRouter); 
app.use("/images", express.static("uploads")); // 设置静态文件路由
app.use("/api/user", userRouter); // 设置静态文件路由
app.use("/api/cart", cartRouter); 
app.use("/api/order", orderRouter); 

// 根路由
app.get("/", (req, res) => {
  res.send("API Working"); // 处理根路径的 GET 请求，并返回 "API Working" 作为响应
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`); // 启动服务器并在控制台输出启动信息
});
