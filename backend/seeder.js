import mongoose from "mongoose";
import dotenv from 'dotenv';

import users from "./data/user.js";
import products from "./data/products.js";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async ()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(users);
        const adminUser = createdUser[0]._id;
        const sampleProducts = products.map((prod) =>{
            return {...prod, user: adminUser}
        })

        await Product.insertMany(sampleProducts);
        console.log("data Added");
        process.exit();

    } catch (error) {
        console.log(error.message, "during data import")
        process.exit(1);
    }
}


const destroyData = async ()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("data deleted");
        process.exit();

    } catch (error) {
        console.log(error.message, "during data delete")
        process.exit(1);
    }
}

if(process.argv[2] === '-d')
{
    destroyData();
}
else
{
    importData();
}