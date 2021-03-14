import React, {useEffect} from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import MessageNotify from "./share/Snackbar/Snackbar";
import setAuthToken from "./utils/setAuthToken";
import {useDispatch} from "react-redux";
import {loadUser} from "./features/user";
import NotFound from "./pages/NotFound/NotFound";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Home} from "./pages/Home/Home";
import {Product} from "./pages/Product/Product";
import {ProductDetail} from "./pages/ProductDetail/ProductDetailContain";
import {Cart} from "./pages/Cart/CartContain";
import PrivateRoute from "./share/Route/PrivateRoute";
import {MyOrder} from "./pages/MyOrder/MyOrder";
import 'moment/locale/vi';


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage['x-auth-token']) {
            setAuthToken(localStorage['x-auth-token']);
            dispatch(loadUser());
        }
    }, [dispatch]);
    return (
      <Router>
          <>
                  <MessageNotify></MessageNotify>
                  <Header></Header>
                  <div className="has-margin-top">
                      <Switch>
                          <Route path='/' exact component={Home} />
                          <Route path='/home' exact component={Home} />
                          <Route path='/product' exact component={Product} />
                          <Route path='/product/category/:id' exact component={Product} />
                          <Route path='/product/:id' exact component={ProductDetail} />
                          <Route path='/cart' exact component={Cart} />
                          <PrivateRoute path='/my-order' exact component={MyOrder} />
                          <Route path="*"  component={NotFound} />
                      </Switch>
                      <Footer></Footer>
                  </div>
          </>
      </Router>

    );
}

export default App;
