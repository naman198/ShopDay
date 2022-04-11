import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// fetch all products
// @oute / api/products/
// access public
const getProducts = asyncHandler( async (req, res)=>{
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Product.countDocuments({});
    const product = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1));

    res.json({product, page, pages: Math.ceil(count / pageSize)});
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


// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })


// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})

export {getProductById, getProducts, deleteProduct, getTopProducts, createProduct, updateProduct, createProductReview};