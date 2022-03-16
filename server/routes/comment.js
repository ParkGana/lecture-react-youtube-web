const express = require('express');
const router = express.Router();

const { Comment } = require("../models/Comment");


/****************************************************************************************************
 * 댓글 작성
 ****************************************************************************************************/
router.post('/writeComment', (req, res) => {
    const comment = new Comment(req.body);

    comment.save((err, comment) => {
        if (err) return res.status(400).json({ writeCommentSuccess: false });

        Comment.find({ '_id': comment._id })
        .populate('writer')
        .exec((err, comment) => {
            if (err) return res.status(400).json({ writeCommentSuccess: false });
            return res.status(200).json({ writeCommentSuccess: true, comment: comment });
        });
    });
})

module.exports = router;