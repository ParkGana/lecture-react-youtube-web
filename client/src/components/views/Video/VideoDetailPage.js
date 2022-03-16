import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Axios from 'axios';
import { Row, Col } from 'antd';

import Auth from '../../../hoc/auth';
import { SERVER_VIDEO, SERVER_COMMENT } from '../../Config';

import MainVideo from './Sections/MainVideo';
import SideVideoList from './Sections/SideVideoList';
import Comment from './Sections/Comment';

import '../../css/VideoDetailPage.css';


function VideoDetailPage() {
    const videoId = useParams().videoId;

    const [Video, setVideo] = useState([]);
    const [Videos, setVideos] = useState([]);
    const [MainVideoId, setMainVideoId] = useState('');
    const [Comments, setComments] = useState([]);

    useEffect(() => {
        setMainVideoId(videoId);

        const variables = {
            videoId: videoId
        }

        Axios.post(`${SERVER_VIDEO}/getVideo`, variables)
        .then(response => {
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

        Axios.post(`${SERVER_COMMENT}/getComments`, variables)
        .then(response => {
            if (response.data.getCommentsSuccess) {
                setComments(response.data.comments);
            } else {
                alert('댓글 목록을 가져오는데 실패하였습니다.');
            }
        });
    }, []);

    return (
        <>
            <div className="content">
                <div className="video-detail">
                    <Row gutter={[16, 16]}>
                        <Col lg={16} xs={24}>
                            <MainVideo video={Video} />
                            <Comment videoId={MainVideoId} comments={Comments} />
                        </Col>
                        <Col lg={8} xs={24}>
                            <SideVideoList mainVideoId={MainVideoId} videos={Videos} />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Auth(VideoDetailPage, null);