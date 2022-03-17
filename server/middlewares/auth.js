const { User } = require("../models/User");


/****************************************************************************************************
 * 인증 처리
 ****************************************************************************************************/
let auth = (req, res, next) => {
    // 쿠키에 저장된 토큰 값 가져오기
    let token = req.cookies.x_auth;

    User.findByToken(token, (err, userInfo) => {
        if(err) next(err);
        if(!userInfo) return res.json({ _id: '', isAuth: false });
        
        req.token = token;
        req.user = userInfo;
        next();
    });
}

module.exports = { auth }