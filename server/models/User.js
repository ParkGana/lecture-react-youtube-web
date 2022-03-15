const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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


/****************************************************************************************************
 * 비밀번호 암호화
 ****************************************************************************************************/
userSchema.pre('save', function(next) {
    var user = this;

    // 비밀번호를 변경하는 경우  ex) 회원가입, 비밀번호 변경 등
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                
                user.password = hash;
                next();
            });
        });
    }
    // 비밀번호를 변경하지 않는 경우  ex) 회원 정보 변경 등
    else {
        next();
    }
});


const User = mongoose.model('User', userSchema);

module.exports = { User };