import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { Form, Input, Button } from 'antd';

import Auth from '../../../hoc/auth';
import { SERVER_USER } from '../../Config';

import '../../css/SigninPage.css';


function SigninPage() {
    const navigate = useNavigate();

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const onChangeEmail = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitSignin = (e) => {
        // e.preventDefault();

        if(Email === '') return alert('이메일을 입력해주세요.');
        if(Password === '') return alert('비밀번호를 입력해주세요.');

        const variables = {
            email: Email,
            password: Password
        }

        Axios.post(`${SERVER_USER}/signin`, variables)
        .then(response => {
            if(response.data.signinSuccess) {
                window.localStorage.setItem('userId', response.data.userId);
                navigate('/');
            }
            else {
                if(!response.data.isExist) alert('입력된 이메일에 해당하는 사용자가 없습니다.');
                else if(!response.data.isMatch) alert('입력된 비밀번호가 일치하지 않습니다.');
                else alert('로그인에 실패하였습니다.');
            }
        });
    }

    return (
        <>
            <div className="content">
                <div className="signin">
                    <Form className="signin-form" autoComplete="off" onFinish={onSubmitSignin}>
                        <Form.Item>
                            <p className="signin-title">Sign In</p>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Email" value={Email} onChange={onChangeEmail} />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="Password" value={Password} onChange={onChangePassword} />
                        </Form.Item>
                        <Form.Item>
                            <Button className="signin-form-btn" type="primary" htmlType="submit">Sign In</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Auth(SigninPage, false);