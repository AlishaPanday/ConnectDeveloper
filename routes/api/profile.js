//profile create and update operations
//import express,auth middleware, models, request, config
const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
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
      return res
        .status(400)
        .json({ msg: 'Profile does not exist for this user' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res
        .status(400)
        .json({ msg: 'Profile does not exist for this user' });
    }
    res.status(500).send('Internal Server Error');
  }
});

//Delete Profile
//add auth middleware as it is private and have access to token
router.delete('/', auth, async (req, res) => {
  try {
    //Remove user profile
    await Profile.findOneAndRemove({ user: req.user.id });
    //Remove user account
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User account Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

//put request to add profile experience
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructuring req.body
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const addExp = { title, company, location, from, to, current, description };

    try {
      //fetch profile first to add experience
      const profile = await Profile.findOne({ user: req.user.id });

      //unshift method is  to show up recent experience at the top
      profile.experience.unshift(addExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

//Delete Experience
//add auth middleware as it is private and have access to token
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    //fetch the profile of user
    const fetchProfile = await Profile.findOne({ user: req.user.id });

    //getting index of experience
    const indexRemove = fetchProfile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    //splice out
    fetchProfile.experience.splice(indexRemove, 1);

    //save profile
    await fetchProfile.save();

    //sending back response
    res.json(fetchProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});


//put request to add  education
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //destructuring req.body
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const addEdu = { school, degree, fieldofstudy, from, to, current, description };

    try {
      //fetch profile first to add experience
      const profile = await Profile.findOne({ user: req.user.id });

      //unshift method is  to show up recent experience at the top
      profile.education.unshift(addEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

//Delete Education
//add auth middleware as it is private and have access to token
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    //fetch the profile of user
    const fetchProfile = await Profile.findOne({ user: req.user.id });

    //getting index of experience
    const indexRemove = fetchProfile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    //splice out
    fetchProfile.education.splice(indexRemove, 1);

    //save profile
    await fetchProfile.save();

    //sending back response
    res.json(fetchProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

//get api/profile/github/:username to get user repos from github

router.get('/github/:username',(req,res)=>{
  try{
    const options = {
      uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&
      sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=
      ${config.get('githubSecret')}`,
      method:'GET',
      headers:{'user-agent':'node.js'}

    };

    request(options,(error,response,body) => {
      if(error) console.error(error);
      if(response.statusCode !== 200){
        return res.status(400).json({msg:'No Github profile found'});
      }

      res.json(JSON.parse(body));

    });
  }catch(err){
    console.error(err.message);
    res.status(500).send('Internal Server Error');

  }
})
module.exports = router;
