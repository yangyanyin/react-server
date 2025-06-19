import { useEffect, useState } from 'react'
import { getProductDetailApi } from './api'

function Card () {
  const [ productData, setProductData ] = useState<any>({})

  useEffect(() => {
    const feactData = async () => {
      try {
        const data = await getProductDetailApi({ product_id: 558151 })
        setProductData(data)
      } catch (err) {
        console.error('获取商品详情失败', err)
      }
    }
    feactData()
  }, [])
  
  return (
    <div className="card">
      客户端请求
      {productData && (
        <p>{productData.product_name}</p>
      )}
    </div>
  )
}

export default Card
