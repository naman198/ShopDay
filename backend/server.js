import expess from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import {Not_Found, Error_Handler} from "./middleware/errorMiddleware.js";

dotenv.config()
connectDB();

const app = expess();
app.use(expess.json());

app.get('/', (req, res)=>{
    res.send('Apii is running')
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/product', productRoutes);

app.use(Not_Found)
app.use(Error_Handler);



const PORT = process.env.REACT_APP_PORT || 4000;

app.listen(PORT, console.log(`Server is in ${process.env.NODE_ENV} mode on ${PORT}`));