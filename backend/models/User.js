const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },

    lastName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 255,
        trim:true
    },

    picture: {
        type: String,
        required: true
    },

    designation:{
        type:String,
        minlength:5,
        maxlength:100,
        trim:true
    },

    websiteUrl:{
        type:String,
        minlength:5,
        maxlength:255,
        trim:true
    },

    gender:{
        type:String,
    },

    birthday:{
        type:Date,
        default: Date.now()
    },

    city:{
        type:String,
        minlength:3,
        maxlength:50,
        trim:true
    },

    state:{
        type:String,
        minlength:3,
        maxlength:50,
        trim:true
    },

    zip:{
        type:String,
        minlength:5,
        maxlength:10,
        trim:true
    },

    isAdmin:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('User',userSchema);


module.exports = User;
