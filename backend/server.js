import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRouters.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import {Not_Found, Error_Handler} from "./middleware/errorMiddleware.js";

dotenv.config()
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Apii is running')
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
// app.use('/api/product', productRoutes);


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(Not_Found)
app.use(Error_Handler);



const PORT = process.env.REACT_APP_PORT || 4000;

app.listen(PORT, console.log(`Server is in ${process.env.NODE_ENV} mode on ${PORT}`));