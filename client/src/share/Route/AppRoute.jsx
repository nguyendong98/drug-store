import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MessageNotify from 'share/Snackbar/Snackbar';
import Header from 'components/Header/Header';
import Spinner from 'share/Spinner/Spinner';
import Footer from 'components/Footer/Footer';
import PrivateRoute from './PrivateRoute';

const NotFound = React.lazy(() => import('pages/NotFound/NotFound'));
const Home = React.lazy(() => import('pages/Home/Home'));
const Product = React.lazy(() => import('pages/Product/Product'));
const ProductDetail = React.lazy(() => import('pages/ProductDetail/ProductDetailContain'));
const Cart = React.lazy(() => import('pages/Cart/CartContain'));
const MyOrder = React.lazy(() => import('pages/MyOrder/MyOrder'));

export default function AppRoute() {
    return (
        <Router>
            <>
                <MessageNotify></MessageNotify>
                <Header></Header>
                <div className="has-margin-top">
                    <Switch>
                        <React.Suspense fallback={<Spinner />}>

                            <Route path='/' exact component={Home} />
                            <Route path='/home' exact component={Home} />
                            <Route path='/product' exact component={Product} />
                            <Route path='/product/category/:id' exact component={Product} />
                            <Route path='/product/:id' exact component={ProductDetail} />
                            <Route path='/cart' exact component={Cart} />
                            <PrivateRoute path='/my-order' exact component={MyOrder} />
                            <Route path="*"  component={NotFound} />
                        </React.Suspense>
                    </Switch>
                </div>
                <Footer></Footer>

            </>
        </Router>
    )
}
