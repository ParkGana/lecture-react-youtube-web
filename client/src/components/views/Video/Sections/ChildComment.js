import React from 'react';
import { Card, Avatar } from 'antd';

import LikeDislike from './LikeDislike';

const { Meta } = Card;


function ChildCommentList(props) {
    return (
        <div className="video-detail-comment-child">
            <Meta avatar={<Avatar src={props.comment.writer.profilePath} />} title={props.comment.writer.name} />
            <p>{props.comment.content}</p>
            <p>
                <span></span>
                <LikeDislike commentId={props.comment._id} userId={localStorage.getItem('userId')} />
            </p>
        </div>
    )
}

export default ChildCommentList;