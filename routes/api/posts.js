// Post/like/comments
//handles user registration
//import express
const express = require('express');

//use express router
const router = express.Router();

//GET api/posts
router.get('/', (req,res) => res.send('Posts route'));

module.exports = router;