// routes.tsx
import HomePage from '../views/HomePage'
import ProductPage from '../views/ProductPage'
import { getProductDetailApi } from '../api'

export const routes = [
  {
    path: '/',
    element: <HomePage />,
    fetchData: async () => ({}) // 可选：首页可能不需要数据
  },
  {
    path: '/product/:id',
    element: <ProductPage />,
    fetchData: async ({ params }:any) => {
      const data = await getProductDetailApi({ product_id: params.id })
      return data
    }
  },
]