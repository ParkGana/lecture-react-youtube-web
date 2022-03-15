const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');


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

/****************************************************************************************************
 * 비밀번호 확인
 ****************************************************************************************************/
userSchema.methods.comparePassword = function(plainPassword, cb) {
    // 비밀번호를 복호화한 뒤 입력한 비밀번호 값과 일치하는지 확인
   bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
       if(err) return cb(err);
       cb(null, isMatch);
   });
}

/****************************************************************************************************
 * 토큰 생성
 ****************************************************************************************************/
userSchema.methods.generateToken = function(cb) {
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secret');
    var oneHour = moment().add(1, 'hour').valueOf();

    user.token = token;
    user.tokenExp = oneHour;

    user.save(function(err, userInfo) {
        if(err) return cb(err);
        cb(null, userInfo);
    });
}


const User = mongoose.model('User', userSchema);

module.exports = { User };