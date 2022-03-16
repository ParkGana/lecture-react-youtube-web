import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Auth from '../../../hoc/auth';
import { SERVER_VIDEO } from '../../Config';

import VideoList from './Sections/VideoList';

import '../../css/LandingPage.css';


function LandingPage() {
    const [Videos, setVideos] = useState([]);

    useEffect(() => {
        Axios.get(`${SERVER_VIDEO}/getVideos`)
        .then(response => {
            if(response.data.getVideosSuccess) {
                setVideos(response.data.videos);
            }
            else {
                alert('영상 목록을 가져오는데 실패하였습니다.');
            }
        });
    }, []);

    return (
        <>
            <div className="content">
                <div className="video-list">
                    { Videos && Videos.map((video, index) => (
                        <React.Fragment key={index}>
                            <VideoList videoId={video._id} uploader={video.uploader} title={video.title} duration={video.duration} views={video.views} thumbnailPath={video.thumbnailPath} createdAt={video.createdAt} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Auth(LandingPage, null);