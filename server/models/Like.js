const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const likeSchema = mongoose.Schema({
   user: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   videoId: {
       type: Schema.Types.ObjectId,
       ref: 'Video'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment'
   },
   isLike: {
       type: Number  // 0 : false, 1 : true
   }

}, { timestamps: true })


const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }
