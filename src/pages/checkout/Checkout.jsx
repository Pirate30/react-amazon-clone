import React from "react";
import Subtotal from "../../components/subtotal/Subtotal";
import { useStateValue } from "../../StateProvider";
import "./Checkout.css";
import CartItem from "../../components/cartitem/CartItem";

const Checkout = () => {
  const [{ cart, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout_left">
        <div>
          <h3>Hello, {user?.email}</h3>
          <br />
          <h2 className="checkout_left_title">Your Shopping Cart</h2>
          {/* {cart.map((e) => (
            <img src={e.image} alt="" />
          ))} */}
          {cart.map((e) => (
            <CartItem
              id={e.id}
              title={e.title}
              price={e.price}
              image={e.image}
              rating={e.rating}
            />
          ))}
        </div>
      </div>

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
