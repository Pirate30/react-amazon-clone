import React from "react";
import StarIcon from "@material-ui/icons/Star";
import "./CartItem.css";
import { useStateValue } from "../../StateProvider";

const CartItem = ({ id, title, price, image, rating }) => {
  const [state, dispatch] = useStateValue();

  const removeFromCart = () => {
    console.log("removed from the cart");
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  return (
    <div className="cartItm">
      <div className="cartItm_left">
        <img src={image} alt="" className="cartItm_left_img" />
      </div>
      {/* cart item right */}
      <div className="cartItm_right">
        <h3>{title}</h3>
        <div className="price">
          <small>$</small>
          <strong>{price}</strong>
        </div>
        <div className="rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="ratingIcon" />
            ))}
        </div>
        <button className="cartItm_remove_btn" onClick={removeFromCart}>
          Remove From Cart
        </button>
      </div>
    </div>
  );
};

export default CartItem;
