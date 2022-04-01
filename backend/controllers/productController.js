import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// fetch all products
// @oute / api/products/
// access public
const getProducts = asyncHandler( async (req, res)=>{
    const product = await Product.find({});
    res.json(product);
})

// fetch a product
// @oute / api/products/id
// access public

const getProductById = asyncHandler( async (req, res)=>{
    let id = req.params.id
    const prod = await Product.findById(id); 

    if(prod)
        res.json(prod);
    else
    {
        res.status(404);
        throw new Error('Product Not Found');
    }
})

export {getProductById, getProducts};