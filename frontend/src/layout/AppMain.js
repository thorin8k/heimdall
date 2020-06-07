import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import Home from '../views/Home';
import Projects from '../views/Projects';
import Configuration from '../views/Configuration';

const { Content } = Layout;

/**
 * Contenido principal.
 *
 * Aqui es necesario agregar todas las vistas principales posibles!
 */
class AppMain extends Component {

    componentDidMount() {
        // this.checkValid(this.props);
    }
    componentWillReceiveProps(nextProps) { // or componentDidUpdate
        // this.checkValid(nextProps);
    }


    checkValid = (props) => {
        //TODO check if menu has items
        // var locationToCheck = props.location.pathname.split('/');

        // if (props.app.appMenu.state.menu) {
        //     var exists = lodash.find(props.app.appMenu.state.menu, (o) => {
        //         var comparison = stringSimilarity.compareTwoStrings(o.url, "/" + locationToCheck[1]);
        //         // console.log(o.url + "->" + comparison);
        //         return comparison > 0.8
        //     });

        //     if (!exists && props.location.pathname !== '/403' && props.location.pathname !== '/') {
        //         this.props.history.replace('/403');
        //     }
        // }
    }

    render() {
        const defaultProps = {
            app: this.props.app
        };

        return (
            <Content style={{ padding: '10px 40px' }}>
                <Switch>

                    <Route exact path='/' render={({ match }) => <Projects match={match} menuActive='home' {...defaultProps} />} />
                    {/* <Route exact path='/projects' render={({ match }) => <Projects match={match} menuActive='projects' {...defaultProps} />} /> */}
                    <Route exact path='/config' render={({ match }) => <Configuration match={match} menuActive='config' {...defaultProps} />} />
                </Switch>
            </Content >
        );
    }
}

export default withRouter(AppMain);