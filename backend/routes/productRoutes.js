import express from 'express';
import asyncHandler from "express-async-handler";
const router = express.Router();
import Product from "../models/productModel.js";


// fetch all products
// @oute / api/products/
// access public
router.get('/', asyncHandler (async (req, res)=>{
    const product = await Product.find({});
    res.json(product);
}));


// fetch a product
// @oute / api/products/id
// access public

router.get('/:id', asyncHandler ( async(req, res)=>{
    let id = req.params.id
    const prod = await Product.findById(id);
    

    if(prod)
        res.json(prod);
    else
    {
        res.status(404);
        throw new Error('Product Not Found');
    }
       
}));

export default router;