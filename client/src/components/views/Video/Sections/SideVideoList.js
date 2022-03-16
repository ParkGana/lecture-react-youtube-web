import React from 'react';
import moment from 'moment';


function SideVideoList(props) {
    var minutes = Math.floor(props.duration / 60);
    var seconds= Math.floor(props.duration - minutes * 60);

    if(props.mainVideo !== props.videoId) {
        return (
            <div className="video-detail-side-video">
                <a href={`/video/${props.videoId}`}>
                    <img src={`http://localhost:5000/${props.thumbnailPath}`} />
                    <div className="video-detail-side-video-duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
                <div className="video-detail-side-video-info">
                    <p>{props.title}</p>
                    <p>{props.uploader.name}</p>
                    <p>조회수 {props.views}회<span>|</span>{moment(props.createdAt).format('YYYY-MM-DD')}</p>
                </div>
            </div>
        )  
    }
    else {
        return (
            <div>
                
            </div>
        )
    }
}

export default SideVideoList;
