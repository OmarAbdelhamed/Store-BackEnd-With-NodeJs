import express from 'express';
import authenticationMiddleware from '../middleware/authentication.middleware';
import usersRoutes from './api/users';
import productsRoutes from './api/products';
import ordersRoutes from './api/orders';
import orderProductsRoutes from './api/order-products';

const routes = express.Router();

routes.use('/users', usersRoutes);
routes.use('/products', authenticationMiddleware, productsRoutes);
routes.use('/orders', authenticationMiddleware, ordersRoutes);
routes.use('/order-products', authenticationMiddleware, orderProductsRoutes);

export default routes;
