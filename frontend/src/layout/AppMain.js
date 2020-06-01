import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import Dashboard from '../components/Dashboard';
import Configuration from '../components/Configuration';

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
            <Content >
                <Switch>

                    <Route exact path='/' render={({ match }) => <Dashboard match={match} menuActive='home' {...defaultProps} />} />
                </Switch>
            </Content >
        );
    }
}

export default withRouter(AppMain);