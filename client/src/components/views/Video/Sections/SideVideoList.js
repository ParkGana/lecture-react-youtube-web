import React from 'react';
import moment from 'moment';


function SideVideoList(props) {
    return (
        <div className="video-detail-side">
            {props.videos && props.videos.map((video, index) => (
                <React.Fragment key={index}>
                    {props.mainVideoId !== video._id &&
                        <div className="video-detail-side-video">
                            <a href={`/video/${video._id}`}>
                                <img src={`http://localhost:5000/${video.thumbnailPath}`} />
                                <div className="video-detail-side-video-duration">
                                    <span>{Math.floor(video.duration / 60)} : {Math.floor(video.duration - (Math.floor(video.duration / 60)) * 60)}</span>
                                </div>
                            </a>
                            <div className="video-detail-side-video-info">
                                <p>{video.title}</p>
                                <p>{video.uploader.name}</p>
                                <p>조회수 {video.views}회<span>|</span>{moment(video.createdAt).format('YYYY-MM-DD')}</p>
                            </div>
                        </div>
                    }
                </React.Fragment>
            ))}
        </div>
    )  
}

export default SideVideoList;