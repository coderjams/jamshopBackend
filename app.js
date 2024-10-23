// Description: This file is the entry point of the application.
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./helpers/error-handler');

require('dotenv/config');
const authJwt = require('./helpers/jwt');

const app = express();

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

// routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//database
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'eshop-database'
})
    .then(() => {
        console.log('Database connection is ready');
    }).catch((err) => {
        console.log(err);
    });

app.listen(3000, () => {
    console.log(api);
    console.log('Server is running on port 3000');
});