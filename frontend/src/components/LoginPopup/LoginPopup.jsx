// 导入所需的模块和资源
import { assets } from "../../assets/assets";
import "./LoginPopup.css";
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

// 定义 LoginPopup 组件，它接收一个用于控制弹出层显示的 setShowLogin 函数
const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  // 使用 useState 钩子初始化 currState 状态为 "Login"
  const [currState, setCurrState] = useState("Login");
  // 使用 useState 钩子初始化表单数据 state
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 定义表单输入变化处理函数
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // 使用展开运算符更新 state
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl = `${url}/api/user/login`;
    } else {
      newUrl = `${url}/api/user/register`;
    }
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert("Error:", response.data.message);
    }
  };

  // 定义表单提交处理函数
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Login") {
      // 登录逻辑
      console.log("Logging in with:", data);
      // 在这里添加实际的登录逻辑，如 API 调用
    } else {
      // 注册逻辑
      console.log("Signing up with:", data);
      // 在这里添加实际的注册逻辑，如 API 调用
    }
  };

  return (
    <div className="login-popup">
      {/* 弹出层的表单容器 */}
      <form onSubmit={onLogin} className="login-popup-container">
        {/* 弹出层标题，显示当前状态并提供关闭图标 */}
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)} // 点击关闭图标时调用 setShowLogin 函数
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        {/* 根据 currState 渲染不同的输入字段 */}
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          {/* 电子邮箱和密码输入字段始终显示 */}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        {/* 根据 currState 切换按钮文本 */}
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {/* 服务条款和隐私政策的复选框 */}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, you agree to the terms of use & privacy policy.</p>
        </div>
        {/* 根据 currState 切换注册和登录的链接文本 */}
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

// 导出组件
export default LoginPopup;
