// 处理用户的订单提交
import "./PlaceOrder.css";
import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 定义 PlaceOrder 组件
const PlaceOrder = () => {
  // 使用 useContext 钩子获取上下文中的值
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  // 使用 useState 钩子初始化数据状态
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // 定义 onChangeHandler 函数，用于处理输入框的值变化
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // 定义 placeOrder 函数，用于处理订单提交
  const placeOrder = async (e) => {
    // 阻止表单的默认提交行为
    e.preventDefault();

    // 初始化一个空数组来存储订单项
    let orderItems = [];

    // 遍历购物车中的商品，生成订单项
    food_list.map((item) => {
      // 如果购物车中有该商品
      if (cartItems[item._id] > 0) {
        // 创建一个新的商品信息对象
        let itemInfo = item;
        // 添加商品的数量信息
        itemInfo["quantity"] = cartItems[item._id];
        // 将商品信息添加到订单项数组中
        orderItems.push(itemInfo);
      }
    });

    // 定义订单数据
    let orderData = {
      address: data, // 用户的送货地址
      items: orderItems, // 订单项数组
      amount: getTotalCartAmount() + 2, // 订单总金额（包括运费）
    };

    try {
      // 发送 POST 请求，提交订单
      let response = await axios.post(
        url+"/api/order/place",
        orderData,
        { headers: { token } } // 在请求头中添加 token
      );

      // 根据响应结果处理
      if (response.data.success) {
        // 如果订单提交成功，获取支付会话的 URL
        const { session_url } = response.data;
        // 重定向到支付页面
        window.location.replace(session_url);
      } else {
        // 如果订单提交失败，显示错误消息
        alert("Error: " + response.data.message);
      }
    } catch (error) {
      // 如果在提交订单过程中发生错误，打印错误信息
      console.error("Error placing order: ", error);
      // 打印错误的堆栈跟踪
      console.error("Stack trace: ", error.stack);
    }
  };


  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      // 如果 token 不存在，则跳转到
      navigate("/cart");
      
    }
    else if (getTotalCartAmount() === 0) {
      // 如果购物车为空，则跳转到
      navigate("/cart");
    }
  }, [token]);
 
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="city"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            placeholder="zipcode"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
