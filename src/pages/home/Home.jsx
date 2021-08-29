import React from "react";
import Product from "../../components/product/Product";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_banner"
          src="https://www.clevelandfilm.com/wp-content/uploads/2020/10/Amazon-Prime-Day-Email-Banner.png"
          alt=""
        />
        <div className="home_row">
          <Product
            id="1234"
            title={"The Almanack Of Nvala Ravikant"}
            price={20.0}
            image="https://images-na.ssl-images-amazon.com/images/I/310zQ0UbRdL._SX322_BO1,204,203,200_.jpg"
            rating={5}
          />
          <Product
            id="2345"
            title={"Psychology Of Money"}
            price={15.0}
            image="https://images-na.ssl-images-amazon.com/images/I/81Lb75rUhLL.jpg"
            rating={4}
          />
        </div>
        <div className="home_row">
          <Product
            id="3456"
            title={"Atomic Habits"}
            price={22.0}
            image="https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg"
            rating={5}
          />
          <Product
            id="4567"
            title={"48 Laws of Human Nature"}
            price={50.0}
            image="https://images-na.ssl-images-amazon.com/images/I/71OMelbI6sL.jpg"
            rating={5}
          />
          <Product
            id="5678"
            title={"Sapiense"}
            price={30.0}
            image="https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg"
            rating={5}
          />
        </div>
        <div className="home_row">
          <Product
            id="6789"
            title={"21 Lessons For The 21st Century"}
            price={25.0}
            image="https://images-na.ssl-images-amazon.com/images/I/71VSswnjh9L.jpg"
            rating={5}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
