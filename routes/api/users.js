//handles user registration
//import express
const express = require('express');

//use express router
const router = express.Router();

//importing gravatar - allows user attach profile image to an email
const gravatar = require('gravatar');

//importing bcrypt
const bcrypt = require('bcryptjs');

//importing jsonwebtoken
const jwt = require('jsonwebtoken');

//importing jwtWebtoken from config folder
const config = require('config');

//validation to validate the input and report any errors before creating user
const { check, validationResult } = require('express-validator');

//require User Model
const User = require('../../models/User');

//POST to register user by sending name,email & password to this route.
router.post(
  '/',
  [
    check('name', 'Name cannot be empty').not().isEmpty(),

    check('email', 'Please Enter valid email address').isEmail(),

    check('password', 'Please Enter Password min 6 character').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring name,email and password
    const { name, email, password } = req.body;

    try {
      //check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //get users image using gravatar
      //pass user email into method that will get us the url of gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      //create new user instance
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt password using bcrypt
      //create salt to do hashing
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //save user to database
      await user.save();

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
