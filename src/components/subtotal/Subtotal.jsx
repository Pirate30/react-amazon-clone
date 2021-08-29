import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { cartTotal } from "../../reducer";
import { useHistory } from "react-router";

const Subtotal = () => {
  const history = useHistory();
  const [{ cart }, dispatch] = useStateValue();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
            <p>
              Subtotal ({cart.length} items): <strong> {value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={cartTotal(cart)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={(e) => history.push("/payment")}>
        proceed to checkout
      </button>
    </div>
  );
};

export default Subtotal;
