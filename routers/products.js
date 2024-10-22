const { Product } = require('../models/product');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//getting products from database 1st way async await
router.get('/', async (req, res) => {
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }
    // http://localhost:3000/api/v1/products?categories=2342342,555
    const productList = await Product.find(filter).populate('category')
    // .select('name image -_id');
    if (!productList) {
        res.status(500).json({ success: false });
    }
    res.send(productList);
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
        res.status(500).json({ success: false });
    }
    res.send(product);
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

router.post('/', async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated
    });

    console.log('Category after:', req.body.category); // Log the category value

    // try {
    //     const savedProduct = await product.save();
    //     if (!savedProduct) {
    //         return res.status(500).send('The product cannot be created');
    //     }
    //     res.send(savedProduct);
    // } catch (error) {
    //     console.error('Error saving product:', error);
    //     res.status(500).send('The product cannot be created');
    // }

    product = await product.save();

    if (!product) res.status(500).send('the product cannot be created');

    res.send(product);
});

router.put('/:id', async (req, res) => {
    if (mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');

    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    },
        { new: true })
    if (!product) {
        return res.status(500).send('the product cannot be updated!');
    }
    res.send(product);
});

router.delete('/:id', async (req, res) => {
    const product = Product

    product = await product.findByIdAndDelete(req.params.id).then(product => {
        if (product) {
            return res.status(200).json({ success: true, message: 'the product is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'product not found!' });
        }
    }).catch(err => {
        return res.status(400).json({ success: false, error: err });
    });
});

router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments({});
    if (!productCount) {
        res.status(500).json({ success: false });
    }
    res.send({ productCount });
});

router.get('/get/featured/:count', async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);
    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send({ products });
});

module.exports = router;