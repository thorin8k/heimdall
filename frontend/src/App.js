import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import AppMenu from './components/AppMenu';
import Dashboard from './components/Dashboard';
import AxiosConfig from './common/AxiosConfig';
import UserHandler from './common/UserHandler';
import AppMain from './layout/AppMain';



const { Header, Content } = Layout;


export default class App extends Component {

    state = {
        loading: false,
        loaded: false,
        logout: false,
        isAuthenticated: false,
        userLogged: false,
        userModalVisible: false,
        menuActive: "home"
    }

    constructor(props) {
        super(props);
        AxiosConfig.configureAxios(this);
        (async () => {
            if (this.state.isAuthenticated) {
                // await Config.loadConfigParams();
            }
        })();
    }

    async componentDidMount() {

        let status = await UserHandler.isAuthenticated()
        this.setState({
            isAuthenticated: status != null,
            loaded: true
        })
    }

    unauthorized = () => {
        this.setState({
            isAuthenticated: false
        }, () => {
            UserHandler.logout();
        })
    }


    async login(values) {
        await UserHandler.setUser(values);
        this.setState({
            isAuthenticated: true
        })
    }

    async logout() {
        await UserHandler.logout();
        this.setState({
            isAuthenticated: false
        })
    }


    onMenuChange = (selected) => {
        this.setState({
            menuActive: selected.key
        })
    }

    render() {


        const {
            isAuthenticated,
            loaded,
            menuActive
        } = this.state;


        return <div className="App">

            {loaded &&

                <Layout style={{ height: '100vh' }}>

                    <Header style={{ background: 'none' }}>
                        <AppMenu
                            isAuthenticated={isAuthenticated}
                            user={UserHandler.getUser()}
                            onLogin={(values) => this.login(values)}
                            onLogout={() => this.logout()}
                            onMenuChange={this.onMenuChange}
                            menuActive={menuActive} />
                    </Header>
                    <Content>
                        {isAuthenticated && <Dashboard menuActive={menuActive} />}
                    </Content>


                </Layout>}
        </div>
    }
}

