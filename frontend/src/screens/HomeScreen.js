import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from "react-bootstrap";
import Product from "../Components/Product";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import Paginate from '../Components/Paginate';
import ProductCarousel from '../Components/ProductCarousel';

const HomeScreen = () => {

    const dispatch = useDispatch()
    const {pageNumber} = useParams();
    
    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(pageNumber))
    }, [dispatch.apply,pageNumber])
    
    return (
        <>
        {<ProductCarousel />}
        <h1> Latest Products </h1>
        {loading ? <Loader /> : error ? <Message variant='danger'> {error}</Message> :
        <>
            <Row>
            {products.map(product => (
                <Col key = {product._id} sm = {12} md = {6} lg = {4} xl ={3}>
                    <Product product = {product} ></Product>
                </Col>
            ))}
        </Row>
        <Paginate pages = {pages} page = {page} />
        </>
        }
    </>
    )
}

export default HomeScreen