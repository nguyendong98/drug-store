import React, {useEffect} from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import MessageNotify from "./share/Snackbar/Snackbar";
import setAuthToken from "./utils/setAuthToken";
import {useDispatch} from "react-redux";
import {loadUser} from "./features/user";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'moment/locale/vi';
import {Spinner} from './share/Spinner/Spinner';
import routes from './share/routes/routes';
// import PrivateRoute from './share/Route/PrivateRoute';


const App = () => {
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
                                      <Route path={path} exact component={component} key={i}/>
                                  ))
                              }
                              {/*<Route path='/' exact component={Home} />*/}
                              {/*<Route path='/home' exact component={Home} />*/}
                              {/*<Route path='/product' exact component={Product} />*/}
                              {/*<Route path='/product/category/:id' exact component={Product} />*/}
                              {/*<Route path='/product/:id' exact component={ProductDetail} />*/}
                              {/*<Route path='/cart' exact component={Cart} />*/}
                              {/*<PrivateRoute path='/my-order' exact component={MyOrder} />*/}
                              {/*<Route path="*"  component={NotFound} />*/}
                          </React.Suspense>
                      </Switch>
                      <Footer></Footer>
                  </div>
          </>
      </Router>

    );
}

export default App;
