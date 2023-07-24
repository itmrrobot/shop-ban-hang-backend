const express = require('express');
require('./db/mongoose');
const productRouter = require('./router/product');
const userRouter = require('./router/user');
const categoryRouter = require('./router/category');
const orderRouter = require('./router/order');
const path = require('path');
const imagesPath = path.join(__dirname,'../images');
const app = express();
const cors = require('cors')


app.use(express.static(imagesPath));
app.use(express.json());
app.use(cors());
app.use(productRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(orderRouter);

app.listen(process.env.PORT,() => {
    console.log('Server started on port 3000');
})

