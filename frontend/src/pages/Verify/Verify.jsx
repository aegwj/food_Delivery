import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const Verify = () => {
  // 使用 useSearchParams 获取查询参数
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate(); // 使用 React Router 的 useNavigate 钩子进行页面导航

  // 定义一个异步函数 verifyPayment 用于验证支付
  const verifyPayment = async () => {
    try {
      // 发送 POST 请求到后端的 /api/order/verify 路由
      const response = await axios.post(`${url}/api/order/verify`, {
        success: success === 'true', // 确保 success 是一个布尔值
        orderId: orderId
      });

      // 根据响应结果进行页面导航
      if (response.data.success) {
        navigate("/myorders"); // 如果支付成功，导航到 "/myorders"
      } else {
        navigate("/"); // 如果支付失败，导航到首页
      }
    } catch (error) {
      // 错误处理，例如导航到错误页面
      console.error("Error during payment verification: ", error);
      navigate("/error"); // 假设有一个错误处理页面
    }
  };

  // 使用 useEffect 钩子在组件挂载后调用 verifyPayment 函数
  useEffect(() => {
    verifyPayment();
  }, [success, orderId]); // 依赖数组中的参数变化时重新调用 verifyPayment

  // 组件的 JSX 返回
  return (
    <div className="verify">
      <div className="spinner"></div> {/* 加载指示器 */}
    </div>
  );
};

export default Verify;
