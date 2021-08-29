import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "../../StateProvider";
import CartItem from "../../components/cartitem/CartItem";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { cartTotal } from "../../reducer";
import CurrencyFormat from "react-currency-format";
import axios from "../../axios";
import { useHistory } from "react-router";
import { db } from "../../firebaseConfig";

const Payment = () => {
  const [{ cart, user }, dispatch] = useStateValue();

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSec, setClientSec] = useState(false);
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  // using the use effect to get client secret key with changing the cart
  useEffect(() => {
    // generaating the stripe secret key
    const getClientSec = async () => {
      // console.log("getting secet");
      const res = await axios({
        method: "POST",
        // sending the total in the query in formate of subunits(cents)
        url: `/payments/create?total=${cartTotal(cart) * 100}`,
      });
      // console.log("res..", res);
      setClientSec(res.data.clientSecret);
    };
    getClientSec();
  }, [cart]);
  // console.log("heres the client secret", clientSec);
  // console.log("heres the user id", user.uid);

  //   handlig the payments from the uaer
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSec, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(() => {
        // console.log("this is payintent", paymentIntent);
        // adding the order to a firestore
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(clientSec)
          .set({
            cart: cart,
            amount: cartTotal(cart),
            // created: new Date(),
          });

        setSucceeded(true);
        setError(null);
        setProcessing(null);

        // making cart empty
        dispatch({
          type: "EMPTY_CART",
        });

        // kicking user to the order page
        history.replace("/yourorders");
      });
    console.log("payload", payload);
  };

  // handling the change in the card details
  const handleChange = (e) => {
    // listening to changes and giving errors
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>CheckOut ({cart.length}) Items</h1>
        {/* address */}
        <div className="payment_address">
          <div className="payment_title">
            <h3>Deliver At</h3>
          </div>
          <div className="payment_address_details">
            <p>{user?.email}</p>
            <p>10880</p>
            <p>Malibu Point, 90265</p>
          </div>
        </div>

        {/* review the products */}
        <div className="payment_review">
          <div className="payment_title">
            <h3>Review The Product & Address</h3>
          </div>
          <div className="payment_review_items">
            {cart.map((i) => (
              <CartItem
                id={i.id}
                title={i.title}
                price={i.price}
                image={i.image}
                rating={i.rating}
              />
            ))}
          </div>
        </div>

        {/* payment method */}
        <div className="payment_method">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_method_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_price">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      {/* <small className="subtotal__gift">
                        <input type="checkbox" /> This order contains a gift
                      </small> */}
                      <p>
                        Subtotal ({cart.length} items):{" "}
                        <strong> {value}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={cartTotal(cart)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={disabled || processing || succeeded}
                  className="payment_btn"
                  type="submit"
                >
                  {processing ? <p>Processing</p> : <p>Proceed To Checkout</p>}
                </button>
              </div>
              {error ? <div>{error}</div> : ""}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
