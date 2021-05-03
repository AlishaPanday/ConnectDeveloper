//handle json webtoken for authentication
//handles user registration
//import express
const express = require('express');

//use express router
const router = express.Router();

//import middleware
const auth = require('../../middleware/auth');

//import model
const User = require('../../models/User');

//GET api/auth
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
