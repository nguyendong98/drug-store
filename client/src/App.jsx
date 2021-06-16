import React, {useEffect} from 'react';
import 'moment/locale/vi';
import {useDispatch} from "react-redux";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Header  from 'components/Header/Header';
import  Footer  from 'components/Footer/Footer';
import MessageNotify from "share/Snackbar/Snackbar";
import setAuthToken from "utils/setAuthToken";
import {loadUser} from "features/user";
import {Spinner} from 'share/Spinner/Spinner';
import routes from 'share/routes/routes';
import NotFound from './pages/NotFound/NotFound';
// import PrivateRoute from 'share/Route/PrivateRoute';


export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
    }, [dispatch, localStorage['x-auth-token']]);
    return (
      <Router>
          <>
                  <MessageNotify></MessageNotify>
                  <Header></Header>
                  <div className="has-margin-top">
                      <Switch>
                          <React.Suspense fallback={<Spinner />}>
                              {
                                  routes.map(({path, component}, i) => (
                                      <Route path={path} exact component={component} key={i} />
                                  ))

                              }
                              <Route path="" exact component={NotFound} />
                          </React.Suspense>
                      </Switch>
                      <Footer></Footer>
                  </div>
          </>
      </Router>

    );
}

