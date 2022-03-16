import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { Form, Input, Button } from 'antd';

import Auth from '../../../hoc/auth';
import { SERVER_USER } from '../../Config';

import '../../css/SignupPage.css';


function SignupPage() {
    const navigate = useNavigate();

    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const onChangeEmail = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onChangeName = (e) => {
        setName(e.currentTarget.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.currentTarget.value);
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.currentTarget.value);
    }

    const onSubmitSignup = (e) => {
        // e.preventDefault();

        if(Email === '') return alert('이메일을 입력해주세요.');
        if(Name === '') return alert('이름을 입력해주세요.');
        if(Password === '') return alert('비밀번호를 입력해주세요.');
        if(ConfirmPassword === '') return alert('비밀번호를 한번 더 입력해주세요.');
        if(Password !== ConfirmPassword) return alert('입력하신 비밀번호가 일치하지 않습니다.');
        if(Password.length < 8) return alert('비밀번호는 8자 이상이어야 합니다.');

        const variables = {
            email: Email,
            name: Name,
            password: Password
        }

        Axios.post(`${SERVER_USER}/signup`, variables)
        .then(response => {
            if(response.data.signupSuccess) {
                navigate('/signin');
            }
            else {
                alert('회원가입에 실패하였습니다.');
            }
        });
    }

    return (
        <>
            <div className="content">
                <div className="signup">
                    <Form className="signup-form" autoComplete="off" onFinish={onSubmitSignup}>
                        <Form.Item>
                            <p className="signup-title">Sign Up</p>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Email" value={Email} onChange={onChangeEmail} />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Name" value={Name} onChange={onChangeName} />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="Password" value={Password} onChange={onChangePassword} />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="Confirm Password" value={ConfirmPassword} onChange={onChangeConfirmPassword} />
                        </Form.Item>
                        <Form.Item>
                            <Button className="signup-form-btn" type="primary" htmlType="submit">Sign Up</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Auth(SignupPage, false);