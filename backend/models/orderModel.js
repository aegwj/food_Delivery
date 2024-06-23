import mongoose from "mongoose";


// 使用 mongoose.Schema 创建一个新的订单模式
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, required: false, default: false },
});

// 创建一个名为'Order'的模型
const orderModel = mongoose.model.order || mongoose.model("Order", orderSchema);

// 导出Order模型
export default orderModel;
