//profile crud operations
//handles user registration
//import express
const express = require('express');

//use express router
const router = express.Router();

//GET api/Profile
router.get('/', (req,res) => res.send('Profile route'));

module.exports = router;