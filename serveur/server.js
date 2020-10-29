var helmet = require('helmet');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./user');
const app = express();


mongoose.connect('mongodb+srv://skillzhost:KhKC3dSbWlpEoqMZ@viewers.d1nt3.gcp.mongodb.net/login?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}), () => {
    console.log("Mongoose is connected");
}


//MiddleWare
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:3000", //Location to react apps
    credentials: true
}))

app.use(session({
    secret: "secretcode",
    resave: true,
    savedUninitialized: true,
}))

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);
//routes

app.post("/login", (req,res,next) => {
    passport.authenticate("local", (err,user,info) => {
        if(err) throw err;
        if (!user) res.send("no User Exists");
        else{
            req.logIn(user, err => {
                if (err) throw err;
                res.send('Successfully Authenticate');
                console.log(req.user);
            })
        }

    })(req,res,next);

});

app.post("/register",  (req,res) => {
    User.findOne({username: req.body.username}, async (err, doc) => {
        if(err) throw err;
        if(doc) res.send("User Exists");
        if(!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            });
            await newUser.save((error) => {
                if(error) throw error;
            });
            res.send("User created");
        }

    });

});

app.get("/user", (req,res) => {
    res.send(req.user);

});





app.use(session({
    secret:"secretcode",
    resave: true,
    saveUninitialized: true
}))

app.listen(4000,  () => {
    console.log("Server Has Started");

})

