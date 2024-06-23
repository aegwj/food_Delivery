import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Add.css"; 
import axios from "axios"; 

const Add = ({ url }) => {
  const [image, setImage] = useState(false); // 用于存储上传的图片状态
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  }); // 用于存储表单数据的状态

  // 处理表单输入变化的函数
  const onChangeHandler = (e) => {
    const name = e.target.name; // 获取输入框的 name 属性值
    const value = e.target.value; // 获取输入框的值
    setData((prevData) => ({ ...prevData, [name]: value })); // 更新对应字段的数据状态
  };

  // 处理表单提交的函数
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // 阻止表单默认提交行为

    const formData = new FormData(); // 创建一个 FormData 对象来存储表单数据
    formData.append("name", data.name); // 添加产品名称到 FormData
    formData.append("description", data.description); // 添加产品描述到 FormData
    formData.append("price", Number(data.price)); // 添加产品价格到 FormData，并转换为数字类型
    formData.append("category", data.category); // 添加产品类别到 FormData
    formData.append("image", image); // 添加图片文件到 FormData

    try {
      const response = await axios.post(`${url}/api/food/add`, formData); // 发送 POST 请求到后端 API

      if (response.data.success) {
        // 如果添加成功，则重置表单数据和图片状态
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false); // 清空图片状态
        alert(response.data.message); // 成功提示，可以替换为 toast 或其它通知方式
      } else {
        // 如果添加失败，显示错误信息
        alert(response.data.message); // 失败提示，可以替换为 toast 或其它通知方式
      }
    } catch (error) {
      console.error("Error adding product:", error); // 捕获和打印错误信息
      alert("Failed to add product. Please try again."); // 失败提示，可以替换为 toast 或其它通知方式
    }
  };

  // 渲染组件的 JSX
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        {/* 图片上传区域 */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p> {/* 上传图片标题 */}
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area} // 根据是否有上传的图片来显示预览或默认图片
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])} // 当选择文件时更新图片状态
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* 产品名称输入区域 */}
        <div className="add-name flex-col">
          <p>Product name</p> {/* 产品名称标题 */}
          <input
            onChange={onChangeHandler} // 当输入框变化时调用 onChangeHandler 函数更新数据状态
            value={data.name} // 输入框的值绑定到数据状态
            type="text"
            name="name"
            placeholder="Enter product name"
          />
        </div>

        {/* 产品描述输入区域 */}
        <div className="add-product-description flex-col">
          <p>Product description</p> {/* 产品描述标题 */}
          <textarea
            onChange={onChangeHandler} // 当文本框变化时调用 onChangeHandler 函数更新数据状态
            value={data.description} // 文本框的值绑定到数据状态
            name="description"
            rows="6"
            placeholder="Enter product description"
          />
        </div>

        {/* 产品类别和价格输入区域 */}
        <div className="add-category-price">
          {/* 产品类别选择 */}
          <div className="add-category flex-col">
            <p>Product Category</p> {/* 产品类别标题 */}
            <select onChange={onChangeHandler} name="category" id="category">
              {/* 不同的产品类别选项 */}
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* 产品价格输入 */}
          <div className="add-price flex-col">
            <p>Product price</p> {/* 产品价格标题 */}
            <input
              onChange={onChangeHandler} // 当输入框变化时调用 onChangeHandler 函数更新数据状态
              value={data.price} // 输入框的值绑定到数据状态
              type="number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>

        {/* 提交按钮 */}
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add; // 导出 Add 组件
