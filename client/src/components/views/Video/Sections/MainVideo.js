import React from 'react';
import { Card, Avatar } from 'antd';
import moment from 'moment';

const { Meta } = Card;


function MainVideo(props) {
    return (
        <div className="video-detail-main">
            <video src={`http://localhost:5000/${props.videoPath}`} controls />
            <div className="video-detail-main-info">
                <p>{props.title}</p>
                <p>{props.description}</p>
                <p>조회수 {props.views}회<span>|</span>{moment(props.createdAt).format('YYYY-MM-DD')}</p>
            </div>
            <div className="video-detail-main-uploader">
                <Meta avatar={<Avatar src={props.uploader.profilePath} />} title={props.uploader.name} description />
            </div>
        </div>
    )
}

export default MainVideo;