import React from 'react';
import { Component } from "react";
import Axios from 'axios';

import { List, Avatar, Space, Skeleton, Typography, Divider } from 'antd';
import { CheckCircleOutlined, FireOutlined, InboxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const IconText = ({ style, icon, text }) => (
    <Space style={style}>
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
            this.setState({
                elements: response.data.data
            })
        } catch (ex) {

        }
    }

    componentDidMount() {
        this.loadProjects();


    }

    drawProjectJobs(jobs) {
        return (<div>
            <Typography.Text strong>Jobs</Typography.Text>
            <List
                itemLayout="vertical"
                size="small"
                style={{ width: '55vw' }}
                dataSource={jobs}
                renderItem={item => {
                    let icon = item.icon;

                    return (<List.Item
                        key={item.id}
                    >
                        <div className='jobList'>
                            <span style={{ minWidth: 200 }}><Link to={'/project/' + item.project + '/job/' + item.id}>{item.name}</Link></span>
                            <Link to={'/project/' + item.project + '/job/' + item.id + '/?latestExecution'}><IconText icon={<CheckCircleOutlined style={{ color: 'green' }} />} text="#156" key="list-vertical-star-o" /></Link>
                        </div>
                    </List.Item>)
                }}
            />
        </div>)
    }

    render() {

        const { elements } = this.state;

        return <div className='projectList'>

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
                        extra={this.drawProjectJobs(item.jobs)}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={icon} />}
                            title={<Link to={'/project/' + item.id}>{item.name}</Link>}
                            description={item.description}
                        />

                    </List.Item>)
                }}
            />
        </div>;
    }
}