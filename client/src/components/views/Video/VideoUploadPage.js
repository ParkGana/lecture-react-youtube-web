import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import { Form, Input, Select, Button, message } from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';

import Auth from '../../../hoc/auth';
import { SERVER_VIDEO } from '../../Config';

import '../../css/VideoUploadPage.css';

const { TextArea } = Input;
const { Option } = Select;

const PrivacyOptions = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const CategoryOptions = [
    { value: 0, label: 'Film & Animation' },
    { value: 1, label: 'Autos & Vehicles' },
    { value: 2, label: 'Music' },
    { value: 3, label: 'Pets & Animals' },
    { value: 4, label: 'Sports' }
]


function VideoUploadPage() {
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Privacy, setPrivacy] = useState(-1);
    const [Category, setCategory] = useState(-1);
    const [Duration, setDuration] = useState('');
    const [VideoPath, setVideoPath] = useState('');
    const [ThumbnailPath, setThumbnailPath] = useState('');

    const onChangeTitle = (e) => {
        setTitle(e.currentTarget.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onChangePrivacy = (e) => {
        setPrivacy(e);
    }

    const onChangeCategory = (e) => {
        setCategory(e);
    }

    const onDropVideo = (files) => {
        let formData = new FormData;
        const config = { header: { 'content-type': 'multipart/form-data' } }

        formData.append('file', files[0]);

        Axios.post(`${SERVER_VIDEO}/dropVideo`, formData, config)
        .then(response => {
            if(response.data.dropVideoSuccess) {
                setVideoPath(response.data.videoPath);

                const variables = {
                    videoPath: response.data.videoPath
                }

                Axios.post(`${SERVER_VIDEO}/createThumbnail`, variables)
                .then(response => {
                    if(response.data.createThumbnailSuccess) {
                        setDuration(response.data.duration);
                        setThumbnailPath(response.data.thumbnailPath);
                    }
                    else {
                        alert('썸네일 생성에 실패하였습니다.');
                    }
                });
            }
            else {
                alert('파일 첨부에 실패하였습니다.');
            }
        });
    }

    const onUploadVideo = (e) => {
        // e.preventDefault();

        if(ThumbnailPath === '') return alert('영상을 업로드해주세요.');
        if(Title === '') return alert('영상 제목을 입력해주세요.');
        if(Description === '') return alert('영상 설명을 입력해주세요.');
        if(Privacy === -1) return alert('공개 범위를 선택해주세요.');
        if(Category === -1) return alert('카테고리를 선택해주세요.');

        const variables = {
            uploader: user.userData._id,
            title: Title,
            description: Description,
            privacy: Privacy,
            category: Category,
            duration: Duration,
            videoPath: VideoPath,
            thumbnailPath: ThumbnailPath
        }

        Axios.post(`${SERVER_VIDEO}/uploadVideo`, variables)
        .then(response => {
            if(response.data.uploadVideoSuccess) {
                message.success('영상이 성공적으로 업로드 되었습니다!');

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
            else {
                alert('영상 업로드에 실패하엿습니다.');
            }
        });
    }

    return (
        <>
            <div className="content">
                <div className="video-upload">
                    <h2>Upload Video</h2>
                    <Form className="video-upload-form" autoComplete="off" onFinish={onUploadVideo}>
                        <div className="video-upload-dropzone">
                            <Dropzone onDrop={onDropVideo} multiple={false} maxSize={1000000000}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <Input {...getInputProps()} />
                                        {ThumbnailPath ? <CheckOutlined style={{ fontSize: '3rem', color: '#1890FF' }} /> : <PlusOutlined style={{ fontSize: '3rem', color: 'lightgray' }} />}
                                    </div>
                                )}
                            </Dropzone>
                            {ThumbnailPath &&
                                <div>
                                    <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                                </div>
                            }
                        </div>
                        <Form.Item>
                            <Input placeholder="Title" value={Title} onChange={onChangeTitle} />
                        </Form.Item>
                        <Form.Item>
                            <TextArea rows={10} placeholder="Description" value={Description} onChange={onChangeDescription} />
                        </Form.Item>
                        <Select placeholder="Privacy" onChange={onChangePrivacy}>
                            {PrivacyOptions.map((item, index) => (
                                <Option key={index} value={item.value}>{item.label}</Option>
                            ))}
                        </Select>
                        <Select placeholder="Category" onChange={onChangeCategory}>
                            {CategoryOptions.map((item, index) => (
                                <Option key={index} value={item.value}>{item.label}</Option>
                            ))}
                        </Select>
                        <Button className="video-upload-form-btn" type="primary" htmlType="submit">Upload</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Auth(VideoUploadPage, true);