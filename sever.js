// const path = require('path');
// const express = require('express');
// const bodyParser = require('body-parser');
// const errorController = require('./controllers/errorController');

// const app = express();

// //set the view engine
// app.set("view engine", "ejs");
// // app.set("views", path.resolve(__dirname, "view/ejs"))

// //Controller SetUP
// const adminRoutes = require('./routes/admin');
// const ShopRouter = require('./routes/shop');

// const { join } = require('path');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')))

// app.use('/admin', adminRoutes);
// app.use(ShopRouter);
// //Error Page Load
// app.use(errorController.get404);

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const errorController = require('./controllers/errorController');
// const mongoConnected = require('./util/database').mongoConnected;
const app = express();

const MONGODB_URL = 'mongodb://localhost:27017/Userdb';

const store = new MongoDBStore({
    uri: MONGODB_URL,
    collection: 'session'
});
//set the view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "view/ejs"))

//Controller SetUP
const adminRoutes = require('./routes/admin');
const ShopRouter = require('./routes/shop');
const AuthRouter = require('./routes/auth');
// const UserRouter = require('./routes/userRouter'); 

const cron = require('./crons/cronJob');

const { join } = require('path');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    let userID = '63de462e8e9b63a659ed6d35';
    User.findById(userID)
        .then(user => {
            req.user = user;
            next();
        }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
// app.use('/user', UserRouter);
app.use(ShopRouter);
app.use(AuthRouter);
app.use(session({ secret: 'Your_Secret_Key', resave: true, saveUninitialized: true, store: store }));
app.use(errorController.get404);

app.get("/test", function(req, res) {
    req.session.email = 'Aditya@123';
    session.save(session.email);
});


mongoose.set('strictQuery', false);

mongoose.connect(MONGODB_URL).then(result => {
    app.listen(4000)
}).catch(err => {
    console.log(err);
});