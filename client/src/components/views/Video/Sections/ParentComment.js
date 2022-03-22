import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { Card, Avatar, Form, Input, Button } from 'antd';
import { EditOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

import { SERVER_COMMENT } from '../../../Config';

import LikeDislike from './LikeDislike';
import ChildComment from './ChildComment';

const { Meta } = Card;
const { TextArea } = Input;



function ParentCommentList(props) {
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [CommentRe, setCommentRe] = useState('');
    const [CommentReNumber, setCommentReNumber] = useState(0);
    const [OpenChildCommentWrite, setOpenChildCommentWrite] = useState(false);
    const [OpenChildComment, setOpenChildComment] = useState(false);

    const onChangeCommentRe = (e) => {
        setCommentRe(e.currentTarget.value);
    }

    const onToggleChildCommentWrite = (e) => {
        setOpenChildCommentWrite(!OpenChildCommentWrite);
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
                videoId: props.comment.videoId,
                parentCommentId: props.comment._id
            }
    
            Axios.post(`${SERVER_COMMENT}/writeComment`, variables)
            .then(response => {
                if (response.data.writeCommentSuccess) {
                    setCommentRe('');
                    setOpenChildCommentWrite(false);
                    setOpenChildComment(false);
                    props.onRefreshComment(response.data.comment);
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

    useEffect(() => {
        let number = 0;

        props.comments.map((comment) => {
            if (props.comment._id === comment.parentCommentId) {
                number++;
            }
        });
        
        setCommentReNumber(number);
    }, [props.comments, props.comment._id]);

    return (
        <div className="video-detail-comment-parent">
            <Meta avatar={<Avatar src={`http://localhost:5000/${props.comment.writer.profilePath}`} />} title={props.comment.writer.name} />
            <p>{props.comment.content}</p>
            <p>
                <span></span>
                <LikeDislike commentId={props.comment._id} userId={localStorage.getItem('userId')} />
                <span onClick={onToggleChildCommentWrite}>답글 작성</span>
            </p>
            {OpenChildCommentWrite &&
                <Form className="video-detail-comment-child-form" autoComplete="off" onFinish={onWriteCommentRe}>
                    <Form.Item>
                        <TextArea placeholder="Write some comments" value={CommentRe} onChange={onChangeCommentRe} />
                    </Form.Item>
                    <Form.Item>
                        <Button className="video-detail-comment-child-form-btn" type="primary" htmlType="submit"><EditOutlined /></Button>
                    </Form.Item>
                </Form>
            }
            {CommentReNumber !== 0 &&
                <div className="video-detail-comment-child-open" onClick={onToggleChildComment}>답글 {CommentReNumber}개 {OpenChildComment ? <CaretUpOutlined /> : <CaretDownOutlined />}</div>
            }
            <div className="video-detail-comment-child-list">
                {OpenChildComment &&
                    (props.comments && props.comments.map((comment, index) => (
                        (comment.parentCommentId && props.comment._id === comment.parentCommentId &&
                            <React.Fragment key={index}>
                                <ChildComment comment={comment} />
                            </React.Fragment>
                        )
                    )))
                }
            </div>
        </div>
    )
}

export default ParentCommentList;