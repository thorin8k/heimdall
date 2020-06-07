import React from 'react';
import { Component } from "react";
import Axios from 'axios';

import { List, Avatar, Space, Skeleton } from 'antd';
import { CheckCircleOutlined, FireOutlined, InboxOutlined } from '@ant-design/icons';

const IconText = ({ icon, text }) => (
    <Space>
        {icon}
        {text}
    </Space>
);

export default class Projects extends Component {

    state = {
        elements: []
    }

    loadProjects = async () => {
        try {
            const response = await Axios.get('/project/list')
            console.log(response);
            this.setState({
                elements: response.data.data
            })
        } catch (ex) {

        }
    }

    componentDidMount() {
        this.loadProjects();


    }


    render() {

        const { elements } = this.state;

        return <div >

            <List
                itemLayout="vertical"
                size="large"
                dataSource={elements}
                renderItem={item => {
                    let icon = item.icon;

                    if (item.icon && item.icon.indexOf('base64') === -1) { //Si se ha almacenado en base64 pues se usa
                        icon = process.env.PUBLIC_URL + +"/" + icon + ".png";
                    }
                    return (<List.Item
                        key={item.id}
                        actions={[
                            <IconText icon={<CheckCircleOutlined style={{ color: 'green' }} />} text="156" key="list-vertical-star-o" />,
                            <IconText icon={<FireOutlined style={{ color: 'red' }} />} text="2" key="list-vertical-like-o" />,
                            <IconText icon={<InboxOutlined />} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                            <Skeleton />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={icon} />}
                            title={<a href={item.href}>{item.name}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>)
                }}
            />
        </div>;
    }
}