import React from "react";
import "./Header.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebaseConfig";

const Header = () => {
  const [{ cart, user }, dispatch] = useStateValue();

  // logging out
  const userAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header_search">
        <input type="text" className="header_search_input" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link to={!user && "/login"}>
          <div onClick={userAuthentication} className="header_itm">
            <span className="header_itm_top">hello</span>
            <span className="header_itm_bottom">
              {/* Sign In */}
              {user ? `sign-out` : `sign-in`}
            </span>
          </div>
        </Link>
        <Link to="/yourorders">
          <div className="header_itm">
            <span className="header_itm_top">returns</span>
            <span className="header_itm_bottom">& orders</span>
          </div>
        </Link>
        <div className="header_itm">
          <span className="header_itm_top">account</span>
          <span className="header_itm_bottom">& lists</span>
        </div>
        <Link to="/checkout">
          <div className="header_cart">
            <ShoppingCartOutlinedIcon className="header_cartIcon" />
            <span className="header_Cart_count">
              {cart.length}
              {/* {cart?.length} */}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
