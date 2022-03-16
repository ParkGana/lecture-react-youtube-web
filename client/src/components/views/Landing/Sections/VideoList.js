import React from 'react';
import { Card, Avatar } from 'antd';
import moment from 'moment';

const { Meta } = Card;


function VideoList(props) {
    var minutes = Math.floor(props.duration / 60);
    var seconds= Math.floor(props.duration - minutes * 60);

    return (
        <div className="video-list-video">
            <a href={`/video/${props.videoId}`}>
                <img src={`http://localhost:5000/${props.thumbnailPath}`} />
                <div className="video-list-video-duration">
                    <span>{minutes} : {seconds}</span>
                </div>
            </a>
            <div className="video-list-video-info">
                <Meta avatar={<Avatar src={props.uploader.profilePath} />} title={props.title} />
                <p>{props.uploader.name}</p>
                <p>조회수 {props.views}회<span>|</span>{moment(props.createdAt).format('YYYY-MM-DD')}</p>
            </div>
        </div>
    )
}

export default VideoList;
