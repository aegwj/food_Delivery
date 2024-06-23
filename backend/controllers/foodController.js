// 用于处理食物添加的请求;

import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  try {
    // 检查是否有文件上传
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }

    // 从 req.file 中获取文件名
    const image_filename = req.file.filename;

    // 创建新的食物对象
    const newFood = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    // 保存食物对象到数据库
    await newFood.save();

    // 返回成功响应
    res.json({ success: true, message: "Food added successfully" });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Failed to add food." });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
   }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to list foods." });
  }
}

const removeFood = async (req, res) => {
  try {
    
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`./uploads/${food.image}`, (err) => { })
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food deleted successfully" });
 
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to delete food." });
  }
}

export { addFood ,listFood,removeFood};
