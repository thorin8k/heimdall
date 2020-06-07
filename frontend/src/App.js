import React, { Component } from 'react';
import './App.less';
import { Layout } from 'antd';
import AppMenu from './components/AppMenu';
import AxiosConfig from './common/AxiosConfig';
import UserHandler from './common/UserHandler';
import AppMain from './layout/AppMain';



const { Header, Content, Footer } = Layout;


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
        console.log(status);
        this.setState({
            isAuthenticated: status != null ? status : false,
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
        console.log('test')
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
                        {isAuthenticated && <AppMain />}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Heimdall by Thorin (@<a href="https://github.com/thorin8k/heimdall" _target='blank'>GitHub</a>)</Footer>
                </Layout>}
        </div>
    }
}

