import React, { useState, useEffect} from 'react'
import { Button, Row, Col, Image, ListGroup, Card} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message.js'
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions.js';
import { useParams } from "react-router-dom";


const OrderScreen = () => {
  const Id  = useParams();
  const orderId = Id.id;

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const orderDetails = useSelector(state => state.orderDetails);
  const {order, loading, error } = orderDetails;
  
  if(!loading)
  {
      order.itemsPrice = order.orderItems.reduce((accu, item) =>accu + item.price * item.qty, 0);
      order.shippingPrice = order.orderItems > 100 ? 0 : 100;
  }

  useEffect(() => {
    if(!order || order._id !== orderId)
        dispatch(getOrderDetails(orderId));
  }, [order, orderId, dispatch]);

  return loading ? <Loader /> : error ? <Message variant='danger'> {error} </Message> : 
  <>
    <h1>Order {order._id}</h1>
        <Row>
        <Col md = {8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p> <strong>Name: </strong> {order.user.name}</p>
                    <p> <strong>Email: </strong> <a href={`mailto:${order.user.email}`}> {order.user.email}</a></p>
                    <p>
                        <strong>Address</strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city},
                        {order.shippingAddress.postalCode},  {order.shippingAddress.country}
                    </p>

                    {order.isDelivered ? 
                    <Message variant='success'> Delivered on {order.deliveredAt} </Message> : 
                        <Message varient='danger'> Not Delivered </Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Menthod</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? <Message variant='success'> Paid on {order.paidAt}</Message> : 
                        <Message varient='danger'> Not Paid </Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? <Message> Order is empty </Message> :(
                        <ListGroup varient = 'flush'>
                            {order.orderItems.map((item, index) => (
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
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                        {error && <Message variant='daner'> {error}</Message>}
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col> 
    </Row>
  </>
}

export default OrderScreen