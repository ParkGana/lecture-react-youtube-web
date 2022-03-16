import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Axios from 'axios';
import { Row, Col } from 'antd';

import Auth from '../../../hoc/auth';
import { SERVER_VIDEO } from '../../Config';

import MainVideo from './Sections/MainVideo';
import SideVideoList from './Sections/SideVideoList';
import Comment from './Sections/Comment';

import '../../css/VideoDetailPage.css';


function VideoDetailPage() {
    const videoId = useParams().videoId;

    const [Video, setVideo] = useState([]);
    const [Videos, setVideos] = useState([]);
    const [MainVideoId, setMainVideoId] = useState('');

    useEffect(() => {
        setMainVideoId(videoId);

        const variables = {
            videoId: videoId
        }

        Axios.post(`${SERVER_VIDEO}/getVideo`, variables)
        .then(response => {
            console.log(response.data);
            if(response.data.getVideoSuccess) {
                setVideo(response.data.video);

                Axios.get(`${SERVER_VIDEO}/getVideos`)
                .then(response => {
                    if(response.data.getVideosSuccess) {
                        setVideos(response.data.videos);
                    }
                    else {
                        alert('영상 목록을 가져오는데 실패하였습니다.');
                    }
                });
            }
            else {
                alert('영상 정보를 가져오는데 실패하였습니다.');
            }
        });
    }, []);

    return (
        <>
            <div className="content">
                <div className="video-detail">
                    <Row gutter={[16, 16]}>
                        <Col lg={16} xs={24}>
                            { Video && Video.map((video, index) => (
                                <React.Fragment key={index}>
                                    <MainVideo uploader={video.uploader} title={video.title} description={video.description} views={video.views} videoPath={video.videoPath} createdAt={video.createdAt} />
                                </React.Fragment>
                            ))}
                            {MainVideoId !== '' && <Comment videoId={MainVideoId} />}
                        </Col>
                        <Col lg={8} xs={24}>
                            <div className="video-detail-side">
                                { MainVideoId !== '' && Videos && Videos.map((video, index) => (
                                    <React.Fragment key={index}>
                                       <SideVideoList mainVideo={MainVideoId} videoId={video._id} uploader={video.uploader} title={video.title} duration={video.duration} views={video.views} thumbnailPath={video.thumbnailPath} createdAt={video.createdAt} />
                                    </React.Fragment>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            
        </>
    )
}

export default Auth(VideoDetailPage, null);
