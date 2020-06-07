
import React from 'react';
import { Component } from "react";

import {
    Menu, Button, Row, Col, Badge
} from 'antd';
import Login from '../common/Login';
import { Link } from 'react-router-dom';

import lodash from 'lodash';
import { HomeOutlined, CodeOutlined, SettingOutlined } from '@ant-design/icons';



export default class AppMenu extends Component {




    render() {

        const {
            onLogin,
            onLogout,
            isAuthenticated,
            user,
            onMenuChange
        } = this.props;


        let active = window.location.hash.replace('#/', '');
        if (active == '') {
            active = 'home'
        }

        return <Row style={{ background: 'white' }}>
            <Col lg={2} md={3} xs={8}>

                <Link to={'/'} style={{ display: 'inline' }}><img className='logo' alt='logo' src={process.env.PUBLIC_URL + "/heimdall_logo.png"} /></Link>
            </Col>
            <Col lg={16} md={15} xs={4}>
                <Menu mode="horizontal" selectedKeys={[active]} onSelect={onMenuChange} >
                    <Menu.Item key="home" icon={<CodeOutlined />} >
                        <Link to={'/'} style={{ display: 'inline' }}><span>Projects</span></Link>

                    </Menu.Item>
                    {/* <Menu.Item key="projects" icon={<CodeOutlined />}>
                        <Link to={'/projects'} style={{ display: 'inline' }}><span>Projects</span></Link>
                    </Menu.Item> */}
                    <Menu.Item key="config" icon={<SettingOutlined />}>
                        <Link to={'/config'} style={{ display: 'inline' }}><span>Configuration</span></Link>
                    </Menu.Item>


                </Menu>
            </Col>

            <Col lg={6} md={6} xs={12} style={{
                height: 66,
                borderBottom: "1px solid #e8e8e8"
            }}>
                {isAuthenticated === true && <Button onClick={() => onLogout()} style={{ float: 'right', marginTop: 16, marginRight: 20 }} type="dashed">Salir </Button>}


                {isAuthenticated !== true && <Login onSubmit={onLogin} />}

                {isAuthenticated === true && <Badge status="success" style={{ float: 'right', marginTop: 23, marginRight: 20, lineHeight: 'normal' }} text={user ? user.user : ""} />}
            </Col>
        </Row>

    }
}