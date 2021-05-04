//profile crud operations
//handles user registration
//import express
const express = require('express');

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//use express router
const router = express.Router();

//GET api/Profile/personal
//Get current user profile with private access via token
router.get('/personal', auth, async (req,res) => {
   try {
    const userProfile = await Profile.findOne({user:req.user.id}).populate('user',
    ['name','avatar']);

    //check if there is no user profile
    if(!userProfile) {
        res.status(400).json({msg:'Profile does not exist for this user'})
    }

    res.json(userProfile);
   }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error 500');
   }
    
});

module.exports = router;