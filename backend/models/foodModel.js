// 定义和导出一个食物（food）模型（Model）
import mongoose from "mongoose";

// 定义 food 模式
const foodSchema = new mongoose.Schema({
  // 定义文档的字段和类型，以及是否必填

  name: { type: String, required: true }, // 必填的菜品名称
  description: { type: String, required: true }, // 必填的菜品描述
  price: { type: Number, required: true }, // 必填的菜品价格
  image: { type: String, required: true }, // 必填的菜品图片链接
  category: { type: String, required: true }, // 必填的菜品分类
});

// 创建或获取 food 模型
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

// 导出 food 模型
export default foodModel;
