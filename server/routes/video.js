const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

const { Video } = require("../models/Video");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/videos/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        if(ext !== '.mp4') return cb(res.status(400).end('only mp4 is allowed'), false);
        cb(null, true);
    }
});

const upload = multer({ storage: storage }).single('file');


/****************************************************************************************************
 * 파일 업로드
 ****************************************************************************************************/
router.post('/dropVideo', (req, res) => {
    upload(req, res, err => {
        if(err) return res.status(400).json({ dropVideoSuccess: false });
        return res.status(200).json({ dropVideoSuccess: true, videoPath: res.req.file.path });
    });
});

/****************************************************************************************************
 * 썸네일 생성
 ****************************************************************************************************/
router.post('/createThumbnail', (req, res) => {
    let duration = '';
    let thumbnailPath = '';

    ffmpeg.ffprobe(req.body.videoPath, function(err, data) {
        duration = data.format.duration;
    });

    ffmpeg(req.body.videoPath)
    .on('filenames', function(filenames) {
        thumbnailPath = 'uploads/thumbnails/' + filenames[0];
    })
    .on('end', function() {
        return res.status(200).json({ createThumbnailSuccess: true, duration: duration, thumbnailPath: thumbnailPath });
    })
    .on('error', function(err) {
        return res.status(400).json({ createThumbnailSuccess: false });
    })
    .screenshots({
        count: 1,
        folder: 'uploads/thumbnails/',
        size: '480x270',
        filename: 'thumbnail-%b.png'
    });
});

/****************************************************************************************************
 * 영상 업로드
 ****************************************************************************************************/
router.post('/uploadVideo', (req, res) => {
    const video = new Video(req.body);

    video.save((err) => {
        if(err) return res.status(400).json({ uploadVideoSuccess: false });
        return res.status(200).json({ uploadVideoSuccess: true });
    });
});

/****************************************************************************************************
 * 영상 목록 가져오기
 ****************************************************************************************************/
router.get('/getVideos', (req, res) => {
    Video.find()
    .populate('uploader')
    .exec((err, videos) => {
        if(err) return res.status(400).json({ getVideosSuccess: false });
        return res.status(200).json({ getVideosSuccess: true, videos: videos });
    });
});

module.exports = router;