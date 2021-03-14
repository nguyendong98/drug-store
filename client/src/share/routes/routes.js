import React from 'react';
const Home = React.lazy(async () => await import('../../pages/Home/Home'));
const Product = React.lazy(async () => await import('../../pages/Product/Product'));
const ProductDetail = React.lazy(async () => await import('../../pages/ProductDetail/ProductDetailContain'));
const Cart = React.lazy(async () => await import('../../pages/Cart/CartContain'));
const MyOrder = React.lazy(async () => await import('../../pages/MyOrder/MyOrder'));
const NotFound = React.lazy(async () => await import('../../pages/NotFound/NotFound'));

const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/home',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/product',
        exact: true,
        main: () => <Product />
    },
    {
        path: '/product/category/:id',
        exact: true,
        main: () => <Product />
    },
    {
        path: '/product/:id',
        exact: true,
        main: () => <ProductDetail />
    },
    {
        path: '/cart',
        exact: true,
        main: () => <Cart />
    },
    {
        path: 'my-order',
        exact: true,
        main: () => <MyOrder />
    },
    {
        path: '*',
        exact: true,
        main: () => <NotFound />
    },
]

export default routes
