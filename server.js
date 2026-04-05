require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/database')

const productRoute = require('./routes/productRoute');

app.use(express.json());

//db
connectDB();

//ROUTES
app.get('/', (req, res) => {
    res.render('products for sale');
})
app.use('/api', productRoute);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})


