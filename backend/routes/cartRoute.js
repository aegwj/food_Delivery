import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

// 創建一個新的 express 路由器
const cartRouter = express.Router();

// 添加商品到購物車的路由
cartRouter.post("/add", authMiddleware, addToCart);
// 從購物車中移除商品的路由
cartRouter.post("/remove", authMiddleware, removeFromCart);
// 獲取購物車數據的路由
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
