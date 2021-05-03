//handles user registration
//import express
const express = require('express');

//use express router
const router = express.Router();

//validation to validate the input and report any errors before creating user
const { check, validationResult } = require('express-validator/check');

//POST to register user by sending name,email & password to this route.
router.post(
  '/',
  [
      check('name', 'Name cannot be empty').not().isEmpty(),
      check('email','Please Enter valid email address').isEmail(),
      check('password','Please Enter Password min 6 character').isLength({min:6})

  ],
  (req, res) => {
    //console log the object of data that is being sent to route also require body parser
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    res.send('User route');
  }
);

module.exports = router;
