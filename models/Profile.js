const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    //create reference to user model - every profile is associate with user

     user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
     },
     organisation: {
        type: String
      },
      website: {
        type: String
      },
      location: {
        type: String
      },
      title: {
        type: String,
        required: true
      },
      certifications: {
        type: [String],
        required: true
      },
      skills: {
        type: [String],
        required: true
      },
      about: {
        type: String
      },
      githubuser: {
        type: String
      },
      experience: [
        {
          title: {
            type: String,
            required: true
          },
          company: {
            type: String,
            required: true
          },
          location: {
            type: String
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String
          }
        }
      ],
      education: [
        {
          school: {
            type: String,
            required: true
          },
          degree: {
            type: String,
            required: true
          },
          fieldofstudy: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String
          }
        }
      ],
      socialmedia: {
        youtube: {
          type: String
        },
        twitter: {
          type: String
        },
        facebook: {
          type: String
        },
        linkedin: {
          type: String
        },
        instagram: {
          type: String
        }
      },
      date: {
        type: Date,
        default: Date.now
      }

});

module.exports = Profile = mongoose.model('profile',ProfileSchema);