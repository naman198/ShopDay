import React, { useState, useEffect} from 'react'
import { Button, Row, Col, Image, ListGroup, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message.js'
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../Components/CheckoutSteps.js';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions.js';

const PlaceOrderScreen = () => { 
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  cart.itemsPrice = cart.cartItems.reduce((accu, item) =>accu + item.price * item.qty, 0);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreate = useSelector(state => state.orderCreate);
  const {order, success, error } = orderCreate;

  useEffect(() => {
      console.log(success, orderCreate);
    if(success)
        navigate(`/order/${order._id}`);
        // eslint-disable-next-line
    
  }, [navigate, success]);

  const placeOrderHandler = (e) => {
    dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        totalPrice: cart.totalPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
    }));
  }
  
  return (
    <>
    <CheckoutSteps step1 step2 step3 step4 />
    <Row>
        <Col md = {8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address</strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city},
                        {cart.shippingAddress.postalCode},  {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Menthod</h2>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length === 0 ? <Message> Your cart is empty </Message> :(
                        <ListGroup varient = 'flush'>
                            {cart.cartItems.map((item, index) => (
                                <ListGroup.Item key = {index}>
                                    <Row>
                                        <Col md ={1}>
                                            <Image src = {item.image} alt = {item.name} fluid rounded></Image>
                                        </Col>
                                        <Col>
                                            <Link to = {`product/${item.product}`}>
                                            {item.name}</Link>
                                        </Col>
                                        <Col md = {4}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md = {4}>
            <Card>
                <ListGroup varient = 'flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        {error && <Message variant='daner'> {error}</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button type = 'button' className='btn-block' disabled= {cart.cartItems === 0} onClick={placeOrderHandler}> Place Order</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col> 
    </Row>
    </>
  )
}

export default PlaceOrderScreen