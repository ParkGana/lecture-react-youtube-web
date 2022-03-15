import React from 'react';
import Dropzone from 'react-dropzone';
import { Form, Input, Select, Button, message } from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';

import Auth from '../../../hoc/auth';

import '../../css/VideoUploadPage.css';

const { TextArea } = Input;
const { Option } = Select;


function VideoUploadPage() {
    return (
        <>
            <div className="content">
                <div className="video-upload">
                    <h2>Upload Video</h2>
                    <Form className="video-upload-form" autoComplete="off" onFinish>
                        <div className="video-upload-dropzone">
                            <Dropzone onDrop multiple={false} maxSize={1000000000}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <Input {...getInputProps()} />
                                        <PlusOutlined style={{ fontSize: '3rem', color: 'lightgray' }} />
                                    </div>
                                )}
                            </Dropzone>
                            <div>
                                <img src alt="thumbnail" />
                            </div>
                        </div>
                        <Form.Item>
                            <Input className="video-upload-input-title" placeholder="Title" value onChange />
                        </Form.Item>
                        <Form.Item>
                            <TextArea rows={10} className="video-upload-input-description" placeholder="Description" value onChange />
                        </Form.Item>
                        <Select className="video-upload-select-privacy" placeholder="Privacy" onChange>
                            <Option value></Option>
                        </Select>
                        <Select className="video-upload-select-category" placeholder="Category" onChange>
                            <Option value></Option>
                        </Select>
                        <Button className="video-upload-form-btn" type="primary" htmlType="submit">Upload</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Auth(VideoUploadPage, true);
