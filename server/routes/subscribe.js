const express = require('express');
const router = express.Router();

const { Video } = require("../models/Video");
const { Subscribe } = require("../models/Subscribe");


/****************************************************************************************************
 * 구독자 정보 가져오기
 ****************************************************************************************************/
router.post('/getSubscribes', (req, res) => {
    Subscribe.find({ 'userTo': req.body.userTo })
    .exec((err, subscribes) => {
        if(err) return res.status(400).json({ getSubscribesSuccess: false });
        return res.status(200).json({ getSubscribesSuccess: true, subscribes: subscribes });
    });
});

/****************************************************************************************************
 * 구독
 ****************************************************************************************************/
router.post('/addSubscribe', (req, res) => {
    const subscribe = new Subscribe(req.body);

    subscribe.save((err) => {
        if(err) return res.status(400).json({ addSubscribeSuccess: false });
        return res.status(200).json({ addSubscribeSuccess: true });
    })

});

/****************************************************************************************************
 * 구독 취소
 ****************************************************************************************************/
router.post('/removeSubscribe', (req, res) => {
    Subscribe.findOneAndDelete(req.body)
    .exec((err)=>{
        if(err) return res.status(400).json({ removeSubscribeSuccess: false });
        return res.status(200).json({ removeSubscribeSuccess: true });
    });
});

/****************************************************************************************************
 * 전체 영상 목록 가져오기
 ****************************************************************************************************/
router.get('/getAllVideos', (req, res) => {
    Subscribe.find(req.body)
    .populate('userTo')
    .exec((err, subscribes)=> {
        if(err) return res.status(400).json({ getAllVideosSuccess: false });

        let userTo = [];

        subscribes.map((subscribe, index)=> {
            userTo.push(subscribe.userTo);
        });


        Video.find({ uploader: { $in: userTo }})
        .populate('uploader')
        .exec((err, videos) => {
            if(err) return res.status(400).json({ getAllVideosSuccess: false });
            return res.status(200).json({ getAllVideosSuccess: true, userTo: userTo, videos: videos });
        });
    });
});

/****************************************************************************************************
 * 특정 영상 목록 가져오기
 ****************************************************************************************************/
 router.post('/getSpecificVideos', (req, res) => {
     console.log(req.body);
    Video.find(req.body)
    .populate('uploader')
    .exec((err, videos) => {
        if(err) return res.status(400).json({ getSpecificVideosSuccess: false });
        return res.status(200).json({ getSpecificVideosSuccess: true, videos: videos });
    });
});

module.exports = router;