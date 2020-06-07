import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { HashRouter } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import es_ES from 'antd/es/locale/es_ES';

ReactDOM.render(
    <HashRouter>
        <ConfigProvider locale={es_ES}>
            <App />
        </ConfigProvider>
    </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
