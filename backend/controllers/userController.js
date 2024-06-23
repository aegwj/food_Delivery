import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


const loginUser = async (req, res) => {
  const { email, password } = req.body; 
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success:false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success:false, message: "Invalid credentials" });
    }
    
    const token = createToken(user._id); 
    res.json({ success:true, token });

  } catch (error) {
    console.log(error);
    res.josn({ success:false, message: "Server error"})
  }
}

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET,)
}

const registerUser = async (req, res) => {
  // 解构请求体中的 name, password, email
  const { name, password, email } = req.body;
  try {
    // 检查数据库中是否已存在该邮箱的用户
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" }); // 如果存在，返回错误信息
    }

    // 使用 validator 库检查邮箱格式是否正确
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" }); // 如果邮箱格式不正确，返回错误信息
    }

    // 检查密码长度是否至少为8个字符
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      }); // 如果密码长度不够，返回错误信息
    }

    // 生成盐并用 bcrypt 哈希密码
    const salt = await bcrypt.genSalt(10); // 注意这里的 genSalt 函数名是正确的
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建新用户实例
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // 保存用户到数据库
    const user = await newUser.save();

    // 生成 JWT 令牌
    const token = createToken(user._id);

    // 返回成功信息和令牌
    res.json({ success: true, token });
  } catch (error) {
    // 记录错误详情
    console.log(error);
    // 返回通用错误信息
    res.json({ success: false, message: "Something went wrong" });
  }
};

export { loginUser, registerUser };