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

//Get request to all private api/posts
router.get('/', auth, async (req, res) => {
  try {
    //find most recent post from db sort by date
    const fetchPost = await Post.find().sort({ date: -1 });
    res.json(fetchPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

//Get request to private api/posts/:id by user ID
router.get('/:id', auth, async (req, res) => {
  try {
    //find post by user ID
    const fetchPostById = await Post.findById(req.params.id);
    //check if Post exists with that user ID
    if (!fetchPostById) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(fetchPostById);
  } catch (err) {
    //if passed Inavlid object Id
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Internal Server Error');
  }
});

//Delete request from  private api/posts/:id by user ID
router.delete('/:id', auth, async (req, res) => {
  try {
    //find most recent post by id
    const fetchPost = await Post.findById(req.params.id);

    //if Post does not exist
    if (!fetchPost) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    //check user to delete post by matching it with the login user
    if (fetchPost.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorised' });
    }

    await fetchPost.remove();
    res.json({ msg: 'Post Deleted' });
  } catch (err) {
    console.error(err.message);
    //if invalid Post Id
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Internal Server Error');
  }
});

//Put(update like in like array ) request for private api/posts/like/:id
router.put('/like/:id', auth, async (req, res) => {
  try {
    //fetch the post by ID
    const fetchPost = await Post.findById(req.params.id);

    //check if the post is already liked by user using filter & compare current user to user i.e logged in.
    if (fetchPost.like.filter(like => like.user.toString() === req.user.id).length > 0) 
    {
      return res.status(400).json({ msg: 'You liked the post already' });
    }

    //if user hasnt already liked it, take that post like and add to like array using unshift method
    fetchPost.like.unshift({ user: req.user.id });

    //save it db
    await fetchPost.save();
    res.json(fetchPost.like);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

//Put request for private api/posts/unlike/:id
//unlike a post
router.put('/unlike/:id', auth, async (req, res) => {
    try {
      //fetch the post by ID
      const fetchPost = await Post.findById(req.params.id);
  
      //check if the post hasnt yet been liked
      if (fetchPost.like.filter(like => like.user.toString() === req.user.id).length === 0) 
      {
        return res.status(400).json({ msg: 'Post has not been liked' });
      }
  
      //remove like
      const removeIndex = fetchPost.like.map(like => like.user.toString()).indexOf(req.user.id);

      //splice out from the array
      fetchPost.like.splice(removeIndex, 1);
  
      //save it db
      await fetchPost.save();
      res.json(fetchPost.like);
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
