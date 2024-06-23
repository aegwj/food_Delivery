import "./List.css"; 
import { useState, useEffect } from "react"; 
import axios from "axios"; 
import { toast } from "react-toastify"; 

const List = ({ url }) => {
  const [list, setList] = useState([]); 
  // 异步函数，用于从服务器获取食物列表
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`); // 发送GET请求
      if (response.data.success) {
        setList(response.data.data); // 如果请求成功，更新list状态
      } else {
        toast.error("Error"); // 如果请求失败，显示错误通知
      }
    } catch (error) {
      toast.error("Error fetching data"); // 捕获并处理请求中的错误
    }
  };

  // 异步函数，用于删除食物
  const removeFood = async (foodid) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodid,
    }); // 发送POST请求删除食物
    await fetchList(); // 重新获取更新后的食物列表
    if (response.data.success) {
      toast.success(response.data.message); // 如果删除成功，显示成功通知
    } else {
      toast.error("Error"); // 如果删除失败，显示错误通知
    }
  };

  // 使用useEffect钩子在组件挂载时获取食物列表
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>ALL Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/` + item.image} alt="" />{" "}
              {/* 显示食物图片 */}
              <p>{item.name}</p> {/* 显示食物名称 */}
              <p>{item.category}</p> {/* 显示食物类别 */}
              <p>${item.price}</p> {/* 显示食物价格 */}
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>{" "}
              {/* 显示删除按钮 */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List; // 导出List组件
