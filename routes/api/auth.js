//handle json webtoken for authentication 
//handles user registration
//import express
const express = require('express');

//use express router
const router = express.Router();

//GET api/auth 
router.get('/', (req,res) => res.send('Autho route'));

module.exports = router;