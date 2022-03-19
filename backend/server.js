const expess = require('express')
const dotenv = require('dotenv');
// require('dotenv').config({ path: require('find-config')('.env') })
// require('dotenv').config({path:'./ShoopingAPP/.env'})
const products = require('./data/products')


dotenv.config()

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

console.log(process.env)
app.listen(PORT, console.log(`Server is in ${process.env.NODE_ENV} mode on ${PORT}`));