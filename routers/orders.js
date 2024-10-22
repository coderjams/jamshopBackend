const { User } = require('../models/orders');
const express = require('express');
const router = express.Router();

//getting products from database 1st way async await
router.get('/', async (req, res) => {
    const orderList = await User.find();
    if (!orderList) {
        res.status(500).json({ success: false });
    }
    res.send(orderList);
});

module.exports = router;