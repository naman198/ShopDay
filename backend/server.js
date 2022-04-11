import path from 'path';
import express from 'express';
// import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRouters.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import morgan from 'morgan';

import {Not_Found, Error_Handler} from "./middleware/errorMiddleware.js";

// dotenv.config()
connectDB();

const app = express();

if(process.env.NODE_ENV === 'development')
{
    app.use(morgan('dev'))
}

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}
else{
    app.get('/', (req, res)=>{
        res.send('Apii is running')
    });
}

app.use(Not_Found)
app.use(Error_Handler);



const PORT = process.env.REACT_APP_PORT || 4000;

app.listen(PORT, console.log(`Server is in ${process.env.NODE_ENV} mode on ${PORT}`));