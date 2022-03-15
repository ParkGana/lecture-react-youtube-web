const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        maxlength: 50,
        unique: true
    },
    name: {
        type: String,
        maxlength: 30
    },
    password: {
        type: String,
        minlength: 8
    },
    role: {
        type: Number,
        default: 0  // 0 : 일반사용자, 1 : 관리자
    },
    profilePath: {
        type: String,
        default: ''
    },
    token: {
        type: String,
        default: ''
    },
    tokenExp: {
        type: String,
        default: ''
    }
});


const User = mongoose.model('User', userSchema);

module.exports = { User };