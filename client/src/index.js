import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, useDispatch} from 'react-redux';

import App from './App';
import 'index.scss';
import store from 'store/index';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)


