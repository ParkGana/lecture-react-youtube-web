import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { Card, Avatar, Form, Input, Button } from 'antd';
import { LikeOutlined, DislikeOutlined, EditOutlined } from '@ant-design/icons';

import { SERVER_COMMENT } from '../../../Config';

const { Meta } = Card;
const { TextArea } = Input;


function ParentCommentList(props) {
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [CommentRe, setCommentRe] = useState('');
    const [OpenChildComment, setOpenChildComment] = useState(false);

    const onChangeCommentRe = (e) => {
        setCommentRe(e.currentTarget.value);
    }

    const onToggleChildComment = (e) => {
        setOpenChildComment(!OpenChildComment);
    }

    const onWriteCommentRe = (e) => {
        if(user.userData.isAuth) {
            // e.preventDefault();

            const variables = {
                writer: user.userData._id,
                content: CommentRe,
                videoId: props.videoId,
                parentCommentId: props.commentId
            }
    
            Axios.post(`${SERVER_COMMENT}/writeComment`, variables)
            .then(response => {
                console.log(response.data);
                if (response.data.writeCommentSuccess) {
                    setCommentRe('');
                    // props.refreshFunction(response.data.result)
                }
                else {
                    alert('댓글 작성에 실패하였습니다.');
                }
            });
        }
        else {
            navigate('/signin');
        }
    }

    return (
        <div className="video-detail-comment-parent">
            <Meta avatar={<Avatar src={props.writer.profilePath} />} title={props.writer.name} />
            <p>{props.content}</p>
            <p>
                <span></span>
                <span><LikeOutlined /></span>
                <span><DislikeOutlined /></span>
                <span onClick={onToggleChildComment}>답글 작성</span>
            </p>
            {OpenChildComment &&
                <Form className="video-detail-comment-child-form" autoComplete="off" onFinish={onWriteCommentRe}>
                    <Form.Item>
                        <TextArea placeholder="Write some comments" value={CommentRe} onChange={onChangeCommentRe} />
                    </Form.Item>
                    <Form.Item>
                        <Button className="video-detail-comment-child-form-btn" type="primary" htmlType="submit"><EditOutlined /></Button>
                    </Form.Item>
                </Form>
            }
        </div>
    )
}

export default ParentCommentList;
