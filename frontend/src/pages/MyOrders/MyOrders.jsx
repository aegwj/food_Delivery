// 显示用户的订单列表

import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css";
import { useContext, useState, useEffect } from "react";
import axios from "axios"; 
import { assets } from "../../assets/assets.js";


const MyOrders = () => {
  // 从 StoreContext 中获取 url 和 token
  const { url, token } = useContext(StoreContext);
  // 定义一个状态变量 data 来存储订单数据
  const [data, setData] = useState([]);
  
  // 定义一个异步函数 fetchOrders 来获取订单数据
  const fetchOrders = async () => {
    // 发送 POST 请求到 /api/order/userorders
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      {
        headers: {
          token,
        },
      }
    );
    // 将响应数据设置为 data 的值
    setData(response.data.data);
  };

  // 使用 useEffect 钩子在组件挂载后和 token 变化时获取订单数据
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // 返回 JSX，显示订单列表
  return <div className="myorders">
    <h2>My Orders</h2>
    <div className="container">
      {/* 遍历 data，为每个订单创建一个元素 */}
      {data.map((order, index) => {
        return (
          <div key={index} className="myorders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>{order.items.map((item, index) => {
              if (index === order.items.length - 1) {
                return item.name + " x " + item.quantity;
              }
              else{
                return item.name + " x " + item.quantity + ", ";
              }
            })}</p>
            <p>${order.amount}.00</p>
            <p>Items:{order.items.length}</p>
            <p><span>~</span> <b>{order.status}</b></p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        )
      })}
    </div>
  </div>;
};

export default MyOrders;
