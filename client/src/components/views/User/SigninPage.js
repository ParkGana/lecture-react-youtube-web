import React from 'react';
import { Form, Input, Button } from 'antd';

import '../../css/SigninPage.css';


function SigninPage() {
    return (
        <>
            <div className="content">
                <div className="signin">
                    <Form className="signin-form" autoComplete="off" onFinish>
                        <Form.Item>
                            <p className="signin-title">Sign In</p>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Email" value onChange />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="Password" value onChange />
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

export default SigninPage;