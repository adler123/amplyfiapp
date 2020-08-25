import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

import UserContext from '../context/usercontext';


// const { Option } = Select;
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 20,
    },
};

class RegisterForm extends React.Component {
    static contextType = UserContext;

    onFinish = (values) => {
        this.context.register(values.username, values.password);
        // alert(values.username)
    };

    render() {
        return (
            <Form {...layout} onFinish={this.onFinish}>
                
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            type: 'pattern',
                            // pattern: new RegExp('[a-z0-9._%+-]+@ahduni.edu.in'),
                            message: 'Please enter an Ahmedabad University Mail',
                        },
                        {
                            required: true,
                            message: 'Please input your Username',
                        },
                    ]}
                >
                    <Input placeholder="Username" type="text" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>
               
               
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <Button type="secondary" className="login-form-button" style={{ marginLeft: '10px' }}>
                        <Link to="/login">Login</Link>
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default RegisterForm;
