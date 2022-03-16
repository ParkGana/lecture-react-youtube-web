const express = require('express');
const router = express.Router();

const { Like } = require("../models/Like");


/****************************************************************************************************
 * 좋아요/싫어요 개수 가져오기
 ****************************************************************************************************/
router.post("/getLikes", (req, res) => {
    let variables = {};

    if (req.body.videoId) variables = { videoId: req.body.videoId, isLike: true }
    else variables = { commentId: req.body.commentId, isLike: true }

    Like.find(variables)
    .exec((err, likes) => {
        if(err) return res.status(400).json({ getLikesSuccess: false });

        if (req.body.videoId) variables = { videoId: req.body.videoId, isLike: false }
        else variables = { commentId: req.body.commentId, isLike: false }

        Like.find(variables)
        .exec((err, dislikes) => {
            if(err) return res.status(400).json({ getLikesSuccess: false });
            return res.status(200).json({ getLikesSuccess: true, likes: likes, dislikes: dislikes });
        });
    });
});

/****************************************************************************************************
 * 좋아요 추가
 ****************************************************************************************************/
router.post("/addLike", (req, res) => {
    let variables = {};

    if (req.body.videoId) variables = { videoId: req.body.videoId, userId: req.body.userId, isLike: true }
    else variables = { commentId: req.body.commentId, userId: req.body.userId, isLike: true }

    const like = new Like(variables);

    like.save((err) => {
        if(err) return res.status(400).json({ addLikeSuccess: false });
        return res.status(200).json({ addLikeSuccess: true });
    });
});

/****************************************************************************************************
 * 싫어요 추가
 ****************************************************************************************************/
router.post("/addDislike", (req, res) => {
    let variables = {};

    if (req.body.videoId) variables = { videoId: req.body.videoId, userId: req.body.userId, isLike: false }
    else variables = { commentId: req.body.commentId, userId: req.body.userId, isLike: false }

    const dislike = new Like(variables);

    dislike.save((err) => {
        if(err) return res.status(400).json({ addDislikeSuccess: false });
        return res.status(200).json({ addDislikeSuccess: true });
    });
});

/****************************************************************************************************
 * 좋아요를 싫어요로 변경
 ****************************************************************************************************/
router.post("/updateLike", (req, res) => {
    if(req.body.videoId) {
        Like.findOneAndUpdate({ 'userId': req.body.userId, 'videoId': req.body.videoId }, { 'isLike': false }, (err) => {
            if(err) return res.status(400).json({ updateLikeSuccess: false });
            return res.status(200).json({ updateLikeSuccess: true });
        });
    }
    else {
        Like.findOneAndUpdate({ 'userId': req.body.userId, 'commentId': req.body.commentId }, { 'isLike': false }, (err) => {
            if(err) return res.status(400).json({ updateLikeSuccess: false });
            return res.status(200).json({ updateLikeSuccess: true });
        });
    }
});

/****************************************************************************************************
 * 싫어요를 좋아요로 변경
 ****************************************************************************************************/
router.post("/updateDislike", (req, res) => {
    if(req.body.videoId) {
        Like.findOneAndUpdate({ 'userId': req.body.userId, 'videoId': req.body.videoId }, { 'isLike': true }, (err) => {
            if(err) return res.status(400).json({ updateDislikeSuccess: false });
            return res.status(200).json({ updateDislikeSuccess: true });
        });
    }
    else {
        Like.findOneAndUpdate({ 'userId': req.body.userId, 'commentId': req.body.commentId }, { 'isLike': true }, (err) => {
            if(err) return res.status(400).json({ updateDislikeSuccess: false });
            return res.status(200).json({ updateDislikeSuccess: true });
        });
    }
});

/****************************************************************************************************
 * 좋아요 제거
 ****************************************************************************************************/
router.post("/removeLike", (req, res) => {
    Like.findOneAndDelete(req.body)
    .exec((err) => {
        if(err) return res.status(400).json({ removeLikeSuccess: false });
        return res.status(200).json({ removeLikeSuccess: true });
    });
});

/****************************************************************************************************
 * 싫어요 제거
 ****************************************************************************************************/
router.post("/removeDislike", (req, res) => {
    Like.findOneAndDelete(req.body)
    .exec((err) => {
        if(err) return res.status(400).json({ removeDislikeSuccess: false });
        return res.status(200).json({ removeDislikeSuccess: true });
    });
});

module.exports = router;