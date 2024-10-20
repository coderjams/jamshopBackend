const { User } = require('../models/product');
const express = require('express');
const router = express.Router();

//getting products from database 1st way async await
router.get('/', async (req, res) => {
    const userList = await User.find();
    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
});

module.exports = router;