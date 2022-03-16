import React from 'react';
import moment from 'moment';

import LikeDislike from './LikeDislike';
import Subscribe from './Subscribe';


function MainVideo(props) {
    return (
        <div className="video-detail-main">
            {props.video && props.video.map((video, index) => (
                <React.Fragment key={index}>
                    <video src={`http://localhost:5000/${video.videoPath}`} controls />
                    <div className="video-detail-main-info">
                        <p>{video.title}</p>
                        <p>{video.description}</p>
                        <p>조회수 {video.views}회<span>|</span>{moment(video.createdAt).format('YYYY-MM-DD')}</p>
                        <span></span>
                        <LikeDislike video videoId={props.videoId} userId={localStorage.getItem('userId')} />
                    </div>
                        <Subscribe video={video} userTo={video.uploader._id} userFrom={localStorage.getItem('userId')} />
                </React.Fragment>
            ))}
        </div>
    )
}

export default MainVideo;