/* eslint-disable camelcase */

import Product from './product.type';

type OrderProduct = {
  id?: number;
  quantity: number;
  orderId: number;
  productId: number;
  products?: Product[];
};

export default OrderProduct;
