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

const App = () => {
  return (
    <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path='/' exact element = {<HomeScreen />} /> 
              <Route path='/product/:id' element = {<ProductScreen />} /> 
              <Route path='/login' element = {<LoginScreen />} /> 
              <Route path='/cart/:id' element = {<CartScreen />} />
              <Route path='/cart/' element = {<CartScreen />} />
              <Route path='/register' element = {<RegisterScreen />} />
              <Route path='/profile' element = {<ProfileScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
    </Router>
  );
} 

export default App;
