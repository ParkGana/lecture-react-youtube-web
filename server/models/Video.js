const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const videoSchema = mongoose.Schema({
    uploader: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 100
    },
    description: {
        type: String
    },
    privacy: {
        type: Number,  // 0: private, 1 : public
        default: 0
    },
    category: {
        type: Number,  // 0: Film & Animation, 1: Autos & Vehicles, 2: Music, 3: Pets & Animals, 4: Sports
        default: 0
    },
    duration: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    videoPath: {
        type: String,
        default: ''
    },
    thumbnailPath: {
        type: String,
        default: ''
    }
}, { timestamps: true });


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }