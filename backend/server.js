import expess from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config()

connectDB();

import products from './data/products.js'



const app = expess();
app.get('/', (req, res)=>{
    res.send('Apii is running')
})

app.get('/api/products', (req, res)=>{
    res.json(products);
})


app.get('/api/product/:id', (req, res)=>{
    const prod = products.find(p  => p._id === req.params.id);
    res.json(prod);
})

const PORT = process.env.REACT_APP_PORT || 4000

app.listen(PORT, console.log(`Server is in ${process.env.NODE_ENV} mode on ${PORT}`));