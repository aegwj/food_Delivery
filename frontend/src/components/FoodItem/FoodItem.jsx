
import './FoodItem.css';
import { assets } from '../../assets/assets'
import { useContext } from 'react';
import {StoreContext} from '../../context/StoreContext'


// 定义 FoodItem 组件，它接收包含id、name、price等的props
const FoodItem = ({ id, name, price, description, image }) => {
  // 使用useContext钩子从StoreContext获取cartItems、addToCart和removeFromCart
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  // 返回JSX元素，用于渲染食品项目
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* 渲染食品图片 */}
        <img className="food-item-image" src={url + "/images/" + image} alt="" />

        {/* 判断cartItems中是否包含当前食品的id */}
        {!cartItems[id] ? (
          // 如果不包含，渲染添加到购物车的图标
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          // 如果包含，渲染购物车计数器容器 */
          <div className="food-item-counter">
            {/* 渲染从购物车中移除的图标 */}
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            {/* 渲染再次添加到购物车的图标 */}
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          {/* 渲染食品名称 */}
          <p>{name}</p>
          {/* 渲染评分星星图标 */}
          <img src={assets.rating_starts} alt="" />
        </div>
      </div>

      {/* 渲染食品描述 */}
      <p className="food-irem-desc">{description}</p>

      {/* 渲染食品价格 */}
      <p className="food-item-price">${price}</p>
    </div>
  );
};

export default FoodItem;
