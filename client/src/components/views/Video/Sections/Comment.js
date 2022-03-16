import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { Form, Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { SERVER_COMMENT } from '../../../Config';

const { TextArea } = Input;


function Comment(props) {
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [Comment, setComment] = useState('');

    const onChangeComment = (e) => {
        setComment(e.currentTarget.value);
    }

    const onWriteComment = (e) => {

        if(user.userData.isAuth) {
            // e.preventDefault();

            const variables = {
                writer: user.userData._id,
                content: Comment,
                videoId: props.videoId
            }
    
            Axios.post(`${SERVER_COMMENT}/writeComment`, variables)
            .then(response => {
                console.log(response.data);
                if (response.data.writeCommentSuccess) {
                    setComment('');
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
        <div className="video-detail-comment">
            <h4>Comments</h4>
            <Form className="video-detail-comment-form" autoComplete="off" onFinish={onWriteComment}>
                <Form.Item>
                    <TextArea placeholder="Write some comments" value={Comment} onChange={onChangeComment} />
                </Form.Item>
                <Form.Item>
                    <Button className="video-detail-comment-form-btn" type="primary" htmlType="submit"><EditOutlined /></Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Comment;
