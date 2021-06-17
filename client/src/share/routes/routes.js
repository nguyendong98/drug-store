import React from 'react';
const Home = React.lazy( () =>  import('pages/Home/Home'));
const Product = React.lazy( () =>  import('pages/Product/Product'));
const ProductDetail = React.lazy( () =>  import('pages/ProductDetail/ProductDetailContain'));
const Cart = React.lazy( () =>  import('pages/Cart/CartContain'));
const MyOrder = React.lazy(() => import('pages/MyOrder/MyOrder'));
const NotFound = React.lazy(() => import('pages/NotFound/NotFound'))

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/product',
        component: Product
    },
    {
        path: '/product/category/:id',
        component: Product
    },
    {
        path: '/product/:id',
        component: ProductDetail
    },
    {
        path: '/cart',
        component:  Cart
    },
    {
        path: '/my-order',
        component: MyOrder
    },
    {
        path: '*',
        component: NotFound
    }


]

export default routes
