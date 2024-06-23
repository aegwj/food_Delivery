import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  // 将 success 从字符串转换为布尔值
  const successBool = success === 'true';

  const verifyPayment = async () => {
    try {
      // 将 success 和 orderId 作为请求体发送
      const response = await axios.post(`/api/order/verify`, {
        success: successBool,
        orderId: orderId
      });

      // 根据响应结果进行页面导航
      if(response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      // 错误处理
      console.error("Error during payment verification: ", error);
      navigate("/error"); // 导航到错误页面
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [success, orderId]); // 当 success 或 orderId 改变时重新验证

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
