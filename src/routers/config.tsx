import React, { lazy } from 'react'
// import HomePage from '../views/Home'
// import AboutPage from '../views/About'
// import ContactPage from '../views/Contact'

const HomePage = lazy(() => import('../views/Home'))
const Category = lazy(() => import('../views/Category'))
const Product = lazy(() => import('../views/Product'))

// import HomePage from '../views/Home'
// import Category from '../views/Category'
// import Product from '../views/Product'

export const routeConfig = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/category',
    element: <Category />
  },
  {
    path: '/product',
    element: <Product />
  }
];