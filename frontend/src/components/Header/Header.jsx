
import './Header.css';
import { useContext, useState, useEffect } from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Explore a variety of delicious dishes from our menu, carefully crafted
          to satisfy your cravings. Enjoy fast delivery and exceptional service.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
