import { raw } from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";


//  create new order
// @oute  POST /api/orsers/
// access Private

const addOrderItem = asyncHandler( async (req, res)=>{
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

    if(orderItems && orderItems.length === 0)
    {
        res.status(400);
        throw new Error('no order items');
    }
    else{
        const order = new Order({
           user :req.user._id,  orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        });
        
        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
})

// Get order by id
// @oute  Get /api/orders/:id
// access Private

const getOrderById = asyncHandler( async (req, res)=>{

    const order = await Order.findById(req.params.id).populate({path:'user', model: User, select: ['email', 'name']});

    if(order)
    {
        res.json(order);
    }
    else{
        res.status(404);
        res.status('Order Not found')
    }
})

// Get update order to paid
// @oute  Get /api/orders/:id/pay
// access Private

const updateOrderToPaid = asyncHandler( async (req, res)=>{

    const order = await Order.findById(req.params.id);

    if(order)
    {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time : req.body.update_time,
            email_address : req.body.payer.email_address
        }

        const updatedOrder = await order.save();

        res.json(updatedOrder);

    }
    else{
        res.status(404);
        res.status('Order Not found')
    }
})


// Get update order to delivered
// @oute  Get /api/orders/:id/delivered
// access Private/Admin

const updateOrderToDelivered = asyncHandler( async (req, res)=>{

    const order = await Order.findById(req.params.id);

    if(order)
    {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else{
        res.status(404);
        res.status('Order Not found')
    }
})

// Get Logged in user orders
// @oute  Get /api/orders/myorders
// access Private

const getMyOrders = asyncHandler( async (req, res)=>{
    const order = await Order.find({ user : req.user._id});
    res.json(order);
    
})

// Get All order
// @oute  Get /api/orders
// access Private/admin

const getOrders = asyncHandler( async (req, res)=>{
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
})


export {addOrderItem , getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered}