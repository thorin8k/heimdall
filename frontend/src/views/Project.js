import React from 'react';
import { Component } from "react";
import Axios from 'axios';

import { List, Avatar, Space, Skeleton, Typography, Divider } from 'antd';
import { CheckCircleOutlined, FireOutlined, InboxOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';




class Project extends Component {

    state = {
        record: []
    }

    loadProject = async (id) => {
        try {
            const response = await Axios.get('/project/' + id)
            this.setState({
                record: response.data && response.data.data && response.data.data[0]
            })
        } catch (ex) {

        }
    }

    componentDidMount() {
        this.loadProject(this.props.match.params.id);
    }


    render() {

        const { record } = this.state;

        return <div className='project'>

            Test Project
        </div>;
    }
}

export default withRouter(Project);