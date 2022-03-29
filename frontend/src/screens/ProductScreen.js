import React, {useState, useEffect} from 'react'
import { Link , useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../Components/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ProductScreen = () => {
    let {id} = useParams();
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { loading , error, product} = productDetails;

    useEffect(() =>{
        dispatch(listProductDetails(id));
    }, [id])


    return (
      <>
      <Link className='btn btn-light my-3' to="/">
        go back
      </Link>

      {loading ? <Loader /> : error ? <Message variant='danger'> {error} </Message> : 
              <Row>
              <Col md ={6}>
                <Image src = {product.image} alt = {product.Name} fluid = {true}/>
              </Col>
              <Col md = {3}>
                <ListGroup variant='flush'>
                  
                  <ListGroup.Item>
                    <h3>{product.Name}</h3>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                      <Rating value = {product.rating} text = {`${product.numReview} reviews`} />
                  </ListGroup.Item>
      
                  <ListGroup.Item>
                    Price: ${product.price}
                  </ListGroup.Item>
      
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                
                </ListGroup>
              </Col>
      
              <Col md = {3}>
                <Card>
                  <ListGroup variant = 'flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Price : 
                        </Col>
                        <Col>
                        <strong>$ {product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Status : 
                        </Col>
                        <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'out of stock' }
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                        Add t o Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
      }
      

      </>
    )
}

export default ProductScreen