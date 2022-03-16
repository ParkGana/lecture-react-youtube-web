import React, { useState } from 'react';
import { Card, Avatar, Form, Input, Button } from 'antd';
import { LikeOutlined, DislikeOutlined, EditOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { TextArea } = Input;


function ParentCommentList(props) {
    const [OpenChildComment, setOpenChildComment] = useState(false);

    const onToggleChildComment = (e) => {
        setOpenChildComment(!OpenChildComment);
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
                <Form className="video-detail-comment-child-form" autoComplete="off" onFinish>
                    <Form.Item>
                        <TextArea placeholder="Write some comments" value onChange />
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
