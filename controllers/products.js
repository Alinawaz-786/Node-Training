const Product = require('../models/products');


exports.getProducts = (req, res, next) => {
    //const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const isLogedIn = req.get('Cookie').split('=')[1];

    Product.find()
        .then(products => {
            res.render('admin/product-list', {
                prods: products,
                pageTitle: 'Products List',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCss: true,
                isAuthenticated: isLogedIn
            });
        });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getShop = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true
        });
    });
}