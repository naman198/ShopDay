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

// Delete a product
// @oute  /api/products/id
// access Private/admin

const deleteProduct = asyncHandler( async (req, res)=>{
    let id = req.params.id
    const prod = await Product.findById(id); 

    if(prod)
    {
        await prod.remove();
        res.json({message: 'product removed'})
    }
    else
    {
        res.status(404);
        throw new Error('Product Not Found');
    }
})


// create a product
// @oute  /api/products/
// access Private/admin

const createProduct = asyncHandler( async (req, res)=>{
    const product = new Product({
        name : 'sample name',
        price : 0,
        user : req.user._id,
        image: '/image/sample.jpg',
        brand : 'Sample',
        category : 'Sample cat',
        countInStock : 0,
        numReviews: 0,
        description: 'sample desc'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})


// update a product
// @oute  /api/products/:id
// access Private/admin

const updateProduct = asyncHandler( async (req, res)=>{
   const {name, price, description, image, brand, category, countInStock} = req.body;

   const product = await Product.findById(req.params.id);

   if(product)
   {
     product.name = name
     product.price = price
     product.description = description
     product.image = image
     product.brand = brand
     product.category = category
     product.countInStock = countInStock
    
     const updatedProduct = await product.save();

     res.json(updatedProduct);

   }
   else
   {
       res.status(404);
       throw new Error('product not found');
   }
})
export {getProductById, getProducts, deleteProduct, createProduct, updateProduct};