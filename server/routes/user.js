const express = require('express');
const router = express.Router();

const { auth } = require("../middlewares/auth");
const { User } = require("../models/User");


/****************************************************************************************************
 * 회원가입
 ****************************************************************************************************/
router.post('/signup', (req, res) => {
    const user = new User(req.body);

    user.save((err) => {
        if(err) return res.status(400).json({ signupSuccess: false });
        return res.status(200).json({ signupSuccess: true });
    })
});

/****************************************************************************************************
 * 로그인
 ****************************************************************************************************/
router.post('/signin', (req, res) => {
    // 입력한 이메일로 가입된 계정이 존재하는지 확인
   User.findOne({ 'email': req.body.email }, (err, user) => {
       if(err) return res.status(400).json({ signinSuccess: false });

       // 입력한 이메일로 가입된 계정이 존재하지 않는 경우
       if(!user) {
           return res.status(200).json({ signinSuccess: false, isExist: false });
       }

       // 계정이 존재하는 경우, 입력한 비밀번호가 일치하는지 확인
       user.comparePassword(req.body.password, (err, isMatch) => {
           if(err) return res.status(400).json({ signinSuccess: false });

           // 입력한 비밀번호가 일치하지 않는 경우
           if(!isMatch) {
               return res.status(200).json({ signinSuccess: false, isExist: true, isMatch: false });
           }

           // 로그인에 성공했을 경우, 토큰 생성
           user.generateToken((err, userInfo) => {
               if(err) return res.status(400).json({ signinSuccess: false });

               // 쿠키에 토큰 저장
               res.cookie("x_authExp", userInfo.tokenExp);
               res.cookie('x_auth', userInfo.token);
               return res.status(200).json({ signinSuccess: true, userId: userInfo._id });
           });
       });
   });
});

/****************************************************************************************************
 * 로그아웃
 ****************************************************************************************************/
router.get('/signout', auth, (req, res) => {
    User.findOneAndUpdate({ '_id': req.user._id }, { 'token': '', 'tokenExp': '' }, (err) => {
        if(err) return res.status(400).json({ signoutSuccess: false, isAuth: true });
        return res.status(200).json({ signoutSuccess: true, isAuth: false });
    });
});

/****************************************************************************************************
 * 권한 확인
 ****************************************************************************************************/
router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        profilePath: req.user.profilePath,
        isAuth: true,
        isAdmin: req.user.role === 0 ? false : true
    });
});

/****************************************************************************************************
 * 사용자 정보 가져오기
 ****************************************************************************************************/
router.post('/getUser', (req, res) => {
    User.findOne({ '_id': req.body.userTo }, (err, user) => {
        if(err) return res.status(400).json({ getUserSuccess: false });
        return res.status(200).json({ getUserSuccess: true, user: user });
   });
});

module.exports = router;