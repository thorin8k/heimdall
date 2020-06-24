import React from 'react';
import { Component } from "react";
import Axios from 'axios';

import lodash from 'lodash';
import Form from 'antd/lib/form/Form';
import { Input, Button } from 'antd';

export default class ProjectForm extends Component {

    state = {
        project: {}
    }


    componentWillReceiveProps(props) {

        if (props.record && !lodash.isEmpty(props.record)) {
            this.setState({
                project: props.record
            });
        } else {
            this.setState({
                project: {
                    name: '',
                    description: '',
                    icon: '',
                    users: []
                }
            });
        }
    }

    onFinish () {
        console.log('wii')
    }

    render() {
        return (
        // <Form style={{ marginTop: 15 }} name="horizontal_login" layout="inline" onFinish={this.onFinish}>
        //     <Form.Item
        //         name="name"
        //         rules={[{ required: true, message: 'Please input project name!' }]}
        //     >
        //         <Input placeholder="Name" />
        //     </Form.Item>
        //     <Form.Item
        //         name="description"
        //         rules={[{ required: false }]}
        //     >
        //         <Input type='textarea' placeholder="Description"
        //         />
        //     </Form.Item>
        //     <Form.Item shouldUpdate={true}>
        //         {() => (
        //             <Button
        //                 type="primary"
        //                 htmlType="submit"

        //             >
        //                 Accept
        //          </Button>
        //         )}
        //     </Form.Item>
        // </Form>
        );
    }
}