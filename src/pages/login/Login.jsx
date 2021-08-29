import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../firebaseConfig";

const Login = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signIn = (e) => {
    console.log("signin in...");
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // console.log(`user is logged in ${auth}`);
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };

  //registering the user
  const register = (e) => {
    console.log("signin in...");
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // user is created success fully then
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png"
          alt=""
        />
      </Link>
      <div className="login_container">
        <h1>Sign-In</h1>
        <form>
          <p>Email or mobile phone number</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={signIn}>
            Sign-In
          </button>
        </form>
        <p className="login_footer_info">
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
      </div>
      <p>New to Amazon?</p>
      <button type="submit" onClick={register} className="new_ac_btn">
        Creact Your Amazon account
      </button>
    </div>
  );
};

export default Login;
