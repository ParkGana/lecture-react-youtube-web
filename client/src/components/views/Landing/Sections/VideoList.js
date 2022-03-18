import React from 'react';
import Axios from 'axios';
import { Card, Avatar } from 'antd';
import moment from 'moment';

import { SERVER_VIDEO } from '../../../Config';

const { Meta } = Card;


function VideoList(props) {
    const onClickVideo = (videoId) => {
        const variables = {
            videoId: videoId
        }

        Axios.post(`${SERVER_VIDEO}/addVideoView`, variables)
        .then(response => {
            if(response.data.addVideoViewSuccess) {

            }
            else {
                alert('조회수 반영에 실패하였습니다.');
            }
        });
    }

    return (
        <div className="video-list">
            {props.videos && props.videos.map((video, index) => (
                <React.Fragment key={index}>
                    <div className="video-list-video">
                        <a href={`/video/${video._id}`} onClick={() => {onClickVideo(video._id)}}>
                            <img src={`http://localhost:5000/${video.thumbnailPath}`} />
                            <div className="video-list-video-duration">
                                <span>{Math.floor(video.duration / 60)} : {Math.floor(video.duration - (Math.floor(video.duration / 60)) * 60)}</span>
                            </div>
                        </a>
                        <div className="video-list-video-info">
                            <Meta avatar={<Avatar src={video.uploader.profilePath} />} title={video.title} />
                            <p>{video.uploader.name}</p>
                            <p>조회수 {video.views}회<span>|</span>{moment(video.createdAt).format('YYYY-MM-DD')}</p>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}

export default VideoList;
