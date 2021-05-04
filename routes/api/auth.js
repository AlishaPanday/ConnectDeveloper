//handle json webtoken for authentication
//handles user registration
//import express
const express = require('express');

//use express router
const router = express.Router();

const bcrypt = require('bcryptjs');

//import middleware
const auth = require('../../middleware/auth');

//importing jsonwebtoken
const jwt = require('jsonwebtoken');

//importing jwtWebtoken from config folder
const config = require('config');

//validation to validate the input and report any errors before creating user
const { check, validationResult } = require('express-validator');

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

//POST request to auth to authenticate,log user & receive token to make request to private routes
router.post(
  '/',
  [
    
    check('email', 'Please Enter valid email address').isEmail(),

    check('password', 'Please Enter Password').exists(),
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring name,email and password
    const {email, password } = req.body;

    try {
      //check if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid login credentials' }] });
      }

      //match password using bcryptjs method called "compare"

      const passwordMatch = await bcrypt.compare(password, user.password);
      if(!passwordMatch){
        return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid login credentials' }] });
      }

      //return jsonwebtoken so that user can get logged in right away
      //get the payloads which includes userid
      const payload = {
        user: {
          id: user.id,
        },
      };
      //changes expiry 
      jwt.sign(payload, config.get('secretJWT'), {expiresIn: 360000}, (err,token) => {
        if(err) throw err;
        res.json({token});
      });

      // res.send('User Registered succesfully');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

