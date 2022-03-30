import React, {useDebugValue, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import { Spinner } from 'react-bootstrap';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';

const CartScreen = (param) => 
{
    let {id} = useParams();
    const qty = window.location.search ? Number(window.location.search.split('=')[1]) : 1;

    const cart = useSelector(state =>  state.cart)
    const {cartItems } = cart;

    const dispatch = useDispatch();

    useEffect(() =>{
        if(id)
        {
            dispatch(addToCart(id, qty))
        }
    },[dispatch, id, qty]);

  return (
    <Row>
        <Col md = {8}>
            <h1> Shooping cart</h1>
            {cartItems.length() === 0 ? <Message>Your Cart is empty <Link to='/'>Go Back</Link></Message> : ""}
        </Col>
        <Col md ={2}>
            
        </Col>
    </Row>
  )
}

export default CartScreen