const express = require("express");
const userRoutes = express();
const user = require("../model/user");

userRoutes.get('/', (req, res) => {
    user.find({}, (err, users) => {
        if (err) throw err;
        res.json(users);
    });
});

userRoutes.post('/cerate', (req, res) => {
    if (req.body.name && req.body.password && req.body.email, req.body.admin) {
        var newUser = new user({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            admin: req.body.admin
        });
        newUser.save((err) => {
            if (err) throw err;
            res.json({
                success: true,
                message: "New user creation successful!"
            })
        });
    }

});

userRoutes.get('/:id', (req, res) => {
    if (req.params.id) {
        user.findOne({ _id: req.params.id }, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json({
            message: "User Id require!"
        });
    }

});

userRoutes.post('/update', (req, res) => {
    if (req.body.id) {
        user.findOneAndUpdate(
            { _id: req.body.id },
            {
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                admin: req.body.admin,
            },
            (err, user) => {
                if (err) throw err;
                res.json(user);
            });
    } else {
        res.json({
            success : false,
            message : "User id require!" 
        });
    }

});

module.exports = userRoutes;