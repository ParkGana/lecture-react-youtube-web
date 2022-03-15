import React from 'react';
import { Form, Input, Button } from 'antd';

import '../../css/SignupPage.css';


function SignupPage() {
    return (
        <>
            <div className="content">
                <div className="signup">
                    <Form className="signup-form" autoComplete="off" onFinish>
                        <Form.Item>
                            <p className="signup-title">Sign Up</p>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Email" value onChange />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="Name" value onChange />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="Password" value onChange />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password placeholder="Confirm Password" value onChange />
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

export default SignupPage;