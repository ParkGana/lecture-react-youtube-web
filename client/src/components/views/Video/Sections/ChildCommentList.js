import React, { useEffect, useState } from 'react';
import { Card, Avatar } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

const { Meta } = Card;


function ChildCommentList(props) {
    // const [CommentReNumber, setCommentReNumber] = useState(0);
    // const [OpenCommentRe, setOpenCommentRe] = useState(false);

    // useEffect(() => {
    //     props.comments.map((comment) => {

    //         if (props.commentId === comment.parentCommentId) {
    //             setCommentReNumber(CommentReNumber + 1);
    //         }
    //     });
    // }, []);
    

    return (
        <div className="video-detail-comment-child">
            <Meta avatar={<Avatar src={props.writer.profilePath} />} title={props.writer.name} />
            <p>{props.content}</p>
            <p>
                <span></span>
                <span><LikeOutlined /></span>
                <span><DislikeOutlined /></span>
            </p>
        </div>
    )
}

export default ChildCommentList;
