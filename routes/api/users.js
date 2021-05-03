//handles user registration
//import express
const express = require('express');

//use express router
const router = express.Router();

//GET api/users 
router.get('/', (req,res) => res.send('User route'));

module.exports = router;

