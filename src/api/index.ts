import http from './axios';


/**
 * @description: 获取详情详情信息
 * @return 商品详情信息
 */
export function getProductDetailApi(params: string | object | undefined) {
  return http.get('/v3/product', params);
}