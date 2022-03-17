import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Auth from '../../../hoc/auth';
import { SERVER_VIDEO } from '../../Config';

import SearchBar from './Sections/SearchBar';
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
                <SearchBar />
                <VideoList videos={Videos} />
            </div>
        </>
    )
}

export default Auth(LandingPage, null);