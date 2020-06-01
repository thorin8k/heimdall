
import React from 'react';
import { Component } from "react";

import {
    Menu, Button, Row, Col, Badge
} from 'antd';
import Login from '../common/Login';
import { Link } from 'react-router-dom';

import lodash from 'lodash';



export default class AppMenu extends Component {




    render() {

        const {
            onLogin,
            onLogout,
            isAuthenticated,
            user,
            onMenuChange
        } = this.props;


        let active = window.location.hash.replace('#/','');
        if(active == ''){
            active = 'home'
        }

        return <Row style={{ background: 'white' }}>
            <Col span={14}>
                <Menu mode="horizontal" selectedKeys={[active]} onSelect={onMenuChange} >
                    <Menu.Item key="home">
                        <Link to={'/'} style={{ display: 'inline' }}><span>Home</span></Link>

                    </Menu.Item>
                    {/* <Menu.Item key="scenes">
                        <Link to={'/scenes'} style={{ display: 'inline' }}><span>Scenes</span></Link>
                    </Menu.Item>
                    <Menu.Item key="config">
                        <Link to={'/config'} style={{ display: 'inline' }}><span>Configuration</span></Link>
                    </Menu.Item> */}


                </Menu>
            </Col>

            <Col span={10} style={{
                height: 48,
                borderBottom: "1px solid #e8e8e8"
            }}>
                {isAuthenticated === true && <Button onClick={() => onLogout()} style={{ float: 'right', marginTop: 13, marginRight: 20 }} type="dashed" size="small">Salir </Button>}


                {isAuthenticated === false && <Login onSubmit={onLogin} />}

                {isAuthenticated === true && <Badge status="success" style={{ float: 'right', marginTop: 13, marginRight: 10, lineHeight: 'normal' }} text={user ? user.user : ""} />}
            </Col>
        </Row>

    }
}