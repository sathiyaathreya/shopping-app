const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message: "Fetch orders"
    });
});

router.post('/',(req, res, next)=>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: order
    });
});

router.get('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message: `Fetched order for id = ${req.params.orderId}`
    });
});

router.patch('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message: `Updated order for id = ${req.params.orderId}`
    });
});

router.delete('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message: `Deleted order with id = ${req.params.orderId}`
    });
});

module.exports = router;