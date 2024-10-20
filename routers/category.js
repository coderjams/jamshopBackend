const { Category } = require('../models/product');
const express = require('express');
const router = express.Router();

//getting products from database 1st way async await
router.get('/', async (req, res) => {
    const categoryList = await Category.find();
    if (!categoryList) {
        res.status(500).json({ success: false });
    }
    res.send(categoryList);
});

module.exports = router;