const Product = require('../models/products');

exports.getShop = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true
        });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/carts', {
        path: '/cart',
        pageTitle: 'Your Carts'
    });
}

exports.getCheckOut = (req,res,next) => {
    res.render('shop/checkout',{
        path:'/checkout',
        pageTitle: 'Checkout'

    });
}