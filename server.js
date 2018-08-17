
const express  = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config");
const postRoutes = require("./route/post");
const userRoutes = require("./route/user");
const user = require("./model/user");

app.use(bodyParser.urlencoded({extented: false}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.set("jwtSecrets", config.secret);
mongoose.connect(config.database);

app.use((req, res, next) => {
    if (req.path == "/authenticate" || req.path == "/user/create") return next();
    const token = req.body.token || req.param.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get("jwtSecrets"), (err, decoded)=>{
          if(err){
              res.json({
                  success: false,
                  message: "Token authentication failed!"
              });
          }else{
              req.decoded = decoded;
              next();
          }
        })
    }else{
        // if there is no token
        // return an error
        res.status(403).json({
            success: false,
            message: "Authentication token require!"
        });
    }
})

app.post('/authenticate',(req, res)=>{
    const name = req.body.name;
    user.findOne({name: name}, (err, user)=>{
        if(err) throw err;
        if (!user){
            res.json({
                success: false,
                message: "Username doesn't exists!"
            });
        }else if (user) {
            //res.json(user);
            if(user.password != req.body.password){
                res.json({
                    success: false,
                    message : "User password doesn't mathchs!"
                });
            }else{
                const payload = {
                    admin: user.admin
                }
                const token = jwt.sign(payload, app.get("jwtSecrets"),{
                    expiresIn: 86400
                });

                res.json({
                    success: true,
                    token: token,
                    message : "Your token'll valid for 24hrs"
                });
            }
        }
    });
});

app.get('/', (req, res)=>{
    res.send('This is home route!');
});


app.use("/post/", postRoutes);
app.use("/user/", userRoutes);

const port = 3000;
app.listen(port, ()=>{
    console.log("server running @"+port);
});


