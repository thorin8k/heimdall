import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        // To disable submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.onSubmit(values);
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const userError = isFieldTouched('user') && getFieldError('user');
        const passError = isFieldTouched('pass') && getFieldError('pass');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={userError ? 'error' : ''} help={userError || ''}>
                    {getFieldDecorator('user', {
                        rules: [{ required: true, message: 'Please input your user!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Usuario"
                        />,
                    )}
                </Form.Item>
                <Form.Item validateStatus={passError ? 'error' : ''} help={passError || ''}>
                    {getFieldDecorator('pass', {
                        rules: [{ required: true, message: 'Please input your pass!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Contraseña"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Iniciar
          </Button>
                </Form.Item>
            </Form>
        );
    }
}

const Login = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default Login;