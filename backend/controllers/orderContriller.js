// 导入订单模型用于数据库操作
import orderModel from "../models/orderModel.js";
// 导入用户模型用于数据库操作
import userModel from "../models/userModel.js";
// 导入 Stripe 库用于处理支付
import { Stripe } from "stripe";

const stripe = new Stripe(
  "sk_test_51PSrYpRs0hTPNs3ThNmsq7HvvZrGqRXjdT7yw3McMWUE2YYH3LBCvgkGnrZzTAF9HfWUAFDP7hf7UCHZmG3zBTIq00nvWZzRys"
);




// 处理下单逻辑
const placeOrder = async (req, res) => {

  const frontend_url = "https://food-delivery-frontend-mjq5.onrender.com/";

  try {
    // 创建新的订单对象
    const newOrder = new orderModel({
      userId: req.body.userId, // 用户ID
      items: req.body.items, // 订单包含的商品列表
      amount: req.body.amount, // 订单总金额
      address: req.body.address, // 用户的送货地址
      payment: req.body.payment, // 支付方式
    });
    // 保存新订单到数据库
    await newOrder.save();
    // 更新用户模型，清空购物车数据
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // 为每个商品创建 Stripe 商品行项目
    const lineItems = req.body.items.map((item) => ({
      price_data: {
        currency: "inr", // 货币单位为印度卢比
        product_data: {
          name: item.name, // 商品名称
        },
        unit_amount: item.price * 100, // 商品价格转换为分
      },
      quantity: item.quantity, // 商品数量
    }));

    // 添加额外的运费项目
    lineItems.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges", // 运费名称
        },
        unit_amount: 2*100*80
      },
      quantity: 1,
    });

    // 使用 Stripe 创建支付会话
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment", // 支付模式为即时支付
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // 支付成功后的回调URL
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, // 支付后的回调URL
    });

    // 发送响应，包含支付会话的URL
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order: ", error);
    // 打印错误消息，可能包括错误码或错误信息
    res
      .status(500)
      .json({
        success: false,
        message: error.message || "An unknown error occurred",
      });
  }
};

// 验证订单的支付状态
const verifyOrder = async (req, res) => {
  // 从请求的查询参数中获取 orderId 和 success
  const { orderId, success } = req.body;
  
  try {
    // 如果 success 等于 "true"
    if (success == "true") {
      // 使用 Mongoose 的 findByIdAndUpdate 方法更新订单模型
      // 将 payment 字段设置为 true
      await orderModel.findByIdAndUpdate(orderId, { payment: true });

      // 向客户端发送 JSON 响应，表示支付成功
      res.json({ success: true, message: "Payment successful" });
    } else {
      // 如果 success 不等于 "true"
      // 使用 Mongoose 的 findByIdAndDelete 方法删除订单
      await orderModel.findByIdAndDelete(orderId);

      // 向客户端发送 JSON 响应，表示支付失败
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    // 如果在上述过程中发生错误，打印错误并向客户端发送 JSON 响应，表示发生了错误
    console.log(error);
    res.json({ success: false, message: "An error occurred" });
  }
}
// 获取特定用户的所有订单
const userOrders = async (req, res) => {
  try {
      const orders = await orderModel.find({ userId: req.body.userId });
      res.json({ success: true, data:orders });
  }catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occurred" });
  }
  
}
// 获取所有订单
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }

};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
    res.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}

// 导出 placeOrder 函数，以便在其他文件中使用
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
