import React from 'react';
import { Form, Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { TextArea } = Input;


function Comment() {
    return (
        <div className="video-detail-comment">
            <h4>Comments</h4>
            <Form className="video-detail-comment-form" autoComplete="off" onFinish>
                <Form.Item>
                    <TextArea placeholder="Write some comments" value onChange />
                </Form.Item>
                <Form.Item>
                    <Button className="video-detail-comment-form-btn" type="primary" htmlType="submit"><EditOutlined /></Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Comment;
