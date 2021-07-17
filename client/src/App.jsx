import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import 'moment/locale/vi';

import AppRoute from 'share/Route/AppRoute';

import setToken from 'utils/set-token';
import {loadUser} from 'features/user';
import {errorInterceptor} from './utils/error_interceptor';


export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage['x-auth-token']) {
        setToken(localStorage['x-auth-token']);
        dispatch(loadUser());
    }
    errorInterceptor();
    }, [dispatch, localStorage['x-auth-token']]);
    return (
        <AppRoute />
    );
}

