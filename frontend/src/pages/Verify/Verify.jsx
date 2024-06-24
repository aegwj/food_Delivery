import './Verify.css';
import { useContext, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';

// 定义 Verify 组件
const Verify = () => {

  // 使用 React Hook 获取 URL 参数和导航函数
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);  // 从 StoreContext 中获取 url
  const navigate = useNavigate();  // 获取导航函数
  
  // 定义一个异步函数 verifyPayment，用于验证支付
  const verifyPayment = async (success, orderId) => {
    const response = await axios.post(https://food-delivery-frontend-mjq5.onrender.com/api/order/verify",
      { success, orderId }
    );  // 发送 POST 请求到 /api/order/verify
    if(response.data.success) {
      navigate("/myorders");  // 如果验证成功，导航到 '/myorders'
    }
    else {
      navigate("/");  // 如果验证失败，导航到首页
     
    }
  }

  // 使用 useEffect Hook，在组件挂载后立即调用 verifyPayment 函数
  useEffect(() => {
    verifyPayment();
  },[])

  // 返回 JSX
  return (
    <div className="verify">
      <div className="spinner">

      </div>
    </div>
  );
};

export default Verify; 
