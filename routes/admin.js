const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    console.log("In to the testing middleware");
    res.send('<form method="POST" action="/product"><input type="text" name="message"><button  type="submit">Send</button></form>');
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;