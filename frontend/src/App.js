import React from "react";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreens.js";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen.js";

const App = () => {
  return (
    <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path='/' exact element = {<HomeScreen />} /> 
              <Route path='/shipping' element = {<ShippingScreen />} />
              <Route path='/placeorder' element = {<PlaceOrderScreen />} />
              <Route path='/payment' element = {<PaymentScreen />} />
              <Route path='/product/:id' element = {<ProductScreen />} /> 
              <Route path='/placeorder/product/:id' element = {<ProductScreen />} /> 
              <Route path='/login' element = {<LoginScreen />} /> 
              <Route path='/cart/:id' element = {<CartScreen />} />
              <Route path='/cart/' element = {<CartScreen />} />
              <Route path='/register' element = {<RegisterScreen />} />
              <Route path='/profile' element = {<ProfileScreen />} />
              <Route path='/order/:id' element = {<OrderScreen />} />
              <Route path='/admin/userlist' element = {<UserListScreen />} />
              <Route path='/admin/user/:id/edit' element = {<UserEditScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
    </Router>
  );
} 

export default App;
