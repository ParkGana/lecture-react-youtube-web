import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { LikeOutlined, LikeFilled, DislikeOutlined, DislikeFilled } from '@ant-design/icons';

import { SERVER_LIKE } from '../../../Config';


function LikeDislike(props) {
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [LikeNumber, setLikeNumber] = useState(0);
    const [DislikeNumber, setDislikeNumber] = useState(0);
    const [Liked, setLiked] = useState(false);
    const [Disliked, setDisliked] = useState(false);

    let variables = {};

    if (props.video) {
        variables = { 
            videoId: props.videoId,
            userId: props.userId
        }
    }
    else {
        variables = {
            commentId: props.commentId,
            userId: props.userId
        }
    }

    useEffect(() => {
        Axios.post(`${SERVER_LIKE}/getLikes`, variables)
        .then(response => {
            if (response.data.getLikesSuccess) {
                setLikeNumber(response.data.likes.length);
                setDislikeNumber(response.data.dislikes.length);

                response.data.likes.map(like => {
                    if (like.userId === props.userId) {
                        setLiked(true);
                    }
                });

                response.data.dislikes.map(dislike => {
                    if (dislike.userId === props.userId) {
                        setDisliked(true);
                    }
                });
            }
            else {
                alert('좋아요/싫어요 현황을 가져오는데 실패하였습니다.');
            }
        });
    }, []);

    const onLike = () => {
        if(user.userData.isAuth) {
            if(Liked) {
                Axios.post(`${SERVER_LIKE}/removeLike`, variables)
                .then(response => {
                    if (response.data.removeLikeSuccess) {
                        setLikeNumber(LikeNumber - 1);
                        setLiked(false);
                    }
                    else {
                        alert('좋아요/싫어요 제거에 실패하였습니다.');
                    }
                });
            }
            else {
                if(Disliked) {
                    Axios.post(`${SERVER_LIKE}/updateDislike`, variables)
                    .then(response => {
                        if (response.data.updateDislikeSuccess) {
                            setLikeNumber(LikeNumber + 1);
                            setDislikeNumber(DislikeNumber - 1);

                            setLiked(true);
                            setDisliked(false);
                        }
                        else {
                            alert('좋아요/싫어요 변경에 실패하였습니다.');
                        }
                    });
                }
                else {
                    Axios.post(`${SERVER_LIKE}/addLike`, variables)
                    .then(response => {
                        if (response.data.addLikeSuccess) {
                            setLikeNumber(LikeNumber + 1);
                            setLiked(true);
                        }
                        else {
                            alert('좋아요/싫어요 추가에 실패하였습니다.');
                        }
                    });
                }
            }
        }
        else {
            navigate('/signin');
        }
    }

    const onDislike = () => {
        if(user.userData.isAuth) {
            if(Disliked) {
                Axios.post(`${SERVER_LIKE}/removeDislike`, variables)
                .then(response => {
                    if (response.data.removeDislikeSuccess) {
                        setDislikeNumber(DislikeNumber - 1);
                        setDisliked(false);
                    }
                    else {
                        alert('좋아요/싫어요 제거에 실패하였습니다.');
                    }
                });
            }
            else {
                if(Liked) {
                    Axios.post(`${SERVER_LIKE}/updateLike`, variables)
                    .then(response => {
                        if (response.data.updateLikeSuccess) {
                            setLikeNumber(LikeNumber - 1);
                            setDislikeNumber(DislikeNumber + 1);

                            setLiked(false);
                            setDisliked(true);
                        }
                        else {
                            alert('좋아요/싫어요 변경에 실패하였습니다.');
                        }
                    });
                }
                else {
                    Axios.post(`${SERVER_LIKE}/addDislike`, variables)
                    .then(response => {
                        if (response.data.addDislikeSuccess) {
                            setDislikeNumber(DislikeNumber + 1);
                            setDisliked(true);
                        }
                        else {
                            alert('좋아요/싫어요 추가에 실패하였습니다.');
                        }
                    });
                }
            }
        }
        else {
            navigate('/signin');
        }
    }

    return (
        <div className="video-detail-like">
            <span onClick={onLike}>{Liked ? <LikeFilled /> : <LikeOutlined />} {LikeNumber}</span>
            <span onClick={onDislike}>{Disliked ? <DislikeFilled /> : <DislikeOutlined />} {DislikeNumber}</span>
        </div>
    )
}

export default LikeDislike;
