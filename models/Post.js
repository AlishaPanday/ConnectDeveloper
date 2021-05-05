const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    //post connected to user
    //user can only delete their post 
    //shows which user created the post
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type: String,
        required:true
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    like:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'users'
            },
            text:{
                type:String,
                required:true,
            },
            name:{
                type:String
            },
            avatar:{
                type:String
            },
            date:{
                type:Date,
                defualt:Date.now
            }

        }
    ],
    date:{
        type:Date,
        defualt:Date.now
    }
});
module.exports = Post = mongoose.model('post',PostSchema);