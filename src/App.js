import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Checkout from './pages/checkout/Checkout';
import Login from './pages/login/Login';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import { auth } from './firebaseConfig';
import Payment from './pages/payment/Payment';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Yourorders from './pages/yourorders/Yourorders';


const promise = loadStripe('pk_test_51JSaTqSJpC0rnFhpLWGowQ3eo3mk3tWGNAAlEqsGoLY8OyRFnsVSVhVqmGBlwlxmdCSrSEPCHcAkxUrvHzmhOs6800wLX9RqIL')

function App() {

  // keeping track of the user
  const[{},dispatch] = useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log("curreent user =>",authUser);
      // if user is there then sending the user data to the reducer/context
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user:authUser
        })
      }else{
        // no user then setting the user as null again in the redducer
        dispatch({
          type: 'SET_USER',
          user:null
        })
      }
    })
  },[]);

  return (
    <Router>
      <div className="app">
      <Header/>
        <Switch>
          {/* <Route path="/login">
            <Login/>
          </Route> */}
          <Route path="/checkout">
            <Checkout/>
          </Route>
          <Route path="/yourorders">
            <Yourorders/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}> 
              <Payment/>
            </Elements>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
