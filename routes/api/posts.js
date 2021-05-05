//handles user's Post/like & Comments

//import express,auth middleware, express-validator
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
// const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

//Post request to private api/posts
router.post(
  '/',
  [
    auth,
    [
      //check for text field
      check('text', 'Text is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const addPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const newPost = await addPost.save();
      //send Json response
      res.json(newPost);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

module.exports = router;
