import axios from 'axios';
import {useDispatch} from 'react-redux';
import {signOut} from 'features/user';


export function errorInterceptor() {
    console.log(1);
    console.log(axios.interceptors.response);
    axios.interceptors.response.use(null, (error) => {
        const { response } = error;
        console.log(response);
        if (!response) {
            // network error
            console.error(error);
            return;
        }

        if ([401, 403].includes(response.status)) {
            // auto logout if 401 or 403 response returned from api
            const dispatch = useDispatch();
            dispatch(signOut())
        }

        const errorMessage = response.data?.message || response.statusText;
        console.error('ERROR:', errorMessage);
    });
}
