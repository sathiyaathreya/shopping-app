const express = require('express');
const router = express.Router();
const Product = require('../../models/product');
const mongoose = require('mongoose');

router.get('/',(req, res, next)=>{
    Product.find()
    .exec()
    .then(result=>{
        console.log(result);
        if(result){
            const response = {
                count: result.length,
                products: result.map(each => {
                    return {
                        Name: each.name,
                        Price: each.price,
                        request: {
                            type: 'GET',
                            url: process.env.BASE_URL + process.env.PRODUCTS_LINK + each._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        } else {
            res.status(200).json({
                message: "Empty cart"
            });
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/',(req, res, next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
    .then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
    .catch(
        err=>{
            console.log(err);
            res.status(500).json(err);
        }
    );
});

router.get('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .exec().
    then(doc=>{
        console.log(doc);
        if(doc){
            const response = {
                Name: doc.name,
                Price: doc.price,
                Link: {
                    type: 'GET',
                    url: process.env.BASE_URL + process.env.PRODUCTS_LINK + doc._id
                }
            }
            res.status(200).json(response);
        } else {
            res.status(404).json({
                message: "No products found for that Id"
            });
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.patch('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    const updateProps = {};
    for(const payloadProp of req.body){
        updateProps[payloadProp.propName] = payloadProp.value;
    }
    Product.findByIdAndUpdate(id, { $set: updateProps})
    .exec()
    .then(doc=>{
        res.status(202).json(doc);
    })
    .catch(err=>{
        res.status(200).json(err);
    });
});

router.delete('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    Product.findByIdAndDelete(id)
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(202).json(doc);
        } else {
            res.status(200).json({
                message: "Could not find the product"
            })
        }
    })
    .catch(err=>{
        res.status(404).json(err);
    });
});

module.exports = router;