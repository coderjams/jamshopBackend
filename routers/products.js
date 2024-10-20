const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();

//getting products from database 1st way async await
router.get('/', async (req, res) => {
    const productList = await Product.find();
    if (!productList) {
        res.status(500).json({ success: false });
    }
    res.send(productList);
});

// getting products from the database 2nd way using .then()
// app.get(`${api}/products`, (req, res) => {
//     const productList = Product.find().then((products) => {
//         res.status(200).json(products);
//     }).catch((err) => {
//         res.status(500).json({
//             error: err,
//             success: false
//         });
//         res.send(productList);
//     });

// });

router.post('/', (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        });
    });
});

module.exports = router;