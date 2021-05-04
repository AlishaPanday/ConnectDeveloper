//profile create and update operations
//import express,auth middleware, models
const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

//use express router
const router = express.Router();

//GET api/Profile/personal
//Get current user profile with private access via token
router.get('/personal', auth, async (req, res) => {
  try {
    const userProfile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    //check if there is no user profile
    if (!userProfile) {
      res.status(400).json({ msg: 'Profile does not exist for this user' });
    }

    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 500');
  }
});

//POST api/Profile/personal
//Perfrom create or update profile in private route

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty(),
    ],
  ],
  //check for the errors
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring req.body
    const {
      organisation,
      website,
      location,
      about,
      title,
      githubuser,
      skills,
      youtube,
      facebook,
      linkedin,
      twitter,
      instagram,
    } = req.body;

    //Created Profile object to insert into DB.
    const profileSector = {};
    profileSector.user = req.user.id;
    if (organisation) profileSector.organisation = organisation;
    if (website) profileSector.website = website;
    if (location) profileSector.location = location;
    if (about) profileSector.about = about;
    if (title) profileSector.title = title;
    if (githubuser) profileSector.githubuser = githubuser;
    if (skills) {
      profileSector.skills = skills.split(',').map(skill => skill.trim());
    }

    //Create Social Media object
    profileSector.socialmedia = {};
    if (youtube) profileSector.socialmedia.youtube = youtube;
    if (linkedin) profileSector.socialmedia.linkedin = linkedin;
    if (facebook) profileSector.socialmedia.facebook = facebook;
    if (instagram) profileSector.socialmedia.instagram = instagram;
    if (twitter) profileSector.socialmedia.twitter = twitter;

    //find a profile by a user

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      //update if profile is found and send back to profile

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileSector },
          { new: true }
        );
        return res.json(profile);
      }

      //Create Profile if not found, save it and send back to profile

      profile = new Profile(profileSector);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }

    console.log(profileSector.socialmedia.twitter);
    res.send('hello');
  }
);

//Get request to all public profiles

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});
//Get request to profiles by user Id

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile)
        return res.status(400).json({ msg: 'Profile does not exist for this user' }); 

    res.json(profile);
     
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId'){
        return res.status(400).json({ msg: 'Profile does not exist for this user' }); 

    }
    res.status(500).send('Internal Server Error');
  }
});

//Delete Profile
//add auth middleware as it is private and have access to token
router.delete('/', auth, async (req, res) => {
    try {
     //Remove user profile
      await Profile.findOneAndRemove({user:req.user.id});
     //Remove user account
      await User.findOneAndRemove({_id:req.user.id});
      res.json({msg:"User account Deleted"});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
