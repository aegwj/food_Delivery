import userModel from "../models/userModel.js";

// 添加商品到購物車
const addToCart = async (req, res) => {
  try {
    // 查找用戶數據
    let userData = await userModel.findById(req.body.userId);
    // 獲取用戶的購物車數據
    let cartData = await userData.cartData;
    // 如果購物車中沒有該商品，則添加該商品並設置數量為1
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      // 如果購物車中已有該商品，則增加其數量
      cartData[req.body.itemId] += 1;
    }
    // 更新用戶的購物車數據
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    // 返回成功消息
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    // 處理錯誤並返回失敗消息
    console.log(error);
    res.json({ success: false, message: "Could not add to cart" });
  }
};

// 從購物車中移除商品
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Item removed from cart" });
    } else {
      res.json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Could not remove from cart" });
  }
};



//获取购物车数据
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Could not get cart data" });
  }
};

// 導出函數以在其他文件中使用
export { addToCart, removeFromCart, getCart };
