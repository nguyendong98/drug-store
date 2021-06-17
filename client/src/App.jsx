import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import 'moment/locale/vi';

import AppRoute from 'share/Route/AppRoute';

import setAuthToken from 'utils/setAuthToken';
import {loadUser} from 'features/user';


export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
    }, [dispatch, localStorage['x-auth-token']]);
    return (
        <AppRoute />
    );
}

