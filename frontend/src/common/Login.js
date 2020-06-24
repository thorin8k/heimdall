import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { Form, Input, Button } from 'antd';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default class Login extends React.Component {

    onFinish = values => {
        this.props.onSubmit(values);
    };

    render() {


        return (
            <Form style={{ marginTop: 15 }} name="horizontal_login" layout="inline" onFinish={this.onFinish}>
                <Form.Item
                    name="user"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="pass"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"

                        >
                            Enter
                         </Button>
                    )}
                </Form.Item>
            </Form>
        );
    }
}

