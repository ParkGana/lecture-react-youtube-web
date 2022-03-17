import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Auth from '../../../hoc/auth';
import { SERVER_SUBSCRIBE } from '../../Config';

import UserTo from './Sections/UserTo';
import VideoList from '../Landing/Sections/VideoList';

import '../../css/SubscribePage.css';


function SubscribePage() {
    const [Subscribes, setSubscribes] = useState([]);
    const [Videos, setVideos] = useState([]);

    useEffect(() => {
        const variables = {
            userFrom: localStorage.getItem('userId')
        }

        Axios.post(`${SERVER_SUBSCRIBE}/getAllVideos`, variables)
        .then(response => {
            if(response.data.getAllVideosSuccess) {
                setSubscribes(response.data.userTo);
                setVideos(response.data.videos);
            }
            else {
                alert('영상 목록을 가져오는데 실패하였습니다.');
            }
        });
    }, []);

    const onRefreshVideos = (videos) => {
        setVideos(videos);
    }

    return (
        <>
            <div className="content">
                <div className="subscribe">
                    <UserTo userTo={Subscribes} onRefreshVideos={onRefreshVideos} />
                    <VideoList videos={Videos} />
                </div>
            </div>
        </>
    )
}

export default Auth(SubscribePage, true);
