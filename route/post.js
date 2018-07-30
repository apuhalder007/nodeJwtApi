const express = require("express");
const postRoutes = express();
const post = require("../model/post");
postRoutes.get('/', (req, res)=>{
    post.find({}, (err, posts)=>{
        if(err) throw err;
        res.json(posts);
    });
});
postRoutes.post('/add', (req, res)=>{
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const feature_img = req.body.feature_img;
    const new_post = new post({
        title: title,
        content: content,
        author: author,
        feature_img: feature_img
    });

    new_post.save((err, post)=>{
        if(err) throw err;
        res.json({
            success : true,
            message: "New post has been created successfully!"
        })

    });
});

module.exports = postRoutes;
