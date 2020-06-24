import React from 'react';
import { Component } from "react";
import Axios from 'axios';

import { List, Avatar, Space, Skeleton, Typography, Divider, Button } from 'antd';
import { CheckCircleOutlined, FireOutlined, InboxOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';

import lodash from 'lodash'
// import ProjectForm from './ProjectForm.js';


class ProjectDetail extends Component {

    state = {
        project: [],
        mode: 'detail'
    }

    loadProject = async (id) => {
        try {
            const response = await Axios.get('/project/' + id)
            this.setState({
                project: response.data && response.data.data && response.data.data[0]
            })
        } catch (ex) {

        }
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.loadProject(this.props.match.params.id);
        } else if (this.props.record && !lodash.isEmpty(this.props.record)) {
            this.setState({
                project: this.props.record
            });
        }
    }

    toggleMode = () => {
        this.setState((state) => {
            state.mode = state.mode === 'detail' ? 'edit' : 'detail';

            return state;
        });
    }

    render() {

        const { project, mode } = this.state;

        return <div className='project'>

            {mode === 'detail' &&
                <div>
                    Project: {project.name} <br />
                    Description: {project.description} <br />
                </div>
            }

            {mode === 'edit' &&
                {// <ProjectForm />}
            }


            <Button type="primary" onClick={this.toggleMode}> {mode === 'detail' ? "Edit" : "Save"} </Button>
        </div>;
    }
}

export default withRouter(ProjectDetail);