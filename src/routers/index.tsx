// routes.tsx
import HomePage from '../views/HomePage'
import ProductPage from '../views/ProductPage'


export const routes = [
  {
    path: '/',
    element: <HomePage />,
    fetchData: async () => ({}) // 可选：首页可能不需要数据
  },
  {
    path: '/about',
    element: <ProductPage />,
    fetchData: async () => ({}) // 可选：首页可能不需要数据
  },
]