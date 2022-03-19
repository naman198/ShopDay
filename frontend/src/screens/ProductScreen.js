import React, {useState, useEffect} from 'react'
import { Link , useParams} from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../Components/Rating'
import axios from 'axios';

const ProductScreen = (prop) => {
    let {id} = useParams();

    const [product, setProduct] = useState({});

    useEffect(() =>{
        const fetchProduct = async() =>{
            const {data} = await axios.get(`/api/product/${id}`);
            setProduct(data)
        }
        fetchProduct();
    }, [])

    return (
      <>
      <Link className='btn btn-light my-3' to="/">
        go back
      </Link>
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
      </>
    )
}

export default ProductScreen