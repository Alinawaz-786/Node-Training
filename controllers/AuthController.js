const bcrypt = require('bcryptjs');
const User = require('../models/user');


exports.getLogin = (req, res, next) => {
    // const isLogedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    console.log(req.session);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login Page',
        isAuthenticated: false
    });

};

exports.getSignUp = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Sign Up Page',
        isAuthenticated: false
    });

};

exports.postLogin = (req, res, next) => {
    const _email = req.body.email;
    const _password = req.body.password;

    User.findOne({ email: _email })
        .then(user => {
            // console.log(_email);
            // console.log(_password);
            // console.log(user);
            if (!user) {
                return res.redirect('/');
            }
            bcrypt.compare(_password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.userName = 'Aditya@123';
                        req.session.isLoggedIn = true,
                            req.session.user = user,
                            console.log("-----------------------------------");
                        console.log(req.session);
                        req.session.save(err => {
                            res.redirect('/');
                        });
                    }
                })
                .catch(err => {
                    res.redirect('/');
                });
        }).catch(err => console.log());
};

exports.postSignUp = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const conformedPassword = req.body.conformedPassword;

    User.findOne({ email: email }).then(userDoc => {
            if (userDoc) {
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const _user = new User({
                        email: email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return _user.save();
                })
                .then(result => {
                    res.redirect('/login');
                })
        })
        .catch(err => {
            console.log(err);
        });
}
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
    // return res.redirect('/');
};