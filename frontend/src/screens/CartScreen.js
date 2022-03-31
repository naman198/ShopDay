import React, {useDebugValue, useEffect} from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import { Spinner } from 'react-bootstrap';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = (param) => 
{
    let {id} = useParams();
    const qty = window.location.search ? Number(window.location.search.split('=')[1]) : 1;
    const navigation = useNavigate();
    const cart = useSelector(state =>  state.cart)
    const {cartItems } = cart;

    const dispatch = useDispatch();

    const removeFromCartHandler = (id) =>
    {
        dispatch(removeFromCart(id));
    }

    const checkOutHandler = () =>
    {
        navigation('/login?redirect=shipping');
    }
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
            {cartItems.length === 0 ? <Message>Your Cart is empty <Link to='/'>Go Back</Link></Message> : (
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key = {item.product}>
                            <Row>
                                <Col md ={2}>
                                    <Image src = {item.image} alt = {item.name} fluid rounded></Image>
                                </Col>
                                <Col md = {3}>
                                    <Link to={`/product/${item.product}`}> {item.name}</Link>
                                </Col >
                                <Col md= {2}>
                                    {item.price}
                                </Col>
                                <Col md = {2}>
                                <Form.Control as = 'select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                    {[...Array(item.countInStock).keys()].map(x => (
                                    <option key = {x + 1} value = {x + 1}>
                                        {x + 1}
                                    </option>
                                    ))}
                                </Form.Control>
                                </Col>

                                <Col md = {2}>
                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                        <i className='fas fa-trash'></i>
                                    </Button> 
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>

        <Col md ={4}>
            <Col>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2> Subtotal ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)}) items</h2>
                        $ {cartItems.reduce((accu, item) => accu + item.price * item.qty, 0).toFixed(2)}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button type = 'button' className='btn-black' disabled={cartItems.length === 0} 
                        onClick ={checkOutHandler}>
                            Proceed To CheckOut
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Col>  
    </Row>
  )
}

export default CartScreen