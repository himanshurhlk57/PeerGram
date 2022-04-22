const mongoose = require("mongoose");


const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim:true
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
    }
})

const Login = mongoose.model('Login',loginSchema);


module.exports = Login;
