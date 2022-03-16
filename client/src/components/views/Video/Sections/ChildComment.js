import React from 'react';
import { Card, Avatar } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

const { Meta } = Card;


function ChildCommentList(props) {
    return (
        <div className="video-detail-comment-child">
            <Meta avatar={<Avatar src={props.comment.writer.profilePath} />} title={props.comment.writer.name} />
            <p>{props.comment.content}</p>
            <p>
                <span></span>
                <span><LikeOutlined /></span>
                <span><DislikeOutlined /></span>
            </p>
        </div>
    )
}

export default ChildCommentList;