import OrderProduct from './order-product.type';

type Order = {
  id?: number;
  status: string;
  userId: number;
  userName?: string;
  products?: OrderProduct[];
};

export default Order;
