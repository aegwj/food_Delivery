
// 处理食物相关路由的 Express 路由模块，主要功能是上传食物信息及图片，并保存到数据库中。

import express from "express"; // 导入 Express 框架
import { addFood ,listFood,removeFood} from "../controllers/foodController.js"; // 导入处理食物相关逻辑的控制器函数
import multer from "multer"; // 导入 multer 中间件，用于处理文件上传

const foodRouter = express.Router(); // 创建 Express 路由实例

// 配置 multer 中间件，用于处理文件上传
const storage = multer.diskStorage({
  destination: "uploads", // 指定文件上传后存储的目录
  filename: (req, file, cb) => {
    // 定义文件名规则
    cb(null, `${Date.now()}-${file.originalname}`); // 使用当前时间戳和原始文件名组合作为文件名
  },
});

const upload = multer({ storage: storage }); // 创建 multer 实例并传入配置对象

// 设置食物添加的 POST 路由，使用 multer 处理单个文件上传，并调用 addFood 控制器处理请求
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get('/list', listFood)
foodRouter.post('/remove', removeFood)




export default foodRouter; // 导出 foodRouter，使其在其他模块中可以被引用
